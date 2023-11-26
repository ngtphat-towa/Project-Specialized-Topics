<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Update catalog brand</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label>Brand Name</label>
            <input type="text" class="form-control" v-model="brandName" required />
            <p v-if="errors.brandName" class="text-danger">{{ errors.brandName }}</p>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="brandCountry" required />
            <p v-if="errors.brandCountry" class="text-danger">{{ errors.brandCountry }}</p>
          </div>
          <div class="form-group">
            <label>Image</label>
            <input type="file" class="form-control" @change="onImageChange" required />
            <p v-if="errors.image" class="text-danger">{{ errors.image }}</p>
          </div>
          <div class="form-group" v-if="reviewImage">
            <label>Review Image</label>
            <img :src="reviewImage" alt="Image preview" style="width: 100%; height: auto" />
          </div>
          <button type="button" class="btn btn-primary" @click="addCatalogBrand">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import catalogBrandService from '../../../services/catalog/brand.service';
import convertToBase64 from '../../../services/image/image.render';
import Swal from 'sweetalert2';
// import { Buffer } from 'buffer';
export default {
  data() {
    return {
      oldCatlogBrand: null,
      brandName: null,
      brandCountry: null,
      image: null,
      reviewImage: null,
      errors: {
        brandName: '',
        brandCountry: '',
        image: ''
      }
    };
  },
  methods: {
    onImageChange(e) {
      const file = e.target.files[0];
      if (!file) {
        this.errors.image = 'Image is required.';
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.errors.image = 'Invalid image format.';
        return;
      }
      this.image = file;
      this.reviewImage = URL.createObjectURL(file);
      this.errors.image = '';
    },

    validateFeild() {
      var isValid = true;
      if (!this.brandName) {
        isValid = false;
        this.errors.brandName = 'Brand name is required.';
      }
      if (!this.brandCountry) {
        isValid = false;

        this.errors.brandCountry = 'Description is required.';
      }
      return isValid;
    },

    async addCatalogBrand() {
      if (!this.validateFeild()) {
        return;
      }
      // Create a new FormData instance
      let formData = new FormData();

      // Append the data
      formData.append('name', this.brandName);
      formData.append('country', this.brandCountry);
      if (this.image) {
        formData.append('image', this.image);
      }

      console.log(formData);
      await catalogBrandService
        .putCatalogBrand(this.$route.params.id, formData)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            text: 'Catalog brand added successfully!',
            icon: 'success',
            allowOutsideClick: false
          });

          this.$router.push('/admin/catalog/brand/');
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            text: 'Catalog brand added failed!',
            icon: 'error',
            allowOutsideClick: false
          });
        });
    },
    async fetchCatalogBrandByIdParam() {
      await catalogBrandService
        .getCatalogBrand(this.$route.params.id)
        .then((response) => {
          const catalogBrand = response.data;
          this.oldCatlogBrand = catalogBrand;

          this.brandName = catalogBrand.name;
          this.brandCountry = catalogBrand.country;
          if (catalogBrand && catalogBrand.image && catalogBrand.image.data) {
            this.reviewImage = convertToBase64(catalogBrand.image.data);
          } else {
            console.error('Image data not available', catalogBrand);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },

  mounted() {
    this.fetchCatalogBrandByIdParam();
  }
};
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
.review-image {
  width: 100%;
  height: auto;
}
.form-group label {
  margin-bottom: 0.2rem;
}
.form-group input {
  margin-top: 0.2rem;
  margin-bottom: 0.6rem;
}
</style>
