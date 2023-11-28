import axios from 'axios';

export default {
  // Login
  login(credentials) {
    return axios.post('/api/auth/login', credentials, {
      withCredentials: true
    });
  },

  // Get session
  getUserAccount() {
    return axios.get('/api/auth/session', {
      withCredentials: true
    });
  },

  // Logout
  logout() {
    return axios.delete('/api/auth/logout', {
      withCredentials: true
    });
  },

  // Refresh token
  refreshToken(refreshToken) {
    return axios.post(
      '/api/auth/refresh-token',
      { refreshToken },
      {
        withCredentials: true
      }
    );
  }
};
