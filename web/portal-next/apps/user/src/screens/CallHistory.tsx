import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  type FilterCriterion,
  formatDateTime,
  formatDuration,
  Input,
  PageHeader,
  Skeleton,
  Table,
  TableWrapper,
  TBody,
  TD,
  TH,
  THead,
  TR,
  useApi,
} from '@axion/portal-core';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Mic,
  PhoneMissed,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import type { UsersCdr } from '../api';

const PAGE_SIZE = 25;

type Direction = 'all' | 'inbound' | 'outbound';
type Disposition = 'all' | 'answered' | 'missed' | 'busy' | 'error';

/**
 * Call history.
 *
 * Built as its own screen rather than a generic CRUD list because this is the
 * one thing users come here to read: the filters that matter (direction,
 * outcome) are one click rather than a filter dialog, and the export uses the
 * API's `_pagination=false` + `text/csv` path so you get the whole filtered set,
 * not the page you happen to be looking at.
 */
export function CallHistoryScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const api = useApi();
  const [params, setParams] = useSearchParams();
  const [exporting, setExporting] = useState(false);

  const page = Number(params.get('page') ?? '1');
  const direction = (params.get('direction') ?? 'all') as Direction;
  const disposition = (params.get('disposition') ?? 'all') as Disposition;
  const search = params.get('q') ?? '';

  const filters = useMemo<FilterCriterion[]>(() => {
    const criteria: FilterCriterion[] = [];
    if (direction !== 'all')
      criteria.push({
        field: 'direction',
        operator: 'exact',
        value: direction,
      });
    if (disposition !== 'all') {
      criteria.push({
        field: 'disposition',
        operator: 'exact',
        value: disposition,
      });
    }
    // The API filters one field at a time, so a free-text box has to choose;
    // the number people look for is almost always the other party.
    if (search)
      criteria.push({ field: 'callee', operator: 'partial', value: search });
    return criteria;
  }, [direction, disposition, search]);

  const query = useQuery({
    queryKey: ['user', 'call-history', page, filters],
    queryFn: ({ signal }) =>
      api.list<UsersCdr>(
        '/my/call_history',
        {
          page,
          itemsPerPage: PAGE_SIZE,
          filters,
          sort: [{ field: 'startTime', direction: 'DESC' }],
        },
        signal
      ),
    placeholderData: (previous) => previous,
  });

  const update = (next: Record<string, string | null>): void => {
    const merged = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (value === null || value === '' || value === 'all') merged.delete(key);
      else merged.set(key, value);
    }
    setParams(merged, { replace: true });
  };

  const exportCsv = async (): Promise<void> => {
    setExporting(true);
    try {
      // `_pagination=false` plus a CSV Accept header is how this backend serves
      // a full export; it is not a separate endpoint.
      const search = new URLSearchParams();
      for (const criterion of filters) {
        const name =
          criterion.operator === 'eq'
            ? criterion.field
            : `${criterion.field}[${criterion.operator}]`;
        search.append(name, String(criterion.value));
      }
      search.append('_pagination', 'false');

      const result = await api.download('/my/call_history', {
        search,
        accept: 'text/csv',
      });

      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename ?? 'call-history.csv';
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const rows = query.data?.items ?? [];
  const totalPages = query.data?.totalPages ?? 1;

  return (
    <>
      <PageHeader
        title={t('Call history')}
        description={t('{{count}} calls', {
          count: query.data?.totalItems ?? 0,
        })}
        actions={
          <Button
            variant='secondary'
            loading={exporting}
            onClick={() => void exportCsv()}
          >
            <Download /> {t('Export CSV')}
          </Button>
        }
      />

      <Card>
        <div className='flex flex-wrap items-center gap-3 border-b border-border-subtle p-3'>
          <SegmentedControl
            label={t('Direction')}
            value={direction}
            onChange={(value) => update({ direction: value, page: '1' })}
            options={[
              { value: 'all', label: t('All') },
              { value: 'inbound', label: t('Received') },
              { value: 'outbound', label: t('Placed') },
            ]}
          />

          <SegmentedControl
            label={t('Outcome')}
            value={disposition}
            onChange={(value) => update({ disposition: value, page: '1' })}
            options={[
              { value: 'all', label: t('All') },
              { value: 'answered', label: t('Answered') },
              { value: 'missed', label: t('Missed') },
              { value: 'busy', label: t('Busy') },
            ]}
          />

          <div className='relative ml-auto w-full max-w-[14rem]'>
            <Search
              className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle'
              aria-hidden
            />
            <Input
              className='pl-9'
              type='search'
              placeholder={t('Search by number')}
              aria-label={t('Search by number')}
              defaultValue={search}
              onChange={(event) => update({ q: event.target.value, page: '1' })}
            />
          </div>
        </div>

        {query.isError ? (
          <div className='p-4'>
            <Alert tone='danger' title={t('Could not load your calls')}>
              {(query.error as Error).message}
            </Alert>
          </div>
        ) : null}

        <TableWrapper>
          <Table>
            <THead>
              <tr>
                <TH className='w-10' aria-label={t('Direction')} />
                <TH>{t('When')}</TH>
                <TH>{t('Caller')}</TH>
                <TH>{t('Callee')}</TH>
                <TH className='hidden sm:table-cell'>{t('Outcome')}</TH>
                <TH className='text-right'>{t('Duration')}</TH>
              </tr>
            </THead>
            <TBody>
              {query.isPending
                ? Array.from({ length: 6 }, (_, index) => (
                    <TR key={index}>
                      {Array.from({ length: 6 }, (_, cell) => (
                        <TD key={cell}>
                          <Skeleton className='h-4 w-20' />
                        </TD>
                      ))}
                    </TR>
                  ))
                : rows.map((row, index) => (
                    <TR key={String(row.id ?? index)}>
                      <TD>
                        {row.direction === 'inbound' ? (
                          <ArrowDownLeft
                            className='size-4 text-info'
                            aria-label={t('Received')}
                          />
                        ) : (
                          <ArrowUpRight
                            className='size-4 text-fg-subtle'
                            aria-label={t('Placed')}
                          />
                        )}
                      </TD>
                      <TD className='whitespace-nowrap tabular-nums text-fg-muted'>
                        {formatDateTime(row.startTime)}
                      </TD>
                      <TD className='font-medium'>{row.caller ?? '—'}</TD>
                      <TD>
                        <span className='inline-flex items-center gap-2'>
                          {row.callee ?? '—'}
                          {Number(row.numRecordings ?? 0) > 0 ? (
                            <Mic
                              className='size-3.5 text-fg-subtle'
                              aria-label={t('Has a recording')}
                            />
                          ) : null}
                        </span>
                      </TD>
                      <TD className='hidden sm:table-cell'>
                        <DispositionBadge value={row.disposition} />
                      </TD>
                      <TD className='text-right tabular-nums'>
                        {formatDuration(row.duration)}
                      </TD>
                    </TR>
                  ))}
            </TBody>
          </Table>
        </TableWrapper>

        {!query.isPending && rows.length === 0 ? (
          <EmptyState
            icon={PhoneMissed}
            title={t('No calls to show')}
            description={t('Try widening the filters or clearing the search.')}
          />
        ) : null}

        <div className='flex items-center justify-end gap-2 border-t border-border-subtle px-4 py-3 text-sm text-fg-muted'>
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
      </Card>
    </>
  );
}

function SegmentedControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}): React.JSX.Element {
  return (
    <div
      role='group'
      aria-label={label}
      className='inline-flex rounded-[--radius-control] border border-border-strong bg-surface p-0.5'
    >
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={
            value === option.value
              ? 'rounded-[calc(var(--radius-control)-2px)] bg-brand px-3 py-1 text-sm font-medium text-brand-contrast'
              : 'rounded-[calc(var(--radius-control)-2px)] px-3 py-1 text-sm text-fg-muted hover:text-fg'
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function DispositionBadge({
  value,
}: {
  value: string | null | undefined;
}): React.JSX.Element {
  const { t } = useTranslation();

  const tone =
    value === 'answered'
      ? 'success'
      : value === 'missed'
        ? 'danger'
        : value === 'busy'
          ? 'warning'
          : 'neutral';
  const label =
    value === 'answered'
      ? t('Answered')
      : value === 'missed'
        ? t('Missed')
        : value === 'busy'
          ? t('Busy')
          : value === 'error'
            ? t('Failed')
            : '—';

  return <Badge tone={tone}>{label}</Badge>;
}
