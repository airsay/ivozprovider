import { describe, expect, it } from 'vitest';

import { tenantBrand } from './theme';

const options = {
  defaultProductName: 'Tervian One',
  fallbackProductName: 'Tervian One',
  apiBaseUrl: '/api/user',
};

describe('tenantBrand', () => {
  it('treats the stock logo URL and default name as Tervian One', () => {
    // What WebThemeFactory returns for a WebPortal with no uploaded logo.
    expect(
      tenantBrand(
        {
          logo: 'https://pbx.example.net/user/logo.svg',
          productName: 'Tervian One',
        },
        options
      )
    ).toEqual({ custom: false, productName: 'Tervian One', logoUrl: null });
  });

  it('uses an uploaded logo as is when the URL is absolute', () => {
    const logo = 'https://pbx.example.net/api/user/my/logo/7/acme.svg';
    expect(tenantBrand({ logo, productName: 'Tervian One' }, options)).toEqual({
      custom: true,
      productName: 'Tervian One',
      logoUrl: logo,
    });
  });

  it('prefixes a relative uploaded logo with the API base', () => {
    expect(tenantBrand({ logo: '/my/logo/7/acme.svg' }, options).logoUrl).toBe(
      '/api/user/my/logo/7/acme.svg'
    );
  });

  it('counts a custom product name without a logo as a tenant brand', () => {
    expect(
      tenantBrand(
        { logo: 'https://pbx.example.net/user/logo.svg', productName: 'Acme' },
        options
      )
    ).toEqual({ custom: true, productName: 'Acme', logoUrl: null });
  });

  it('falls back when there is no theme', () => {
    expect(tenantBrand(null, options)).toEqual({
      custom: false,
      productName: 'Tervian One',
      logoUrl: null,
    });
  });
});
