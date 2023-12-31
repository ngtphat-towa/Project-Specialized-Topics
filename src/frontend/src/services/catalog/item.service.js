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
  getAllCatalogItems(queryParams) {
    return axios.get(`/api/item/`, { params: queryParams, withCredentials: true });
  },
  getCatalogItemsSearchAndSort(payload) {
    return axios.post(`/api/item/admin/query`, payload, { withCredentials: true });
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
  updateCatalogItem(id, updatedCatalogItem) {
    return axios.put(`/api/item/${id}`, updatedCatalogItem, { withCredentials: true });
  },
  deleteCatalogItem(id) {
    return axios.delete(`/api/item/${id}`, { withCredentials: true });
  },
  deleteAllCatalogItems() {
    return axios.delete(`/api/item/`, { withCredentials: true });
  }
};
