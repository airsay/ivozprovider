import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AccessControl, type RawProfile } from '../acl/accessControl';
import { HttpClient } from '../api/http';
import { TokenStore } from '../auth/tokenStore';
import type { EntityDescriptor, Row } from '../descriptor/types';
import { applyTheme, type WebTheme } from '../lib/theme';
import { TooltipProvider } from '../ui';
import type { PortalConfig } from './config';

interface PortalContextValue {
  config: PortalConfig;
  api: HttpClient;
  tokens: TokenStore;
  /** Null until the profile has loaded; permissions must not be guessed meanwhile. */
  acl: AccessControl | null;
  profileLoading: boolean;
  theme: WebTheme | null;
  loggedIn: boolean;
  entitiesByIden: Record<string, EntityDescriptor<Row>>;
  logout: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function usePortal(): PortalContextValue {
  const value = useContext(PortalContext);
  if (!value) throw new Error('usePortal must be used inside <PortalProvider>');
  return value;
}

export function useApi(): HttpClient {
  return usePortal().api;
}

/**
 * Permissions for the signed-in administrator.
 *
 * Returns a fully-denying ACL while the profile is loading, so nothing renders
 * an action the user might not be allowed to take and then retracts it.
 */
export function useAcl(): AccessControl {
  const { acl } = usePortal();
  return acl ?? DENY_ALL;
}

const DENY_ALL = new AccessControl({ restricted: true, acls: [] });

export interface PortalProviderProps {
  config: PortalConfig;
  children: ReactNode;
  queryClient?: QueryClient;
}

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Admin data changes from other sessions; a short stale window keeps
        // lists fresh without hammering the API on every focus change.
        staleTime: 30_000,
        retry: (failureCount, error) => {
          const status = (error as { status?: number }).status;
          // Never retry a permission or validation failure — it will not change.
          if (status && status < 500 && status !== 429) return false;
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function PortalProvider({
  config,
  children,
  queryClient,
}: PortalProviderProps): React.JSX.Element {
  const [client] = useState(() => queryClient ?? createQueryClient());

  const tokens = useMemo(
    () => new TokenStore(config.storagePrefix),
    [config.storagePrefix]
  );

  const [loggedIn, setLoggedIn] = useState(() => tokens.isAuthenticated);

  useEffect(
    () =>
      tokens.subscribe((snapshot) => {
        setLoggedIn(snapshot.token !== null || snapshot.refreshToken !== null);
      }),
    [tokens]
  );

  const api = useMemo(
    () =>
      new HttpClient({
        baseUrl: config.apiBaseUrl,
        tokens,
        loginPath: config.loginPath,
        ...(config.usernameField
          ? { usernameField: config.usernameField }
          : {}),
        onSessionExpired: () => {
          client.clear();
        },
      }),
    [config.apiBaseUrl, config.loginPath, config.usernameField, tokens, client]
  );

  const entitiesByIden = useMemo(() => {
    const map: Record<string, EntityDescriptor<Row>> = {};
    for (const entity of config.entities as EntityDescriptor<Row>[]) {
      map[entity.iden] = entity;
    }
    return map;
  }, [config.entities]);

  const value = useMemo<
    Omit<PortalContextValue, 'acl' | 'profileLoading' | 'theme'>
  >(
    () => ({
      config,
      api,
      tokens,
      loggedIn,
      entitiesByIden,
      logout: () => {
        api.logout();
        client.clear();
      },
    }),
    [config, api, tokens, loggedIn, entitiesByIden, client]
  );

  return (
    <QueryClientProvider client={client}>
      <SessionLayer base={value}>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </SessionLayer>
    </QueryClientProvider>
  );
}

/**
 * Loads the branding and the profile, and publishes the context.
 *
 * Branding is fetched anonymously so the login screen is already in the tenant's
 * colours; the profile only after there is a token.
 */
function SessionLayer({
  base,
  children,
}: {
  base: Omit<PortalContextValue, 'acl' | 'profileLoading' | 'theme'>;
  children: ReactNode;
}): React.JSX.Element {
  const { api, config, loggedIn } = base;

  const themeQuery = useQuery({
    queryKey: [config.app, 'theme'],
    queryFn: () => api.get<WebTheme>('/my/theme', { anonymous: true }),
    staleTime: Infinity,
    retry: false,
  });

  const profileQuery = useQuery({
    queryKey: [config.app, 'profile'],
    queryFn: () => api.get<RawProfile>(config.profilePath),
    enabled: loggedIn,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (themeQuery.data) applyTheme(themeQuery.data);
  }, [themeQuery.data]);

  const acl = useMemo(
    () => (profileQuery.data ? new AccessControl(profileQuery.data) : null),
    [profileQuery.data]
  );

  const value = useMemo<PortalContextValue>(
    () => ({
      ...base,
      acl,
      profileLoading: loggedIn && profileQuery.isPending,
      theme: themeQuery.data ?? null,
    }),
    [base, acl, loggedIn, profileQuery.isPending, themeQuery.data]
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
}
