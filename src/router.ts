import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from './components/PageHome.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', component: Home},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
