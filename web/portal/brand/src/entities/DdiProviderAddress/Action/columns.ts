import { CsvColumn, CsvRecord } from '../../../components/CsvImport/csvRecords';

/** Addresses are matched by IP within their DDI provider. */
export const ADDRESS_COLUMNS: CsvColumn[] = [
  {
    key: 'ip',
    label: 'IP address',
    required: true,
    maxLength: 50,
    unique: true,
  },
  { key: 'description', label: 'Description', maxLength: 200 },
];

export interface AddressRow {
  id: number;
  ip: string | null;
  description: string | null;
}

const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
const IPV6 =
  /^[0-9a-f:]+(:(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3})?$/i;

/**
 * Rough client-side check so a typo shows in the preview; the server makes
 * the final call (Assertion::ip).
 */
export const looksLikeIp = (value: string): boolean =>
  IPV4.test(value) || (value.includes(':') && IPV6.test(value));

export const toAddressRecord = (row: AddressRow): CsvRecord => ({
  ip: row.ip ?? '',
  description: row.description ?? '',
});

export const toAddressPayload = (
  record: CsvRecord,
  ddiProviderId: number
): Record<string, unknown> => ({
  ip: record.ip,
  description: record.description ? record.description : null,
  ddiProvider: ddiProviderId,
});
