<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Our Categories</h4>
        <router-link :to="{ name: 'AddCatalogBrandView' }">
          <button class="btn" style="float: right">Add Catalog Brand</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="category of catalogBrands"
        :key="category.id"
        class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
      >
        <CatalogBrandBox :category="category"> </CatalogBrandBox>
      </div>
    </div>
  </div>
</template>
<script>
import CatalogBrandBox from '../../components/CatalogBrand/CatalogBrandBox.vue';
export default {
  name: 'CatalogBrandListView',
  props: ['catalogBrands'],
  components: { CatalogBrandBox },
  data() {},
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
