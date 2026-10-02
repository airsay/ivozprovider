# Upgrading Tervian One to a new IvozProvider release

This repo is IvozProvider with the Tervian One rebrand and extra portal
features on top. When Irontec releases a new version (for example 4.9), a plain
`apt upgrade` replaces our changes with stock files. This document covers how
to prevent that and how to move our changes to the new release.

> Flags used below: **[checked]** means it was verified against the code in this
> repo; **[check]** means it's an assumption to confirm when you do the
> upgrade.

---

## 1. Protect the running servers

Pin the IvozProvider packages so `apt upgrade` can't move them to a new
release. OS and other package updates keep working.

```bash
apt-cache policy ivozprovider-web-portals     # note the installed version string
sudo tee /etc/apt/preferences.d/ivozprovider-hold <<'EOF'
Package: ivozprovider*
Pin: version 4.8~*
Pin-Priority: 1001
EOF
apt-cache policy ivozprovider-web-portals     # candidate must stay on 4.8
```

- **[check]** The pattern `4.8~*` comes from the upstream changelog version
  `4.8~4.8.0`. Match it to what `apt-cache policy` shows on the server.
- Do **not** use `apt-mark hold`. The IvozProvider packages depend on each
  other at exactly the same version (for example `ivozprovider-profile-portal`
  depends on `ivozprovider-web-portals (=${binary:Version})` **[checked]**), so
  holding one of them blocks or breaks the whole upgrade.

---

## 2. Where our changes live

| Repo | Branch | Contents |
|---|---|---|
| this repo | `tervian-one-rebrand` (or whichever branch holds our commits) | Everything below |
| `airsay/ivoz-ui` | `axion-branding` (source), `axion-branding-dist` (built package used by `web/portal`) | Tervian logo, About dialog, footer, default colours |

### Files we changed or added in this repo

**Backend**
- Default product name "Tervian One" and default colour Emerald `#087F6D`:
  - `library/Ivoz/Provider/Application/Service/WebPortal/ProductNameResolver.php`
  - `library/Ivoz/Provider/Infrastructure/Persistence/Doctrine/Mapping/WebPortal.WebPortalAbstract.orm.xml`
  - `library/Ivoz/Provider/Domain/Model/WebPortal/WebPortalAbstract.php`
  - `library/Ivoz/Provider/Domain/Model/WebPortal/WebPortalDtoAbstract.php`
  - `web/rest/brand/public/apiSpec.json` and `web/rest/platform/public/apiSpec.json`, `productName` and `color` defaults only
- Migrations, which rename or recolour portals still on the old defaults:
  - `schema/DoctrineMigrations/Version20260925000000.php` (product name)
  - `schema/DoctrineMigrations/Version20260925120000.php` (colour)
  - `schema/DoctrineMigrations/Version20260925130000.php` (seeded platform portal colour)

**Old portals, all four (`web/portal/{platform,brand,client,user}`)**
- `index.html`, `public/manifest.json`
- `public/logo.svg`, `public/tervian-one-lockup.svg`, `public/favicon.ico`, `public/logo192.png`, `public/logo512.png`
- `public/assets/fonts/inter-*.woff2`, `public/assets/fonts/Inter-LICENSE.txt`
- `src/index.css`, `src/Theme.tsx`
- `src/components/Branding/` (new): white-label rules, legacy-default detection, About credits
- `src/components/TervianOneLogo/` (new)
- `src/components/IdleLogout/` (new) and `src/App.tsx`, which mounts it: idle sign-out (see section 6)
- `src/components/Dashboard/Dashboard.tsx`, which uses the product name from the branding code

**Old portals, per portal**
- user: `src/components/Header/Header.tsx`, `src/components/Header/MenuItems/MenuItems.tsx`
- platform, brand, client:
  - `src/components/Header/` (new)
  - `src/components/AppRouteContentWrapper/` (new)
  - `src/router/AppRoutes.tsx`, which uses the local wrapper
