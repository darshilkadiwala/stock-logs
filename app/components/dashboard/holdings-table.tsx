import { Download, Filter, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaginationFooter } from '@/components/ui/pagination-footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboardHoldings } from '@/lib/dummy-data';

export function HoldingsTable() {
  return (
    <Card className='flex flex-col gap-0 overflow-hidden py-0'>
      <CardHeader className='flex flex-row items-center justify-between border-b px-5 py-4'>
        <CardTitle className='text-base font-semibold'>Holdings ({dashboardHoldings.length})</CardTitle>
        <CardAction className='flex items-center gap-1'>
          <Button variant='ghost' size='icon-sm' title='Search' className='text-muted-foreground'>
            <Search className='size-4' />
          </Button>
          <Button variant='ghost' size='icon-sm' title='Filter' className='text-muted-foreground'>
            <Filter className='size-4' />
          </Button>
          <Button variant='ghost' size='icon-sm' title='Download CSV' className='text-muted-foreground'>
            <Download className='size-4' />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className='p-0'>
        <Table className='overflow-x-auto'>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[25%]'>Instrument</TableHead>
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
                  <div className='flex flex-col'>
                    <span className='text-foreground font-semibold'>{h.symbol}</span>
                    <span className='text-muted-foreground group-hover:text-foreground text-xs transition-colors'>
                      {h.name}
                    </span>
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
                  <div className='flex h-full items-center justify-end'>
                    <Badge shape='pill' variant={h.isProfit ? 'profit' : 'loss'}>
                      {h.netChg}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <PaginationFooter showingText={`Showing ${dashboardHoldings.length} of ${dashboardHoldings.length} holdings`} />
    </Card>
  );
}
