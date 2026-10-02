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
  toPayload,
  writeJson,
} from '../../../components/CsvImport';
import TerminalModel from '../TerminalModel';
import { MODEL_COLUMNS, ModelRow } from './columns';

/**
 * Imports models into the manufacturer whose model list is open.
 * Model Iden and Generic URL Pattern are unique across all manufacturers,
 * so a row that clashes with another manufacturer's model is not imported.
 */
const Import: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const manufacturer = useStoreState((state) => state.list.parentRow);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  if (!manufacturer?.id) {
    return <span className='display-none'></span>;
  }
  const manufacturerId = Number(manufacturer.id);
  const manufacturerName = String(manufacturer.iden ?? manufacturer.name ?? '');

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const [all, mine] = await Promise.all([
      fetchAll<ModelRow>(apiGet, TerminalModel.path),
      fetchAll<ModelRow>(apiGet, TerminalModel.path, {
        terminalManufacturer: manufacturerId,
      }),
    ]);
    const mineByIden = new Map(
      mine.map((row) => [row.iden.toLowerCase(), row.id])
    );
    const allByIden = new Map(all.map((row) => [row.iden.toLowerCase(), row]));
    const urlOwner = new Map(
      all
        .filter((row) => row.genericUrlPattern)
        .map((row) => [String(row.genericUrlPattern).toLowerCase(), row.iden])
    );

    return records.map((record, index): PlannedAction => {
      const row = index + 1;
      const iden = record.iden.toLowerCase();
      const ownId = mineByIden.get(iden);

      if (ownId === undefined && allByIden.has(iden)) {
        return {
          kind: 'error',
          row,
          record,
          message: 'Iden already used by another manufacturer’s model',
        };
      }

      const url = record.genericUrlPattern?.toLowerCase();
      const owner = url ? urlOwner.get(url) : undefined;
      if (owner && owner.toLowerCase() !== iden) {
        return {
          kind: 'error',
          row,
          record,
          message: `Generic URL Pattern already used by model ${owner}`,
        };
      }

      return ownId === undefined
        ? { kind: 'create', row, record }
        : { kind: 'update', row, record, id: ownId };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const values = {
      ...toPayload(action.record, MODEL_COLUMNS),
      terminalManufacturer: manufacturerId,
    };
    if (action.kind === 'create') {
      await writeJson(apiPost, TerminalModel.path, values, true);
    } else if (action.kind === 'update') {
      await writeJson(
        apiPut,
        `${TerminalModel.path}/${action.id}`,
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
              {_('Import terminal models')} · {manufacturerName}
            </>
          }
          columns={MODEL_COLUMNS}
          previewColumns={[
            'iden',
            'name',
            'description',
            'genericUrlPattern',
            'specificUrlPattern',
          ]}
          templateFileName={`terminal-models-${
            manufacturerName || 'template'
          }.csv`}
          templateRecords={[
            {
              iden: 'ExampleModel',
              name: 'Example model',
              description: 'Example terminal model',
              genericUrlPattern: '',
              specificUrlPattern: '',
              genericTemplate: '',
              specificTemplate: '',
            },
          ]}
          intro={
            <>
              {_(
                'One model per row, imported into this manufacturer. A row whose Iden already exists here updates that model. Templates can span several lines inside a quoted cell; exporting an existing manufacturer gives a correctly formatted example.'
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
