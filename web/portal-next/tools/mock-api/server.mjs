#!/usr/bin/env node
/**
 * A mock of the IvozProvider user API, for developing the new portals without
 * the backend containers.
 *
 * It reproduces the conventions that actually matter to the client:
 *
 *   - form-encoded login answering `{ token, refresh_token }`
 *   - `Authorization: Bearer` on everything except `/my/theme` and the auth paths
 *   - 401 with `{ code, message }` so the refresh path gets exercised
 *   - collections as bare JSON arrays with `X-Total-Items` / `X-Total-Pages`
 *   - api-platform query syntax: `field[partial]`, `_order[x]`, `_page`,
 *     `_itemsPerPage`, `_pagination=false`, `_properties[]`
 *   - `text/csv` exports when the Accept header asks for them
 *
 * It is a development aid, not a spec: when behaviour here and the real API
 * disagree, the real API is right.
 */

import { createServer } from 'node:http';

import * as fixtures from './data.mjs';

const PORT = Number(process.env.PORT ?? 8099);
const PREFIX = '/api/user';

/** Tokens are opaque strings here; we only check that one was presented. */
const ACCESS_TOKEN = 'mock-access-token';
const REFRESH_TOKEN = 'mock-refresh-token';
const CREDENTIALS = {
  email: 'alex.ibarra@northwind.example.net',
  password: 'demo',
};

let forwardSettings = structuredClone(fixtures.callForwardSettings);
let nextForwardId = 100;

const server = createServer(async (request, response) => {
  const url = new URL(
    request.url ?? '/',
    `http://${request.headers.host ?? 'localhost'}`
  );
  const path = url.pathname.startsWith(PREFIX)
    ? url.pathname.slice(PREFIX.length)
    : url.pathname;

  cors(response);
  if (request.method === 'OPTIONS') return end(response, 204);

  try {
    await route({
      request,
      response,
      url,
      path,
      method: request.method ?? 'GET',
    });
  } catch (error) {
    process.stderr.write(`mock-api error: ${String(error)}\n`);
    json(response, 500, { detail: String(error) });
  }
});

async function route(ctx) {
  const { path, method, request, response, url } = ctx;

  // ---- anonymous -----------------------------------------------------------

  if (path === '/my/theme' && method === 'GET')
    return json(response, 200, fixtures.theme);

  if (path === '/user_login' && method === 'POST') {
    const body = await formBody(request);
    if (
      body.get('email') !== CREDENTIALS.email ||
      body.get('password') !== CREDENTIALS.password
    ) {
      return json(response, 401, {
        code: 401,
        message: 'Invalid credentials.',
      });
    }
    return json(response, 200, {
      token: ACCESS_TOKEN,
      refresh_token: REFRESH_TOKEN,
    });
  }

  if (path === '/token/refresh' && method === 'POST') {
    const body = await formBody(request);
    if (body.get('refresh_token') !== REFRESH_TOKEN) {
      return json(response, 401, {
        code: 401,
        message: 'Invalid refresh token',
      });
    }
    return json(response, 200, { token: ACCESS_TOKEN });
  }

  // ---- everything below needs a token --------------------------------------

  const authorization = request.headers.authorization ?? '';
  if (!authorization.startsWith('Bearer ')) {
    return json(response, 401, { code: 401, message: 'JWT Token not found' });
  }

  if (path === '/my/status') return json(response, 200, fixtures.status);
  if (path === '/my/dashboard') return json(response, 200, fixtures.dashboard);
  if (path === '/my/call_stats') return json(response, 200, fixtures.callStats);
  if (path === '/my/last_month_calls')
    return json(response, 200, fixtures.lastMonthCalls);

  if (path === '/my/call_history' && method === 'GET') {
    const filtered = applyFilters(fixtures.callHistory, url);
    if ((request.headers.accept ?? '').includes('text/csv')) {
      return csv(response, filtered, [
        'startTime',
        'direction',
        'caller',
        'callee',
        'duration',
        'disposition',
      ]);
    }
    return collection(response, filtered, url);
  }

  if (path === '/my/call_forward_settings') {
    if (method === 'GET') return collection(response, forwardSettings, url);
    if (method === 'POST') {
      const created = { ...(await jsonBody(request)), id: nextForwardId++ };
      forwardSettings = [...forwardSettings, created];
      return json(response, 201, created);
    }
  }

  const forwardMatch = /^\/call_forward_settings\/(\d+)$/.exec(path);
  if (forwardMatch) {
    const id = Number(forwardMatch[1]);
    const index = forwardSettings.findIndex((item) => item.id === id);
    if (index === -1) return json(response, 404, { detail: 'Not Found' });

    if (method === 'GET') return json(response, 200, forwardSettings[index]);
    if (method === 'PUT') {
      // A real PUT replaces the resource; the id is carried by the path.
      const updated = { ...(await jsonBody(request)), id };
      forwardSettings[index] = updated;
      return json(response, 200, updated);
    }
    if (method === 'DELETE') {
      forwardSettings.splice(index, 1);
      return end(response, 204);
    }
  }

  if (path === '/voicemail_messages')
    return collection(response, fixtures.voicemailMessages, url);
  if (path === '/recordings')
    return collection(response, fixtures.recordings, url);
  if (path === '/faxes_in_outs')
    return collection(response, fixtures.faxes, url);
  if (path === '/faxes') return collection(response, fixtures.faxBoxes, url);
  if (path === '/countries')
    return collection(response, fixtures.countries, url);
  if (path === '/my/company_extensions') {
    return collection(response, fixtures.companyExtensions, url);
  }
  if (path === '/my/company_voicemails') {
    return collection(response, fixtures.companyVoicemails, url);
  }

  return json(response, 404, { detail: `No mock route for ${method} ${path}` });
}

