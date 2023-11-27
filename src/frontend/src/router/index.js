import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRouter, createWebHistory } from 'vue-router';
// Main View
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
// Admin
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
// Display View
import DisplayItemDetailView from '../views/catalog/item/DisplayItemDetailView.vue';
import WishlistListView from '../views/basket/WishlistListView.vue';
import BasketListView from '../views/basket/BasketListView.vue';
// Checkout
import ProcessToPaymentView from '../views/checkout/ProcessToPaymentView.vue';
import FailedCheckoutView from '../views/checkout/FailedCheckoutView.vue';
import SuccessCheckoutView from '../views/checkout/SuccessCheckoutView.vue';
// Order view
import CustomerOrderDetailView from '../views/order/CustomerOrderDetailView.vue';
import CustomerOrderView from '../views/order/CustomerOrderView.vue';
//Testing

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
    {
      path: '/product/details/:id',
      name: 'DisplayItemDetailView',
      component: DisplayItemDetailView
    },
    // Authenication
    {
      path: '/auth/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/auth/register',
      name: 'RegisterView',
      component: CatalogItemListView
    },
    //Display
    {
      path: '/user/wishlist',
      name: 'WishlistListView',
      component: WishlistListView
    },
    {
      path: '/user/basket',
      name: 'BasketListView',
      component: BasketListView
    },
    {
      path: '/user/basket/checkout',
      name: 'ProcessToPaymentView',
      component: ProcessToPaymentView
    },
    // Checkout
    {
      path: '/payment/success',
      name: 'SuccessCheckoutView',
      component: SuccessCheckoutView,
      props: (route) => ({ session_id: route.query.session_id })
    },
    {
      path: '/payment/failed',
      name: 'FailedCheckoutView',
      component: FailedCheckoutView
    },
    {
      path: '/item/search',
      name: 'SearchView',
      component: CatalogItemListView
    },
    {
      path: '/user/order/:id',
      name: 'CustomerOrderDetailView',
      component: CustomerOrderDetailView
    },
    {
      path: '/user/order',
      name: 'CustomerOrderView',
      component: CustomerOrderView
    },

    // testing
    // Catalog item
    {
      path: '/testing',
      name: 'DisplayProduct',
      component: CatalogItemListView
    }
  ]
});

export default router;
