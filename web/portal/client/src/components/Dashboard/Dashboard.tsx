import _ from '@irontec/ivoz-ui/services/translations/translate';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import DialpadRoundedIcon from '@mui/icons-material/DialpadRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import RouterRoundedIcon from '@mui/icons-material/RouterRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import VoicemailRoundedIcon from '@mui/icons-material/VoicemailRounded';
import { ReactNode } from 'react';
import { useStoreState } from 'store';

import { useBranding } from '../Branding';
import {
  ActiveCallsSummary,
  Column,
  DashboardGrid,
  Donut,
  Hero,
  HeroAction,
  HeroChip,
  InfoCard,
  RecentTable,
  Stat,
  StatGrid,
  useMyResource,
  useUsername,
  Who,
} from '../Redesign';
import {
  DashboardData,
  LastCall,
  ResidentialDevices,
  RetailAccount,
  User,
} from './@types';

/** 0 means "no limit" for client max calls. */
const limit = (value: number | string | undefined) =>
  Number(value) > 0 ? value : _('Unlimited');

type ClientType = 'vpbx' | 'residential' | 'retail' | 'wholesale';

interface Layout {
  title: ReactNode;
  lead: ReactNode;
  actions: HeroAction[];
  chip?: HeroChip;
  stats: Stat[];
  recent: {
    title: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: Column<any>[];
    path?: string;
    empty: ReactNode;
    /** The API sorts these newest first (verified in the repositories). */
    newest?: boolean;
  };
}

const viewCalls: HeroAction = {
  label: _('View calls'),
  path: '/billable_calls',
  ghost: true,
};

function layoutFor(
  type: ClientType,
  data: DashboardData,
  calls: ActiveCallsSummary | undefined,
  productName: string
): Layout {
  const ddis: Stat = {
    label: _('DDI', { count: 2 }),
    value: data.ddiNum,
    icon: <TagRoundedIcon />,
    tone: 'violet',
    path: '/ddis',
    linkLabel: _('View'),
  };
  const ddiColumn: Column<{ outgoingDdi: string }> = {
    label: _('Outgoing DDI'),
    render: (row) => row.outgoingDdi || '—',
  };

  if (type === 'wholesale') {
    return {
      title: _('Welcome to the {{productName}} wholesale client portal', {
        productName,
      }),
      lead: _(
        'In this portal you can add wholesale accounts, manage Rating Profiles and much more.'
      ),
      actions: [{ label: _('Active calls'), path: '/active_calls' }, viewCalls],
      stats: [
        {
          label: _('Active call', { count: 2 }),
          value: calls?.total,
          icon: <PhoneInTalkRoundedIcon />,
          tone: 'emerald',
          path: '/active_calls',
          linkLabel: _('View'),
        },
        {
          label: _('Inbound Call', { count: 2 }),
          value: calls?.inbound,
          icon: <CallReceivedRoundedIcon />,
          tone: 'violet',
        },
        {
          label: _('Outbound Call', { count: 2 }),
          value: calls?.outbound,
          icon: <CallMadeRoundedIcon />,
          tone: 'amber',
        },
      ],
      recent: {
        title: _('Last Calls'),
        rows: data.latestBillableCalls ?? [],
        path: '/billable_calls',
        empty: _('No calls yet'),
        columns: [
          { label: _('Date'), render: (row: LastCall) => row.startTime },
          { label: _('Caller'), render: (row: LastCall) => row.caller },
          { label: _('Callee'), render: (row: LastCall) => row.callee },
          {
            label: _('Duration'),
            render: (row: LastCall) => `${row.duration} s`,
            align: 'end',
          },
        ],
      },
    };
  }

  if (type === 'residential') {
    return {
      title: _('Welcome to the {{productName}} residential client portal', {
        productName,
      }),
      lead: _(
        'In this portal you can add residential accounts, manage DDis and much more.'
      ),
      actions: [
        {
          label: _('New device'),
          path: '/residential_devices/create',
          icon: <AddRoundedIcon />,
        },
        viewCalls,
      ],
      chip: {
        value: data.residentialDeviceNum ?? 0,
        label: _('residential devices'),
        icon: <RouterRoundedIcon />,
      },
      stats: [
        {
          label: _('Residential Device', { count: 2 }),
          value: data.residentialDeviceNum,
          icon: <RouterRoundedIcon />,
          tone: 'emerald',
          path: '/residential_devices',
          linkLabel: _('View'),
        },
        {
          label: _('Voicemail', { count: 2 }),
          value: data.voiceMailNum,
          icon: <VoicemailRoundedIcon />,
          tone: 'amber',
          path: '/voicemails',
          linkLabel: _('View'),
        },
        ddis,
      ],
      recent: {
        title: _('Last added residential devices'),
        rows: data.latestResidentialDevices ?? [],
        path: '/residential_devices',
        empty: _('No devices yet'),
        columns: [
          {
            label: _('Name'),
            render: (row: ResidentialDevices) => (
              <Who name={row.name} detail={row.description} />
            ),
          },
          ddiColumn,
        ],
      },
    };
  }

  if (type === 'retail') {
    return {
      title: _('Welcome to the {{productName}} retail client portal', {
        productName,
      }),
      lead: _(
        'In this portal you can add retail accounts, manage DDIs and much more.'
      ),
      actions: [
        {
          label: _('New account'),
          path: '/retail_accounts/create',
          icon: <AddRoundedIcon />,
        },
        viewCalls,
      ],
      chip: {
        value: data.retailsAccountNum ?? 0,
        label: _('retail accounts'),
        icon: <StorefrontRoundedIcon />,
      },
      stats: [
        {
          label: _('Retail Account', { count: 2 }),
          value: data.retailsAccountNum,
          icon: <StorefrontRoundedIcon />,
          tone: 'emerald',
          path: '/retail_accounts',
          linkLabel: _('View'),
        },
        ddis,
        {
          label: _('Active call', { count: 2 }),
          value: calls?.total,
          icon: <PhoneInTalkRoundedIcon />,
          tone: 'amber',
          path: '/active_calls',
          linkLabel: _('View'),
        },
      ],
      recent: {
        title: _('Last added retail accounts'),
        rows: data.latestRetailAccounts ?? [],
        path: '/retail_accounts',
        empty: _('No accounts yet'),
        newest: true,
        columns: [
          {
            label: _('Name'),
            render: (row: RetailAccount) => (
              <Who name={row.name} detail={row.description} />
            ),
          },
          ddiColumn,
        ],
      },
    };
  }

  return {
    title: _('Welcome to the {{productName}} vPBX client portal', {
      productName,
    }),
    lead: _(
      'In this portal you can add users, extensions, huntgroups and much more.'
    ),
    actions: [
      { label: _('New user'), path: '/users/create', icon: <AddRoundedIcon /> },
      viewCalls,
    ],
    chip: {
      value: data.userNum ?? 0,
      label: _('users'),
      icon: <GroupsRoundedIcon />,
    },
    stats: [
      {
        label: _('User', { count: 2 }),
        value: data.userNum,
        icon: <GroupsRoundedIcon />,
        tone: 'emerald',
        path: '/users',
        linkLabel: _('View'),
      },
      {
        label: _('Extension', { count: 2 }),
        value: data.extensionNum,
        icon: <DialpadRoundedIcon />,
        tone: 'amber',
        path: '/extensions',
        linkLabel: _('View'),
      },
      ddis,
    ],
    recent: {
      title: _('Last added users'),
      rows: data.latestUsers ?? [],
      path: '/users',
      empty: _('No users yet'),
      newest: true,
      columns: [
        {
          label: _('User'),
          render: (row: User) => (
            <Who
              name={[row.name, row.lastName].filter(Boolean).join(' ')}
              detail={
                row.extension
                  ? _('Extension {{number}}', { number: row.extension })
                  : undefined
              }
            />
          ),
        },
        ddiColumn,
      ],
    },
  };
}

