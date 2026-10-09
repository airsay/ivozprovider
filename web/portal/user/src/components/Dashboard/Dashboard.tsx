import _ from '@irontec/ivoz-ui/services/translations/translate';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import PhoneForwardedRoundedIcon from '@mui/icons-material/PhoneForwardedRounded';

import { useBranding } from '../Branding';
import {
  DashboardGrid,
  Donut,
  Hero,
  InfoCard,
  RecentTable,
  StatGrid,
  useMyResource,
} from '../Redesign';

interface DashboardData {
  userName: string;
  userLastName: string;
  email: string;
  outgoingDdi: string;
  extension: string;
  terminal: string;
  productName: string;
}

interface LastMonthCalls {
  inbound: number;
  outbound: number;
  total: number;
}

interface LastCall {
  startTime: string;
  caller: string;
  callee: string;
  duration: string | number;
}

const CALLS_PATH = '/my/call_history';
const FORWARDS_PATH = '/my/call_forward_settings';

export interface DashboardProps {
  className?: string;
}

const Dashboard = (props: DashboardProps): JSX.Element | null => {
  const branding = useBranding();
  const data = useMyResource<DashboardData>('/my/dashboard');
  const lastMonth = useMyResource<LastMonthCalls>('/my/last_month_calls');
  const forwards = useMyResource<unknown[]>(FORWARDS_PATH);
  const lastCalls = useMyResource<LastCall[]>(
    '/my/call_history?_itemsPerPage=5&_page=1&_pagination=true'
  );

  if (!data) {
    return null;
  }

  const productName = data.productName || branding.productName;
  const forwardCount = Array.isArray(forwards) ? forwards.length : undefined;

  return (
    <DashboardGrid className={props.className}>
      <Hero
        greeting={
          data.userName ? _('Hello, {{name}}', { name: data.userName }) : null
        }
        title={_('Welcome to the {{productName}} vPBX user portal', {
          productName,
        })}
        lead={_(
          'In this portal you can see and modify your configuration, list your calls and much more.'
        )}
        actions={[
          {
            label: _('Call forwarding'),
            path: FORWARDS_PATH,
            icon: <PhoneForwardedRoundedIcon />,
          },
          { label: _('Call history'), path: CALLS_PATH, ghost: true },
        ]}
        chips={[
          ...(lastMonth
            ? [
                {
                  value: lastMonth.total,
                  label: _('calls last month'),
                  icon: <CallRoundedIcon />,
                },
              ]
            : []),
          ...(forwardCount !== undefined
            ? [
                {
                  value: forwardCount,
                  label: _('call forwarding rules'),
                  icon: <PhoneForwardedRoundedIcon />,
                },
              ]
            : []),
        ]}
      />

      <InfoCard
        title={_('User information')}
        subtitle={[data.userName, data.userLastName].filter(Boolean).join(' ')}
        rows={[
          { label: _('Extension'), value: data.extension },
          { label: _('Terminal'), value: data.terminal, mono: true },
          { label: _('Email'), value: data.email },
          { label: _('Outbound DDI'), value: data.outgoingDdi },
        ]}
      />

      <StatGrid
        stats={[
          {
            label: _('Call forwarding settings'),
            value: forwardCount,
            icon: <PhoneForwardedRoundedIcon />,
            tone: 'emerald',
            path: FORWARDS_PATH,
            linkLabel: _('View'),
          },
          {
            label: _('Inbound calls'),
            value: lastMonth?.inbound,
            note: _('last month'),
            icon: <CallReceivedRoundedIcon />,
            tone: 'violet',
            path: CALLS_PATH,
            linkLabel: _('View'),
          },
          {
            label: _('Outbound calls'),
            value: lastMonth?.outbound,
            note: _('last month'),
            icon: <CallMadeRoundedIcon />,
            tone: 'amber',
            path: CALLS_PATH,
            linkLabel: _('View'),
          },
        ]}
      />

      <Donut
        title={_('Calls last month')}
        total={lastMonth?.total ?? 0}
        totalLabel={_('calls')}
        parts={[
          {
            label: _('Inbound'),
            value: lastMonth?.inbound ?? 0,
            tone: 'emerald',
          },
          {
            label: _('Outbound'),
            value: lastMonth?.outbound ?? 0,
            tone: 'violet',
          },
        ]}
      />

      <RecentTable
        title={_('Recent calls')}
        rows={Array.isArray(lastCalls) ? lastCalls : []}
        seeAll={{ label: _('See all'), path: CALLS_PATH }}
        empty={_('No calls yet')}
        columns={[
          {
            label: _('Date'),
            render: (row) => new Date(row.startTime).toLocaleString(),
          },
          { label: _('Caller'), render: (row) => row.caller },
          { label: _('Callee'), render: (row) => row.callee },
          {
            label: _('Duration'),
            render: (row) => `${row.duration} s`,
            align: 'end',
          },
        ]}
      />
    </DashboardGrid>
  );
};

export default Dashboard;
