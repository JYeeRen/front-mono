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
      '@app/types': path.resolve(__dirname, './src/types'),
      '@app/services': path.resolve(__dirname, './src/services'),
      '@app/hooks': path.resolve(__dirname, './src/hooks'),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'antd-vendor': ['antd', '@ant-design/icons'],
          'googlemap-vendor': ['@googlemaps/js-api-loader']
        }
      }
    }
  }
});
