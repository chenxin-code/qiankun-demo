import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  base: './',
  plugins: [
    react({
      reactRefresh: false,
    }),
    qiankun('sub-app-react', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8083,
    cors: true,
    hmr: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
