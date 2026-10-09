/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Small wrappers over the ivoz-ui api store actions that throw readable
 * errors instead of flashing them, so an import can report them per row.
 */

type ApiGet = (payload: any) => Promise<any>;
type ApiWrite = (payload: any) => Promise<any>;

export function apiErrorMessage(error: unknown): string {
  const response = error as {
    status?: number;
    data?: Record<string, unknown>;
  } | null;
  const data = response?.data ?? {};
  const detail =
    data.detail ?? data['hydra:description'] ?? data.message ?? data.title;

  if (typeof detail === 'string' && detail) {
    return detail;
  }

  return response?.status
    ? `Request failed (HTTP ${response.status})`
    : 'Request failed';
}

/** The API's largest allowed page (maximum_items_per_page in api_platform.yaml). */
const PAGE_SIZE = 10000;
/** Safety stop, in case a resource ignores paging and repeats pages. */
const MAX_PAGES = 50;

/**
 * Reads a whole collection. `_pagination=false` alone is not enough: the
 * API only honours it on resources with pagination_client_enabled (e.g.
 * countries, timezones), and other lists (transformation rule sets, proxy
 * trunks, routing tags...) would come back as their first page only. So
 * this asks for the largest page and keeps reading pages until one comes
 * back short or adds nothing new.
 */
export async function fetchAll<T>(
  apiGet: ApiGet,
  path: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const rows: T[] = [];
  const seen = new Set<unknown>();

  for (let page = 1; page <= MAX_PAGES; page++) {
    let batch: T[] = [];
    try {
      await apiGet({
        path,
        params: {
          ...params,
          _pagination: false,
          _itemsPerPage: PAGE_SIZE,
          _page: page,
        },
        handleErrors: false,
        successCallback: async (data: unknown) => {
          batch = Array.isArray(data) ? (data as T[]) : [];
        },
      });
    } catch (error) {
      throw new Error(apiErrorMessage(error));
    }

    let added = 0;
    for (const row of batch) {
      const id = (row as { id?: unknown })?.id;
      if (id !== undefined && seen.has(id)) {
        continue;
      }
      if (id !== undefined) {
        seen.add(id);
      }
      rows.push(row);
      added++;
    }

    if (batch.length < PAGE_SIZE || added === 0) {
      break;
    }
  }

  return rows;
}

export async function writeJson(
  write: ApiWrite,
  path: string,
  values: Record<string, unknown>,
  isPost: boolean
): Promise<void> {
  try {
    await write({
      path,
      values,
      ...(isPost ? { contentType: 'application/json' } : {}),
      handleErrors: false,
    });
  } catch (error) {
    throw new Error(apiErrorMessage(error));
  }
}

export async function fetchOne<T>(apiGet: ApiGet, path: string): Promise<T> {
  let row: T | null = null;
  try {
    await apiGet({
      path,
      params: {},
      handleErrors: false,
      successCallback: async (data: unknown) => {
        row = data as T;
      },
    });
  } catch (error) {
    throw new Error(apiErrorMessage(error));
  }
  if (row === null) {
    throw new Error(`Empty response for ${path}`);
  }

  return row;
}

/** Runs async jobs with a small concurrency limit, keeping order. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  job: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next++;
      results[index] = await job(items[index]);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );

  return results;
}
