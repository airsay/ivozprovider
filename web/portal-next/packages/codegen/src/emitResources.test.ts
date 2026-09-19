import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { buildResources } from './emitResources';
import { repoRoot } from './generate';
import type { SwaggerSpec } from './swagger';

/** Runs against the committed specs, so a backend change that breaks an assumption fails here. */
function loadSpec(app: string): SwaggerSpec {
  return JSON.parse(
    readFileSync(
      resolve(repoRoot(), 'web/rest', app, 'public/apiSpec.json'),
      'utf8'
    )
  ) as SwaggerSpec;
}

describe('buildResources, against the real client spec', () => {
  const byKey = Object.fromEntries(
    buildResources(loadSpec('client')).map((draft) => [draft.key, draft])
  );

  it('pairs a collection path with its item path', () => {
    expect(byKey.ddis?.collectionPath).toBe('/ddis');
    expect(byKey.ddis?.itemPath).toBe('/ddis/{id}');
  });

  it('reads filter operators straight off the query parameters', () => {
    const operators = byKey.ddis?.filters.get('description');
    expect([...(operators ?? [])].sort()).toEqual([
      'end',
      'eq',
      'exact',
      'exists',
      'neq',
      'partial',
      'start',
    ]);
  });

  it('treats a repeatable parameter as an IN filter', () => {
    expect([...(byKey.ddis?.filters.get('country') ?? [])]).toContain('in');
  });

  it('never exposes an underscore control parameter as a filter', () => {
    for (const draft of Object.values(byKey)) {
      for (const field of draft.filters.keys()) {
        expect(field.startsWith('_')).toBe(false);
      }
    }
  });

  it('collects the sortable fields from _order[...]', () => {
    expect([...(byKey.ddis?.orderBy ?? [])].sort()).toEqual([
      'ddi',
      'ddie164',
      'description',
      'friendValue',
      'id',
      'routeType',
    ]);
  });

  it('marks the /my controllers as singletons, not collections', () => {
    expect(byKey['my/profile']?.singleton).toBe(true);
    expect(byKey['my/dashboard']?.singleton).toBe(true);
    expect(byKey.ddis?.singleton).toBe(false);
  });

  it('flags the resources that allow a client-disabled pagination for exports', () => {
    expect(byKey.billable_calls?.paginationClientEnabled).toBe(true);
    expect(byKey.ddis?.paginationClientEnabled).toBe(false);
  });

  it('derives the multipart form layout and infers the write schema', () => {
    const locutions = byKey.locutions;
    expect(locutions?.multipartPayloadField).toBe('locution');
    expect([...(locutions?.multipartFileFields ?? [])]).toEqual([
      'OriginalFile',
    ]);
    // No `$ref` body exists on a multipart write, so it has to be inferred.
    expect(locutions?.writeSchema).toBe('Locution');
  });

  it('records binary subresources as downloads', () => {
    const originalFile = byKey.locutions?.subresources.find(
      (sub) => sub.name === 'originalfile'
    );
    expect(originalFile?.produces).toContain('application/octet-stream');
    expect(originalFile?.scope).toBe('item');
  });

  it('does not invent CRUD the API does not offer', () => {
    // The client API exposes no POST or DELETE for DDIs.
    expect(byKey.ddis?.operations.has('create')).toBe(false);
    expect(byKey.ddis?.operations.has('delete')).toBe(false);
    expect(byKey.ddis?.operations.has('update')).toBe(true);
  });
});

describe('buildResources, across every app', () => {
  it.each(['platform', 'brand', 'client', 'user'])(
    'parses %s without throwing',
    (app) => {
      const drafts = buildResources(loadSpec(app));
      expect(drafts.length).toBeGreaterThan(0);
      for (const draft of drafts) {
        expect(draft.key).not.toBe('');
      }
    }
  );

  it('keeps the user API login endpoint out of the resource list as a filterable thing', () => {
    const byKey = Object.fromEntries(
      buildResources(loadSpec('user')).map((draft) => [draft.key, draft])
    );
    expect(byKey['my/call_history']).toBeDefined();
    expect(byKey['my/call_history']?.singleton).toBe(false);
  });
});
