import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
// import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

import { routeTree } from './routeTree.gen';
import { ConfigProvider, App as AntdApp } from 'antd';
import { app } from './services';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ConfigProvider locale={enUS}>
        <AntdApp message={{ maxCount: 1 }}>
          <app.Registry />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    </>
  );
}

export default App;
