import { describe, expect, it } from 'vitest';

import { widgetFor } from './fieldMeta';
import { DdiFields, UserFields } from './generated/client';
import { defaultValuesFor, zodForDefinition } from './zodFromFields';

/**
 * These run against the *real* generated metadata for the client API, so a
 * change to `web/rest/client/public/apiSpec.json` that alters validation will
 * fail here rather than in a browser.
 */
describe('zodForDefinition, against the generated client Ddi metadata', () => {
  const schema = zodForDefinition(DdiFields);

  it('omits read-only fields from a write payload', () => {
    // `ddi`, `ddie164`, `id` and `country` are read-only on this resource.
    expect(Object.keys(schema.shape)).not.toContain('id');
    expect(Object.keys(schema.shape)).not.toContain('ddie164');
    expect(Object.keys(schema.shape)).toContain('description');
    expect(Object.keys(schema.shape)).toContain('routeType');
  });

  it('enforces the maxLength the spec declares', () => {
    expect(
      schema.safeParse({ recordCalls: 'none', description: 'a'.repeat(100) })
        .success
    ).toBe(true);

    const tooLong = schema.safeParse({
      recordCalls: 'none',
      description: 'a'.repeat(101),
    });
    expect(tooLong.success).toBe(false);
  });

  it('restricts an enum to its declared values', () => {
    expect(schema.safeParse({ recordCalls: 'inbound' }).success).toBe(true);
    expect(schema.safeParse({ recordCalls: 'sometimes' }).success).toBe(false);
  });

  it('accepts null for an optional foreign key and coerces a numeric string', () => {
    expect(schema.safeParse({ recordCalls: 'none', user: null }).success).toBe(
      true
    );

    const parsed = schema.safeParse({ recordCalls: 'none', user: '42' });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.user).toBe(42);
  });

  it('rejects a required enum that is missing', () => {
    // `recordCalls` is in the definition's `required` list.
    expect(schema.safeParse({}).success).toBe(false);
  });
});

describe('defaultValuesFor', () => {
  it('uses the spec default when there is one', () => {
    const values = defaultValuesFor(DdiFields);
    expect(values.recordCalls).toBe('none');
  });

  it('starts optional foreign keys as null and strings as empty', () => {
    const values = defaultValuesFor(DdiFields);
    expect(values.user).toBeNull();
    expect(values.description).toBe('');
  });
});

describe('widgetFor', () => {
  it('picks a select for an enum even though the underlying type is a string', () => {
    expect(widgetFor(DdiFields.routeType!)).toBe('select');
  });

  it('picks a reference control for a foreign key', () => {
    const fk = { kind: 'ref', ref: 'Company' } as const;
    expect(widgetFor(fk)).toBe('reference');
  });

  it('honours format over the bare scalar type', () => {
    expect(widgetFor({ kind: 'string', format: 'password' })).toBe('password');
    expect(widgetFor({ kind: 'string', format: 'date-time' })).toBe('datetime');
    expect(widgetFor({ kind: 'string' })).toBe('text');
    expect(widgetFor({ kind: 'integer' })).toBe('number');
  });

  it('cannot know a password field from the spec alone', () => {
    // `User.pass` is declared as a bare `string` with `maxLength: 80` — the
    // spec has no `format: password` for it. The old portal supplied that in
    // its entity definition (`web/portal/client/src/entities/User/User.tsx`),
    // and so must ours. This is precisely why descriptors override spec
    // metadata rather than merely decorating it.
    expect(UserFields.pass).toBeDefined();
    expect(UserFields.pass!.format).toBeUndefined();
    expect(widgetFor(UserFields.pass!)).toBe('text');
    expect(widgetFor({ ...UserFields.pass!, format: 'password' })).toBe(
      'password'
    );
  });
});
