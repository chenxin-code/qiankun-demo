import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/qiankun-demo/',
  plugins: [vue()],
  server: {
    port: 8080,
  },
})
