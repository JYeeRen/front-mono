import React, { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './client';

export function UseQueryWrapper({ children }: PropsWithChildren) {
  const debug = localStorage.getItem('useQueryDebug');

  return (
    <QueryClientProvider client={queryClient}>
      {debug && <ReactQueryDevtools initialIsOpen={false} />}
      {children}
    </QueryClientProvider>
  );
}
