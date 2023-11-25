import { api } from '../api';

export const createSession = async (sessionData) => {
  return await api.post('/auth/login', sessionData);
};

export const getSession = async () => {
  return await api.get('/auth/session');
};

export const deleteSession = async () => {
  return await api.delete('/auth/logout');
};

// ProfileRouter APIs
export const createProfile = async (profileData) => {
  return await api.post('/profile', profileData);
};

export const getAllUserProfiles = async () => {
  return await api.get('/profile');
};

export const getProfile = async (id) => {
  return await api.get(`/profile/${id}`);
};

export const updateProfile = async (id, profileData) => {
  return await api.put(`/profile/${id}`, profileData);
};

export const deleteProfile = async (id) => {
  return await api.delete(`/profile/${id}`);
};
