import { type EntityDescriptor, formatDuration } from '@axion/portal-core';
import { Mic } from 'lucide-react';

export const Recording: EntityDescriptor = {
  iden: 'Recording',
  resource: 'recordings',
  route: 'recordings',
  title: { one: 'Recording', many: 'Recordings' },
  icon: Mic,
  aclIden: 'Recording',
  defaultSort: { field: 'calldate', direction: 'DESC' },
  toStr: (row) => String(row.callid ?? row.id ?? ''),
  columns: [
    { name: 'calldate' },
    { name: 'type', hideBelow: 'sm' },
    { name: 'caller' },
    { name: 'callee' },
    { name: 'duration' },
  ],
  fields: {
    calldate: { label: 'Date' },
    type: { label: 'Type', options: { ondemand: 'On demand', ddi: 'DDI' } },
    caller: { label: 'Caller' },
    callee: { label: 'Callee' },
    duration: {
      label: 'Duration',
      renderCell: (value) => formatDuration(value as number),
    },
  },
  sections: [],
};
