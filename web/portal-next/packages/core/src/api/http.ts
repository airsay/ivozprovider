import type { TokenStore } from '../auth/tokenStore';
import { ApiError, apiErrorFromResponse } from './errors';
import { buildListSearchParams, type ListParams } from './params';

/**
 * The HTTP layer for one portal's API.
 *
 * Differences from what ivoz-ui did, all deliberate:
 *
 *  - Refresh is single-flight. The old client had no 401 interceptor at all; it
 *    reset the token, called `useRefreshToken()` *during render* of the Login
 *    component, and retried ad hoc. Here a 401 suspends the failing request,
 *    refreshes once however many requests are in flight, and replays them.
 *  - No global `axios.defaults.headers.common.Authorization`. The token is
 *    attached per request by this client, so nothing else on the page can leak
 *    it to a third-party host.
 *  - Collections are read through `X-Total-Items` / `X-Total-Pages` headers,
 *    because the API answers with a bare JSON array and no envelope.
 */

export interface LoginCredentials {
  /** The `user` API authenticates on `email`; the three admin APIs on `username`. */
  username: string;
  password: string;
}

export interface TokenPair {
  token: string;
  refresh_token?: string;
}

export interface CollectionResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  page: number;
}

export interface DownloadResult {
  blob: Blob;
  filename: string | null;
  contentType: string | null;
}

export interface RequestOptions {
  search?: URLSearchParams;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Skip the Authorization header — for `/my/theme` and the login endpoints. */
  anonymous?: boolean;
  /** Do not attempt a token refresh on 401 (used by the refresh call itself). */
  noRetry?: boolean;
  accept?: string;
}

export interface HttpClientOptions {
  /** e.g. `/api/client` */
  baseUrl: string;
  tokens: TokenStore;
  /** `/admin_login` for platform, brand and client; `/user_login` for user. */
  loginPath: string;
  /** The `user` API names the field `email` instead of `username`. */
  usernameField?: string;
  /** Called when refresh fails and the session is unrecoverable. */
  onSessionExpired?: () => void;
  fetchImpl?: typeof fetch;
}

const FORM_URLENCODED = 'application/x-www-form-urlencoded';

export class HttpClient {
  readonly baseUrl: string;
  readonly tokens: TokenStore;

  private readonly loginPath: string;
  private readonly usernameField: string;
  private readonly onSessionExpired: (() => void) | undefined;
  private readonly fetchImpl: typeof fetch;

