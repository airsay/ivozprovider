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
  toPayload,
  writeJson,
} from '../../../components/CsvImport';
import TerminalManufacturer from '../TerminalManufacturer';
import { MANUFACTURER_COLUMNS, ManufacturerRow } from './columns';

const Import: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const existing = await fetchAll<ManufacturerRow>(
      apiGet,
      TerminalManufacturer.path
    );
    const byIden = new Map(
      existing.map((row) => [row.iden.toLowerCase(), row.id])
    );

    return records.map((record, index) => {
      const id = byIden.get(record.iden.toLowerCase());

      return id === undefined
        ? { kind: 'create', row: index + 1, record }
        : { kind: 'update', row: index + 1, record, id };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const values = toPayload(action.record, MANUFACTURER_COLUMNS);
    if (action.kind === 'create') {
      await writeJson(apiPost, TerminalManufacturer.path, values, true);
    } else if (action.kind === 'update') {
      await writeJson(
        apiPut,
        `${TerminalManufacturer.path}/${action.id}`,
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
          title={_('Import terminal manufacturers')}
          columns={MANUFACTURER_COLUMNS}
          previewColumns={['iden', 'name', 'description']}
          templateFileName='terminal-manufacturers-template.csv'
          templateRecords={[
            {
              iden: 'Yealink',
              name: 'Yealink',
              description: 'Yealink IP phones',
            },
          ]}
          intro={_(
            'One manufacturer per row. A row whose Iden already exists updates that manufacturer.'
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
