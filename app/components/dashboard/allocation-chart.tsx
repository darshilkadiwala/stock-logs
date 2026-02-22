import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const chartData = [
  {
    label: 'Equity',
    percentage: 65,
    value: '₹9,23,325',
    colorClass: 'text-primary',
    bgClass: 'bg-primary',
    dashArray: '163.28 251.2',
    dashOffset: '0',
  },
  {
    label: 'Debt & Bonds',
    percentage: 25,
    value: '₹3,55,125',
    colorClass: 'text-chart-2',
    bgClass: 'bg-chart-2',
    dashArray: '62.8 251.2',
    dashOffset: '-163.28',
  },
  {
    label: 'Gold & Others',
    percentage: 10,
    value: '₹1,42,050',
    colorClass: 'text-chart-3',
    bgClass: 'bg-chart-3',
    dashArray: '25.12 251.2',
    dashOffset: '-226.08',
  },
];

export function AllocationChart() {
  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-sm font-semibold'>Asset Allocation</CardTitle>
        <CardAction>
          <Button variant='link' size='sm' className='h-auto p-0 text-xs font-medium'>
            Details
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className='flex flex-col pb-6'>
        {/* Pure CSS Donut Chart Implementation */}
        <div className='relative mx-auto mb-8 size-48'>
          <svg className='h-full w-full -rotate-90' viewBox='0 0 100 100'>
            {/* Background Circle */}
            <circle
              cx='50'
              cy='50'
              fill='transparent'
              r='40'
              stroke='currentColor'
              className='text-muted'
              strokeWidth='12'
            />

            {chartData.map((segment, i) => (
              <circle
                key={i}
                className={`${segment.colorClass} cursor-pointer transition-all duration-500 hover:opacity-90`}
                cx='50'
                cy='50'
                fill='transparent'
                r='40'
                stroke='currentColor'
                strokeDasharray={segment.dashArray}
                strokeDashoffset={segment.dashOffset}
                strokeWidth={i === 0 ? '12.5' : '12'} // Slight pop for primary
              />
            ))}
          </svg>

          {/* Center Text */}
          <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-foreground text-2xl font-bold tabular-nums'>{chartData.length * 4}</span>
            <span className='text-muted-foreground text-xs tracking-wide uppercase'>Assets</span>
          </div>
        </div>

        {/* Legend */}
        <div className='flex flex-col gap-4'>
          {chartData.map((item, i) => (
            <div key={i} className='flex flex-col gap-4'>
              <div className='group flex cursor-pointer items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className={`${item.bgClass} size-3 rounded-full`}></span>
                  <span
                    className={`text-foreground group-hover:${item.colorClass} text-sm font-medium transition-colors`}>
                    {item.label}
                  </span>
                </div>
                <div className='text-right'>
                  <span className='text-foreground block text-sm font-semibold tabular-nums'>{item.percentage}%</span>
                  <span className='text-muted-foreground block text-xs tabular-nums'>{item.value}</span>
                </div>
              </div>
              {i < chartData.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
