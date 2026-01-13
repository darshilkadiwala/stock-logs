import { Link } from 'react-router';

import {
  CalendarClockIcon,
  ChartScatterIcon,
  ChartSplineIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon,
  PresentationIcon,
  Settings2Icon,
} from 'lucide-react';

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
  SidebarSeparator,
} from '@/components/ui/sidebar';

const mainNavigation = [
  { title: 'Dashboard', url: '/', icon: PresentationIcon },
  { title: 'Analytics', url: '/analytics', icon: ChartScatterIcon },
  { title: 'Trade History', url: '/history', icon: CalendarClockIcon },
  { title: 'Settings', url: '/settings', icon: Settings2Icon },
];

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};

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
                  className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground justify-start'
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
