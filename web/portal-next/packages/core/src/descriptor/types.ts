import type { ComponentType, ReactNode } from 'react';

import type { AccessControl, Operation } from '../acl/accessControl';
import type { FieldMeta, FieldWidget } from '../api/fieldMeta';
import type { SortDirection } from '../api/params';
import type { FilterOperator, ResourceManifest } from '../api/resourceManifest';

/**
 * An entity descriptor: everything about a resource that the API spec does not
 * say.
 *
 * The spec knows a field is a 25-character string with eleven allowed values.
 * It does not know the field is called "Route type", that `friend` should read
 * "Friend", that picking `ivr` reveals the IVR selector and hides ten other
 * controls, or that the whole screen hangs off the `DDIs` ACL iden. All of that
 * lived in `web/portal/<app>/src/entities/<Entity>/<Entity>.tsx` and is the one
 * part of the old frontend genuinely worth carrying across.
 *
 * Descriptors are plain data with a few callbacks. They are merged over the
 * generated field metadata at render time — overrides win, the same precedence
 * ivoz-ui used (`{...specProperty, ...entityOverride}`).
 */

/** A value drawn from a row, in the shape the renderer needs. */
export type RowValue = string | number | boolean | null | undefined | object;
export type Row = Record<string, unknown>;

export interface RenderContext {
  /** The current row, for cell and detail rendering. */
  row: Row;
  /** Translate a key. */
  t: (key: string, options?: Record<string, unknown>) => string;
  acl: AccessControl;
}

export interface FieldDescriptor {
  /** Translation key for the field label. Required — an unlabelled field is a bug. */
  label: string;
  /** Translation key for help text shown under the control. */
  helpText?: string;
  /**
   * Overrides the spec's `format`. The spec cannot tell you that `User.pass` is
   * a password rather than an 80-character string; this can.
   */
  format?: string;
  /** Forces a widget outright, bypassing inference. */
  widget?: FieldWidget;
  /** Translation keys for each enum value, keyed by the wire value. */
  options?: Record<string, string>;
  /** Translation key describing what `null` means, e.g. "Hang up", "Unassigned". */
  nullLabel?: string;
  /** Marks the field read-only even when the spec allows writing it. */
  readOnly?: boolean;
  /** Excludes the field from forms entirely (still available for columns). */
  hidden?: boolean;
  /** Foreign-key wiring: which resource to read options from, and how to label them. */
  relation?: RelationDescriptor;
  /**
   * Declarative conditional visibility driven by *this* field's value —
   * the successor to ivoz-ui's `visualToggle`.
   *
   * Keys are wire values, plus two pseudo-keys: `__null__` for an unset value
   * and `__default__` for anything not otherwise listed.
   */
  toggles?: Record<string, VisibilityRule>;
  /** Imperative visibility, evaluated against the whole form state. */
  visibleWhen?: (values: Row) => boolean;
  /** Custom read renderer for list cells and detail rows. */
  renderCell?: (value: unknown, context: RenderContext) => ReactNode;
  /** Custom write control, replacing the inferred widget. */
  Control?: ComponentType<FieldControlProps>;
}

export interface VisibilityRule {
  show?: string[];
  hide?: string[];
}

export interface RelationDescriptor {
  /** Manifest key of the resource being pointed at, e.g. `companies`. */
  resource: string;
  /** Property on the related row to use as the option label. */
  labelFrom: string | ((row: Row) => string);
  /** Extra filters to narrow the option list. */
  filterBy?: Record<string, string | number | boolean>;
  /** Fetch options on demand rather than up front — for large tables. */
  searchable?: boolean;
}

export interface FieldControlProps {
  name: string;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string | undefined;
  field: ResolvedField;
  values: Row;
}

export interface ColumnDescriptor {
  /** Property name on the list row. */
  name: string;
  /** Overrides the field's label for this column only. */
  label?: string;
  /** Relative width hint; columns without one share what is left. */
  width?: number;
  sortable?: boolean;
  /** Hide below this breakpoint. `sm` means "phone only shows the essentials". */
  hideBelow?: 'sm' | 'md' | 'lg';
  renderCell?: (value: unknown, context: RenderContext) => ReactNode;
}

