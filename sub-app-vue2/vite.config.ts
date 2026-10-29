import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    qiankun('sub-app-vue2', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8082,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
