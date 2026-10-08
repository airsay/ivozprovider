import { DropdownChoices, EntityValues } from '@irontec/ivoz-ui';
import defaultEntityBehavior from '@irontec/ivoz-ui/entities/DefaultEntityBehavior';
import { SelectOptionsType } from '@irontec/ivoz-ui/entities/EntityInterface';
import store from 'store';

const selectOptions: SelectOptionsType = ({
  callback,
  cancelToken,
}): Promise<unknown> => {
  const entities = store.getState().entities.entities;
  const Timezone = entities.Timezone;

  return defaultEntityBehavior.fetchFks(
    Timezone.path,
    ['id', 'tz'],
    (data: Array<EntityValues>) => {
      // An array keeps the order; an object keyed by id would be re-sorted
      // by id (numeric keys), which is why the list looked unsorted.
      const options: DropdownChoices = data
        .map((item) => ({ id: item.id as number, label: String(item.tz) }))
        .sort((a, b) => a.label.localeCompare(b.label));

      callback(options);
    },
    cancelToken
  );
};

export default selectOptions;
