import axios from 'axios';

const api = axios.create({
  baseURL: '/api/item',
  withCredentials: true,
});
export default {
  getBrandsByFilter(filter) {
    return api.get('/', { params: filter });
  },

  createBrand(brandData) {
    return api.post('/', brandData);
  },

  getBrand(id) {
    return api.get(`/${id}`);
  },

  updateBrand(id, brandData) {
    return api.put(`/${id}`, brandData);
  },
};
