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
            <input type="text" class="form-control" v-model="name" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="description" required />
          </div>
          <div class="form-group">
            <label for="image">Choose a image for brand:</label>
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

          <button type="button" class="btn btn-primary" @click="addCatalogBrand">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCatalogBrandView',
  data() {
    return {
      name: '',
      description: '',
      image: null,
      imageURL: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
      this.imageURL = URL.createObjectURL(this.image);
    },
    async addCatalogBrand() {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('image', this.image);
      console.log('addCatalogBrand: FormData', formData);
      // await axios.post('/api/catalog-brands', formData, {
      //   headers: {
      //     'Content-Brand': 'multipart/form-data',
      //   },
      // })
      // // handle response
    },
  },
  mounted() {},
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
