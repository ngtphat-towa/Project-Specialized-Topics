import axios from 'axios';

export default {
  getCatalogType(id) {
    return axios.get('/api/type/' + id, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  postNewCatalogType(newCatalogType) {
    return axios.post('/api/type/', newCatalogType, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  putCatalogType(id, newCatalogType) {
    return axios.put(`/api/type/${id}`, newCatalogType, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  fetchCatelogTypes() {
    return axios.get('/api/type/', {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  }
};
