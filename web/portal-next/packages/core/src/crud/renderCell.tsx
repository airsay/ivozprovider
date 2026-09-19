import type { ReactNode } from 'react';

import type { ColumnDescriptor, ResolvedField, Row } from '../descriptor/types';
import { formatDateTime } from '../lib/format';
import { Badge } from '../ui';

export interface RenderCellInput {
  column: ColumnDescriptor & { label: string };
  field: ResolvedField | undefined;
  row: Row;
  t: (key: string, options?: Record<string, unknown>) => string;
}

/**
 * Read-side rendering for one cell.
 *
 * Precedence: a column's own renderer, then the field's, then a sensible
 * default per widget. Enum values are shown with their descriptor label, never
 * the raw wire value — "Hunt Group", not `huntGroup`.
 */
export function renderCellValue({
  column,
  field,
  row,
  t,
}: RenderCellInput): ReactNode {
  const value = row[column.name];
  const context = { row, t, acl: undefined as never };

  if (column.renderCell) return column.renderCell(value, context);
  if (field?.descriptor?.renderCell)
    return field.descriptor.renderCell(value, context);

  if (value === null || value === undefined || value === '') {
    return <span className='text-fg-subtle'>{field?.nullLabel ?? '—'}</span>;
  }

  if (typeof value === 'boolean') {
    return (
      <Badge tone={value ? 'success' : 'neutral'}>
        {value ? t('Yes') : t('No')}
      </Badge>
    );
  }

  if (field?.options) {
    const match = field.options.find(
      (option) => option.value === String(value)
    );
    if (match) return <Badge tone='brand'>{match.label}</Badge>;
  }

  if (field?.widget === 'datetime' || field?.widget === 'date') {
    return (
      <span className='tabular-nums'>
        {formatDateTime(
          String(value),
          field.widget === 'date' ? 'date' : 'datetime'
        )}
      </span>
    );
  }

  if (typeof value === 'number') {
    return <span className='tabular-nums'>{value}</span>;
  }

  if (typeof value === 'object') {
    // Embedded objects (a `-detailed` relation, a file sub-object) have no
    // single sensible rendering; show the most label-like property we can find.
    const record = value as Record<string, unknown>;
    const label =
      record.name ?? record.description ?? record.baseName ?? record.id;
    return <span>{label === undefined ? '—' : String(label)}</span>;
  }

  return <span>{String(value)}</span>;
}
