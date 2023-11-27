<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="mt-4">Your WishList</h3>
      </div>
    </div>

    <!-- diaplay products -->

    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <WishlistItemBox :product="product" @onDeleteWishlistItem="deleteWishlistItem(product)">
        </WishlistItemBox>
      </div>
    </div>
  </div>
</template>
<script>
// import swal from 'sweetalert';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

import wishlistService from '../../services/basket/wishlist.service';
import itemService from '../../services/catalog/item.service';
import WishlistItemBox from '../../components/basket/WishlistItemBox.vue';

export default {
  components: { WishlistItemBox },
  data() {
    return {
      token: null,
      products: null,
      wishListItems: null
    };
  },
  props: [],
  methods: {
    async fetchWishList() {
      let items = [];
      await wishlistService
        .getWishlistByUserId()
        .then((res) => {
          items = res.data.items;
          this.wishListItems;
        })
        .catch((err) => {
          console.log('err', err);
        });
      const productItems = [];
      for (const item of items) {
        await itemService.getCatalogItemById(item.productId).then((res) => {
          productItems.push(res.data);
        });
      }
      this.products = productItems;
    },
    async deleteWishlistItem(product) {
      // const wishlistItem = {
      //   productId:
      // };

      await wishlistService
        .deleteWishlistItem(product._id)
        .then(() => {
          this.fetchWishList();
          $toast.success('Removed Successfully', {
            position: 'top-right'
          });
        })
        .catch((err) => {
          console.log('err', err);
          $toast.error('Something wrong, try again!', {
            position: 'top-right'
          });
        });
    }
  },
  mounted() {
    this.fetchWishList();
  }
};
</script>
