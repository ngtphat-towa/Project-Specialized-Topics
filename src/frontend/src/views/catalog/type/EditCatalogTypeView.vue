<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit CatalogType</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form v-if="catalogType">
          <div class="form-group">
            <label>CatalogType Name</label>
            <input type="text" class="form-control" v-model="catalogType.name" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="catalogType.description" required />
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
          <button type="button" class="btn btn-primary" @click="editCatalogType">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import catalogTypeService from '../../services/catalogType.service';
import swal from 'sweetalert';
export default {
  data() {
    return {
      catalogType: null,
      id: null,
    };
  },
  props: ['categories'],
  methods: {
    async editCatalogType() {
      delete this.catalogType['products'];
      console.log('catalogType', this.catalogType);
      await catalogTypeService
        .updateCatalogType(this.catalogType.id, localStorage.getItem('token'), this.catalogType)
        .then(() => {
          this.$emit('fetchData');
          this.$router.push({ name: 'CatalogType' });
          swal({
            text: 'catalogType has been updated successfully',
            icon: 'success',
          });
        })
        .catch((err) => console.log('err', err));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.catalogType = this.categories.find((catalogType) => catalogType.id == this.id);
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
