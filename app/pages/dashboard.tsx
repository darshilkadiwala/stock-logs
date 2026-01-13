import { user } from '@/lib/user';

import type { Route } from './+types/dashboard';

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'Dashboard - Stock Logs' },
    { name: 'description', content: 'Your personal stock tracking dashboard' },
  ];
}

export default function Dashboard() {
  const firstName = user.name.split(' ')[0];

  return (
    <div className=''>
      <h1 className='text-primary text-2xl tracking-tight'>
        Welcome back, <span className='font-bold'>{firstName}!</span>
      </h1>
    </div>
  );
}