export interface DashboardProps {
  className?: string;
}

const Dashboard = (props: DashboardProps): JSX.Element | null => {
  const branding = useBranding();
  const username = useUsername();
  const aboutMe = useStoreState((state) => state.clientSession.aboutMe.profile);
  const data = useMyResource<DashboardData>('/my/dashboard');
  const calls = useMyResource<ActiveCallsSummary>('/my/active_calls', 30000);

  if (!data || !aboutMe) {
    return null;
  }

  const type: ClientType = aboutMe.wholesale
    ? 'wholesale'
    : aboutMe.residential
    ? 'residential'
    : aboutMe.retail
    ? 'retail'
    : 'vpbx';
  const productName = data.productName || branding.productName;
  const layout = layoutFor(type, data, calls, productName);
  const client = data.client;

  return (
    <DashboardGrid className={props.className}>
      <Hero
        greeting={username ? _('Hello, {{name}}', { name: username }) : null}
        title={layout.title}
        lead={layout.lead}
        actions={layout.actions}
        chips={[
          ...(calls
            ? [{ value: calls.total, label: _('live calls now'), live: true }]
            : []),
          ...(layout.chip ? [layout.chip] : []),
        ]}
      />

      <InfoCard
        title={_('Client information')}
        subtitle={[client?.name, client?.nif && `NIF ${client.nif}`]
          .filter(Boolean)
          .join(' · ')}
        rows={[
          { label: _('Domain'), value: client?.domainUsers, mono: true },
          { label: _('Max calls'), value: limit(client?.maxCalls) },
          { label: _('Postal code'), value: client?.postalCode },
        ]}
      />

      <StatGrid stats={layout.stats} />

      <Donut
        title={_('Active call', { count: 2 })}
        subtitle={_('Live, refreshed every 30 s')}
        total={calls?.total ?? 0}
        totalLabel={_('live calls')}
        parts={[
          { label: _('Inbound'), value: calls?.inbound ?? 0, tone: 'emerald' },
          {
            label: _('Outbound'),
            value: calls?.outbound ?? 0,
            tone: 'violet',
          },
        ]}
        extra={{
          label: _('Capacity'),
          value: Number(client?.maxCalls) > 0 ? client?.maxCalls : '∞',
        }}
      />

      <RecentTable
        title={layout.recent.title}
        subtitle={layout.recent.newest ? _('Newest first') : undefined}
        rows={layout.recent.rows}
        columns={layout.recent.columns}
        empty={layout.recent.empty}
        seeAll={
          layout.recent.path
            ? { label: _('See all'), path: layout.recent.path }
            : undefined
        }
      />
    </DashboardGrid>
  );
};

export default Dashboard;
