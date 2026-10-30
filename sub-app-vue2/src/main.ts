import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

Vue.use(ElementUI)

let instance: Vue | null = null

function render(props: any = {}) {
  const { container } = props
  const root = container
    ? container.querySelector('#app')
    : document.getElementById('app')
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(root!)
}

renderWithQiankun({
  bootstrap() {
    console.log('[sub-app-vue2] bootstraped')
  },
  mount(props) {
    console.log('[sub-app-vue2] mounted')
    render(props)
  },
  unmount() {
    console.log('[sub-app-vue2] unmounted')
    if (instance) {
      instance.$destroy()
      instance.$el.innerHTML = ''
      instance = null
    }
  },
  update() {}
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
