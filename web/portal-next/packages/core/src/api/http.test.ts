import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TokenStore } from '../auth/tokenStore';
import { ApiError } from './errors';
import { filenameFromContentDisposition, HttpClient } from './http';

/** An in-memory Storage so tests never touch a real browser store. */
function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key: string) => map.get(key) ?? null,
    key: (index: number) => [...map.keys()][index] ?? null,
    removeItem: (key: string) => void map.delete(key),
    setItem: (key: string, value: string) => void map.set(key, value),
  } as Storage;
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

interface Harness {
  client: HttpClient;
  tokens: TokenStore;
  calls: Array<{
    url: string;
    method: string;
    headers: Headers;
    body: BodyInit | null;
  }>;
  respond: (
    handler: (url: string, init: RequestInit) => Response | Promise<Response>
  ) => void;
  onSessionExpired: ReturnType<typeof vi.fn>;
}

function harness(): Harness {
  const calls: Harness['calls'] = [];
  let handler: (
    url: string,
    init: RequestInit
  ) => Response | Promise<Response> = () => jsonResponse({});

  const fetchImpl = (async (
    input: RequestInfo | URL,
    init: RequestInit = {}
  ) => {
    const url = String(input);
    calls.push({
      url,
      method: init.method ?? 'GET',
      headers: new Headers(init.headers),
      body: (init.body as BodyInit | null) ?? null,
    });
    return handler(url, init);
  }) as unknown as typeof fetch;

  const tokens = new TokenStore('IP-test-', memoryStorage());
  const onSessionExpired = vi.fn();
  const client = new HttpClient({
    baseUrl: '/api/client',
    tokens,
    loginPath: '/admin_login',
    fetchImpl,
    onSessionExpired,
  });

  return {
    client,
    tokens,
    calls,
    respond: (next) => {
      handler = next;
    },
    onSessionExpired,
  };
}

