import { type ComponentProps } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tw-utils';

function TooltipProvider({ delayDuration = 0, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />;
}

function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

const tooltipVariants = cva(
  'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs leading-5 text-balance will-change-[transform,opacity]',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'bg-background text-foreground border shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface TooltipContentProps
  extends ComponentProps<typeof TooltipPrimitive.Content>, VariantProps<typeof tooltipVariants> {}

function TooltipContent({ className, variant, sideOffset = 0, children, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(tooltipVariants({ variant }), className)}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow
          className={cn(
            'z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]',
            (!variant || variant === 'default') && 'bg-foreground fill-foreground',
            variant === 'secondary' && 'bg-secondary fill-secondary',
            variant === 'destructive' && 'bg-destructive fill-destructive',
            variant === 'outline' && 'bg-background fill-background border-r border-b',
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, tooltipVariants };
