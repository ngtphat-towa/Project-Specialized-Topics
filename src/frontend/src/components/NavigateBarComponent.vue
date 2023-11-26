<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      tempolaryTypeId: '6562067fdb0f4a59e98301d9',
      tempolaryBrandId: '655cc6eca8668f0aa83e38ea'
    };
  }
};
</script>
