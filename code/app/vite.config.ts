import path from 'path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    dts()
  ],
  resolve: {
    alias: {
      'app': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // 指定库的入口文件
      name: 'app-framework', // UMD 模式下全局变量的名字
      formats: ['es', 'umd'], // 构建的两种模块格式：ES Modules 和 UMD
      fileName: (format) => `app-framework.${format}.js` // 输出的文件名格式
    },
    rollupOptions: {
      // 确保将外部依赖排除在打包的结果之外
      external: ['react', 'react-dom'], // 例如 React 通常应作为 peer dependency
      output: {
        // 全局变量的名字 UMD 格式需要
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
