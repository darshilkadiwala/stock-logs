import { type ComponentProps } from 'react';

import { cn } from '@/lib/tw-utils';

import { inputVariants, type InputVariantProps } from './input-variants';

interface InputProps extends ComponentProps<'input'>, InputVariantProps {}

function Input({ className, type, enableStepper, noRing, noPadding, noBorder, noOutline, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(inputVariants({ enableStepper, noRing, noPadding, noBorder, noOutline }), className)}
      aria-required={props.required}
      aria-disabled={props.disabled}
      {...props}
    />
  );
}

export { Input, type InputProps };
