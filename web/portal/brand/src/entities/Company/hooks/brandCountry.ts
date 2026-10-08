/**
 * Works out the reseller's (brand's) country for new clients. Pure, so it
 * can be tested without the store.
 *
 * Sources, in order:
 *  1. the brand's invoice Country, a free-text field set in the platform
 *     portal, matched to a country by name (any language) or ISO code;
 *  2. the country of the brand's default timezone (a real country id).
 * Returns null when neither gives one country, so the form keeps its default.
 */

export interface CountryRef {
  id: number;
  code?: string | null;
  name?: Record<string, string | null> | null;
}

export interface BrandDetail {
  invoice?: { country?: string | null } | null;
  defaultTimezone?: { country?: number | { id: number } | null } | null;
}

const norm = (value: string): string =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();

export function countryFromText(
  text: string | null | undefined,
  countries: CountryRef[]
): number | null {
  if (!text || !text.trim()) {
    return null;
  }
  const wanted = norm(text);
  const matches = countries.filter(
    (country) =>
      (country.code && norm(country.code) === wanted) ||
      Object.values(country.name ?? {}).some(
        (name) => name && norm(name) === wanted
      )
  );

  return matches.length === 1 ? matches[0].id : null;
}

export function brandCountry(
  brand: BrandDetail,
  countries: CountryRef[]
): number | null {
  const fromInvoice = countryFromText(brand.invoice?.country, countries);
  if (fromInvoice !== null) {
    return fromInvoice;
  }
  const tzCountry = brand.defaultTimezone?.country;
  if (tzCountry === null || tzCountry === undefined) {
    return null;
  }

  return typeof tzCountry === 'object' ? tzCountry.id : tzCountry;
}
