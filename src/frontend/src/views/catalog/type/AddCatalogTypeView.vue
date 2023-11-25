<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Add new catalog type</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label>Type Name</label>
            <input type="text" class="form-control" v-model="name" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="description" required />
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

          <button type="button" class="btn btn-primary" @click="addCatalogType">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import catalogTypeService from '../../../services/catalog/TypeService';
import sweetalert from 'sweetalert';

export default {
  name: 'AddCatalogTypeView',
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
    async addCatalogType() {
      try {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('image', this.image);

        console.log('addCatalogType: FormData', formData);

        await catalogTypeService
          .createType(formData)
          .then(() => {
            sweetalert({
              text: 'Category added successfully',
              icon: 'success',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log('addCatalogType Error', error);
      }

      this.addCatalogType();
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
