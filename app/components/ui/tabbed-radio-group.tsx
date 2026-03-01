import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps,
} from '@/components/ui/radio-group';
import { cn } from '@/lib/tw-utils';

interface TabbedRadioGroupProps extends RadioGroupProps {
  tabs: Array<Omit<RadioGroupItemProps, 'children' | 'asChild'> & { label: string; id?: string }>;
}
export function TabbedRadioGroup({ tabs, className, ...props }: TabbedRadioGroupProps) {
  return (
    <RadioGroup
      className={cn(
        'group bg-input/50 relative inline-flex h-9 w-fit items-center gap-0 rounded-md px-0.5 py-1 font-medium',
        className,
      )}
      {...props}>
      {tabs.map(({ label, value, className, id, ...tabProps }) => (
        <div className='group size-full'>
          <Label
            htmlFor={id}
            className={cn(
              'relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center rounded-sm px-4 text-xs whitespace-nowrap transition-colors select-none',
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
