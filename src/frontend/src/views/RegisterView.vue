<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" v-model="username" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input id="firstName" v-model="firstName" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input id="lastName" v-model="lastName" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="street">Street</label>
            <input id="street" v-model="street" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input id="city" v-model="city" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="state">State</label>
            <input id="state" v-model="state" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="country">Country</label>
            <input id="country" v-model="country" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="zipCode">Zip Code</label>
            <input id="zipCode" v-model="zipCode" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input id="phoneNumber" v-model="phoneNumber" type="text" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../services/auth/auth.service';
import accountService from '../services/auth/account.service';
import profileService from '../services/auth/profile.service';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNumber: '',
      createdAccountResponseData: null
    };
  },
  methods: {
    async register() {
      const userAccount = {
        username: this.username,
        password: this.password,
        email: this.email
      };

      try {
        // Create account
        this.createdAccountResponseData = await accountService.createAccount(userAccount);
        console.log(this.createdAccountResponseData.data);

        // Login
        const loginResponse = await authService.login(userAccount);

        if (loginResponse.data) {
          const userProfile = {
            email: this.email,
            userAccount: loginResponse.data.session._id,
            firstName: this.firstName,
            lastName: this.lastName,
            street: this.street,
            city: this.city,
            state: this.state,
            country: this.country,
            zipCode: this.zipCode,
            phoneNumber: this.phoneNumber
          };

          // Create profile
          await profileService
            .createProfile(userProfile)
            .then(() => {
              Swal.fire({
                text: 'User profile was created successfully!',
                icon: 'success',
                allowOutsideClick: false
              });
              this.$router.push('/');
            })
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 20px;
}
</style>
