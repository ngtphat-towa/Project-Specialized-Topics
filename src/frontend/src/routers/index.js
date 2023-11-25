import { createRouter, createWebHistory } from 'vue-router';
import AddCatalogTypeView from '../views/catalog/type/AddCatalogTypeView.vue';

import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
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
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
