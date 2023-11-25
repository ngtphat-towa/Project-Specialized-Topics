import { api } from './api';

export const getOrderByUser = async () => {
  return await api.get('/order');
};

export const getAllOrders = async () => {
  return await api.get('/order/admin/all');
};

export const getOrderByOrderId = async (id) => {
  return await api.get(`/order/item/${id}`);
};

export const updateCustomerShippingInfo = async (id, shippingInfo) => {
  return await api.put(`/order/update/${id}`, shippingInfo);
};

export const updateCustomerOrder = async (id, orderData) => {
  return await api.put(`/order/admin/update/${id}`, orderData);
};

export const updateOrderStatus = async (id, status) => {
  return await api.put(`/order/admin/update/status/${id}`, status);
};

export const deleteOrder = async (id) => {
  return await api.delete(`/order/${id}`);
};
