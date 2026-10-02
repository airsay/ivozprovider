import { CustomActionsType } from '@irontec/ivoz-ui/entities/EntityInterface';

import ExportDdiProviders from './ExportDdiProviders';
import ImportDdiProviders from './ImportDdiProviders';

const customActions: CustomActionsType = {
  ImportDdiProviders: {
    action: ImportDdiProviders,
    global: true,
  },
  ExportDdiProviders: {
    action: ExportDdiProviders,
    global: true,
  },
};

export default customActions;
