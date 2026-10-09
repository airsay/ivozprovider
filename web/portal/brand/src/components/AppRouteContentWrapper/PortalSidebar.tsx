import { RouteMap } from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';

import {
  LiveCallsCard,
  Sidebar,
  SidebarSection,
  useMyResource,
} from '../Redesign';

/**
 * Brand portal side menu. Section headings group the EntityMap's own
 * groups (by their untranslated labels); see SidebarSection.
 */
const SECTIONS: SidebarSection[] = [
  { startsAt: 'Clients', title: 'Customers' },
  { startsAt: 'Providers', title: 'Network' },
  { startsAt: 'Billing', title: 'Business' },
  { startsAt: 'Settings', title: 'Configuration' },
  { startsAt: 'Calls', title: 'Activity' },
];

interface BrandDashboard {
  brand?: { name?: string };
  clientNum?: number;
  ddiNum?: number;
  carrierNum?: number;
}

export default function PortalSidebar(props: {
  routeMap: RouteMap;
}): JSX.Element {
  const dashboard = useMyResource<BrandDashboard>('/my/dashboard');

  return (
    <Sidebar
      routeMap={props.routeMap}
      sections={SECTIONS}
      org={
        dashboard?.brand?.name
          ? { title: dashboard.brand.name, subtitle: _('Brand portal') }
          : undefined
      }
      badges={{
        Clients: dashboard?.clientNum,
        Carrier: dashboard?.carrierNum,
        Ddi: dashboard?.ddiNum,
      }}
      footer={<LiveCallsCard />}
    />
  );
}
