import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import type { CollectionResult } from '../api/http';
import { interpolatePath, type ListParams } from '../api/params';
import type { ResourceManifest } from '../api/resourceManifest';
import { resolveEntity, type Translate } from '../descriptor/resolve';
import type {
  EntityDescriptor,
  RelationDescriptor,
  ResolvedEntity,
  Row,
} from '../descriptor/types';
import { useAcl, useApi, usePortal } from './PortalProvider';

/** Looks up the generated manifest for a descriptor, failing loudly if absent. */
export function useManifest(resource: string): ResourceManifest {
  const { config } = usePortal();
  const manifest = config.resources[resource];
  if (!manifest) {
    throw new Error(
      `No resource "${resource}" in the ${config.app} API manifest. ` +
        `Either the descriptor names the wrong resource, or the spec changed and codegen needs rerunning.`
    );
  }
  return manifest;
}

/** Merges a descriptor with the generated metadata and the caller's permissions. */
export function useResolvedEntity<TRow extends Row = Row>(
  descriptor: EntityDescriptor<TRow>,
  t?: Translate
): ResolvedEntity<TRow> {
  const { config } = usePortal();
  const acl = useAcl();
  const itemManifest = useManifest(descriptor.resource);
  const listManifest = useManifest(
    descriptor.listResource ?? descriptor.resource
  );

  return useMemo(() => {
    // Operations come from both halves when an entity is split across two
    // resources: list and create from one, read/update/delete from the other.
    const manifest = {
      ...itemManifest,
      collectionPath:
        listManifest.collectionPath ?? itemManifest.collectionPath,
      filters: listManifest.filters,
      orderBy: listManifest.orderBy,
      paginationClientEnabled: listManifest.paginationClientEnabled,
      operations: {
        ...itemManifest.operations,
        list: listManifest.operations.list,
        create: listManifest.operations.create,
      },
      schemas: { ...listManifest.schemas, ...itemManifest.schemas },
    };

    const writeName =
      manifest.schemas.write ?? manifest.schemas.create ?? descriptor.iden;
    const listName = manifest.schemas.list ?? writeName;

    return resolveEntity<TRow>({
      descriptor,
      manifest,
      writeFields: config.fieldsByDefinition[writeName] ?? {},
      listFields: config.fieldsByDefinition[listName] ?? {},
      acl,
      ...(t ? { t } : {}),
    });
  }, [
    descriptor,
    itemManifest,
    listManifest,
    config.fieldsByDefinition,
    acl,
    t,
  ]);
}

export interface EntityListOptions extends ListParams {
  enabled?: boolean;
}

/** Fetches a page of an entity's collection. */
export function useEntityList<TRow extends Row = Row>(
  descriptor: EntityDescriptor<TRow>,
  options: EntityListOptions = {}
): UseQueryResult<CollectionResult<TRow>> {
  const api = useApi();
  const { config } = usePortal();
  const manifest = useManifest(descriptor.listResource ?? descriptor.resource);
  const { enabled = true, ...params } = options;

  const path = manifest.collectionPath;

  return useQuery({
    queryKey: [
      config.app,
      descriptor.listResource ?? descriptor.resource,
      'list',
      params,
    ],
    queryFn: ({ signal }) => {
      if (!path) {
        throw new Error(
          `Resource "${descriptor.resource}" has no collection endpoint`
        );
      }
      return api.list<TRow>(path, params, signal);
    },
    enabled: enabled && Boolean(path) && manifest.operations.list,
    placeholderData: (previous) => previous,
  });
}

/** Fetches a single item. */
export function useEntityItem<TRow extends Row = Row>(
  descriptor: EntityDescriptor<TRow>,
  id: string | number | undefined
): UseQueryResult<TRow> {
  const api = useApi();
  const { config } = usePortal();
  const manifest = useManifest(descriptor.resource);

  return useQuery({
    queryKey: [config.app, descriptor.resource, 'item', id],
    queryFn: () => {
      if (!manifest.itemPath) {
        throw new Error(
          `Resource "${descriptor.resource}" has no item endpoint`
        );
      }
      return api.get<TRow>(
        interpolatePath(manifest.itemPath, { id: id as string | number })
      );
    },
    enabled: id !== undefined && Boolean(manifest.itemPath),
  });
}

/** Fetches a singleton such as `/my/dashboard` or `/my/status`. */
export function useSingleton<TData>(
  resource: string,
  options: { enabled?: boolean } = {}
): UseQueryResult<TData> {
  const api = useApi();
  const { config } = usePortal();
  const manifest = useManifest(resource);

  return useQuery({
    queryKey: [config.app, resource, 'singleton'],
    queryFn: () => api.get<TData>(manifest.collectionPath ?? `/${resource}`),
    enabled: options.enabled ?? true,
  });
}

