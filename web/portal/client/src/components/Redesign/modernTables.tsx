import { EntityValues } from '@irontec/ivoz-ui';
import EntityInterface, {
  foreignKeyResolverType,
  ListDecoratorPropsType,
  ListDecoratorType,
} from '@irontec/ivoz-ui/entities/EntityInterface';
import {
  isPropertyScalar,
  PropertySpec,
} from '@irontec/ivoz-ui/services/api/ParsedApiSpecInterface';

import { Pill, Tone, Who } from './DashboardKit';

/**
 * Livelier list tables, applied to every entity of a portal without touching
 * the entity files (call modernizeEntities() from src/entities/index.ts):
 *
 *  - multi-value relations (features, proxy trunks, codecs…) show as pills
 *    instead of a comma-separated string;
 *  - choice fields (enums: billing method, type, status…) show as pills;
 *  - the "name" column gets an initials badge.
 *
 * ivoz-ui's generic resolver turns a multi-value relation into
 * "A, B, C" (genericForeignKeyResolver), and lists render that value as is.
 * The wrapped resolver below swaps the string for a pill list once the
 * entity's own resolver has run.
 */

const PILL_LIMIT = 3;

function PillList(props: { items: string[] }): JSX.Element {
  const { items } = props;
  const shown = items.slice(0, PILL_LIMIT);
  const hidden = items.length - shown.length;

  return (
    <span className='rd-pill-list' title={items.join(', ')}>
      {shown.map((item) => (
        <Pill key={item} tone='violet'>
          {item}
        </Pill>
      ))}
      {hidden > 0 && <span className='rd-pill-more'>+{hidden}</span>}
    </span>
  );
}

type AnyProperty = PropertySpec & { type?: string; $ref?: string };

function isMultiRelation(property: AnyProperty | undefined): boolean {
  return Boolean(property && property.type === 'array' && property.$ref);
}

function pillify(
  rows: EntityValues[],
  properties: Record<string, AnyProperty>
) {
  const fields = Object.keys(properties).filter((name) =>
    isMultiRelation(properties[name])
  );
  if (!fields.length) {
    return;
  }
  for (const row of rows) {
    for (const field of fields) {
      const value = row[field];
      if (typeof value !== 'string' || value === '') {
        continue;
      }
      const items = value
        .split(', ')
        .map((item) => item.trim())
        .filter(Boolean);
      (row as Record<string, unknown>)[field] = <PillList items={items} />;
    }
  }
}

/** Raw values that read as "on" / "off" for colouring enum pills. */
const ON = new Set(['1', 'true', 'yes', 'enabled', 'active', 'on']);
const OFF = new Set(['0', 'false', 'no', 'disabled', 'inactive', 'off']);

function toneFor(raw: unknown): Tone {
  const key = String(raw).toLowerCase();
  if (ON.has(key)) {
    return 'emerald';
  }
  if (OFF.has(key)) {
    return 'grey';
  }

  return 'sky';
}

function modernDecorator(Original: ListDecoratorType): ListDecoratorType {
  const Decorator: ListDecoratorType = (props: ListDecoratorPropsType) => {
    const { field, row, property } = props;
    const spec = property as AnyProperty & {
      component?: unknown;
      multilang?: boolean;
    };
    const plain = <Original {...props} />;

    if (spec.component || spec.multilang || spec.type === 'file') {
      return plain;
    }

    const raw = field.includes('.') ? undefined : row?.[field];
    const empty = raw === null || raw === undefined || raw === '';

    if (isPropertyScalar(property) && property.enum && !empty) {
      return <Pill tone={toneFor(raw)}>{plain}</Pill>;
    }

    if (
      field === 'name' &&
      typeof raw === 'string' &&
      raw &&
      props.entityPath
    ) {
      return <Who name={raw} />;
    }

    return plain;
  };

  return Decorator;
}

function modernResolver(
  load: EntityInterface['foreignKeyResolver']
): EntityInterface['foreignKeyResolver'] {
  return async () => {
    const resolver: foreignKeyResolverType = await load();

    return async (props) => {
      const data = await resolver(props);
      if (Array.isArray(data)) {
        const properties = (props.entityService?.getProperties() ??
          {}) as Record<string, AnyProperty>;
        pillify(data as EntityValues[], properties);
      }

      return data;
    };
  };
}

const MODERN = Symbol('rd-modern');

export function modernizeEntities(
  entities: Record<string, EntityInterface>
): void {
  for (const entity of Object.values(entities)) {
    const marked = entity as EntityInterface & { [MODERN]?: boolean };
    if (!entity || marked[MODERN]) {
      continue;
    }
    if (typeof entity.foreignKeyResolver === 'function') {
      entity.foreignKeyResolver = modernResolver(entity.foreignKeyResolver);
    }
    if (entity.ListDecorator) {
      entity.ListDecorator = modernDecorator(entity.ListDecorator);
    }
    marked[MODERN] = true;
  }
}
