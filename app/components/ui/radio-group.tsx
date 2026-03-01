import type { ComponentProps } from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/tw-utils';

interface RadioGroupProps extends ComponentProps<typeof RadioGroupPrimitive.Root> {}

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root data-slot='radio-group' className={cn('grid w-full gap-2', className)} {...props} />;
}

interface RadioGroupItemProps extends ComponentProps<typeof RadioGroupPrimitive.Item> {}

function RadioGroupItem({ className, disabled, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'border-input bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:aria-invalid:border-destructive/50 group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
        className,
      )}
      disabled={disabled}
      data-disabled={disabled}
      {...props}>
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className='flex size-4 items-center justify-center'>
        <span className='bg-primary-foreground absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps };
