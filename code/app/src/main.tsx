import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

(async function main() {
  // const { routeTree } = await import('virtual:business-routes');
  // const router = createRouter({ routeTree })

  createRoot(document.getElementById('root')!).render(
    // <RouterProvider router={router}>
      <App />
    // </RouterProvider>
  )
})();

