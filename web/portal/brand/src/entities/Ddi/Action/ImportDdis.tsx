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
import { relationId } from '../../Carrier/Action/csv/columns';
import { firstError, idOf } from '../../Carrier/Action/csv/references';
import { DDI_COLUMNS, DdiRow, NO_ROUTING_TAG, TYPES } from './csv/columns';
import {
  countryKey,
  loadDdiReferences,
  nationalNumber,
  resolveCountry,
  resolveDdiRelations,
  rowKey,
} from './csv/references';

const PATH = '/ddis';

type DdiPlan = PlannedAction & { values?: Record<string, unknown> };

const ImportDdis: ActionFunctionComponent = (
  props: MultiSelectActionItemProps
) => {
  const { variant = 'icon' } = props;
  const [open, setOpen] = useState(false);
  const apiGet = useStoreActions((actions) => actions.api.get);
  const apiPost = useStoreActions((actions) => actions.api.post);
  const apiPut = useStoreActions((actions) => actions.api.put);
  const reload = useStoreActions((actions) => actions.list.reload);

  const plan = async (records: CsvRecord[]): Promise<PlannedAction[]> => {
    const [existing, refs] = await Promise.all([
      fetchAll<DdiRow>(apiGet, PATH),
      loadDdiReferences(apiGet),
    ]);
    const byKey = new Map(existing.map((row) => [rowKey(row), row]));
    const seen = new Map<string, number>();

    return records.map((record, index): DdiPlan => {
      const row = index + 1;
      const fail = (message: string): DdiPlan => ({
        kind: 'error',
        row,
        record,
        message,
      });

      const country = resolveCountry(record.country, refs.countries);
      if (typeof country === 'string') {
        return fail(country);
      }
      const number = nationalNumber(record.ddi, country);
      if ('error' in number) {
        return fail(number.error);
      }

      const key = countryKey(country.id, number.ddi);
      const first = seen.get(key);
      if (first !== undefined) {
        return fail(`Same DDI as row ${first}`);
      }
      seen.set(key, row);

      const resolved = resolveDdiRelations(record, refs);
      const error = firstError(resolved);
      if (error) {
        return fail(error);
      }

      const useProviderTag = !record.routingTag;
      const customNone = NO_ROUTING_TAG.includes(
        (record.routingTag ?? '').toLowerCase()
      );
      const values: Record<string, unknown> = {
        country: country.id,
        ddi: number.ddi,
        type: TYPES[(record.type || 'inout').toLowerCase()],
        ddiProvider: idOf(resolved.ddiProvider),
        description: record.description ?? '',
        useDdiProviderRoutingTag: useProviderTag,
        routingTag:
          useProviderTag || customNone ? null : idOf(resolved.routingTag),
      };
      const companyId = idOf(resolved.company);
      const match = byKey.get(key);

      if (!match) {
        return {
          kind: 'create',
          row,
          record,
          values: { ...values, company: companyId },
        };
      }

      // The domain forbids moving a DDI to another client ("Forbidden ddi
      // client update"); it can only go from no client to a client. An
      // empty cell leaves the current client (PUT only changes sent fields).
      const currentCompany = relationId(match.company);
      if (
        currentCompany !== null &&
        companyId !== null &&
        companyId !== currentCompany
      ) {
        return fail(
          'This DDI belongs to another client; unlink it before assigning it again'
        );
      }
      if (companyId !== null) {
        values.company = companyId;
      }

      return { kind: 'update', row, record, id: match.id, values };
    });
  };

  const save = async (action: PlannedAction): Promise<void> => {
    const { values } = action as DdiPlan;
    if (!values) {
      return;
    }
    if (action.kind === 'create') {
      await writeJson(apiPost, PATH, values, true);
    } else if (action.kind === 'update') {
      await writeJson(apiPut, `${PATH}/${action.id}`, values, false);
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
          title={_('Import DDIs')}
          columns={DDI_COLUMNS}
          previewColumns={[
            'country',
            'ddi',
            'company',
            'type',
            'ddiProvider',
            'description',
            'routingTag',
          ]}
          rowLabel={(record) => `${record.ddi ?? ''} (${record.country ?? ''})`}
          templateFileName='ddis-template.csv'
          templateRecords={[
            {
              country: 'US',
              ddi: '+13605550100',
              company: '',
              type: 'Inbound & outbound',
              ddiProvider: 'Example provider',
              description: '360-555-0100',
              routingTag: '',
            },
          ]}
          intro={
            <>
              {_(
                'One DDI per row; a row whose Country and DDI already exist updates that DDI. Country is the ISO code (e.g. US). DDI is the national number, or the full number with +country code. Client and DDI provider are names; an empty Client leaves the DDI unassigned (or keeps its current client), and a DDI cannot be moved to a different client. Type is Inbound & outbound (default) or Outbound only. Routing tag: empty uses the DDI provider’s tag, "none" sets a custom tag left unassigned, anything else is a tag name or value. Call routing set in the client portal is not changed.'
              )}
            </>
          }
          updateNotice={_(
            'Rows that match an existing DDI replace its number data (type, DDI provider, description, routing tag). An empty Client keeps the current client; call routing set in the client portal is not changed.'
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

export default ImportDdis;
