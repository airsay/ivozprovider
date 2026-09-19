import { propertyKey, stringLiteral } from './naming.js';
import {
  type Operation,
  type Parameter,
  refName,
  type SwaggerSpec,
} from './swagger.js';

/**
 * Turns the spec's `paths` into a runtime resource manifest.
 *
 * This is the piece that replaces ivoz-ui's `ApiSpecParser` + `EntityService`
 * path/filter derivation — except it happens at build time, so the app no longer
 * blocks on downloading a 1.8 MB Swagger document before it can render anything
 * (see `web/portal/client/src/App.tsx`, the "Loading API definition..." gate).
 *
 * Filter operators are read off the collection GET query parameters, which is
 * the only authoritative source: the backend declares no `filters:` config —
 * irontec/ivoz-api-bundle derives them from Doctrine metadata at export time.
 */

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'exact'
  | 'partial'
  | 'start'
  | 'end'
  | 'in'
  | 'exists'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'between';

const OPERATOR_ALIASES: Record<string, FilterOperator> = {
  exact: 'exact',
  partial: 'partial',
  start: 'start',
  end: 'end',
  neq: 'neq',
  exists: 'exists',
  gt: 'gt',
  gte: 'gte',
  lt: 'lt',
  lte: 'lte',
  between: 'between',
};

interface ResourceDraft {
  key: string;
  collectionPath?: string;
  itemPath?: string;
  listSchema?: string;
  detailSchema?: string;
  writeSchema?: string;
  createSchema?: string;
  singleton: boolean;
  multipartPayloadField?: string;
  multipartFileFields: Set<string>;
  operations: Set<'list' | 'create' | 'read' | 'update' | 'delete'>;
  filters: Map<string, Set<FilterOperator>>;
  orderBy: Set<string>;
  paginationClientEnabled: boolean;
  consumesMultipart: boolean;
  produces: Set<string>;
  subresources: Array<{
    path: string;
    method: string;
    name: string;
    summary?: string;
    produces?: string[];
    consumes?: string[];
    scope: 'item' | 'collection';
  }>;
}

const PARAM_PLACEHOLDER = /^\{.+\}$/;

function segments(path: string): string[] {
  return path.split('/').filter(Boolean);
}

/**
 * The resource a path belongs to, and what role the path plays in it.
 *
 *   /ddis                 -> ddis, collection
 *   /ddis/{id}            -> ddis, item
 *   /ddis/{id}/file       -> ddis, item subresource "file"
 *   /ddis/unlink          -> ddis, collection subresource "unlink"
 *   /my/dashboard         -> my/dashboard, singleton
 */
function classify(path: string): {
  key: string;
  role: 'collection' | 'item' | 'item-sub' | 'collection-sub';
  name?: string;
} {
  const parts = segments(path);

  if (parts.length === 0) {
    return { key: '/', role: 'collection' };
  }

  // `/my/...` endpoints are hand-written singleton controllers, not CRUD
  // resources; keep their full path as the key so they stay distinct.
  if (parts[0] === 'my' || parts[0] === 'token') {
    return { key: parts.join('/'), role: 'collection' };
  }

  const head = parts[0]!;

  if (parts.length === 1) {
    return { key: head, role: 'collection' };
  }

  if (parts.length === 2) {
    return PARAM_PLACEHOLDER.test(parts[1]!)
      ? { key: head, role: 'item' }
      : { key: head, role: 'collection-sub', name: parts[1] };
  }

  // 3+ segments: item subresource when the second segment is a placeholder.
  if (PARAM_PLACEHOLDER.test(parts[1]!)) {
    return {
      key: head,
      role: 'item-sub',
      name: parts
        .slice(2)
        .filter((p) => !PARAM_PLACEHOLDER.test(p))
        .join('_'),
    };
  }

  return { key: head, role: 'collection-sub', name: parts.slice(1).join('_') };
}

function responseSchemaName(operation: Operation): {
  name?: string;
  isArray: boolean;
} {
  const ok = operation.responses?.['200'] ?? operation.responses?.['201'];
  const schema = ok?.schema;
  if (!schema) return { isArray: false };
  if (schema.$ref) return { name: refName(schema.$ref), isArray: false };
  if (schema.type === 'array' && schema.items?.$ref) {
    return { name: refName(schema.items.$ref), isArray: true };
  }
  return { isArray: schema.type === 'array' };
}

function bodySchemaName(operation: Operation): string | undefined {
  const body = operation.parameters?.find((p) => p.in === 'body');
  const ref = body?.schema?.$ref;
  return ref ? refName(ref) : undefined;
}

