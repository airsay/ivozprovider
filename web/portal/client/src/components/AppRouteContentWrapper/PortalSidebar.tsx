import { RouteMap } from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';

import {
  LiveCallsCard,
  Sidebar,
  SidebarSection,
  useMyResource,
} from '../Redesign';

/**
 * Client portal side menu. The menu differs by client type (vPBX,
 * residential, retail, wholesale), so several items can open the same
 * section; the heading shows once. Keys are entity idens or untranslated
 * group labels.
 */
const SECTIONS: SidebarSection[] = [
  { startsAt: 'User', title: 'Accounts' },
  { startsAt: 'ResidentialDevice', title: 'Accounts' },
  { startsAt: 'RetailAccount', title: 'Accounts' },
  { startsAt: 'Voicemail', title: 'Messaging' },
  { startsAt: 'Terminal', title: 'Devices' },
  { startsAt: 'Extension', title: 'Numbers' },
  { startsAt: 'Ddi', title: 'Numbers' },
  { startsAt: 'MatchList', title: 'Routing' },
  { startsAt: 'Routing endpoints', title: 'Routing' },
  { startsAt: 'User configuration', title: 'Configuration' },
  { startsAt: 'Multimedia', title: 'Configuration' },
  { startsAt: 'CompanyService', title: 'Configuration' },
  { startsAt: 'Billing', title: 'Business' },
  { startsAt: 'Calls', title: 'Activity' },
];

interface ClientDashboard {
  client?: { name?: string };
  userNum?: number;
  extensionNum?: number;
  ddiNum?: number;
  residentialDeviceNum?: number;
  retailsAccountNum?: number;
}

export default function PortalSidebar(props: {
  routeMap: RouteMap;
}): JSX.Element {
  const dashboard = useMyResource<ClientDashboard>('/my/dashboard');

  return (
    <Sidebar
      routeMap={props.routeMap}
      sections={SECTIONS}
      org={
        dashboard?.client?.name
          ? { title: dashboard.client.name, subtitle: _('Client portal') }
          : undefined
      }
      badges={{
        User: dashboard?.userNum,
        Extension: dashboard?.extensionNum,
        Ddi: dashboard?.ddiNum,
        ResidentialDevice: dashboard?.residentialDeviceNum,
        RetailAccount: dashboard?.retailsAccountNum,
      }}
      footer={<LiveCallsCard />}
    />
  );
}
