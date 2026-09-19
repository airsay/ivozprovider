import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '../lib/cn';

const button = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[--radius-control] ' +
    'font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ' +
    '[&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-contrast hover:bg-brand-hover',
        secondary:
          'bg-surface text-fg border border-border-strong hover:bg-brand-tint',
        ghost: 'text-fg-muted hover:bg-brand-tint hover:text-fg',
        danger: 'bg-danger text-white hover:brightness-95',
        link: 'text-brand underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'size-9',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  /** Render as the child element (a link, say) while keeping button styling. */
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) {
    // Radix's Slot requires exactly one child, so `asChild` cannot also inject a
    // spinner alongside it. That combination is meaningless anyway: an `asChild`
    // button is a link, and links do not have a pending state.
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(button({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(button({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className='animate-spin' aria-hidden /> : null}
        {children}
      </button>
    );
  }
);

export { button as buttonVariants };
