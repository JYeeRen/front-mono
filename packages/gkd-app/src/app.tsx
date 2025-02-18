import React, { PropsWithChildren } from 'react';
import { AntdWrapper } from './wrapper/antd-wrapper';
import { UseQueryWrapper } from '@gkd/api';

interface AppProps extends PropsWithChildren {
}

export function App({ children }: AppProps) {
  return (
    <>
      <UseQueryWrapper>
        <AntdWrapper>{children}</AntdWrapper>
      </UseQueryWrapper>
    </>
  );
}
