import { CustomActionsType } from '@irontec/ivoz-ui/entities/EntityInterface';

import ExportDdis from './ExportDdis';
import ImportDdis from './ImportDdis';
import UnlinkDdi from './UnlinkDdi';

const customAction: CustomActionsType = {
  UnlinkDdi: {
    action: UnlinkDdi,
    multiselect: true,
  },
  ImportDdis: {
    action: ImportDdis,
    global: true,
  },
  ExportDdis: {
    action: ExportDdis,
    global: true,
  },
};

export default customAction;
