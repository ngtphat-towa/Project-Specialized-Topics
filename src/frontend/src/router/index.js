import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import AddCatalogTypeView from '../views/catalog/type/AddCatalogTypeView.vue';
import EditCatalogTypeView from '../views/catalog/type/EditCatalogTypeView.vue';
import CatalogTypeListView from '../views/catalog/type/CatalogTypeListView.vue';
import AddCatalogBrandView from '../views/catalog/brand/AddCatalogBrandView.vue';
import EditCatalogBrandView from '../views/catalog/brand/EditCatalogBrandView.vue';
import CatalogBrandListView from '../views/catalog/brand/CatalogBrandListView.vue';
import CatalogItemListView from '../views/catalog/item/CatalogItemListView.vue';

import DisplayProductBox from '../components/catalog/DisplayProductBox.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // main view
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/about',
      name: 'AboutView',
      component: AboutView
    },
    {
      path: '/admin',
      name: 'AdminView',
      component: AboutView
    },
    // catalog type
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
    },
    // catalog brand
    {
      path: '/admin/catalog/brand/add',
      name: 'AddCatalogBrand',
      component: AddCatalogBrandView
    },
    {
      path: '/admin/catalog/brand/update/:id',
      name: 'EditCatalogBrand',
      component: EditCatalogBrandView
    },
    {
      path: '/admin/catalog/brand/',
      name: 'CatalogBrandList',
      component: CatalogBrandListView
    },
    // Catalog item
    {
      path: '/admin/catalog/item/',
      name: 'CatalogItemList',
      component: CatalogItemListView
    },
    // Authenication
    {
      path: '/auth/login',
      name: 'LoginView',
      component: CatalogItemListView
    },
    {
      path: '/auth/register',
      name: 'RegisterView',
      component: CatalogItemListView
    },
    {
      path: '/user/wishlist',
      name: 'WishlistView',
      component: CatalogItemListView
    },
    {
      path: '/item/search',
      name: 'SearchView',
      component: CatalogItemListView
    },
    {
      path: '/user/basket',
      name: 'BasketView',
      component: CatalogItemListView
    },
    {
      path: '/user/order',
      name: 'MyOrderView',
      component: CatalogItemListView
    },
    // testing
    // Catalog item
    {
      path: '/testing',
      name: 'DisplayProduct',
      component: DisplayProductBox
    }
  ]
});

export default router;
