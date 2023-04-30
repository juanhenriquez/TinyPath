'use client';

import { PropsWithChildren, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from './ui/Tooltip';

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={['dark', 'light']}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
