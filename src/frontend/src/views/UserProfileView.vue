<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>User Profile</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="user.username"
              type="text"
              class="form-control"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="user.email" type="email" class="form-control" readonly />
          </div>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              id="firstName"
              v-model="userProfile.firstName"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="userProfile.lastName"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="street">Street</label>
            <input
              id="street"
              v-model="userProfile.street"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input id="city" v-model="userProfile.city" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="state">State</label>
            <input
              id="state"
              v-model="userProfile.state"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="country">Country</label>
            <input
              id="country"
              v-model="userProfile.country"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="zipCode">Zip Code</label>
            <input id="zipCode" v-model="userProfile.zipCode" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              v-model="userProfile.phoneNumber"
              type="text"
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import profileService from '../services/auth/profile.service';
import authService from '../services/auth/auth.service';

export default {
  name: 'UserProfileView',
  data() {
    return {
      user: null,
      userProfile: null,
      session: null
    };
  },
  async created() {
    // Fetch the user and user profile data when the component is created
    this.session = (await authService.getUserAccount()).data;
    console.log(this.session);
    this.userProfile = (await profileService.getProfile(this.session._id)).data;
    // this.user = this.userProfile.userAccount;
  },
  methods: {
    async updateProfile() {
      const userId = 'userId'; // Replace with the actual user ID
      await profileService.updateProfile(userId, this.userProfile).then(() => {});
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 20px;
}
</style>
