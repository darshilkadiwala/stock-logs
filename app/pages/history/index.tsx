import { Link } from 'react-router';

export function meta() {
  return [{ title: 'History - Stock Logs' }, { name: 'description', content: 'View your trading history' }];
}

export default function HistoryIndex() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold tracking-tight'>Trade History</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Link
          to='today'
          className='bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-xl border p-6 shadow transition-colors'>
          <div className='text-2xl font-bold'>Today</div>
          <p className='text-muted-foreground text-xs'>View trade history for today</p>
        </Link>
        <Link
          to='week'
          className='bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-xl border p-6 shadow transition-colors'>
          <div className='text-2xl font-bold'>This Week</div>
          <p className='text-muted-foreground text-xs'>View trade history for this week</p>
        </Link>
        <Link
          to='month'
          className='bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-xl border p-6 shadow transition-colors'>
          <div className='text-2xl font-bold'>This Month</div>
          <p className='text-muted-foreground text-xs'>View trade history for the current month</p>
        </Link>
        <Link
          to='year'
          className='bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-xl border p-6 shadow transition-colors'>
          <div className='text-2xl font-bold'>This Year</div>
          <p className='text-muted-foreground text-xs'>View trade history for the current year</p>
        </Link>
      </div>
    </div>
  );
}
