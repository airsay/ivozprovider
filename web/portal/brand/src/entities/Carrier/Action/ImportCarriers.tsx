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
import { CARRIER_COLUMNS, CarrierRow } from './csv/columns';
import {
  firstError,
  idOf,
  loadCarrierReferences,
  resolveCarrierRelations,
} from './csv/references';

const CARRIERS_PATH = '/carriers';

type CarrierPlan = PlannedAction & { values?: Record<string, unknown> };

const ImportCarriers: ActionFunctionComponent = (
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
      fetchAll<CarrierRow>(apiGet, CARRIERS_PATH),
      loadCarrierReferences(apiGet),
    ]);
    const byName = new Map(
      existing.map((row) => [row.name.toLowerCase(), row])
    );

    return records.map((record, index): CarrierPlan => {
      const row = index + 1;
      const resolved = resolveCarrierRelations(record, refs);
      const error = firstError(resolved);
      if (error) {
        return { kind: 'error', row, record, message: error };
      }

      const match = byName.get(record.name.toLowerCase());
      const values: Record<string, unknown> = {
        name: record.name,
        description: record.description ?? '',
        calculateCost: (record.calculateCost ?? '').toLowerCase() === 'yes',
        transformationRuleSet: idOf(resolved.transformationRuleSet),
        currency: idOf(resolved.currency),
        proxyTrunk: idOf(resolved.proxyTrunk),
        mediaRelaySet: idOf(resolved.mediaRelaySet),
      };

      if (!match) {
        return { kind: 'create', row, record, values };
      }

      // The domain sets the balance from the request on update, so keep the
      // current one rather than risk resetting it.
      values.balance = match.balance ?? 0;

      return { kind: 'update', row, record, id: match.id, values };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const { values } = action as CarrierPlan;
    if (!values) {
      return;
    }
    if (action.kind === 'create') {
      await writeJson(apiPost, CARRIERS_PATH, values, true);
    } else if (action.kind === 'update') {
      await writeJson(apiPut, `${CARRIERS_PATH}/${action.id}`, values, false);
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
          title={_('Import carriers')}
          columns={CARRIER_COLUMNS}
          previewColumns={[
            'name',
            'proxyTrunk',
            'mediaRelaySet',
            'transformationRuleSet',
            'calculateCost',
            'currency',
          ]}
          rowLabel={(record) => record.name ?? ''}
          templateFileName='carriers-template.csv'
          templateRecords={[
            {
              name: 'Example carrier',
              description: 'Main outbound carrier',
              proxyTrunk: '192.0.2.10',
              mediaRelaySet: '',
              transformationRuleSet: 'Spain',
              calculateCost: 'no',
              currency: '',
            },
          ]}
          intro={
            <>
              {_(
                'One carrier per row; a row whose Name already exists updates that carrier. Local socket is the socket IP (empty uses the only socket, if there is just one). Media relay set is the set name (empty uses the client’s set). Number transformation is the set’s English name. Currency is its code, e.g. EUR (empty uses the default currency). The carrier balance is not changed.'
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

export default ImportCarriers;