/**
 * Pulls the form-field layout out of a multipart operation: the lone `string`
 * field is the JSON payload, every `file` field is a binary.
 */
function collectMultipart(operation: Operation, draft: ResourceDraft): void {
  if (!operation.consumes?.includes('multipart/form-data')) return;
  for (const parameter of operation.parameters ?? []) {
    if (parameter.in !== 'formData') continue;
    if (parameter.type === 'file') {
      draft.multipartFileFields.add(parameter.name);
    } else if (!draft.multipartPayloadField) {
      draft.multipartPayloadField = parameter.name;
    }
  }
}

function collectFilters(
  parameters: Parameter[] | undefined,
  draft: ResourceDraft
): void {
  for (const parameter of parameters ?? []) {
    if (parameter.in !== 'query') continue;
    const raw = parameter.name;

    if (raw === '_pagination') {
      draft.paginationClientEnabled = true;
      continue;
    }

    // `_order[field]`
    const order = /^_order\[(.+)\]$/.exec(raw);
    if (order?.[1]) {
      draft.orderBy.add(order[1]);
      continue;
    }

    if (raw.startsWith('_')) continue;

    // `exists[field]`
    const exists = /^exists\[(.+)\]$/.exec(raw);
    if (exists?.[1]) {
      addFilter(draft, exists[1], 'exists');
      continue;
    }

    // `field[]` — repeatable, i.e. an IN filter
    if (raw.endsWith('[]')) {
      addFilter(draft, raw.slice(0, -2), 'in');
      continue;
    }

    // `field[op]`
    const scoped = /^(.+)\[(.+)\]$/.exec(raw);
    if (scoped?.[1] && scoped[2]) {
      const operator = OPERATOR_ALIASES[scoped[2]];
      if (operator) addFilter(draft, scoped[1], operator);
      continue;
    }

    addFilter(draft, raw, 'eq');
  }
}

function addFilter(
  draft: ResourceDraft,
  field: string,
  operator: FilterOperator
): void {
  let set = draft.filters.get(field);
  if (!set) {
    set = new Set();
    draft.filters.set(field, set);
  }
  set.add(operator);
}

export function buildResources(spec: SwaggerSpec): ResourceDraft[] {
  const drafts = new Map<string, ResourceDraft>();

  const draftFor = (key: string): ResourceDraft => {
    let draft = drafts.get(key);
    if (!draft) {
      draft = {
        key,
        singleton: false,
        multipartFileFields: new Set(),
        operations: new Set(),
        filters: new Map(),
        orderBy: new Set(),
        paginationClientEnabled: false,
        consumesMultipart: false,
        produces: new Set(),
        subresources: [],
      };
      drafts.set(key, draft);
    }
    return draft;
  };

  for (const [path, item] of Object.entries(spec.paths)) {
    const { key, role, name } = classify(path);
    const draft = draftFor(key);

    for (const [method, operation] of Object.entries(item)) {
      if (!operation) continue;
      for (const produced of operation.produces ?? [])
        draft.produces.add(produced);
      if (operation.consumes?.includes('multipart/form-data')) {
        draft.consumesMultipart = true;
      }

      if (role === 'collection') {
        draft.collectionPath = path;
        if (method === 'get') {
          draft.operations.add('list');
          const { name: schema, isArray } = responseSchemaName(operation);
          if (schema) draft.listSchema = schema;
          // A GET on a collection path that answers with a single object is a
          // singleton controller (`/my/profile`, `/my/dashboard`, `/my/theme`),
          // not a paginated collection.
          if (!isArray) draft.singleton = true;
          collectFilters(operation.parameters, draft);
        }
        if (method === 'post') {
          draft.operations.add('create');
          draft.createSchema = bodySchemaName(operation);
          collectMultipart(operation, draft);
          const { name: schema } = responseSchemaName(operation);
          if (schema && !draft.detailSchema) draft.detailSchema = schema;
        }
      } else if (role === 'item') {
        draft.itemPath = path;
        if (method === 'get') {
          draft.operations.add('read');
          const { name: schema } = responseSchemaName(operation);
          if (schema) draft.detailSchema = schema;
        }
        if (method === 'put') {
          draft.operations.add('update');
          draft.writeSchema = bodySchemaName(operation);
          collectMultipart(operation, draft);
        }
        if (method === 'delete') draft.operations.add('delete');
      } else {
        draft.subresources.push({
          path,
          method,
          name: name || 'action',
          ...(operation.summary ? { summary: operation.summary } : {}),
          ...(operation.produces ? { produces: operation.produces } : {}),
          ...(operation.consumes ? { consumes: operation.consumes } : {}),
          scope: role === 'item-sub' ? 'item' : 'collection',
        });
      }
    }
  }

  // Multipart writes have no `$ref` body parameter, so the write schema has to
  // be inferred from the read schemas: `Locution-detailed` -> `Locution`.
  for (const draft of drafts.values()) {
    if (!draft.multipartPayloadField) continue;
    const base = (draft.detailSchema ?? draft.listSchema)?.split('-')[0];
    if (!base || !spec.definitions[base]) continue;
    draft.writeSchema ??= base;
    draft.createSchema ??= base;
  }

  return [...drafts.values()].sort((a, b) => a.key.localeCompare(b.key));
}

