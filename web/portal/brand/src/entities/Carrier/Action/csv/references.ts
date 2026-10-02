/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAll } from '../../../../components/CsvImport/api';

type ApiGet = (payload: any) => Promise<any>;

interface Named {
  id: number;
}

export interface CarrierReferences {
  currencies: Array<Named & { iden: string }>;
  proxyTrunks: Array<Named & { ip: string; name?: string | null }>;
  mediaRelaySets: Array<Named & { name: string }>;
  ruleSets: Array<Named & { name?: Record<string, string | null> | null }>;
}

export type Resolved = { id: number | null } | { error: string };

export async function loadCarrierReferences(
  apiGet: ApiGet
): Promise<CarrierReferences> {
  const [currencies, proxyTrunks, mediaRelaySets, ruleSets] = await Promise.all(
    [
      fetchAll<CarrierReferences['currencies'][number]>(apiGet, '/currencies'),
      fetchAll<CarrierReferences['proxyTrunks'][number]>(
        apiGet,
        '/proxy_trunks'
      ),
      fetchAll<CarrierReferences['mediaRelaySets'][number]>(
        apiGet,
        '/media_relay_sets'
      ),
      fetchAll<CarrierReferences['ruleSets'][number]>(
        apiGet,
        '/transformation_rule_sets'
      ),
    ]
  );

  return { currencies, proxyTrunks, mediaRelaySets, ruleSets };
}

const same = (a: string | null | undefined, b: string): boolean =>
  (a ?? '').trim().toLowerCase() === b.trim().toLowerCase();

export const englishName = (
  set: CarrierReferences['ruleSets'][number]
): string => set.name?.en ?? '';

export function resolveCarrierRelations(
  record: Record<string, string>,
  refs: CarrierReferences
): Record<string, Resolved> {
  const result: Record<string, Resolved> = {};

  // Local socket: required by the domain ("Local socket cannot be empty").
  // Like the portal form, an empty cell uses the only socket if there is one.
  if (record.proxyTrunk) {
    const found = refs.proxyTrunks.find((t) => same(t.ip, record.proxyTrunk));
    result.proxyTrunk = found
      ? { id: found.id }
      : { error: `Local socket with IP ${record.proxyTrunk} not found` };
  } else if (refs.proxyTrunks.length === 1) {
    result.proxyTrunk = { id: refs.proxyTrunks[0].id };
  } else {
    result.proxyTrunk = { error: 'Local socket IP is required' };
  }

  if (record.mediaRelaySet) {
    const found = refs.mediaRelaySets.find((m) =>
      same(m.name, record.mediaRelaySet)
    );
    result.mediaRelaySet = found
      ? { id: found.id }
      : { error: `Media relay set "${record.mediaRelaySet}" not found` };
  } else {
    result.mediaRelaySet = { id: null };
  }

  const ruleSets = refs.ruleSets.filter((set) =>
    same(englishName(set), record.transformationRuleSet ?? '')
  );
  result.transformationRuleSet =
    ruleSets.length === 1
      ? { id: ruleSets[0].id }
      : ruleSets.length === 0
      ? {
          error: `Number transformation "${record.transformationRuleSet}" not found (English name)`,
        }
      : {
          error: `Number transformation "${record.transformationRuleSet}" matches ${ruleSets.length} sets; rename one so the English name is unique`,
        };

  if (record.currency) {
    const found = refs.currencies.find((c) => same(c.iden, record.currency));
    result.currency = found
      ? { id: found.id }
      : { error: `Currency ${record.currency} not found` };
  } else {
    result.currency = { id: null };
  }

  return result;
}

export const firstError = (
  resolved: Record<string, Resolved>
): string | null => {
  const errors = Object.values(resolved)
    .filter((value): value is { error: string } => 'error' in value)
    .map((value) => value.error);

  return errors.length ? errors.join('; ') : null;
};

export const idOf = (resolved: Resolved): number | null =>
  'id' in resolved ? resolved.id : null;
