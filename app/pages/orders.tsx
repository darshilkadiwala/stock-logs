import { OrdersFilter } from '@/components/orders/orders-filter';
import { OrdersTable } from '@/components/orders/orders-table';
import { PageHeader } from '@/components/ui/page-header';
import { ordersHistory } from '@/lib/dummy-data';

import type { Route } from './+types/orders';

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'Orders & History - Stock Logs' },
    { name: 'description', content: 'View and manage your historical transactions' },
  ];
}

export default function OrdersPage() {
  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 mx-auto flex w-full max-w-350 flex-col gap-8 duration-500'>
      <PageHeader
        heading='Orders & History'
        description='View and manage your historical transactions and order status.'>
        <div>{ordersHistory.length} total transactions found</div>
      </PageHeader>

      {/* Filter & Control Bar */}
      <OrdersFilter />

      {/* Data Table */}
      <OrdersTable />
    </div>
  );
}
