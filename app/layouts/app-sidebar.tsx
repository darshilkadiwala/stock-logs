import { Link } from 'react-router';

import { ChartSplineIcon, EllipsisVerticalIcon, PlusCircleIcon } from 'lucide-react';

import { MarketHoursClock } from '@/components/market-hours-clock';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { navigationItems } from '@/lib/navigation';
import { user } from '@/lib/user';
import { useNavigation, type NavigationItem } from '@/providers/navigation-provider';

function NavigationMenuItem({ item }: { item: NavigationItem }) {
  const { isActive } = useNavigation();
  const active = isActive(item.url);

  // Resolve parent URL for nested items (needed for relative child URLs)
  // Use the same resolution logic: relative URLs resolve relative to root
  const parentResolvedUrl = item.url.startsWith('/') ? item.url : `/${item.url}`;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={item.title} isActive={active} asChild>
        <Link to={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.children && item.children.length > 0 && (
        <SidebarMenuSub>
          {item.children.map((child) => (
            <SidebarMenuSubItem key={child.url}>
              <SidebarMenuSubButton isActive={isActive(child.url, parentResolvedUrl)} asChild>
                <Link to={child.url}>
                  {child.icon && <child.icon />}
                  <span>{child.title}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to='/'>
                <ChartSplineIcon className='size-5' />
                <span className='font-semibold'>Stock Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={'Add Trade'}
                  className='bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground active:bg-sidebar-primary/90 active:text-sidebar-primary-foreground justify-start'
                  asChild>
                  <Link to={{ search: '?dialog=add-trade' }}>
                    <PlusCircleIcon className='size-5' />
                    <span>Add Trade</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className='-mt-2'>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <MarketHoursClock />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='h-auto' tooltip={'My Account'}>
              <span className='grid flex-1 truncate text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='text-muted-foreground truncate text-xs'>{user.email}</span>
              </span>
              <EllipsisVerticalIcon className='ms-auto' />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
