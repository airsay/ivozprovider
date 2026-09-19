import {
  baseName,
  buildNameRegistry,
  propertyKey,
  stringLiteral,
  variantName,
} from './naming.js';
import { refName, type SchemaObject, type SwaggerSpec } from './swagger.js';

/**
 * Emits one TypeScript interface per Swagger definition, plus a runtime
 * field-metadata record per definition.
 *
 * Nullability rule: the API returns unset properties as an explicit `null`
 * rather than omitting them (verified against the committed fixtures, e.g.
 * `web/portal/client/cypress/fixtures/Ddi/getCollection.json`, where every
 * unset foreign key and even the `routeType` enum come back as `null`).
 * So anything not listed in the definition's `required` array is emitted as
 * `?: T | null`. It is noisier than `?: T`, and it is the truth.
 */

export interface EmittedSchemas {
  types: string;
  fields: string;
}

type NameOf = (definition: string) => string;

function tsType(schema: SchemaObject, indent: string, nameOf: NameOf): string {
  if (schema.$ref) {
    return nameOf(refName(schema.$ref));
  }

  if (schema.enum && schema.enum.length > 0) {
    return schema.enum
      .map((value) =>
        value === null
          ? 'null'
          : typeof value === 'number'
            ? String(value)
            : stringLiteral(String(value))
      )
      .join(' | ');
  }

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  switch (type) {
    case 'string':
      return 'string';
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'file':
      return 'Blob';
    case 'array':
      return schema.items
        ? `Array<${tsType(schema.items, indent, nameOf)}>`
        : 'unknown[]';
    case 'object':
      if (schema.properties) {
        return inlineObject(schema, indent, nameOf);
      }
      return 'Record<string, unknown>';
    default:
      return 'unknown';
  }
}

function inlineObject(
  schema: SchemaObject,
  indent: string,
  nameOf: NameOf
): string {
  const inner = indent + '  ';
  const required = new Set(schema.required ?? []);
  const lines = Object.entries(schema.properties ?? {}).map(([key, value]) => {
    const optional = required.has(key) ? '' : '?';
    const nullable = required.has(key) ? '' : ' | null';
    return `${inner}${propertyKey(key)}${optional}: ${tsType(value, inner, nameOf)}${nullable};`;
  });
  return `{\n${lines.join('\n')}\n${indent}}`;
}

function docComment(schema: SchemaObject, indent: string): string {
  const notes: string[] = [];
  if (schema.description) notes.push(schema.description);
  if (schema.readOnly) notes.push('Read-only.');
  if (schema.maxLength !== undefined)
    notes.push(`Max length ${schema.maxLength}.`);
  if (schema.pattern) notes.push(`Pattern: ${schema.pattern}`);
  if (notes.length === 0) return '';
  return `${indent}/** ${notes.join(' ')} */\n`;
}

export function emitSchemas(
  spec: SwaggerSpec,
  app: string,
  source: string
): EmittedSchemas {
  const header =
    `/* eslint-disable */\n` +
    `// GENERATED FILE — do not edit by hand.\n` +
    `// Source: ${source}\n` +
    `// Regenerate with: yarn codegen\n` +
    `// App: ${app}  Spec: swagger ${spec.swagger}  basePath: ${spec.basePath}\n\n`;

  const definitions = Object.keys(spec.definitions).sort();
  const names = buildNameRegistry(definitions);
  const nameOf: NameOf = (definition) => {
    const identifier = names.get(definition);
    if (!identifier)
      throw new Error(`Unknown definition referenced: ${definition}`);
    return identifier;
  };

  const typeBlocks = definitions.map((name) => {
    const schema = spec.definitions[name];
    if (!schema) return '';
    const required = new Set(schema.required ?? []);
    const props = Object.entries(schema.properties ?? {});

    const body = props
      .map(([key, value]) => {
        const optional = required.has(key) ? '' : '?';
        const nullable = required.has(key) ? '' : ' | null';
        const readonly = value.readOnly ? 'readonly ' : '';
        return (
          docComment(value, '  ') +
          `  ${readonly}${propertyKey(key)}${optional}: ${tsType(value, '  ', nameOf)}${nullable};`
        );
      })
      .join('\n');

    const variant = variantName(name);
    const note = variant
      ? `/** \`${name}\` — the \`${variant}\` serialization of ${baseName(name)}. */`
      : `/** \`${name}\` */`;

    return `${note}\nexport interface ${nameOf(name)} {\n${body || '  [key: string]: never;'}\n}\n`;
  });

  const registry =
    `/** Every definition in this spec, keyed by its wire name. */\n` +
    `export interface Definitions {\n` +
    definitions
      .map((name) => `  ${propertyKey(name)}: ${nameOf(name)};`)
      .join('\n') +
    `\n}\n\n` +
    `export type DefinitionName = keyof Definitions;\n`;

  const fieldBlocks = definitions.map((name) => {
    const schema = spec.definitions[name];
    if (!schema) return '';
    const required = new Set(schema.required ?? []);
    const entries = Object.entries(schema.properties ?? {}).map(
      ([key, value]) => {
        const meta: string[] = [];
        const type = Array.isArray(value.type) ? value.type[0] : value.type;
        meta.push(
          `kind: ${stringLiteral(value.$ref ? 'ref' : (type ?? 'unknown'))}`
        );
        if (value.$ref) meta.push(`ref: ${stringLiteral(refName(value.$ref))}`);
        if (value.format) meta.push(`format: ${stringLiteral(value.format)}`);
        if (value.enum) meta.push(`enum: ${JSON.stringify(value.enum)}`);
        if (value.maxLength !== undefined)
          meta.push(`maxLength: ${value.maxLength}`);
        if (value.minLength !== undefined)
          meta.push(`minLength: ${value.minLength}`);
        if (value.maximum !== undefined) meta.push(`maximum: ${value.maximum}`);
        if (value.minimum !== undefined) meta.push(`minimum: ${value.minimum}`);
        if (value.pattern)
          meta.push(`pattern: ${stringLiteral(value.pattern)}`);
        if (value.default !== undefined)
          meta.push(`default: ${JSON.stringify(value.default)}`);
        if (value.readOnly) meta.push(`readOnly: true`);
        if (required.has(key)) meta.push(`required: true`);
        if (value.items?.$ref)
          meta.push(`itemsRef: ${stringLiteral(refName(value.items.$ref))}`);
        return `  ${propertyKey(key)}: { ${meta.join(', ')} },`;
      }
    );

    return (
      `export const ${nameOf(name)}Fields: FieldMetaMap = {\n` +
      entries.join('\n') +
      `\n};\n`
    );
  });

  const fieldRegistry =
    `/** Field metadata for every definition, keyed by wire name. */\n` +
    `export const fieldsByDefinition: Record<string, FieldMetaMap> = {\n` +
    definitions
      .map((name) => `  ${propertyKey(name)}: ${nameOf(name)}Fields,`)
      .join('\n') +
    `\n};\n`;

  return {
    types: header + typeBlocks.join('\n') + '\n' + registry,
    fields:
      header +
      `import type { FieldMetaMap } from '../../fieldMeta';\n\n` +
      fieldBlocks.join('\n') +
      '\n' +
      fieldRegistry,
  };
}
