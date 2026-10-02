import {
  ActionFunctionComponent,
  MultiSelectActionItemProps,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import DownloadIcon from '@mui/icons-material/Download';
import { useStoreActions, useStoreState } from 'store';

import {
  downloadCsv,
  fetchAll,
  toCsv,
  ToolbarAction,
} from '../../../components/CsvImport';
import TerminalModel from '../TerminalModel';
import { MODEL_COLUMNS, ModelRow, toRecord } from './columns';

const Export: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const manufacturer = useStoreState((state) => state.list.parentRow);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  if (!manufacturer?.id) {
    return <span className='display-none'></span>;
  }

  const handleExport = async (): Promise<void> => {
    try {
      const rows = await fetchAll<ModelRow>(apiGet, TerminalModel.path, {
        terminalManufacturer: manufacturer.id,
        '_order[iden]': 'ASC',
      });
      const name = String(manufacturer.iden ?? manufacturer.id);
      downloadCsv(
        `terminal-models-${name}.csv`,
        toCsv(rows.map(toRecord), MODEL_COLUMNS)
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
