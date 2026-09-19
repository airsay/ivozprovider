/**
 * Runtime branding, applied as CSS custom properties.
 *
 * `GET /my/theme` is anonymous and resolved by HTTP Host (see
 * `Controller\My\WebThemeAction` -> `WebPortalRepository::findByServerName`), so
 * the login screen can already be branded before anyone signs in.
 */

export interface WebTheme {
  name?: string | null;
  /** Brand primary, as a hex string. */
  color?: string | null;
  /** Path to the brand logo, relative to the API. */
  logo?: string | null;
  /** Document title. */
  title?: string | null;
  productName?: string | null;
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Chooses black or white text for a brand background.
 *
 * Uses the WCAG relative-luminance formula rather than a naive average, so mid
 * greens and cyans (common in telco brand palettes) get readable text.
 */
export function contrastColor(hex: string): '#000000' | '#ffffff' {
  const normalised = expandHex(hex);
  if (!normalised) return '#ffffff';

  const channel = (value: number): number => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };

  const r = channel(parseInt(normalised.slice(1, 3), 16));
  const g = channel(parseInt(normalised.slice(3, 5), 16));
  const b = channel(parseInt(normalised.slice(5, 7), 16));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // 0.179 is the crossover where white and black text have equal contrast ratio.
  return luminance > 0.179 ? '#000000' : '#ffffff';
}

function expandHex(hex: string): string | null {
  if (!HEX.test(hex)) return null;
  if (hex.length === 7) return hex.toLowerCase();
  const [, r, g, b] = hex.toLowerCase();
  return `#${r}${r}${g}${g}${b}${b}`;
}

export function applyTheme(
  theme: WebTheme,
  root: HTMLElement | null = documentRoot()
): void {
  if (!root) return;

  if (theme.color && HEX.test(theme.color)) {
    root.style.setProperty('--brand', theme.color);
    root.style.setProperty('--brand-contrast', contrastColor(theme.color));
  }

  if (theme.title && typeof document !== 'undefined') {
    document.title = theme.title;
  }
}

export type ColorScheme = 'light' | 'dark' | 'system';

export function applyColorScheme(
  scheme: ColorScheme,
  root = documentRoot()
): void {
  if (!root) return;
  if (scheme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', scheme);
}

function documentRoot(): HTMLElement | null {
  return typeof document === 'undefined' ? null : document.documentElement;
}
