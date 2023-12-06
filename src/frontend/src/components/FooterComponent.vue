<template>
  <footer>
    <div class="container pt-4">
      <div class="row">
        <p class="text-light font-weight-bold pb-2">Final Project 2023 - Cantho University</p>
      </div>
      <div class="row">
        <p class="text-light font-weight-bold pb-2">Made by <a href="#">Nguyen Thanh Phat</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
};
</script>

<style scoped>
footer {
  margin-top: 100px;
  background-color: #232f3e;
  font-size: 16px;
}
a {
  text-decoration: none;
  color: burlywood;
}

.row {
  text-align: center;
}
</style>
