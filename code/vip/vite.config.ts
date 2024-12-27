import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'app': path.resolve(__dirname, '../app/src') // 引用 app 的 src 目录
    }
  }
})
