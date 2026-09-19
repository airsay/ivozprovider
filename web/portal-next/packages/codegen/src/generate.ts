import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

import { emitResources } from './emitResources.js';
import { emitSchemas } from './emitSchemas.js';
import type { SwaggerSpec } from './swagger.js';

export const APPS = ['platform', 'brand', 'client', 'user'] as const;
export type AppName = (typeof APPS)[number];

/** Repo root, derived from this file's location (packages/codegen/src). */
export function repoRoot(): string {
  return resolve(new URL('../../../../..', import.meta.url).pathname);
}

export function specPath(root: string, app: AppName): string {
  return resolve(root, 'web/rest', app, 'public/apiSpec.json');
}

export function outputDir(root: string, app: AppName): string {
  return resolve(root, 'web/portal-next/packages/core/src/api/generated', app);
}

function writeIfChanged(file: string, contents: string): boolean {
  mkdirSync(dirname(file), { recursive: true });
  let previous: string | null = null;
  try {
    previous = readFileSync(file, 'utf8');
  } catch {
    previous = null;
  }
  if (previous === contents) return false;
  writeFileSync(file, contents, 'utf8');
  return true;
}

export interface GenerateResult {
  app: AppName;
  definitions: number;
  paths: number;
  resources: number;
  written: string[];
}

export function generateApp(root: string, app: AppName): GenerateResult {
  const specFile = specPath(root, app);
  const spec = JSON.parse(readFileSync(specFile, 'utf8')) as SwaggerSpec;

  if (spec.swagger !== '2.0') {
    throw new Error(
      `${specFile}: expected a Swagger 2.0 document, got ${JSON.stringify(spec.swagger)}`
    );
  }

  const source = relative(root, specFile);
  const { types, fields } = emitSchemas(spec, app, source);
  const resources = emitResources(spec, app, source);

  const dir = outputDir(root, app);
  const written: string[] = [];

  const files: Array<[string, string]> = [
    [resolve(dir, 'schemas.ts'), types],
    [resolve(dir, 'fields.ts'), fields],
    [resolve(dir, 'resources.ts'), resources],
    [
      resolve(dir, 'index.ts'),
      `/* eslint-disable */\n` +
        `// GENERATED FILE — do not edit by hand.\n` +
        `export * from './schemas';\n` +
        `export * from './fields';\n` +
        `export * from './resources';\n`,
    ],
  ];

  for (const [file, contents] of files) {
    if (writeIfChanged(file, contents)) written.push(relative(root, file));
  }

  return {
    app,
    definitions: Object.keys(spec.definitions).length,
    paths: Object.keys(spec.paths).length,
    resources: (resources.match(/^ {2}["'a-zA-Z]/gm) ?? []).length,
    written,
  };
}

export function generateAll(root = repoRoot()): GenerateResult[] {
  return APPS.map((app) => generateApp(root, app));
}
