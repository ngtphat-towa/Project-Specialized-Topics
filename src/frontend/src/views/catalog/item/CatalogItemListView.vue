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
              <img class="review-image" :src="convertToBase64Image(item)" alt="Image preview" />
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
                <button type="button" class="btn btn-success" @click="editItem(index)">
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
                  <!-- <p v-if="errors.image" class="text-danger">{{ errors.image }}</p> -->
                </div>
                <div class="form-group" v-if="reviewImage">
                  <label>Review Image</label>
                  <img :src="reviewImage" alt="Image preview" style="width: 100%; height: auto" />
                </div>
                <div class="form-group">
                  <label>Price</label>
                  <input class="form-control" v-model="items[editingIndex].price" />
                </div>
                <div class="form-group">
                  <label>SKU</label>
                  <input class="form-control" v-model="items[editingIndex].availableStock" />
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

    const editItem = (index) => {
      editingIndex.value = editingIndex.value === index ? null : index;
    };
    const cancelEdit = () => {
      this.editingIndex = null;
    };

    const updateItem = () => {
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

    const getCatalogItemData = async () =>
      await catalogItemService
        .getAllCatalogItems()
        .then((response) => {
          const itemsData = response.data.data;
          items.value = itemsData;
        })
        .catch((err) => {
          console.log(err);
        });
    return {
      items,
      reviewImage,
      searchTerm,
      editingIndex,
      showDetailIndex,
      showAddForm,
      deleteItem,
      confirmDelete,
      updateItem,
      editItem,
      cancelEdit,
      showDetails,
      cancelAdd,
      // fetch data
      getCatalogItemData
    };
  },
  data() {
    return {
      catalogTypeOptions: null,
      catalogBrandOptions: null
    };
  },
  methods: {
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
.review-image {
  width: 80px;
  height: 80px;
}
</style>
