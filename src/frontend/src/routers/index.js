import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.view.vue'
import AboutView from '../views/about.view.vue'
import AddCatalogTypeView from '../views/catalog/type/AddCatalogTypeView.vue'

const routes = [
  {
    path: '/admin/catalog/type/add',
    name: 'AddCatalogType',
    component: AddCatalogTypeView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
