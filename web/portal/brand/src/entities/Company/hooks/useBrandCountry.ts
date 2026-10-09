import { useFormikType } from '@irontec/ivoz-ui';
import { useEffect } from 'react';
import { useStoreActions } from 'store';

import { fetchAll, fetchOne } from '../../../components/CsvImport/api';
import {
  brandCountry,
  BrandDefaults,
  BrandDetail,
  CountryRef,
  e164RuleSet,
  refId,
  RuleSetRef,
} from './brandCountry';

interface UseBrandCountryProps {
  create?: boolean;
  formik: useFormikType;
}

/**
 * On a new client, pre-selects the reseller's values so the form shows them
 * instead of "Default …":
 *  - Country code: the reseller's country (see brandCountry.ts);
 *  - Language, Default timezone, Currency: the brand's own values;
 *  - Numeric transformation: E.164.
 * A field the admin already changed is left alone, and any failure leaves
 * the form as it was (the "Default …" values still work: the server fills
 * language and timezone from the brand).
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
      const [brand, countries, ruleSets] = await Promise.all([
        fetchOne<BrandDetail & BrandDefaults>(
          apiGet,
          `/brands/${brands[0].id}`
        ),
        fetchAll<CountryRef>(apiGet, '/countries'),
        fetchAll<RuleSetRef>(apiGet, '/transformation_rule_sets'),
      ]);
      if (cancelled) {
        return;
      }

      const wanted: Record<string, number | null> = {
        country: brandCountry(brand, countries),
        language: refId(brand.language),
        defaultTimezone: refId(brand.defaultTimezone?.id),
        currency: refId(brand.currency),
        transformationRuleSet: e164RuleSet(ruleSets),
      };

      for (const [field, value] of Object.entries(wanted)) {
        if (value === null) {
          continue;
        }
        if (formik.values[field] !== formik.initialValues[field]) {
          continue;
        }
        formik.setFieldValue(field, value);
      }
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
