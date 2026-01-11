import { type ComponentProps } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/tw-utils';

import type { ButtonVariantsProps } from './button-variants';
import { buttonVariants } from './button-variants';

interface ButtonProps extends ComponentProps<'button'>, ButtonVariantsProps {
  asChild?: boolean;
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    />
  );
}
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
