import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import AddCatalogTypeView from '../views/catalog/type/AddCatalogTypeView.vue';
import EditCatalogTypeView from '../views/catalog/type/EditCatalogTypeView.vue';
import CatalogTypeListView from '../views/catalog/type/CatalogTypeListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/admin/catalog/type/add',
      name: 'AddCatalogType',
      component: AddCatalogTypeView
    },
    {
      path: '/admin/catalog/type/update/:id',
      name: 'EditCatalogType',
      component: EditCatalogTypeView
    },
    {
      path: '/admin/catalog/type/',
      name: 'CatalogTypeList',
      component: CatalogTypeListView
    }
  ]
});

export default router;
