import React, { PropsWithChildren } from 'react';
import { AntdWrapper } from './wrapper/antd-wrapper';
import { UseQueryWrapper } from '@gkd/api';
import { ErrorBoundary } from '@gkd/components';

interface AppProps extends PropsWithChildren {}

export function App({ children }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <UseQueryWrapper>
          <AntdWrapper>{children}</AntdWrapper>
        </UseQueryWrapper>
      </ErrorBoundary>
    </>
  );
}
