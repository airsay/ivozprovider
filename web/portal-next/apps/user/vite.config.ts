import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

/**
 * The new portals build to a `-next` path so they can be served alongside the
 * existing ones from the same Apache vhost and compared screen by screen. At
 * cutover this becomes `/user/` and the Alias in
 * `profiles/portal/etc/apache2/sites-available/020-ivozprovider-portals.conf`
 * points here instead.
 */
const base = '/user-next/';

export default defineConfig(() => ({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    // Order matters: Vite matches string aliases by prefix, so the deep-import
    // form has to come first or `@axion/portal-core/styles.css` would resolve
    // against the barrel file.
    alias: [
      {
        find: /^@axion\/portal-core\/(.*)$/,
        replacement: `${fileURLToPath(new URL('../../packages/core/src/', import.meta.url))}$1`,
      },
      {
        find: /^@axion\/portal-core$/,
        replacement: fileURLToPath(
          new URL('../../packages/core/src/index.ts', import.meta.url)
        ),
      },
    ],
  },
  server: {
    host: true,
    port: 3100,
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL ?? 'https://127.0.0.1/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Charts are only pulled in by a couple of screens, so they are worth
        // splitting out. React and the rest of the vendor tree are mutually
        // dependent and must stay in one chunk.
        manualChunks: (id: string) => {
          if (!id.includes('/node_modules/')) return undefined;
          if (id.includes('recharts') || id.includes('/d3-')) return 'charts';
          return 'vendor';
        },
      },
    },
  },
}));