- platform, brand: `src/entities/WebPortal/WebPortal.tsx`, colour and product-name defaults
- brand:
  - `src/entities/Company/Action/index.ts` and `src/entities/Company/Action/ImportUsers/` (new, bulk user import)
  - `src/components/CsvImport/` (new, same module as platform)
  - `src/entities/Carrier/Action/index.ts`, `Carrier/Action/{ImportCarriers,ExportCarriers}.tsx`, `Carrier/Action/csv/` (new)
  - `src/entities/CarrierServer/{CarrierServer.tsx, Action/}`
  - `src/entities/Ddi/Action/index.ts`, `Ddi/Action/{ImportDdis,ExportDdis}.tsx`, `Ddi/Action/csv/` (new)
  - `src/entities/{DdiProvider,DdiProviderAddress,DdiProviderRegistration}/` — entity `.tsx` (`customActions`) and `Action/` (new)
- platform:
  - `src/components/CsvImport/` (new)
  - `src/entities/TerminalManufacturer/{TerminalManufacturer.tsx, Action/}`
  - `src/entities/TerminalModel/{TerminalModel.tsx, Action/}`
  - `src/entities/Currency/{Currency.tsx, Action/}`

**Ours before the rebrand work** (not part of the stock product)
- `web/portal-next/`
- `debian/rules` (`build_webportals_next`), `debian/ivozprovider-web-portals.install`

Most of these are **new files** and won't conflict. The stock files we edited
are the likely conflict points:
- `Theme.tsx`, `index.css`, `App.tsx`, `AppRoutes.tsx`, `Dashboard.tsx`, `WebPortal.tsx`
- the three entity files that gained `customActions`
- the four backend files
- `apiSpec.json`, which is generated upstream

---

## 3. Move our changes onto the new release

```bash
cd ~/Projects/VoIP/ivozprovider
git remote add upstream https://github.com/irontec/ivozprovider.git   # first time only
git fetch upstream --tags
git tag -l '4.9*'                 # [check] find the release tag; naming not verified
git checkout tervian-one-rebrand
git rebase <the-4.9-tag>          # resolve conflicts, then: git rebase --continue
```

When resolving conflicts:
- **`apiSpec.json`:** take upstream's new file, then change only the two
  `productName` and two `color` default/example values back to `"Tervian One"`
  and `"#087F6D"`, in both brand and platform. Don't merge the file by hand.
- **Backend defaults:** keep upstream's code and change only the default
  values back to `'Tervian One'` / `'#087F6D'`.
- **`Theme.tsx`:** it's identical in all four portals. Resolve it once and copy
  it to the other three.

### ivoz-ui fork
```bash
cd ~/Projects/VoIP/ivoz-ui-tervian
git remote add upstream https://github.com/irontec/ivoz-ui.git         # first time only
git fetch upstream --tags
git checkout axion-branding
git rebase <ivoz-ui version used by the new IvozProvider release>
```

Then rebuild the dist:

```bash
yarn install --frozen-lockfile                 # at the fork root
cd library
rm -rf dist
../node_modules/.bin/tsc -p tsconfig.json      # [checked] `yarn build` fails: library/bin/tsc needs ../lib/tsc.js, which isn't in the repo
sed 's/dist\///' package.json > dist/package.json
cp -r hygen dist/ && cp -r src/translations dist/
../node_modules/.bin/sass --no-source-map src/ dist/
cp -r src/sass dist/css
```

These are the steps from `library/bin/build`, run by hand. The output is in
`library/dist`. Compare it with the current `axion-branding-dist`: a newer
TypeScript can rewrite `.d.ts` files with cosmetic changes
(`declare type` → `type`). Those are harmless, but you can discard them to keep
the diff small.

Copy `library/dist` onto the `axion-branding-dist` branch, commit, and push. Then
in this repo update the lockfile:

```bash
cd web/portal && yarn upgrade @irontec/ivoz-ui
```

