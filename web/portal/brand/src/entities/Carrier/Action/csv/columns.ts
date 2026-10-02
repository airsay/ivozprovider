import { CsvColumn } from '../../../../components/CsvImport/csvRecords';

/**
 * Carrier CSV. Relations are written as values an admin can read, each
 * matched on something unique [ORM unique constraints]:
 *  - Local socket: proxy trunk IP (ProxyTrunk.ip is unique);
 *  - Media relay set: name (MediaRelaySet.name is unique);
 *  - Currency: iden, e.g. EUR (Currency.iden is unique);
 *  - Number transformation: English name. It has no unique column, so a
 *    name that matches none or several sets is reported, never guessed.
 * Carriers themselves are matched by name (unique per brand).
 */
export const CARRIER_COLUMNS: CsvColumn[] = [
  { key: 'name', label: 'Name', required: true, maxLength: 200, unique: true },
  { key: 'description', label: 'Description', maxLength: 500 },
  { key: 'proxyTrunk', label: 'Local socket IP' },
  { key: 'mediaRelaySet', label: 'Media relay set' },
  {
    key: 'transformationRuleSet',
    label: 'Number transformation',
    aliases: ['Numeric transformation'],
    required: true,
  },
  { key: 'calculateCost', label: 'Calculate cost', choices: ['yes', 'no'] },
  { key: 'currency', label: 'Currency' },
];

export interface CarrierRow {
  id: number;
  name: string;
  description: string | null;
  balance?: number | null;
  calculateCost: boolean;
  transformationRuleSet: number | { id: number } | null;
  currency?: number | { id: number } | null;
  proxyTrunk: number | { id: number } | null;
  mediaRelaySet?: number | { id: number } | null;
}

export const relationId = (
  value: number | { id: number } | null | undefined
): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  return typeof value === 'object' ? value.id : value;
};
