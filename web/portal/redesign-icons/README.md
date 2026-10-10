# Redesign icon set

The portals and ivoz-ui use Material icons (`@mui/icons-material`). The
redesign draws [Lucide](https://lucide.dev) line icons (ISC licence) over them
with CSS masks, so the whole UI uses one icon style without changing
ivoz-ui or the entity files.

- `map.json`: Material icon name → Lucide icon name. Variants
  (`…Rounded`, `…Outlined`) use their base name's entry.
- `build.mjs`: finds every Material icon the portals and ivoz-ui import,
  and writes `src/components/Redesign/icons.css` in all four portals.
  Icons missing from the map keep their Material glyph; the script lists them.

Regenerate after adding icons or changing the map:

```
cd web/portal
npm install --no-save lucide-static@0.460.0
node redesign-icons/build.mjs
```
