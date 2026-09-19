import { type AppName, APPS, generateApp, repoRoot } from './generate.js';
import { migrateApp } from './migrateTranslations.js';

function usage(): never {
  process.stderr.write(
    [
      'axion-codegen <command>',
      '',
      'Commands:',
      '  generate [app...]   Regenerate API types, field metadata and resource manifests.',
      '                      Apps default to: ' + APPS.join(', '),
      "  migrate <app>       Rebuild an app's translation catalogues, carrying over",
      '                      every string the previous portals already translated.',
      '',
    ].join('\n')
  );
  process.exit(1);
}

function main(): void {
  const [command, ...rest] = process.argv.slice(2);

  if (command === 'migrate') {
    const app = rest[0];
    if (!app) usage();

    const { reports, keys } = migrateApp(repoRoot(), app);
    process.stdout.write(`\n${keys} translatable strings in ${app}\n\n`);

    for (const report of reports) {
      const covered =
        keys === 0
          ? 100
          : Math.round(((keys - report.missing.length) / keys) * 100);
      process.stdout.write(
        `  ${report.language}  ${String(covered).padStart(3)}% carried over` +
          (report.missing.length > 0
            ? `  (${report.missing.length} still to translate)`
            : '') +
          '\n'
      );
    }

    const untranslated =
      reports.find((report) => report.language === 'es')?.missing ?? [];
    if (untranslated.length > 0) {
      process.stdout.write('\nNew strings needing translation:\n');
      for (const key of untranslated) process.stdout.write(`  - ${key}\n`);
    }
    return;
  }

  if (command !== 'generate') usage();

  const requested = (rest.length > 0 ? rest : [...APPS]) as AppName[];
  for (const app of requested) {
    if (!APPS.includes(app)) {
      process.stderr.write(
        `Unknown app "${app}". Known apps: ${APPS.join(', ')}\n`
      );
      process.exit(1);
    }
  }

  const root = repoRoot();
  let changed = 0;

  for (const app of requested) {
    const result = generateApp(root, app);
    changed += result.written.length;
    process.stdout.write(
      `${app.padEnd(9)} ${String(result.definitions).padStart(4)} definitions  ` +
        `${String(result.paths).padStart(4)} paths  ` +
        `${result.written.length > 0 ? `updated ${result.written.length} file(s)` : 'up to date'}\n`
    );
  }

  process.stdout.write(
    changed > 0
      ? `\nWrote ${changed} file(s).\n`
      : '\nEverything already up to date.\n'
  );
}

main();
