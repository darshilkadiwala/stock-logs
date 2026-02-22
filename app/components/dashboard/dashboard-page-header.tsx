import { CircleIcon, PlusIcon } from 'lucide-react';

import { MarketBadge } from '@/components/common/market-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ScrollBar } from '@/components/ui/scroll-area';
import { user } from '@/lib/user';

import { ScrollArea } from '../ui/scroll-area';

export function DashboardPageHeader() {
  const firstName = user.name.split(' ')[0];
  return (
    <PageHeader
      className='md:flex-col lg:flex-row lg:items-center'
      heading={
        <span className='flex items-center gap-4'>
          Welcome back, {firstName}!
          <Badge variant={'outline'} className='bg-muted border-border text-muted-foreground gap-1.5 px-2'>
            <CircleIcon className='text-profit size-2 animate-pulse fill-current' />
            Market is Open
          </Badge>
        </span>
      }
      description={
        <ScrollArea className='h-auto w-full min-w-0 mask-[linear-gradient(to_right,transparent,black_1.5%,black_98.5%,transparent)] *:data-[slot="scroll-area-viewport"]:-mb-3 *:data-[slot="scroll-area-viewport"]:px-0.5 *:data-[slot="scroll-area-viewport"]:pb-3 sm:mask-[linear-gradient(to_right,transparent,black_2.5%,black_97.5%,transparent)] *:md:data-[slot="scroll-area-viewport"]:px-2 lg:mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] *:lg:data-[slot="scroll-area-viewport"]:px-4'>
          <div className='flex w-max gap-2'>
            <MarketBadge label='Nifty' points={116.9} percent={0.41} />
            <MarketBadge label='Sensex' points={316.85} percent={0.275} />
            <MarketBadge label='Nifty IT' points={-315.35} percent={-0.98} />
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      }>
      <div className='mb-auto flex flex-row items-center gap-2'>
        <Button variant='outline' className='grow'>
          View Reports
        </Button>
        <Button className='grow'>
          <PlusIcon className='size-4' />
          Add Trade
        </Button>
      </div>
    </PageHeader>
  );
}
