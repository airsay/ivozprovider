import i18next, { type i18n as I18nInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

/**
 * Translation setup.
 *
 * Keys are the English source strings, exactly as in the old portals
 * (`_('Route type')`). That is what makes the existing `es` / `ca` / `eu` / `it`
 * catalogues — roughly 1,600 keys of real translation work — usable unchanged.
 *
 * `keySeparator` and `nsSeparator` are off because the keys are prose: "Calls:
 * today" must not be read as namespace `Calls`, and "10.0" must not be read as
 * a nested path.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ca', label: 'Català' },
  { code: 'eu', label: 'Euskara' },
  { code: 'it', label: 'Italiano' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

export type TranslationCatalogue = Record<
  string,
  string | Record<string, string>
>;

export interface I18nOptions {
  /** Catalogues keyed by language code. */
  resources: Partial<Record<LanguageCode, TranslationCatalogue>>;
  /** Storage key for the chosen language, namespaced per portal. */
  storageKey: string;
  fallbackLanguage?: LanguageCode;
}

export function createI18n(options: I18nOptions): I18nInstance {
  const instance = i18next.createInstance();

  void instance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: Object.fromEntries(
        Object.entries(options.resources).map(([code, catalogue]) => [
          code,
          { translation: catalogue },
        ])
      ),
      fallbackLng: options.fallbackLanguage ?? 'en',
      supportedLngs: SUPPORTED_LANGUAGES.map((language) => language.code),
      keySeparator: false,
      nsSeparator: false,
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: options.storageKey,
        caches: ['localStorage'],
      },
      returnEmptyString: false,
    });

  return instance;
}
