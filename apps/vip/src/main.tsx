import { createRoot } from 'react-dom/client';
import { default as CAPP } from './App.tsx';
import { App, net, store } from '@gkd/app';

(async function main() {
  net.init({ baseURL: '//localhost:7766' });
  store.init(import.meta.env.VITE_APP_NAME ?? 'test-app');

  createRoot(document.getElementById('root')!).render(
    <App>
      <CAPP />
    </App>,
  );
})();
