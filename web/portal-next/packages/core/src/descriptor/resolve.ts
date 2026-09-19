import type { AccessControl, Operation } from '../acl/accessControl';
import type { FieldMeta, FieldMetaMap } from '../api/fieldMeta';
import { widgetFor } from '../api/fieldMeta';
import type { ResourceManifest } from '../api/resourceManifest';
import type {
  ColumnDescriptor,
  EntityDescriptor,
  FieldDescriptor,
  ResolvedEntity,
  ResolvedField,
  ResolvedFilter,
  Row,
} from './types';

export type Translate = (
  key: string,
  options?: Record<string, unknown>
) => string;

/** Pseudo-keys understood by `FieldDescriptor.toggles`. */
export const TOGGLE_NULL = '__null__';
export const TOGGLE_DEFAULT = '__default__';

const identity: Translate = (key) => key;

export interface ResolveInput<TRow extends Row = Row> {
  descriptor: EntityDescriptor<TRow>;
  manifest: ResourceManifest;
  /** Field metadata for the write schema, from `api/generated/<app>/fields.ts`. */
  writeFields: FieldMetaMap;
  /** Field metadata for the collection schema; falls back to `writeFields`. */
  listFields?: FieldMetaMap;
  acl: AccessControl;
  t?: Translate;
}

/**
 * Merges an entity descriptor with the generated spec metadata into everything
 * the renderers need.
 *
 * Precedence is descriptor-over-spec, matching ivoz-ui's
 * `{...specProperty, ...entityOverride}` — with the important consequence that a
 * descriptor can declare a field the spec has never heard of (a synthetic
 * column such as the DDI `target`, which is assembled client-side from whichever
 * route foreign key is set) and can retype one the spec got too generically
 * (`User.pass` is a plain string on the wire).
 */
export function resolveEntity<TRow extends Row = Row>(
  input: ResolveInput<TRow>
): ResolvedEntity<TRow> {
  const { descriptor, manifest, writeFields, acl } = input;
  const t = input.t ?? identity;
  const listFields = input.listFields ?? writeFields;

  const permissions = intersectPermissions(
    acl.permissions(descriptor.aclIden),
    manifest
  );

  const fieldNames = new Set<string>([
    ...Object.keys(writeFields),
    ...Object.keys(descriptor.fields),
  ]);

  const fields: ResolvedField[] = [...fieldNames]
    .map((name) =>
      resolveField(name, writeFields[name], descriptor.fields[name], t)
    )
    .filter((field) => field.descriptor?.hidden !== true);

  const fieldsByName = Object.fromEntries(
    fields.map((field) => [field.name, field])
  ) as Record<string, ResolvedField>;

  const columns = resolveColumns(descriptor, listFields, fieldsByName, t);
  const filters = resolveFilters(
    descriptor,
    manifest,
    fieldsByName,
    listFields
  );

  return {
    descriptor,
    manifest,
    permissions,
    fields,
    fieldsByName,
    columns,
    filters,
  };
}

/**
 * A permission is only real if the API also exposes the operation. A restricted
 * admin may hold `delete` on DDIs while the client API declares no DELETE for
 * `/ddis` at all — in which case the button must not appear.
 */
function intersectPermissions(
  granted: Record<Operation, boolean>,
  manifest: ResourceManifest
): Record<Operation, boolean> {
  return {
    create: granted.create && manifest.operations.create,
    read:
      granted.read && (manifest.operations.read || manifest.operations.list),
    update: granted.update && manifest.operations.update,
    delete: granted.delete && manifest.operations.delete,
  };
}

const UNKNOWN_META: FieldMeta = { kind: 'unknown' };

export function resolveField(
  name: string,
  meta: FieldMeta | undefined,
  descriptor: FieldDescriptor | undefined,
  t: Translate = identity
): ResolvedField {
  // A descriptor `format` override has to reach `widgetFor`, which is how a
  // spec-declared string becomes a password box or a colour picker.
  const merged: FieldMeta = {
    ...(meta ?? UNKNOWN_META),
    ...(descriptor?.format ? { format: descriptor.format } : {}),
  };

  const widget =
    descriptor?.widget ??
    (descriptor?.relation ? 'reference' : widgetFor(merged));

  const options = buildOptions(merged, descriptor, t);

  return {
    name,
    label: descriptor?.label ? t(descriptor.label) : humanise(name),
    helpText: descriptor?.helpText ? t(descriptor.helpText) : undefined,
    widget,
    meta: merged,
    descriptor,
    required: merged.required === true,
    readOnly: descriptor?.readOnly ?? merged.readOnly === true,
    options,
    nullLabel: descriptor?.nullLabel ? t(descriptor.nullLabel) : undefined,
    relation: descriptor?.relation,
    Control: descriptor?.Control,
  };
}

