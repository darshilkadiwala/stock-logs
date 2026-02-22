import { CalendarClockIcon, ChartScatterIcon, ListIcon, PresentationIcon, Settings2Icon } from 'lucide-react';

import type { NavigationItem } from '@/providers/navigation-provider';

export const navigationItems: NavigationItem[] = [
  { title: 'Dashboard', url: '/', icon: PresentationIcon },
  { title: 'Orders & History', url: '/orders', icon: ListIcon },
  { title: 'Analytics', url: '/analytics', icon: ChartScatterIcon },
  {
    title: 'Trade History',
    url: '/history',
    icon: CalendarClockIcon,
    children: [
      { title: 'Today', url: '/history/today' },
      { title: 'Week', url: '/history/week' },
      { title: 'Month', url: '/history/month' },
      { title: 'Year', url: '/history/year' },
    ],
  },
  { title: 'Settings', url: '/settings', icon: Settings2Icon },
];