- **[check]** Which ivoz-ui version IvozProvider 4.9 uses: it's the version in
  `web/portal/package.json` and `yarn.lock` on the 4.9 tag.

### Check before building
- **New upstream migrations touching our columns:**

  ```bash
  git diff <old-tag> <new-tag> --stat -- schema/DoctrineMigrations
  grep -l "WebPortals" $(git diff --name-only <old-tag> <new-tag> -- schema/DoctrineMigrations)
  ```

  If a new migration changes `WebPortals.productName` or `WebPortals.color`,
  review it against ours.
- **Stock defaults the UI treats as "not customised":** these are listed in
  `web/portal/*/src/components/Branding/Branding.ts`:
  - `LEGACY_DEFAULT_PRODUCT_NAMES`: `'Ivoz Provider'`, `'Axion Communications Platform'`
  - `DEFAULT_COLORS`: `#000000` plus the per-type stock colours

  If upstream introduces new defaults, add them there, identically in all four portals.
- **Unreadable files:** make sure every file is world-readable, then build:

  ```bash
  cd ~/Projects/VoIP/ivozprovider
  find web library schema -type f ! -perm -o+r -not -path '*/node_modules/*' -print -exec chmod a+r {} +
  ```

---

## 4a. Upgrade a server running stock packages plus our portal files (current setup)

Our backend changes are **not** on these servers, only the portal files.

1. Read Irontec's upgrade notes (`doc/UPGRADE*.md` on the new tag).
2. Build the portals from the rebased branch. The portals must be built from
   the same release the server will run.

   ```bash
   cd ~/Projects/VoIP/ivozprovider/web/portal
   yarn install --frozen-lockfile
   for p in platform brand client user; do (cd $p && yarn version-info && yarn build) || break; done
   tar -C .. --mode='a+rX' -czf ~/tervian-portals.tgz \
     portal/platform/dist portal/brand/dist portal/client/dist portal/user/dist
   scp ~/tervian-portals.tgz debian@SERVER:~/
   ```
3. Test on a staging server first if you have one.
4. On the server, in a maintenance window. Users see the stock portals
   between the `apt upgrade` and the redeploy.

   ```bash
   sudo sed -i 's/^Pin: version .*/Pin: version 4.9~*/' /etc/apt/preferences.d/ivozprovider-hold
   sudo apt update && sudo apt upgrade
   sudo reboot                     # Irontec recommends a reboot after package installs
   ```

   After the reboot, redeploy the portals:

   ```bash
   cd /opt/irontec/ivozprovider/web
   for p in platform brand client user; do sudo rm -rf portal/$p/dist; done
   sudo tar --no-same-owner -xzf ~/tervian-portals.tgz -C /opt/irontec/ivozprovider/web
   sudo chmod -R a+rX portal/*/dist
   curl -skI https://localhost/platform/logo.svg | head -1    # expect 200
   ```

## 4b. Upgrade a server running our own packages (recommended long term)

Our portals, backend changes and migrations ship together in our own `.deb`
files, so there's no window of stock UI.

1. Rebase as in section 3.
2. Set the version:

   ```bash
   dch --local +tervian "Tervian One on 4.9"
   ```

   The result should look like `4.9~4.9.0+tervian1`.
3. Build the packages (`dpkg-buildpackage -us -uc -b`, see the deployment notes)
   and publish them to our apt repo.
4. On the servers: `sudo apt update && sudo apt upgrade`, then reboot.
   - Pin `ivozprovider*` to **our** repo at priority 1001, so Irontec's packages
     never replace ours, even when their version number is higher.
   - The `ivozprovider-schema` package runs all pending migrations during
     install **[checked in `debian/ivozprovider-schema.postinst`]**. That
     includes Irontec's new ones and ours, in version order.

---

## 5. After the upgrade, check

