import Papa from 'papaparse';

/**
 * CSV format of POST /users/mass_import (brand API), as implemented by
 * Ivoz\Provider\Application\Service\User\SyncFromCsv:
 *  - 11 comma-separated columns per row, no header row;
 *  - rows are matched to existing records and updated: users by
 *    name + lastname (or email), terminals by name (or MAC), extensions by
 *    number, DDIs by number + country;
 *  - whole-file checks (column count, duplicates) reject every row; after
 *    that each row is saved or rejected on its own.
 */
export const COLUMNS = [
  { key: 'name', label: 'Name', required: true },
  { key: 'lastname', label: 'Lastname', required: true },
  { key: 'email', label: 'Email', required: false },
  { key: 'terminalName', label: 'Terminal name', required: false },
  { key: 'terminalPassword', label: 'Terminal password', required: false },
  { key: 'terminalModel', label: 'Terminal model', required: false },
  { key: 'mac', label: 'MAC', required: false },
  { key: 'extension', label: 'Extension', required: false },
  { key: 'ddiCountry', label: 'DDI country', required: false },
  { key: 'ddiNumber', label: 'DDI number', required: false },
  { key: 'ddiProvider', label: 'DDI provider', required: false },
] as const;

export const COLUMN_COUNT = COLUMNS.length;

/** Columns the server requires to be unique within one file. */
const UNIQUE_COLUMNS: Array<[number, string]> = [
  [2, 'email'],
  [3, 'terminal name'],
  [6, 'MAC'],
  [7, 'extension'],
];

export interface RowIssue {
  /** 1-based row number in the rows that will be sent. */
  row: number;
  message: string;
}

export interface ParsedCsv {
  rows: string[][];
  /** The first row looked like a header and was removed. */
  headerRemoved: boolean;
}

export const TEMPLATE = [
  COLUMNS.map((column) => column.label).join(','),
  'Jane,Doe,jane.doe@example.com,jane-desk,,YealinkT21P_E2,a0b1c2d3e4f5,2001,ES,946002050,My DDI provider',
  'John,Smith,john.smith@example.com,,,,,2002,,,',
].join('\n');

const normalise = (value: string): string =>
  value.toLowerCase().replace(/[^a-z]/g, '');

export function looksLikeHeader(row: string[] | undefined): boolean {
  if (!row || row.length < 2) {
    return false;
  }

  const namesLookLikeLabels =
    normalise(row[0]) === 'name' &&
    ['lastname', 'surname', 'familyname'].includes(normalise(row[1]));

  // A real user can be called "Name Lastname" (the upstream API test does
  // exactly that), so also require that no cell looks like data: an email
  // address or a numeric extension.
  const hasDataValues =
    row.some((cell) => cell.includes('@')) || /^\d+$/.test(row[7] ?? '');

  return namesLookLikeLabels && !hasDataValues;
}

/**
 * Parses the file the admin picked. The delimiter is detected (Excel in
 * many locales writes ';'), cells are trimmed and blank rows dropped.
 */
export function parseCsv(
  text: string,
  dropHeader: boolean | 'auto'
): ParsedCsv {
  const result = Papa.parse<string[]>(text.replace(/^﻿/, ''), {
    skipEmptyLines: 'greedy',
  });

  const rows = result.data.map((row) => row.map((cell) => cell.trim()));
  const removeHeader =
    dropHeader === 'auto' ? looksLikeHeader(rows[0]) : dropHeader;

  return {
    rows: removeHeader ? rows.slice(1) : rows,
    headerRemoved: removeHeader && rows.length > 0,
  };
}

/**
 * The server's whole-file checks (CsvStaticValidator) plus the required
 * name and last name, so problems show before anything is sent.
 */
export function validateRows(rows: string[][]): RowIssue[] {
  const issues: RowIssue[] = [];

  rows.forEach((row, index) => {
    const line = index + 1;
    if (row.length !== COLUMN_COUNT) {
      issues.push({
        row: line,
        message: `${COLUMN_COUNT} columns expected, ${row.length} found`,
      });

      return;
    }
    if (!row[0] || !row[1]) {
      issues.push({ row: line, message: 'Name and lastname are required' });
    }
  });

  const firstSeen = new Map<string, number>();
  rows.forEach((row, index) => {
    if (row.length !== COLUMN_COUNT || !row[0] || !row[1]) {
      return;
    }
    const key = `${row[0]} ${row[1]}`.toLowerCase();
    const seen = firstSeen.get(key);
    if (seen !== undefined) {
      issues.push({
        row: index + 1,
        message: `Duplicated full name (also in row ${seen})`,
      });
    } else {
      firstSeen.set(key, index + 1);
    }
  });

  for (const [position, label] of UNIQUE_COLUMNS) {
    const seenValues = new Map<string, number>();
    rows.forEach((row, index) => {
      const value = row[position];
      if (row.length !== COLUMN_COUNT || !value) {
        return;
      }
      const seen = seenValues.get(value);
      if (seen !== undefined) {
        issues.push({
          row: index + 1,
          message: `Duplicated ${label} "${value}" (also in row ${seen})`,
        });
      } else {
        seenValues.set(value, index + 1);
      }
    });
  }

  return issues.sort((a, b) => a.row - b.row);
}

/** The file sent to the API: comma-separated, no header, '\n' line ends. */
export function serialiseRows(rows: string[][]): string {
  return Papa.unparse(rows, { newline: '\n' });
}

export interface ImportResult {
  success: boolean;
  errorMsg: string;
  failed: number;
}

/**
 * Splits the server's error message. Row errors come as
 * "<row> => <message>" lines; a whole-file error is a single message.
 */
export function parseServerErrors(errorMsg: string): {
  rowErrors: RowIssue[];
  fileError: string | null;
} {
  const lines = errorMsg
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const rowErrors: RowIssue[] = [];
  const other: string[] = [];

  for (const line of lines) {
    const match = line.match(/^(\d+)\s*=>\s*(.*)$/);
    if (match) {
      rowErrors.push({ row: Number(match[1]), message: match[2] });
    } else {
      other.push(line);
    }
  }

  return {
    rowErrors,
    fileError: other.length ? other.join(' ') : null,
  };
}
