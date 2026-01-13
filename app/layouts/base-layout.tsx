import { SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/layouts/app-sidebar';
import { SiteHeader } from '@/layouts/site-header';
import { navigationItems } from '@/lib/navigation';
import { NavigationProvider } from '@/providers/navigation-provider';
import { SidebarProvider } from '@/providers/sidebar-provider';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider items={navigationItems}>
      <SidebarProvider style={{ '--header-height': 'calc(var(--spacing) * 12)' } as React.CSSProperties}>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <main className='flex grow flex-col px-5 pt-2 pb-6 md:px-6 lg:px-8 lg:pb-8'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </NavigationProvider>
  );
}
