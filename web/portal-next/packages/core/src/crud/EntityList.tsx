import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { type ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import type { SortDirection } from '../api/params';
import type { FilterCriterion } from '../api/params';
import type { EntityDescriptor, Row } from '../descriptor/types';
import { PageHeader } from '../layout/AppShell';
import { cn } from '../lib/cn';
import {
  useEntityDelete,
  useEntityList,
  useResolvedEntity,
} from '../runtime/hooks';
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogPanel,
  EmptyState,
  Input,
  Skeleton,
  Table,
  TableWrapper,
  TBody,
  TD,
  TH,
  THead,
  TR,
} from '../ui';
import { renderCellValue } from './renderCell';

const PAGE_SIZE = 25;

export interface EntityListProps<TRow extends Row = Row> {
  descriptor: EntityDescriptor<TRow>;
  /** Field used by the search box. Defaults to the first `partial`-capable filter. */
  searchField?: string;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

/**
 * The generic list screen.
 *
 * State lives in the URL, so a filtered, sorted page is a link someone can send
 * to a colleague — and the back button behaves. Only the columns actually
 * rendered are requested, via `_properties[]`.
 */
export function EntityList<TRow extends Row = Row>({
  descriptor,
  searchField,
  title,
  description,
  actions,
}: EntityListProps<TRow>): React.JSX.Element {
  const { t } = useTranslation();
  const resolved = useResolvedEntity(descriptor, t);
  const [params, setParams] = useSearchParams();
  const [pendingDelete, setPendingDelete] = useState<TRow | null>(null);

  const remove = useEntityDelete(descriptor);

  const page = Number(params.get('page') ?? '1');
  const search = params.get('q') ?? '';
  const sortField = params.get('sort') ?? descriptor.defaultSort?.field;
  const sortDirection =
    (params.get('dir') as SortDirection | null) ??
    descriptor.defaultSort?.direction ??
    'ASC';

  // Pick a field that actually supports a partial match, rather than guessing.
  const effectiveSearchField = useMemo(() => {
    if (searchField) return searchField;
    return resolved.filters.find((filter) =>
      filter.operators.includes('partial')
    )?.field;
  }, [searchField, resolved.filters]);

  const filters = useMemo<FilterCriterion[]>(() => {
    if (!search || !effectiveSearchField) return [];
    return [
      { field: effectiveSearchField, operator: 'partial', value: search },
    ];
  }, [search, effectiveSearchField]);

  const sortableFields = new Set(resolved.manifest.orderBy);

  const query = useEntityList<TRow>(descriptor, {
    page,
    itemsPerPage: PAGE_SIZE,
    filters,
    ...(sortField && sortableFields.has(sortField)
      ? { sort: [{ field: sortField, direction: sortDirection }] }
      : {}),
    // Ask only for what the table shows, plus the id it needs for links.
    properties: unique([
      'id',
      ...resolved.columns.map((column) => column.name),
    ]),
  });

  const update = (next: Record<string, string | null>): void => {
    const merged = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (value === null || value === '') merged.delete(key);
      else merged.set(key, value);
    }
    setParams(merged, { replace: true });
  };

  const toggleSort = (field: string): void => {
    if (!sortableFields.has(field)) return;
    const nextDirection =
      sortField === field && sortDirection === 'ASC' ? 'DESC' : 'ASC';
    update({ sort: field, dir: nextDirection, page: '1' });
  };

  const rows = query.data?.items ?? [];
  const totalItems = query.data?.totalItems ?? 0;
  const totalPages = query.data?.totalPages ?? 1;

