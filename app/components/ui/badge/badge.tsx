import { type ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/tw-utils';

import { badgeVariants, type BadgeVariantsProps } from './badge-variants';

export interface BadgeProps extends ComponentProps<'span'>, BadgeVariantsProps {
  asChild?: boolean;
}

export function Badge({ className, asChild, variant = 'default', size, shape, disabled, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      data-variant={variant}
      className={cn(badgeVariants({ variant, size, shape, disabled }), className)}
      {...props}
    />
  );
}
