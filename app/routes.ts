import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/dashboard.tsx'),
  route('settings', 'pages/settings.tsx'),
  route('analytics', 'pages/analytics.tsx'),
  route('history', 'pages/history/index.tsx'),
  route('history/:period', 'pages/history/period.tsx'),

  // Catch-all route for 404s
  route('*', 'pages/404.tsx'),
] satisfies RouteConfig;
