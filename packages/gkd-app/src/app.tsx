import React, { PropsWithChildren } from 'react';
import { AntdWrapper } from './wrapper/antd-wrapper';
import { UseQueryWrapper } from '@gkd/api';

export function App({ children }: PropsWithChildren) {
  return (
    <>
      <UseQueryWrapper>
        <AntdWrapper>{children}</AntdWrapper>
      </UseQueryWrapper>
    </>
  );
}
