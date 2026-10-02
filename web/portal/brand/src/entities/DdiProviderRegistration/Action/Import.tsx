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
import DdiProviderRegistration from '../DdiProviderRegistration';
import {
  pairKey,
  REGISTRATION_COLUMNS,
  RegistrationRow,
  toRegistrationPayload,
} from './columns';

type RegistrationPlan = PlannedAction & { values?: Record<string, unknown> };

/** Imports registrations into the DDI provider whose list is open. */
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
  const path = DdiProviderRegistration.path;

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    // Username + domain is unique across all providers, so look at the
    // brand's whole list as well as this provider's.
    const [mine, all] = await Promise.all([
      fetchAll<RegistrationRow>(apiGet, path, { ddiProvider: providerId }),
      fetchAll<RegistrationRow>(apiGet, path),
    ]);
    const mineByPair = new Map(
      mine.map((row) => [pairKey(row.username, row.domain), row])
    );
    const takenElsewhere = new Set(
      all
        .filter((row) => !mine.some((m) => m.id === row.id))
        .map((row) => pairKey(row.username, row.domain))
    );

    // Read matched registrations in full so an empty password keeps the
    // stored one and unset cells keep nothing stale.
    const matched = records
      .map((r) => mineByPair.get(pairKey(r.username, r.domain)))
      .filter((row): row is RegistrationRow => Boolean(row));
    const details = new Map(
      (
        await mapLimit(matched, 4, (row) =>
          fetchOne<RegistrationRow>(apiGet, `${path}/${row.id}`)
        )
      ).map((row) => [row.id, row])
    );

    const seen = new Map<string, number>();

    return records.map((record, index): RegistrationPlan => {
      const row = index + 1;
      const key = pairKey(record.username, record.domain);

      const first = seen.get(key);
      if (first !== undefined) {
        return {
          kind: 'error',
          row,
          record,
          message: `Same username and domain as row ${first}`,
        };
      }
      seen.set(key, row);

      if (takenElsewhere.has(key)) {
        return {
          kind: 'error',
          row,
          record,
          message: `${record.username}@${record.domain} is already registered by another DDI provider`,
        };
      }

      const match = mineByPair.get(key);
      const existing = match ? details.get(match.id) : undefined;
      const payload = toRegistrationPayload(record, providerId, existing);
      if ('error' in payload) {
        return { kind: 'error', row, record, message: payload.error };
      }

      return existing
        ? {
            kind: 'update',
            row,
            record,
            id: existing.id,
            values: payload.values,
          }
        : { kind: 'create', row, record, values: payload.values };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const { values } = action as RegistrationPlan;
    if (!values) {
      return;
    }
    if (action.kind === 'create') {
      await writeJson(apiPost, path, values, true);
    } else if (action.kind === 'update') {
      await writeJson(apiPut, `${path}/${action.id}`, values, false);
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
              {_('Import DDI provider registrations')} · {providerName}
            </>
          }
          columns={REGISTRATION_COLUMNS}
          previewColumns={[
            'username',
            'domain',
            'multiDdi',
            'contactUsername',
            'authUsername',
            'authProxy',
            'expires',
          ]}
          rowLabel={(record) =>
            `${record.username ?? ''}@${record.domain ?? ''}`
          }
          templateFileName={`ddi-provider-registrations-${providerName}.csv`}
          templateRecords={[
            {
              username: 'account123',
              domain: 'sip.example-provider.net',
              authPassword: 'change-me',
              multiDdi: 'yes',
              contactUsername: '',
              authUsername: '',
              authProxy: '',
              realm: '',
              expires: '3600',
            },
          ]}
          intro={
            <>
              {_(
                'One registration per row, imported into this DDI provider. A row whose Username and Domain already exist here updates that registration. Empty cells use the form defaults (random contact username yes, expiry 3600). Contact username is only used when Random contact username is no. An empty Password keeps the stored one; exports never include passwords.'
              )}
            </>
          }
          updateNotice={_(
            'Rows that match an existing registration replace all of its values, except that an empty Password keeps the stored one.'
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
