/**
 * The build-time description of one API resource, generated from the spec's
 * `paths` into `api/generated/<app>/resources.ts`.
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
  | 'between'
  // api-platform DateFilter. The spec lists these on date fields, but codegen
  // does not map them into the manifest yet, so only hand-written queries use them.
  | 'after'
  | 'before'
  | 'strictly_after'
  | 'strictly_before';

export interface SubresourceManifest {
  /** Derived from the trailing path segments, e.g. `file`, `mass_import`, `status`. */
  name: string;
  /** The raw spec path, placeholders included: `/ddis/{id}/file`. */
  path: string;
  method: string;
  /** `item` subresources need an id; `collection` ones do not. */
  scope: 'item' | 'collection';
  summary?: string;
  /** Responds with `application/octet-stream` — fetch it as a Blob. */
  binary?: boolean;
  /** Accepts `multipart/form-data`. */
  multipart?: boolean;
}

/**
 * How a `multipart/form-data` write is shaped.
 *
 * File-carrying resources (locutions, music on hold, invoices, brand logos,
 * fax files, destination-rate CSVs) do not take a JSON body. api-platform
 * declares them as form fields instead: one text field holding the JSON payload,
 * named after the entity in lowerCamelCase, plus one `file` field per file
 * property. See `PUT /locutions/{id}` in the client spec.
 */
export interface MultipartManifest {
  /** Form field carrying the JSON-encoded resource, e.g. `locution`. */
  payloadField: string;
  /** Form fields carrying binaries, e.g. `['OriginalFile']`. */
  fileFields: string[];
}

export interface ResourceManifest {
  key: string;
  collectionPath?: string;
  itemPath?: string;
  /**
   * True when the collection path returns a single object rather than an array
   * — the `/my/*` controllers (`/my/profile`, `/my/dashboard`, `/my/theme`) and
   * the token endpoints. These are not CRUD resources and must not be paginated.
   */
  singleton?: boolean;
  operations: {
    list: boolean;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  schemas: {
    /** Definition name backing collection rows, e.g. `Ddi-collection`. */
    list?: string;
    /** Definition name backing a single item, e.g. `Ddi-detailed`. */
    detail?: string;
    /** Definition name accepted by PUT. */
    write?: string;
    /** Definition name accepted by POST. */
    create?: string;
  };
  /** Field name -> the operators the API exposes for it. */
  filters: Record<string, FilterOperator[]>;
  /** Fields that may appear in `_order[...]`. */
  orderBy: string[];
  /** Whether the resource honours `_pagination=false` (used for full CSV exports). */
  paginationClientEnabled: boolean;
  /** Whether any operation accepts `multipart/form-data`. */
  multipart: boolean;
  /** Present when `multipart` is true: how to build the form body. */
  multipartForm?: MultipartManifest;
  subresources: SubresourceManifest[];
}
