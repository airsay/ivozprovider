import {
  isActionItem,
  isEntityItem,
  isRouteMapBlock,
  RouteMap,
  RouteMapItem,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface Page {
  pattern: RegExp;
  depth: number;
  title: ReactNode;
  Icon: React.ElementType;
}

/** Every entity route in the menu tree, nested ones included. */
function pages(routeMap: RouteMap): Page[] {
  const found: Page[] = [];
  const visit = (items: Array<RouteMapItem>) => {
    items.forEach((item) => {
      if (isActionItem(item) || !isEntityItem(item)) {
        return;
      }
      if (item.route && item.entity) {
        const source = item.route
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\\?:[a-zA-Z0-9_]+/g, '[^/]+');
        found.push({
          pattern: new RegExp(`^${source}(?=/|$)`),
          depth: item.route.split('/').length,
          title: item.entity.title,
          Icon: item.entity.icon,
        });
      }
      if (item.children) {
        visit(item.children);
      }
    });
  };
  routeMap.forEach((block) => {
    if (isRouteMapBlock(block)) {
      visit(block.children);
    } else {
      visit([block]);
    }
  });

  return found;
}

/**
 * The page title above a list, form or detail view: the entity's icon and
 * name, plus what the page does (new, edit, details). Hidden on the
 * dashboard and on pages that aren't in the menu tree.
 */
export default function PageHead(props: {
  routeMap: RouteMap;
}): JSX.Element | null {
  const location = useLocation();
  const all = useMemo(() => pages(props.routeMap), [props.routeMap]);

  const base = (process.env.BASE_URL ?? '/').replace(/\/$/, '');
  const path = location.pathname.startsWith(base)
    ? location.pathname.slice(base.length) || '/'
    : location.pathname;
  if (path === '/' || path === '') {
    return null;
  }

  let match: Page | undefined;
  let rest = '';
  for (const page of all) {
    const found = path.match(page.pattern);
    if (found && (!match || page.depth > match.depth)) {
      match = page;
      rest = path.slice(found[0].length);
    }
  }
  if (!match) {
    return null;
  }

  let mode: ReactNode = null;
  if (/^\/create\/?$/.test(rest)) {
    mode = _('New');
  } else if (/\/update\/?$/.test(rest)) {
    mode = _('Edit');
  } else if (/\/detailed\/?$/.test(rest)) {
    mode = _('Details');
  }

  return (
    <div className='rd-pagehead'>
      <span className='rd-pagehead-icon'>
        <match.Icon />
      </span>
      <div>
        <h1>{match.title}</h1>
        {mode && <p>{mode}</p>}
      </div>
    </div>
  );
}
