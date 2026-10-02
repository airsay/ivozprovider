import Papa from 'papaparse';

/**
 * Generic CSV import/export for simple API resources: a header row names
 * the columns (any order, matched by key or label, case-insensitive), each
 * following row is one record, and records are matched to existing ones by
 * a key column so a re-import updates instead of duplicating.
 */

export interface CsvColumn {
  key: string;
  label: string;
  /** Other header names accepted on import (e.g. an older label). */
  aliases?: string[];
  required?: boolean;
  maxLength?: number;
  /** Must be unique within the file (and is checked against the server). */
  unique?: boolean;
  /** Send an empty cell as null rather than "" (needed for unique columns). */
  nullable?: boolean;
  /** Keep the cell exactly as written (no trimming), e.g. templates. */
  raw?: boolean;
  /** Allowed values (case-insensitive); an empty cell is allowed unless required. */
  choices?: string[];
}

export type CsvRecord = Record<string, string>;

export interface RowIssue {
  /** 1-based data row number (the header is not counted). */
  row: number;
  message: string;
}

export interface ParsedFile {
  records: CsvRecord[];
  /** Header cells that matched no column; they are ignored. */
  unknownHeaders: string[];
  /** Columns the file does not have at all. */
  missingColumns: CsvColumn[];
}

const norm = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

export function parseFile(text: string, columns: CsvColumn[]): ParsedFile {
  const result = Papa.parse<string[]>(text.replace(/^﻿/, ''), {
    skipEmptyLines: 'greedy',
  });
  const [header = [], ...rows] = result.data;

  const byName = new Map<string, CsvColumn>();
  for (const column of columns) {
    byName.set(norm(column.key), column);
    byName.set(norm(column.label), column);
    for (const alias of column.aliases ?? []) {
      byName.set(norm(alias), column);
    }
  }

  const mapping: Array<CsvColumn | null> = header.map(
    (cell) => byName.get(norm(cell)) ?? null
  );
  const unknownHeaders = header.filter((_, index) => !mapping[index]);
  const present = new Set(mapping.filter(Boolean).map((c) => c?.key));

  const records = rows.map((cells) => {
    const record: CsvRecord = {};
    mapping.forEach((column, index) => {
      if (column) {
        const value = cells[index] ?? '';
        record[column.key] = column.raw ? value : value.trim();
      }
    });

    return record;
  });

  return {
    records,
    unknownHeaders,
    missingColumns: columns.filter((column) => !present.has(column.key)),
  };
}

export function validateRecords(
  records: CsvRecord[],
  columns: CsvColumn[]
): RowIssue[] {
  const issues: RowIssue[] = [];

  records.forEach((record, index) => {
    for (const column of columns) {
      const value = record[column.key] ?? '';
      if (column.required && !value) {
        issues.push({ row: index + 1, message: `${column.label} is required` });
      }
      if (
        column.choices &&
        value &&
        !column.choices.some(
          (choice) => choice.toLowerCase() === value.toLowerCase()
        )
      ) {
        issues.push({
          row: index + 1,
          message: `${column.label} must be one of: ${column.choices.join(
            ', '
          )}`,
        });
      }
      if (column.maxLength && value.length > column.maxLength) {
        issues.push({
          row: index + 1,
          message: `${column.label} is longer than ${column.maxLength} characters`,
        });
      }
    }
  });

  for (const column of columns.filter((c) => c.unique)) {
    const seen = new Map<string, number>();
    records.forEach((record, index) => {
      const value = record[column.key];
      if (!value) {
        return;
      }
      const first = seen.get(value.toLowerCase());
      if (first !== undefined) {
        issues.push({
          row: index + 1,
          message: `Duplicated ${column.label} "${value}" (also in row ${first})`,
        });
      } else {
        seen.set(value.toLowerCase(), index + 1);
      }
    });
  }

  return issues.sort((a, b) => a.row - b.row);
}

export function toCsv(records: CsvRecord[], columns: CsvColumn[]): string {
  return Papa.unparse(
    {
      fields: columns.map((column) => column.label),
      data: records.map((record) =>
        columns.map((column) => record[column.key] ?? '')
      ),
    },
    { newline: '\r\n' }
  );
}

export function downloadCsv(fileName: string, csv: string): void {
  // BOM so Excel opens UTF-8 correctly.
  const blob = new Blob([`﻿${csv}\r\n`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

/** A record as sent to the API: empty optional cells become null. */
export function toPayload(
  record: CsvRecord,
  columns: CsvColumn[]
): Record<string, string | null> {
  const payload: Record<string, string | null> = {};
  for (const column of columns) {
    const value = record[column.key] ?? '';
    payload[column.key] = value === '' && column.nullable ? null : value;
  }

  return payload;
}

export type PlannedAction =
  | { kind: 'create'; row: number; record: CsvRecord }
  | { kind: 'update'; row: number; record: CsvRecord; id: number }
  | { kind: 'error'; row: number; record: CsvRecord; message: string };
