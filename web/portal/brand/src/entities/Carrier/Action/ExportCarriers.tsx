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
  fetchOne,
  mapLimit,
  toCsv,
  ToolbarAction,
} from '../../../components/CsvImport';
import { CARRIER_COLUMNS, CarrierRow, relationId } from './csv/columns';
import { englishName, loadCarrierReferences } from './csv/references';

const ExportCarriers: ActionFunctionComponent = (
  props: MultiSelectActionItemProps
) => {
  const { variant = 'icon' } = props;
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  const handleExport = async (): Promise<void> => {
    try {
      const [list, refs] = await Promise.all([
        fetchAll<CarrierRow>(apiGet, '/carriers', { '_order[name]': 'ASC' }),
        loadCarrierReferences(apiGet),
      ]);
      // The list response has no currency or media relay set; read each item.
      const rows = await mapLimit(list, 4, (row) =>
        fetchOne<CarrierRow>(apiGet, `/carriers/${row.id}`)
      );

      const label = <T extends { id: number }>(
        items: T[],
        id: number | null,
        pick: (item: T) => string
      ): string => {
        const item = id === null ? undefined : items.find((i) => i.id === id);

        return item ? pick(item) : '';
      };

      const records = rows.map((row) => ({
        name: row.name ?? '',
        description: row.description ?? '',
        proxyTrunk: label(
          refs.proxyTrunks,
          relationId(row.proxyTrunk),
          (t) => t.ip
        ),
        mediaRelaySet: label(
          refs.mediaRelaySets,
          relationId(row.mediaRelaySet),
          (m) => m.name
        ),
        transformationRuleSet: label(
          refs.ruleSets,
          relationId(row.transformationRuleSet),
          englishName
        ),
        calculateCost: row.calculateCost ? 'yes' : 'no',
        currency: label(
          refs.currencies,
          relationId(row.currency),
          (c) => c.iden
        ),
      }));

      downloadCsv('carriers.csv', toCsv(records, CARRIER_COLUMNS));
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

export default ExportCarriers;
