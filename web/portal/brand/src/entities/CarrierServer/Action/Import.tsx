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
  fetchOne,
  ImportDialog,
  mapLimit,
  PlannedAction,
  ToolbarAction,
  writeJson,
} from '../../../components/CsvImport';
import CarrierServer from '../CarrierServer';
import {
  SERVER_COLUMNS,
  serverKey,
  ServerRow,
  toServerPayload,
} from './columns';

type ServerPlan = PlannedAction & { values?: Record<string, unknown> };

/** Imports servers into the carrier whose server list is open. */
const Import: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const carrier = useStoreState((state) => state.list.parentRow);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  if (!carrier?.id) {
    return <span className='display-none'></span>;
  }
  const carrierId = Number(carrier.id);
  const carrierName = String(carrier.name ?? carrier.id);

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const list = await fetchAll<ServerRow>(apiGet, CarrierServer.path, {
      carrier: carrierId,
    });
    // A server is identified by SIP Proxy + Outbound Proxy, so one domain
    // can be reached through several carrier IPs.
    const byKey = new Map<string, ServerRow[]>();
    for (const row of list) {
      const key = serverKey(row.sipProxy, row.outboundProxy);
      byKey.set(key, [...(byKey.get(key) ?? []), row]);
    }
    const recordKey = (record: CsvRecord): string =>
      serverKey(record.sipProxy, record.outboundProxy);

    // Read the matched servers in full (the list lacks most fields and the
    // stored password) so an update keeps what the file does not set.
    const matched = records
      .map((record) => byKey.get(recordKey(record)) ?? [])
      .filter((rows) => rows.length === 1)
      .map((rows) => rows[0]);
    const details = new Map(
      (
        await mapLimit(matched, 4, (row) =>
          fetchOne<ServerRow>(apiGet, `${CarrierServer.path}/${row.id}`)
        )
      ).map((row) => [row.id, row])
    );

    const seen = new Map<string, number>();

    return records.map((record, index): ServerPlan => {
      const row = index + 1;
      const key = recordKey(record);
      const first = seen.get(key);
      if (first !== undefined) {
        return {
          kind: 'error',
          row,
          record,
          message: `Same SIP Proxy and Outbound Proxy as row ${first}`,
        };
      }
      seen.set(key, row);
      const matches = byKey.get(key) ?? [];

      if (matches.length > 1) {
        return {
          kind: 'error',
          row,
          record,
          message: `This carrier has ${matches.length} servers with this SIP Proxy and Outbound Proxy; update them in the form`,
        };
      }

      const existing = matches[0] ? details.get(matches[0].id) : undefined;
      const values = toServerPayload(record, carrierId, existing);

      if (values.authNeeded === 'yes' && !values.authUser) {
        return {
          kind: 'error',
          row,
          record,
          message: 'Auth username is required when authentication is required',
        };
      }
      if (values.authNeeded === 'yes' && !values.authPassword) {
        return {
          kind: 'error',
          row,
          record,
          message: 'Auth password is required when authentication is required',
        };
      }

      return existing
        ? { kind: 'update', row, record, id: existing.id, values }
        : { kind: 'create', row, record, values };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const { values } = action as ServerPlan;
    if (!values) {
      return;
    }
    if (action.kind === 'create') {
      await writeJson(apiPost, CarrierServer.path, values, true);
    } else if (action.kind === 'update') {
      await writeJson(
        apiPut,
        `${CarrierServer.path}/${action.id}`,
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
              {_('Import carrier servers')} · {carrierName}
            </>
          }
          columns={SERVER_COLUMNS}
          previewColumns={[
            'sipProxy',
            'outboundProxy',
            'uriScheme',
            'transport',
            'authNeeded',
            'authUser',
            'sendPAI',
            'sendRPID',
          ]}
          rowLabel={(record) =>
            record.outboundProxy
              ? `${record.sipProxy ?? ''} via ${record.outboundProxy}`
              : record.sipProxy ?? ''
          }
          templateFileName={`carrier-servers-${carrierName}.csv`}
          templateRecords={[
            {
              sipProxy: 'sip.example-carrier.net:5060',
              outboundProxy: '',
              uriScheme: 'sip',
              transport: 'UDP',
              authNeeded: 'yes',
              authUser: 'account123',
              authPassword: 'change-me',
              sendPAI: 'yes',
              sendRPID: 'no',
              fromUser: '',
              fromDomain: '',
            },
          ]}
          intro={
            <>
              {_(
                'One server per row, imported into this carrier. A row whose SIP Proxy and Outbound Proxy already exist here updates that server; use Outbound Proxy (an IPv4 address) to send to a carrier IP while keeping its domain in the SIP messages. Empty cells use the form defaults (sip, UDP, no authentication, Send PAI yes, Send RPID no). An empty Auth password keeps the stored one; exports never include passwords.'
              )}
            </>
          }
          updateNotice={_(
            'Rows that match an existing server replace all of its values, except that an empty Auth password keeps the stored one.'
          )}
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
