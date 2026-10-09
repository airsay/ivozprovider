import { useEffect, useSyncExternalStore } from 'react';
import { useStoreActions } from 'store';

/**
 * A tiny shared cache for the read-only summary endpoints (/my/dashboard,
 * /my/active_calls, …) so the sidebar and the dashboard ask for each one
 * once, not once per component.
 *
 * `refreshMs` re-reads the endpoint on a timer while the page is visible;
 * the shortest interval asked for by any mounted component wins.
 */
interface Entry {
  value: unknown;
  loading: boolean;
  failed: boolean;
  fetchedAt: number;
  listeners: Set<() => void>;
  intervals: Map<symbol, number>;
  timer?: number;
}

const cache = new Map<string, Entry>();

function entry(path: string): Entry {
  let found = cache.get(path);
  if (!found) {
    found = {
      value: undefined,
      loading: false,
      failed: false,
      fetchedAt: 0,
      listeners: new Set(),
      intervals: new Map(),
    };
    cache.set(path, found);
  }

  return found;
}

type ApiGet = (props: {
  path: string;
  params: Record<string, unknown>;
  successCallback: (response: unknown) => Promise<void>;
  handleErrors?: boolean;
}) => Promise<unknown>;

function load(path: string, apiGet: ApiGet): void {
  const e = entry(path);
  if (e.loading) {
    return;
  }
  e.loading = true;
  apiGet({
    path,
    params: {},
    handleErrors: false,
    successCallback: async (response) => {
      e.value = response;
      e.failed = false;
    },
  })
    .catch(() => {
      e.failed = true;
    })
    .finally(() => {
      e.loading = false;
      e.fetchedAt = Date.now();
      e.listeners.forEach((listener) => listener());
    });
}

function schedule(path: string, apiGet: ApiGet): void {
  const e = entry(path);
  window.clearInterval(e.timer);
  e.timer = undefined;
  const intervals = [...e.intervals.values()].filter((ms) => ms > 0);
  if (!intervals.length) {
    return;
  }
  e.timer = window.setInterval(() => {
    if (document.visibilityState === 'visible') {
      load(path, apiGet);
    }
  }, Math.min(...intervals));
}

/** Clears every cached response (call on sign-out). */
export function resetMyResources(): void {
  cache.forEach((e) => window.clearInterval(e.timer));
  cache.clear();
}

export default function useMyResource<T>(
  path: string | null,
  refreshMs = 0
): T | undefined {
  const apiGet = useStoreActions(
    (actions) => actions.api.get
  ) as unknown as ApiGet;
  const key = path ?? '';

  const value = useSyncExternalStore(
    (listener) => {
      if (!path) {
        return () => undefined;
      }
      const e = entry(path);
      e.listeners.add(listener);

      return () => e.listeners.delete(listener);
    },
    () => (path ? (entry(path).value as T | undefined) : undefined)
  );

  useEffect(() => {
    if (!path) {
      return;
    }
    const e = entry(path);
    const id = Symbol(key);
    e.intervals.set(id, refreshMs);
    // Re-use a recent answer; otherwise (or when it failed) ask again.
    const fresh = Date.now() - e.fetchedAt < 15000 && !e.failed;
    if (e.value === undefined || !fresh) {
      load(path, apiGet);
    }
    schedule(path, apiGet);

    return () => {
      e.intervals.delete(id);
      schedule(path, apiGet);
    };
  }, [path, key, refreshMs, apiGet]);

  return value;
}
