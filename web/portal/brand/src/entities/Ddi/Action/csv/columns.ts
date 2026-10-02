import { CsvColumn } from '../../../../components/CsvImport/csvRecords';

/**
 * Brand DDI CSV. A DDI is identified by country + number [ORM unique
 * constraint Ddicountry: Ddi, countryId], so both are needed to match a row.
 * Relations are written as readable values:
 *  - Country: ISO code (unique), e.g. US, or its English name;
 *  - Client: name (unique per brand);
 *  - DDI provider: name (unique per brand);
 *  - Routing tag: empty = use the DDI provider's tag; "none" = custom tag
 *    left unassigned; otherwise the tag name or value.
 */
export const DDI_COLUMNS: CsvColumn[] = [
  { key: 'country', label: 'Country', required: true },
  { key: 'ddi', label: 'DDI', required: true, maxLength: 25 },
  { key: 'company', label: 'Client' },
  {
    key: 'type',
    label: 'Type',
    // The labels shown in the form, or the API values.
    choices: ['Inbound & outbound', 'Outbound only', 'inout', 'out'],
  },
  { key: 'ddiProvider', label: 'DDI provider' },
  { key: 'description', label: 'Description', maxLength: 100 },
  { key: 'routingTag', label: 'Routing tag' },
];

export const TYPES: Record<string, 'inout' | 'out'> = {
  inout: 'inout',
  'inbound & outbound': 'inout',
  out: 'out',
  'outbound only': 'out',
};
export const TYPE_LABELS = {
  inout: 'Inbound & outbound',
  out: 'Outbound only',
};

export const NO_ROUTING_TAG = ['none', 'unassigned'];

export interface DdiRow {
  id: number;
  ddi: string;
  ddie164?: string;
  description?: string | null;
  type?: 'inout' | 'out';
  useDdiProviderRoutingTag?: boolean;
  company?: number | { id: number } | null;
  ddiProvider?: number | { id: number } | null;
  country?: number | { id: number } | null;
  routingTag?: number | { id: number } | null;
}
