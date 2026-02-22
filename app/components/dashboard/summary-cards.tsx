import { Badge } from '@/components/ui/badge/badge';
import { Card, CardContent } from '@/components/ui/card';
import { summaryMetrics } from '@/lib/dummy-data';
import { cn } from '@/lib/tw-utils';

export function SummaryCards() {
  return (
    <div className='flex flex-col gap-2'>
      {/* Your Investment heading */}
      <span className='text-foreground text-2xl font-semibold tracking-tight tabular-nums'>Your Investment</span>
      <div className='grid grid-cols-[repeat(4,minmax(200px,25%))] gap-4 overflow-hidden overflow-x-auto'>
        {/* Card 1: Total Investment */}
        <Card className='hover:border-profit max-h-24 justify-center transition-colors'>
          <CardContent className='flex flex-col gap-1 p-5 pb-5'>
            <p className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>Total Investment</p>
            <p className='text-foreground text-2xl font-semibold tracking-tight tabular-nums'>
              {summaryMetrics.totalInvestment}
            </p>
          </CardContent>
        </Card>
        {/* Card 2: Current Value */}
        <Card className='hover:border-profit max-h-24 justify-center transition-colors'>
          <CardContent className='flex flex-col gap-1 p-5 pb-5'>
            <p className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>Current Value</p>
            <p className='text-foreground text-2xl font-semibold tracking-tight tabular-nums'>
              {summaryMetrics.currentValue}
            </p>
          </CardContent>
        </Card>
        {/* Card 3: Day's P&L */}
        <Card
          className={cn(
            'max-h-24 justify-center transition-colors',
            summaryMetrics.daysPnL.isProfit ? 'hover:border-profit' : 'hover:border-loss',
          )}>
          <CardContent className='flex flex-col gap-1 p-5 pb-5'>
            <div className='flex items-center justify-between'>
              <p className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>Day's P&L</p>
              <Badge shape='pill' variant={summaryMetrics.daysPnL.isProfit ? 'profit' : 'loss'}>
                {summaryMetrics.daysPnL.percentage}
              </Badge>
            </div>
            <p
              className={`text-2xl font-semibold tracking-tight text-nowrap whitespace-nowrap tabular-nums ${summaryMetrics.daysPnL.isProfit ? 'text-profit' : 'text-loss'}`}>
              {summaryMetrics.daysPnL.value}
            </p>
          </CardContent>
        </Card>
        {/* Card 4: Total P&L */}
        <Card
          className={cn(
            'max-h-24 justify-center transition-colors',
            summaryMetrics.totalPnL.isProfit ? 'hover:border-profit' : 'hover:border-loss',
          )}>
          <CardContent className='flex flex-col gap-1 p-5 pb-5'>
            <div className='flex items-center justify-between'>
              <p className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>Total P&L</p>
              <Badge shape='pill' variant={summaryMetrics.totalPnL.isProfit ? 'profit' : 'loss'}>
                {summaryMetrics.totalPnL.percentage}
              </Badge>
            </div>
            <p
              className={`text-2xl font-semibold tracking-tight text-nowrap whitespace-nowrap tabular-nums ${summaryMetrics.totalPnL.isProfit ? 'text-profit' : 'text-loss'}`}>
              {summaryMetrics.totalPnL.value}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