function buildOptions(
  meta: FieldMeta,
  descriptor: FieldDescriptor | undefined,
  t: Translate
): Array<{ value: string; label: string }> | undefined {
  // Descriptor-declared options win outright: they may both relabel and
  // restrict, which is how the client portal hides route types the tenant is
  // not entitled to.
  if (descriptor?.options) {
    return Object.entries(descriptor.options).map(([value, label]) => ({
      value,
      label: t(label),
    }));
  }

  if (!meta.enum || meta.enum.length === 0) return undefined;

  return meta.enum
    .filter((value): value is string | number => value !== null)
    .map((value) => ({ value: String(value), label: humanise(String(value)) }));
}

function resolveColumns(
  descriptor: EntityDescriptor<never> | EntityDescriptor<Row>,
  listFields: FieldMetaMap,
  fieldsByName: Record<string, ResolvedField>,
  t: Translate
): Array<ColumnDescriptor & { label: string; sortable: boolean }> {
  const sortable = new Set(
    // `orderBy` lives on the manifest, but columns may also be declared
    // sortable explicitly; both are honoured below.
    Object.keys(listFields)
  );

  return descriptor.columns.map((column) => ({
    ...column,
    label: column.label
      ? t(column.label)
      : (fieldsByName[column.name]?.label ?? humanise(column.name)),
    sortable: column.sortable ?? sortable.has(column.name),
  }));
}

function resolveFilters(
  descriptor: EntityDescriptor<never> | EntityDescriptor<Row>,
  manifest: ResourceManifest,
  fieldsByName: Record<string, ResolvedField>,
  listFields: FieldMetaMap
): ResolvedFilter[] {
  const wanted = descriptor.quickFilters ?? Object.keys(manifest.filters);

  return wanted
    .filter((field) => manifest.filters[field] !== undefined)
    .map((field) => {
      const resolved = fieldsByName[field];
      const meta = resolved?.meta ?? listFields[field] ?? UNKNOWN_META;
      return {
        field,
        label: resolved?.label ?? humanise(field),
        operators: manifest.filters[field] ?? [],
        widget: resolved?.widget ?? widgetFor(meta),
        options: resolved?.options,
      };
    });
}

/**
 * Field visibility for a given form state — the successor to ivoz-ui's
 * `EntityService.getVisualToggles()`.
 *
 * Every field starts visible. Each field carrying `toggles` is then applied in
 * declaration order: `hide` first, then `show`, so the common
 * "hide all the alternatives, reveal the one that matches" rule reads naturally.
 * Later rules win over earlier ones. An imperative `visibleWhen` is applied last
 * and overrides everything for that field.
 */
export function computeVisibility(
  fields: ResolvedField[],
  values: Row
): Record<string, boolean> {
  const visible: Record<string, boolean> = {};
  for (const field of fields) visible[field.name] = true;

  for (const field of fields) {
    const toggles = field.descriptor?.toggles;
    if (!toggles) continue;

    const raw = values[field.name];
    const key =
      raw === null || raw === undefined || raw === ''
        ? TOGGLE_NULL
        : String(raw);
    const rule = toggles[key] ?? toggles[TOGGLE_DEFAULT];
    if (!rule) continue;

    for (const name of rule.hide ?? []) {
      if (name in visible) visible[name] = false;
    }
    for (const name of rule.show ?? []) {
      if (name in visible) visible[name] = true;
    }
  }

  for (const field of fields) {
    if (field.descriptor?.visibleWhen) {
      visible[field.name] = field.descriptor.visibleWhen(values);
    }
  }

  return visible;
}

/** `outgoingDdiRule` -> `Outgoing ddi rule`. A last resort when no label is declared. */
export function humanise(name: string): string {
  const spaced = name
    .replace(/[_.]/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}
