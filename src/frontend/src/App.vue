<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <NavigateBarComponent></NavigateBarComponent>
    </header>

    <div class="flex-grow-1">
      <RouterView></RouterView>
    </div>

    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import NavigateBarComponent from './components/NavigateBarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
export default {
  data() {
    return {};
  },
  components: { NavigateBarComponent, FooterComponent }
};
</script>
