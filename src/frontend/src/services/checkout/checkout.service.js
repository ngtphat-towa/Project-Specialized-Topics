import axios from 'axios';

export default {
  createCheckoutSession() {
    return axios.post('/api/checkout/create-checkout-session', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  placeOrder(orderDetails) {
    return axios.post('/api/checkout/place-order', orderDetails, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }
};
