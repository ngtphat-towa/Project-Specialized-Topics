import axios from 'axios';

export default {
  getCatalogItemsByBrandAndTypeId(typeId, brandId) {
    return axios.get(`/api/item/type/${typeId}/brand/${brandId}`, { withCredentials: true });
  },
  getCatalogItemsByBrandId(brandId) {
    return axios.get(`/api/item/type/all/brand/${brandId}`, { withCredentials: true });
  },
  getCatalogTypes() {
    return axios.get(`/api/item/catalogtypes`, { withCredentials: true });
  },
  getCatalogBrands() {
    return axios.get(`/api/item/catalogbrands`, { withCredentials: true });
  },
  getAllCatalogItems() {
    return axios.get(`/api/item/`, { withCredentials: true });
  },
  getCatalogItemsByName(name) {
    return axios.get(`/api/item/by?name=${name}`, { withCredentials: true });
  },
  getCatalogItemById(id) {
    return axios.get(`/api/item/${id}`, { withCredentials: true });
  },
  createCatalogItem(newCatalogItem) {
    return axios.post(`/api/item/`, newCatalogItem, { withCredentials: true });
  },
  updateCatalogItem(updatedCatalogItem) {
    const id = updatedCatalogItem._id;
    return axios.put(`/api/item/${id}`, updatedCatalogItem, { withCredentials: true });
  },
  deleteCatalogItem(id) {
    return axios.delete(`/api/item/${id}`, { withCredentials: true });
  },
  deleteAllCatalogItems() {
    return axios.delete(`/api/item/`, { withCredentials: true });
  }
};
