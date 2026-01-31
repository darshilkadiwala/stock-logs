import { useState } from 'react';
import { Link } from 'react-router';

import { BanIcon, MoreHorizontalIcon, PlusIcon, StarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDefaultBrokerConfigs } from '@/lib/helpers/charges';
import { cn } from '@/lib/tw-utils';

import type { Broker } from '@/types/charge';

import type { Route } from './+types/settings';

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'Settings | Stock Logs' },
    { name: 'description', content: 'Configure broker charges and settings' },
  ];
}

export default function Settings() {
  const defaultBrokers = getDefaultBrokerConfigs();
  const [brokers, setBrokers] = useState<Broker[]>(defaultBrokers);

  return (
    <section className='space-y-4'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold lg:text-2xl 2xl:text-3xl'>Broker Charges Settings</h2>
          <p className='text-muted-foreground'>
            Configure transaction charges & brokerage for different brokers. These settings will be used to calculate
            fees for your new trades.
          </p>
        </div>

        <Button asChild className='mt-auto'>
          <Link to='/settings/brokers/new'>
            <PlusIcon className='size-4' />
            <span className='mt-px leading-none'>Add New Broker</span>
          </Link>
        </Button>
      </header>
      <Separator className='mt-2' />
      <Card className='relative rounded-lg border-none bg-transparent p-0 shadow-none'>
        <Tabs defaultValue={brokers.length > 0 ? brokers[0].id : undefined} className='gap-0'>
          <ScrollArea className='ms-2 whitespace-nowrap'>
            <CardHeader className='gap-0 p-0'>
              <TabsList className='h-auto gap-2 rounded-none bg-transparent pb-3'>
                {brokers.map((broker) => (
                  <TabsTrigger
                    key={broker.id}
                    value={broker.id}
                    className={cn(
                      'group/tab-trigger relative m-0! h-full min-h-10 min-w-48 flex-auto cursor-pointer items-center justify-start rounded-b-none border-b-2 py-2 ps-4 font-semibold transition-none data-[state=active]:z-20',
                      broker.enabled &&
                        'dark:bg-accent/30 bg-accent/50 text-accent-foreground data-[state=active]:bg-secondary! data-[state=active]:text-secondary-foreground! data-[state=active]:border-accent-foreground/20',
                      !broker.enabled &&
                        'text-destructive! hover:bg-destructive! hover:text-destructive-foreground! data-[state=active]:bg-destructive! data-[state=active]:text-destructive-foreground! data-[state=active]:border-destructive! bg-accent/60 opacity-80',
                    )}>
                    {/* Icon indicating status */}
                    {!broker.enabled ? <BanIcon className='size-3' aria-label='Deactivated' /> : null}
                    <span className={cn(!broker.enabled && 'decoration-destructive line-through decoration-1')}>
                      {broker.name}
                    </span>
                    {broker.isDefault ? (
                      <Badge
                        variant='outline'
                        shape='pill'
                        className='group-data-[state=active]/tab-trigger:text-secondary-foreground group-data-[state=active]/tab-trigger:border-secondary-foreground/25 py-1'>
                        <StarIcon className='size-3 fill-current stroke-current' />
                        Default
                      </Badge>
                    ) : null}
                    <span
                      className={cn(
                        'absolute -bottom-3 left-1/2 mt-2 -translate-x-1/2 rounded-[1px]',
                        // Shape: Create a 16px wide, 8px tall box
                        'h-2 w-4',
                        // Draw the Triangle: Top-Left, Top-Right, Bottom-Center
                        '[clip-path:polygon(0_0,100%_0,50%_100%)]',
                        !broker.enabled && 'group-data-[state=active]/tab-trigger:bg-destructive',
                        broker.enabled && 'group-data-[state=active]/tab-trigger:bg-accent-foreground/20',
                      )}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={broker.enabled ? 'ghost' : 'destructive'}
                          size='icon'
                          className={cn(
                            'ms-auto bg-inherit! opacity-0 group-hover/tab-trigger:opacity-100 group-data-[state=active]/tab-trigger:opacity-100 data-[state=open]:opacity-100',
                            !broker.enabled &&
                              'group-hover/tab-trigger/opacity-80 group-data-[state=active]/tab-trigger:opacity-80 data-[state=open]:opacity-80',
                          )}
                          asChild>
                          {/* NOTE: <TabsTrigger> renders <button>, that is causing nested button, Use <Button> as child with <span> to prevent nested buttons and HTML validation issue */}
                          <span>
                            <MoreHorizontalIcon />
                            <span className='sr-only'>Open menu</span>
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='start'>
                        <DropdownMenuLabel>Actions for {broker.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          disabled={broker.isDefault || !broker.enabled}
                          // onClick={() => handleBrokerAction('setDefault', broker.id)}
                          className='gap-2'>
                          <StarIcon size={14} /> <span>Set as Default {broker.isDefault ? '(Active)' : null}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          // onClick={() => handleBrokerAction('deactivate', broker.id)}
                          className='text-destructive focus:bg-destructive focus:text-destructive-foreground gap-2'>
                          <BanIcon className='text-current' /> <span>Deactivate Broker</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardHeader>
            <ScrollBar orientation='horizontal' className='visible' />
          </ScrollArea>
          <CardContent className='bg-card border-accent-foreground/20 relative z-10 -mt-3 rounded-md border py-4 shadow-xs'>
            {brokers.map((broker) => (
              <TabsContent key={broker.id} value={broker.id}>
                {broker.name}
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>
    </section>
  );
}
