// basketApi.js
import { api } from './api';

export const createBasketItem = async (id, itemData) => {
  return await api.post(`/basket/items/${id}`, itemData);
};

export const updateBasketItem = async (id, itemData) => {
  return await api.put(`/basket/items/${id}`, itemData);
};

export const deleteBasketItem = async (id) => {
  return await api.delete(`/basket/items/${id}`);
};

export const getBasketByUserId = async () => {
  return await api.get('/basket');
};

export const createBasket = async (basketData) => {
  return await api.post('/basket', basketData);
};

export const deleteBasket = async () => {
  return await api.delete('/basket');
};
