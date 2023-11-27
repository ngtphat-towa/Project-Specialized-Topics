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
        <h4>{{ product?.name }}</h4>
        <h6 class="catgory font-italic">{{ product?.catalogType.name }}</h6>
        <h6 class="font-weight-bold">$ {{ product?.price }}</h6>

        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Quantity</span>
            </div>
            <input type="number" class="form-control" v-model="quantity" />
          </div>
          <div class="input-group col-md-3 col-4 p-0">
            <button class="btn" id="add-to-basket-button" @click="addToBasket">
              Add to Basket
            </button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Brands</strong></h5>
          <p>
            {{ product?.catalogBrand.name }}
          </p>
        </div>
        <div class="features pt-3">
          <span>
            <h5><strong>Features</strong></h5>
            {{ product?.description }}
          </span>
        </div>

        <button id="wishlist-button" class="btn mr-3 p-1 py-0" @click="addNewWishlistItem()">
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
import basketService from '../../../services/basket/basket.service';
import wishlistService from '../../../services/basket/wishlist.service';
import getToken from '../../../services/cookies.service.js';
import { ref } from 'vue';

const $toast = useToast();

export default {
  name: 'DisplayItemDetailView',
  setup() {
    const product = ref(null);
    return { product };
  },
  data() {
    return {
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
    async addNewWishlistItem() {
      if (!this.token) {
        $toast.error('Please login to proceed!', {
          position: 'top-right'
        });
        return;
      }
      // params
      const wishlistItem = {
        productId: this.product._id,
        productName: this.product.name,
        oldUnitPrice: this.product.price,
        image: this.product.image
      };
      // add item to wishlist
      await wishlistService
        .addWishlistItem(wishlistItem)
        .then((res) => {
          if (res.status === 200) {
            this.wishListString = 'Added to Wishlist';
            $toast.success('Product added to your wishlist', {
              position: 'top-right'
            });
          }
          $toast.success('Product added to your wishlist', {
            position: 'top-right'
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    },

    // add to basket

    addToBasket() {
      if (!this.token) {
        $toast.error('Please login to proceed', {
          position: 'top-right'
        });
        return;
      }

      const basketItem = {
        productId: this.product.id,
        quantity: this.quantity
      };

      // add to basket
      basketService
        .addToBasket(basketItem, this.token)
        .then(() => {
          $toast.success('Product added to your basket', {
            position: 'top-right'
          });
          this.$emit('fetchData');
        })
        .catch((err) => console.log('err', err));
    }
  },
  mounted() {
    this.token = getToken('accessToken');
  }
};
</script>
<style scoped>
.category {
  font-weight: 400;
}

#wishlist-button {
  background-color: #b9b9b9;
}

#add-to-basket-button {
  background-color: #febd69;
}
</style>
