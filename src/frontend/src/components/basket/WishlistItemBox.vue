<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="convertToBase64Image()"
        alt="Card image cap"
      />
    </div>

    <a href="#" class="text-right px-3" @click="deleteWishlistItem">Remove</a>

    <div class="card-body">
      <router-link :to="{ name: 'DisplayItemDetailView', params: { id: product._id } }">
        <h5 class="card-title">{{ product.name }}</h5>
      </router-link>

      <p class="card-text">{{ product.description.substring(0, 65) }}...</p>
      <p class="card-text">${{ product.price }}</p>
    </div>
  </div>
</template>
<script>
import convertToBase64 from '../../services/image/image.render.js';

export default {
  name: 'ProductBox',
  props: ['product'],
  methods: {
    deleteWishlistItem() {
      this.$emit('onDeleteWishlistItem');
    },
    convertToBase64Image() {
      const data = this.product.image.data;
      return convertToBase64(data);
    }
  }
};
</script>
<style scoped>
.card {
  height: 24rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}

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
