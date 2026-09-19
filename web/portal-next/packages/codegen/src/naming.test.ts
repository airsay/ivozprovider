import { describe, expect, it } from 'vitest';

import {
  baseName,
  buildNameRegistry,
  pascalCase,
  propertyKey,
  variantName,
} from './naming';

describe('pascalCase', () => {
  it('folds the three separators the specs use', () => {
    expect(pascalCase('Ddi-collection')).toBe('DdiCollection');
    expect(pascalCase('Locution_OriginalFile')).toBe('LocutionOriginalFile');
    expect(pascalCase('Ddi')).toBe('Ddi');
  });
});

describe('baseName / variantName', () => {
  it('splits a serialization variant from its entity', () => {
    expect(baseName('Ddi-detailed')).toBe('Ddi');
    expect(variantName('Ddi-detailed')).toBe('detailed');
    expect(variantName('Ddi')).toBe('');
  });

  it('leaves embeddable names intact — the underscore is part of the name', () => {
    expect(baseName('Locution_OriginalFile')).toBe('Locution_OriginalFile');
  });
});

describe('buildNameRegistry', () => {
  it('keeps the obvious spelling for a real resource and disambiguates the variant', () => {
    // Both of these exist in the brand spec and both want `CarrierServerStatus`.
    const registry = buildNameRegistry([
      'CarrierServer-status',
      'CarrierServerStatus',
    ]);

    expect(registry.get('CarrierServerStatus')).toBe('CarrierServerStatus');
    expect(registry.get('CarrierServer-status')).toBe('CarrierServer_Status');
  });

  it('is injective', () => {
    const names = [
      'Ddi',
      'Ddi-collection',
      'Ddi-detailed',
      'DdiCollection',
      'CarrierServer-status',
      'CarrierServerStatus',
    ];
    const registry = buildNameRegistry(names);
    const identifiers = [...registry.values()];

    expect(new Set(identifiers).size).toBe(names.length);
  });

  it('is stable regardless of input order', () => {
    const a = buildNameRegistry([
      'CarrierServerStatus',
      'CarrierServer-status',
    ]);
    const b = buildNameRegistry([
      'CarrierServer-status',
      'CarrierServerStatus',
    ]);

    expect([...a.entries()].sort()).toEqual([...b.entries()].sort());
  });
});

describe('propertyKey', () => {
  it('quotes keys that are not valid identifiers', () => {
    expect(propertyKey('routeType')).toBe('routeType');
    expect(propertyKey('Ddi-collection')).toBe('"Ddi-collection"');
    expect(propertyKey('originalFile.baseName')).toBe(
      '"originalFile.baseName"'
    );
  });
});
