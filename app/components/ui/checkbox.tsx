import { type ComponentProps } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';

import { cn } from '@/lib/tw-utils';

function Checkbox({ className, checked, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  const Icon = checked === 'indeterminate' ? MinusIcon : CheckIcon;
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      checked={checked}
      className={cn(
        'peer border-input dark:bg-input/30 size-4 shrink-0 rounded-sm border shadow transition-shadow outline-none',
        'data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary text-primary-foreground data-[state=checked]:border-primary',
        'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive aria-invalid:border-destructive aria-invalid:text-destructive-foreground',
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='grid place-content-center text-current transition-none'>
        <Icon className='size-3.5' strokeWidth={3} data-checkbox-icon={checked} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
