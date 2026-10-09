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

type Ref = number | { id: number } | null | undefined;

export interface BrandDefaults {
  language?: Ref;
  defaultTimezone?: (BrandDetail['defaultTimezone'] & { id?: number }) | null;
  currency?: Ref;
}

export const refId = (value: Ref): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  return typeof value === 'object' ? value.id : value;
};

export interface RuleSetRef {
  id: number;
  name?: Record<string, string | null> | null;
}

/** The stock "E.164" numeric transformation (seeded with id 252). */
export const E164_NAME = 'E.164';
export const E164_SEED_ID = 252;

/**
 * Finds the E.164 rule set by its English name. If several sets share the
 * name (e.g. a brand copy), the seeded one wins; otherwise none is chosen.
 */
export function e164RuleSet(ruleSets: RuleSetRef[]): number | null {
  const matches = ruleSets.filter(
    (set) =>
      (set.name?.en ?? '').trim().toLowerCase() === E164_NAME.toLowerCase()
  );
  if (matches.length === 1) {
    return matches[0].id;
  }
  const seeded = matches.find((set) => set.id === E164_SEED_ID);

  return seeded ? seeded.id : null;
}
