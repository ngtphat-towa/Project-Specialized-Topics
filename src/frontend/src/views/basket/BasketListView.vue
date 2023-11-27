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
          :src="this.convertToBase64Image(basketItem)"
          alt=""
          class="w-100 card-image-top embed-responsive-item"
          style="object-fit: contain"
        />
      </div>

      <!-- display product name, quantity -->
      <div class="col-md-5 px-3 position-relative">
        <div class="card-block px-3">
          <button
            class="btn btn-danger position-absolute top-0 end-0 mt-2 me-2"
            @click="deleteItem(basketItem.productId)"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          <h6 class="card-title">
            <router-link
              class="product-link"
              :to="{ name: 'DisplayItemDetailView', params: { id: basketItem.productId } }"
            >
              {{ basketItem.productName }}
            </router-link>
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">$ {{ basketItem.unitPrice }} per unit</p>
          <!-- <p class="mb-0" style="float: left">Quantity:{{ basketItem.quantity }}</p> -->

          <!-- ADD QUANTITY IN CART -->
          <p id="item-quantity" class="mb-0">
            Quantity :
            <input
              type="number"
              min="1"
              max="20"
              class="p-0 h-30 border-bottom border-top-0 border-left-0 border-right-0"
              v-model.number="basketItem.quantity"
              v-on:change="updateBasketItem(basketItem)"
            />
          </p>
          <p id="item-total-price" class="mb-0">
            Total Price:
            <span class="font-weight-bold">
              $ {{ (basketItem.unitPrice * basketItem.quantity).toFixed(2) }}</span
            >
          </p>
          <br />
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
import convertToBase64 from '../../services/image/image.render';
const $toast = useToast();
import basketService from '../../services/basket/basket.service';
export default {
  name: 'BasketListView',
  data() {
    return {
      basketItems: null,
      token: null
      //   totalCost: 0,
    };
  },
  computed: {
    totalCost() {
      return this.basketItems === null
        ? 0
        : this.basketItems.reduce((total, item) => {
            return total + item.unitPrice * item.quantity;
          }, 0);
    }
  },

  methods: {
    isDisabled() {
      if (this.basketItems?.length === 0) {
        return true;
      }
      return false;
    },
    convertToBase64Image(basketItem) {
      return convertToBase64(basketItem.image.data);
    },
    // fetch All items in basket
    listBasketItems() {
      basketService
        .getBasketByUserId()
        .then((res) => {
          const result = res.data;

          this.basketItems = result.items;
        })
        .catch((err) => console.log('err', err));
    },

    updateBasketItem(basketItem) {
      const updateBasketItemDTO = {
        basketId: basketItem._id,
        productId: basketItem.productId,
        quantity: basketItem.quantity
      };
      basketService
        .updateBasketItem(basketItem._id, updateBasketItemDTO)
        .then((res) => {
          if (res.status == 200) {
            this.listBasketItems();
          }
          $toast.success('Update success', {
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
        .deleteBasketItem(basketItem._id)
        .then((res) => {
          if (res.status == 200) {
            this.$router.go(0);
          }
          $toast.success('Product removed!', {
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
.product-link {
  text-decoration: none; /* Removes underline */
  color: #007bff; /* Bootstrap primary color */
}
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.1);
}

.product-link:hover {
  color: #0056b3; /* Bootstrap primary hover color */
}
</style>
