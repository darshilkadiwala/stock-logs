import { Badge } from '@/components/ui/badge';
import { APPLY_ON, CHARGE_TYPES } from '@/constants/charges';
import { formatCurrency } from '@/lib/utils';

import type { ChargeConfig } from '@/types/charge';

export function ChargeValue({ charge }: { charge: ChargeConfig }) {
  const isPercentage =
    charge.chargeType === CHARGE_TYPES.PERCENTAGE.key || charge.chargeType === CHARGE_TYPES.PERCENTAGE_WITH_MIN_MAX.key;

  // Format the main value
  const displayValue = (value: number) => (isPercentage ? `${value}%` : formatCurrency(value));

  return (
    <div className='flex flex-col items-start gap-1'>
      {charge.__type === 'NORMAL' && <span>{displayValue(charge.value)}</span>}

      {/* Show Exchange Specifics */}
      {charge.__type === 'EXCHANGE_SPECIFIC' && (
        <div className='flex flex-col gap-2 text-xs'>
          {Object.entries(charge.value).map(([ex, val]) => (
            <span key={ex}>
              {ex}: {displayValue(val)}
            </span>
          ))}
        </div>
      )}

      {/* Show Min/Max if they exist */}
      {'min' in charge && (charge.min || charge.max) && (
        <div className='text-muted-foreground flex flex-wrap gap-1 text-xs'>
          {charge.min ? <span>Min: {formatCurrency(charge.min)}</span> : null}
          {charge.max ? <span>Max: {formatCurrency(charge.max)}</span> : null}
        </div>
      )}

      {/* Show hint if available */}
      {charge.hint ? <span className='text-muted-foreground'></span> : null}

      {/* Show the Applied on tags */}
      <div className='inline-flex gap-1'>
        {charge.appliesOn.map((applyOn) => (
          <Badge key={applyOn} variant='outline' size='sm' shape='rounded'>
            {APPLY_ON[applyOn].label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
