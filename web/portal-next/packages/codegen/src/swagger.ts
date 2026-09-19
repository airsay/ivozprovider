/**
 * Minimal Swagger 2.0 typings — only the parts the IvozProvider specs actually use.
 *
 * The four specs at `web/rest/<app>/public/apiSpec.json` are emitted by
 * `bin/console api:swagger:export` (api-platform via irontec/ivoz-api-bundle) and
 * declare `"swagger": "2.0"`. We read them directly rather than converting to
 * OpenAPI 3 first: the conversion would buy us nothing here, and generating
 * straight from the source keeps the filter/parameter information intact, which
 * is the part we care most about.
 */

export interface SwaggerSpec {
  swagger: '2.0';
  basePath: string;
  info: { title: string; version: string; description?: string };
  paths: Record<string, PathItem>;
  definitions: Record<string, SchemaObject>;
  securityDefinitions?: Record<string, unknown>;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type PathItem = Partial<Record<HttpMethod, Operation>>;

export interface Operation {
  summary?: string;
  operationId?: string;
  tags?: string[];
  consumes?: string[];
  produces?: string[];
  parameters?: Parameter[];
  responses?: Record<string, Response>;
}

export interface Parameter {
  name: string;
  in: 'query' | 'path' | 'body' | 'formData' | 'header';
  required?: boolean;
  type?: string;
  format?: string;
  description?: string;
  schema?: SchemaObject;
  items?: SchemaObject;
}

export interface Response {
  description?: string;
  schema?: SchemaObject;
  headers?: Record<string, { type?: string; description?: string }>;
}

export interface SchemaObject {
  $ref?: string;
  type?: string | string[];
  format?: string;
  title?: string;
  description?: string;
  enum?: Array<string | number | null>;
  default?: unknown;
  example?: unknown;
  items?: SchemaObject;
  properties?: Record<string, SchemaObject>;
  required?: string[];
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  maximum?: number;
  minimum?: number;
  pattern?: string;
  additionalProperties?: boolean | SchemaObject;
}

/** `#/definitions/Ddi-detailed` -> `Ddi-detailed` */
export function refName(ref: string): string {
  const marker = '#/definitions/';
  if (!ref.startsWith(marker)) {
    throw new Error(
      `Unsupported $ref (only local definitions are handled): ${ref}`
    );
  }
  return ref.slice(marker.length);
}
