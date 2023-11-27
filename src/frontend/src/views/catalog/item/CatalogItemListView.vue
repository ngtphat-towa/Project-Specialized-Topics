<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Catalog Item Table</h1>
      <button class="btn btn-primary" @click="addNewProduct">Add Catalog Item</button>
    </div>
    <!-- SearchAndFilter -->
    <div class="mb-3 d-flex justify-content-between">
      <input v-model="searchTerm" class="form-control" placeholder="Search..." />
      <select v-model="searchField" class="form-control">
        <option value="name">Name</option>
        <option value="catalogType">Type</option>
        <option value="catalogBrand">Brand</option>
        <option value="price">Price</option>
        <option value="availableStock">Available Stock</option>
      </select>
      <select v-model="sortField" class="form-control">
        <option value="" selected>Select field to sort...</option>
        <option value="name">Name</option>
        <option value="catalogType">Type</option>
        <option value="catalogBrand">Brand</option>
        <option value="price">Price</option>
        <option value="availableStock">Available Stock</option>
      </select>
      <select v-model="sortMode" class="form-control">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <!-- AddNewProductForm -->
    <div v-if="showAddForm" class="mb-3 border p-3 rounded">
      <h2>Add new item</h2>
      <form @submit.prevent="addNewItem" class="p-3 border rounded">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="newProduct.name" />
          <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
        </div>
        <div class="form-group">
          <label>Image</label>
          <input type="file" class="form-control" @change="onImageChange" required />
          <p v-if="errors.image" class="text-danger">{{ errors.image }}</p>
        </div>
        <div class="form-group" v-if="reviewImage">
          <label>Review Image</label>
          <img class="review-image" :src="reviewImage" alt="Image preview" />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            class="form-control"
            v-model="newProduct.price"
          />
        </div>
        <div class="form-group">
          <label>SKU</label>
          <input type="number" min="0" class="form-control" v-model="newProduct.availableStock" />
        </div>
        <div class="form-group">
          <label>Type</label>

          <select class="form-control" v-model="newProduct.catalogBrand">
            <option v-for="option in catalogBrandOptions" :value="option" :key="option._id">
              {{ option.name }}
            </option>
          </select>
          <p v-if="errors.catalogBrand" class="text-danger">{{ errors.catalogBrand }}</p>
        </div>
        <div class="form-group">
          <label>Type</label>

          <select class="form-control" v-model="newProduct.catalogType">
            <option v-for="option in catalogTypeOptions" :value="option" :key="option._id">
              {{ option.name }}
            </option>
          </select>
          <p v-if="errors.catalogType" class="text-danger">{{ errors.catalogType }}</p>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control"
            id="w3review"
            name="description"
            v-model="newProduct.description"
            rows="4"
            cols="50"
          ></textarea>
          <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
        </div>
        <button class="btn btn-success" @click="addNewItem()" type="submit">Save</button>
        <button class="btn btn-danger" @click="cancelAdd()">Cancel</button>
      </form>
    </div>
    <!-- Product Table -->
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">SKU</th>
          <th scope="col">Type</th>
          <th scope="col">Brand</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in items" :key="item.name">
          <tr>
            <td>
              <img
                class="catalog-item-image"
                :src="convertToBase64Image(item)"
                alt="Image preview"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.availableStock }}</td>
            <td>{{ item.catalogType.name }}</td>
            <td>{{ item.catalogBrand.name }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" @click="showDetails(index)">
                  Details
                </button>
                <button type="button" class="btn btn-success" @click="editItem(index, item)">
                  Edit Item
                </button>
                <button class="btn btn-danger" @click="confirmDelete(index)">Delete Item</button>
              </div>
            </td>
          </tr>
          <!-- Description Tab -->
          <tr v-if="showDetailIndex === index">
            <td colspan="7">{{ item.description }}</td>
          </tr>
          <!-- Edit Product Information Tab -->
          <tr v-if="editingIndex === index">
            <td colspan="7">
              <h2>Edit Product</h2>
              <form @submit.prevent="updateItem" class="p-3 border rounded">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-control" v-model="items[editingIndex].name" />
                  <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
                </div>
                <div class="form-group">
                  <label>Image</label>
                  <input type="file" class="form-control" @change="onImageChange" />
                  <p v-if="errors.image" class="text-danger">{{ errors.image }}</p>
                </div>
                <div class="form-group" v-if="reviewImage">
                  <label>Review Image</label>
                  <img class="review-image" :src="reviewImage" alt="Image preview" />
                  <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
                </div>
                <div class="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    v-model="items[editingIndex].price"
                  />
                </div>
                <div class="form-group">
                  <label>SKU</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="items[editingIndex].availableStock"
                  />
                </div>
                <div class="form-group">
                  <label>Type</label>

                  <select class="form-control" v-model="items[editingIndex].catalogBrand">
                    <option v-for="option in catalogBrandOptions" :value="option" :key="option._id">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Type</label>

                  <select class="form-control" v-model="items[editingIndex].catalogType">
                    <option v-for="option in catalogTypeOptions" :value="option" :key="option._id">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    class="form-control"
                    id="w3review"
                    name="description"
                    v-model="items[editingIndex].description"
                    rows="4"
                    cols="50"
                  ></textarea>
                  <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
                </div>
                <button class="btn btn-success" @click="updateItem(item)" type="submit">
                  Save
                </button>
                <button class="btn btn-danger" @click="cancelEdit(item)">Cancel</button>
              </form>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- Navigation Bar -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: pageIndex === 1 }">
          <a class="page-link" href="#" @click.prevent="pageIndex--">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === pageIndex }"
        >
          <a class="page-link" href="#" @click.prevent="pageIndex = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pageIndex === totalPages }">
          <a class="page-link" href="#" @click.prevent="pageIndex++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
