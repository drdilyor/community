import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from './components/PageHome.vue'
import User from './components/PageUser.vue'
import Article from './components/PageArticle.vue'
import Login from './components/PageLogin.vue'

const routes: RouteRecordRaw[] = [
  {path: '', component: Home},
  {path: '/user/:username', component: User},
  {path: '/article/:id', component: Article},
  {path: '/login', component: Login},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
