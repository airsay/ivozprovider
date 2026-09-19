/**
 * Field metadata extracted from the API spec at build time.
 *
 * This is the replacement for ivoz-ui's runtime spec parsing. Where the old
 * portals downloaded `/docs.json` on boot and derived form field types from it
 * in the browser, the same information is now generated into
 * `api/generated/<app>/fields.ts` and imported like any other module.
 */

/** The wire-level shape of a single property, as the spec describes it. */
export interface FieldMeta {
  /** `string` | `integer` | `number` | `boolean` | `array` | `object` | `file` | `ref` | `unknown` */
  kind: string;
  /** Present when `kind === 'ref'`: the definition this property points at. */
  ref?: string;
  /** Swagger `format`: `date-time`, `date`, `time`, `password`, `textarea`, `color`, … */
  format?: string;
  enum?: Array<string | number | null>;
  maxLength?: number;
  minLength?: number;
  maximum?: number;
  minimum?: number;
  pattern?: string;
  default?: unknown;
  readOnly?: boolean;
  required?: boolean;
  /** For `kind === 'array'`, the definition each item points at. */
  itemsRef?: string;
}

export type FieldMetaMap = Record<string, FieldMeta>;

/**
 * The widget a field should render as, before any descriptor override.
 *
 * Mirrors the dispatch order of ivoz-ui's `FormFieldFactory` so that migrated
 * entities keep rendering the control they rendered before: enum wins over
 * type, `format` wins over the bare scalar type, and files are their own thing.
 */
export type FieldWidget =
  | 'text'
  | 'textarea'
  | 'password'
  | 'number'
  | 'boolean'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'datetime'
  | 'time'
  | 'color'
  | 'file'
  | 'reference'
  | 'unknown';

export function widgetFor(meta: FieldMeta): FieldWidget {
  if (meta.enum && meta.enum.length > 0) return 'select';
  if (meta.kind === 'ref') return 'reference';
  if (meta.kind === 'file') return 'file';
  if (meta.kind === 'boolean') return 'boolean';
  if (meta.kind === 'array') return 'multiselect';

  switch (meta.format) {
    case 'date-time':
      return 'datetime';
    case 'date':
      return 'date';
    case 'time':
      return 'time';
    case 'password':
      return 'password';
    case 'textarea':
      return 'textarea';
    case 'color':
      return 'color';
    default:
      break;
  }

  if (meta.kind === 'integer' || meta.kind === 'number') return 'number';
  if (meta.kind === 'string') return 'text';
  return 'unknown';
}
