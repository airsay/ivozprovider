import { describe, expect, it } from 'vitest';

import { buildListSearchParams, interpolatePath } from './params';

describe('buildListSearchParams', () => {
  it('spells each operator the way api-platform expects', () => {
    const search = buildListSearchParams({
      filters: [
        { field: 'description', operator: 'partial', value: 'sales' },
        { field: 'routeType', operator: 'eq', value: 'ivr' },
        { field: 'country', operator: 'in', value: [68, 69] },
        { field: 'lastname', operator: 'exists', value: true },
        { field: 'id', operator: 'neq', value: 5 },
      ],
    });

    expect(search.getAll('description[partial]')).toEqual(['sales']);
    expect(search.getAll('routeType')).toEqual(['ivr']);
    expect(search.getAll('country[]')).toEqual(['68', '69']);
    expect(search.getAll('exists[lastname]')).toEqual(['true']);
    expect(search.getAll('id[neq]')).toEqual(['5']);
  });

  it('drops empty criteria rather than sending blank filters', () => {
    const search = buildListSearchParams({
      filters: [
        { field: 'description', operator: 'partial', value: '' },
        { field: 'user', operator: 'eq', value: null },
      ],
    });

    expect([...search.keys()]).toEqual([]);
  });

  it('keeps false as a real value', () => {
    const search = buildListSearchParams({
      filters: [{ field: 'active', operator: 'eq', value: false }],
    });

    expect(search.get('active')).toBe('false');
  });

  it('builds sorting, paging and sparse fieldsets', () => {
    const search = buildListSearchParams({
      page: 3,
      itemsPerPage: 50,
      sort: [{ field: 'startTime', direction: 'DESC' }],
      properties: ['id', 'ddi'],
      timezone: 'Europe/Madrid',
    });

    expect(search.get('_page')).toBe('3');
    expect(search.get('_itemsPerPage')).toBe('50');
    expect(search.get('_order[startTime]')).toBe('DESC');
    expect(search.getAll('_properties[]')).toEqual(['id', 'ddi']);
    expect(search.get('_timezone')).toBe('Europe/Madrid');
  });

  it('switches to _pagination=false for full exports', () => {
    const search = buildListSearchParams({
      paginate: false,
      page: 2,
      itemsPerPage: 10,
    });

    expect(search.get('_pagination')).toBe('false');
    expect(search.has('_page')).toBe(false);
    expect(search.has('_itemsPerPage')).toBe(false);
  });
});

describe('interpolatePath', () => {
  it('substitutes and encodes placeholders', () => {
    expect(interpolatePath('/ddis/{id}/file', { id: 12 })).toBe(
      '/ddis/12/file'
    );
    expect(
      interpolatePath('/my/logo/{id}/{name}', { id: 1, name: 'a b.png' })
    ).toBe('/my/logo/1/a%20b.png');
  });

  it('refuses to build a path with a missing parameter', () => {
    expect(() => interpolatePath('/ddis/{id}', {})).toThrow(
      /Missing path parameter "id"/
    );
  });
});
