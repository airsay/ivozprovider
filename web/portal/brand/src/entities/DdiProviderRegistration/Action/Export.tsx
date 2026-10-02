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
import DdiProviderRegistration from '../DdiProviderRegistration';
import {
  REGISTRATION_COLUMNS,
  RegistrationRow,
  toRegistrationRecord,
} from './columns';

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
      const path = DdiProviderRegistration.path;
      const list = await fetchAll<RegistrationRow>(apiGet, path, {
        ddiProvider: provider.id,
      });
      const rows = await mapLimit(list, 4, (row) =>
        fetchOne<RegistrationRow>(apiGet, `${path}/${row.id}`)
      );
      downloadCsv(
        `ddi-provider-registrations-${String(
          provider.name ?? provider.id
        )}.csv`,
        toCsv(rows.map(toRegistrationRecord), REGISTRATION_COLUMNS)
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
