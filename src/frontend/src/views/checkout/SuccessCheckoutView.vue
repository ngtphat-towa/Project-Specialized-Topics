<template>
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import checkoutService from '../../services/checkout/checkout.service';
import Swal from 'sweetalert2';

export default {
  name: 'PaymentSuccess',
  props: ['session_id'],
  data() {
    return {
      token: null,
      sessionId: null
    };
  },
  methods: {
    async saveOrder() {
      if (this.sessionId !== null ) {
        const paayload = {
          sessionId: this.sessionId
        }
        await checkoutService
          .placeOrder(paayload)
          .then(() => {
            Swal.fire({
              title: 'Sweet!',
              text: 'Thank your purchase!',
              imageUrl: 'https://picsum.photos/seed/picsum/200/300',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image'
            });
            this.$router.push({ name: 'OrderListView' });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              text: error.message,
              icon: 'error'
            });
          });
      }
    }
  },
  mounted() {
    this.sessionId = localStorage.getItem('sessionId');
    this.saveOrder();
  }
};
</script>
