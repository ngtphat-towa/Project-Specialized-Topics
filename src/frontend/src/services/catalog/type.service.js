import axios from 'axios';

const getTypesByFilter = (filter) => {
  return axios.get('/api/type', { params: filter });
};

const createType = (typeData) => {
  return axios.post('/api/type', typeData);
};

const getType = (id) => {
  return axios.get(`/api/type/${id}`);
};

const updateType = (id, typeData) => {
  return axios.put(`/api/type/${id}`, typeData);
};

export default {
  getTypesByFilter,
  createType,
  getType,
  updateType,
};
