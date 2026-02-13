import { BanIcon, CheckIcon, MoreHorizontalIcon, StarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { COMMON_STRINGS, SETTINGS_CONSTANTS } from '@/constants/strings';
import { cn } from '@/lib/tw-utils';

import type { Broker } from '@/types/charge';

interface BrokerTabTriggerProps {
  broker: Broker;
  onSetDefault: (id: string) => void;
  onToggleBroker: (id: string) => void;
}

export function BrokerTabTrigger({ broker, onSetDefault, onToggleBroker }: BrokerTabTriggerProps) {
  return (
    <>
      {!broker.enabled && <BanIcon className='size-3' aria-label='Deactivated' />}
      <span
        className={cn(
          !broker.enabled &&
            'decoration-destructive group-data-[state=active]/tab-trigger:decoration-destructive-foreground group-hover/tab-trigger:decoration-destructive-foreground line-through',
        )}>
        {broker.name}
      </span>
      {broker.isDefault && (
        <Badge
          variant='outline'
          shape='pill'
          className='group-data-[state=active]/tab-trigger:text-secondary-foreground group-data-[state=active]/tab-trigger:border-secondary-foreground/25 py-1'>
          <StarIcon className='size-3 fill-current stroke-current' />
          {COMMON_STRINGS.DEFAULT}
        </Badge>
      )}
      <span
        className={cn(
          'absolute -bottom-3 left-1/2 mt-2 -translate-x-1/2 rounded-[1px]',
          'h-2 w-4',
          '[clip-path:polygon(0_0,100%_0,50%_100%)]',
          !broker.enabled && 'group-data-[state=active]/tab-trigger:bg-destructive',
          broker.enabled && 'group-data-[state=active]/tab-trigger:bg-accent-foreground/20',
        )}
      />
      <BrokerTabTriggerActions broker={broker} onSetDefault={onSetDefault} onToggleBroker={onToggleBroker} />
    </>
  );
}

interface BrokerTabTriggerActionsProps {
  broker: Broker;
  onSetDefault: (id: string) => void;
  onToggleBroker: (id: string) => void;
}

export function BrokerTabTriggerActions({ broker, onSetDefault, onToggleBroker }: BrokerTabTriggerActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={broker.enabled ? 'ghost' : 'destructive'}
          size='icon'
          className={cn(
            'ms-auto bg-inherit! opacity-0 transition-none group-hover/tab-trigger:opacity-100 group-data-[state=active]/tab-trigger:opacity-100 data-[state=open]:opacity-100',
            !broker.enabled &&
              'group-hover/tab-trigger/opacity-80 group-data-[state=active]/tab-trigger:opacity-80 data-[state=open]:opacity-80',
          )}
          asChild>
          <span>
            <MoreHorizontalIcon />
            <span className='sr-only'>{COMMON_STRINGS.OPEN_MENU}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuLabel>Actions for {broker.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={broker.isDefault || !broker.enabled || broker.isDefault}
          onClick={() => onSetDefault(broker.id)}
          className='gap-2'>
          <StarIcon size={14} />
          <span>
            {SETTINGS_CONSTANTS.SET_DEFAULT_ACTION} {broker.isDefault ? COMMON_STRINGS.ACTIVE_IN_BRACKETS : null}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onToggleBroker(broker.id)}
          className={cn(
            'gap-2',
            broker.enabled
              ? 'text-destructive focus:bg-destructive focus:text-destructive-foreground'
              : 'focus:bg-secondary text-secondary-foreground gap-2',
          )}>
          {!broker.enabled ? (
            <>
              <CheckIcon className='text-current' /> <span>{SETTINGS_CONSTANTS.ACTIVATE_ACTION}</span>
            </>
          ) : (
            <>
              <BanIcon className='text-current' /> <span>{SETTINGS_CONSTANTS.DEACTIVATE_ACTION}</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
