import { CsvColumn } from '../../../components/CsvImport';

export const MODEL_COLUMNS: CsvColumn[] = [
  { key: 'iden', label: 'Iden', required: true, maxLength: 100, unique: true },
  { key: 'name', label: 'Name', required: true, maxLength: 100 },
  { key: 'description', label: 'Description', maxLength: 500 },
  {
    key: 'genericUrlPattern',
    label: 'Generic URL Pattern',
    maxLength: 225,
    unique: true,
    nullable: true,
  },
  {
    key: 'specificUrlPattern',
    label: 'Specific URL Pattern',
    maxLength: 225,
    nullable: true,
  },
  {
    key: 'genericTemplate',
    label: 'Generic Template',
    maxLength: 65535,
    nullable: true,
    raw: true,
  },
  {
    key: 'specificTemplate',
    label: 'Specific Template',
    maxLength: 65535,
    nullable: true,
    raw: true,
  },
];

export interface ModelRow {
  id: number;
  iden: string;
  name: string;
  description: string;
  genericUrlPattern: string | null;
  specificUrlPattern: string | null;
  genericTemplate: string | null;
  specificTemplate: string | null;
}

export const toRecord = (row: ModelRow): Record<string, string> => ({
  iden: row.iden ?? '',
  name: row.name ?? '',
  description: row.description ?? '',
  genericUrlPattern: row.genericUrlPattern ?? '',
  specificUrlPattern: row.specificUrlPattern ?? '',
  genericTemplate: row.genericTemplate ?? '',
  specificTemplate: row.specificTemplate ?? '',
});
