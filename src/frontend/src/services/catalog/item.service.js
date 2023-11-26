import axios from 'axios';

export default {
  getItemsByBrandAndTypeId(typeId, brandId) {
    return axios.get(`/api/item/type/${typeId}/brand/${brandId}`, { withCredentials: true });
  },
  getItemsByBrandId(brandId) {
    return axios.get(`/api/item/type/all/brand/${brandId}`, { withCredentials: true });
  },
  getCatlogTypes() {
    return axios.get(`/api/item/catalogtypes`, { withCredentials: true });
  },
  getCatlogBrands() {
    return axios.get(`/api/item/catalogbrands`, { withCredentials: true });
  },
  getAllItems() {
    return axios.get(`/api/item/`, { withCredentials: true });
  },
  getItemsByName(name) {
    return axios.get(`/api/item/by?name=${name}`, { withCredentials: true });
  },
  getItemById(id) {
    return axios.get(`/api/item/${id}`, { withCredentials: true });
  },
  createItem(newItem) {
    return axios.post(`/api/item/`, newItem, { withCredentials: true });
  },
  updateItem(id, updatedItem) {
    return axios.put(`/api/item/${id}`, updatedItem, { withCredentials: true });
  },
  deleteItem(id) {
    return axios.delete(`/api/item/${id}`, { withCredentials: true });
  },
  deleteAllItems() {
    return axios.delete(`/api/item/`, { withCredentials: true });
  }
};
