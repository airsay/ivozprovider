/**
 * Idle sign-out rules, kept free of React so they can be tested.
 *
 * The last-activity time lives in localStorage, so every tab of a portal
 * shares it (activity in one tab keeps the others signed in) and it is still
 * there after the browser is closed and reopened.
 */

/** Minutes without activity before sign-out. Build with
 * VITE_IDLE_TIMEOUT_MINUTES=<n> to change it; 0 turns the idle sign-out off. */
export const DEFAULT_IDLE_MINUTES = 30;

export function idleMinutes(raw: unknown): number {
  if (raw === undefined || raw === null || raw === '') {
    return DEFAULT_IDLE_MINUTES;
  }
  const value = Number(raw);

  return Number.isFinite(value) && value >= 0 ? value : DEFAULT_IDLE_MINUTES;
}

export const activityKey = (storagePrefix: string): string =>
  `${storagePrefix}lastActivity`;

export function readLastActivity(
  storage: Pick<Storage, 'getItem'>,
  storagePrefix: string
): number | null {
  try {
    const value = Number(storage.getItem(activityKey(storagePrefix)));

    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export function writeLastActivity(
  storage: Pick<Storage, 'setItem'>,
  storagePrefix: string,
  now: number
): void {
  try {
    storage.setItem(activityKey(storagePrefix), String(now));
  } catch {
    // Storage unavailable: the timer still works within this tab's memory.
  }
}

export function clearLastActivity(
  storage: Pick<Storage, 'removeItem'>,
  storagePrefix: string
): void {
  try {
    storage.removeItem(activityKey(storagePrefix));
  } catch {
    // Nothing to clear.
  }
}

/** True when the session has been idle for the whole timeout. */
export function isIdle(
  lastActivity: number | null,
  now: number,
  timeoutMs: number
): boolean {
  if (timeoutMs <= 0 || lastActivity === null) {
    return false;
  }

  return now - lastActivity >= timeoutMs;
}

/**
 * True when another tab has already ended the session: ivoz-ui keeps the
 * tokens in localStorage under these keys and removes both on sign-out.
 */
export function sessionEndedElsewhere(
  storage: Pick<Storage, 'getItem'>,
  storagePrefix: string
): boolean {
  try {
    return (
      storage.getItem(`${storagePrefix}token`) === null &&
      storage.getItem(`${storagePrefix}refreshToken`) === null
    );
  } catch {
    return false;
  }
}
