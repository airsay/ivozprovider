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
import Currency from '../Currency';
import { CURRENCY_COLUMNS, CurrencyRow, toCurrencyPayload } from './columns';

const Import: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const existing = await fetchAll<CurrencyRow>(apiGet, Currency.path);
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
    const values = toCurrencyPayload(action.record);
    if (action.kind === 'create') {
      await writeJson(apiPost, Currency.path, values, true);
    } else if (action.kind === 'update') {
      await writeJson(apiPut, `${Currency.path}/${action.id}`, values, false);
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
          title={_('Import currencies')}
          columns={CURRENCY_COLUMNS}
          previewColumns={['iden', 'symbol', 'name_en', 'name_es']}
          templateFileName='currencies-template.csv'
          templateRecords={[
            {
              iden: 'EUR',
              symbol: '€',
              name_en: 'Euro',
              name_es: 'Euro',
              name_ca: 'Euro',
              name_it: 'Euro',
              name_eu: 'Euroa',
            },
          ]}
          intro={_(
            'One currency per row. A row whose Iden already exists updates that currency. Name columns hold the currency name in each portal language.'
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
