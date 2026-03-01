import type { ReactNode } from 'react';

import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps,
} from '@/components/ui/radio-group';
import { cn } from '@/lib/tw-utils';

interface TabRadioGroupProps extends RadioGroupProps {
  tabs: Array<Omit<RadioGroupItemProps, 'children' | 'asChild'> & { label: ReactNode; id?: string }>;
}
export function TabRadioGroup({ tabs, className, ...props }: TabRadioGroupProps) {
  return (
    <RadioGroup
      className={cn(
        'group bg-input/50 relative inline-flex h-9 w-fit items-center gap-1 rounded-md p-1 font-medium',
        className,
      )}
      {...props}>
      {tabs.map(({ label, value, className, id, ...tabProps }) => (
        <div className='group size-full' key={`${id}-${value}`}>
          <Label
            htmlFor={id}
            className={cn(
              'relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center rounded-sm px-1 text-xs whitespace-nowrap transition-colors select-none md:px-2',
              'has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground has-data-[state=checked]:shadow-xs',
              className,
            )}>
            {label}
            <RadioGroupItem key={value} value={value} {...tabProps} className='sr-only!' id={id} />
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
