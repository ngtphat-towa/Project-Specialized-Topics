import { api } from '../api';

export const getTypesByFilter = (filter) => {
  return api.get('/type', { params: filter });
};

export const createType = (typeData) => {
  return api.post('/type', typeData);
};

export const getType = (id) => {
  return api.get(`/type/${id}`);
};

export const updateType = (id, typeData) => {
  return api.put(`/type/${id}`, typeData);
};
