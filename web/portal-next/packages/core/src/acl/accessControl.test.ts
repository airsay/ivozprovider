import { describe, expect, it } from 'vitest';

import { AccessControl } from './accessControl';

describe('AccessControl', () => {
  it('grants everything to an unrestricted administrator with an empty acl list', () => {
    // This is the case that is easy to invert: `acls: []` plus `restricted:false`
    // is the *superuser*, not a locked-out account.
    const acl = new AccessControl({ restricted: false, acls: [] });

    expect(acl.can('DDIs', 'delete')).toBe(true);
    expect(acl.isVisible('AnythingAtAll')).toBe(true);
    expect(acl.permissions('DDIs')).toEqual({
      create: true,
      read: true,
      update: true,
      delete: true,
    });
  });

  it('honours per-entity rows for a restricted administrator', () => {
    const acl = new AccessControl({
      restricted: true,
      acls: [
        {
          iden: 'DDIs',
          create: false,
          read: true,
          update: true,
          delete: false,
        },
        {
          iden: 'Extension',
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      ],
    });

    expect(acl.can('DDIs', 'read')).toBe(true);
    expect(acl.can('DDIs', 'create')).toBe(false);
    expect(acl.can('Extension', 'delete')).toBe(true);
  });

  it('denies entities a restricted administrator has no row for', () => {
    const acl = new AccessControl({
      restricted: true,
      acls: [{ iden: 'DDIs', read: true }],
    });

    expect(acl.isVisible('Invoice')).toBe(false);
    expect(acl.can('Invoice', 'read')).toBe(false);
  });

  it('denies an entity with no acl iden when restricted', () => {
    const acl = new AccessControl({ restricted: true, acls: [] });
    expect(acl.can(undefined, 'read')).toBe(false);
  });

  it('reads tenant type and feature flags', () => {
    const acl = new AccessControl({
      restricted: false,
      vpbx: true,
      retail: true,
      features: ['recordings', 'faxes'],
      billingInfo: true,
    });

    expect(acl.isTenant('vpbx')).toBe(true);
    expect(acl.isTenant('retail')).toBe(true);
    expect(acl.isTenant('wholesale')).toBe(false);
    expect(acl.hasFeature('recordings')).toBe(true);
    expect(acl.hasFeature('webhooks')).toBe(false);
    expect(acl.billingInfo).toBe(true);
  });

  it('survives a missing profile', () => {
    const acl = new AccessControl(null);

    expect(acl.restricted).toBe(false);
    expect(acl.isTenant('unknown')).toBe(true);
    expect(acl.can('DDIs', 'read')).toBe(true);
  });
});
