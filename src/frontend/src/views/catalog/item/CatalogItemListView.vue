<template>
  <div class="container">
    <h1>Catalog Item:</h1>

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
          <tr v-if="showDetailIndex === index">
            <td colspan="7">{{ item.description }}</td>
          </tr>
          <tr v-if="editingIndex === index">
            <td colspan="7">
              <h2>Edit Product</h2>
              <form @submit.prevent="updateItem" class="p-3 border rounded">
                <div class="form-group">
                  <label>Image</label>
                  <input type="file" class="form-control" @change="onImageChange" required />
                  <p v-if="errors.image" class="text-danger">{{ errors.image }}</p>
                </div>
                <div class="form-group" v-if="reviewImage">
                  <label>Review Image</label>
                  <img class="review-image" :src="reviewImage" alt="Image preview" />
                  <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
                </div>
                <div class="form-group">
                  <label>Price</label>
                  <input type="number" class="form-control" v-model="items[editingIndex].price" />
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
  </div>
</template>

<script>
import { ref } from 'vue';
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
    const searchTerm = ref(false);

    // Options

    // Image for editing
    const reviewImage = ref(null);

    const showDetails = (index) => {
      showDetailIndex.value = showDetailIndex.value === index ? null : index;
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
      items,
      reviewImage,
      searchTerm,
      editingIndex,
      showDetailIndex,
      showAddForm,
      deleteItem,
      confirmDelete,
      cancelEdit,
      showDetails,
      cancelAdd
      // fetch data
      // getCatalogItemData
    };
  },
  data() {
    return {
      catalogTypeOptions: null,
      catalogBrandOptions: null,
      errors: {
        name: '',
        price: '',
        availableStock: 1,
        image: ''
      }
    };
  },
  methods: {
    editItem(index, item) {
      this.editingIndex = this.editingIndex === index ? null : index;
      this.reviewImage = this.convertToBase64Image(item);
      this.image = null;
    },
    updateItem(item) {
      console.log(item);
      if (!this.validateFeild()) {
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
            text: 'Catalog type added Successfully!',
            icon: 'success',
            allowOutsideClick: false
          });

          this.editingIndex = null;
          this.getCatalogItemData();
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            text: 'Catalog type added failed!',
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
    getCatalogItemData() {
      catalogItemService
        .getAllCatalogItems()
        .then((response) => {
          const itemsData = response.data.data;
          this.items = itemsData;
        })
        .catch((err) => {
          console.log(err);
        });
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
    validateFeild() {
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
      if (!this.items[this.editingIndex].name) {
        isValid = false;
        this.errors.name = 'Name is required.';
      }

      // Validate price
      if (!this.items[this.editingIndex].price) {
        isValid = false;
        this.errors.price = 'Price is required.';
      }

      // Validate available stock
      if (!this.items[this.editingIndex].availableStock) {
        isValid = false;
        this.errors.price = 'Available Stock is required.';
      }

      // Validate image
      if (this.showAddForm && !this.image) {
        isValid = false;
        this.errors.image = 'Image is required.';
      }

      // Validate catalog type
      if (!this.items[this.editingIndex].catalogType) {
        isValid = false;
        this.errors.catalogType = 'Catalog type is required.';
      }

      // Validate catalog brand
      if (!this.items[this.editingIndex].catalogBrand) {
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
