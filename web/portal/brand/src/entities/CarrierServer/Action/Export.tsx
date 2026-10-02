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
  fetchOne,
  mapLimit,
  toCsv,
  ToolbarAction,
} from '../../../components/CsvImport';
import CarrierServer from '../CarrierServer';
import { SERVER_COLUMNS, ServerRow, toRecord } from './columns';

const Export: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const carrier = useStoreState((state) => state.list.parentRow);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  if (!carrier?.id) {
    return <span className='display-none'></span>;
  }

  const handleExport = async (): Promise<void> => {
    try {
      const list = await fetchAll<ServerRow>(apiGet, CarrierServer.path, {
        carrier: carrier.id,
      });
      const rows = await mapLimit(list, 4, (row) =>
        fetchOne<ServerRow>(apiGet, `${CarrierServer.path}/${row.id}`)
      );
      downloadCsv(
        `carrier-servers-${String(carrier.name ?? carrier.id)}.csv`,
        toCsv(rows.map(toRecord), SERVER_COLUMNS)
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
