import { CalendarIcon, DownloadIcon, SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function OrdersFilter() {
  return (
    <Card>
      <CardContent className='items-center justify-between sm:flex-row'>
        {/* Left: Filters */}
        <div className='flex w-full flex-wrap items-center gap-3 sm:w-auto'>
          {/* Date Range */}
          <div className='relative h-auto'>
            <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <CalendarIcon className='size-4' />
            </div>
            <Input
              className='h-auto py-2 ps-10'
              // className='bg-background dark:bg-muted/50 border-border text-foreground focus:ring-primary focus:border-primary placeholder:text-muted-foreground block w-full cursor-pointer rounded-md border p-2.5 pl-10 text-sm transition-colors hover:border-gray-400 dark:hover:border-gray-600'
              placeholder='Last 30 Days'
              type='text'
            />
          </div>

          {/* Transaction Type */}
          <Select defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Type: All' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value='all'>Type: All</SelectItem>
              <SelectItem value='buy'>Buy</SelectItem>
              <SelectItem value='sell'>Sell</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select defaultValue='all'>
            <SelectTrigger>
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

        {/* Right: Search & Export */}
        <div className='flex w-full items-center gap-3 sm:w-auto'>
          <div className='relative w-full sm:w-64'>
            <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <SearchIcon className='size-4' />
            </div>
            <Input
              className='ps-10'
              // className='bg-muted/50 border-border text-foreground focus:ring-primary focus:border-primary block w-full rounded-md border p-2.5 pl-10 text-sm'
              id='simple-search'
              placeholder='Search instrument...'
              type='text'
            />
          </div>
          <Button>
            <DownloadIcon />
            <span className='hidden sm:inline'>Export</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
