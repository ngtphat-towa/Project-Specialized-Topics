import { api } from '../api';

export const getBrandsByFilter = async (filter) => {
  return await api.get('/', { params: filter });
};

export const createBrand = async (brandData) => {
  return await api.post('/', brandData);
};

export const getBrand = async (id) => {
  return await api.get(`/${id}`);
};

export const updateBrand = async (id, brandData) => {
  return await api.put(`/${id}`, brandData);
};