export function emitResources(
  spec: SwaggerSpec,
  app: string,
  source: string
): string {
  const drafts = buildResources(spec);

  const header =
    `/* eslint-disable */\n` +
    `// GENERATED FILE — do not edit by hand.\n` +
    `// Source: ${source}\n` +
    `// Regenerate with: yarn codegen\n\n` +
    `import type { ResourceManifest } from '../../resourceManifest';\n\n`;

  const entries = drafts.map((draft) => {
    const filters = [...draft.filters.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([field, operators]) => {
        const ops = [...operators].sort();
        return `      ${propertyKey(field)}: [${ops.map(stringLiteral).join(', ')}],`;
      })
      .join('\n');

    const subresources = draft.subresources
      .sort(
        (a, b) =>
          a.path.localeCompare(b.path) || a.method.localeCompare(b.method)
      )
      .map((sub) => {
        const bits = [
          `name: ${stringLiteral(sub.name)}`,
          `path: ${stringLiteral(sub.path)}`,
          `method: ${stringLiteral(sub.method.toUpperCase())}`,
          `scope: ${stringLiteral(sub.scope)}`,
        ];
        if (sub.summary) bits.push(`summary: ${stringLiteral(sub.summary)}`);
        if (sub.produces?.includes('application/octet-stream'))
          bits.push(`binary: true`);
        if (sub.consumes?.includes('multipart/form-data'))
          bits.push(`multipart: true`);
        return `      { ${bits.join(', ')} },`;
      })
      .join('\n');

    const lines = [
      `    key: ${stringLiteral(draft.key)},`,
      draft.collectionPath
        ? `    collectionPath: ${stringLiteral(draft.collectionPath)},`
        : '',
      draft.singleton ? `    singleton: true,` : '',
      draft.itemPath ? `    itemPath: ${stringLiteral(draft.itemPath)},` : '',
      `    operations: {`,
      `      list: ${draft.operations.has('list')},`,
      `      create: ${draft.operations.has('create')},`,
      `      read: ${draft.operations.has('read')},`,
      `      update: ${draft.operations.has('update')},`,
      `      delete: ${draft.operations.has('delete')},`,
      `    },`,
      `    schemas: {`,
      draft.listSchema ? `      list: ${stringLiteral(draft.listSchema)},` : '',
      draft.detailSchema
        ? `      detail: ${stringLiteral(draft.detailSchema)},`
        : '',
      draft.writeSchema
        ? `      write: ${stringLiteral(draft.writeSchema)},`
        : '',
      draft.createSchema
        ? `      create: ${stringLiteral(draft.createSchema)},`
        : '',
      `    },`,
      `    filters: {`,
      filters,
      `    },`,
      `    orderBy: [${[...draft.orderBy].sort().map(stringLiteral).join(', ')}],`,
      `    paginationClientEnabled: ${draft.paginationClientEnabled},`,
      `    multipart: ${draft.consumesMultipart},`,
      draft.multipartPayloadField
        ? `    multipartForm: { payloadField: ${stringLiteral(draft.multipartPayloadField)}, ` +
          `fileFields: [${[...draft.multipartFileFields].sort().map(stringLiteral).join(', ')}] },`
        : '',
      `    subresources: [`,
      subresources,
      `    ],`,
    ].filter(Boolean);

    return `  ${propertyKey(draft.key)}: {\n${lines.join('\n')}\n  },`;
  });

  return (
    header +
    `export const resources = {\n${entries.join('\n')}\n} satisfies Record<string, ResourceManifest>;\n\n` +
    `export type ResourceKey = keyof typeof resources;\n\n` +
    `export const apiBasePath = ${stringLiteral(spec.basePath.replace(/\/$/, ''))};\n` +
    `export const apiTitle = ${stringLiteral(spec.info.title)};\n` +
    `export const appName = ${stringLiteral(app)};\n`
  );
}
