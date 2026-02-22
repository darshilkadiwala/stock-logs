import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface PaginationFooterProps {
  currentItems?: number;
  totalItems?: number;
  showingText?: string;
  hasControls?: boolean;
}

export function PaginationFooter({ currentItems, totalItems, showingText, hasControls = true }: PaginationFooterProps) {
  return (
    <div className='bg-muted/50 text-muted-foreground flex items-center justify-between border-t px-5 py-3 text-xs sm:flex-row'>
      <div>
        {showingText ? (
          <span>{showingText}</span>
        ) : (
          <span>
            Showing <span className='text-foreground font-medium'>1</span> to{' '}
            <span className='text-foreground font-medium'>{currentItems}</span> of{' '}
            <span className='text-foreground font-medium'>{totalItems}</span> entries
          </span>
        )}
      </div>
      {hasControls && (
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='bg-background h-8 px-3 text-xs disabled:opacity-50' disabled>
            <ChevronLeft className='mr-1 size-3' />
            Previous
          </Button>
          <Button variant='outline' size='sm' className='bg-background h-8 px-3 text-xs'>
            Next
            <ChevronRight className='ml-1 size-3' />
          </Button>
        </div>
      )}
    </div>
  );
}
