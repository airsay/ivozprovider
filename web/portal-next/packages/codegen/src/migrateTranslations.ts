import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/**
 * Carries the existing translations across to the new portals.
 *
 * The old frontend keys every string by its English source text
 * (`_('Route type')`), and so does the new one. That means roughly 1,600 keys of
 * Spanish, Catalan, Basque and Italian translation — plus ivoz-ui's own base
 * catalogue — transfer verbatim instead of being re-done.
 *
 * Strings genuinely new to the rewrite come out untranslated, listed at the end
 * of the run so a translator knows exactly what is outstanding.
 */

export const LANGUAGES = ['en', 'es', 'ca', 'eu', 'it'] as const;
export type Language = (typeof LANGUAGES)[number];

/** Where the old catalogues live, in precedence order (later wins). */
function sourceCatalogues(root: string, language: Language): string[] {
  return [
    join(
      root,
      'web/portal/node_modules/@irontec/ivoz-ui/translations',
      `${language}.json`
    ),
    join(root, 'web/portal/platform/src/translations', `${language}.json`),
    join(root, 'web/portal/brand/src/translations', `${language}.json`),
    join(root, 'web/portal/client/src/translations', `${language}.json`),
    join(root, 'web/portal/user/src/translations', `${language}.json`),
  ];
}

type Catalogue = Record<string, unknown>;

/**
 * Flattens i18next plural groups into flat keys.
 *
 * The old catalogues already store plurals flat and suffixed
 * (`Call forward setting_one`, `_many`, `_other`), but ivoz-ui's base catalogue
 * nests them, so both shapes have to be handled.
 */
function flatten(catalogue: Catalogue, into: Map<string, string>): void {
  for (const [key, value] of Object.entries(catalogue)) {
    if (typeof value === 'string') {
      if (value !== '') into.set(key, value);
    } else if (value && typeof value === 'object') {
      for (const [suffix, nested] of Object.entries(
        value as Record<string, unknown>
      )) {
        if (typeof nested === 'string' && nested !== '') {
          into.set(suffix === 'one' ? key : `${key}_${suffix}`, nested);
        }
      }
    }
  }
}

/**
 * Finds a translation for a key, tolerating the plural suffixes the old
 * catalogues use: a string the new UI shows as "Extension" may only exist there
 * as `Extension_one`.
 */
export function lookup(
  existing: Map<string, string>,
  key: string
): string | undefined {
  return (
    existing.get(key) ??
    existing.get(`${key}_one`) ??
    existing.get(`${key}_many`) ??
    existing.get(`${key}_other`)
  );
}

export function loadExistingTranslations(
  root: string,
  language: Language
): Map<string, string> {
  const merged = new Map<string, string>();

  for (const file of sourceCatalogues(root, language)) {
    let contents: string;
    try {
      contents = readFileSync(file, 'utf8');
    } catch {
      continue; // an optional source, e.g. ivoz-ui when node_modules is absent
    }
    flatten(JSON.parse(contents) as Catalogue, merged);
  }

  return merged;
}

/**
 * Pulls translatable strings out of an app's sources.
 *
 * Two shapes carry them: direct `t('…')` calls, and the descriptor properties
 * that the renderer later passes through `t()` (`label`, `helpText`, `legend`,
 * `nullLabel`, entity titles and enum option labels).
 */
export function extractKeys(directory: string): Set<string> {
  const keys = new Set<string>();

  const callPattern = /\bt\(\s*'((?:[^'\\]|\\.)+)'/g;
  const descriptorPattern =
    /\b(?:label|helpText|legend|nullLabel|one|many|title|body)\s*:\s*'((?:[^'\\]|\\.)+)'/g;
  // Enum option labels: `inconditional: 'Always'` inside an `options` block.
  const optionsBlock = /options\s*:\s*\{([^}]*)\}/gs;
  const optionEntry = /:\s*'((?:[^'\\]|\\.)+)'/g;

  for (const file of walk(directory)) {
    if (
      !/\.(ts|tsx)$/.test(file) ||
      file.endsWith('.test.ts') ||
      file.endsWith('.test.tsx')
    ) {
      continue;
    }
    const source = readFileSync(file, 'utf8');

    for (const match of source.matchAll(callPattern)) add(keys, match[1]);
    for (const match of source.matchAll(descriptorPattern)) add(keys, match[1]);
    for (const block of source.matchAll(optionsBlock)) {
      for (const entry of (block[1] ?? '').matchAll(optionEntry))
        add(keys, entry[1]);
    }
  }

  return keys;
}

function add(keys: Set<string>, value: string | undefined): void {
  if (!value) return;
  const unescaped = value.replace(/\\'/g, "'");
  // Interpolation placeholders stay in the key; anything else that looks like
  // code rather than prose is not a translatable string.
  if (unescaped.trim() === '') return;
  keys.add(unescaped);
}

function* walk(directory: string): Generator<string> {
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

export interface MigrationReport {
  language: Language;
  translated: number;
  missing: string[];
}

export function migrateApp(
  root: string,
  app: string
): { reports: MigrationReport[]; keys: number } {
  const appDirectory = resolve(root, 'web/portal-next/apps', app, 'src');
  const keys = [...extractKeys(appDirectory)].sort();
  const outputDirectory = join(appDirectory, 'translations');
  mkdirSync(outputDirectory, { recursive: true });

  const reports: MigrationReport[] = [];

  for (const language of LANGUAGES) {
    const existing = loadExistingTranslations(root, language);
    const catalogue: Record<string, string> = {};
    const missing: string[] = [];

    for (const key of keys) {
      if (language === 'en') {
        // English is the key itself; storing it makes the catalogue browsable
        // and lets a copywriter reword without touching code.
        catalogue[key] = key;
        continue;
      }

      const translated = lookup(existing, key);
      if (translated) catalogue[key] = translated;
      else missing.push(key);
    }

    writeFileSync(
      join(outputDirectory, `${language}.json`),
      `${JSON.stringify(catalogue, null, 2)}\n`,
      'utf8'
    );

    reports.push({
      language,
      translated: Object.keys(catalogue).length,
      missing,
    });
  }

  writeFileSync(
    join(outputDirectory, 'index.ts'),
    [
      '// GENERATED by `yarn workspace @axion/portal-codegen migrate`.',
      '// Translations are carried over from the previous portals where the key matches;',
      '// edit the JSON files to fill the gaps.',
      "import type { LanguageCode, TranslationCatalogue } from '@axion/portal-core';",
      '',
      // Alphabetical, not LANGUAGES order, so the emitted file satisfies
      // simple-import-sort without a fix-up after every regeneration.
      ...[...LANGUAGES]
        .sort()
        .map((language) => `import ${language} from './${language}.json';`),
      '',
      'export const catalogues: Partial<Record<LanguageCode, TranslationCatalogue>> = {',
      ...LANGUAGES.map((language) => `  ${language},`),
      '};',
      '',
    ].join('\n'),
    'utf8'
  );

  process.stdout.write(`${relative(root, outputDirectory)}\n`);
  return { reports, keys: keys.length };
}
