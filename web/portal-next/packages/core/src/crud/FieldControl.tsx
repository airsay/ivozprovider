import { useTranslation } from 'react-i18next';

import type { FieldControlProps } from '../descriptor/types';
import { useRelationOptions } from '../runtime/hooks';
import { Input, Select, Switch, Textarea } from '../ui';

/**
 * Renders the write control for one resolved field.
 *
 * Dispatch order matches the old `FormFieldFactory` so migrated entities keep
 * the control they had: an explicit component wins, then a declared widget,
 * then whatever the spec plus descriptor overrides imply.
 */
export function FieldControl(props: FieldControlProps): React.JSX.Element {
  const { field, value, onChange, onBlur, disabled, name, error } = props;
  const { t } = useTranslation();

  if (field.Control) {
    const Custom = field.Control;
    return <Custom {...props} />;
  }

  const invalid = error !== undefined;
  const common = {
    id: name,
    name,
    disabled: disabled || field.readOnly,
    onBlur,
    'aria-invalid': invalid,
  };

  switch (field.widget) {
    case 'boolean':
      return (
        <Switch
          checked={value === true}
          onCheckedChange={(checked) => onChange(checked)}
          disabled={common.disabled}
          id={name}
          name={name}
        />
      );

    case 'select':
      return (
        <Select
          {...common}
          value={value === null || value === undefined ? '' : String(value)}
          onChange={(event) =>
            onChange(event.target.value === '' ? null : event.target.value)
          }
        >
          {/* An unset enum is meaningful here — "Hang up", "Unassigned". */}
          {!field.required || value === null ? (
            <option value=''>{field.nullLabel ?? t('Not set')}</option>
          ) : null}
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );

    case 'reference':
      return <ReferenceControl {...props} />;

    case 'textarea':
      return (
        <Textarea
          {...common}
          value={value === null || value === undefined ? '' : String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      );

    case 'number':
      return (
        <Input
          {...common}
          type='number'
          value={value === null || value === undefined ? '' : String(value)}
          onChange={(event) =>
            onChange(
              event.target.value === '' ? null : Number(event.target.value)
            )
          }
          {...(field.meta.minimum !== undefined
            ? { min: field.meta.minimum }
            : {})}
          {...(field.meta.maximum !== undefined
            ? { max: field.meta.maximum }
            : {})}
        />
      );

    case 'password':
      return (
        <Input
          {...common}
          type='password'
          autoComplete='new-password'
          value={value === null || value === undefined ? '' : String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      );

    case 'date':
    case 'datetime':
    case 'time': {
      const type =
        field.widget === 'date'
          ? 'date'
          : field.widget === 'time'
            ? 'time'
            : 'datetime-local';
      return (
        <Input
          {...common}
          type={type}
          value={toInputDateTime(value, field.widget)}
          onChange={(event) =>
            onChange(event.target.value === '' ? null : event.target.value)
          }
        />
      );
    }

    case 'color':
      return (
        <Input
          {...common}
          type='color'
          className='h-9 w-16 p-1'
          value={typeof value === 'string' && value ? value : '#000000'}
          onChange={(event) => onChange(event.target.value)}
        />
      );

    case 'file':
      return (
        <Input
          {...common}
          type='file'
          className='h-auto py-1.5 file:mr-3 file:rounded file:border-0 file:bg-brand-tint file:px-3 file:py-1 file:text-sm file:text-brand'
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
      );

    default:
      return (
        <Input
          {...common}
          type='text'
          value={value === null || value === undefined ? '' : String(value)}
          onChange={(event) => onChange(event.target.value)}
          {...(field.meta.maxLength !== undefined
            ? { maxLength: field.meta.maxLength }
            : {})}
        />
      );
  }
}

function ReferenceControl({
  field,
  value,
  onChange,
  disabled,
  name,
  error,
}: FieldControlProps): React.JSX.Element {
  const { t } = useTranslation();
  const { data: options, isPending } = useRelationOptions(field.relation);

  return (
    <Select
      id={name}
      name={name}
      aria-invalid={error !== undefined}
      disabled={disabled || field.readOnly || isPending}
      value={value === null || value === undefined ? '' : String(value)}
      onChange={(event) =>
        onChange(event.target.value === '' ? null : Number(event.target.value))
      }
    >
      <option value=''>
        {isPending ? t('Loading…') : (field.nullLabel ?? t('Not set'))}
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

/** `2026-09-18T10:30:00+02:00` -> the value an `<input type=datetime-local>` wants. */
function toInputDateTime(
  value: unknown,
  widget: 'date' | 'datetime' | 'time'
): string {
  if (typeof value !== 'string' || value === '') return '';
  if (widget === 'time') return value.slice(0, 5);
  if (widget === 'date') return value.slice(0, 10);
  return value.slice(0, 16);
}
