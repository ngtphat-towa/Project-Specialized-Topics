<template>
  <div class="card w-100 h-100" style="margin-top: 10px">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="catalogType.imageUrl"
        alt="Card image cap"
      />
    </div>
    <div class="card-body">
      <router-link :to="{ name: 'ListProducts', params: { id: catalogType.id } }">
        <h5 class="card-title">{{ catalogType.name }}</h5>
      </router-link>
      <p class="card-text">
        {{ catalogType.description }}
      </p>
      <router-link
        :to="{ name: 'EditCatalogType', params: { id: catalogType.id } }"
        v-show="$route.name == 'CatalogType'"
      >
        <button class="btn btn-primary">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CatalogTypeBox',
  props: ['catalogType'],
  methods: {},
};
</script>

<style scoped>
.card-img-top {
  object-fit: contain;
}
</style>
