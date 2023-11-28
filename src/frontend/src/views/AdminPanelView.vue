<template>
  <div class="d-flex">
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading"><strong>Admin Panel</strong></div>
      <div class="list-group list-group-flush">
        <router-link
          class="list-group-item list-group-item-action bg-light"
          to="/admin/catalog/type/add"
          >Add Catalog Type</router-link
        >
        <router-link
          class="list-group-item list-group-item-action bg-light"
          to="/admin/catalog/brand/add"
          >Add Catalog Brand</router-link
        >
        <router-link
          class="list-group-item list-group-item-action bg-light"
          to="/admin/catalog/type/"
          >Catalog Type List</router-link
        >
        <router-link
          class="list-group-item list-group-item-action bg-light"
          to="/admin/catalog/brand/"
          >Catalog Brand List</router-link
        >
        <router-link
          class="list-group-item list-group-item-action bg-light"
          to="/admin/catalog/item/"
          >Catalog Item List</router-link
        >
        <router-link class="list-group-item list-group-item-action bg-light" to="/admin/order"
          >Order List</router-link
        >
      </div>
    </div>

    <!-- Page Content -->
    <div class="flex-grow-1">
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import FooterComponent from '../components/FooterComponent.vue';
export default {
  name: 'AdminPanelView',
  data() {
    return {};
  },
  components: {}
};
</script>
<style>
html {
  overflow-y: scroll;
}
</style>
