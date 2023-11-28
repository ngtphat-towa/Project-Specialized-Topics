import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRouter, createWebHistory } from 'vue-router';
// Main View
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
// Admin
import AdminPanelView from '../views/AdminPanelView.vue';
// Type
import AddCatalogTypeView from '../views/catalog/type/AddCatalogTypeView.vue';
import EditCatalogTypeView from '../views/catalog/type/EditCatalogTypeView.vue';
import CatalogTypeListView from '../views/catalog/type/CatalogTypeListView.vue';
// Brand
import AddCatalogBrandView from '../views/catalog/brand/AddCatalogBrandView.vue';
import EditCatalogBrandView from '../views/catalog/brand/EditCatalogBrandView.vue';
import CatalogBrandListView from '../views/catalog/brand/CatalogBrandListView.vue';
// Item
import CatalogItemListView from '../views/catalog/item/CatalogItemListView.vue';
import ShoppingListView from '../views/catalog/item/ShoppingListView.vue';
// Display View
import DisplayItemDetailView from '../views/catalog/item/DisplayItemDetailView.vue';
import WishlistListView from '../views/basket/WishlistListView.vue';
import BasketListView from '../views/basket/BasketListView.vue';
// Checkout
import ProcessToPaymentView from '../views/checkout/ProcessToPaymentView.vue';
import FailedCheckoutView from '../views/checkout/FailedCheckoutView.vue';
import SuccessCheckoutView from '../views/checkout/SuccessCheckoutView.vue';
// Order view

import CustomerOrderView from '../views/order/CustomerOrderView.vue';
import OrderListView from '../views/order/OrderListView.vue';
//Testing

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/about', name: 'AboutView', component: AboutView },
    { path: '/auth/login', name: 'LoginView', component: LoginView },
    { path: '/auth/register', name: 'RegisterView', component: CatalogItemListView },
    { path: '/item/search', name: 'SearchView', component: ShoppingListView },
    { path: '/user/wishlist', name: 'WishlistListView', component: WishlistListView },
    { path: '/user/basket', name: 'BasketListView', component: BasketListView },
    {
      path: '/user/basket/checkout',
      name: 'ProcessToPaymentView',
      component: ProcessToPaymentView
    },
    {
      path: '/payment/success',
      name: 'SuccessCheckoutView',
      component: SuccessCheckoutView,
      props: (route) => ({ session_id: route.query.session_id })
    },
    { path: '/payment/failed', name: 'FailedCheckoutView', component: FailedCheckoutView },
    { path: '/user/order', name: 'CustomerOrderView', component: CustomerOrderView },
    { path: '/testing', name: 'DisplayProduct', component: CatalogItemListView },
    {
      path: '/admin',
      name: 'AdminPanelView',
      component: AdminPanelView,
      children: [
        { path: 'catalog/type/add', name: 'AddCatalogType', component: AddCatalogTypeView },
        {
          path: 'catalog/type/update/:id',
          name: 'EditCatalogType',
          component: EditCatalogTypeView
        },
        { path: 'catalog/type/', name: 'CatalogTypeList', component: CatalogTypeListView },
        { path: 'catalog/brand/add', name: 'AddCatalogBrand', component: AddCatalogBrandView },
        {
          path: 'catalog/brand/update/:id',
          name: 'EditCatalogBrand',
          component: EditCatalogBrandView
        },
        { path: 'catalog/brand/', name: 'CatalogBrandList', component: CatalogBrandListView },
        { path: 'catalog/item/', name: 'CatalogItemList', component: CatalogItemListView },
        { path: 'order', name: 'OrderListView', component: OrderListView }
      ]
    },
    {
      path: '/product/details/:id',
      name: 'DisplayItemDetailView',
      component: DisplayItemDetailView
    }
  ]
});

export default router;
