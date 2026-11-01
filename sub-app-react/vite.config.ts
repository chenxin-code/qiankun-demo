import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useMicroApp = env.VITE_USE_MICRO_APP === 'true'

  return {
    base: './',
    plugins: [
      react({
        reactRefresh: !useMicroApp,
      }),
      qiankun('sub-app-react', {
        useDevMode: useMicroApp,
      }),
    ],
    server: {
      port: 8083,
      cors: true,
      hmr: !useMicroApp,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
})
