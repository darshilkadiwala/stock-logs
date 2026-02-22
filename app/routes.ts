import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/dashboard.tsx'),
  route('orders', 'pages/orders.tsx'),
  route('settings', 'pages/settings.tsx'),

  // Catch-all route for 404s
  route('*', 'pages/404.tsx'),
] satisfies RouteConfig;
