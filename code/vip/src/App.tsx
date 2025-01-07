import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
// import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

import { routeTree } from './routeTree.gen';
import { ConfigProvider } from 'antd';

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
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
