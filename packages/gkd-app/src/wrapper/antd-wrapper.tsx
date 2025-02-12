import React, { PropsWithChildren } from 'react';
import { App, ConfigProvider } from 'antd';
import { Register } from '../antd-feedback-register';
// import type { MessageInstance } from 'antd/es/message/interface';
// import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
// import type { NotificationInstance } from 'antd/es/notification/interface';

// let message: MessageInstance;
// let notification: NotificationInstance;
// let modal: Omit<ModalStaticFunctions, 'warn'>;

// function Register() {
//   const staticFunction = App.useApp();

//   message = staticFunction.message;
//   modal = staticFunction.modal;
//   notification = staticFunction.notification;

//   return null;
// }

export function AntdWrapper({ children }: PropsWithChildren) {
  return (
    <ConfigProvider>
      <App message={{ maxCount: 1 }}>
        <Register />
        {children}
      </App>
    </ConfigProvider>
  );
}

// export {
//   message,
//   notification,
//   modal
// }