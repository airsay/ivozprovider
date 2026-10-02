import {
  ActionFunctionComponent,
  MultiSelectActionItemProps,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import DownloadIcon from '@mui/icons-material/Download';
import { useStoreActions } from 'store';

import {
  downloadCsv,
  fetchAll,
  toCsv,
  ToolbarAction,
} from '../../../components/CsvImport';
import Currency from '../Currency';
import { CURRENCY_COLUMNS, CurrencyRow, toRecord } from './columns';

const Export: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  const handleExport = async (): Promise<void> => {
    try {
      const rows = await fetchAll<CurrencyRow>(apiGet, Currency.path, {
        '_order[iden]': 'ASC',
      });
      downloadCsv(
        'currencies.csv',
        toCsv(rows.map(toRecord), CURRENCY_COLUMNS)
      );
    } catch (error) {
      setErrorMsg(String((error as Error).message));
    }
  };

  return (
    <ToolbarAction
      variant={variant}
      label={_('Export CSV')}
      icon={<DownloadIcon />}
      onClick={handleExport}
    />
  );
};

export default Export;
