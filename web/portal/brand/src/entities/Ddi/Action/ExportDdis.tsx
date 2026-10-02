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
import { DDI_COLUMNS, DdiRow, TYPE_LABELS } from './csv/columns';
import { loadDdiReferences } from './csv/references';

const ExportDdis: ActionFunctionComponent = (
  props: MultiSelectActionItemProps
) => {
  const { variant = 'icon' } = props;
  const apiGet = useStoreActions((actions) => actions.api.get);
  const setErrorMsg = useStoreActions((actions) => actions.api.setErrorMsg);

  const handleExport = async (): Promise<void> => {
    try {
      const [list, refs] = await Promise.all([
        fetchAll<DdiRow>(apiGet, '/ddis', { '_order[ddie164]': 'ASC' }),
        loadDdiReferences(apiGet),
      ]);
      // The list response has no type or routing tag; read each item.
      const rows = await mapLimit(list, 6, (row) =>
        fetchOne<DdiRow>(apiGet, `/ddis/${row.id}`)
      );

      const find = <T extends { id: number }>(
        items: T[],
        value: DdiRow['company']
      ): T | undefined => {
        const id = relationId(value);

        return id === null ? undefined : items.find((i) => i.id === id);
      };

      const records = rows.map((row) => {
        const tag = find(refs.routingTags, row.routingTag);

        return {
          country: find(refs.countries, row.country)?.code ?? '',
          ddi: row.ddie164 ?? row.ddi,
          company: find(refs.companies, row.company)?.name ?? '',
          type: TYPE_LABELS[row.type ?? 'inout'],
          ddiProvider: find(refs.providers, row.ddiProvider)?.name ?? '',
          description: row.description ?? '',
          routingTag: row.useDdiProviderRoutingTag
            ? ''
            : !tag
            ? 'none'
            : // Names are not unique; use the tag value when the name is
            // shared so the file imports back to the same tag.
            refs.routingTags.filter((t) => t.name === tag.name).length > 1
            ? tag.tag
            : tag.name,
        };
      });

      downloadCsv('ddis.csv', toCsv(records, DDI_COLUMNS));
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

export default ExportDdis;
