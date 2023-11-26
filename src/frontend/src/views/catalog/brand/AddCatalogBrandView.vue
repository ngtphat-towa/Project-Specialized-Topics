<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Add new catalog brand</h4>
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
            <label>Country</label>
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
import Swal from 'sweetalert2';
export default {
  data() {
    return {
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

        this.errors.brandCountry = 'Country is required.';
      }
      if (!this.image) {
        isValid = false;
        this.errors.image = 'Image is required.';
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
      formData.append('image', this.image);

      console.log(formData);
      await catalogBrandService
        .postNewCatalogBrand(formData)
        .then(() => {
          Swal.fire({
            text: 'Catalog brand added Successfully!',
            icon: 'success',
            allowOutsideClick: false
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            text: 'Catalog brand added failed!',
            icon: 'error',
            allowOutsideClick: false
          });
        });
    }
  },
  mounted() {}
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
