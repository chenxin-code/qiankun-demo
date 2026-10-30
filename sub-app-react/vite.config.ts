import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    qiankun('sub-app-react', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8083,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
