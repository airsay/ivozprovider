import { CustomActionsType } from '@irontec/ivoz-ui/entities/EntityInterface';

import Impersonate from './Impersonate';
import ImportUsers from './ImportUsers';

const customAction: CustomActionsType = {
  Impersonate: {
    action: Impersonate,
  },
  ImportUsers: {
    action: ImportUsers,
  },
};

export default customAction;
