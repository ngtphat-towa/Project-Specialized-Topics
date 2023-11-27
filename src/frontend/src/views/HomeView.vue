<template>
  <div id="home">
    <div id="background-div" class="page-holder bg-cover">
      <div class="container py-5">
        <header class="text-left text-white py-5">
          <h3 class="mb-4 rounded">
            <a href="#start-shopping" class="bg-white px-2 py-2 rounded" id="heading"
              >Start Shopping</a
            >
          </h3>
          <p id="content" class="lead mb-0 bg-dark p-1 rounded">
            This project by Nguyen Thanh Phat
          </p>
        </header>
      </div>
    </div>

    <!--    display type -->
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="display-5">Feature Categories</h3>
        </div>
      </div>
      <div class="row">
        <div
          v-for="index in this.catalogTypeListSize"
          :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
        >
          <DisplayTypeBox class="DisplayTypeBox" :catalogType="catalogTypeList[index - 1]" />
        </div>
      </div>
    </div>

    <!--    display brands-->
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="display-5">Feature Categories</h3>
        </div>
      </div>
      <div class="row">
        <div
          v-for="index in this.catalogBrandListSize"
          :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
        >
          <DisplayBrandBox class="DisplayBrandBox" :catalogBrand="catalogBrandList[index - 1]" />
        </div>
      </div>
    </div>
    <!--    display top products-->
    <div class="container my-5">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="display-5">Feature Products</h3>
        </div>
      </div>

      <!-- display products-->
      <div class="row">
        <div
          v-for="index in this.catlogItemListSize"
          :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
        >
          <DisplayProductBox
            class="DisplayProductBox"
            :displayProduct="catlogItemList[index - 1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayBrandBox from '../components/catalog/DisplayBrandBox.vue';
import DisplayTypeBox from '../components/catalog/DisplayTypeBox.vue';
import DisplayProductBox from '../components/catalog/DisplayProductBox.vue';

import typeService from '../services/catalog/type.service';
import brandService from '../services/catalog/brand.service';
import itemService from '../services/catalog/item.service';

export default {
  name: 'HomeView',
  components: { DisplayProductBox, DisplayBrandBox, DisplayTypeBox },
  // props: ['categories', 'products'],
  data() {
    return {
      catalogTypeListSize: 0,
      catalogBrandListSize: 0,
      catlogItemListSize: 0,
      catalogTypeList: null,
      catalogBrandList: null,
      catlogItemList: null
    };
  },
  methods: {
    // fetch cata
    fetchDisplayData() {
      typeService
        .fetchCatelogTypes()
        .then((response) => {
          console.log(response.data);
          this.catalogTypeList = response.data;
          this.catalogTypeListSize = Math.min(6, this.catalogTypeList.length);
        })
        .then((err) => {
          console.log(err);
        });

      brandService
        .fetchCatelogBrands()
        .then((response) => {
          console.log(response.data);
          this.catalogBrandList = response.data;
          this.catalogBrandListSize = Math.min(6, this.catalogBrandList.length);
        })
        .then((err) => {
          console.log(err);
        });

      itemService
        .getAllCatalogItems({ pageIndex: 0, pageSize: 10 })
        .then((response) => {
          console.log(response.data);
          this.catlogItemList = response.data.data;
          this.catlogItemListSize = Math.min(10, this.catlogItemList.length);
        })
        .then((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.fetchDisplayData();
  }
};
</script>

<style scoped>
#home {
  padding: 20px;
}

.display-5 {
  color: #333;
}

.container {
  margin-top: 20px;
}
.page-holder {
  min-height: 100vh;
}
.bg-cover {
  background-size: cover !important;
}
#background-div {
  background: url(../assets/home.jpg);
}

.row {
  margin-bottom: 20px;
}

/* Style for DisplayBrandBox and DisplayProductBox */
.col-md-6,
.col-lg-4,
.col-12 {
  margin-bottom: 20px;
}

/* Add box shadow to DisplayBrandBox and DisplayProductBox */
.DisplayBrandBox,
.DisplayTypeBox,
.DisplayProductBox {
  border-radius: 8px;
  transition: transform 0.2s;
}

.DisplayBrandBox:hover,
.DisplayTypeBox:hover,
.DisplayProductBox:hover {
  transform: scale(1.05);
}

/* Style for heading */
h2 {
  color: #333;
}

/* Responsive styling for small screens */
@media (max-width: 576px) {
  .col-md-6,
  .col-lg-4,
  .col-12 {
    margin-bottom: 10px;
  }
}
</style>
