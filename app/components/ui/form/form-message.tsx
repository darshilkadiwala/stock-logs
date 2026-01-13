import type { ComponentProps, JSX } from 'react';

import type { FieldError } from 'react-hook-form';

import { cn } from '@/lib/tw-utils';

interface FormMessageProps extends ComponentProps<'p'> {
  error?: FieldError;
}

function FormMessage({ className, error, ref, ...props }: FormMessageProps): JSX.Element | null {
  if (!error) return null;
  return (
    <p ref={ref} className={cn('text-destructive text-sm font-medium', className)} {...props}>
      {error.message}
    </p>
  );
}

export { FormMessage, type FormMessageProps };
