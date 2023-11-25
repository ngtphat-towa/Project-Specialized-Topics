<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Shopping basket</h3>
      </div>
    </div>

    <!-- loop over the basket items and display -->

    <div
      v-for="basketItem in basketItems"
      :key="basketItem.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <img
          :src="basketItem.imageUrl"
          alt=""
          class="w-100 card-image-top embed-responsive-item"
          style="object-fit: contain"
        />
      </div>

      <!-- display product name, quantity -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link :to="{ name: 'ShowDetails', params: { id: basketItem.productId } }">
              {{ basketItem.name }}
            </router-link>
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">$ {{ basketItem.price }} per unit</p>
          <!-- <p class="mb-0" style="float: left">Quantity:{{ basketItem.quantity }}</p> -->

          <!-- ADD QUANTITY IN CART -->
          <p id="item-quantity" class="mb-0">
            Quantity :
            <input
              size="1"
              class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
              v-model="basketItem.quantity"
              v-on:change="updateBasketItem(basketItem)"
              v-on:keypress="NumbersOnly"
            />
          </p>
          <p id="item-total-price" class="mb-0">
            Total Price:
            <span class="font-weight-bold"> $ {{ basketItem.price * basketItem.quantity }}</span>
          </p>
          <br />
          <a href="#" class="text-right" @click="deleteItem(basketItem.productId)"
            >Remove from basket
          </a>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <!-- display total price -->
    <div class="total-cost pt-2 text-right">
      <h5>Total : $ {{ totalCost.toFixed(2) }}</h5>
      <button
        :disabled="isDisabled()"
        type="button"
        class="btn btn-primary confirm"
        @click="checkout"
      >
        Confirm Order
      </button>
    </div>
  </div>
</template>
<script>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
import basketService from '../services/basket.service';
export default {
  data() {
    return {
      basketItems: [],
      token: null,
      totalCost: 0,
      products: []
    };
  },
  props: ['product'],
  methods: {
    isDisabled() {
      if (this.basketItems.length === 0) {
        return true;
      }
      return false;
    },
    // fetch All items in basket
    listBasketItems() {
      basketService
        .getBasketItems(this.token)
        .then((res) => {
          const result = res.data;

          this.basketItems = result.basketItems;
          this.totalCost = result.totalCost;
        })
        .catch((err) => console.log('err', err));
    },

    updateBasketItem(basketItem) {
      const updateBasketItemDTO = {
        basketId: basketItem.basketId,
        productId: basketItem.productId,
        quantity: basketItem.quantity
      };
      basketService
        .updateBasketItem(updateBasketItemDTO, this.token)
        .then((res) => {
          if (res.status == 200) {
            this.listBasketItems();
          }
          $toast.success('Update success', {
            // override the global option
            position: 'top-right'
          });
        })
        .catch((err) => console.log('err', err));
    },

    deleteItem(productId) {
      const basketItem = {
        productId: productId
      };
      basketService
        .removeBasketItem(basketItem, this.token)
        .then((res) => {
          if (res.status == 200) {
            this.$router.go(0);
          }
          $toast.success('Product removed!', {
            // override the global option
            position: 'top-right'
          });
        })
        .catch((err) => console.log('err', err));
    },
    checkout() {
      this.$router.push({ name: 'Checkout' });
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.listBasketItems();
  }
};
</script>
<style scoped>
h4,
h5 {
  color: #484848;
  font-size: 700;
}
</style>
