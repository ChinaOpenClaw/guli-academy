import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// 谷粒学院前台门户 - Vue 3 + Vite
// 端口 9529（9528 已被 guli-admin 占用）
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9529,
    strictPort: false,
    // 学习中心接入后端（演示后端 learn-center @8110；生产由 edu / ucenter 微服务接管）
    proxy: {
      '/admin/edu': { target: 'http://localhost:8110', changeOrigin: true },
      '/edu': { target: 'http://localhost:8110', changeOrigin: true },
      '/api/ucenter': { target: 'http://localhost:8110', changeOrigin: true },
      '/ucenter': { target: 'http://localhost:8110', changeOrigin: true }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