  /** Set while a refresh is in flight so concurrent 401s share one attempt. */
  private refreshInFlight: Promise<string | null> | null = null;

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.tokens = options.tokens;
    this.loginPath = options.loginPath;
    this.usernameField = options.usernameField ?? 'username';
    this.onSessionExpired = options.onSessionExpired;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }

  // ---------------------------------------------------------------- requests

  async request<T>(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const response = await this.raw(method, path, options);

    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0'
    ) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('json')) {
      return (await response.text()) as T;
    }

    return (await response.json()) as T;
  }

  /** Issues the request, refreshing once and replaying on a 401. */
  async raw(
    method: string,
    path: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const response = await this.dispatch(method, path, options);

    if (response.ok) return response;

    if (response.status === 401 && !options.anonymous && !options.noRetry) {
      const refreshed = await this.refreshOnce();
      if (refreshed) {
        const retried = await this.dispatch(method, path, options);
        if (retried.ok) return retried;
        throw await apiErrorFromResponse(retried);
      }
      this.tokens.clear();
      this.onSessionExpired?.();
    }

    throw await apiErrorFromResponse(response);
  }

  private async dispatch(
    method: string,
    path: string,
    options: RequestOptions
  ): Promise<Response> {
    const url = this.url(path, options.search);
    const headers = new Headers(options.headers);

    if (!headers.has('accept')) {
      headers.set('accept', options.accept ?? 'application/json');
    }

    if (!options.anonymous) {
      const token = this.tokens.getAccessToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
    }

    let body: BodyInit | undefined;

    if (options.body instanceof FormData || options.body instanceof Blob) {
      // Let the browser set the multipart boundary itself.
      body = options.body;
    } else if (options.body instanceof URLSearchParams) {
      headers.set('content-type', FORM_URLENCODED);
      body = options.body.toString();
    } else if (options.body !== undefined) {
      headers.set('content-type', 'application/json');
      body = JSON.stringify(options.body);
    }

    const init: RequestInit = { method, headers, credentials: 'same-origin' };
    if (body !== undefined) init.body = body;
    if (options.signal) init.signal = options.signal;

    return this.fetchImpl(url, init);
  }

  private url(path: string, search?: URLSearchParams): string {
    const full = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    const query = search?.toString();
    return query ? `${full}${full.includes('?') ? '&' : '?'}${query}` : full;
  }

  // ------------------------------------------------------------------- verbs

  get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  post<T>(
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  put<T>(
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  /** There is no PATCH anywhere in these four APIs — every update is a full PUT. */
  delete<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }

  /** Fetches a paginated collection, reading the totals off the response headers. */
  async list<T>(
    path: string,
    params: ListParams = {},
    signal?: AbortSignal
  ): Promise<CollectionResult<T>> {
    const search = buildListSearchParams(params);
    const options: RequestOptions = { search };
    if (signal) options.signal = signal;

    const response = await this.raw('GET', path, options);
    const items = (await response.json()) as T[];

    const totalItems = Number(
      response.headers.get('x-total-items') ?? items.length
    );
    const totalPages = Number(response.headers.get('x-total-pages') ?? 1);

    return {
      items,
      totalItems: Number.isFinite(totalItems) ? totalItems : items.length,
      totalPages: Number.isFinite(totalPages) ? totalPages : 1,
      page: params.page ?? 1,
    };
  }

  /** Fetches a binary body (invoice PDFs, locution audio, fax files, CSV exports). */
  async download(
    path: string,
    options: RequestOptions = {}
  ): Promise<DownloadResult> {
    const response = await this.raw('GET', path, {
      ...options,
      accept: options.accept ?? 'application/octet-stream',
    });

    return {
      blob: await response.blob(),
      filename: filenameFromContentDisposition(
        response.headers.get('content-disposition')
      ),
      contentType: response.headers.get('content-type'),
    };
  }

  // -------------------------------------------------------------------- auth

  /**
   * Form-encoded login. Responds `{ token, refresh_token }`; a failure is
   * `{ code: 401, message: "Invalid credentials." }`.
   */
  async login(credentials: LoginCredentials): Promise<TokenPair> {
    const body = new URLSearchParams();
    body.set(this.usernameField, credentials.username);
    body.set('password', credentials.password);

    const pair = await this.request<TokenPair>('POST', this.loginPath, {
      body,
      anonymous: true,
      noRetry: true,
    });

    this.tokens.setTokens({
      token: pair.token,
      refreshToken: pair.refresh_token ?? null,
    });

    return pair;
  }

  /**
   * Impersonation across admin levels — how a platform admin drops into a brand,
   * or a brand admin into one of its companies. The exchanged session has no
   * refresh token, so it ends when the access token expires.
   */
  async exchangeToken(input: {
    token: string;
    username?: string;
    clientId?: string | number;
  }): Promise<TokenPair> {
    const body = new URLSearchParams();
    body.set('token', input.token);
    if (input.username) body.set('username', input.username);
    if (input.clientId !== undefined)
      body.set('brandId', String(input.clientId));

    const pair = await this.request<TokenPair>('POST', '/token/exchange', {
      body,
      anonymous: true,
      noRetry: true,
    });

    this.tokens.setTokens({ token: pair.token, refreshToken: null });
    return pair;
  }

  logout(): void {
    this.tokens.clear();
  }

  /**
   * Refreshes the access token at most once per burst of 401s.
   *
   * Every caller that hits a 401 awaits the same promise, so ten parallel list
   * requests produce one `/token/refresh` call, not ten — which matters because
   * the refresh token is single-use in some deployments.
   */
  private refreshOnce(): Promise<string | null> {
    if (this.refreshInFlight) return this.refreshInFlight;

    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) return Promise.resolve(null);

    this.refreshInFlight = (async () => {
      try {
        const body = new URLSearchParams({ refresh_token: refreshToken });
        const pair = await this.request<TokenPair>('POST', '/token/refresh', {
          body,
          anonymous: true,
          noRetry: true,
        });

        // The endpoint returns a fresh access token and, depending on the
        // bundle's rotation setting, sometimes a new refresh token too.
        this.tokens.setTokens({
          token: pair.token,
          ...(pair.refresh_token ? { refreshToken: pair.refresh_token } : {}),
        });

        return pair.token;
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) return null;
        // A network blip should not destroy the session; surface it instead.
        if (error instanceof ApiError) return null;
        throw error;
      } finally {
        this.refreshInFlight = null;
      }
    })();

    return this.refreshInFlight;
  }
}

/** `attachment; filename="external calls.csv"` -> `external calls.csv` */
export function filenameFromContentDisposition(
  header: string | null
): string | null {
  if (!header) return null;

  const encoded = /filename\*=(?:UTF-8'')?([^;]+)/i.exec(header);
  if (encoded?.[1]) {
    try {
      return decodeURIComponent(encoded[1].trim().replace(/^"|"$/g, ''));
    } catch {
      /* fall through to the plain form */
    }
  }

  const plain = /filename="?([^";]+)"?/i.exec(header);
  return plain?.[1]?.trim() ?? null;
}
