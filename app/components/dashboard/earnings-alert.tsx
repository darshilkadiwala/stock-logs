import { InfoIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EarningsAlert() {
  return (
    <Card className='border-info/20 bg-info/5 dark:bg-info/10 gap-1.5!' size='sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <InfoIcon className='text-info size-4 shrink-0' />
          <h4 className='text-foreground text-sm font-semibold'>Earnings Alert</h4>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground text-xs leading-relaxed'>
          Reliance Industries (RELIANCE) announces quarterly results on Oct 24th. Expect volatility.
        </p>
      </CardContent>
    </Card>
  );
}
