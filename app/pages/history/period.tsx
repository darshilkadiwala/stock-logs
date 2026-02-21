import { useParams } from 'react-router';

export function meta({ params }: { params: { period: string } }) {
  const title = params.period ? params.period.charAt(0).toUpperCase() + params.period.slice(1) : 'History';
  return [{ title: `${title} Trade History - Stock Logs` }];
}

export default function HistoryPeriod() {
  const { period } = useParams();
  const title = period ? period.charAt(0).toUpperCase() + period.slice(1) : 'Unknown';

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold tracking-tight'>{title} History</h1>
      <div className='text-muted-foreground rounded-lg border border-dashed p-8 text-center'>
        No trades found for {period}.
      </div>
    </div>
  );
}