describe('HttpClient', () => {
  let h: Harness;

  beforeEach(() => {
    h = harness();
  });

  it('sends the bearer token per request rather than as a global default', async () => {
    h.tokens.setTokens({ token: 'access-1' });
    h.respond(() => jsonResponse({ id: 1 }));

    await h.client.get('/ddis/1');

    expect(h.calls[0]?.headers.get('authorization')).toBe('Bearer access-1');
  });

  it('omits the token for anonymous endpoints such as /my/theme', async () => {
    h.tokens.setTokens({ token: 'access-1' });
    h.respond(() => jsonResponse({ color: '#0277bd' }));

    await h.client.get('/my/theme', { anonymous: true });

    expect(h.calls[0]?.headers.has('authorization')).toBe(false);
  });

  it('logs in with a form-encoded body and stores both tokens', async () => {
    h.respond(() =>
      jsonResponse({ token: 'access-1', refresh_token: 'refresh-1' })
    );

    await h.client.login({ username: 'admin', password: 'hunter2' });

    expect(h.calls[0]?.headers.get('content-type')).toBe(
      'application/x-www-form-urlencoded'
    );
    expect(String(h.calls[0]?.body)).toBe('username=admin&password=hunter2');
    expect(h.tokens.getAccessToken()).toBe('access-1');
    expect(h.tokens.getRefreshToken()).toBe('refresh-1');
  });

  it('uses the email field when the app is configured that way', async () => {
    const tokens = new TokenStore('IP-user-', memoryStorage());
    const seen: string[] = [];
    const client = new HttpClient({
      baseUrl: '/api/user',
      tokens,
      loginPath: '/user_login',
      usernameField: 'email',
      fetchImpl: (async (_url: RequestInfo | URL, init: RequestInit = {}) => {
        seen.push(String(init.body));
        return jsonResponse({ token: 't' });
      }) as unknown as typeof fetch,
    });

    await client.login({ username: 'someone@example.com', password: 'pw' });

    expect(seen[0]).toBe('email=someone%40example.com&password=pw');
  });

  it('refreshes once and replays the request after a 401', async () => {
    h.tokens.setTokens({ token: 'stale', refreshToken: 'refresh-1' });

    let ddiCalls = 0;
    h.respond((url) => {
      if (url.includes('/token/refresh')) {
        return jsonResponse({ token: 'fresh' });
      }
      ddiCalls += 1;
      return ddiCalls === 1
        ? jsonResponse(
            { code: 401, message: 'Expired JWT Token' },
            { status: 401 }
          )
        : jsonResponse({ id: 1, ddi: '+34123' });
    });

    const result = await h.client.get<{ ddi: string }>('/ddis/1');

    expect(result.ddi).toBe('+34123');
    expect(h.tokens.getAccessToken()).toBe('fresh');
    expect(
      h.calls.filter((call) => call.url.includes('/token/refresh'))
    ).toHaveLength(1);
    // The replay must carry the new token, not the stale one.
    expect(h.calls.at(-1)?.headers.get('authorization')).toBe('Bearer fresh');
  });

  it('collapses concurrent 401s into a single refresh', async () => {
    h.tokens.setTokens({ token: 'stale', refreshToken: 'refresh-1' });

    const expired = new Set(['/ddis/1', '/ddis/2', '/ddis/3']);
    h.respond(async (url) => {
      if (url.includes('/token/refresh')) {
        // Force the parallel callers to queue behind this one.
        await new Promise((resolve) => setTimeout(resolve, 5));
        return jsonResponse({ token: 'fresh' });
      }
      const path = url.replace('/api/client', '');
      if (expired.has(path)) {
        expired.delete(path);
        return jsonResponse({ code: 401 }, { status: 401 });
      }
      return jsonResponse({ ok: true });
    });

    await Promise.all([
      h.client.get('/ddis/1'),
      h.client.get('/ddis/2'),
      h.client.get('/ddis/3'),
    ]);

    expect(
      h.calls.filter((call) => call.url.includes('/token/refresh'))
    ).toHaveLength(1);
  });

  it('clears the session when the refresh token is itself rejected', async () => {
    h.tokens.setTokens({ token: 'stale', refreshToken: 'dead' });

    h.respond((url) =>
      url.includes('/token/refresh')
        ? jsonResponse(
            { code: 401, message: 'Invalid refresh token' },
            { status: 401 }
          )
        : jsonResponse({ code: 401 }, { status: 401 })
    );

    await expect(h.client.get('/ddis/1')).rejects.toBeInstanceOf(ApiError);
    expect(h.tokens.isAuthenticated).toBe(false);
    expect(h.onSessionExpired).toHaveBeenCalledOnce();
  });

  it('does not try to refresh when there is no refresh token', async () => {
    h.tokens.setTokens({ token: 'stale' });
    h.respond(() => jsonResponse({ code: 401 }, { status: 401 }));

    await expect(h.client.get('/ddis/1')).rejects.toBeInstanceOf(ApiError);
    expect(h.calls.some((call) => call.url.includes('/token/refresh'))).toBe(
      false
    );
  });

  it('drops the refresh token on an exchanged (impersonated) session', async () => {
    h.tokens.setTokens({ token: 'own', refreshToken: 'own-refresh' });
    h.respond(() => jsonResponse({ token: 'impersonated' }));

    await h.client.exchangeToken({
      token: 'platform-token',
      username: 'company-admin',
    });

    expect(h.tokens.getAccessToken()).toBe('impersonated');
    expect(h.tokens.getRefreshToken()).toBeNull();
  });

  it('reads collection totals from the response headers', async () => {
    h.respond(
      () =>
        new Response(JSON.stringify([{ id: 1 }, { id: 2 }]), {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'x-total-items': '134',
            'x-total-pages': '7',
          },
        })
    );

    const result = await h.client.list<{ id: number }>('/ddis', {
      page: 2,
      itemsPerPage: 20,
    });

    expect(result.items).toHaveLength(2);
    expect(result.totalItems).toBe(134);
    expect(result.totalPages).toBe(7);
    expect(result.page).toBe(2);
    expect(h.calls[0]?.url).toContain('_page=2');
  });

  it('falls back to the array length when the totals headers are absent', async () => {
    h.respond(() => jsonResponse([{ id: 1 }, { id: 2 }, { id: 3 }]));

    const result = await h.client.list<{ id: number }>('/countries');

    expect(result.totalItems).toBe(3);
    expect(result.totalPages).toBe(1);
  });

  it('surfaces the problem+json detail as the error message', async () => {
    h.respond(
      () =>
        new Response(
          JSON.stringify({ detail: 'Application Server Sets cannot be empty' }),
          {
            status: 403,
            headers: { 'content-type': 'application/problem+json' },
          }
        )
    );

    const error = await h.client.post('/brands', {}).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).message).toBe(
      'Application Server Sets cannot be empty'
    );
    expect((error as ApiError).isForbidden).toBe(true);
  });

  it('falls back to the auth dialect of errors', async () => {
    h.respond(() =>
      jsonResponse(
        { code: 401, message: 'Invalid credentials.' },
        { status: 401 }
      )
    );

    const error = await h.client
      .login({ username: 'a', password: 'b' })
      .catch((e: unknown) => e);

    expect((error as ApiError).message).toBe('Invalid credentials.');
  });

  it('returns undefined for a 204', async () => {
    h.respond(() => new Response(null, { status: 204 }));

    await expect(h.client.delete('/ddis/1')).resolves.toBeUndefined();
  });
});

describe('filenameFromContentDisposition', () => {
  it('reads the plain form', () => {
    expect(
      filenameFromContentDisposition(
        'attachment; filename="external calls.csv"'
      )
    ).toBe('external calls.csv');
  });

  it('prefers and decodes the extended form', () => {
    expect(
      filenameFromContentDisposition(
        "attachment; filename*=UTF-8''factura%202026.pdf"
      )
    ).toBe('factura 2026.pdf');
  });

  it('returns null when the header is absent', () => {
    expect(filenameFromContentDisposition(null)).toBeNull();
  });
});
