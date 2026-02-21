import type { Route } from './+types/analytics';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Analytics - Stock Logs' }, { name: 'description', content: 'View your trading analytics' }];
}

export default function Analytics() {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-bold tracking-tight'>Analytics</h1>
      <div className='text-muted-foreground rounded-lg border border-dashed p-8 text-center'>
        Analytics content will go here
      </div>
    </div>
  );
}
