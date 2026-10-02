import { CsvColumn, CsvRecord } from '../../../components/CsvImport';

/** Languages of the Currency `name` field (Currency_Name in the API spec). */
export const NAME_LANGUAGES = ['en', 'es', 'ca', 'it', 'eu'] as const;

export const CURRENCY_COLUMNS: CsvColumn[] = [
  { key: 'iden', label: 'Iden', required: true, maxLength: 10, unique: true },
  { key: 'symbol', label: 'Symbol', required: true, maxLength: 5 },
  ...NAME_LANGUAGES.map((language) => ({
    key: `name_${language}`,
    label: `Name (${language})`,
    maxLength: 25,
  })),
];

export interface CurrencyRow {
  id: number;
  iden: string;
  symbol: string;
  name?: Partial<Record<typeof NAME_LANGUAGES[number], string | null>>;
}

export const toRecord = (row: CurrencyRow): CsvRecord => {
  const record: CsvRecord = { iden: row.iden ?? '', symbol: row.symbol ?? '' };
  for (const language of NAME_LANGUAGES) {
    record[`name_${language}`] = row.name?.[language] ?? '';
  }

  return record;
};

/** The API body: `name` is an object with one entry per language. */
export const toCurrencyPayload = (
  record: CsvRecord
): Record<string, unknown> => ({
  iden: record.iden,
  symbol: record.symbol,
  name: Object.fromEntries(
    NAME_LANGUAGES.map((language) => [
      language,
      record[`name_${language}`] ?? '',
    ])
  ),
});
