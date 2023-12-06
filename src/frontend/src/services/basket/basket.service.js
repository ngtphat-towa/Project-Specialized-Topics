import axios from 'axios';

export default {
  createBasketItem(id, data) {
    return axios.post(`/api/basket/items/${id}`, data, {
      withCredentials: true
    });
  },
  updateBasketItem(id, data) {
    return axios.put(`/api/basket/items/${id}`, data, {
      withCredentials: true
    });
  },
  deleteBasketItem(id) {
    return axios.delete(`/api/basket/items/${id}`, {
      withCredentials: true
    });
  },
  getBasketByUserId() {
    return axios.get(`/api/basket/`, {
      withCredentials: true
    });
  },
  createBasket(data) {
    return axios.post(`/api/basket/`, data, {
      withCredentials: true
    });
  },
  deleteBasket() {
    return axios.delete(`/api/basket/`, {
      withCredentials: true
    });
  }
};
