import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Info,
  Minus,
  TriangleAlert,
} from 'lucide-react';
import type { ComponentType, HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/cn';

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        'rounded-(--radius-surface) border border-border-subtle bg-surface shadow-(--shadow-surface)',
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
        'flex items-center justify-between gap-4 border-b border-border-subtle px-5 py-3.5',
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
    <h2
      className={cn('text-sm font-semibold tracking-tight text-fg', className)}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('px-5 py-4', className)} {...props} />;
}

const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      tone: {
        neutral: 'bg-bg-subtle text-fg-muted ring-border-subtle',
        brand: 'bg-brand-tint text-brand ring-brand/20',
        success: 'bg-success/10 text-success ring-success/20',
        warning: 'bg-warning/10 text-warning ring-warning/20',
        danger: 'bg-danger/10 text-danger ring-danger/20',
        info: 'bg-info/10 text-info ring-info/20',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {
  /** Prefix a status dot in the badge's own colour. */
  dot?: boolean;
}

export function Badge({
  className,
  tone,
  dot = false,
  children,
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <span className={cn(badge({ tone }), className)} {...props}>
      {dot ? (
        <span aria-hidden className='size-1.5 rounded-full bg-current' />
      ) : null}
      {children}
    </span>
  );
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
        'flex items-start gap-3 rounded-(--radius-control) border px-4 py-3 text-sm',
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
        'animate-pulse rounded-(--radius-control) bg-border-subtle',
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

/**
 * Change against the previous period. Direction is carried by an arrow and a
 * sign as well as colour, and `goodWhen` decides which way is green: fewer
 * missed calls is good news.
 */
export function Delta({
  value,
  goodWhen = 'up',
  unit = 'percent',
  className,
}: {
  /** Fractional change, e.g. -0.74 for a 74% drop; null when not comparable. */
  value: number | null;
  goodWhen?: 'up' | 'down' | 'neither';
  /** `percent` for a relative change; `points` for a change in a rate. */
  unit?: 'percent' | 'points';
  className?: string;
}): React.JSX.Element {
  if (value === null || !Number.isFinite(value)) {
    // Nothing to compare with (e.g. none in the previous period): say so.
    return (
      <span className={cn('text-xs text-fg-subtle', className)}>
        <span aria-hidden>—</span>
        <span className='sr-only'>no comparison</span>
      </span>
    );
  }
  const percent = Math.round(Math.abs(value) * 1000) / 10;
  const suffix = unit === 'points' ? ' pts' : '%';
  const flat = percent === 0;
  const up = value > 0;
  const good =
    flat || goodWhen === 'neither' ? null : up === (goodWhen === 'up');
  const Arrow = flat ? Minus : up ? ArrowUp : ArrowDown;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-medium tabular-nums',
        good === null ? 'text-fg-muted' : good ? 'text-success' : 'text-danger',
        className
      )}
    >
      <Arrow className='size-3' aria-hidden />
      <span className='sr-only'>{up ? 'up' : flat ? 'no change' : 'down'}</span>
      {percent}
      {suffix}
    </span>
  );
}

/** A labelled statistic, the building block of every dashboard here. */
export interface StatProps {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  /** Usually a `<Delta>`; shown between the value and the hint. */
  change?: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}

export function Stat({
  label,
  value,
  hint,
  change,
  icon: Icon,
  className,
}: StatProps): React.JSX.Element {
  return (
    <Card className={cn('p-4', className)}>
      <div className='flex items-start gap-3'>
        {Icon ? (
          <div className='grid size-9 shrink-0 place-items-center rounded-(--radius-control) bg-brand-tint-strong text-brand-fg'>
            <Icon className='size-[1.125rem]' />
          </div>
        ) : null}
        <div className='min-w-0 flex-1'>
          <p className='truncate text-[0.8125rem] font-medium text-fg-muted'>
            {label}
          </p>
          <div className='mt-1 text-2xl font-semibold leading-tight tracking-tight tabular-nums text-fg'>
            {value}
          </div>
          {change ? <div className='mt-1'>{change}</div> : null}
          {hint ? (
            <div className='mt-0.5 text-[0.6875rem] leading-snug text-fg-subtle'>
              {hint}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
}

/** A one-of-N toggle, e.g. a date range. */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
  className,
}: {
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
  label: string;
  className?: string;
}): React.JSX.Element {
  return (
    <div
      role='group'
      aria-label={label}
      className={cn(
        'inline-flex rounded-(--radius-control) border border-border-subtle bg-surface p-1',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-[calc(var(--radius-control)-3px)] px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
            value === option.value
              ? 'bg-brand text-brand-contrast shadow-(--shadow-button)'
              : 'text-fg-muted hover:text-fg'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
