import { createContext, useContext } from 'react';

/**
 * Tervian One is the default identity of every portal. A portal is
 * white-labelled once its WebPortal row is customised: by the brand
 * (reseller) for client and user portals, or by the platform admin for
 * platform and brand portals. "Customised" means an uploaded logo, or a
 * product name other than Tervian One. The colour alone doesn't count.
 */
export const TERVIAN_ONE = 'Tervian One';

export interface Branding {
  whiteLabel: boolean;
  productName: string;
}

export interface WebThemeBranding {
  logo?: string | null;
  productName?: string | null;
}

export const defaultBranding: Branding = {
  whiteLabel: false,
  productName: TERVIAN_ONE,
};

export const BrandingContext = createContext<Branding>(defaultBranding);

export const useBranding = (): Branding => useContext(BrandingContext);

/**
 * WebThemeFactory returns /api/<app>/my/logo/<id>/<file> for an uploaded
 * logo, and /<app>/logo.svg (the Tervian One lockup) otherwise.
 */
export function isUploadedLogo(logo?: string | null): boolean {
  return Boolean(logo && logo.includes('/my/logo/'));
}

export function resolveBranding(theme: WebThemeBranding): Branding {
  const productName = theme.productName?.trim() || TERVIAN_ONE;

  return {
    productName,
    whiteLabel: isUploadedLogo(theme.logo) || productName !== TERVIAN_ONE,
  };
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);
}

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * A plain text logo for a white-labelled portal without an uploaded logo,
 * so it never falls back to the Tervian One lockup.
 */
export function wordmarkLogo(productName: string): string {
  // Bold 22px text is about 13.5px per character; a rough fit is enough.
  const width = Math.max(48, Math.ceil(productName.length * 13.5) + 4);

  return svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="40" viewBox="0 0 ${width} 40">` +
      `<text x="0" y="27" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" fill="#111418">${escapeXml(
        productName
      )}</text></svg>`
  );
}

/** A one-letter icon for a white-labelled portal without an uploaded logo. */
function monogramIcon(productName: string, color: string): string {
  const letter = escapeXml(productName.charAt(0).toUpperCase() || '?');

  return svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
      `<rect width="64" height="64" rx="14" fill="${escapeXml(color)}"/>` +
      `<text x="32" y="44" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="700" fill="#ffffff">${letter}</text></svg>`
  );
}

function setIcon(rel: string, href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Marks the document as white-labelled (CSS hides the Tervian One sidebar
 * mark) and swaps the browser icon for the tenant's.
 */
export function applyBranding(
  branding: Branding,
  logo: string | null | undefined,
  color: string
): void {
  const root = document.documentElement;

  if (!branding.whiteLabel) {
    delete root.dataset.whiteLabel;

    return;
  }

  root.dataset.whiteLabel = 'true';

  const icon = isUploadedLogo(logo)
    ? (logo as string)
    : monogramIcon(branding.productName, color);
  setIcon('icon', icon);
  setIcon('apple-touch-icon', icon);
}
