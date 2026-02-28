import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, FilterIcon, SearchIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboardHoldings } from '@/lib/dummy-data';

export function HoldingsTable() {
  return (
    <Card className='gap-0 overflow-hidden pb-0'>
      <CardHeader className='border-b'>
        <CardTitle className='text-base font-semibold'>Holdings ({dashboardHoldings.length})</CardTitle>
        <CardAction className='text-muted-foreground'>
          <Button variant='ghost' size='icon-sm' title='Search'>
            <SearchIcon className='size-4' />
          </Button>
          <Button variant='ghost' size='icon-sm' title='Filter'>
            <FilterIcon className='size-4' />
          </Button>
          <Button variant='ghost' size='icon-sm' title='Download CSV'>
            <DownloadIcon className='size-4' />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className='p-0'>
        <Table className='overflow-x-auto'>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead>Instrument</TableHead>
              <TableHead className='text-right'>Qty.</TableHead>
              <TableHead className='text-right'>Avg. Price</TableHead>
              <TableHead className='text-right'>LTP</TableHead>
              <TableHead className='text-right'>Cur. Value</TableHead>
              <TableHead className='text-right'>P&L</TableHead>
              <TableHead className='text-right'>Net Chg.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboardHoldings.map((h, i) => (
              <TableRow key={i} className='group cursor-pointer'>
                <TableCell>
                  <div className='text-foreground font-semibold'>{h.symbol}</div>
                  <div className='text-muted-foreground group-hover:text-foreground text-xs text-wrap transition-colors'>
                    {h.name}
                  </div>
                </TableCell>
                <TableCell className='text-right tabular-nums'>{h.qty}</TableCell>
                <TableCell className='text-right tabular-nums'>{h.avgPrice}</TableCell>
                <TableCell className='text-right tabular-nums'>{h.ltp}</TableCell>
                <TableCell className='text-right tabular-nums'>{h.curValue}</TableCell>
                <TableCell className={`text-right tabular-nums ${h.isProfit ? 'text-profit' : 'text-loss'}`}>
                  {h.pnl}
                </TableCell>
                <TableCell className='text-right'>
                  <Badge shape='pill' variant={h.isProfit ? 'profit' : 'loss'}>
                    {h.netChg}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='justify-between sm:flex-row'>
        <div>
          Showing {dashboardHoldings.length} of {dashboardHoldings.length} holdings
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' disabled>
            <ChevronLeftIcon className='mr-1 size-3' />
            Previous
          </Button>
          <Button variant='outline' size='sm'>
            Next
            <ChevronRightIcon className='ml-1 size-3' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
