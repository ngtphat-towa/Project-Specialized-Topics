import axios from 'axios';

export const getBrandsByFilter = async (filter) => {
  return await axios.get('/', { params: filter });
};

export const createBrand = async (brandData) => {
  return await axios.post('/', brandData);
};

export const getBrand = async (id) => {
  return await axios.get(`/${id}`);
};

export const updateBrand = async (id, brandData) => {
  return await axios.put(`/${id}`, brandData);
};
