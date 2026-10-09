import {
  isActionItem,
  isEntityItem,
  isRouteMapBlock,
  RouteMap,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Dialog } from '@mui/material';
import {
  isValidElement,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import i18n from '../../i18n';

interface Destination {
  key: string;
  label: string;
  group: string;
  path: string;
  Icon: React.ElementType;
}

/**
 * Menu titles are usually <Trans defaults="Client" count={2} /> elements
 * (ivoz-ui's `_()`); turn them into plain text so they can be searched.
 */
function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(toText).join('');
  }
  if (isValidElement(node)) {
    const props = node.props as {
      defaults?: string;
      values?: Record<string, unknown>;
      count?: number;
      children?: ReactNode;
    };
    if (props.defaults) {
      return String(
        i18n.t(props.defaults, {
          ...(props.values ?? {}),
          count: props.count,
          defaultValue: props.defaults,
        })
      ).replace(/<[^>]+>/g, ' ');
    }

    return toText(props.children);
  }

  return '';
}

function destinations(routeMap: RouteMap): Destination[] {
  const result: Destination[] = [
    {
      key: 'dashboard',
      label: toText(_('Dashboard')) || 'Dashboard',
      group: '',
      path: '/',
      Icon: HomeOutlinedIcon,
    },
  ];

  routeMap.forEach((block, blockIdx) => {
    if (!isRouteMapBlock(block)) {
      if (!isEntityItem(block)) {
        return;
      }
      const { entity } = block;
      result.push({
        key: `e-${blockIdx}`,
        label: toText(entity.title),
        group: '',
        path: entity.localPath || entity.path,
        Icon: entity.icon,
      });

      return;
    }

    const group = toText(block.label);
    block.children.forEach((item, idx) => {
      if (isActionItem(item) || !item.entity || !item.route) {
        return;
      }
      result.push({
        key: `b-${blockIdx}-${idx}`,
        label: toText(item.entity.title),
        group,
        path: item.route,
        Icon: item.entity.icon,
      });
    });
  });

  return result.filter((item) => item.label);
}

const normalise = (value: string) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * "Jump to…": a quick switcher over the pages in the side menu.
 * It searches page names only; it does not search records.
 */
export default function JumpTo(props: { routeMap: RouteMap }): JSX.Element {
  const { routeMap } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const all = useMemo(() => destinations(routeMap), [routeMap]);
  const matches = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) {
      return all;
    }

    return all
      .filter((item) => normalise(`${item.label} ${item.group}`).includes(q))
      .sort(
        (a, b) =>
          Number(!normalise(a.label).startsWith(q)) -
          Number(!normalise(b.label).startsWith(q))
      );
  }, [all, query]);

  const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iP(hone|ad)/.test(navigator.platform);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const go = (item?: Destination) => {
    if (!item) {
      return;
    }
    close();
    const href = `${process.env.BASE_URL}${item.path}`.replace('//', '/');
    navigate(href, { state: { referrer: location.pathname } });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(matches[active]);
    }
  };

  return (
    <>
      <button
        type='button'
        className='rd-jump-trigger'
        onClick={() => setOpen(true)}
      >
        <SearchRoundedIcon />
        <span className='placeholder'>{_('Jump to…')}</span>
        <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </button>

      <Dialog
        open={open}
        onClose={close}
        className='rd-jump-dialog'
        fullWidth
        maxWidth='sm'
      >
        <div className='rd-jump-input'>
          <SearchRoundedIcon />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={toText(_('Jump to a page…'))}
            aria-label='Jump to a page'
          />
          <kbd>Esc</kbd>
        </div>
        <ul className='rd-jump-list' ref={listRef} role='listbox'>
          {matches.map((item, idx) => (
            <li
              key={item.key}
              data-index={idx}
              role='option'
              aria-selected={idx === active}
              className={idx === active ? 'active' : ''}
              onMouseEnter={() => setActive(idx)}
              onClick={() => go(item)}
            >
              <span className='icon'>
                <item.Icon />
              </span>
              <span className='label'>{item.label}</span>
              {item.group && <span className='group'>{item.group}</span>}
            </li>
          ))}
          {matches.length === 0 && (
            <li className='empty'>{_('No page matches that name')}</li>
          )}
        </ul>
      </Dialog>
    </>
  );
}
