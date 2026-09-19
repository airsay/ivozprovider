import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  PageHeader,
  Skeleton,
  Stat,
  useSingleton,
} from '@axion/portal-core';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleCheck,
  CircleSlash,
  Phone,
  PhoneForwarded,
  Voicemail as VoicemailIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type {
  CallStats,
  Dashboard as DashboardData,
  LastMonthCalls,
  UserStatus,
} from '../api';

/**
 * The self-care landing page.
 *
 * Answers the three things a user actually opens this portal to find out: is my
 * phone working, what happened to my calls, and where are my calls going.
 * Everything here is one request each against the `/my/*` controllers.
 */
export function DashboardScreen(): React.JSX.Element {
  const { t } = useTranslation();

  const dashboard = useSingleton<DashboardData>('my/dashboard');
  const status = useSingleton<UserStatus>('my/status');
  const stats = useSingleton<CallStats>('my/call_stats');
  const lastMonth = useSingleton<LastMonthCalls>('my/last_month_calls');

  const profile = dashboard.data;
  const displayName = [profile?.userName, profile?.userLastName]
    .filter(Boolean)
    .join(' ');
  const registered = status.data?.ipRegistered ? true : false;

  return (
    <>
      <PageHeader
        title={
          displayName
            ? t('Hello, {{name}}', { name: displayName })
            : t('Overview')
        }
        description={
          profile?.extension
            ? t('Extension {{extension}}', { extension: profile.extension })
            : undefined
        }
        actions={
          <Button asChild variant='secondary'>
            <Link to='forwarding'>
              <PhoneForwarded /> {t('Call forwarding')}
            </Link>
          </Button>
        }
      />

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <Stat
          label={t('Calls this month')}
          value={
            stats.isPending ? (
              <Skeleton className='h-8 w-16' />
            ) : (
              (stats.data?.totalCalls ?? 0)
            )
          }
          icon={Phone}
        />
        <Stat
          label={t('Forwarded calls')}
          value={
            stats.isPending ? (
              <Skeleton className='h-8 w-16' />
            ) : (
              (stats.data?.totalDetours ?? 0)
            )
          }
          icon={PhoneForwarded}
        />
        <Stat
          label={t('Received last month')}
          value={
            lastMonth.isPending ? (
              <Skeleton className='h-8 w-16' />
            ) : (
              (lastMonth.data?.inbound ?? 0)
            )
          }
          icon={ArrowDownLeft}
        />
        <Stat
          label={t('Placed last month')}
          value={
            lastMonth.isPending ? (
              <Skeleton className='h-8 w-16' />
            ) : (
              (lastMonth.data?.outbound ?? 0)
            )
          }
          icon={ArrowUpRight}
        />
      </div>

      <div className='mt-5 grid gap-5 lg:grid-cols-3'>
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>{t('My device')}</CardTitle>
            <Badge tone={registered ? 'success' : 'warning'}>
              {registered ? (
                <>
                  <CircleCheck className='size-3' aria-hidden />{' '}
                  {t('Registered')}
                </>
              ) : (
                <>
                  <CircleSlash className='size-3' aria-hidden />{' '}
                  {t('Not registered')}
                </>
              )}
            </Badge>
          </CardHeader>
          <CardBody>
            {status.isPending ? (
              <div className='space-y-3'>
                <Skeleton className='h-4 w-2/3' />
                <Skeleton className='h-4 w-1/2' />
              </div>
            ) : (
              <dl className='grid gap-x-8 gap-y-3 sm:grid-cols-2'>
                <DetailRow
                  label={t('Terminal')}
                  value={status.data?.terminalName}
                />
                <DetailRow
                  label={t('Extension')}
                  value={status.data?.extensionNumber}
                />
                <DetailRow
                  label={t('Company')}
                  value={status.data?.companyName}
                />
                <DetailRow
                  label={t('Outgoing number')}
                  value={profile?.outgoingDdi}
                />
                <DetailRow
                  label={t('Registered from')}
                  value={status.data?.ipRegistered}
                />
                <DetailRow label={t('Device')} value={status.data?.userAgent} />
              </dl>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('Shortcuts')}</CardTitle>
          </CardHeader>
          <CardBody className='flex flex-col gap-2'>
            <Button asChild variant='secondary' className='justify-start'>
              <Link to='calls'>
                <Phone /> {t('Call history')}
              </Link>
            </Button>
            <Button asChild variant='secondary' className='justify-start'>
              <Link to='voicemail'>
                <VoicemailIcon /> {t('Voicemail')}
              </Link>
            </Button>
            <Button asChild variant='secondary' className='justify-start'>
              <Link to='forwarding'>
                <PhoneForwarded /> {t('Call forwarding')}
              </Link>
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
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
    <div className='min-w-0'>
      <dt className='text-xs uppercase tracking-wide text-fg-subtle'>
        {label}
      </dt>
      <dd className='mt-0.5 truncate text-sm text-fg'>
        {value === null || value === undefined || value === '' ? (
          <span className='text-fg-subtle'>—</span>
        ) : (
          String(value)
        )}
      </dd>
    </div>
  );
}
