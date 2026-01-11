import type { Route } from './+types/dashboard';

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: 'Dashboard - Stock Logs' },
    { name: 'description', content: 'Your personal stock tracking dashboard' },
  ];
}

export default function Dashboard() {
  return <div>Dashboard</div>;
}
