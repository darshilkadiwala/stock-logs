import { Calendar, Download, Search } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function OrdersFilter() {
  return (
    <Card>
      <CardContent className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
        {/* Left: Filters */}
        <div className='flex w-full flex-wrap items-center gap-3 sm:w-auto'>
          {/* Date Range */}
          <div className='group relative'>
            <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Calendar className='size-4' />
            </div>
            <Input
              className='bg-background dark:bg-muted/50 border-border text-foreground focus:ring-primary focus:border-primary placeholder:text-muted-foreground block w-full cursor-pointer rounded-md border p-2.5 pl-10 text-sm transition-colors hover:border-gray-400 dark:hover:border-gray-600'
              placeholder='Last 30 Days'
              type='text'
              readOnly
            />
          </div>

          {/* Transaction Type */}
          <div className='relative min-w-30'>
            <Select defaultValue='all'>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Type: All' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Type: All</SelectItem>
                <SelectItem value='buy'>Buy</SelectItem>
                <SelectItem value='sell'>Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className='relative min-w-36'>
            <Select defaultValue='all'>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Status: All' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Status: All</SelectItem>
                <SelectItem value='executed'>Executed</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right: Search & Export */}
        <div className='flex w-full items-center gap-3 sm:w-auto'>
          <div className='relative w-full sm:w-64'>
            <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Search className='size-4' />
            </div>
            <Input
              className='bg-muted/50 border-border text-foreground focus:ring-primary focus:border-primary block w-full rounded-md border p-2.5 pl-10 text-sm'
              id='simple-search'
              placeholder='Search instrument...'
              required
              type='text'
            />
          </div>
          <Button className='flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium shadow-sm transition-all'>
            <Download className='size-4' />
            <span className='hidden sm:inline'>Export</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
