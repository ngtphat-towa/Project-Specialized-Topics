<template>
  <div
    class="container"
    style="

  padding: 20px;
}"
  >
    <h3 class="text-center text-white bg-dark p-2">Shopping</h3>
    <!-- SearchAndFilter -->
    <div class="mb-3 row">
      <div class="form-group col-md-3">
        <label for="searchTerm" class="font-weight-bold">Search Term:</label>
        <div class="input-group">
          <input
            id="searchTerm"
            v-model="searchTerm"
            class="form-control"
            placeholder="Search..."
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="form-group col-md-3">
        <label for="searchField" class="font-weight-bold">Search Field:</label>
        <select id="searchField" v-model="searchField" class="form-control">
          <option value="name">Name</option>
          <option value="catalogType">Type</option>
          <option value="catalogBrand">Brand</option>
          <option value="price">Price</option>
          <option value="availableStock">Available Stock</option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <label for="sortField" class="font-weight-bold">Sort Field:</label>
        <select id="sortField" v-model="sortField" class="form-control">
          <option value="" selected>Select field to sort...</option>
          <option value="name">Name</option>
          <option value="catalogType">Type</option>
          <option value="catalogBrand">Brand</option>
          <option value="price">Price</option>
          <option value="availableStock">Available Stock</option>
        </select>
      </div>
      <div class="form-group col-md-3">
        <label for="sortMode" class="font-weight-bold">Sort Mode:</label>
        <select id="sortMode" v-model="sortMode" class="form-control">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <!-- Product Table -->
    <div class="row">
      <div
        v-for="item in this.items"
        :key="item._id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <DisplayProductBox class="DisplayProductBox" :displayProduct="item" />
      </div>
    </div>
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
import catalogItemService from '../../../services/catalog/item.service';
import DisplayProductBox from '../../../components/catalog/DisplayProductBox.vue';
export default {
  name: 'ShoppingListView',
  components: { DisplayProductBox },
  setup() {
    const items = ref(null);
    const searchTerm = ref('');
    const searchField = ref('name');
    const sortField = ref('name');
    const sortMode = ref('asc');
    const pageIndex = ref(1);
    const pageSize = ref(6);
    const totalPages = ref(1);

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

    return {
      pageIndex,
      pageSize,
      totalPages,
      items,
      searchField,
      sortField,
      sortMode,
      searchTerm,
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
.catalog-item-image {
  width: 65px;
  height: auto;
}
.card-title:hover {
  color: #ff0099;
}
.review-image {
  display: block;
  width: 230px;
  height: auto;
}
</style>
