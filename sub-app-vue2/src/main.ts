import Vue from 'vue'
import App from './App.vue'

let instance: Vue | null = null

export async function bootstrap() {
  console.log('[sub-app-vue2] bootstraped')
}

export async function mount(props: any) {
  console.log('[sub-app-vue2] mounted')
  const container = props.container ? props.container.querySelector('#app') : document.getElementById('app')
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container!)
}

export async function unmount() {
  console.log('[sub-app-vue2] unmounted')
  if (instance) {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
  }
}
