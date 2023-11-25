import { api } from './api';

export const addWishlistItem = async (itemData) => {
  return await api.post('/wishlist/items', itemData);
};

export const deleteWishlistItem = async (id) => {
  return await api.delete(`/wishlist/${id}`);
};

export const getWishlistByUserId = async () => {
  return await api.get('/wishlist');
};

export const createWishlist = async (wishlistData) => {
  return await api.post('/wishlist', wishlistData);
};

export const deleteWishlist = async () => {
  return await api.delete('/wishlist');
};
