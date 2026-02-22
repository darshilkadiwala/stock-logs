import { Info } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PaginationFooter } from '@/components/ui/pagination-footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ordersHistory } from '@/lib/dummy-data';

export function OrdersTable() {
  return (
    <Card className='flex flex-1 flex-col overflow-hidden py-0'>
      <CardContent className='p-0'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[20%]'>Date & Time</TableHead>
              <TableHead className='w-[20%]'>Instrument</TableHead>
              <TableHead className='w-[10%]'>Type</TableHead>
              <TableHead className='w-[15%] text-right'>Qty</TableHead>
              <TableHead className='w-[15%] text-right'>Price</TableHead>
              <TableHead className='w-[20%]'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersHistory.map((o, i) => (
              <TableRow key={i} className='hover:bg-muted/30 group h-14 transition-colors'>
                <TableCell className='text-muted-foreground tabular-nums'>
                  {o.date} <span className='text-muted-foreground/50 ml-1 text-xs'>{o.time}</span>
                </TableCell>
                <TableCell className='font-semibold'>{o.instrument}</TableCell>
                <TableCell>
                  <Badge
                    variant={o.type === 'Buy' ? 'info' : 'secondary'}
                    className='border-none px-2 py-0 text-[11px] tracking-wide uppercase shadow-none'>
                    {o.type}
                  </Badge>
                </TableCell>
                <TableCell className='text-right font-medium tabular-nums'>{o.qty}</TableCell>
                <TableCell className='text-right font-medium tabular-nums'>{o.price}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <span
                      className={`size-2 rounded-full ${
                        o.status === 'Executed' ? 'bg-profit' : o.status === 'Rejected' ? 'bg-loss' : 'bg-warning'
                      }`}></span>
                    <span className='font-medium'>{o.status}</span>
                    {o.info && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className='text-muted-foreground hover:text-foreground size-4 cursor-help transition-colors' />
                          </TooltipTrigger>
                          <TooltipContent side='right'>
                            <p>{o.info}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <PaginationFooter currentItems={ordersHistory.length} totalItems={ordersHistory.length} />
    </Card>
  );
}
