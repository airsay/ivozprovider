import { CsvColumn } from '../../../components/CsvImport';

export const MANUFACTURER_COLUMNS: CsvColumn[] = [
  { key: 'iden', label: 'Iden', required: true, maxLength: 100, unique: true },
  { key: 'name', label: 'Name', required: true, maxLength: 100 },
  { key: 'description', label: 'Description', maxLength: 500 },
];

export interface ManufacturerRow {
  id: number;
  iden: string;
  name: string;
  description: string;
}
