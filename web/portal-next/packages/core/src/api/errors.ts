/**
 * Error normalisation for the IvozProvider REST APIs.
 *
 * The APIs speak three different error dialects and none of them is RFC 7807
 * `violations`:
 *
 *   `application/problem+json`  -> `{ "detail": "Application Server Sets cannot be empty" }`
 *   auth failures               -> `{ "code": 401, "message": "Invalid credentials." }`
 *   everything else             -> an empty body with a status code
 *
 * Domain rule violations can arrive as 403 rather than 422, so the status alone
 * is not enough to tell "you may not" from "that input is wrong".
 */

export class ApiError extends Error {
  readonly status: number;
  readonly url: string;
  readonly body: unknown;

  constructor(status: number, url: string, message: string, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
    this.body = body;
  }

  /** The caller is not authenticated — the token is missing, expired or rejected. */
  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  /**
   * Either a permission failure or a rejected domain rule: this API returns
   * both as 403, distinguishable only by whether a `detail` came with it.
   */
  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  /** Input the API refused to accept. */
  get isValidation(): boolean {
    return this.status === 400 || this.status === 422;
  }
}

interface ProblemBody {
  detail?: unknown;
  message?: unknown;
  code?: unknown;
  title?: unknown;
}

export function messageFromBody(body: unknown, fallback: string): string {
  if (typeof body === 'string' && body.trim() !== '') return body;

  if (body && typeof body === 'object') {
    const problem = body as ProblemBody;
    if (typeof problem.detail === 'string' && problem.detail !== '')
      return problem.detail;
    if (typeof problem.message === 'string' && problem.message !== '')
      return problem.message;
    if (typeof problem.title === 'string' && problem.title !== '')
      return problem.title;
  }

  return fallback;
}

export async function apiErrorFromResponse(
  response: Response
): Promise<ApiError> {
  let body: unknown = null;
  const contentType = response.headers.get('content-type') ?? '';

  try {
    body = contentType.includes('json')
      ? await response.json()
      : await response.text();
  } catch {
    body = null;
  }

  const message = messageFromBody(
    body,
    response.statusText || `HTTP ${response.status}`
  );
  return new ApiError(response.status, response.url, message, body);
}
