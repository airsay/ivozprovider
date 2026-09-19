import { z } from 'zod';

import type { FieldMeta, FieldMetaMap } from './fieldMeta';

/**
 * Builds a zod schema from the field metadata generated out of the API spec.
 *
 * This is validation that used to happen only on the server (plus whatever
 * `maxLength` ivoz-ui could pull out of the runtime spec). Because the metadata
 * is now a build-time import, forms can reject bad input before a round trip,
 * using exactly the constraints the backend will apply.
 *
 * What the spec gives us, and therefore what we can enforce: `required`,
 * `enum`, `maxLength`, `minLength`, `maximum`, `minimum`, `pattern` and the
 * scalar type. Cross-field rules and domain invariants live in the backend and
 * still come back as a 400/422 with a `detail` string.
 */

export interface ZodBuildOptions {
  /** Drop `readOnly` fields — correct for create/update payloads. */
  omitReadOnly?: boolean;
  /** Only include these fields (a form usually shows a subset). */
  pick?: readonly string[];
  /** Translate a validation message. Defaults to the English text. */
  t?: (message: string) => string;
}

function scalarSchema(
  meta: FieldMeta,
  t: (message: string) => string
): z.ZodTypeAny {
  if (meta.enum && meta.enum.length > 0) {
    const values = meta.enum.filter(
      (value): value is string => typeof value === 'string'
    );
    if (values.length > 0) {
      return z.enum(values as [string, ...string[]], {
        errorMap: () => ({ message: t('Select one of the allowed values') }),
      });
    }
  }

  switch (meta.kind) {
    case 'boolean':
      return z.boolean();

    case 'integer':
    case 'number': {
      let schema = z.coerce.number({
        invalid_type_error: t('Enter a number'),
      });
      if (meta.kind === 'integer')
        schema = schema.int(t('Enter a whole number'));
      if (meta.minimum !== undefined) schema = schema.min(meta.minimum);
      if (meta.maximum !== undefined) schema = schema.max(meta.maximum);
      return schema;
    }

    case 'file':
      return z.instanceof(Blob, { message: t('Choose a file') });

    case 'ref':
      // Foreign keys travel as integer ids in both directions.
      return z.coerce.number().int();

    case 'array':
      return z.array(z.unknown());

    case 'object':
      return z.record(z.unknown());

    case 'string':
    default: {
      let schema = z.string();
      if (meta.minLength !== undefined) {
        schema = schema.min(meta.minLength);
      }
      if (meta.maxLength !== undefined) {
        schema = schema.max(
          meta.maxLength,
          t(`Use at most ${meta.maxLength} characters`)
        );
      }
      if (meta.pattern) {
        schema = schema.regex(new RegExp(meta.pattern), t('Invalid format'));
      }
      if (meta.format === 'date-time' || meta.format === 'date') {
        // Kept as an ISO string on the wire; the picker owns the calendar.
        schema = schema.min(1, t('Choose a date'));
      }
      return schema;
    }
  }
}

export function zodForField(
  meta: FieldMeta,
  t: (message: string) => string = (message) => message
): z.ZodTypeAny {
  const base = scalarSchema(meta, t);

  if (meta.required) {
    // An empty text box must not satisfy a required string.
    return meta.kind === 'string' && !meta.enum
      ? (base as z.ZodString).min(1, t('This field is required'))
      : base;
  }

  return base.nullish();
}

export function zodForDefinition(
  fields: FieldMetaMap,
  options: ZodBuildOptions = {}
): z.ZodObject<z.ZodRawShape> {
  const {
    omitReadOnly = true,
    pick,
    t = (message: string) => message,
  } = options;
  const shape: z.ZodRawShape = {};

  for (const [name, meta] of Object.entries(fields)) {
    if (omitReadOnly && meta.readOnly) continue;
    if (pick && !pick.includes(name)) continue;
    shape[name] = zodForField(meta, t);
  }

  return z.object(shape);
}

/**
 * Default form values derived from the spec: an explicit `default`, else the
 * first enum member, else a type-appropriate empty. Mirrors ivoz-ui's
 * `EntityService.getDefultValues()` so migrated forms start in the same state.
 */
export function defaultValuesFor(
  fields: FieldMetaMap,
  options: { omitReadOnly?: boolean; pick?: readonly string[] } = {}
): Record<string, unknown> {
  const { omitReadOnly = true, pick } = options;
  const values: Record<string, unknown> = {};

  for (const [name, meta] of Object.entries(fields)) {
    if (omitReadOnly && meta.readOnly) continue;
    if (pick && !pick.includes(name)) continue;

    if (meta.default !== undefined) {
      values[name] = meta.default;
      continue;
    }

    if (meta.enum && meta.enum.length > 0) {
      values[name] = meta.required ? meta.enum[0] : null;
      continue;
    }

    switch (meta.kind) {
      case 'boolean':
        values[name] = false;
        break;
      case 'integer':
      case 'number':
      case 'ref':
        values[name] = null;
        break;
      case 'array':
        values[name] = [];
        break;
      case 'string':
        values[name] = '';
        break;
      default:
        values[name] = null;
    }
  }

  return values;
}
