import axios from 'axios';

const api = axios.create({
  baseURL: '/api/item',
  withCredentials: true,
});
export default {
  // ItemRouter APIs
  getItemsByBrandAndTypeId(typeId, brandId) {
    return api.get(`/type/${typeId}/brand/${brandId}`);
  },

  getItemsByBrandId(brandId) {
    return api.get(`/type/all/brand/${brandId}`);
  },

  getCatlogTypes() {
    return api.get('/catalogtypes');
  },

  getCatlogBrands() {
    return api.get('/catalogbrands');
  },

  getAllItems() {
    return api.get('/');
  },

  getItemsByName(name) {
    return api.get(`/by?name=${name}`);
  },

  getItemById(id) {
    return api.get(`/${id}`);
  },

  createItem(itemData) {
    return api.post('/', itemData);
  },

  updateItem(id, itemData) {
    return api.put(`/${id}`, itemData);
  },

  deleteItem(id) {
    return api.delete(`/${id}`);
  },

  deleteAllItems() {
    return api.delete('/');
  },
};
