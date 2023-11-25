import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.view.vue'
import AboutView from '../views/about.view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
