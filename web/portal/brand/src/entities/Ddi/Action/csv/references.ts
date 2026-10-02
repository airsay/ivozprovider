/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAll } from '../../../../components/CsvImport/api';
import { relationId } from '../../../Carrier/Action/csv/columns';
import { Resolved } from '../../../Carrier/Action/csv/references';
import {
  resolveRoutingTag,
  RoutingTagRef,
} from '../../../DdiProvider/Action/csv/references';
import { DdiRow, NO_ROUTING_TAG, TYPES } from './columns';

type ApiGet = (payload: any) => Promise<any>;

export interface CountryRef {
  id: number;
  code: string;
  countryCode: string | null;
  name?: Record<string, string | null> | null;
}
export interface CompanyRef {
  id: number;
  name: string;
  type: string;
}
export interface ProviderRef {
  id: number;
  name: string;
}

export interface DdiReferences {
  countries: CountryRef[];
  companies: CompanyRef[];
  providers: ProviderRef[];
  routingTags: RoutingTagRef[];
}

export async function loadDdiReferences(
  apiGet: ApiGet
): Promise<DdiReferences> {
  const [countries, companies, providers, routingTags] = await Promise.all([
    fetchAll<CountryRef>(apiGet, '/countries'),
    fetchAll<CompanyRef>(apiGet, '/companies'),
    fetchAll<ProviderRef>(apiGet, '/ddi_providers'),
    fetchAll<RoutingTagRef>(apiGet, '/routing_tags'),
  ]);

  return { countries, companies, providers, routingTags };
}

const same = (a: string | null | undefined, b: string): boolean =>
  (a ?? '').trim().toLowerCase() === b.trim().toLowerCase();

export function resolveCountry(
  value: string,
  countries: CountryRef[]
): CountryRef | string {
  const byCode = countries.find((c) => same(c.code, value));
  if (byCode) {
    return byCode;
  }
  const byName = countries.filter((c) => same(c.name?.en, value));
  if (byName.length === 1) {
    return byName[0];
  }

  return byName.length
    ? `Country "${value}" matches ${byName.length} countries; use the ISO code`
    : `Country "${value}" not found (use the ISO code, e.g. US)`;
}

/**
 * The number as stored: digits only, without the country code. A number
 * written in E.164 (+13603894648) has the country's code removed; one with
 * another code is an error rather than a guess.
 */
export function nationalNumber(
  value: string,
  country: CountryRef
): { ddi: string } | { error: string } {
  const compact = value.replace(/[\s\-().]/g, '');
  if (compact.startsWith('+') || compact.startsWith('00')) {
    const international = `+${compact.replace(/^(\+|00)/, '')}`;
    const prefix = country.countryCode ?? '';
    if (!prefix || !international.startsWith(prefix)) {
      return {
        error: `${value} does not start with ${country.code}'s country code ${prefix}`,
      };
    }
    const ddi = international.slice(prefix.length);

    return /^\d+$/.test(ddi) ? { ddi } : { error: `${value} is not a number` };
  }

  return /^\d+$/.test(compact)
    ? { ddi: compact }
    : { error: `${value} is not a number (digits only)` };
}

export function resolveDdiRelations(
  record: Record<string, string>,
  refs: DdiReferences
): Record<string, Resolved> {
  const result: Record<string, Resolved> = {};

  if (record.company) {
    const found = refs.companies.find((c) => same(c.name, record.company));
    result.company = !found
      ? { error: `Client "${record.company}" not found` }
      : found.type === 'wholesale'
      ? { error: 'Wholesale clients cannot have DDIs' }
      : { id: found.id };
  } else {
    result.company = { id: null };
  }

  const type = TYPES[(record.type || 'inout').toLowerCase()];
  if (record.ddiProvider && type === 'inout') {
    const found = refs.providers.find((p) => same(p.name, record.ddiProvider));
    result.ddiProvider = found
      ? { id: found.id }
      : { error: `DDI provider "${record.ddiProvider}" not found` };
  } else {
    result.ddiProvider = { id: null };
  }

  result.routingTag =
    record.routingTag &&
    !NO_ROUTING_TAG.includes(record.routingTag.toLowerCase())
      ? resolveRoutingTag(record.routingTag, refs.routingTags)
      : { id: null };

  return result;
}

export const countryKey = (countryId: number, ddi: string): string =>
  `${countryId}:${ddi}`;

export const rowKey = (row: DdiRow): string =>
  countryKey(relationId(row.country) ?? -1, row.ddi);
