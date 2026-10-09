import { RouteMap } from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';

import { useBranding } from '../Branding';
import {
  LiveCallsCard,
  Sidebar,
  SidebarSection,
  useMyResource,
} from '../Redesign';

/**
 * Platform portal side menu. Section headings start at the EntityMap item
 * named by `startsAt` (entity iden, or untranslated group label).
 */
const SECTIONS: SidebarSection[] = [
  { startsAt: 'Brand', title: 'Tenants' },
  { startsAt: 'BannedAddress', title: 'Platform' },
  { startsAt: 'Generic Configuration', title: 'Configuration' },
  { startsAt: 'Calls', title: 'Activity' },
];

interface PlatformDashboard {
  brandNumber?: number;
  productName?: string;
}

export default function PortalSidebar(props: {
  routeMap: RouteMap;
}): JSX.Element {
  const branding = useBranding();
  const dashboard = useMyResource<PlatformDashboard>('/my/dashboard');
  const title = dashboard?.productName || branding.productName;

  return (
    <Sidebar
      routeMap={props.routeMap}
      sections={SECTIONS}
      org={title ? { title, subtitle: _('Platform portal') } : undefined}
      badges={{ Brand: dashboard?.brandNumber }}
      footer={<LiveCallsCard />}
    />
  );
}
