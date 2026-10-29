import { createApp } from 'vue'
import App from './App.vue'

let app: ReturnType<typeof createApp> | null = null

export async function bootstrap() {
  console.log('[sub-app-vue3] bootstraped')
}

export async function mount(props: any) {
  console.log('[sub-app-vue3] mounted')
  const container = props.container ? props.container.querySelector('#app') : document.getElementById('app')
  app = createApp(App)
  app.mount(container!)
}

export async function unmount() {
  console.log('[sub-app-vue3] unmounted')
  if (app) {
    app.unmount()
    app = null
  }
}
