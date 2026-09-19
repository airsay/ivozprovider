import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Check, ChevronDown } from 'lucide-react';
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

import { cn } from '../lib/cn';

const controlBase =
  'w-full rounded-[--radius-control] border border-border-strong bg-surface px-3 text-sm text-fg ' +
  'placeholder:text-fg-subtle disabled:cursor-not-allowed disabled:opacity-60 ' +
  'aria-[invalid=true]:border-danger';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input ref={ref} className={cn(controlBase, 'h-9', className)} {...props} />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(controlBase, 'min-h-20 py-2', className)}
      {...props}
    />
  );
});

/**
 * A native select, deliberately.
 *
 * Foreign-key pickers here routinely hold hundreds of options (countries,
 * extensions, DDIs) and the platform select is faster, searchable by typing and
 * accessible for free. The rich combobox is reserved for searchable relations.
 */
export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <div className='relative'>
      <select
        ref={ref}
        className={cn(controlBase, 'h-9 appearance-none pr-9', className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className='pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle'
        aria-hidden
      />
    </div>
  );
});

export const Label = forwardRef<
  HTMLLabelElement,
  LabelPrimitive.LabelProps & { required?: boolean }
>(function Label({ className, children, required, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn('text-sm font-medium text-fg', className)}
      {...props}
    >
      {children}
      {required ? (
        <span className='ml-0.5 text-danger' aria-hidden>
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  );
});

export const Switch = forwardRef<
  HTMLButtonElement,
  SwitchPrimitive.SwitchProps
>(function Switch({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
        'transition-colors data-[state=checked]:bg-brand data-[state=unchecked]:bg-border-strong',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className='pointer-events-none block size-4 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0' />
    </SwitchPrimitive.Root>
  );
});

export const Checkbox = forwardRef<
  HTMLButtonElement,
  CheckboxPrimitive.CheckboxProps
>(function Checkbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'size-4 shrink-0 rounded border border-border-strong bg-surface',
        'data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-brand-contrast',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className='flex items-center justify-center'>
        <Check className='size-3' aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

export interface FieldProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  help?: ReactNode;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
}

/** Label + control + help/error, wired together for screen readers. */
export function Field({
  id,
  label,
  required,
  help,
  error,
  children,
  className,
}: FieldProps): React.JSX.Element {
  const describedBy = error ? `${id}-error` : help ? `${id}-help` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div aria-describedby={describedBy}>{children}</div>
      {error ? (
        <p id={`${id}-error`} role='alert' className='text-xs text-danger'>
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className='text-xs text-fg-muted'>
          {help}
        </p>
      ) : null}
    </div>
  );
}
