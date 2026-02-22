import { AllocationChart } from '@/components/dashboard/allocation-chart';
import { DashboardPageHeader } from '@/components/dashboard/dashboard-page-header';
import { EarningsAlert } from '@/components/dashboard/earnings-alert';
import { HoldingsTable } from '@/components/dashboard/holdings-table';
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
      {/* Content Split: Table & Allocation */}
      <div className='flex flex-col gap-6 xl:flex-row'>
        {/* Left: Holdings Table */}
        <div className='flex-1'>
          <HoldingsTable />
        </div>
        {/* Right: Allocation Donut & Alerts */}
        <div className='flex w-full shrink-0 flex-col gap-4 xl:w-[320px]'>
          <AllocationChart />
          <EarningsAlert />
        </div>
      </div>
    </section>
  );
}
