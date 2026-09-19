import {
  ChevronDown,
  LogOut,
  Menu as MenuIcon,
  Monitor,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { SUPPORTED_LANGUAGES } from '../i18n';
import { cn } from '../lib/cn';
import { applyColorScheme, type ColorScheme } from '../lib/theme';
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
import { type ResolvedNavItem, useFilteredNav } from './useFilteredNav';

/**
 * The application chrome: a persistent sidebar on desktop, a drawer on small
 * screens, and a header carrying the page title and account controls.
 */
export function AppShell({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Navigating on a phone should close the drawer behind you.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div className='flex min-h-dvh bg-bg'>
      <aside className='hidden w-64 shrink-0 border-r border-border-subtle bg-surface lg:flex lg:flex-col'>
        <SidebarContents />
      </aside>

      {drawerOpen ? (
        <div className='fixed inset-0 z-40 lg:hidden'>
          <button
            type='button'
            className='absolute inset-0 bg-black/40'
            aria-label='Close navigation'
            onClick={() => setDrawerOpen(false)}
          />
          <aside className='relative flex h-full w-72 flex-col border-r border-border-subtle bg-surface'>
            <SidebarContents onClose={() => setDrawerOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className='flex min-w-0 flex-1 flex-col'>
        <Header onOpenNav={() => setDrawerOpen(true)} />
        <main className='min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8'>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContents({
  onClose,
}: {
  onClose?: () => void;
}): React.JSX.Element {
  const { config, theme } = usePortal();
  const sections = useFilteredNav();
  const productName = theme?.productName ?? config.fallbackProductName;

  return (
    <>
      <div className='flex h-16 items-center gap-3 border-b border-border-subtle px-4'>
        {theme?.logo ? (
          <img
            src={`${config.apiBaseUrl}${theme.logo}`}
            alt=''
            className='h-8 w-auto max-w-[9rem] object-contain'
          />
        ) : (
          <span className='grid size-8 place-items-center rounded-[--radius-control] bg-brand text-sm font-bold text-brand-contrast'>
            {productName.slice(0, 1)}
          </span>
        )}
        <span className='min-w-0 flex-1 truncate text-sm font-semibold text-fg'>
          {productName}
        </span>
        {onClose ? (
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            aria-label='Close navigation'
          >
            <X />
          </Button>
        ) : null}
      </div>

      <nav className='flex-1 overflow-y-auto px-3 py-4' aria-label='Main'>
        {sections.map((section, index) => (
          <div
            key={section.label ?? index}
            className={index > 0 ? 'mt-6' : undefined}
          >
            {section.label ? (
              <p className='px-2 pb-2 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-subtle'>
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
    </>
  );
}

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
          className='flex w-full items-center gap-2.5 rounded-[--radius-control] px-2.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-brand-tint hover:text-fg'
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
          <ul className='mt-0.5 space-y-0.5 border-l border-border-subtle pl-3 ml-4'>
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
          cn(
            'flex items-center gap-2.5 rounded-[--radius-control] px-2.5 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-brand-tint-strong text-brand'
              : 'text-fg-muted hover:bg-brand-tint hover:text-fg'
          )
        }
      >
        {Icon ? <Icon className='size-4 shrink-0' /> : null}
        <span className='min-w-0 truncate'>{item.label}</span>
      </NavLink>
    </li>
  );
}

function Header({ onOpenNav }: { onOpenNav: () => void }): React.JSX.Element {
  const { logout } = usePortal();
  const { t, i18n } = useTranslation();
  const [scheme, setScheme] = useState<ColorScheme>('system');

  const changeScheme = (next: ColorScheme): void => {
    setScheme(next);
    applyColorScheme(next);
  };

  const SchemeIcon =
    scheme === 'dark' ? Moon : scheme === 'light' ? Sun : Monitor;

  return (
    <header className='sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border-subtle bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8'>
      <Button
        variant='ghost'
        size='icon'
        className='lg:hidden'
        onClick={onOpenNav}
        aria-label={t('Open navigation')}
      >
        <MenuIcon />
      </Button>

      <div className='flex-1' />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' aria-label={t('Appearance')}>
            <SchemeIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='px-2.5 py-1.5 text-xs text-fg-subtle'>
            {t('Appearance')}
          </DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => changeScheme('light')}>
            <Sun /> {t('Light')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => changeScheme('dark')}>
            <Moon /> {t('Dark')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => changeScheme('system')}>
            <Monitor /> {t('Match system')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='uppercase'>
            {i18n.resolvedLanguage ?? 'en'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {SUPPORTED_LANGUAGES.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onSelect={() => void i18n.changeLanguage(language.code)}
            >
              {language.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='sm'>
            {t('Account')}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <NavLink to='preferences'>{t('Preferences')}</NavLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator className='my-1 h-px bg-border-subtle' />
          <DropdownMenuItem danger onSelect={logout}>
            <LogOut /> {t('Sign out')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
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
    <div className='mb-6 flex flex-wrap items-start justify-between gap-4'>
      <div className='min-w-0'>
        <h1 className='text-xl font-semibold text-fg'>{title}</h1>
        {description ? (
          <p className='mt-1 text-sm text-fg-muted'>{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className='flex items-center gap-2'>{actions}</div>
      ) : null}
    </div>
  );
}
