<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Update catalog type</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label>Type Name</label>
            <input type="text" class="form-control" v-model="typeName" required />
            <p v-if="errors.typeName" class="text-danger">{{ errors.typeName }}</p>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="typeDescription" required />
            <p v-if="errors.typeDescription" class="text-danger">{{ errors.typeDescription }}</p>
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
          <button type="button" class="btn btn-primary" @click="addCatalogType">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import catalogTypeService from '../../../services/catalog/type.service';
import convertToBase64 from '../../../services/image/image.render';
import Swal from 'sweetalert2';
// import { Buffer } from 'buffer';
export default {
  data() {
    return {
      oldCatalogType: null,
      typeName: null,
      typeDescription: null,
      image: null,
      reviewImage: null,
      errors: {
        typeName: '',
        typeDescription: '',
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
      if (!this.typeName) {
        isValid = false;
        this.errors.typeName = 'Type name is required.';
      }
      if (!this.typeDescription) {
        isValid = false;

        this.errors.typeDescription = 'Description is required.';
      }
      return isValid;
    },

    async addCatalogType() {
      if (!this.validateFeild()) {
        return;
      }
      // Create a new FormData instance
      let formData = new FormData();

      // Append the data
      formData.append('name', this.typeName);
      formData.append('description', this.typeDescription);
      if (this.image) {
        formData.append('image', this.image);
      }

      console.log(formData);
      await catalogTypeService
        .putCatalogType(this.$route.params.id, formData)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            text: 'Catalog type added Successfully!',
            icon: 'success',
            allowOutsideClick: false
          });

          //TODO: return the admin catalog type
          this.$router.push('/admin/catalog/type/');
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            text: 'Catalog type added failed!',
            icon: 'error',
            allowOutsideClick: false
          });
        });
    },
    async fetchCatalogTypeByIdParam() {
      await catalogTypeService
        .getCatalogType(this.$route.params.id)
        .then((response) => {
          const catalogType = response.data;
          this.oldCatalogType = catalogType;

          this.typeName = catalogType.name;
          this.typeDescription = catalogType.description;
          if (catalogType && catalogType.image && catalogType.image.data) {
            this.reviewImage = convertToBase64(catalogType.image.data);
          } else {
            console.error('Image data not available', catalogType);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },

  mounted() {
    this.fetchCatalogTypeByIdParam();
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
