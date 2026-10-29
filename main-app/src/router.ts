import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import SubApp from './views/SubApp.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/sub-app', component: SubApp },
  ],
})

export default router
