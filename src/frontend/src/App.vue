<script setup></script>

<template>
  <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link>|
    <router-link to="/admin/catalog/type/add">Add new type</router-link>
  </nav>
  <div>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup() {},
};
</script>
