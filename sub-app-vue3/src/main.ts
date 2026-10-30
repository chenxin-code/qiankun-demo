import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app: ReturnType<typeof createApp> | null = null

function render(props: any = {}) {
  const { container } = props
  const root = container
    ? container.querySelector('#app')
    : document.getElementById('app')
  app = createApp(App)
  app.use(ElementPlus)
  app.mount(root!)
}

renderWithQiankun({
  bootstrap() {
    console.log('[sub-app-vue3] bootstraped')
  },
  mount(props) {
    console.log('[sub-app-vue3] mounted')
    render(props)
  },
  unmount() {
    console.log('[sub-app-vue3] unmounted')
    if (app) {
      app.unmount()
      app = null
    }
  },
  update() {}
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
