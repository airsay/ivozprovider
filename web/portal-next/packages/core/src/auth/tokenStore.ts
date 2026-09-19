/**
 * Token persistence, namespaced per portal.
 *
 * The four portals are served from the same origin (`/platform`, `/brand`,
 * `/client`, `/user`), so they share one storage area. The old portals
 * namespaced most keys (`IP-client-token`, `IP-user-token`, …) but wrote the
 * cached profile to a bare `profile` key, which meant two portals open in one
 * browser overwrote each other's identity. Everything here is prefixed.
 *
 * Storage defaults to `localStorage` to preserve today's "stay signed in"
 * behaviour — the refresh token is good for 30 days. Pass `sessionStorage` if
 * you want sign-in to end with the tab.
 */

export interface TokenSnapshot {
  token: string | null;
  refreshToken: string | null;
}

export type TokenListener = (snapshot: TokenSnapshot) => void;

/** A storage that never throws, for private-mode browsers and blocked site data. */
function safeStorage(
  storage: Storage | null
): Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> {
  return {
    getItem(key) {
      try {
        return storage?.getItem(key) ?? null;
      } catch {
        return null;
      }
    },
    setItem(key, value) {
      try {
        storage?.setItem(key, value);
      } catch {
        /* quota, private mode, blocked site data — in-memory state still works */
      }
    },
    removeItem(key) {
      try {
        storage?.removeItem(key);
      } catch {
        /* as above */
      }
    },
  };
}

export class TokenStore {
  private readonly prefix: string;
  private readonly storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
  private readonly listeners = new Set<TokenListener>();

  private token: string | null;
  private refreshToken: string | null;

  constructor(prefix: string, storage: Storage | null = defaultStorage()) {
    this.prefix = prefix;
    this.storage = safeStorage(storage);
    this.token = this.storage.getItem(`${prefix}token`);
    this.refreshToken = this.storage.getItem(`${prefix}refreshToken`);
  }

  get snapshot(): TokenSnapshot {
    return { token: this.token, refreshToken: this.refreshToken };
  }

  /** True when there is anything to authenticate with, access token or not. */
  get isAuthenticated(): boolean {
    return this.token !== null || this.refreshToken !== null;
  }

  getAccessToken(): string | null {
    return this.token;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  setTokens(next: Partial<TokenSnapshot>): void {
    if ('token' in next) {
      this.token = next.token ?? null;
      this.persist(`${this.prefix}token`, this.token);
    }
    if ('refreshToken' in next) {
      this.refreshToken = next.refreshToken ?? null;
      this.persist(`${this.prefix}refreshToken`, this.refreshToken);
    }
    this.emit();
  }

  clear(): void {
    this.token = null;
    this.refreshToken = null;
    this.storage.removeItem(`${this.prefix}token`);
    this.storage.removeItem(`${this.prefix}refreshToken`);
    this.emit();
  }

  subscribe(listener: TokenListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Namespaced scratch storage for other per-portal state (cached profile, theme). */
  readScoped(key: string): string | null {
    return this.storage.getItem(`${this.prefix}${key}`);
  }

  writeScoped(key: string, value: string | null): void {
    this.persist(`${this.prefix}${key}`, value);
  }

  private persist(key: string, value: string | null): void {
    if (value === null) this.storage.removeItem(key);
    else this.storage.setItem(key, value);
  }

  private emit(): void {
    const snapshot = this.snapshot;
    for (const listener of this.listeners) listener(snapshot);
  }
}

function defaultStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}
