import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

import { cn } from '../lib/cn';

/**
 * Table primitives.
 *
 * The horizontal scroll lives on the wrapper, never on the page: entity lists
 * here can run to a dozen columns and the shell must not slide sideways.
 */
export function TableWrapper({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('w-full overflow-x-auto', className)} {...props} />;
}

export function Table({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>): React.JSX.Element {
  return (
    <table
      className={cn('w-full caption-bottom border-collapse text-sm', className)}
      {...props}
    />
  );
}

export function THead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element {
  return (
    <thead
      className={cn('border-b border-border-subtle bg-bg-subtle', className)}
      {...props}
    />
  );
}

export function TBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  );
}

export function TR({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>): React.JSX.Element {
  return (
    <tr
      className={cn(
        'border-b border-border-subtle transition-colors hover:bg-bg-subtle',
        className
      )}
      {...props}
    />
  );
}

export function TH({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return (
    <th
      className={cn(
        'h-10 px-4 text-left text-xs font-medium text-fg-muted [&_button]:font-medium',
        className
      )}
      {...props}
    />
  );
}

export function TD({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return (
    <td
      className={cn('h-12 px-4 align-middle text-fg', className)}
      {...props}
    />
  );
}
