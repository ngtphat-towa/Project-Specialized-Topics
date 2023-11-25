import axios from 'axios';

const API = axios.create({
  baseURL: '/api/basket',
  withCredentials: true,
});
export default {
  createBasketItem(id, itemData) {
    return API.post(`/items/${id}`, itemData);
  },

  updateBasketItem(id, itemData) {
    return API.put(`/items/${id}`, itemData);
  },

  deleteBasketItem(id) {
    return API.delete(`/items/${id}`);
  },

  getBasketByUserId() {
    return API.get('/');
  },

  createBasket(basketData) {
    return API.post('/', basketData);
  },

  deleteBasket() {
    return API.delete('/basket');
  },
};
