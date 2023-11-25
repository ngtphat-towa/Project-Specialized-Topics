<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit CatalogBrand</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="catalogBrand">
          <div class="form-group">
            <label>CatalogBrand Name</label>
            <input type="text" class="form-control" v-model="catalogBrand.name" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="catalogBrand.description" required />
          </div>
          <div class="form-group">
            <label for="image">Choose a image for type:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              @change="handleFileUpload"
              required
            />
          </div>
          <div class="form-group">
            <label for="review-image">Reivew image:</label>
            <img
              v-if="image"
              class="form-control-file"
              :src="imageURL"
              id="review-image"
              alt="Selected image"
            />
          </div>
          <button type="button" class="btn btn-primary" @click="editCatalogBrand">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import catalogBrandService from '../../services/catalogBrand.service';
import swal from 'sweetalert';
export default {
  data() {
    return {
      catalogBrand: null,
      id: null,
    };
  },
  props: ['categories'],
  methods: {
    async editCatalogBrand() {
      delete this.catalogBrand['products'];
      console.log('catalogBrand', this.catalogBrand);
      await catalogBrandService
        .updateCatalogBrand(this.catalogBrand.id, localStorage.getItem('token'), this.catalogBrand)
        .then(() => {
          this.$emit('fetchData');
          this.$router.push({ name: 'CatalogBrand' });
          swal({
            text: 'catalogBrand has been updated successfully',
            icon: 'success',
          });
        })
        .catch((err) => console.log('err', err));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.catalogBrand = this.categories.find((catalogBrand) => catalogBrand.id == this.id);
  },
};
</script>
<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
label {
  display: block;
}
.preview-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}
</style>
