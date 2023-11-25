import { api } from './api';

export const createCheckoutSession = async (sessionData) => {
  return await api.post('/checkout/create-checkout-session', sessionData);
};

export const placeOrder = async (orderData) => {
  return await api.post('/checkout/place-order', orderData);
};
