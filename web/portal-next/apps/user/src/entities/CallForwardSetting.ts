import type { EntityDescriptor } from '@axion/portal-core';
import { PhoneForwarded } from 'lucide-react';

/**
 * Call forwarding.
 *
 * Split across two API resources, which is why `listResource` is set: the
 * collection lives at `/my/call_forward_settings` (list, create) while an
 * individual rule is replaced or deleted at `/call_forward_settings/{id}`.
 *
 * `targetType` drives which destination control is shown — the same
 * show-one-hide-the-rest pattern the DDI route type uses, and the reason the
 * descriptor model carries `toggles` at all.
 */
const TARGET_FIELDS = [
  'numberCountry',
  'numberValue',
  'extension',
  'voicemail',
];

export const CallForwardSetting: EntityDescriptor = {
  iden: 'CallForwardSetting',
  resource: 'call_forward_settings',
  listResource: 'my/call_forward_settings',
  route: 'forwarding',
  title: { one: 'Call forward', many: 'Call forwarding' },
  icon: PhoneForwarded,
  aclIden: 'CallForwardSetting',
  defaultSort: { field: 'id', direction: 'ASC' },
  toStr: (row, t) => {
    const when: Record<string, string> = {
      inconditional: 'Always',
      noAnswer: 'When I do not answer',
      busy: 'When I am busy',
      userNotRegistered: 'When my device is offline',
    };
    const key = when[String(row.callForwardType ?? '')];
    return key ? t(key) : t('Call forward');
  },
  columns: [
    { name: 'callForwardType' },
    { name: 'callTypeFilter', hideBelow: 'sm' },
    { name: 'targetType' },
    { name: 'numberValue', hideBelow: 'md' },
    { name: 'enabled' },
  ],
  fields: {
    enabled: { label: 'Enabled' },
    callForwardType: {
      label: 'When',
      options: {
        inconditional: 'Always',
        noAnswer: 'When I do not answer',
        busy: 'When I am busy',
        userNotRegistered: 'When my device is offline',
      },
    },
    callTypeFilter: {
      label: 'Applies to',
      options: {
        internal: 'Internal calls',
        external: 'External calls',
        both: 'All calls',
      },
    },
    noAnswerTimeout: {
      label: 'Ring for',
      helpText: 'Seconds to ring before the call is forwarded.',
      visibleWhen: (values) => values.callForwardType === 'noAnswer',
    },
    targetType: {
      label: 'Forward to',
      nullLabel: 'Nowhere',
      options: {
        number: 'An external number',
        extension: 'An extension',
        voicemail: 'A voicemail box',
        retail: 'A retail account',
      },
      toggles: {
        __null__: { hide: TARGET_FIELDS },
        number: { show: ['numberCountry', 'numberValue'], hide: TARGET_FIELDS },
        extension: { show: ['extension'], hide: TARGET_FIELDS },
        voicemail: { show: ['voicemail'], hide: TARGET_FIELDS },
        retail: { hide: TARGET_FIELDS },
      },
    },
    numberValue: { label: 'Number' },
    numberCountry: {
      label: 'Country',
      relation: { resource: 'countries', labelFrom: 'countryCode' },
    },
    extension: {
      label: 'Extension',
      relation: { resource: 'my/company_extensions', labelFrom: 'number' },
    },
    voicemail: {
      label: 'Voicemail',
      relation: { resource: 'my/company_voicemails', labelFrom: 'name' },
    },
  },
  sections: [
    {
      legend: 'Rule',
      fields: [
        'enabled',
        'callForwardType',
        'callTypeFilter',
        'noAnswerTimeout',
      ],
    },
    {
      legend: 'Destination',
      fields: [
        'targetType',
        'numberCountry',
        'numberValue',
        'extension',
        'voicemail',
      ],
    },
  ],
};