- [ ] `dpkg -l 'ivozprovider*'` shows the expected version.
- [ ] `https://SERVER/platform/logo.svg` returns 200, and the logo, favicon and Inter font show.
- [ ] The platform, brand, client and user portals show Tervian One. A customised portal still shows its own logo and name.
- [ ] The About dialog:
  - brand shows "Powered by Tervian One";
  - client and user show "©year <product name>".
- [ ] Brand → Virtual PBXs → ⋯ → **Import users** opens.
- [ ] Platform: **Import/Export CSV** works on Terminal Manufacturers, on a manufacturer's Terminal Models, and on Currencies.
- [ ] Brand: **Import/Export CSV** works on Carriers and on a carrier's Carrier servers.
- [ ] Brand: **Import/Export CSV** works on DDI Providers and on a provider's Addresses and Registrations.
- [ ] Brand: **Import/Export CSV** works on DDIs.
- [ ] Idle sign-out: leave a portal untouched for 30 minutes (or build with `VITE_IDLE_TIMEOUT_MINUTES=1` to test) and it returns to the login page with a notice.
- [ ] New portal form: Product Name defaults to "Tervian One" and Color to `#087F6D`.
- [ ] With our packages only: this query shows no portal still on 'Ivoz Provider' or a stock colour:

  ```bash
  mysql -uroot -p ivozprovider -e "SELECT id,urlType,productName,color FROM WebPortals"
  ```

---

## 6. Session length (idle sign-out)

**Stock behaviour [checked in the code]:** the API issues a 1-hour access token
(`jwt_token_ttl: 3600`) and a refresh token; ivoz-ui keeps both in
`localStorage` and silently gets a new access token whenever the old one
expires. The refresh bundle (`gesdinet/jwt-refresh-token-bundle` v0.12.0) is
configured with only `user_provider`, so its defaults apply. Its current README
gives the default lifetime as one month, not extended on use **[check]** (read
from the bundle's current README, not from v0.12.0 itself). The result: a login
lasts about 30 days, through browser restarts, with no idle limit. The Logout
button only clears the browser's copy; the refresh token stays valid on the
server.

**Portal side (ours, in the four old portals):** `src/components/IdleLogout/`
signs the user out after 30 minutes without mouse, keyboard, scroll or touch
activity. The last-activity time is shared between tabs and survives a browser
restart, so coming back after the limit also signs out. Change the limit at
build time:

```bash
VITE_IDLE_TIMEOUT_MINUTES=15 yarn build     # 0 turns it off
```

This only clears the tokens from the browser. Someone holding a copied token
can still use it until it expires, which is what the server side fixes.

**Server side (optional, not applied, not tested by us):** make the refresh
token short-lived and extended only while it's used. First confirm the options
exist in the installed bundle:

```bash
cd /opt/irontec/ivozprovider/web/rest/platform
sudo bin/console config:dump-reference gesdinet_jwt_refresh_token   # expect ttl and ttl_update
```

Then, in `config/packages/gesdinet_jwt_refresh_token.yaml` of each of
`web/rest/{platform,brand,client,user}`:

```yaml
gesdinet_jwt_refresh_token:
  user_provider: 'Service\UserProvider'
  ttl: 5400          # seconds; must be longer than jwt_token_ttl (3600)
  ttl_update: true   # each refresh extends it, so active users stay in
```

- With these values the server stops accepting a session between 30 and 90
  minutes after its last use (the refresh token is only extended once an hour,
  when the access token expires). A tighter bound needs a shorter
  `jwt_token_ttl` as well.
- Clear the Symfony cache of each API afterwards **[check]** the exact command
  on your install.
- Refresh tokens issued before the change keep their original 30-day expiry. To
  end them all (everyone logs in again within the hour):
  `DELETE FROM refresh_tokens;` in the `ivozprovider` database
  [table name checked in `schema/src/Entity/RefreshToken.orm.xml`].
- An `apt upgrade` of the stock packages replaces these files; with our own
  packages (4b), put the change in the repo instead.
