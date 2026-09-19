import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { NavItem } from '../runtime/config';
import { useAcl, usePortal } from '../runtime/PortalProvider';

export interface ResolvedNavItem extends Omit<NavItem, 'children' | 'label'> {
  label: string;
  children?: ResolvedNavItem[];
}

export interface ResolvedNavSection {
  label?: string;
  items: ResolvedNavItem[];
}

/**
 * Filters the navigation by what the signed-in administrator may actually see.
 *
 * Two gates, in this order:
 *  1. `isAvailable` — tenant type and feature flags. A company without the
 *     recordings feature has no Recordings screen at all.
 *  2. the entity's ACL — a restricted admin with no read row for the entity
 *     never sees the link.
 *
 * A parent whose children all disappear disappears with them, so the sidebar
 * never shows an empty group.
 */
export function useFilteredNav(): ResolvedNavSection[] {
  const { config, entitiesByIden } = usePortal();
  const acl = useAcl();
  const { t } = useTranslation();

  return useMemo(() => {
    const context = { acl };

    const keep = (item: NavItem): ResolvedNavItem | null => {
      if (item.isAvailable && !item.isAvailable(context)) return null;

      if (item.entity) {
        const descriptor = entitiesByIden[item.entity];
        if (!descriptor) return null;
        if (descriptor.isAvailable && !descriptor.isAvailable(context))
          return null;
        if (!acl.isVisible(descriptor.aclIden)) return null;
      }

      const children = item.children
        ?.map(keep)
        .filter((child): child is ResolvedNavItem => child !== null);

      // A group that exists only to hold links is pointless once they are gone.
      if (item.children && (!children || children.length === 0)) return null;

      const { children: _ignored, ...rest } = item;
      return {
        ...rest,
        label: t(item.label),
        ...(children ? { children } : {}),
      };
    };

    return config.nav
      .map<ResolvedNavSection>((section) => ({
        ...(section.label ? { label: t(section.label) } : {}),
        items: section.items
          .map(keep)
          .filter((item): item is ResolvedNavItem => item !== null),
      }))
      .filter((section) => section.items.length > 0);
  }, [config.nav, entitiesByIden, acl, t]);
}
