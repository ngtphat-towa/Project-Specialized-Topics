import axios from 'axios';

const api = axios.create({
  baseURL: '/api/type',
  withCredentials: true,
});

const getTypesByFilter = (filter) => {
  return api.get('/', { params: filter });
};

const createType = (typeData) => {
  return api.post('/', typeData);
};

const getType = (id) => {
  return api.get(`/${id}`);
};

const updateType = (id, typeData) => {
  return api.put(`/${id}`, typeData);
};

export default {
  getTypesByFilter,
  createType,
  getType,
  updateType,
};
