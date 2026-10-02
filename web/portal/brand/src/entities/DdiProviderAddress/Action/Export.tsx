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
import DdiProviderAddress from '../DdiProviderAddress';
import { ADDRESS_COLUMNS, AddressRow, toAddressRecord } from './columns';

const Export: ActionFunctionComponent = (props: MultiSelectActionItemProps) => {
  const { variant = 'icon' } = props;
  const provider = useStoreState((state) => state.list.parentRow);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  if (!provider?.id) {
    return <span className='display-none'></span>;
  }

  const handleExport = async (): Promise<void> => {
    try {
      const rows = await fetchAll<AddressRow>(apiGet, DdiProviderAddress.path, {
        ddiProvider: provider.id,
      });
      downloadCsv(
        `ddi-provider-addresses-${String(provider.name ?? provider.id)}.csv`,
        toCsv(rows.map(toAddressRecord), ADDRESS_COLUMNS)
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
