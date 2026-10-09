import { RouteMap } from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { Link } from 'react-router-dom';

import { Sidebar, SidebarSection, useMyResource } from '../Redesign';

/**
 * User portal side menu. Keys are entity idens (see SidebarSection).
 */
const SECTIONS: SidebarSection[] = [
  { startsAt: 'Account', title: 'My account' },
  { startsAt: 'User', title: 'My account' },
  { startsAt: 'Voicemail', title: 'Messages' },
  { startsAt: 'UsersCdr', title: 'Activity' },
];

interface UserDashboard {
  userName?: string;
  userLastName?: string;
  extension?: string;
}

interface LastMonthCalls {
  inbound: number;
  outbound: number;
  total: number;
}

/** The user API has no live-call count: show last month's calls. */
function LastMonthCard(): JSX.Element | null {
  const calls = useMyResource<LastMonthCalls>('/my/last_month_calls');
  if (!calls || typeof calls.total !== 'number') {
    return null;
  }

  return (
    <Link
      to={`${process.env.BASE_URL}/my/call_history`.replace('//', '/')}
      className='rd-live-card'
    >
      <b>
        <CallRoundedIcon fontSize='small' />
        <span className='count-text'>
          {_('{{count}} calls last month', { count: calls.total })}
        </span>
      </b>
      <span>
        {_('{{inbound}} inbound · {{outbound}} outbound', {
          inbound: calls.inbound,
          outbound: calls.outbound,
        })}
      </span>
    </Link>
  );
}

export default function PortalSidebar(props: {
  routeMap: RouteMap;
}): JSX.Element {
  const dashboard = useMyResource<UserDashboard>('/my/dashboard');
  const forwards = useMyResource<unknown[]>('/my/call_forward_settings');
  const name = [dashboard?.userName, dashboard?.userLastName]
    .filter(Boolean)
    .join(' ');

  return (
    <Sidebar
      routeMap={props.routeMap}
      sections={SECTIONS}
      org={
        name
          ? {
              title: name,
              subtitle: dashboard?.extension
                ? _('Extension {{number}}', { number: dashboard.extension })
                : _('User portal'),
            }
          : undefined
      }
      badges={{
        CallForwardSetting: Array.isArray(forwards)
          ? forwards.length
          : undefined,
      }}
      footer={<LastMonthCard />}
    />
  );
}
