/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAll } from '../../../../components/CsvImport/api';
import {
  CarrierReferences,
  loadCarrierReferences,
  resolveCarrierRelations,
  Resolved,
} from '../../../Carrier/Action/csv/references';

type ApiGet = (payload: any) => Promise<any>;

export interface RoutingTagRef {
  id: number;
  name: string;
  tag: string;
}

export interface DdiProviderReferences extends CarrierReferences {
  routingTags: RoutingTagRef[];
}

export async function loadDdiProviderReferences(
  apiGet: ApiGet
): Promise<DdiProviderReferences> {
  const [base, routingTags] = await Promise.all([
    loadCarrierReferences(apiGet),
    fetchAll<RoutingTagRef>(apiGet, '/routing_tags'),
  ]);

  return { ...base, routingTags };
}

const same = (a: string | null | undefined, b: string): boolean =>
  (a ?? '').trim().toLowerCase() === b.trim().toLowerCase();

export function resolveRoutingTag(
  value: string | undefined,
  tags: RoutingTagRef[]
): Resolved {
  if (!value) {
    return { id: null };
  }
  let found = tags.filter((t) => same(t.name, value));
  if (found.length === 0) {
    found = tags.filter((t) => same(t.tag, value));
  }
  if (found.length === 1) {
    return { id: found[0].id };
  }

  return found.length === 0
    ? { error: `Routing tag "${value}" not found` }
    : {
        error: `Routing tag "${value}" matches ${found.length} tags; use the tag value instead`,
      };
}

export function resolveDdiProviderRelations(
  record: Record<string, string>,
  refs: DdiProviderReferences
): Record<string, Resolved> {
  // Same socket / media relay set / transformation rules as carriers; a DDI
  // provider has no currency, so that cell is never read.
  const resolved = resolveCarrierRelations({ ...record, currency: '' }, refs);
  delete resolved.currency;
  resolved.routingTag = resolveRoutingTag(record.routingTag, refs.routingTags);

  return resolved;
}
