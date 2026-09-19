import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['packages/*/src/**/*.test.ts', 'packages/*/src/**/*.test.tsx', 'apps/*/src/**/*.test.ts', 'apps/*/src/**/*.test.tsx'],
    environmentMatchGlobs: [['**/*.dom.test.{ts,tsx}', 'jsdom']],
  },
});
