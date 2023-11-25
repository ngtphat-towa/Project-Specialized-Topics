import { api } from '../api';

// ItemRouter APIs
export const getItemsByBrandAndTypeId = async (typeId, brandId) => {
  return await api.get(`/type/${typeId}/brand/${brandId}`);
};

export const getItemsByBrandId = async (brandId) => {
  return await api.get(`/type/all/brand/${brandId}`);
};

export const getCatlogTypes = async () => {
  return await api.get('/catalogtypes');
};

export const getCatlogBrands = async () => {
  return await api.get('/catalogbrands');
};

export const getAllItems = async () => {
  return await api.get('/');
};

export const getItemsByName = async (name) => {
  return await api.get(`/by?name=${name}`);
};

export const getItemById = async (id) => {
  return await api.get(`/${id}`);
};

export const createItem = async (itemData) => {
  return await api.post('/', itemData);
};

export const updateItem = async (id, itemData) => {
  return await api.put(`/${id}`, itemData);
};

export const deleteItem = async (id) => {
  return await api.delete(`/${id}`);
};

export const deleteAllItems = async () => {
  return await api.delete('/');
};
