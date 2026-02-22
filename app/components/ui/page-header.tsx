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
      className={cn('flex flex-col justify-between gap-4 md:flex-row md:items-center', className)}
      {...props}>
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <h1 className='text-xl font-bold tracking-tight lg:text-2xl 2xl:text-3xl'>{heading}</h1>
        {description && <span className='text-muted-foreground mt-1 text-sm'>{description}</span>}
      </div>
      {children}
    </header>
  );
}
