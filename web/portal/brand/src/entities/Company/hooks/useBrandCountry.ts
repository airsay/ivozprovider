import { useFormikType } from '@irontec/ivoz-ui';
import { useEffect } from 'react';
import { useStoreActions } from 'store';

import { fetchAll, fetchOne } from '../../../components/CsvImport/api';
import { brandCountry, BrandDetail, CountryRef } from './brandCountry';

interface UseBrandCountryProps {
  create?: boolean;
  formik: useFormikType;
}

/**
 * On a new client, pre-selects the reseller's country as the client's
 * Country code (see brandCountry.ts for where it comes from). It only
 * replaces the form's built-in default; a value the admin already picked is
 * left alone, and any failure leaves the form as it was.
 */
const useBrandCountry = (props: UseBrandCountryProps): void => {
  const { create, formik } = props;
  const apiGet = useStoreActions((actions) => actions.api.get);

  useEffect(() => {
    if (!create) {
      return;
    }
    let cancelled = false;

    const run = async (): Promise<void> => {
      // A brand admin's /brands list holds only their own brand.
      const brands = await fetchAll<{ id: number }>(apiGet, '/brands');
      if (brands.length !== 1) {
        return;
      }
      const [brand, countries] = await Promise.all([
        fetchOne<BrandDetail>(apiGet, `/brands/${brands[0].id}`),
        fetchAll<CountryRef>(apiGet, '/countries'),
      ]);
      const countryId = brandCountry(brand, countries);
      if (cancelled || countryId === null) {
        return;
      }
      if (formik.values.country !== formik.initialValues.country) {
        return;
      }
      formik.setFieldValue('country', countryId);
    };

    run().catch(() => undefined);

    return () => {
      cancelled = true;
    };
    // Run once per new-client form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create, apiGet]);
};

export default useBrandCountry;
