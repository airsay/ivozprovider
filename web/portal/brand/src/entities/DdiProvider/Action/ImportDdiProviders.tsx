import {
  ActionFunctionComponent,
  MultiSelectActionItemProps,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import { useStoreActions } from 'store';

import {
  CsvRecord,
  fetchAll,
  ImportDialog,
  PlannedAction,
  ToolbarAction,
  writeJson,
} from '../../../components/CsvImport';
import { firstError, idOf } from '../../Carrier/Action/csv/references';
import { DDI_PROVIDER_COLUMNS, DdiProviderRow } from './csv/columns';
import {
  loadDdiProviderReferences,
  resolveDdiProviderRelations,
} from './csv/references';

const PATH = '/ddi_providers';

type ProviderPlan = PlannedAction & { values?: Record<string, unknown> };

const ImportDdiProviders: ActionFunctionComponent = (
  props: MultiSelectActionItemProps
) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const [existing, refs] = await Promise.all([
      fetchAll<DdiProviderRow>(apiGet, PATH),
      loadDdiProviderReferences(apiGet),
    ]);
    const byName = new Map(
      existing.map((row) => [row.name.toLowerCase(), row])
    );

    return records.map((record, index): ProviderPlan => {
      const row = index + 1;
      const resolved = resolveDdiProviderRelations(record, refs);
      const error = firstError(resolved);
      if (error) {
        return { kind: 'error', row, record, message: error };
      }

      const values: Record<string, unknown> = {
        name: record.name,
        description: record.description ?? '',
        transformationRuleSet: idOf(resolved.transformationRuleSet),
        proxyTrunk: idOf(resolved.proxyTrunk),
        mediaRelaySet: idOf(resolved.mediaRelaySet),
        routingTag: idOf(resolved.routingTag),
      };
      const match = byName.get(record.name.toLowerCase());

      return match
        ? { kind: 'update', row, record, id: match.id, values }
        : { kind: 'create', row, record, values };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const { values } = action as ProviderPlan;
    if (!values) {
      return;
    }
    if (action.kind === 'create') {
      await writeJson(apiPost, PATH, values, true);
    } else if (action.kind === 'update') {
      await writeJson(apiPut, `${PATH}/${action.id}`, values, false);
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
          title={_('Import DDI providers')}
          columns={DDI_PROVIDER_COLUMNS}
          previewColumns={[
            'name',
            'description',
            'proxyTrunk',
            'mediaRelaySet',
            'transformationRuleSet',
            'routingTag',
          ]}
          rowLabel={(record) => record.name ?? ''}
          templateFileName='ddi-providers-template.csv'
          templateRecords={[
            {
              name: 'Example provider',
              description: 'Inbound numbers',
              proxyTrunk: '192.0.2.10',
              mediaRelaySet: 'Default',
              transformationRuleSet: 'Spain',
              routingTag: '',
            },
          ]}
          intro={
            <>
              {_(
                'One DDI provider per row; a row whose Name already exists updates that provider. Local socket is the socket IP (empty uses the only socket, if there is just one). Media relay set is the set name (empty uses the client’s set). Number transformation is the set’s English name. Routing tag is the tag name or value (empty = unassigned). Addresses and registrations are imported from each provider’s own lists.'
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

export default ImportDdiProviders;
