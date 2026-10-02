import {
  ActionFunctionComponent,
  MultiSelectActionItemProps,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { useStoreActions, useStoreState } from 'store';

import {
  CsvRecord,
  fetchAll,
  ImportDialog,
  PlannedAction,
  ToolbarAction,
  writeJson,
} from '../../../components/CsvImport';
import DdiProviderAddress from '../DdiProviderAddress';
import {
  ADDRESS_COLUMNS,
  AddressRow,
  looksLikeIp,
  toAddressPayload,
} from './columns';

type AddressPlan = PlannedAction & { values?: Record<string, unknown> };

/** Imports addresses into the DDI provider whose address list is open. */
const Import: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const provider = useStoreState((state) => state.list.parentRow);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  if (!provider?.id) {
    return <span className='display-none'></span>;
  }
  const providerId = Number(provider.id);
  const providerName = String(provider.name ?? provider.id);

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const list = await fetchAll<AddressRow>(apiGet, DdiProviderAddress.path, {
      ddiProvider: providerId,
    });
    const byIp = new Map<string, AddressRow[]>();
    for (const row of list) {
      const key = (row.ip ?? '').toLowerCase();
      byIp.set(key, [...(byIp.get(key) ?? []), row]);
    }

    return records.map((record, index): AddressPlan => {
      const row = index + 1;
      if (!looksLikeIp(record.ip)) {
        return {
          kind: 'error',
          row,
          record,
          message: `${record.ip} is not a valid IP address`,
        };
      }

      const matches = byIp.get(record.ip.toLowerCase()) ?? [];
      if (matches.length > 1) {
        return {
          kind: 'error',
          row,
          record,
          message: `This provider has ${matches.length} addresses with IP ${record.ip}; update them in the form`,
        };
      }

      const values = toAddressPayload(record, providerId);

      return matches[0]
        ? { kind: 'update', row, record, id: matches[0].id, values }
        : { kind: 'create', row, record, values };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const { values } = action as AddressPlan;
    if (!values) {
      return;
    }
    if (action.kind === 'create') {
      await writeJson(apiPost, DdiProviderAddress.path, values, true);
    } else if (action.kind === 'update') {
      await writeJson(
        apiPut,
        `${DdiProviderAddress.path}/${action.id}`,
        values,
        false
      );
    }
  };

  return (
    <>
      <ToolbarAction
        variant={variant}
        label={_('Import CSV')}
        icon={<UploadFileIcon />}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ImportDialog
          title={
            <>
              {_('Import DDI provider addresses')} · {providerName}
            </>
          }
          columns={ADDRESS_COLUMNS}
          previewColumns={['ip', 'description']}
          rowLabel={(record) => record.ip ?? ''}
          templateFileName={`ddi-provider-addresses-${providerName}.csv`}
          templateRecords={[
            { ip: '192.0.2.20', description: 'Provider EU 1' },
            { ip: '192.0.2.21', description: 'Provider EU 2' },
          ]}
          intro={
            <>
              {_(
                'One address per row, imported into this DDI provider. A row whose IP address already exists here updates its description.'
              )}
            </>
          }
          plan={plan}
          save={save}
          onClose={(changed) => {
            setOpen(false);
            if (changed) {
              reload();
            }
          }}
        />
      )}
    </>
  );
};

export default Import;
