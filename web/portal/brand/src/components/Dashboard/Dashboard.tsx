import _ from '@irontec/ivoz-ui/services/translations/translate';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ElectricalServicesRoundedIcon from '@mui/icons-material/ElectricalServicesRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { useStoreState } from 'store';

import i18n from '../../i18n';
import { useBranding } from '../Branding';
import {
  ActiveCallsSummary,
  DashboardGrid,
  Donut,
  Hero,
  InfoCard,
  Pill,
  RecentTable,
  StatGrid,
  Tone,
  useMyResource,
  useUsername,
  Who,
} from '../Redesign';

interface DashboardBrand {
  id: number;
  maxCalls: number | string;
  name: string;
  nif: string;
  postalCode: string;
  sipDomain: string;
}

interface DashboardClient {
  domainUsers: string;
  maxCalls: number;
  name: string;
  type: string;
}

interface DashboardData {
  brand: DashboardBrand;
  recentActivity: DashboardClient[];
  carrierNum: number;
  clientNum: number;
  ddiNum: number;
  productName: string;
}

interface RegistrationSummary {
  active: number;
  total: number;
}

interface BrandDetail {
  currency?: { iden?: string; name?: Record<string, string> } | null;
  defaultTimezone?: { tz?: string } | null;
}

const CLIENT_TYPES: Record<
  string,
  { label: string; tone: Tone; path: string }
> = {
  vpbx: { label: 'Client vpbx', tone: 'violet', path: '/vPbx' },
  retail: { label: 'Client retail', tone: 'amber', path: '/retail' },
  residential: {
    label: 'Client residential',
    tone: 'sky',
    path: '/residential',
  },
  wholesale: { label: 'Client wholesale', tone: 'rose', path: '/wholesale' },
};

/** 0 means "no limit" for brand and client max calls. */
const limit = (value: number | string | undefined) =>
  Number(value) > 0 ? value : _('Unlimited');

export interface DashboardProps {
  className?: string;
}

const Dashboard = (props: DashboardProps): JSX.Element | null => {
  const branding = useBranding();
  const username = useUsername();
  const features = useStoreState(
    (state) => state.clientSession.aboutMe.profile?.features
  );

  const data = useMyResource<DashboardData>('/my/dashboard');
  const calls = useMyResource<ActiveCallsSummary>('/my/active_calls', 30000);
  const registrations = useMyResource<RegistrationSummary>(
    '/my/registration_summary'
  );
  const detail = useMyResource<BrandDetail>(
    data?.brand?.id ? `/brands/${data.brand.id}` : null
  );

  if (!data) {
    return null;
  }

  // Always the resolved branding (Tervian One unless the portal is
  // customised). /my/dashboard's productName falls back to the server's
  // stock "Ivoz Provider" when no web portal matches the hostname.
  const productName = branding.productName;
  // The first client type this brand offers: target of "New client".
  const clientType =
    Object.keys(CLIENT_TYPES).find((type) =>
      (features as string[] | undefined)?.includes(type)
    ) ?? 'vpbx';
  const clientsPath = CLIENT_TYPES[clientType].path;

  const lang = i18n.language?.substring(0, 2) || 'en';
  const currency = detail?.currency?.iden
    ? [
        detail.currency.iden,
        detail.currency.name?.[lang] ?? detail.currency.name?.en,
      ]
        .filter(Boolean)
        .join(' · ')
    : undefined;

  return (
    <DashboardGrid className={props.className}>
      <Hero
        greeting={username ? _('Hello, {{name}}', { name: username }) : null}
        title={_('Welcome to the {{productName}} brand portal', {
          productName,
        })}
        lead={_(
          'Add clients, carriers and numbers, and keep an eye on live traffic across the {{brand}} brand.',
          { brand: data.brand.name }
        )}
        actions={[
          {
            label: _('New client'),
            path: `${clientsPath}/create`,
            icon: <AddRoundedIcon />,
          },
          { label: _('View calls'), path: '/billable_calls', ghost: true },
        ]}
        chips={[
          ...(calls
            ? [{ value: calls.total, label: _('live calls now'), live: true }]
            : []),
          ...(registrations
            ? [
                {
                  value: `${registrations.active} / ${registrations.total}`,
                  label: _('devices registered'),
                  icon: <DevicesRoundedIcon />,
                },
              ]
            : []),
        ]}
      />

      <InfoCard
        title={_('Brand information')}
        subtitle={[data.brand.name, data.brand.nif && `TIN ${data.brand.nif}`]
          .filter(Boolean)
          .join(' · ')}
        rows={[
          { label: _('SIP domain'), value: data.brand.sipDomain, mono: true },
          { label: _('Max calls'), value: limit(data.brand.maxCalls) },
          { label: _('Currency'), value: currency },
          { label: _('Timezone'), value: detail?.defaultTimezone?.tz },
          { label: _('Postal code'), value: data.brand.postalCode },
        ]}
      />

      <StatGrid
        stats={[
          {
            label: _('Client', { count: 2 }),
            value: data.clientNum,
            icon: <ApartmentRoundedIcon />,
            tone: 'emerald',
            path: clientsPath,
            linkLabel: _('View'),
          },
          {
            label: _('DDI', { count: 2 }),
            value: data.ddiNum,
            icon: <TagRoundedIcon />,
            tone: 'violet',
            path: '/ddis',
            linkLabel: _('View'),
          },
          {
            label: _('Carrier', { count: 2 }),
            value: data.carrierNum,
            icon: <ElectricalServicesRoundedIcon />,
            tone: 'amber',
            path: '/carriers',
            linkLabel: _('View'),
          },
          {
            label: _('Registered devices'),
            value: registrations?.active,
            note: registrations
              ? _('of {{total}}', { total: registrations.total })
              : undefined,
            icon: <PhoneInTalkRoundedIcon />,
            tone: 'sky',
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
        extra={{
          label: _('Capacity'),
          value: Number(data.brand.maxCalls) > 0 ? data.brand.maxCalls : '∞',
        }}
      />

      <RecentTable
        title={_('Recently added clients')}
        subtitle={_('Newest first')}
        rows={data.recentActivity}
        seeAll={{ label: _('See all'), path: clientsPath }}
        empty={_('No clients yet')}
        columns={[
          {
            label: _('Client'),
            render: (row) => (
              <Who name={row.name} detail={row.domainUsers} mono />
            ),
          },
          {
            label: _('Type'),
            render: (row) => {
              const type = CLIENT_TYPES[row.type];

              return type ? (
                <Pill tone={type.tone}>{_(type.label)}</Pill>
              ) : (
                <Pill tone='grey'>{row.type}</Pill>
              );
            },
          },
          {
            label: _('Max calls'),
            render: (row) => limit(row.maxCalls),
          },
        ]}
      />
    </DashboardGrid>
  );
};

export default Dashboard;
