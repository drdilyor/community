import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from './components/PageHome.vue'
import Profile from './components/PageProfile.vue'
import Article from './components/PageArticle.vue'
import Login from './components/PageLogin.vue'

const routes: RouteRecordRaw[] = [
  {path: '', component: Home},
  {path: '/user/:id', component: Profile},
  {path: '/article/:id', component: Article},
  {path: '/login', component: Login},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
