import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { X } from 'lucide-react';
import { forwardRef, type ReactNode } from 'react';

import { cn } from '../lib/cn';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export interface DialogPanelProps extends Omit<
  DialogPrimitive.DialogContentProps,
  'title'
> {
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const DialogPanel = forwardRef<HTMLDivElement, DialogPanelProps>(
  function DialogPanel(
    { title, description, footer, children, className, size = 'md', ...props },
    ref
  ) {
    const width = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-3xl' }[size];

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]' />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2',
            'rounded-[--radius-surface] border border-border-subtle bg-surface shadow-[var(--shadow-raised)]',
            width,
            className
          )}
          {...props}
        >
          <div className='flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4'>
            <div className='min-w-0'>
              <DialogPrimitive.Title className='text-sm font-semibold text-fg'>
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className='mt-1 text-sm text-fg-muted'>
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close
              className='rounded-[--radius-control] p-1 text-fg-subtle hover:bg-brand-tint hover:text-fg'
              aria-label='Close'
            >
              <X className='size-4' />
            </DialogPrimitive.Close>
          </div>

          <div className='max-h-[70vh] overflow-y-auto px-5 py-4'>
            {children}
          </div>

          {footer ? (
            <div className='flex justify-end gap-2 border-t border-border-subtle px-5 py-3'>
              {footer}
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownPrimitive.DropdownMenuContentProps
>(function DropdownMenuContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-44 overflow-hidden rounded-[--radius-control] border border-border-subtle',
          'bg-surface-raised p-1 shadow-[var(--shadow-raised)]',
          className
        )}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
});

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownPrimitive.DropdownMenuItemProps & { danger?: boolean }
>(function DropdownMenuItem({ className, danger, ...props }, ref) {
  return (
    <DropdownPrimitive.Item
      ref={ref}
      className={cn(
        'flex cursor-pointer select-none items-center gap-2 rounded-[calc(var(--radius-control)-2px)] px-2.5 py-1.5 text-sm',
        'outline-none data-[highlighted]:bg-brand-tint data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        danger ? 'text-danger data-[highlighted]:bg-danger/10' : 'text-fg',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        className
      )}
      {...props}
    />
  );
});

export const DropdownMenuSeparator = DropdownPrimitive.Separator;
export const DropdownMenuLabel = DropdownPrimitive.Label;

export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={6}
          className='z-50 rounded-[calc(var(--radius-control)-2px)] bg-fg px-2 py-1 text-xs text-bg shadow-[var(--shadow-raised)]'
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
