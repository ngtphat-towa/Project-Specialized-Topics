<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <RouterLink class="nav-link" to="/">
        <img
          src="@/assets/logo.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt="Vue logo"
        />
      </RouterLink>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about">About</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'CatalogTypeList' }"
            >Catalog Type List View</RouterLink
          >
        </li>

        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'CatalogBrandList' }"
            >Catalog Brand List View</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'CatalogItemList' }"
            >Catalog Item List View</RouterLink
          >
        </li>
      </ul>
      <div class="icons">
        <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
        <router-link :to="{ name: 'Cart' }">
          <div class="fas fa-shopping-cart cart"></div>
        </router-link>

        <div v-if="!token" class="fas fa-user account">
          <ul class="drop-down-select">
            <li>
              <router-link :to="{ name: 'Signin' }">login</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Signup' }">register</router-link>
            </li>
          </ul>
        </div>

        <div v-else class="fas fa-user account" style="background: #f38609; color: white">
          <ul class="drop-down-select">
            <!-- validate admin -->
            <li>
              <router-link :to="{ name: 'Admin' }">Admin</router-link>
            </li>
            <li>
              <router-link @click="signout" to="/">Sign out</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const token = ref(null);
    return { token };
  },
  data() {
    return {
      tempolaryTypeId: '6562067fdb0f4a59e98301d9',
      tempolaryBrandId: '655cc6eca8668f0aa83e38ea'
    };
  },
  mounted() {
    this.token = localStorage.getItem('token');
  }
};
</script>
