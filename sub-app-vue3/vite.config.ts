import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  base: '/qiankun-demo/sub-app-vue3/',
  plugins: [
    vue(),
    qiankun('sub-app-vue3', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8081,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
