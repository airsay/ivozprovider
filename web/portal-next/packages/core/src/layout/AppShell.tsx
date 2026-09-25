import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Check,
  ChevronDown,
  CornerDownLeft,
  Languages,
  LogOut,
  Menu as MenuIcon,
  Moon,
  Search,
  Settings,
  Sun,
  X,
} from 'lucide-react';
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { GatewayMark, TERVIAN_ONE, TervianOneLockup } from '../brand';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { cn } from '../lib/cn';
import {
  type ColorScheme,
  rememberColorScheme,
  storedColorScheme,
  type TenantBrand,
  tenantBrand,
} from '../lib/theme';
import { usePortal } from '../runtime/PortalProvider';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui';
import {
  type ResolvedNavItem,
  type ResolvedNavSection,
  useFilteredNav,
} from './useFilteredNav';

/**
 * The application chrome.
 *
 * A fixed sidebar (grouped navigation, then theme and sign-out at its foot)
 * beside the working area. The top bar carries a workspace search that jumps
 * to any screen the signed-in person may open, and the account menu.
 */
export function AppShell({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Navigating on a phone should close the drawer behind you.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Ctrl/Cmd+K opens the search from anywhere.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    // The rail colour continues under the sticky sidebar on long pages.
    <div className='flex min-h-dvh bg-bg lg:bg-[linear-gradient(to_right,var(--rail)_16rem,var(--bg)_16rem)]'>
      <aside className='sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-rail-border bg-rail lg:flex'>
        <SidebarContents />
      </aside>

      {drawerOpen ? (
        <div className='fixed inset-0 z-40 lg:hidden'>
          <button
            type='button'
            className='absolute inset-0 bg-black/60 backdrop-blur-[2px]'
            aria-label='Close navigation'
            onClick={() => setDrawerOpen(false)}
          />
          <aside className='relative flex h-full w-72 flex-col bg-rail shadow-(--shadow-raised)'>
            <SidebarContents onClose={() => setDrawerOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className='flex min-w-0 flex-1 flex-col'>
        <Header
          onOpenNav={() => setDrawerOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />
        <main className='w-full min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8'>
          {children}
        </main>
      </div>

      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

/**
 * Whether the portal is running under a tenant's own brand rather than
 * Tervian One's. Tervian One is white-label: a reseller's logo or product name
 * from `/my/theme` always wins over the Tervian artwork.
 */
function useTenantBrand(): TenantBrand {
  const { config, theme } = usePortal();
  return tenantBrand(theme, {
    defaultProductName: TERVIAN_ONE,
    fallbackProductName: config.fallbackProductName,
    apiBaseUrl: config.apiBaseUrl,
  });
}

/**
 * The compact mark: the tenant's logo, Gateway A for Tervian One, or a
 * lettermark in the brand gradient for a tenant without a logo.
 */
export function BrandMark({
  size = 'md',
}: {
  size?: 'md' | 'lg';
}): React.JSX.Element {
  const { custom, productName, logoUrl } = useTenantBrand();
  const height = size === 'lg' ? 'h-11' : 'h-8';

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=''
        className={cn('w-auto max-w-[9rem] object-contain', height)}
      />
    );
  }

  if (!custom) return <GatewayMark className={cn('w-auto', height)} />;

  return (
    <span
      className={cn(
        'bg-brand-gradient grid shrink-0 place-items-center rounded-(--radius-control) font-semibold text-white shadow-(--shadow-button)',
        size === 'lg' ? 'size-11 text-lg' : 'size-8 text-sm'
      )}
      aria-hidden
    >
      {productName.slice(0, 1).toUpperCase()}
    </span>
  );
}

function SidebarContents({
  onClose,
}: {
  onClose?: () => void;
}): React.JSX.Element {
  const { identity, logout } = usePortal();
  const { t } = useTranslation();
  const sections = useFilteredNav();
  const { custom, productName } = useTenantBrand();
  const [scheme, setScheme] = useState<ColorScheme>(storedColorScheme);

  const isDark =
    scheme === 'dark' ||
    (scheme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  const toggleScheme = (): void => {
    const next: ColorScheme = isDark ? 'light' : 'dark';
    setScheme(next);
    rememberColorScheme(next);
  };

  return (
    <>
      <div className='flex shrink-0 items-start gap-3 px-5 pb-2 pt-5'>
        <div className='min-w-0 flex-1'>
          {custom ? (
            <div className='flex items-center gap-3'>
              <BrandMark />
              <p className='truncate text-[0.9375rem] font-semibold tracking-tight text-rail-fg'>
                {productName}
              </p>
            </div>
          ) : (
            <TervianOneLockup onDark className='h-7' />
          )}
          {identity?.detail ? (
            <p className='mt-2 truncate text-xs text-rail-muted'>
              {identity.detail}
            </p>
          ) : null}
        </div>
        {onClose ? (
          <button
            type='button'
            onClick={onClose}
            aria-label='Close navigation'
            className='grid size-8 place-items-center rounded-(--radius-control) text-rail-muted hover:bg-rail-hover hover:text-rail-fg'
          >
            <X className='size-4' />
          </button>
        ) : null}
      </div>

      <nav className='flex-1 overflow-y-auto px-3 pb-4 pt-3' aria-label='Main'>
        {sections.map((section, index) => (
          <div
            key={section.label ?? index}
            className={index > 0 ? 'mt-6' : undefined}
          >
            {section.label ? (
              <p className='px-3 pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-rail-subtle'>
                {section.label}
              </p>
            ) : null}
            <ul className='space-y-0.5'>
              {section.items.map((item) => (
                <NavEntry key={item.to} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className='space-y-0.5 border-t border-rail-border p-3'>
        <button
          type='button'
          onClick={toggleScheme}
          className={cn(navItemBase, navItemIdle, 'w-full')}
        >
          {isDark ? (
            <Sun className='size-4 shrink-0 text-rail-subtle' />
          ) : (
            <Moon className='size-4 shrink-0 text-rail-subtle' />
          )}
          <span>{isDark ? t('Light theme') : t('Dark theme')}</span>
        </button>
        <button
          type='button'
          onClick={logout}
          className={cn(navItemBase, navItemIdle, 'w-full')}
        >
          <LogOut className='size-4 shrink-0 text-rail-subtle' />
          <span>{t('Sign out')}</span>
        </button>
      </div>
    </>
  );
}

const navItemBase =
  'group relative flex items-center gap-3 rounded-(--radius-control) px-3 py-2 text-sm font-medium transition-colors';
const navItemIdle = 'text-rail-muted hover:bg-rail-hover hover:text-rail-fg';
const navItemActive = 'bg-rail-active text-rail-fg';

function NavEntry({
  item,
  depth = 0,
}: {
  item: ResolvedNavItem;
  depth?: number;
}): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <li>
        <button
          type='button'
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className={cn(navItemBase, navItemIdle, 'w-full')}
        >
          {Icon ? <Icon className='size-4 shrink-0' /> : null}
          <span className='min-w-0 flex-1 truncate text-left'>
            {item.label}
          </span>
          <ChevronDown
            className={cn(
              'size-4 shrink-0 transition-transform',
              open && 'rotate-180'
            )}
            aria-hidden
          />
        </button>
        {open ? (
          <ul className='ml-4 mt-0.5 space-y-0.5 border-l border-border-subtle pl-3'>
            {item.children?.map((child) => (
              <NavEntry key={child.to} item={child} depth={depth + 1} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={item.to}
        end={item.to === ''}
        className={({ isActive }) =>
          cn(navItemBase, isActive ? navItemActive : navItemIdle)
        }
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <span
                aria-hidden
                className='absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-rail-accent'
              />
            ) : null}
            {Icon ? (
              <Icon
                className={cn(
                  'size-4 shrink-0 transition-colors',
                  isActive
                    ? 'text-rail-accent'
                    : 'text-rail-subtle group-hover:text-rail-muted'
                )}
              />
            ) : null}
            <span className='min-w-0 truncate'>{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?';
}

function Avatar({ name }: { name: string | undefined }): React.JSX.Element {
  return (
    <span
      aria-hidden
      className='bg-brand-gradient grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white'
    >
      {name ? initials(name) : '·'}
    </span>
  );
}

function Header({
  onOpenNav,
  onOpenSearch,
}: {
  onOpenNav: () => void;
  onOpenSearch: () => void;
}): React.JSX.Element {
  const { logout, identity } = usePortal();
  const { t, i18n } = useTranslation();
  const name = identity?.name;
  const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className='sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border-subtle bg-bg/85 px-4 backdrop-blur-md sm:px-6 lg:px-8'>
      <Button
        variant='ghost'
        size='icon'
        className='-ml-2 lg:hidden'
        onClick={onOpenNav}
        aria-label={t('Open navigation')}
      >
        <MenuIcon />
      </Button>
      <span className='lg:hidden'>
        <BrandMark />
      </span>

      <button
        type='button'
        onClick={onOpenSearch}
        className='flex h-10 min-w-0 flex-1 items-center gap-3 rounded-(--radius-control) border border-border-subtle bg-surface px-3 text-left text-sm text-fg-subtle transition-colors hover:border-border-strong lg:max-w-2xl'
      >
        <Search className='size-4 shrink-0' aria-hidden />
        <span className='min-w-0 flex-1 truncate'>
          {t('Search workspace…')}
        </span>
        <kbd className='hidden rounded border border-border-subtle bg-bg-subtle px-1.5 py-0.5 font-sans text-[0.6875rem] text-fg-subtle sm:inline'>
          {isMac ? '⌘ K' : 'Ctrl K'}
        </kbd>
      </button>

      <div className='hidden flex-1 lg:block' />

      <div className='flex items-center gap-1'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='gap-1.5 px-2.5'
              aria-label={t('Language')}
            >
              <Languages />
              <span className='uppercase'>{i18n.resolvedLanguage ?? 'en'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {SUPPORTED_LANGUAGES.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onSelect={() => void i18n.changeLanguage(language.code)}
              >
                <span className='flex-1'>{language.label}</span>
                {i18n.resolvedLanguage === language.code ? (
                  <Check className='text-brand' />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='ml-1 flex items-center gap-3 rounded-(--radius-control) p-1 text-left transition-colors hover:bg-bg-subtle sm:pr-2'
              aria-label={t('Account')}
            >
              <Avatar name={name} />
              <span className='hidden min-w-0 leading-tight md:block'>
                <span className='block max-w-[12rem] truncate text-sm font-medium text-fg'>
                  {name ?? t('Account')}
                </span>
                {identity?.detail ? (
                  <span className='block max-w-[12rem] truncate text-xs text-fg-subtle'>
                    {identity.detail}
                  </span>
                ) : null}
              </span>
              <ChevronDown
                className='hidden size-4 text-fg-subtle md:block'
                aria-hidden
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='min-w-56'>
            {name ? (
              <>
                <DropdownMenuLabel className='px-2.5 py-2'>
                  <span className='block truncate text-sm font-medium text-fg'>
                    {name}
                  </span>
                  {identity?.detail ? (
                    <span className='block truncate text-xs font-normal text-fg-muted'>
                      {identity.detail}
                    </span>
                  ) : null}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='my-1 h-px bg-border-subtle' />
              </>
            ) : null}
            <DropdownMenuItem asChild>
              <NavLink to='preferences'>
                <Settings /> {t('Preferences')}
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='my-1 h-px bg-border-subtle' />
            <DropdownMenuItem danger onSelect={logout}>
              <LogOut /> {t('Sign out')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

interface CommandEntry {
  to: string;
  label: string;
  group: string | undefined;
  icon: ResolvedNavItem['icon'];
}

function flatten(sections: ResolvedNavSection[]): CommandEntry[] {
  const entries: CommandEntry[] = [];
  const visit = (item: ResolvedNavItem, group: string | undefined): void => {
    if (item.children?.length) {
      item.children.forEach((child) => visit(child, item.label));
      return;
    }
    entries.push({ to: item.to, label: item.label, group, icon: item.icon });
  };
  for (const section of sections) {
    for (const item of section.items) visit(item, section.label);
  }
  return entries;
}

/**
 * Workspace search: jump to any screen the signed-in person can open. It only
 * searches navigation — it does not pretend to search records.
 */
function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}): React.JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sections = useFilteredNav();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const entries = useMemo(() => flatten(sections), [sections]);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter(
      (entry) =>
        entry.label.toLowerCase().includes(needle) ||
        entry.group?.toLowerCase().includes(needle)
    );
  }, [entries, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  const go = (entry: CommandEntry | undefined): void => {
    if (!entry) return;
    onOpenChange(false);
    navigate(entry.to === '' ? '/' : `/${entry.to.replace(/^\/+/, '')}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(results[active]);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]' />
        <DialogPrimitive.Content
          className='fixed left-1/2 top-[12vh] z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-(--radius-surface) border border-border-subtle bg-surface-raised shadow-(--shadow-raised)'
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className='sr-only'>
            {t('Search workspace…')}
          </DialogPrimitive.Title>
          <div className='flex items-center gap-3 border-b border-border-subtle px-4'>
            <Search className='size-4 shrink-0 text-fg-subtle' aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t('Jump to…')}
              className='h-12 w-full border-0 bg-transparent text-sm text-fg shadow-none! outline-none! placeholder:text-fg-subtle'
              role='combobox'
              aria-expanded
              aria-controls='command-results'
            />
          </div>
          <ul
            id='command-results'
            role='listbox'
            className='max-h-80 overflow-y-auto p-1.5'
          >
            {results.length === 0 ? (
              <li className='px-3 py-6 text-center text-sm text-fg-muted'>
                {t('Nothing matches that search')}
              </li>
            ) : (
              results.map((entry, index) => {
                const Icon = entry.icon;
                return (
                  <li
                    key={entry.to}
                    role='option'
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(entry)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-(--radius-control) px-3 py-2 text-sm',
                      index === active
                        ? 'bg-brand-tint-strong text-fg'
                        : 'text-fg-muted'
                    )}
                  >
                    {Icon ? <Icon className='size-4 shrink-0' /> : null}
                    <span className='flex-1'>{entry.label}</span>
                    {entry.group ? (
                      <span className='text-xs text-fg-subtle'>
                        {entry.group}
                      </span>
                    ) : null}
                    {index === active ? (
                      <CornerDownLeft
                        className='size-3.5 text-fg-subtle'
                        aria-hidden
                      />
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Page heading with optional actions, used by every screen. */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}): React.JSX.Element {
  return (
    <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
      <div className='min-w-0'>
        <h1 className='text-2xl font-semibold tracking-tight text-fg'>
          {title}
        </h1>
        {description ? (
          <p className='mt-1 text-sm text-fg-muted'>{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className='flex flex-wrap items-center gap-2'>{actions}</div>
      ) : null}
    </div>
  );
}
