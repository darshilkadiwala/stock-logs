import { useEffect, useState, type ComponentProps } from 'react';

import { cn } from '@/lib/tw-utils';

const marketOpen = 9 * 60; // 9:00 AM
const marketClose = 15 * 60 + 30; // 3:30 PM

interface ClockSVGProps extends ComponentProps<'svg'> {
  hourAngle: number;
  minuteAngle: number;
  secondAngle: number;
}

function ClockSVG({ hourAngle, minuteAngle, secondAngle }: ClockSVGProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='size-9'>
      {/* Clock face circle */}
      <circle cx='12' cy='12' r='10' />
      {/* Hour markers */}
      <g>
        <circle cx='12' cy='3' r='0.25' />
        <circle cx='12' cy='21' r='0.25' />
        <circle cx='3' cy='12' r='0.25' />
        <circle cx='21' cy='12' r='0.25' />
        <circle cx='12' cy='12' r='0.25' />
      </g>
      {/* Hour hand */}
      <line x1='12' y1='12' x2='12' y2='7.5' transform={`rotate(${hourAngle} 12 12)`} />
      {/* Minute hand */}{' '}
      <line x1='12' y1='12' x2='12' y2='5.5' transform={`rotate(${minuteAngle} 12 12)`} opacity='0.8' />
      {/* Second hand (optional, can be removed if too busy) */}{' '}
      <line x1='12' y1='12' x2='12' y2='5' strokeWidth='1' opacity='0.5' transform={`rotate(${secondAngle} 12 12)`} />
    </svg>
  );
}

export function MarketHoursClock() {
  // Initialize with null to avoid hydration mismatch, then set on client
  const [time, setTime] = useState<Date | null>(null);
  const [marketStatus, setMarketStatus] = useState<'open' | 'closed'>('closed');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(() => now);

      // Indian Stock Market hours: 9:15 AM - 3:30 PM IST (Monday to Friday)
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const isWeekday = day >= 1 && day <= 5;

      if (isWeekday && currentMinutes >= marketOpen && currentMinutes < marketClose) {
        setMarketStatus(() => 'open');
      } else {
        setMarketStatus(() => 'closed');
      }
    };

    // Set initial time immediately on client
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  // Calculate rotation angles for clock hands
  // Use default time of 10:10:30 when time is not available
  const hours = time ? time.getHours() % 12 : 10;
  const minutes = time ? time.getMinutes() : 10;
  const seconds = time ? time.getSeconds() : 30;

  // Hour hand: 30 degrees per hour + 0.5 degrees per minute
  const hourAngle = hours * 30 + minutes * 0.5; // 0 degrees to start at 12 o'clock
  // Minute hand: 6 degrees per minute
  const minuteAngle = minutes * 6; // 0 degrees to start at 12 o'clock
  // Second hand: 6 degrees per second
  const secondAngle = seconds * 6; // 0 degrees to start at 12 o'clock

  const statusColor = time ? (marketStatus === 'open' ? 'bg-profit' : 'bg-loss') : 'bg-chart-3';
  const statusText = time ? (marketStatus === 'open' ? 'Open' : 'Closed') : 'Loading...';
  const timeText = time ? formatTime(time) : '--:--:-- --';
  const dateText = time ? formatDate(time) : '--/--/----';

  return (
    <div className='text-muted-foreground bg-muted flex flex-col gap-2 rounded-md p-3 tabular-nums group-data-[collapsible=icon]:hidden'>
      <div className='flex items-center gap-2 text-xs'>
        <span className='font-medium'>Market Status:</span>
        <span className={cn('inline-block size-2 rounded-full', statusColor)} />
        <span className='font-medium'>{statusText}</span>
      </div>
      <div className='flex items-center gap-2'>
        <ClockSVG hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />
        <div className='border-s ps-2'>
          <div className='text-foreground font-bold'>{timeText}</div>
          <div className='text-xs'>{dateText}</div>
        </div>
      </div>
    </div>
  );
}
