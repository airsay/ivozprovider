import {
  isActionItem,
  isEntityItem,
  isRouteMapBlock,
  RouteMap,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Collapse,
  Drawer,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  isValidElement,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'store';

import { resetMyResources } from './useMyResource';

/**
 * Sections group the menu under small headings (the mockup's "Customers",
 * "Network", …). A rule names the first item of a section by its key: the
 * entity iden for a page, or the untranslated label for a group
 * ("Clients"). Items keep the order the portal's EntityMap gives them;
 * items that no rule names stay in the section above them, so pages added
 * upstream still show up. Several keys may name the same title (useful when
 * the first page differs by client type); the heading is shown once.
 */
export interface SidebarSection {
  startsAt: string;
  title: string;
}

export interface SidebarOrg {
  title: string;
  subtitle: ReactNode;
}

export interface SidebarProps {
  routeMap: RouteMap;
  sections: SidebarSection[];
  org?: SidebarOrg;
  /** Count badges, by item key (see SidebarSection). */
  badges?: Record<string, number | undefined>;
  footer?: ReactNode;
}

interface NavLink {
  key: string;
  label: ReactNode;
  path: string;
  Icon: React.ElementType;
}

interface NavGroup extends NavLink {
  children: NavLink[];
}

type NavItem =
  | { kind: 'link'; link: NavLink }
  | { kind: 'group'; group: NavGroup };

/** Untranslated text of a `_('…')` element, used as a stable key. */
export function labelKey(node: ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (isValidElement(node)) {
    const props = node.props as { defaults?: string; children?: ReactNode };

    return props.defaults ?? labelKey(props.children);
  }

  return '';
}

function buildNav(routeMap: RouteMap): NavItem[] {
  const items: NavItem[] = [];

  routeMap.forEach((block, idx) => {
    if (!isRouteMapBlock(block)) {
      if (isActionItem(block) || !isEntityItem(block)) {
        return;
      }
      const { entity } = block;
      items.push({
        kind: 'link',
        link: {
          key: entity.iden,
          label: entity.title,
          path: entity.localPath || entity.path,
          Icon: entity.icon,
        },
      });

      return;
    }

    const children: NavLink[] = [];
    block.children.forEach((item) => {
      if (isActionItem(item) || !item.entity || !item.route) {
        return;
      }
      children.push({
        key: item.entity.iden,
        label: item.entity.title,
        path: item.route,
        Icon: item.entity.icon,
      });
    });
    if (!children.length) {
      return;
    }
    items.push({
      kind: 'group',
      group: {
        key: labelKey(block.label) || `group-${idx}`,
        label: block.label,
        path: children[0].path,
        Icon: block.icon ?? SettingsOutlinedIcon,
        children,
      },
    });
  });

  return items;
}

const hrefOf = (path: string): string =>
  `${process.env.BASE_URL}${path}`.replace('//', '/');

function isActive(pathname: string, path: string): boolean {
  const href = hrefOf(path).replace(/\/$/, '');
  const current = pathname.replace(/\/$/, '');

  return current === href || current.startsWith(`${href}/`);
}

function initials(text: string): string {
  const words = text
    .replace(/[^\p{L}\p{N} ]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) {
    return '•';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

function Badge(props: { value?: number }): JSX.Element | null {
  if (props.value === undefined || props.value === null) {
    return null;
  }

  return (
    <span className='rd-nav-badge'>
      {props.value > 999 ? '999+' : props.value}
    </span>
  );
}

export default function Sidebar(props: SidebarProps): JSX.Element {
  const { routeMap, sections, org, badges = {}, footer } = props;

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const logo = useStoreState((state) => state.theme.logo);
  const variant = useStoreState((state) => state.menu.variant);
  const hidden = useStoreState((state) => state.menu.hidden);
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const toggleVariant = useStoreActions(
    (actions) => actions.menu.toggleVariant
  );
  const toggleVisibility = useStoreActions(
    (actions) => actions.menu.toggleVisibility
  );
  const hideMenu = useStoreActions((actions) => actions.menu.hide);

  const collapsed = desktop && variant === 'collapsed';
  const nav = useMemo(() => buildNav(routeMap), [routeMap]);
  const sectionAt = useMemo(
    () => new Map(sections.map((s) => [s.startsAt, s.title])),
    [sections]
  );

  // Groups open by the visitor; the group holding the current page is
  // always open.
  const [open, setOpen] = useState<Set<string>>(new Set());
  const activeGroup = nav.find(
    (item) =>
      item.kind === 'group' &&
      item.group.children.some((child) =>
        isActive(location.pathname, child.path)
      )
  );
  const activeGroupKey =
    activeGroup?.kind === 'group' ? activeGroup.group.key : undefined;

  useEffect(() => {
    if (activeGroupKey) {
      setOpen((prev) => new Set(prev).add(activeGroupKey));
    }
  }, [activeGroupKey]);

  useEffect(() => {
    if (!loggedIn) {
      resetMyResources();
    }
  }, [loggedIn]);

  const go = (event: MouseEvent, path: string) => {
    event.preventDefault();
    hideMenu();
    navigate(hrefOf(path), { state: { referrer: location.pathname } });
  };

  const toggleGroup = (key: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  const linkContent = (link: NavLink, extra?: ReactNode) => (
    <>
      <Tooltip
        title={collapsed ? link.label : ''}
        placement='right'
        disableInteractive
      >
        <span className='rd-nav-icon'>
          <link.Icon />
        </span>
      </Tooltip>
      <span className='rd-nav-text'>{link.label}</span>
      {extra}
    </>
  );

  const renderLink = (link: NavLink) => {
    const active = isActive(location.pathname, link.path);

    return (
      <a
        key={link.key}
        href={hrefOf(link.path)}
        className={`rd-nav-link${active ? ' active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={(event) => go(event, link.path)}
      >
        {linkContent(link, <Badge value={badges[link.key]} />)}
      </a>
    );
  };

  const renderGroup = (group: NavGroup) => {
    const isOpen = open.has(group.key);
    const containsActive = group.key === activeGroupKey;

    return (
      <div
        key={group.key}
        className={`rd-nav-group${containsActive ? ' has-active' : ''}${
          isOpen ? ' open' : ''
        }`}
      >
        <button
          type='button'
          className='rd-nav-link rd-nav-group-head'
          aria-expanded={isOpen}
          onClick={() => toggleGroup(group.key)}
        >
          {linkContent(
            group,
            <>
              <Badge value={badges[group.key]} />
              <ExpandMoreRoundedIcon className='rd-nav-chevron' />
            </>
          )}
        </button>
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <div className='rd-nav-sub'>
            {group.children.map((child) => {
              const active = isActive(location.pathname, child.path);

              return (
                <a
                  key={child.key + child.path}
                  href={hrefOf(child.path)}
                  className={`rd-nav-sublink${active ? ' active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={(event) => go(event, child.path)}
                >
                  <Tooltip
                    title={collapsed ? child.label : ''}
                    placement='right'
                    disableInteractive
                  >
                    <span className='rd-nav-subicon'>
                      <child.Icon />
                    </span>
                  </Tooltip>
                  <span className='rd-nav-text'>{child.label}</span>
                  <Badge value={badges[child.key]} />
                </a>
              );
            })}
          </div>
        </Collapse>
      </div>
    );
  };

  const dashboard: NavLink = {
    key: 'dashboard',
    label: _('Dashboard'),
    path: '/',
    Icon: HomeOutlinedIcon,
  };
  const onDashboard =
    location.pathname.replace(/\/$/, '') === hrefOf('/').replace(/\/$/, '');

  let currentSection: string | undefined;

  const content = (
    <aside className={`rd-sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className='rd-side-head'>
        <img src={logo || './logo.svg'} className='rd-side-logo' alt='' />
        {desktop && (
          <button
            type='button'
            className='rd-side-toggle'
            onClick={() => toggleVariant()}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
          </button>
        )}
      </div>

      {org && (
        <div className='rd-org'>
          <span className='rd-org-avatar'>{initials(org.title)}</span>
          <span className='rd-org-text'>
            <strong>{org.title}</strong>
            <span>{org.subtitle}</span>
          </span>
        </div>
      )}

      <nav className='rd-nav'>
        <a
          href={hrefOf('/')}
          className={`rd-nav-link${onDashboard ? ' active' : ''}`}
          aria-current={onDashboard ? 'page' : undefined}
          onClick={(event) => go(event, '/')}
        >
          {linkContent(dashboard)}
        </a>

        {nav.map((item) => {
          const key = item.kind === 'link' ? item.link.key : item.group.key;
          const named = sectionAt.get(key);
          // Several keys may open the same section (client types differ);
          // show each heading once in a row.
          const title = named && named !== currentSection ? named : undefined;
          if (named) {
            currentSection = named;
          }

          return [
            title && (
              <div className='rd-nav-section' key={`s-${key}`}>
                <span>{_(title)}</span>
              </div>
            ),
            item.kind === 'link'
              ? renderLink(item.link)
              : renderGroup(item.group),
          ];
        })}
      </nav>

      {footer && <div className='rd-side-foot'>{footer}</div>}
    </aside>
  );

  if (desktop) {
    return content;
  }

  return (
    <Drawer
      anchor='left'
      open={!hidden}
      onClose={() => toggleVisibility()}
      className='rd-sidebar-drawer'
    >
      {content}
    </Drawer>
  );
}
