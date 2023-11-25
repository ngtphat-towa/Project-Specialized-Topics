<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Catalog Types</h3>
        <router-link :to="{ name: 'AddCatalogType' }">
          <button class="btn" style="float: right">Add CatalogType</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div
        v-for="catalogType of categories"
        :key="catalogType.id"
        class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
      >
        <CatalogTypeBox :catalogType="catalogType"> </CatalogTypeBox>
      </div>
    </div>
  </div>
</template>
<script>
import catalogTypeService from '../../../services/catalog/type.service';
import CatalogTypeBox from '../../../components/catalog/CatalogTypeBox.vue';

export default {
  name: 'CatalogTypeListView',
  components: { CatalogTypeBox },
  data() {
    return {
      categories: []
    };
  },
  methods: {
    async getCatalogTypes() {
      await catalogTypeService
        .fetchCatelogTypes()
        .then((res) => (this.categories = res.data))
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.getCatalogTypes();
  }
};
</script>
<style scoped></style>
