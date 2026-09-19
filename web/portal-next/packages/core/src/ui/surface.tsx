import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import type { ComponentType, HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/cn';

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        'rounded-[--radius-surface] border border-border-subtle bg-surface shadow-[var(--shadow-surface)]',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4',
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>): React.JSX.Element {
  return (
    <h2 className={cn('text-sm font-semibold text-fg', className)} {...props} />
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('px-5 py-4', className)} {...props} />;
}

const badge = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      tone: {
        neutral: 'bg-brand-tint text-fg-muted',
        brand: 'bg-brand-tint-strong text-brand',
        success: 'bg-success/12 text-success',
        warning: 'bg-warning/12 text-warning',
        danger: 'bg-danger/12 text-danger',
        info: 'bg-info/12 text-info',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {}

export function Badge({
  className,
  tone,
  ...props
}: BadgeProps): React.JSX.Element {
  return <span className={cn(badge({ tone }), className)} {...props} />;
}

const ALERT_ICON = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
} as const;

export interface AlertProps {
  tone?: keyof typeof ALERT_ICON;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Alert({
  tone = 'info',
  title,
  children,
  className,
}: AlertProps): React.JSX.Element {
  const Icon = ALERT_ICON[tone];
  const toneClass = {
    info: 'border-info/30 bg-info/8 text-info',
    success: 'border-success/30 bg-success/8 text-success',
    warning: 'border-warning/30 bg-warning/8 text-warning',
    danger: 'border-danger/30 bg-danger/8 text-danger',
  }[tone];

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-[--radius-control] border px-4 py-3 text-sm',
        toneClass,
        className
      )}
    >
      <Icon className='mt-0.5 size-4 shrink-0' aria-hidden />
      <div className='min-w-0 flex-1 text-fg'>
        {title ? <p className='font-medium'>{title}</p> : null}
        {children ? <div className='text-fg-muted'>{children}</div> : null}
      </div>
    </div>
  );
}

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-pulse rounded-[--radius-control] bg-border-subtle',
        className
      )}
      {...props}
    />
  );
}

export interface EmptyStateProps {
  icon?: ComponentType<{ className?: string }>;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-14 text-center',
        className
      )}
    >
      {Icon ? (
        <div className='rounded-full bg-brand-tint p-3'>
          <Icon className='size-6 text-brand' />
        </div>
      ) : null}
      <div className='space-y-1'>
        <p className='text-sm font-medium text-fg'>{title}</p>
        {description ? (
          <p className='text-sm text-fg-muted'>{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/** A labelled statistic, the building block of every dashboard here. */
export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}

export function Stat({
  label,
  value,
  hint,
  icon: Icon,
  className,
}: StatProps): React.JSX.Element {
  return (
    <Card className={cn('p-5', className)}>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <p className='text-xs font-medium uppercase leading-tight tracking-wide text-fg-subtle'>
            {label}
          </p>
          <p className='mt-2 text-3xl font-semibold tabular-nums text-fg'>
            {value}
          </p>
          {hint ? <p className='mt-1 text-xs text-fg-muted'>{hint}</p> : null}
        </div>
        {Icon ? (
          <div className='rounded-[--radius-control] bg-brand-tint p-2'>
            <Icon className='size-5 text-brand' />
          </div>
        ) : null}
      </div>
    </Card>
  );
}
