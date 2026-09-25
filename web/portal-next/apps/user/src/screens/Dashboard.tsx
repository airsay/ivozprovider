import {
  AreaTrend,
  BarList,
  Button,
  Card,
  cn,
  ColumnChart,
  Delta,
  Donut,
  EmptyState,
  formatDateTime,
  formatDuration,
  PageHeader,
  Segmented,
  Skeleton,
  Stat,
  useApi,
  useSingleton,
} from '@axion/portal-core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  History,
  Mic,
  PhoneCall,
  PhoneForwarded,
  PhoneMissed,
  PieChart,
  RefreshCw,
  Smartphone,
  Timer,
  Users,
} from 'lucide-react';
import { type ComponentType, type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import {
  buckets,
  type CallRecord,
  change,
  counterpart,
  hourProfile,
  inRange,
  rangeFor,
  type RangeKey,
  summarize,
  topContacts,
  type TrendMetric,
  unreturnedMisses,
} from '../analytics';
import type {
  CallForwardSetting,
  Dashboard as DashboardData,
  UserStatus,
} from '../api';
import { DirectionIcon, DispositionBadge } from './CallHistory';

const RANGES: RangeKey[] = ['today', '7d', '30d', '90d'];
const METRICS: TrendMetric[] = [
  'total',
  'inbound',
  'outbound',
  'missed',
  'minutes',
];

/**
 * The self-care overview.
 *
 * Every figure is computed from the user's own call records
 * (`/my/call_history`, one request for the range and the period before it),
 * the device status from `/my/status`, and forwarding from
 * `/my/call_forward_settings`. Nothing here is estimated or invented; where a
 * number is a heuristic the card says so.
 */
export function DashboardScreen(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  const api = useApi();
  const queryClient = useQueryClient();
  const [params, setParams] = useSearchParams();

  const rangeKey = (
    RANGES.includes(params.get('range') as RangeKey)
      ? params.get('range')
      : '7d'
  ) as RangeKey;
  const metric = (
    METRICS.includes(params.get('metric') as TrendMetric)
      ? params.get('metric')
      : 'total'
  ) as TrendMetric;

  // Recomputed per range change, not per render, so the query key is stable.
  const range = useMemo(() => rangeFor(rangeKey), [rangeKey]);

  const setParam = (key: string, value: string): void => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
  };

  const dashboard = useSingleton<DashboardData>('my/dashboard');
  const status = useSingleton<UserStatus>('my/status');

  const history = useQuery({
    queryKey: ['user', 'analytics', rangeKey],
    queryFn: ({ signal }) =>
      api.list<CallRecord>(
        '/my/call_history',
        {
          paginate: false,
          filters: [
            {
              field: 'startTime',
              operator: 'after',
              value: range.previousStart.toISOString(),
            },
          ],
          sort: [{ field: 'startTime', direction: 'DESC' }],
          properties: [
            'startTime',
            'duration',
            'direction',
            'disposition',
            'caller',
            'callee',
            'numRecordings',
          ],
        },
        signal
      ),
    staleTime: 60_000,
  });

  const forwarding = useQuery({
    queryKey: ['user', 'my/call_forward_settings', 'overview'],
    queryFn: ({ signal }) =>
      api.list<CallForwardSetting>(
        '/my/call_forward_settings',
        { itemsPerPage: 50 },
        signal
      ),
  });

  const calls = useMemo(() => history.data?.items ?? [], [history.data]);
  const current = useMemo(
    () => calls.filter((call) => inRange(call, range.start, range.end)),
    [calls, range]
  );
  const previous = useMemo(
    () =>
      calls.filter((call) =>
        inRange(call, range.previousStart, range.previousEnd)
      ),
    [calls, range]
  );
  const now = summarize(current);
  const before = summarize(previous);
  const loading = history.isPending;

  const dateFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        month: 'short',
        day: 'numeric',
      }),
    [i18n.language]
  );
  const timeFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [i18n.language]
  );
  const weekdayFormat = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    [i18n.language]
  );

  const trend = useMemo(
    () =>
      buckets(current, range, metric).map((bucket) => ({
        label:
          range.bucket === 'hour'
            ? timeFormat.format(bucket.start)
            : dateFormat.format(bucket.start),
        title:
          range.bucket === 'hour'
            ? `${weekdayFormat.format(bucket.start)}, ${timeFormat.format(bucket.start)}`
            : range.bucket === 'week'
              ? t('Week of {{date}}', { date: dateFormat.format(bucket.start) })
              : weekdayFormat.format(bucket.start),
        value: bucket.value,
      })),
    [current, range, metric, dateFormat, timeFormat, weekdayFormat, t]
  );

  const hours = useMemo(
    () =>
      hourProfile(current).map((value, hour) => ({
        label: String(hour).padStart(2, '0'),
        title: t('{{from}}:00–{{to}}:00', {
          from: String(hour).padStart(2, '0'),
          to: String((hour + 1) % 24).padStart(2, '0'),
        }),
        value,
      })),
    [current, t]
  );

  const contacts = useMemo(() => topContacts(current, 5), [current]);
  const misses = useMemo(() => unreturnedMisses(calls), [calls]);
  const recent = current.slice(0, 6);

  const displayName = [dashboard.data?.userName].filter(Boolean).join(' ');
  const registered = Boolean(status.data?.ipRegistered);

  const minutes = now.seconds / 60;
  const talkTime =
    minutes >= 120
      ? t('{{value}} h', { value: (minutes / 60).toFixed(1) })
      : t('{{value}} min', { value: minutes.toFixed(minutes < 10 ? 1 : 0) });

  const rangeLabels: Record<RangeKey, string> = {
    today: t('Today'),
    '7d': t('7 days'),
    '30d': t('30 days'),
    '90d': t('90 days'),
  };
  const metricLabels: Record<TrendMetric, string> = {
    total: t('Total calls'),
    inbound: t('Received'),
    outbound: t('Placed'),
    missed: t('Missed'),
    minutes: t('Talk minutes'),
  };

  const refresh = (): void => {
    void queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const value = (content: ReactNode): ReactNode =>
    loading ? <Skeleton className='mt-1 h-7 w-16' /> : content;
  const vsPrevious = t('vs previous period');

  return (
    <>
      <PageHeader
        title={
          displayName
            ? t('Welcome back, {{name}}', { name: displayName })
            : t('Overview')
        }
        description={t('Here’s what’s happening with your calls.')}
        actions={
          <>
            <Segmented
              label={t('Date range')}
              value={rangeKey}
              onChange={(next) => setParam('range', next)}
              options={RANGES.map((key) => ({
                value: key,
                label: rangeLabels[key],
              }))}
            />
            <span className='hidden h-10 items-center gap-2 rounded-(--radius-control) border border-border-subtle bg-surface px-3 text-[0.8125rem] font-medium tabular-nums text-fg-muted xl:inline-flex'>
              <CalendarDays className='size-4 text-fg-subtle' aria-hidden />
              {range.key === 'today'
                ? dateFormat.format(range.start)
                : `${dateFormat.format(range.start)} – ${dateFormat.format(range.end)}`}
            </span>
            <Button
              variant='secondary'
              size='icon'
              className='size-10'
              onClick={refresh}
              aria-label={t('Refresh')}
            >
              <RefreshCw className={cn(history.isFetching && 'animate-spin')} />
            </Button>
            <Button asChild variant='primary' className='h-10'>
              <Link to='calls'>
                <History /> {t('Call history')}
              </Link>
            </Button>
          </>
        }
      />

      {history.isError ? (
        <Card className='mb-4 border-danger/40 p-4 text-sm text-danger'>
          {t('Could not load your calls')}: {(history.error as Error).message}
        </Card>
      ) : null}

      <div className='grid grid-cols-2 gap-3 md:grid-cols-4 2xl:grid-cols-8'>
        <Stat
          icon={PhoneCall}
          label={t('Total calls')}
          value={value(now.total.toLocaleString())}
          change={
            <Delta value={change(now.total, before.total)} goodWhen='neither' />
          }
          hint={vsPrevious}
        />
        <Stat
          icon={ArrowDownLeft}
          label={t('Received')}
          value={value(now.inbound.toLocaleString())}
          change={
            <Delta
              value={change(now.inbound, before.inbound)}
              goodWhen='neither'
            />
          }
          hint={vsPrevious}
        />
        <Stat
          icon={ArrowUpRight}
          label={t('Placed')}
          value={value(now.outbound.toLocaleString())}
          change={
            <Delta
              value={change(now.outbound, before.outbound)}
              goodWhen='neither'
            />
          }
          hint={vsPrevious}
        />
        <Stat
          icon={PhoneMissed}
          label={t('Missed')}
          value={value(now.missed.toLocaleString())}
          change={
            <Delta value={change(now.missed, before.missed)} goodWhen='down' />
          }
          hint={vsPrevious}
        />
        <Stat
          icon={Clock}
          label={t('Talk time')}
          value={value(talkTime)}
          change={
            <Delta
              value={change(now.seconds, before.seconds)}
              goodWhen='neither'
            />
          }
          hint={t('{{count}} reported durations', { count: now.total })}
        />
        <Stat
          icon={Timer}
          label={t('Avg call length')}
          value={value(
            now.averageSeconds === null
              ? '—'
              : formatDuration(now.averageSeconds)
          )}
          change={
            now.averageSeconds !== null && before.averageSeconds !== null ? (
              <Delta
                value={change(now.averageSeconds, before.averageSeconds)}
                goodWhen='neither'
              />
            ) : null
          }
          hint={t('Answered calls only')}
        />
        <Stat
          icon={CheckCircle2}
          label={t('Answer rate')}
          value={value(
            now.answerRate === null
              ? '—'
              : `${Math.round(now.answerRate * 100)}%`
          )}
          change={
            now.answerRate !== null && before.answerRate !== null ? (
              <Delta
                value={now.answerRate - before.answerRate}
                unit='points'
                goodWhen='up'
              />
            ) : null
          }
          hint={t('Answered ÷ all calls')}
        />
        <Stat
          icon={Mic}
          label={t('Recorded')}
          value={value(now.recorded.toLocaleString())}
          change={
            <Delta
              value={change(now.recorded, before.recorded)}
              goodWhen='neither'
            />
          }
          hint={t('Calls with a recording')}
        />
      </div>

      <div className='mt-4 grid gap-4 xl:grid-cols-3'>
        <Panel
          className='xl:col-span-2'
          icon={BarChart3}
          title={t('Call volume trend')}
          description={t('Your calls over time · local time')}
        >
          <div
            role='tablist'
            aria-label={t('Metric')}
            className='grid grid-cols-2 gap-1.5 px-5 sm:grid-cols-5'
          >
            {METRICS.map((key) => (
              <button
                key={key}
                type='button'
                role='tab'
                aria-selected={metric === key}
                onClick={() => setParam('metric', key)}
                className={cn(
                  'truncate rounded-(--radius-control) border px-3 py-1.5 text-xs font-medium transition-colors',
                  metric === key
                    ? 'border-brand/60 bg-brand-tint-strong text-fg'
                    : 'border-border-subtle text-fg-muted hover:border-border-strong hover:text-fg'
                )}
              >
                {metricLabels[key]}
              </button>
            ))}
          </div>
          <div className='px-3 pb-3 pt-4 sm:px-5'>
            {loading ? (
              <Skeleton className='h-[260px] w-full' />
            ) : (
              <AreaTrend
                data={trend}
                seriesLabel={metricLabels[metric]}
                formatValue={(n) =>
                  metric === 'minutes'
                    ? n.toLocaleString()
                    : String(Math.round(n))
                }
              />
            )}
          </div>
        </Panel>

        <Panel
          icon={AlertTriangle}
          iconTone='danger'
          title={t('Needs attention')}
          description={t('Missed calls you haven’t returned')}
          action={
            <Link
              to='calls?disposition=missed'
              className='text-xs font-medium text-brand-fg hover:underline'
            >
              {t('View all')}
            </Link>
          }
        >
          {loading ? (
            <div className='space-y-3 px-5 pb-5'>
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
          ) : misses.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title={t('You’re all caught up')}
              description={t(
                'Every missed call has been returned or answered since.'
              )}
            />
          ) : (
            <ul className='divide-y divide-border-subtle border-t border-border-subtle'>
              {misses.slice(0, 5).map((miss) => (
                <li
                  key={miss.number}
                  className='flex items-center gap-3 px-5 py-3'
                >
                  <span className='grid size-8 shrink-0 place-items-center rounded-full bg-danger/12 text-danger'>
                    <PhoneMissed className='size-4' aria-hidden />
                  </span>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium tabular-nums text-fg'>
                      {miss.number}
                    </p>
                    <p className='truncate text-xs text-fg-muted'>
                      {t('{{count}} missed · last {{when}}', {
                        count: miss.missed,
                        when: formatDateTime(miss.lastMissedAt),
                      })}
                    </p>
                  </div>
                  <Link
                    to={`calls?q=${encodeURIComponent(miss.number)}`}
                    className='text-xs font-medium text-brand-fg hover:underline'
                  >
                    {t('History')}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Footnote>
            {t(
              'From your call records since {{date}} · a callback made from another phone is not visible here',
              { date: dateFormat.format(range.previousStart) }
            )}
          </Footnote>
        </Panel>
      </div>

      <div className='mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
        <Panel icon={PieChart} title={t('Call outcomes')}>
          <div className='px-5 pb-2'>
            {loading ? (
              <Skeleton className='h-36 w-full' />
            ) : (
              <Donut
                centerValue={now.total.toLocaleString()}
                centerLabel={t('calls')}
                segments={[
                  {
                    key: 'answered',
                    label: t('Answered'),
                    value: now.answered,
                    color: 'var(--series-1)',
                  },
                  {
                    key: 'missed',
                    label: t('Missed'),
                    value: now.missed,
                    color: 'var(--series-2)',
                  },
                  {
                    key: 'busy',
                    label: t('Busy'),
                    value: now.busy,
                    color: 'var(--series-3)',
                  },
                  {
                    key: 'failed',
                    label: t('Failed'),
                    value: now.failed,
                    color: 'var(--series-4)',
                  },
                ]}
              />
            )}
          </div>
          <Footnote>{t('As recorded by the platform for each call')}</Footnote>
        </Panel>

        <Panel
          icon={Clock}
          title={t('Busiest hours')}
          description={t('Calls by hour of day · local time')}
        >
          <div className='px-5 pb-2 pt-1'>
            {loading ? (
              <Skeleton className='h-[150px] w-full' />
            ) : (
              <ColumnChart
                data={hours}
                seriesLabel={t('Calls by hour of day')}
                labelEvery={3}
              />
            )}
          </div>
          <Footnote>
            {now.total > 0
              ? t('Peak: {{hour}}:00 with {{count}} calls', {
                  hour: String(
                    hours.reduce(
                      (best, h, i) => (h.value > hours[best]!.value ? i : best),
                      0
                    )
                  ).padStart(2, '0'),
                  count: Math.max(...hours.map((h) => h.value)),
                })
              : t('No calls in this range')}
          </Footnote>
        </Panel>

        <Panel
          icon={Smartphone}
          title={t('My device')}
          action={
            <span
              className={cn(
                'inline-flex items-center gap-2 text-xs font-medium',
                registered ? 'text-success' : 'text-warning'
              )}
            >
              <span className='relative flex size-2'>
                {registered ? (
                  <span className='absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60' />
                ) : null}
                <span
                  className={cn(
                    'relative inline-flex size-2 rounded-full',
                    registered ? 'bg-success' : 'bg-warning'
                  )}
                />
              </span>
              {registered ? t('Registered') : t('Not registered')}
            </span>
          }
          className='lg:col-span-2 xl:col-span-1'
        >
          <dl className='space-y-3 px-5 pb-2'>
            <DetailRow
              label={t('Terminal')}
              value={status.data?.terminalName}
            />
            <DetailRow label={t('Device')} value={status.data?.userAgent} />
            <DetailRow
              label={t('Registered from')}
              value={status.data?.ipRegistered}
            />
            <DetailRow
              label={t('Extension')}
              value={status.data?.extensionNumber}
            />
            <DetailRow
              label={t('Outgoing number')}
              value={dashboard.data?.outgoingDdi}
            />
          </dl>
          <Footnote>
            {t('Registration as last reported by the platform')}
          </Footnote>
        </Panel>
      </div>

      <div className='mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
        <Panel
          icon={History}
          title={t('Recent activity')}
          action={
            <Link
              to='calls'
              className='text-xs font-medium text-brand-fg hover:underline'
            >
              {t('View all')}
            </Link>
          }
        >
          {loading ? (
            <div className='space-y-3 px-5 pb-5'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          ) : recent.length === 0 ? (
            <EmptyState icon={PhoneCall} title={t('No calls in this range')} />
          ) : (
            <ul className='divide-y divide-border-subtle border-t border-border-subtle'>
              {recent.map((call, index) => (
                <li
                  key={`${call.startTime}-${index}`}
                  className='flex items-center gap-3 px-5 py-2.5'
                >
                  <DirectionIcon direction={call.direction} />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium tabular-nums text-fg'>
                      {counterpart(call) ?? '—'}
                    </p>
                    <p className='truncate text-xs text-fg-muted'>
                      {formatDateTime(call.startTime)} ·{' '}
                      {formatDuration(call.duration)}
                    </p>
                  </div>
                  <DispositionBadge value={call.disposition} />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          icon={Users}
          title={t('Top contacts')}
          description={t('Who you talk to most in this range')}
        >
          <div className='px-5 pb-5'>
            {loading ? (
              <Skeleton className='h-40 w-full' />
            ) : contacts.length === 0 ? (
              <EmptyState icon={Users} title={t('No calls in this range')} />
            ) : (
              <BarList
                items={contacts.map((contact) => ({
                  key: contact.number,
                  label: <span className='tabular-nums'>{contact.number}</span>,
                  value: contact.calls,
                  detail: `${Math.round(contact.share * 100)}%`,
                }))}
              />
            )}
          </div>
        </Panel>

        <Panel
          icon={PhoneForwarded}
          title={t('Call forwarding')}
          action={
            <Link
              to='forwarding'
              className='text-xs font-medium text-brand-fg hover:underline'
            >
              {t('Manage')}
            </Link>
          }
          className='lg:col-span-2 xl:col-span-1'
        >
          {forwarding.isPending ? (
            <div className='px-5 pb-5'>
              <Skeleton className='h-24 w-full' />
            </div>
          ) : (forwarding.data?.items.length ?? 0) === 0 ? (
            <EmptyState
              icon={PhoneForwarded}
              title={t('No forwarding rules')}
              description={t('Calls ring only on your own device.')}
            />
          ) : (
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-y border-border-subtle bg-bg-subtle text-left text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-subtle'>
                  <th className='px-5 py-2 font-semibold'>{t('When')}</th>
                  <th className='px-2 py-2 font-semibold'>{t('Forward to')}</th>
                  <th className='px-5 py-2 text-right font-semibold'>
                    {t('Status')}
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border-subtle'>
                {forwarding.data?.items.map((rule, index) => (
                  <tr key={String(rule.id ?? index)}>
                    <td className='px-5 py-2.5 text-fg'>
                      {forwardWhen(rule.callForwardType, t)}
                    </td>
                    <td className='px-2 py-2.5 text-fg-muted'>
                      {forwardTarget(rule, t)}
                    </td>
                    <td className='px-5 py-2.5 text-right'>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
                          rule.enabled
                            ? 'bg-success/10 text-success ring-success/25'
                            : 'bg-bg-subtle text-fg-muted ring-border-subtle'
                        )}
                      >
                        <span
                          aria-hidden
                          className='size-1.5 rounded-full bg-current'
                        />
                        {rule.enabled ? t('On') : t('Off')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>
      </div>
    </>
  );
}

function forwardWhen(
  type: string | null | undefined,
  t: (key: string) => string
): string {
  switch (type) {
    case 'inconditional':
      return t('Always');
    case 'noAnswer':
      return t('When I do not answer');
    case 'busy':
      return t('When I am busy');
    case 'userNotRegistered':
      return t('When my device is offline');
    default:
      return '—';
  }
}

function forwardTarget(
  rule: CallForwardSetting,
  t: (key: string) => string
): string {
  switch (rule.targetType) {
    case 'number':
      return rule.numberValue ?? t('An external number');
    case 'extension':
      return t('An extension');
    case 'voicemail':
      return t('A voicemail box');
    case 'retail':
      return t('A retail account');
    default:
      return t('Nowhere');
  }
}

/** A dashboard card: icon, title, optional description and header action. */
function Panel({
  icon: Icon,
  iconTone = 'brand',
  title,
  description,
  action,
  className,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  iconTone?: 'brand' | 'danger';
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <Card className={cn('flex min-w-0 flex-col', className)}>
      <div className='flex items-start gap-3 px-5 pb-4 pt-5'>
        <span
          className={cn(
            'grid size-9 shrink-0 place-items-center rounded-(--radius-control)',
            iconTone === 'danger'
              ? 'bg-danger/12 text-danger'
              : 'bg-brand-tint-strong text-brand-fg'
          )}
        >
          <Icon className='size-[1.125rem]' />
        </span>
        <div className='min-w-0 flex-1'>
          <h2 className='text-[0.9375rem] font-semibold tracking-tight text-fg'>
            {title}
          </h2>
          {description ? (
            <p className='mt-0.5 text-xs text-fg-subtle'>{description}</p>
          ) : null}
        </div>
        {action ? <div className='shrink-0 pt-0.5'>{action}</div> : null}
      </div>
      <div className='flex flex-1 flex-col'>{children}</div>
    </Card>
  );
}

/** Where a figure comes from, in the card's own words. */
function Footnote({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <p className='mt-auto px-5 pb-4 pt-2 text-[0.6875rem] leading-snug text-fg-subtle'>
      {children}
    </p>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}): React.JSX.Element {
  return (
    <div className='flex items-baseline justify-between gap-4'>
      <dt className='shrink-0 text-sm text-fg-muted'>{label}</dt>
      <dd className='min-w-0 truncate text-right text-sm font-medium tabular-nums text-fg'>
        {value === null || value === undefined || value === '' ? (
          <span className='font-normal text-fg-subtle'>—</span>
        ) : (
          String(value)
        )}
      </dd>
    </div>
  );
}