// ---------------------------------------------------------------- helpers

/** Applies the subset of api-platform filter syntax the portals actually send. */
function applyFilters(rows, url) {
  let result = [...rows];

  for (const [rawName, value] of url.searchParams) {
    if (rawName.startsWith('_') || rawName.startsWith('exists[')) continue;

    const scoped = /^(.+)\[(.+)\]$/.exec(rawName);
    const field = scoped ? scoped[1] : rawName;
    const operator = scoped ? scoped[2] : 'eq';

    result = result.filter((row) => {
      const actual = row[field];
      if (actual === null || actual === undefined) return false;
      const text = String(actual).toLowerCase();
      const needle = value.toLowerCase();

      switch (operator) {
        // api-platform's DateFilter: `after`/`before` are inclusive.
        case 'after':
          return new Date(actual) >= new Date(value);
        case 'strictly_after':
          return new Date(actual) > new Date(value);
        case 'before':
          return new Date(actual) <= new Date(value);
        case 'strictly_before':
          return new Date(actual) < new Date(value);
        case 'partial':
          return text.includes(needle);
        case 'start':
          return text.startsWith(needle);
        case 'end':
          return text.endsWith(needle);
        case 'neq':
          return text !== needle;
        default:
          return text === needle;
      }
    });
  }

  const order = [...url.searchParams].find(([name]) =>
    name.startsWith('_order[')
  );
  if (order) {
    const field = /^_order\[(.+)\]$/.exec(order[0])?.[1];
    const descending = order[1].toUpperCase() === 'DESC';
    if (field) {
      result.sort((a, b) => {
        const left = a[field];
        const right = b[field];
        if (left === right) return 0;
        const comparison = left > right ? 1 : -1;
        return descending ? -comparison : comparison;
      });
    }
  }

  return result;
}

function collection(response, rows, url) {
  const filtered = applyFilters(rows, url);
  const paginate = url.searchParams.get('_pagination') !== 'false';
  const perPage = Number(url.searchParams.get('_itemsPerPage') ?? 20);
  const page = Number(url.searchParams.get('_page') ?? 1);

  const slice = paginate
    ? filtered.slice((page - 1) * perPage, page * perPage)
    : filtered;

  // `_properties[]` is a sparse fieldset: return only what was asked for.
  const properties = url.searchParams.getAll('_properties[]');
  const projected =
    properties.length > 0
      ? slice.map((row) =>
          Object.fromEntries(
            Object.entries(row).filter(
              ([key]) => properties.includes(key) || key === 'id'
            )
          )
        )
      : slice;

  response.setHeader('X-Total-Items', String(filtered.length));
  response.setHeader(
    'X-Total-Pages',
    String(paginate ? Math.max(Math.ceil(filtered.length / perPage), 1) : 1)
  );
  json(response, 200, projected);
}

function csv(response, rows, columns) {
  const escape = (value) => {
    const text = value === null || value === undefined ? '' : String(value);
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };

  const body = [
    columns.join(','),
    ...rows.map((row) =>
      columns.map((column) => escape(row[column])).join(',')
    ),
  ].join('\n');

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/csv; charset=utf-8');
  response.setHeader(
    'Content-Disposition',
    'attachment; filename="call-history.csv"'
  );
  response.end(body);
}

function cors(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, Accept'
  );
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.setHeader(
    'Access-Control-Expose-Headers',
    'X-Total-Items, X-Total-Pages, Content-Disposition'
  );
}

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function end(response, status) {
  response.statusCode = status;
  response.end();
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

async function formBody(request) {
  return new URLSearchParams(await readBody(request));
}

async function jsonBody(request) {
  const raw = await readBody(request);
  return raw ? JSON.parse(raw) : {};
}

server.listen(PORT, () => {
  process.stdout.write(
    `mock user API listening on http://127.0.0.1:${PORT}${PREFIX}\n`
  );
  process.stdout.write(
    `sign in with ${CREDENTIALS.email} / ${CREDENTIALS.password}\n`
  );
});
