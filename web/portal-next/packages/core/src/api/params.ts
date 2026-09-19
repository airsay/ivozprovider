import type { FilterOperator } from './resourceManifest';

/**
 * Query-string construction for the api-platform conventions this backend uses.
 *
 *   filtering   `name[partial]=foo`, `brand[]=3&brand[]=4`, `exists[lastname]=true`
 *   sorting     `_order[startTime]=DESC`
 *   paging      `_page=2&_itemsPerPage=50`, or `_pagination=false` for exports
 *   projection  `_properties[]=id&_properties[]=name`
 *   timezone    `_timezone=Europe/Madrid`
 *
 * There is no `filters:` declaration anywhere in the backend config — the
 * operators are derived from Doctrine metadata when the spec is exported, which
 * is why the generated `ResourceManifest.filters` is the authority on what a
 * given field actually supports.
 */

export type SortDirection = 'ASC' | 'DESC';

export interface FilterCriterion {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | Array<string | number> | null;
}

export interface ListParams {
  page?: number;
  itemsPerPage?: number;
  /** `false` disables pagination entirely — only on resources whose manifest says `paginationClientEnabled`. */
  paginate?: boolean;
  sort?: Array<{ field: string; direction: SortDirection }>;
  filters?: FilterCriterion[];
  /** Sparse fieldset: ask only for the columns actually rendered. */
  properties?: string[];
  timezone?: string;
}

/** How each operator is spelled on the wire. */
function parameterName(criterion: FilterCriterion): string {
  const { field, operator } = criterion;
  switch (operator) {
    case 'eq':
      return field;
    case 'in':
      return `${field}[]`;
    case 'exists':
      // Both `field[exists]` and `exists[field]` appear in the specs; the
      // `exists[field]` form is the one api-platform's ExistsFilter documents
      // and the one present on every filterable resource.
      return `exists[${field}]`;
    default:
      return `${field}[${operator}]`;
  }
}

export function buildListSearchParams(params: ListParams): URLSearchParams {
  const search = new URLSearchParams();

  for (const criterion of params.filters ?? []) {
    const name = parameterName(criterion);
    const { value } = criterion;

    if (value === null || value === undefined || value === '') continue;

    if (Array.isArray(value)) {
      for (const entry of value) search.append(name, String(entry));
    } else if (typeof value === 'boolean') {
      search.append(name, value ? 'true' : 'false');
    } else {
      search.append(name, String(value));
    }
  }

  for (const { field, direction } of params.sort ?? []) {
    search.append(`_order[${field}]`, direction);
  }

  if (params.paginate === false) {
    search.append('_pagination', 'false');
  } else {
    if (params.page !== undefined) search.append('_page', String(params.page));
    if (params.itemsPerPage !== undefined) {
      search.append('_itemsPerPage', String(params.itemsPerPage));
    }
  }

  for (const property of params.properties ?? []) {
    search.append('_properties[]', property);
  }

  if (params.timezone) search.append('_timezone', params.timezone);

  return search;
}

/** Substitutes `{id}` style placeholders in a spec path. */
export function interpolatePath(
  path: string,
  values: Record<string, string | number>
): string {
  return path.replace(/\{([^}]+)\}/g, (_match, key: string) => {
    const value = values[key];
    if (value === undefined) {
      throw new Error(`Missing path parameter "${key}" for ${path}`);
    }
    return encodeURIComponent(String(value));
  });
}
