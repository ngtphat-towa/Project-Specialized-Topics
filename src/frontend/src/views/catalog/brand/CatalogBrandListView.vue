<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Catalog Brands</h3>
        <router-link :to="{ name: 'AddCatalogBrand' }">
          <button class="btn" style="float: right">Add CatalogBrand</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="catalogBrand of categories"
        :key="catalogBrand.id"
        class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
      >
        <CatalogBrandBox :catalogBrand="catalogBrand"> </CatalogBrandBox>
      </div>
    </div>
  </div>
</template>
<script>
import catalogBrandService from '../../../services/catalog/brand.service';
import CatalogBrandBox from '../../../components/catalog/CatalogBrandBox.vue';

export default {
  name: 'CatalogBrandListView',
  components: { CatalogBrandBox },
  data() {
    return {
      categories: []
    };
  },
  methods: {
    async getCatalogBrands() {
      await catalogBrandService
        .fetchCatelogBrands()
        .then((res) => (this.categories = res.data))
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.getCatalogBrands();
  }
};
</script>
<style scoped></style>
