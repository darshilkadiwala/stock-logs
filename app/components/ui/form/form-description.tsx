import type { HTMLAttributes, JSX, Ref } from 'react';

import { cn } from '@/lib/tw-utils';

interface FormDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

function FormDescription({ className, children, ref, ...props }: FormDescriptionProps): JSX.Element | null {
  if (!children) return null;

  return (
    <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props}>
      {children}
    </p>
  );
}

export { FormDescription };
export type { FormDescriptionProps };
