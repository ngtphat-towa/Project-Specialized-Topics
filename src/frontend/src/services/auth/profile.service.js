import axios from 'axios';

export default {
  createProfile(profileData) {
    return axios.post(`/api/profile/`, profileData, {
      withCredentials: true
    });
  },

  getProfile(id) {
    return axios.get(`/api/profile/${id}`, {
      withCredentials: true
    });
  },

  updateProfile(id, profileData) {
    return axios.put(`/api/profile/${id}`, profileData, {
      withCredentials: true
    });
  },

  deleteProfile(id) {
    return axios.delete(`/api/profile/${id}`, {
      withCredentials: true
    });
  }
};
