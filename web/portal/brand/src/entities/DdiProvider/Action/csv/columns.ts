import { CsvColumn } from '../../../../components/CsvImport/csvRecords';

/**
 * DDI provider CSV. Relations are written as values an admin can read and
 * resolved like the carrier import (see Carrier/Action/csv):
 *  - Local socket: proxy trunk IP (unique);
 *  - Media relay set: name (unique);
 *  - Number transformation: English name (not unique; none or several
 *    matches is reported, never guessed);
 *  - Routing tag: name, or the tag itself (neither is unique; several
 *    matches is reported).
 * DDI providers are matched by name (unique per brand).
 */
export const DDI_PROVIDER_COLUMNS: CsvColumn[] = [
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
  { key: 'routingTag', label: 'Routing tag' },
];

export interface DdiProviderRow {
  id: number;
  name: string;
  description: string | null;
  transformationRuleSet: number | { id: number } | null;
  proxyTrunk: number | { id: number } | null;
  mediaRelaySet?: number | { id: number } | null;
  routingTag?: number | { id: number } | null;
}
