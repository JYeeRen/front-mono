import { createRoot } from 'react-dom/client';
import { App } from '@gkd/app';
import { RouterProvider } from './router';
import trans from './i18n/common.json';

(async function main() {
  App.bootstrap({
    appName: import.meta.env.VITE_APP_NAME,
    baseUrl: import.meta.env.VITE_BACKEND_HOST,
    lng: 'zh-CN',
    sources: trans
  });

  createRoot(document.getElementById('root')!).render(
    <App>
      <RouterProvider />
    </App>,
  );
})();
