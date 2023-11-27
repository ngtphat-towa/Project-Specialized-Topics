import axios from 'axios';

export default {
  getAllOrders(query) {
    return axios.get('/api/order/', {
      params: query,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  getOrderByUser(userId, query) {
    return axios.get(`/api/order/user/${userId}`, {
      params: query,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  getOrderByOrderId(orderId) {
    return axios.get(`/api/order/${orderId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  deleteOrder(orderId) {
    return axios.delete(`/api/order/${orderId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  updateOrderStatus(orderId, orderStatus) {
    return axios.put(`/api/order/update/status/${orderId}`, orderStatus, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  updateCustomerShippingInfo(orderId, shippingInfo) {
    return axios.put(`/api/order/update/${orderId}`, shippingInfo, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  },
  updateCustomerOrder(orderId, orderUpdate) {
    return axios.put(`/api/order/admin/update/${orderId}`, orderUpdate, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }
};
