import { type ComponentProps } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/tw-utils';

import type { WithClassName } from '@/types/ui';

import { switchThumbVariants, switchVariants, type SwitchVariantsProps } from './switch-variants';

interface SwitchProps
  extends ComponentProps<typeof SwitchPrimitive.Root>, WithClassName<'thumbClassName'>, SwitchVariantsProps {}

function Switch({ className, size, thumbClassName, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root data-slot='switch' className={cn(switchVariants({ size, className }))} {...props}>
      <SwitchPrimitive.Thumb data-slot='switch-thumb' className={cn(switchThumbVariants({ size }), thumbClassName)} />
    </SwitchPrimitive.Root>
  );
}

export { Switch, type SwitchProps };
