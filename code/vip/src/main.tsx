import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Layout, net, logger } from 'app';

(async function main() {

  await Promise.all([
    // net.init({ baseURL: '//localhost:7777' }),
    logger.init('vip')
  ]);

  createRoot(document.getElementById('root')!).render(
      <Layout>
      <App />
      </Layout>
  )
})();