  return (
    <>
      <PageHeader
        title={title ?? t(descriptor.title.many)}
        description={description}
        actions={
          <>
            {actions}
            {resolved.permissions.create ? (
              <Button variant='primary' asChild>
                <Link to='new'>
                  <Plus /> {t('New')}
                </Link>
              </Button>
            ) : null}
          </>
        }
      />

      <Card>
        {effectiveSearchField ? (
          <div className='border-b border-border-subtle p-3'>
            <div className='relative max-w-xs'>
              <Search
                className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle'
                aria-hidden
              />
              <Input
                className='pl-9'
                type='search'
                placeholder={t('Search')}
                aria-label={t('Search')}
                defaultValue={search}
                onChange={(event) =>
                  update({ q: event.target.value, page: '1' })
                }
              />
            </div>
          </div>
        ) : null}

        {query.isError ? (
          <div className='p-4'>
            <Alert tone='danger' title={t('Could not load this list')}>
              {(query.error as Error).message}
            </Alert>
          </div>
        ) : null}

        <TableWrapper>
          <Table>
            <THead>
              <tr>
                {resolved.columns.map((column) => {
                  const isSorted = sortField === column.name;
                  const canSort = sortableFields.has(column.name);
                  return (
                    <TH
                      key={column.name}
                      aria-sort={
                        isSorted
                          ? sortDirection === 'ASC'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                      className={cn(
                        column.hideBelow === 'sm' && 'hidden sm:table-cell',
                        column.hideBelow === 'md' && 'hidden md:table-cell',
                        column.hideBelow === 'lg' && 'hidden lg:table-cell'
                      )}
                    >
                      {canSort ? (
                        <button
                          type='button'
                          onClick={() => toggleSort(column.name)}
                          className='inline-flex items-center gap-1 hover:text-fg'
                        >
                          {column.label}
                          {isSorted ? (
                            sortDirection === 'ASC' ? (
                              <ArrowUp className='size-3' aria-hidden />
                            ) : (
                              <ArrowDown className='size-3' aria-hidden />
                            )
                          ) : null}
                        </button>
                      ) : (
                        column.label
                      )}
                    </TH>
                  );
                })}
                <TH className='w-24 text-right'>{t('Actions')}</TH>
              </tr>
            </THead>

            <TBody>
              {query.isPending
                ? Array.from({ length: 5 }, (_, index) => (
                    <TR key={`skeleton-${index}`}>
                      {resolved.columns.map((column) => (
                        <TD key={column.name}>
                          <Skeleton className='h-4 w-24' />
                        </TD>
                      ))}
                      <TD />
                    </TR>
                  ))
                : rows.map((row, index) => (
                    <TR key={String(row.id ?? index)}>
                      {resolved.columns.map((column) => (
                        <TD
                          key={column.name}
                          className={cn(
                            column.hideBelow === 'sm' && 'hidden sm:table-cell',
                            column.hideBelow === 'md' && 'hidden md:table-cell',
                            column.hideBelow === 'lg' && 'hidden lg:table-cell'
                          )}
                        >
                          {renderCellValue({
                            column,
                            field: resolved.fieldsByName[column.name],
                            row,
                            t,
                          })}
                        </TD>
                      ))}
                      <TD className='text-right'>
                        <div className='flex justify-end gap-1'>
                          {resolved.permissions.update ? (
                            <Button variant='ghost' size='icon' asChild>
                              <Link to={String(row.id)} aria-label={t('Edit')}>
                                <Pencil />
                              </Link>
                            </Button>
                          ) : null}
                          {resolved.permissions.delete ? (
                            <Button
                              variant='ghost'
                              size='icon'
                              aria-label={t('Delete')}
                              onClick={() => setPendingDelete(row)}
                            >
                              <Trash2 className='text-danger' />
                            </Button>
                          ) : null}
                        </div>
                      </TD>
                    </TR>
                  ))}
            </TBody>
          </Table>
        </TableWrapper>

        {!query.isPending && rows.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={
              search ? t('Nothing matches that search') : t('Nothing here yet')
            }
            description={
              search
                ? t('Try a different term or clear the search.')
                : t('Items you create will appear in this list.')
            }
          />
        ) : null}

        <div className='flex items-center justify-between gap-4 border-t border-border-subtle px-4 py-3 text-sm text-fg-muted'>
          <span>{t('{{count}} total', { count: totalItems })}</span>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              aria-label={t('Previous page')}
              disabled={page <= 1}
              onClick={() => update({ page: String(page - 1) })}
            >
              <ChevronLeft />
            </Button>
            <span className='tabular-nums'>
              {t('Page {{page}} of {{total}}', {
                page,
                total: Math.max(totalPages, 1),
              })}
            </span>
            <Button
              variant='ghost'
              size='icon'
              aria-label={t('Next page')}
              disabled={page >= totalPages}
              onClick={() => update({ page: String(page + 1) })}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        {pendingDelete ? (
          <DialogPanel
            size='sm'
            title={t('Delete this item?')}
            description={
              descriptor.toStr
                ? descriptor.toStr(pendingDelete, t)
                : String(pendingDelete.id ?? '')
            }
            footer={
              <>
                <Button
                  variant='secondary'
                  onClick={() => setPendingDelete(null)}
                >
                  {t('Cancel')}
                </Button>
                <Button
                  variant='danger'
                  loading={remove.isPending}
                  onClick={() => {
                    const id = pendingDelete.id;
                    if (id === undefined || id === null) return;
                    remove.mutate(id as string | number, {
                      onSuccess: () => setPendingDelete(null),
                    });
                  }}
                >
                  {t('Delete')}
                </Button>
              </>
            }
          >
            <p className='text-sm text-fg-muted'>
              {t('This cannot be undone.')}
            </p>
            {remove.isError ? (
              <Alert tone='danger' className='mt-3'>
                {(remove.error as Error).message}
              </Alert>
            ) : null}
          </DialogPanel>
        ) : null}
      </Dialog>
    </>
  );
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}
