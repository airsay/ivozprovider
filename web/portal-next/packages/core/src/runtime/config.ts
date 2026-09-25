import type { ComponentType } from 'react';

import type { FieldMetaMap } from '../api/fieldMeta';
import type { ResourceManifest } from '../api/resourceManifest';
import type {
  DescriptorContext,
  EntityDescriptor,
  Row,
} from '../descriptor/types';

/**
 * Everything that differs between the four portals.
 *
 * The apps themselves are thin: a config, a set of entity descriptors, a
 * navigation tree and whatever bespoke screens that admin level needs. Routing,
 * data fetching, permissions, forms, tables and the shell all come from here.
 */
export interface PortalConfig {
  app: 'platform' | 'brand' | 'client' | 'user';
  /** Where the SPA is mounted, e.g. `/user-next`. Matches Vite's `base`. */
  basePath: string;
  /** API root, e.g. `/api/user`. */
  apiBaseUrl: string;
  /** `/admin_login` for the three admin portals, `/user_login` for the user one. */
  loginPath: string;
  /** The user API authenticates on `email`; the admin APIs on `username`. */
  usernameField?: 'username' | 'email';
  /** Namespace for this portal's stored tokens, so four portals can coexist. */
  storagePrefix: string;
  /** Profile endpoint driving permissions — `/my/profile` everywhere. */
  profilePath: string;
  /** Generated resource manifests for this app's API. */
  resources: Record<string, ResourceManifest>;
  /** Generated field metadata, keyed by API definition name. */
  fieldsByDefinition: Record<string, FieldMetaMap>;
  entities: Array<EntityDescriptor<never>> | EntityDescriptor<Row>[];
  nav: NavSection[];
  /** Product name shown before `/my/theme` answers. */
  fallbackProductName: string;
  /**
   * Marketing copy for the brand panel of the sign-in screen, as translation
   * keys. Each portal speaks to a different audience, so each sets its own.
   */
  loginTagline?: { title: string; body?: string };
}

export interface NavSection {
  /** Translation key; omit for an unlabelled top group. */
  label?: string;
  items: NavItem[];
}

export interface NavItem {
  /** Route path relative to `basePath`, e.g. `numbers` or `calls/history`. */
  to: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  /**
   * The entity this item leads to. When set, the item inherits that entity's
   * ACL — an admin who cannot read the entity never sees the link.
   */
  entity?: string;
  /** Extra gate beyond the ACL: feature flags, tenant type, and so on. */
  isAvailable?: (context: DescriptorContext) => boolean;
  children?: NavItem[];
}
