import axios from 'axios';

export default {
  createAccount(accountData) {
    return axios.post(`/api/account/`, accountData, {
      withCredentials: true
    });
  },

  updateAccount(id, accountData) {
    return axios.put(`/api/account/${id}`, accountData, {
      withCredentials: true
    });
  }
};