// import { productItems } from './tempProduct.js';
import convertToBase64 from '../../../services/image/image.render';
import catalogItemService from '../../../services/catalog/item.service';
import Swal from 'sweetalert2';

export default {
  name: 'CatalogItemListView',
  setup() {
    const items = ref(null);
    const editingIndex = ref(null);
    const showDetailIndex = ref(null);
    const showAddForm = ref(false);
    const searchTerm = ref('');
    const searchField = ref('name');
    const sortField = ref('name');
    const sortMode = ref('asc');
    const pageIndex = ref(1);
    const pageSize = ref(6);
    const totalPages = ref(1);
    const newProduct = ref({
      name: '',
      description: '',
      price: 0,
      catalogType: '',
      catalogBrand: '',
      availableStock: 0,
      image: null
    });

    const errors = ref({
      name: '',
      price: '',
      availableStock: '',
      description: '',
      catalogType: '',
      catalogBrand: '',
      image: ''
    });
    // get catalog item data and search or short
    const getCatalogItemData = () => {
      const payload = {
        searchField: searchField.value,
        sortField: sortField.value,
        sortMode: sortMode.value,
        pageSize: pageSize.value,
        pageIndex: pageIndex.value - 1
      };
      if (searchTerm.value !== '') {
        payload.searchTerm = searchTerm.value;
      }
      catalogItemService
        .getCatalogItemsSearchAndSort(payload)
        .then((response) => {
          const itemsData = response.data.data;
          items.value = itemsData;
          totalPages.value = Math.ceil(Number(response.data.totalItems) / pageSize.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    watch([searchTerm, searchField, sortField, sortMode, pageSize, pageIndex], getCatalogItemData, {
      immediate: true
    });

    // Image for editing
    const reviewImage = ref(null);

    const showDetails = (index) => {
      showDetailIndex.value = showDetailIndex.value === index ? null : index;
      editingIndex.value = null;
    };

    const cancelAdd = () => {
      showAddForm.value = false;
    };
    const cancelEdit = () => {
      editingIndex.value = null;
    };

    const confirmDelete = (index) => {
      if (window.confirm('Are you sure you want to delete this employee?')) {
        deleteItem(index);
      }
    };

    const deleteItem = (index) => {
      items.value.splice(index, 1);
    };

    return {
      errors,
      pageIndex,
      pageSize,
      totalPages,
      items,
      searchField,
      sortField,
      sortMode,
      newProduct,
      reviewImage,
      searchTerm,
      editingIndex,
      showDetailIndex,
      showAddForm,
      getCatalogItemData,
      deleteItem,
      confirmDelete,
      cancelEdit,
      showDetails,
      cancelAdd
    };
  },
  data() {
    return {
      catalogTypeOptions: null,
      catalogBrandOptions: null
    };
  },
  methods: {
    addNewProduct() {
      this.showAddForm = !this.showAddForm;
      this.newProduct = {
        name: '',
        description: '',
        price: 0,
        catalogType: '',
        catalogBrand: '',
        availableStock: 0,
        image: null
      };
    },
    editItem(index, item) {
      this.editingIndex = this.editingIndex === index ? null : index;
      this.showDetailIndex = null;

      this.reviewImage = this.convertToBase64Image(item);
      this.image = null;
    },
    // update catalog Item
    updateItem(item) {
      console.log(item);
      if (!this.validateFeild(item)) {
        return;
      }
      // Create a new FormData instance
      let formData = new FormData();

      // Append the data
      formData.append('name', item.name);
      formData.append('price', item.price);
      formData.append('availableStock', item.availableStock);
      formData.append('description', item.description);
      formData.append('catalogType', item.catalogType._id);
      formData.append('catalogBrand', item.catalogBrand._id);
      if (this.image) {
        formData.append('image', this.image);
      }

      catalogItemService
        .updateCatalogItem(item._id, formData)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            text: 'Catalog item added successfully!',
            icon: 'success',
            allowOutsideClick: false
          });

          this.editingIndex = null;
          this.getCatalogItemData();
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            text: 'Catalog item added failed!',
            icon: 'error',
            allowOutsideClick: false
          });
        });
    },
    // add new product
    addNewItem() {
      console.log(this.newProduct);
      if (!this.validateFeild(this.newProduct)) {
        return;
      }
      const item = this.newProduct;
      // Create a new FormData instance
      let formData = new FormData();

      // Append the data
      formData.append('name', item.name);
      formData.append('price', item.price);
      formData.append('availableStock', item.availableStock);
      formData.append('description', item.description);
      formData.append('catalogType', item.catalogType._id);
      formData.append('catalogBrand', item.catalogBrand._id);
      if (this.image) {
        formData.append('image', this.image);
      }
      console.log(formData);

      catalogItemService
        .createCatalogItem(formData)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            text: 'Catalog itemadded successfully!',
            icon: 'success',
            allowOutsideClick: false
          });

          this.showAddForm = false;
          this.getCatalogItemData();
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            text: 'Catalog itemadded failed!',
            icon: 'error',
            allowOutsideClick: false
          });
        });
    },
    onImageChange(e) {
      const file = e.target.files[0];
      if (this.showAddForm && !file) {
        this.errors.image = 'Image is required.';
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.errors.image = 'Invalid image format.';
        return;
      }
      this.image = file;
      this.reviewImage = URL.createObjectURL(file);
      this.errors.image = '';
    },
    convertToBase64Image(item) {
      if (!item.image) {
        return '';
      }
      return convertToBase64(item.image.data);
    },

    populateCatalogItemOption() {
      catalogItemService
        .getCatalogBrands()
        .then((response) => {
          this.catalogBrandOptions = response.data;
        })
        .catch((err) => console.log('populateCatalogItemOption', err));
      catalogItemService
        .getCatalogTypes()
        .then((response) => {
          this.catalogTypeOptions = response.data;
        })
        .catch((err) => console.log('populateCatalogItemOption', err));
    },
    validateFeild(validateItem) {
      let isValid = true;

      // Reset errors
      this.errors = {
        name: '',
        price: '',
        availableStock: '',
        image: '',
        catalogType: '',
        catalogBrand: ''
      };

      // Validate name
      if (!validateItem.name) {
        isValid = false;
        this.errors.name = 'Name is required.';
      }

      // Validate price
      if (!validateItem.price) {
        isValid = false;
        this.errors.price = 'Price is required.';
      }

      // Validate available stock
      if (!validateItem.availableStock) {
        isValid = false;
        this.errors.price = 'Available Stock is required.';
      }

      // Validate image
      if (this.showAddForm && !this.image) {
        isValid = false;
        this.errors.image = 'Image is required.';
      }

      // Validate catalog type
      if (!validateItem.catalogType) {
        isValid = false;
        this.errors.catalogType = 'Catalog itemis required.';
      }

      // Validate catalog brand
      if (!validateItem.catalogBrand) {
        isValid = false;
        this.errors.catalogBrand = 'Catalog brand is required.';
      }

      return isValid;
    }
  },

  mounted() {
    this.getCatalogItemData();
    this.populateCatalogItemOption();
  }
};
</script>

<style scoped>
.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}
.font-weight-bold {
  font-weight: bold;
}
.catalog-item-image {
  width: 65px;
  height: auto;
}

.review-image {
  display: block;
  width: 230px;
  height: auto;
}
</style>
