import { describe, expect, it } from 'vitest';

import { AccessControl } from '../acl/accessControl';
import { DdiFields, resources } from '../api/generated/client';
import { computeVisibility, humanise, resolveEntity } from './resolve';
import type { EntityDescriptor, FieldDescriptor } from './types';

/**
 * Modelled on the real `web/portal/client/src/entities/Ddi/Ddi.tsx`, which is
 * the hardest entity in the client portal: eleven route types, each revealing
 * exactly one foreign key and hiding the other ten, plus a synthetic `target`
 * column that does not exist in the API.
 *
 * If the descriptor model can express this one, it can express the other 201.
 */
const ROUTE_TARGETS = [
  'user',
  'ivr',
  'huntGroup',
  'fax',
  'conferenceRoom',
  'friendValue',
  'queue',
  'residentialDevice',
  'conditionalRoute',
  'retailAccount',
  'locution',
];

function routeToggles(): FieldDescriptor['toggles'] {
  const toggles: NonNullable<FieldDescriptor['toggles']> = {
    __null__: { show: [], hide: ROUTE_TARGETS },
  };
  const targetFor: Record<string, string> = {
    user: 'user',
    ivr: 'ivr',
    huntGroup: 'huntGroup',
    fax: 'fax',
    conferenceRoom: 'conferenceRoom',
    friend: 'friendValue',
    queue: 'queue',
    residential: 'residentialDevice',
    conditional: 'conditionalRoute',
    retail: 'retailAccount',
    locution: 'locution',
  };
  for (const [routeType, target] of Object.entries(targetFor)) {
    toggles[routeType] = { show: [target], hide: ROUTE_TARGETS };
  }
  return toggles;
}

const ddiDescriptor: EntityDescriptor = {
  iden: 'Ddi',
  resource: 'ddis',
  route: 'numbers',
  title: { one: 'DDI', many: 'DDIs' },
  aclIden: 'DDIs',
  columns: [
    { name: 'ddie164', label: 'Number' },
    { name: 'externalCallFilter' },
    { name: 'routeType' },
    { name: 'target', label: 'Target' },
    { name: 'description' },
  ],
  sections: [
    {
      legend: 'Number data',
      fields: ['country', 'ddi', 'displayName', 'language', 'description'],
    },
    { legend: 'Routing', fields: ['routeType', ...ROUTE_TARGETS] },
  ],
  fields: {
    ddie164: { label: 'DDI' },
    description: { label: 'Description' },
    routeType: {
      label: 'Route type',
      nullLabel: 'Hang up',
      options: {
        user: 'User',
        ivr: 'IVR',
        huntGroup: 'Hunt Group',
        fax: 'Fax',
        conferenceRoom: 'Conference room',
        friend: 'Friend',
        queue: 'Queue',
        residential: 'Residential Device',
        conditional: 'Conditional Route',
        retail: 'Retail Account',
        locution: 'Locution',
      },
      toggles: routeToggles(),
    },
    externalCallFilter: {
      label: 'External call filter',
      nullLabel: 'Unassigned',
    },
    // A column with no counterpart in the spec: assembled client-side from
    // whichever route foreign key is populated.
    target: { label: 'Target', readOnly: true },
  },
};

const unrestricted = new AccessControl({ restricted: false, acls: [] });

