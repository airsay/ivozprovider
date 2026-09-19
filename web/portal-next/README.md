# web/portal-next

The replacement frontend for IvozProvider / Axion. A shared core plus one app
per admin level, talking to the existing REST APIs directly.

It runs **alongside** `web/portal/` — the new apps are served at `/<app>-next`
until cutover — so both can be pointed at the same backend and compared screen
by screen.

## Status

| App | State |
| --- | --- |
| `user` | Built: dashboard, call history, call forwarding, voicemail, recordings, faxes |
| `client` | Not started |
| `brand` | Not started |
| `platform` | Not started |

The shared core is complete and app-agnostic; the remaining three apps are
descriptors, navigation and their own bespoke screens.

## Layout

```
packages/codegen    Spec -> TypeScript types, field metadata, resource manifests.
                    Also the translation migration.
packages/core       Everything the apps share: HTTP + auth, permissions, the
                    descriptor model, the CRUD engine, the design system, the shell.
apps/<app>          Entity descriptors, navigation, bespoke screens. Thin.
tools/mock-api      A mock of the user API for development without the backend.
```

## How it differs from `web/portal`

**The API spec is a build-time input, not a runtime download.** The old portals
fetch `/docs.json` on boot — 0.3–1.9 MB — parse it in the browser, and block
behind *"Loading API definition..."* before rendering anything. Here
`yarn codegen` turns the committed `web/rest/<app>/public/apiSpec.json` into
TypeScript types, field metadata and resource manifests. Forms validate against
the spec's own constraints with no round trip, and the types are real.

**No `@irontec/ivoz-ui`.** Routing, data fetching, tables, forms, permissions
and the shell are ours. The framework fork (`airsay/ivoz-ui#axion-branding-dist`)
is not a dependency of anything here.

**Entity descriptors are kept, not thrown away.** The metadata in the old
`src/entities/<Entity>/` — labels, enum captions, conditional field visibility,
ACL idens — is the one part of the old frontend worth carrying across, because
the spec does not contain it. `web/portal/client/src/entities/Ddi/Ddi.tsx` is
the canonical example: the spec knows `routeType` is a 25-character string with
eleven allowed values; only the descriptor knows it is called "Route type", that
`huntGroup` reads "Hunt Group", and that choosing it reveals one field and hides
ten others.

## Commands

All from this directory.

```bash
yarn install
yarn codegen                 # regenerate API types/metadata from the specs
bin/test-codegen             # fail if the generated artefacts have drifted
bin/test-typecheck           # strict TypeScript across packages and apps
bin/test-unit                # vitest
yarn workspace @axion/portal-codegen migrate user   # rebuild translations
```

Per app:

```bash
apps/user/bin/test-lint
apps/user/bin/test-i18n
apps/user/bin/test-build
```

## Running it

Against a real backend:

```bash
cd apps/user && BACKEND_URL=https://your-host/ yarn dev
```

Against the bundled mock, which needs no Docker:

```bash
node tools/mock-api/server.mjs                       # terminal 1, port 8099
cd apps/user && BACKEND_URL=http://127.0.0.1:8099 yarn dev   # terminal 2, port 3100
```

Then open <http://127.0.0.1:3100/user-next/> and sign in with
`alex.ibarra@northwind.example.net` / `demo`.

## Adding an app

1. Copy `apps/user` and change `src/config.ts`: `app`, `basePath`, `apiBaseUrl`,
   `loginPath`, `storagePrefix`. The three admin APIs use `/admin_login` with a
   `username` field; only the user API uses `/user_login` with `email`.
2. Write entity descriptors in `src/entities/`. Each names a `resource` key from
   the generated manifest for that API.
3. Declare the navigation in `src/config.ts`. Items naming an `entity` inherit
   its ACL automatically.
4. Hand-build the screens that deserve it; let the CRUD engine render the rest.
5. Add the app to `debian/rules`, `debian/ivozprovider-web-portals.install`, the
   Apache vhost and the `web-next` stage in the `Jenkinsfile`.

## API conventions worth knowing

Learned from the specs and the behat features; the generated manifests encode
most of it.

- **Collections are bare JSON arrays.** No Hydra, no envelope. Totals arrive as
  `X-Total-Items` and `X-Total-Pages`.
- **No `PATCH` anywhere.** Every update is a full `PUT` of the write schema, so
  a field left out of the payload is cleared.
- **Unset values come back as explicit `null`,** not omitted — including enums
  and foreign keys.
- **Filters** are `field[exact|partial|start|end|neq]`, `exists[field]`, and
  `field[]` repeated for multi-value. Which operators exist per field is decided
  by the backend at spec-export time, so the manifest is the authority.
- **Sparse fieldsets** via `_properties[]`; the list screens use them so a table
  only fetches the columns it renders.
- **CSV export** is the same collection endpoint with `_pagination=false` and
  `Accept: text/csv`.
- **File writes are multipart**, with the JSON payload in a text field named
  after the entity and one field per binary (`locution` + `OriginalFile`).
- **Errors** are `{detail}` or `{code, message}`. There is no RFC-7807
  `violations` array. A rejected domain rule can arrive as 403, not 422.
- **Permissions** come from `/my/profile`: `acls[]` keyed by public-entity iden,
  but only meaningful when `restricted` is true — an unrestricted admin gets
  `acls: []` and may do everything.

## Not done yet

- The `client`, `brand` and `platform` apps.
- The codemod that converts the remaining ~200 old entity definitions into
  descriptors. The descriptor model is proven against the hardest of them
  (see `packages/core/src/descriptor/resolve.test.ts`), but the conversion is
  still manual.
- The authenticated WebSocket feed at `/wss` for live active calls, and the
  channel-usage charts. Both are `client`/`brand` features.
- Cypress end-to-end tests with Pact intercepts, to match the old portals'
  `bin/test-pact`.
- Translations for strings new to the rewrite: `migrate` carries over every key
  the old portals already translated and lists the rest.
