import { useSyncExternalStore } from 'react';

/**
 * Light / dark mode.
 *
 * The choice is kept per browser (localStorage), shared by the four portals
 * because they are served from the same origin. Until someone picks a mode,
 * the portal follows the operating system setting.
 *
 * The mode is written to <html data-theme="light|dark">; redesign.css keys
 * its dark tokens off that attribute, and Theme.tsx switches the MUI palette.
 */
export type ColorMode = 'light' | 'dark';

const STORAGE_KEY = 'tervian-color-mode';
const listeners = new Set<() => void>();

const systemQuery = (): MediaQueryList | null =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

function storedMode(): ColorMode | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);

    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function resolveMode(): ColorMode {
  return storedMode() ?? (systemQuery()?.matches ? 'dark' : 'light');
}

let current: ColorMode = 'light';

function apply(mode: ColorMode): void {
  current = mode;
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
  listeners.forEach((listener) => listener());
}

/** Call once, before the first render, so the page never flashes light. */
export function initColorMode(): void {
  apply(resolveMode());

  systemQuery()?.addEventListener?.('change', () => {
    if (!storedMode()) {
      apply(resolveMode());
    }
  });

  // Another tab (or another portal) changed the mode.
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      apply(resolveMode());
    }
  });
}

export function setColorMode(mode: ColorMode): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Private mode or blocked storage: the choice lasts for this page only.
  }
  apply(mode);
}

export function getColorMode(): ColorMode {
  return current;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function useColorMode(): ColorMode {
  return useSyncExternalStore(subscribe, getColorMode, getColorMode);
}