export interface FormSection {
  /** Translation key for the fieldset legend. */
  legend: string;
  fields: string[];
  /** Show the section only when this predicate passes. */
  visibleWhen?: (context: DescriptorContext) => boolean;
}

export interface DescriptorContext {
  acl: AccessControl;
  values?: Row;
}

export interface RowAction<TRow extends Row = Row> {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  /** `danger` actions get destructive styling and a confirmation step. */
  intent?: 'default' | 'danger';
  /** Hide the action when this returns false. */
  isAvailable?: (row: TRow, context: DescriptorContext) => boolean;
  /** The ACL operation the action needs; defaults to `update`. */
  requires?: Operation;
  run: (row: TRow, context: ActionContext) => void | Promise<void>;
}

export interface ActionContext {
  navigate: (to: string) => void;
  refresh: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export interface EntityDescriptor<TRow extends Row = Row> {
  /** Stable identity, matching the API definition base name, e.g. `Ddi`. */
  iden: string;
  /** Key into the generated resource manifest, e.g. `ddis`. */
  resource: string;
  /**
   * Resource to list and create through, when the API splits an entity across
   * two paths. The user API does exactly this for call forwarding: the
   * collection lives at `/my/call_forward_settings` (list, create) while a
   * single setting is read, replaced and deleted at `/call_forward_settings/{id}`.
   */
  listResource?: string;
  /** Route segment in the new app, e.g. `numbers`. May differ from the API path. */
  route: string;
  /** Translation keys for the singular and plural names. */
  title: { one: string; many: string };
  icon?: ComponentType<{ className?: string }>;
  /**
   * The *public entity* iden the backend checks permissions against, e.g.
   * `DDIs` for the `Ddi` entity. Often differs from `iden`; when absent the
   * entity is treated as always visible.
   */
  aclIden?: string;
  /**
   * One-line rendering of a row, for headings, breadcrumbs and confirmations.
   * Receives the translator so it can show labels rather than wire values —
   * "When my device is offline", not `userNotRegistered`.
   */
  toStr?: (
    row: TRow,
    t: (key: string, options?: Record<string, unknown>) => string
  ) => string;
  columns: ColumnDescriptor[];
  /** Field overrides, keyed by property name. */
  fields: Record<string, FieldDescriptor>;
  /** Form layout. Fields not mentioned in any section are not rendered. */
  sections: FormSection[];
  defaultSort?: { field: string; direction: SortDirection };
  /** Filters surfaced in the UI, in order. Defaults to whatever the API supports. */
  quickFilters?: string[];
  rowActions?: RowAction<TRow>[];
  /** Hide the entity entirely — e.g. a feature the tenant does not have. */
  isAvailable?: (context: DescriptorContext) => boolean;
}

/** A field with the spec metadata and descriptor overrides already merged. */
export interface ResolvedField {
  name: string;
  label: string;
  helpText: string | undefined;
  widget: FieldWidget;
  meta: FieldMeta;
  descriptor: FieldDescriptor | undefined;
  required: boolean;
  readOnly: boolean;
  options: Array<{ value: string; label: string }> | undefined;
  nullLabel: string | undefined;
  relation: RelationDescriptor | undefined;
  Control: ComponentType<FieldControlProps> | undefined;
}

export interface ResolvedFilter {
  field: string;
  label: string;
  operators: FilterOperator[];
  widget: FieldWidget;
  options: Array<{ value: string; label: string }> | undefined;
}

export interface ResolvedEntity<TRow extends Row = Row> {
  descriptor: EntityDescriptor<TRow>;
  manifest: ResourceManifest;
  permissions: Record<Operation, boolean>;
  fields: ResolvedField[];
  fieldsByName: Record<string, ResolvedField>;
  columns: Array<ColumnDescriptor & { label: string; sortable: boolean }>;
  filters: ResolvedFilter[];
}