export interface SaveVariables {
  id?: string | number;
  values: Row;
  /** Files by form-field name, for multipart resources. */
  files?: Record<string, Blob>;
}

/**
 * Creates or replaces an entity.
 *
 * Note there is no PATCH anywhere in these four APIs — an update is a full PUT
 * of the write schema, so callers must send the complete resource, not a delta.
 */
export function useEntitySave<TRow extends Row = Row>(
  descriptor: EntityDescriptor<TRow>
): UseMutationResult<TRow, Error, SaveVariables> {
  const api = useApi();
  const queryClient = useQueryClient();
  const { config } = usePortal();
  const manifest = useManifest(descriptor.resource);
  const createManifest = useManifest(
    descriptor.listResource ?? descriptor.resource
  );

  return useMutation({
    mutationFn: async ({ id, values, files }: SaveVariables) => {
      const isUpdate = id !== undefined;
      // Creates go to the collection resource, which may not be the same one
      // that owns the item path.
      const path = isUpdate
        ? interpolatePath(manifest.itemPath ?? '', { id })
        : (createManifest.collectionPath ?? '');

      if (!path) {
        throw new Error(`Resource "${descriptor.resource}" cannot be written`);
      }

      const target = isUpdate ? manifest : createManifest;
      const body =
        target.multipartForm && files && Object.keys(files).length > 0
          ? buildMultipartBody(target, values, files)
          : values;

      return isUpdate ? api.put<TRow>(path, body) : api.post<TRow>(path, body);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [config.app, descriptor.resource],
      });
      if (descriptor.listResource) {
        void queryClient.invalidateQueries({
          queryKey: [config.app, descriptor.listResource],
        });
      }
    },
  });
}

/**
 * Builds the form body a file-carrying resource expects: the JSON payload in a
 * single text field named after the entity, plus one field per binary.
 */
function buildMultipartBody(
  manifest: ResourceManifest,
  values: Row,
  files: Record<string, Blob>
): FormData {
  const form = new FormData();
  const { payloadField, fileFields } = manifest.multipartForm!;

  form.append(payloadField, JSON.stringify(values));

  for (const field of fileFields) {
    const file = files[field];
    if (file) form.append(field, file);
  }

  return form;
}

export function useEntityDelete<TRow extends Row = Row>(
  descriptor: EntityDescriptor<TRow>
): UseMutationResult<void, Error, string | number> {
  const api = useApi();
  const queryClient = useQueryClient();
  const { config } = usePortal();
  const manifest = useManifest(descriptor.resource);

  return useMutation({
    mutationFn: async (id: string | number) => {
      if (!manifest.itemPath) {
        throw new Error(`Resource "${descriptor.resource}" cannot be deleted`);
      }
      await api.delete(interpolatePath(manifest.itemPath, { id }));
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [config.app, descriptor.resource],
      });
      if (descriptor.listResource) {
        void queryClient.invalidateQueries({
          queryKey: [config.app, descriptor.listResource],
        });
      }
    },
  });
}

export interface RelationOption {
  value: string;
  label: string;
}

/**
 * Loads the options behind a foreign key.
 *
 * Collections here return foreign keys as bare integer ids, so a readable list
 * or form always needs a second request per relation. The old portal solved this
 * with `genericForeignKeyResolver` fetching 1000 rows per relation; this asks for
 * only the two columns it renders via `_properties[]`, which is dramatically
 * less data over the wire.
 */
export function useRelationOptions(
  relation: RelationDescriptor | undefined,
  options: { enabled?: boolean } = {}
): UseQueryResult<RelationOption[]> {
  const api = useApi();
  const { config } = usePortal();
  const manifest = relation ? config.resources[relation.resource] : undefined;

  const labelKey =
    typeof relation?.labelFrom === 'string' ? relation.labelFrom : undefined;

  return useQuery({
    queryKey: [
      config.app,
      relation?.resource,
      'options',
      relation?.filterBy ?? null,
    ],
    queryFn: async () => {
      if (!relation || !manifest?.collectionPath) return [];

      const params: ListParams = {
        itemsPerPage: 500,
        ...(labelKey ? { properties: ['id', labelKey] } : {}),
        filters: Object.entries(relation.filterBy ?? {}).map(
          ([field, value]) => ({
            field,
            operator: 'eq' as const,
            value,
          })
        ),
      };

      const result = await api.list<Row>(manifest.collectionPath, params);

      return result.items.map((row) => ({
        value: String(row.id ?? ''),
        label:
          typeof relation.labelFrom === 'function'
            ? relation.labelFrom(row)
            : String(row[relation.labelFrom] ?? row.id ?? ''),
      }));
    },
    enabled:
      (options.enabled ?? true) &&
      Boolean(relation && manifest?.collectionPath),
    staleTime: 5 * 60_000,
  });
}
