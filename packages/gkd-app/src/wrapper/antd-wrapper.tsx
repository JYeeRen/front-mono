import React, { PropsWithChildren } from 'react';
import { FeedbackRegister, Antd } from '@gkd/components';

export function AntdWrapper({ children }: PropsWithChildren) {
  return (
    <Antd.ConfigProvider>
      <Antd.App message={{ maxCount: 1 }}>
        <FeedbackRegister />
        {children}
      </Antd.App>
    </Antd.ConfigProvider>
  );
}
