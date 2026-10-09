import _ from '@irontec/ivoz-ui/services/translations/translate';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

import { useBranding } from '../Branding';
import {
  ActiveCallsSummary,
  DashboardGrid,
  Donut,
  Hero,
  InfoCard,
  RecentTable,
  StatGrid,
  useMyResource,
  Who,
} from '../Redesign';

interface DashboardAdmin {
  username?: string;
  name?: string;
  lastname?: string;
  email?: string;
}

interface DashboardBrand {
  id: number;
  name: string;
  nif: string;
  sipDomain: string;
  maxCalls: number;
}

interface DashboardData {
  admin: DashboardAdmin;
  recentActivity: DashboardBrand[];
  brandNumber: number;
  clientNumber: number;
  userNumber: number;
  productName: string;
}

/** 0 means "no limit" for max calls. */
const limit = (value: number | string | undefined) =>
  Number(value) > 0 ? value : _('Unlimited');

export interface DashboardProps {
  className?: string;
}

const Dashboard = (props: DashboardProps): JSX.Element | null => {
  const branding = useBranding();
  const data = useMyResource<DashboardData>('/my/dashboard');
  const calls = useMyResource<ActiveCallsSummary>('/my/active_calls', 30000);

  if (!data) {
    return null;
  }

  const productName = data.productName || branding.productName;
  const fullName = [data.admin?.name, data.admin?.lastname]
    .filter(Boolean)
    .join(' ');

  return (
    <DashboardGrid className={props.className}>
      <Hero
        greeting={
          data.admin?.name || data.admin?.username
            ? _('Hello, {{name}}', {
                name: data.admin.name || data.admin.username,
              })
            : null
        }
        title={_('Welcome to the {{productName}} platform portal', {
          productName,
        })}
        lead={_(
          'Add brands and their operators, and keep an eye on live traffic across the platform.'
        )}
        actions={[
          {
            label: _('New brand'),
            path: '/brands/create',
            icon: <AddRoundedIcon />,
          },
          { label: _('View calls'), path: '/billable_calls', ghost: true },
        ]}
        chips={[
          ...(calls
            ? [{ value: calls.total, label: _('live calls now'), live: true }]
            : []),
          {
            value: data.userNumber,
            label: _('users across brands'),
            icon: <PeopleAltRoundedIcon />,
          },
        ]}
      />

      <InfoCard
        title={_('Operator information')}
        subtitle={fullName || data.admin?.username}
        rows={[
          { label: _('Username'), value: data.admin?.username, mono: true },
          { label: _('Name'), value: fullName },
          { label: _('Email'), value: data.admin?.email },
        ]}
      />

      <StatGrid
        stats={[
          {
            label: _('Brand', { count: 2 }),
            value: data.brandNumber,
            icon: <VerifiedRoundedIcon />,
            tone: 'emerald',
            path: '/brands',
            linkLabel: _('View'),
          },
          {
            label: _('Client', { count: 2 }),
            value: data.clientNumber,
            icon: <ApartmentRoundedIcon />,
            tone: 'violet',
          },
          {
            label: _('User', { count: 2 }),
            value: data.userNumber,
            icon: <GroupsRoundedIcon />,
            tone: 'amber',
          },
        ]}
      />

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
      />

      <RecentTable
        title={_('Recently added brands')}
        subtitle={_('Newest first')}
        rows={data.recentActivity}
        seeAll={{ label: _('See all'), path: '/brands' }}
        empty={_('No brands yet')}
        columns={[
          {
            label: _('Brand', { count: 1 }),
            render: (row) => (
              <Who name={row.name} detail={row.sipDomain} mono />
            ),
          },
          { label: _('TIN'), render: (row) => row.nif },
          { label: _('Max calls'), render: (row) => limit(row.maxCalls) },
        ]}
      />
    </DashboardGrid>
  );
};

export default Dashboard;
