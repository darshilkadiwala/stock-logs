import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/tw-utils';

export interface PageHeaderProps extends ComponentProps<'div'> {
  heading: ReactNode;
  description?: ReactNode;
}

export function PageHeader({ className, heading, description, children, ...props }: PageHeaderProps) {
  return (
    <header
      data-slot='page-header'
      className={cn('flex flex-col justify-between gap-4 md:flex-row', className)}
      {...props}>
      <div className='flex w-full min-w-0 flex-1 flex-col gap-2'>
        <h1 className='text-xl font-bold tracking-tight lg:text-2xl 2xl:text-3xl'>{heading}</h1>
        {description && <div className='text-muted-foreground mt-1 w-full min-w-0 text-sm'>{description}</div>}
      </div>
      {children}
    </header>
  );
}
