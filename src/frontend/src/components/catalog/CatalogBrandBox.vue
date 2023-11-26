<template>
  <div class="card w-100 h-100" style="margin-top: 10px">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="convertToBase64Image()"
        alt="Card image cap"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ catalogBrand.name }}</h5>
      <p class="card-text">
        {{ catalogBrand.country }}
      </p>

      <RouterLink
        class="btn btn-primary"
        :to="{ name: 'EditCatalogBrand', params: { id: catalogBrand._id } }"
        >Edit Catalog Brand</RouterLink
      >
    </div>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import convertToBase64 from '../../services/image/image.render';
export default {
  name: 'CatalogBrandBox',
  props: ['catalogBrand'],
  methods: {
    convertToBase64Image() {
      const data = this.catalogBrand.image.data;
      return convertToBase64(data);
    }
  },
  components: { RouterLink }
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>
