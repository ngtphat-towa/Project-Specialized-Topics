import axios from 'axios';

export default {
  getCatalogBrand(id) {
    return axios.get('/api/brand/' + id, {
      headers: {
        'Content-Brand': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  postNewCatalogBrand(newCatalogBrand) {
    return axios.post('/api/brand/', newCatalogBrand, {
      headers: {
        'Content-Brand': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  putCatalogBrand(id, newCatalogBrand) {
    return axios.put(`/api/brand/${id}`, newCatalogBrand, {
      headers: {
        'Content-Brand': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  fetchCatelogBrands() {
    return axios.get('/api/brand/', {
      headers: {
        'Content-Brand': 'multipart/form-data'
      },
      withCredentials: true
    });
  }
};
