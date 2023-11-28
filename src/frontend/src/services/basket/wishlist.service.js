import axios from 'axios';

export default {
  addWishlistItem(data) {
    return axios.post(`/api/wishlist/items`, data, {
      withCredentials: true
    });
  },
  deleteWishlistItem(id) {
    return axios.delete(`/api/wishlist/${id}`, {
      withCredentials: true
    });
  },
  getWishlistByUserId() {
    return axios.get(`/api/wishlist/`, {
      withCredentials: true
    });
  },
  createWishlist(data) {
    return axios.post(`/api/wishlist/`, data, {
      withCredentials: true
    });
  },
  deleteWishlist() {
    return axios.delete(`/api/wishlist/`, {
      withCredentials: true
    });
  }
};
