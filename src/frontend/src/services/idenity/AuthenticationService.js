import { api } from '../api';

export const createSession = async (userData) => {
  return await api.post('/login', userData);
};

export const getSession = async () => {
  return await api.get('/session');
};

export const deleteSession = async () => {
  return await api.delete('/logout');
};
