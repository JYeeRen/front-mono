import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';



(async function main() {
  // console.log(app);
  // await Promise.all([
  //   // net.init({ baseURL: '//localhost:7777' }),
  //   // app.logger.init('vip')
  // ]);

  createRoot(document.getElementById('root')!).render(
      <App />
  );
})();
