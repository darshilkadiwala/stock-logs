import { useEffect, useState, type ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from 'react-router';

import { TailwindIndicator } from '@/components/common/tailwind-indicator';
import { BaseLayout } from '@/layouts/base-layout';
import { ThemeProvider } from '@/providers/theme-provider';

import type { Route } from './+types/root';

import './app.css';

import { LoadingWithLogo } from './components/common/loading-with-logo';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <BaseLayout>{children}</BaseLayout>
          <TailwindIndicator />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (navigation.state === 'loading') {
      // Wait 250ms before showing the loader to prevent flickering
      timeout = setTimeout(() => {
        setShowLoader(() => true);
      }, 250);
    } else {
      setShowLoader(() => false);
    }

    return () => clearTimeout(timeout);
  }, [navigation.state]);

  // If we are navigating AND the timeout has passed, show the loader
  if (navigation.state === 'loading' && showLoader) {
    return (
      <div className='animate-in fade-in flex grow items-center justify-center duration-500'>
        <LoadingWithLogo />
      </div>
    );
  }

  return <Outlet />;
}

export function HydrateFallback() {
  return <LoadingWithLogo />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='container mx-auto p-4 pt-16'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full overflow-x-auto p-4'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
