import _ from '@irontec/ivoz-ui/services/translations/translate';
import { Link } from 'react-router-dom';

import useMyResource from './useMyResource';

export interface ActiveCallsSummary {
  inbound: number;
  outbound: number;
  total: number;
}

const hrefOf = (path: string): string =>
  `${process.env.BASE_URL}${path}`.replace('//', '/');

/**
 * Sidebar footer: live calls from /my/active_calls, re-read every 30 s
 * while the page is visible. Hidden if the endpoint is unavailable.
 */
export default function LiveCallsCard(props: {
  path?: string;
}): JSX.Element | null {
  const calls = useMyResource<ActiveCallsSummary>('/my/active_calls', 30000);

  if (!calls || typeof calls.total !== 'number') {
    return null;
  }

  return (
    <Link to={hrefOf(props.path ?? '/active_calls')} className='rd-live-card'>
      <b>
        <i className='rd-live-dot' />
        <span className='count-text'>
          {_('{{count}} live calls now', { count: calls.total })}
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
