<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img class="card-img-top embed-responsive-item" :src="base64Image" alt="Card image cap" />
    </div>

    <div class="card-body">
      <RouterLink :to="{ name: 'ShowDetails', params: { id: displayProduct.id } }">
        <h5 class="card-title">{{ displayProduct.name }}</h5>
      </RouterLink>

      <p class="card-text">{{ displayProduct.description.substring(0, 65) }}...</p>
      <!-- <RouterLink
        :to="{ name: 'EditProduct', params: { id: displayProduct.id } }"
        v-show="$route.name == 'Product'"
      >
        <button class="btn btn-primary">Edit</button>
      </RouterLink> -->
    </div>
  </div>
</template>
<script>
import convertToBase64 from '../../services/image/image.render';
export default {
  name: 'DisplayProductBox',
  props: ['displayProduct'],
  data() {
    return {
      base64Image: ''
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
