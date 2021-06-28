import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from './components/PageHome.vue'
import Login from './components/PageLogin.vue'

const routes: RouteRecordRaw[] = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
