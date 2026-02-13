import type { ComponentProps } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/tw-utils';

function FolderTabs({ className, ...props }: ComponentProps<typeof Tabs>) {
  return (
    <Card className='relative -mx-4 rounded-lg border-none bg-transparent p-0 shadow-none lg:-mx-2'>
      <Tabs data-slot='folder-tabs' className={cn('gap-0', className)} {...props} />
    </Card>
  );
}

function FolderTabsList({ className, ...props }: ComponentProps<typeof TabsList>) {
  return (
    <ScrollArea className='ms-2 whitespace-nowrap'>
      <CardHeader className='gap-0 p-0'>
        <TabsList
          data-slot='folder-tabs-list'
          className={cn('h-auto gap-2 rounded-none bg-transparent pb-3', className)}
          {...props}
        />
      </CardHeader>
      <ScrollBar orientation='horizontal' className='visible' />
    </ScrollArea>
  );
}

function FolderTabsTrigger({
  className,
  destructive = false,
  ...props
}: ComponentProps<typeof TabsTrigger> & { destructive?: boolean }) {
  return (
    <TabsTrigger
      data-slot='folder-tabs-trigger'
      className={cn(
        'group/tab-trigger relative z-20 m-0! h-full min-h-10 min-w-48 flex-auto cursor-pointer items-center justify-start rounded-b-none border-b-2 py-2 ps-4 font-semibold transition-none data-[state=active]:z-20',
        !destructive
          ? 'dark:bg-accent/30 bg-accent/50 text-accent-foreground data-[state=active]:bg-secondary! data-[state=active]:text-secondary-foreground! data-[state=active]:border-accent-foreground/20'
          : 'text-destructive! hover:bg-destructive! hover:text-destructive-foreground! data-[state=active]:bg-destructive! data-[state=active]:text-destructive-foreground! data-[state=active]:border-destructive! bg-accent/60 opacity-65 data-[state=active]:opacity-80',
        className,
      )}
      {...props}
    />
  );
}

function FolderTabsBody({ className, ...props }: ComponentProps<typeof CardContent>) {
  return (
    <CardContent
      className={cn(
        'bg-card border-accent-foreground/20 relative z-10 -mt-3 rounded-md border px-2 py-4 shadow-xs sm:px-4 lg:px-6',
        className,
      )}
      data-slot='folder-tabs-body'
      {...props}
    />
  );
}

function FolderTabsContent({ className, ...props }: ComponentProps<typeof TabsContent>) {
  return <TabsContent data-slot='folder-tabs-content' className={cn('space-y-4', className)} {...props} />;
}

export { FolderTabs, FolderTabsBody, FolderTabsContent, FolderTabsList, FolderTabsTrigger };
