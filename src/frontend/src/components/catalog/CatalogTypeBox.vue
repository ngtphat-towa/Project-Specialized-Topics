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
      <h5 class="card-title">{{ catalogType.name }}</h5>
      <p class="card-text">
        {{ catalogType.description }}
      </p>
    </div>
  </div>
</template>
<script>
import convertToBase64 from '../../services/image/image.render';
export default {
  name: 'CatalogTypeBox',
  props: ['catalogType'],
  methods: {
    convertToBase64Image() {
      const data = this.catalogType.image.data;
      return convertToBase64(data);
    }
  }
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>
