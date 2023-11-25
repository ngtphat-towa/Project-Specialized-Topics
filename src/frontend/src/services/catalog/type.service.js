import axios from 'axios';

export default {
  postNewCatalogType(newCatalogType) {
    return axios.post('/api/type/', newCatalogType, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  }
};
