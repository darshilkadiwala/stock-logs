import { type ReactNode } from 'react';
import { Link } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle-button';
import { useNavigation } from '@/providers/navigation-provider';

export function SiteHeader() {
  const { breadcrumbs } = useNavigation();

  return (
    <header
      className='bg-background sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 rounded-t-xl border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'
      id='main-header'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1 lg:-ml-2' />
        <Separator orientation='vertical' className='mx-px me-2 data-[orientation=vertical]:h-6' />
        {breadcrumbs.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.reduce<ReactNode[]>((acc, crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                if (index > 0) {
                  acc.push(<BreadcrumbSeparator key={`sep-${crumb.url}`} />);
                }
                acc.push(
                  <BreadcrumbItem key={crumb.url}>
                    {isLast ? (
                      <BreadcrumbPage className='flex items-center gap-1.5 font-medium'>
                        {crumb.icon && <crumb.icon className='size-4' />}
                        <span>{crumb.title}</span>
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={crumb.url} className='flex items-center gap-1.5'>
                          {crumb.icon && <crumb.icon className='size-4' />}
                          <span>{crumb.title}</span>
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>,
                );
                return acc;
              }, [])}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <span className='text-base font-medium'>Page</span>
        )}
        <div className='ms-auto flex items-center gap-2'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
