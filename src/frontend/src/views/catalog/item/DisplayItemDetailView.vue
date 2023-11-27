<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <!--            display image-->
      <div class="col-md-4 col-12">
        <img :src="displayImage" class="img-fluid" />
      </div>
      <!--            display product details-->
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4>{{ product.name }}</h4>
        <h6 class="catgory font-italic">{{ product.catalogType.name }}</h6>
        <h6 class="font-weight-bold">$ {{ product.price }}</h6>

        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Quantity</span>
            </div>
            <input type="number" class="form-control" v-model="quantity" />
          </div>
          <div class="input-group col-md-3 col-4 p-0">
            <button class="btn" id="add-to-cart-button" @click="addToCart">Add to Cart</button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Brands</strong></h5>
          <p>
            {{ product.catalogBrand.name }}
          </p>
        </div>
        <div class="features pt-3">
          <span>
            <h5><strong>Features</strong></h5>
            {{ product.description }}
          </span>
        </div>

        <button id="wishlist-button" class="btn mr-3 p-1 py-0" @click="addToWishlist()">
          Add to wishlist
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import convertToBase64 from '../../../services/image/image.render';
import itemService from '../../../services/catalog/item.service.js';

const $toast = useToast();

export default {
  name: 'DisplayItemDetailView',
  data() {
    return {
      product: null,

      token: null,
      quantity: 1,
      displayImage: null
    };
  },
  created() {
    this.fetchCurrentData();
  },
  methods: {
    fetchCurrentData() {
      const id = this.$route.params.id;
      itemService
        .getCatalogItemById(id)
        .then((response) => {
          this.product = response.data;
          const data = this.product.image;
          this.displayImage = convertToBase64(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addToWishlist() {
      if (!this.token) {
        // user is not logged in
        // show some error
        $toast.error('Please login to proceed!', {
          // override the global option
          position: 'top-right'
        });
        return;
      }
      // params
      // const wishlistItem = {
      //   productId: this.product.id
      // };
      // add item to wishlist
      // await wishlistService
      //   .addWishList(wishlistItem, this.token)
      //   .then(() => {
      //     // if (res.status === 201) {
      //     //   this.wishListString = 'Added to Wishlist';
      //     //   $toast.success('Product added to your wishlist', {
      //     //     // override the global option
      //     //     position: 'top-right'
      //     //   });
      //     // }
      //     $toast.success('Product added to your wishlist', {
      //       // override the global option
      //       position: 'top-right'
      //     });
      //   })
      //   .catch((err) => {
      //     console.log('err', err);
      //   });
    },

    // add to cart

    addToCart() {
      if (!this.token) {
        // user is not logged in
        // show some error
        $toast.error('Please login to proceed', {
          // override the global option
          position: 'top-right'
        });
        return;
      }

      //   const cartItem = {
      //     productId: this.product.id,
      //     quantity: this.quantity
      //   };

      //   // add to cart
      //   cartService
      //     .addToCart(cartItem, this.token)
      //     .then(() => {
      //       // if (res.status == 201) {
      //       //   $toast.success('Product added to your cart', {
      //       //     // override the global option
      //       //     position: 'top-right'
      //       //   });
      //       //   this.$emit('fetchData');
      //       // }
      //       $toast.success('Product added to your cart', {
      //         // override the global option
      //         position: 'top-right'
      //       });
      //       this.$emit('fetchData');
      //     })
      //     .catch((err) => console.log('err', err));
    }
  },
  mounted() {}
};
</script>
<style scoped>
.category {
  font-weight: 400;
}

#wishlist-button {
  background-color: #b9b9b9;
}

#add-to-cart-button {
  background-color: #febd69;
}
</style>
