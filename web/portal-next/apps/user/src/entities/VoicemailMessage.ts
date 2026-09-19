import { type EntityDescriptor, formatDuration } from '@axion/portal-core';
import { Voicemail } from 'lucide-react';

export const VoicemailMessage: EntityDescriptor = {
  iden: 'VoicemailMessage',
  resource: 'voicemail_messages',
  route: 'voicemail',
  title: { one: 'Voicemail message', many: 'Voicemail' },
  icon: Voicemail,
  aclIden: 'VoicemailMessage',
  defaultSort: { field: 'id', direction: 'DESC' },
  toStr: (row) => String(row.caller ?? row.id ?? ''),
  columns: [
    { name: 'caller' },
    { name: 'callerId', hideBelow: 'md' },
    { name: 'duration' },
    { name: 'id', hideBelow: 'lg' },
  ],
  fields: {
    caller: { label: 'From' },
    callerId: { label: 'Caller ID' },
    duration: {
      label: 'Duration',
      renderCell: (value) => formatDuration(value as number),
    },
  },
  sections: [],
};