describe('resolveEntity', () => {
  const resolved = resolveEntity({
    descriptor: ddiDescriptor,
    manifest: resources.ddis,
    writeFields: DdiFields,
    acl: unrestricted,
  });

  it('intersects granted permissions with what the API actually exposes', () => {
    // The client API declares no POST or DELETE for /ddis, so even a superuser
    // must not see create or delete affordances.
    expect(resources.ddis.operations.create).toBe(false);
    expect(resources.ddis.operations.delete).toBe(false);
    expect(resolved.permissions).toEqual({
      create: false,
      read: true,
      update: true,
      delete: false,
    });
  });

  it('denies a restricted admin without the DDIs acl row', () => {
    const restricted = resolveEntity({
      descriptor: ddiDescriptor,
      manifest: resources.ddis,
      writeFields: DdiFields,
      acl: new AccessControl({
        restricted: true,
        acls: [{ iden: 'Extension', read: true }],
      }),
    });

    expect(restricted.permissions.read).toBe(false);
    expect(restricted.permissions.update).toBe(false);
  });

  it('carries a synthetic field the spec has never heard of', () => {
    expect(DdiFields.target).toBeUndefined();
    expect(resolved.fieldsByName.target).toBeDefined();
    expect(resolved.fieldsByName.target?.label).toBe('Target');
    expect(resolved.fieldsByName.target?.readOnly).toBe(true);
  });

  it('labels enum values from the descriptor rather than the wire values', () => {
    const routeType = resolved.fieldsByName.routeType;
    expect(routeType?.widget).toBe('select');
    expect(routeType?.options).toContainEqual({
      value: 'huntGroup',
      label: 'Hunt Group',
    });
    expect(routeType?.nullLabel).toBe('Hang up');
  });

  it('exposes only filters the API supports, with their real operators', () => {
    const description = resolved.filters.find(
      (filter) => filter.field === 'description'
    );
    expect(description?.operators).toContain('partial');

    // Nothing in the manifest, nothing in the UI.
    expect(resolved.filters.some((filter) => filter.field === 'target')).toBe(
      false
    );
  });

  it('uses the declared column label and falls back to the field label', () => {
    const byName = Object.fromEntries(
      resolved.columns.map((column) => [column.name, column])
    );
    expect(byName.ddie164?.label).toBe('Number');
    expect(byName.description?.label).toBe('Description');
  });

  it('passes labels through the translator', () => {
    const translated = resolveEntity({
      descriptor: ddiDescriptor,
      manifest: resources.ddis,
      writeFields: DdiFields,
      acl: unrestricted,
      t: (key) => (key === 'Route type' ? 'Tipo de ruta' : key),
    });

    expect(translated.fieldsByName.routeType?.label).toBe('Tipo de ruta');
  });
});

describe('computeVisibility', () => {
  const { fields } = resolveEntity({
    descriptor: ddiDescriptor,
    manifest: resources.ddis,
    writeFields: DdiFields,
    acl: unrestricted,
  });

  it('reveals exactly one route target and hides the other ten', () => {
    const visible = computeVisibility(fields, { routeType: 'ivr' });

    expect(visible.ivr).toBe(true);
    for (const other of ROUTE_TARGETS.filter((name) => name !== 'ivr')) {
      expect(
        visible[other],
        `${other} should be hidden when routing to an IVR`
      ).toBe(false);
    }
  });

  it('maps a route type whose name differs from its target field', () => {
    // routeType `residential` drives the `residentialDevice` field.
    const visible = computeVisibility(fields, { routeType: 'residential' });
    expect(visible.residentialDevice).toBe(true);
    expect(visible.user).toBe(false);
  });

  it('hides every target when the DDI hangs up', () => {
    const visible = computeVisibility(fields, { routeType: null });
    for (const target of ROUTE_TARGETS) expect(visible[target]).toBe(false);
  });

  it('treats an empty string the same as null', () => {
    const visible = computeVisibility(fields, { routeType: '' });
    expect(visible.user).toBe(false);
  });

  it('leaves untoggled fields alone', () => {
    const visible = computeVisibility(fields, { routeType: 'ivr' });
    expect(visible.description).toBe(true);
    expect(visible.routeType).toBe(true);
  });
});

describe('humanise', () => {
  it('produces a readable last-resort label', () => {
    expect(humanise('outgoingDdiRule')).toBe('Outgoing ddi rule');
    expect(humanise('max_calls')).toBe('Max calls');
  });
});
