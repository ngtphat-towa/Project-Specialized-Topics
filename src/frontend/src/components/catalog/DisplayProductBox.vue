<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img class="card-img-top embed-responsive-item" :src="base64Image" alt="Card image cap" />
    </div>

    <div class="card-body">
      <router-link :to="{ name: 'DisplayItemDetailView', params: { id: displayProduct._id } }">
        <h5 class="card-title">{{ displayProduct.name }}</h5>
      </router-link>

      <p class="card-text">{{ displayProduct.description.substring(0, 65) }}...</p>
    </div>
  </div>
</template>
<script>
import convertToBase64 from '../../services/image/image.render';
// import { productItems } from '../../views/catalog/item/tempProduct.js';
export default {
  name: 'DisplayProductBox',
  props: ['displayProduct'],
  data() {
    return {
      base64Image: '',
      // displayProduct: productItems.data[0]
    };
  },
  watch: {
    displayProduct: {
      immediate: true,
      handler(newValue) {
        if (newValue && newValue.image && newValue.image.data) {
          this.base64Image = convertToBase64(newValue.image.data);
        }
      }
    }
  }
};
</script>
<style scoped>
.card-img-top {
  object-fit: contain;
}
a {
  text-decoration: none;
}
.card-title {
  color: #484848;
}
</style>
