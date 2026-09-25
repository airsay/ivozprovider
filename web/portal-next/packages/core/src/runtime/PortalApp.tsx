import type { i18n as I18nInstance } from 'i18next';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { LoginScreen } from '../auth/LoginScreen';
import { AppShell } from '../layout/AppShell';
import { applyColorScheme, storedColorScheme } from '../lib/theme';
import { Skeleton } from '../ui';
import type { PortalConfig } from './config';
import { PortalProvider, usePortal } from './PortalProvider';

export interface PortalAppProps {
  config: PortalConfig;
  i18n: I18nInstance;
  /** The app's routes, rendered inside the shell once signed in. */
  children: ReactNode;
}

/**
 * The whole application frame: providers, router, auth gate and shell.
 *
 * An app's own entry point is then four lines — see `apps/user/src/main.tsx`.
 */
// Paint the saved scheme before the first render, so there is no light flash.
if (typeof document !== 'undefined') applyColorScheme(storedColorScheme());

export function PortalApp({
  config,
  i18n,
  children,
}: PortalAppProps): React.JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={config.basePath}>
        <PortalProvider config={config}>
          <AuthGate>{children}</AuthGate>
        </PortalProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

/**
 * Shows the login screen when signed out, and holds the shell back until the
 * profile has loaded — rendering navigation before permissions are known would
 * show links the administrator is not allowed to follow.
 */
function AuthGate({ children }: { children: ReactNode }): React.JSX.Element {
  const { loggedIn, acl, profileLoading } = usePortal();

  if (!loggedIn) return <LoginScreen />;

  if (profileLoading || !acl) {
    return (
      <div className='flex min-h-dvh'>
        <div className='hidden w-64 shrink-0 border-r border-border-subtle bg-surface p-4 lg:block'>
          <Skeleton className='h-8 w-40' />
          <div className='mt-8 space-y-2'>
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className='h-8 w-full' />
            ))}
          </div>
        </div>
        <div className='flex-1 p-8'>
          <Skeleton className='h-8 w-56' />
          <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className='h-28 w-full' />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
