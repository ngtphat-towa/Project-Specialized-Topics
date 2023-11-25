<template>
  <Navbar :cartCount="basketCount" @resetCartCount="resetCartCount" />
  <router-view
    v-if="catalogTypes && catalogItems"
    style="min-height: 60vh"
    :categories="catalogTypes"
    :products="catalogItems"
    @fetchData="fetchData"
  >
  </router-view>
  <!--  footer-->
  <FooterComponent />
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import Navbar from './components/navbar.vue';

export default {
  name: 'App',
  components: { Navbar, FooterComponent },
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
