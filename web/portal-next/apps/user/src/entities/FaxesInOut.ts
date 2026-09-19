import type { EntityDescriptor } from '@axion/portal-core';
import { Printer } from 'lucide-react';

export const FaxesInOut: EntityDescriptor = {
  iden: 'FaxesInOut',
  resource: 'faxes_in_outs',
  route: 'faxes',
  title: { one: 'Fax', many: 'Faxes' },
  icon: Printer,
  aclIden: 'Fax',
  defaultSort: { field: 'calldate', direction: 'DESC' },
  toStr: (row) => String(row.dst ?? row.src ?? row.id ?? ''),
  columns: [
    { name: 'calldate' },
    { name: 'type' },
    { name: 'src', hideBelow: 'sm' },
    { name: 'dst' },
    { name: 'status' },
    { name: 'pages', hideBelow: 'md' },
  ],
  fields: {
    calldate: { label: 'Date' },
    type: { label: 'Direction', options: { In: 'Received', Out: 'Sent' } },
    src: { label: 'From' },
    dst: { label: 'To' },
    pages: { label: 'Pages' },
    status: {
      label: 'Status',
      options: {
        inprogress: 'In progress',
        completed: 'Completed',
        error: 'Failed',
      },
    },
    file: { label: 'Document' },
    fax: {
      label: 'Fax box',
      relation: { resource: 'faxes', labelFrom: 'name' },
    },
  },
  sections: [{ legend: 'Send a fax', fields: ['fax', 'dst', 'file'] }],
};
