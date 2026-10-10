import { EntityList } from '@irontec/ivoz-ui/router/parseRoutes';
import store from 'store';

import { modernizeEntities } from '../components/Redesign/modernTables';

const modules = import.meta.glob(
  [
    './*/*.tsx',
    '!./*/foreignKeyGetter.tsx',
    '!./*/foreignKeyResolver.tsx',
    '!./*/Form.tsx',
    '!./*/View.tsx',
    '!./*/*Properties.tsx',
  ],
  { eager: true }
);
const entities: EntityList = {};

const pathToEntityName = (path: string): string => {
  const fileName = path.split('/').pop() as string;

  return fileName.replace('.tsx', '');
};

for (const relativePath in modules) {
  const entityName = pathToEntityName(relativePath);
  try {
    entities[entityName] = modules[relativePath].default;
  } catch (error) {
    console.error('entityName', error);
  }
}

// Tervian redesign: pills and initials in list tables.
modernizeEntities(entities);

const storeActions = store.getActions();
storeActions.entities.setEntities(entities);

export default entities;
