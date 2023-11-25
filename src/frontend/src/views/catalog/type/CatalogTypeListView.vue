<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Our Categories</h4>
        <router-link :to="{ name: 'AddCatalogTypeView' }">
          <button class="btn" style="float: right">Add Catalog Type</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="category of catalogTypes"
        :key="category.id"
        class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
      >
        <CatalogTypeBox :category="category"> </CatalogTypeBox>
      </div>
    </div>
  </div>
</template>
<script>
import CatalogTypeBox from '../../components/CatalogType/CatalogTypeBox.vue';
export default {
  name: 'CatalogTypeListView',
  props: ['catalogTypes'],
  components: { CatalogTypeBox },
  data() {},
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
