import { Badge, type BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/tw-utils';
import { formatPercentage } from '@/lib/utils';

/**
 * Props for the MarketBadge component.
 * Extends standard BadgeProps but omits 'children' as the content is generated from label and value.
 */
interface MarketBadgeProps extends Omit<BadgeProps, 'children'> {
  /** The name of the market or index (e.g., "Nifty", "Sensex") */
  label: string;
  /** The absolute point change (e.g., 82.50). Positive values show a '+' prefix and use profit styling */
  points: number;
  /** The percentage change (e.g., 0.38) */
  percent: number;
  /**
   * Whether to transform the label to uppercase.
   * @default true
   */
  uppercase?: boolean;
}

/**
 * A badge component to display market index values with appropriate styling for positive and negative changes.
 * It automatically formats the percentage value and applies color coding (green for profit, red for loss).
 */
/**
 * A reusable badge component for displaying market movements.
 * * Automatically handles:
 * - Color coding based on positive/negative values (text-profit vs text-loss).
 * - Prefixing positive numbers with a '+'.
 * - Formatting the percentage using utility functions.
 * * @example
 *   ```tsx
 *   <MarketBadge label="Nifty 50" value={0.45} />
 *   ```
 */
export function MarketBadge({ label, percent, points, className, uppercase = true, ...props }: MarketBadgeProps) {
  const isPositive = points >= 0;
  const formattedValue = `${isPositive ? '+' : ''}${points.toFixed(2)} (${formatPercentage(percent)})`;

  return (
    <Badge
      variant='outline'
      size='lg'
      data-slot='market-badge'
      className={cn('gap-1 font-medium', isPositive ? 'text-profit' : 'text-loss', className)}
      {...props}>
      <span className={cn('text-muted-foreground text-xs', uppercase && 'uppercase')}>{label}</span>
      <span>{formattedValue}</span>
    </Badge>
  );
}
