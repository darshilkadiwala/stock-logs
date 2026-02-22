import { Info } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function EarningsAlert() {
  return (
    <Card className='border-info/20 bg-info/5 dark:bg-info/10 transition-colors'>
      <CardContent className='flex items-start gap-3'>
        <Info className='text-info mt-0.5 size-4 shrink-0' />
        <div className='flex flex-col gap-1'>
          <h4 className='text-foreground text-sm font-semibold'>Earnings Alert</h4>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            Reliance Industries (RELIANCE) announces quarterly results on Oct 24th. Expect volatility.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
