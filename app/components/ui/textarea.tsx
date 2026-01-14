import { type ComponentProps } from 'react';

import { cn } from '@/lib/tw-utils';

import { inputVariants } from './input/input-variants';

interface TextareaProps extends ComponentProps<'textarea'> {}

function Textarea({ className, rows = 3, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(inputVariants({ enableStepper: false }), 'min-h-[60px] resize-y', className)}
      rows={rows}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
