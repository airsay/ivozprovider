import type { NavSection, PortalConfig } from '@axion/portal-core';
import {
  LayoutDashboard,
  Mic,
  Phone,
  PhoneForwarded,
  Printer,
  Voicemail,
} from 'lucide-react';

import { fieldsByDefinition, resources } from './api';
import { entities } from './entities';

/**
 * Navigation for the self-care portal.
 *
 * Ordered by how often people need each thing, not by the shape of the data
 * model: the dashboard answers "is my phone working", then call history, then
 * the things you configure once and forget.
 */
const nav: NavSection[] = [
  {
    label: 'Workspace',
    items: [
      { to: '', label: 'Overview', icon: LayoutDashboard },
      { to: 'calls', label: 'Call history', icon: Phone },
    ],
  },
  {
    label: 'My settings',
    items: [
      {
        to: 'forwarding',
        label: 'Call forwarding',
        icon: PhoneForwarded,
        entity: 'CallForwardSetting',
      },
      {
        to: 'voicemail',
        label: 'Voicemail',
        icon: Voicemail,
        entity: 'VoicemailMessage',
      },
      {
        to: 'recordings',
        label: 'Recordings',
        icon: Mic,
        entity: 'Recording',
        // The company has to have the recordings feature enabled at all.
        isAvailable: ({ acl }) => acl.hasFeature('recordings'),
      },
      {
        to: 'faxes',
        label: 'Faxes',
        icon: Printer,
        entity: 'FaxesInOut',
        isAvailable: ({ acl }) => acl.hasFeature('faxes'),
      },
    ],
  },
];

export const config: PortalConfig = {
  app: 'user',
  basePath: '/user-next',
  apiBaseUrl: '/api/user',
  // The user API authenticates on `email`, not `username`.
  loginPath: '/user_login',
  usernameField: 'email',
  storagePrefix: 'AX-user-',
  profilePath: '/my/status',
  resources,
  fieldsByDefinition,
  entities,
  nav,
  fallbackProductName: 'Tervian One',
  loginTagline: {
    title: 'Your phone service, under control.',
    body: 'Check your calls, choose where they ring and pick up voicemail from anywhere.',
  },
};
