import { CustomActionsType } from '@irontec/ivoz-ui/entities/EntityInterface';

import BalanceOperations from './BalanceOperations';
import ExportCarriers from './ExportCarriers';
import ImportCarriers from './ImportCarriers';

const customAction: CustomActionsType = {
  BalanceOperations: {
    action: BalanceOperations,
    multiselect: false,
  },
  ImportCarriers: {
    action: ImportCarriers,
    global: true,
  },
  ExportCarriers: {
    action: ExportCarriers,
    global: true,
  },
};

export default customAction;
