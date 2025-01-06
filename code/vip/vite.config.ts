import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  resolve: {
    alias: {
      '@app/infra': path.resolve(__dirname, './src/infra'),
      '@app/infra/net': path.resolve(__dirname, './src/infra/net'),
    },
  },
});
