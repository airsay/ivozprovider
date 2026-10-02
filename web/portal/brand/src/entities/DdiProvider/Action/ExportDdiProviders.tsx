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
import { relationId } from '../../Carrier/Action/csv/columns';
import { englishName } from '../../Carrier/Action/csv/references';
import { DDI_PROVIDER_COLUMNS, DdiProviderRow } from './csv/columns';
import { loadDdiProviderReferences } from './csv/references';

const ExportDdiProviders: ActionFunctionComponent = (
  props: MultiSelectActionItemProps
) => {
  const { variant = 'icon' } = props;
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  const handleExport = async (): Promise<void> => {
    try {
      const [list, refs] = await Promise.all([
        fetchAll<DdiProviderRow>(apiGet, '/ddi_providers', {
          '_order[name]': 'ASC',
        }),
        loadDdiProviderReferences(apiGet),
      ]);
      // The list response has no media relay set or routing tag.
      const rows = await mapLimit(list, 4, (row) =>
        fetchOne<DdiProviderRow>(apiGet, `/ddi_providers/${row.id}`)
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
        routingTag: label(refs.routingTags, relationId(row.routingTag), (t) =>
          // Names are not unique; use the tag value when the name is shared.
          refs.routingTags.filter((o) => o.name === t.name).length > 1
            ? t.tag
            : t.name
        ),
      }));

      downloadCsv('ddi-providers.csv', toCsv(records, DDI_PROVIDER_COLUMNS));
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

export default ExportDdiProviders;
