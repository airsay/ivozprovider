import '@axion/portal-core/styles.css';

import { createI18n, PortalApp } from '@axion/portal-core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { config } from './config';
import { AppRoutes } from './routes';
import { catalogues } from './translations';

const i18n = createI18n({
  resources: catalogues,
  storageKey: 'AX-user-language',
});

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element');

createRoot(container).render(
  <StrictMode>
    <PortalApp config={config} i18n={i18n}>
      <AppRoutes />
    </PortalApp>
  </StrictMode>
);
