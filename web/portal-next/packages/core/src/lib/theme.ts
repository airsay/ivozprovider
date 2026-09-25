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
  /**
   * Logo URL. WebThemeFactory always sends one: `/api/<app>/my/logo/<id>/<file>`
   * for an uploaded logo, or `https://<host>/<app>/logo.svg` (the stock
   * artwork) when none was uploaded. Use `tenantBrand()` to tell them apart.
   */
  logo?: string | null;
  /** Document title. */
  title?: string | null;
  productName?: string | null;
}

export interface TenantBrand {
  /** A reseller or platform admin customised the portal (own logo or name). */
  custom: boolean;
  productName: string;
  /** The uploaded logo, ready for an <img src>, or null. */
  logoUrl: string | null;
}

/**
 * Tervian One unless the WebPortal row was customised: an uploaded logo, or a
 * product name other than the default. The colour alone does not count.
 */
export function tenantBrand(
  theme: WebTheme | null | undefined,
  options: {
    /** The platform's own name; any other product name is a tenant's. */
    defaultProductName: string;
    /** Shown when the theme has no product name. */
    fallbackProductName: string;
    apiBaseUrl: string;
  }
): TenantBrand {
  const productName = theme?.productName?.trim() || options.fallbackProductName;
  const logo = theme?.logo;
  const logoUrl =
    logo && logo.includes('/my/logo/')
      ? /^https?:\/\//.test(logo)
        ? logo
        : `${options.apiBaseUrl}${logo}`
      : null;

  return {
    custom: logoUrl !== null || productName !== options.defaultProductName,
    productName,
    logoUrl,
  };
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

  // White text is the brand look, so keep it whenever it still meets WCAG AA
  // (4.5:1); only switch to black when white would fail that and black is
  // the better of the two. 0.179 is where the two are equal.
  const whiteContrast = 1.05 / (luminance + 0.05);
  if (whiteContrast >= 4.5) return '#ffffff';
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
  // Always stamped, 'system' included: the stylesheet only goes dark for
  // 'system' when the OS asks for it, so light stays the default look.
  root.setAttribute('data-theme', scheme);
}

function documentRoot(): HTMLElement | null {
  return typeof document === 'undefined' ? null : document.documentElement;
}

const SCHEME_KEY = 'portal-color-scheme';

/**
 * The viewer's saved light/dark choice. Light is the default look; the choice
 * is shared by every portal on the origin, which is what someone who flips it
 * once expects.
 */
export function storedColorScheme(): ColorScheme {
  try {
    const value = window.localStorage.getItem(SCHEME_KEY);
    if (value === 'light' || value === 'dark' || value === 'system') {
      return value;
    }
  } catch {
    /* private mode or blocked storage: fall through to the default */
  }
  return 'light';
}

/** Applies a scheme and remembers it for next time. */
export function rememberColorScheme(scheme: ColorScheme): void {
  applyColorScheme(scheme);
  try {
    window.localStorage.setItem(SCHEME_KEY, scheme);
  } catch {
    /* the choice still applies for this page view */
  }
}
