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

export async function fetchAll<T>(
  apiGet: ApiGet,
  path: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  let rows: T[] = [];
  try {
    await apiGet({
      path,
      params: { ...params, _pagination: false },
      handleErrors: false,
      successCallback: async (data: unknown) => {
        rows = Array.isArray(data) ? (data as T[]) : [];
      },
    });
  } catch (error) {
    throw new Error(apiErrorMessage(error));
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
