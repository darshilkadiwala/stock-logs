import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { Separator } from '@/components/ui/separator';

import type { Route } from './+types/dashboard';

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'Dashboard - Stock Logs' },
    { name: 'description', content: 'Your personal stock tracking dashboard' },
  ];
}

export default function Dashboard() {
  return (
    <section className='animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500'>
      <DashboardPageHeader />
      <Separator />
      {/* Summary Cards Grid */}
      <SummaryCards />
    </section>
  );
}
