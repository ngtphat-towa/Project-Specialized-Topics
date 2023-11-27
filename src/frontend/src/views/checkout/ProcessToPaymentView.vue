<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="div_class">
    <h3>You will be redirected to payment page</h3>
    <div class="alert alert-primary">
      While making payment use card number 4242 4242 4242 4242 and enter random date and cvv (3
      digit)
    </div>

    <button class="btn btn-primary" @click="goToCheckout">Make Payment</button>
  </div>
</template>

<script>
import basketService from '../../services/basket/basket.service';
// import orderService from '../../services/order/order.service';
import checkoutService from '../../services/checkout/checkout.service';
export default {
  data() {
    return {
      stripeAPIToken: null,
      stripe: null,
      token: null,
      checkoutBodyArray: []
    };
  },
  name: 'ProcessToPaymentView',
  props: [],
  methods: {
    async getAllItems() {
      // Get all data from current basket
      await basketService
        .getBasketByUserId()
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            let products = response.data;
            for (let i = 0; i < products.basketItems?.length; i++) {
              this.checkoutBodyArray.push({
                price: products.basketItems[i].price,
                quantity: products.basketItems[i].quantity,
                productName: products.basketItems[i].name,
                productId: products.basketItems[i].id
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },
    async goToCheckout() {
      console.log('checkoutBodyArray', this.checkoutBodyArray);

      await checkoutService
        .createCheckoutSession()
        .then((response) => {
          console.log(response.data);
          // // Store checkout session key
          const sessionId = response.data.sessionId.id;
          localStorage.setItem('sessionId', sessionId);

          // Wait for the payment
          this.stripe.redirectToCheckout({
            sessionId: sessionId
          });
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.stripeAPIToken = import.meta.env.VITE_STRIPE_API_KEY;
    this.stripe = window.Stripe(this.stripeAPIToken);
    this.getAllItems();
  }
};
</script>

<style scoped>
.alert {
  width: 50%;
}

.div_class {
  margin-top: 5%;
  margin-left: 30%;
}

.checkout_button {
  background-color: #5d3dec;
  margin: 10px;
}
</style>
