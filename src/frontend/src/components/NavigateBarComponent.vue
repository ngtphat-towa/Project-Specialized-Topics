<template>
  <div class="header navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <RouterLink class="nav-link" to="/"> ElForture </RouterLink>
    </a>
    <nav class="navbar">
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'HomeView' }">Home</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'SearchView' }">Shop</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'WishlistListView' }">Wishlist</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'CustomerOrderView' }">My Orders</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'AboutView' }">About</router-link>
      </div>
    </nav>

    <div class="icons">
      <div id="menu-btn" class="fas fa-bars menu-btn" @click="showNav"></div>
      <router-link :to="{ name: 'BasketListView' }">
        <div class="fas fa-shopping-cart cart"></div>
      </router-link>

      <div v-if="!token" class="fas fa-user account">
        <ul class="navbar drop-down-select">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'LoginView' }">login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'RegisterView' }">register</router-link>
          </li>
        </ul>
      </div>
      <div v-else class="fas fa-user account" style="background: #f38609; color: white">
        <ul class="drop-down-select">
          <li class="drop-down-item">
            <router-link :to="{ name: 'AdminPanelView' }">Admin</router-link>
          </li>
          <li>
            <router-link @click="signout" to="/">Sign out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { ref } from 'vue';

import getCookie from '../services/cookies.service';
import authService from '../services/auth/auth.service';
export default {
  name: 'NavigateBarComponent',
  props: ['cartCount'],
  setup() {
    const token = ref(null);
    return {
      token
    };
  },
  data() {
    return {
      searchTerm: '',
      showSearch: false
    };
  },
  methods: {
    showNav: function () {
      let navbar = document.querySelector('.header .navbar');
      navbar.classList.toggle('active');
    },

    signout() {
      authService
        .logout()
        .then(() => {
          this.token = null;
          console.log('LOGIN', getCookie('accessToken'));
          console.log('LOGIN', getCookie('refreshToken'));
          this.$emit('resetCartCount');
          this.$router.push({ name: 'HomeView' });
          Swal.fire({
            text: 'Logged you out. Visit again',
            icon: 'success'
          });
          console.log('LOGIN', getCookie('accessToken'));
          console.log('LOGIN', getCookie('refreshToken'));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  created() {
    this.token = getCookie('accessToken');
  }
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 9%;
}

.header .logo {
  font-size: 2rem;
  font-weight: bolder;
  color: #130f40;
}

.header .logo img {
  padding-right: 0.5rem;
  color: #27ae60;
}

.header .navbar a {
  font-size: 1.5rem;
  margin: 0 1rem;
  color: #666;
}

.header .navbar a:hover {
  color: #27ae60;
}

.header .navbar a.router-link-exact-active {
  color: #f38609;
}

.header .icons div {
  width: 48px;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  background: #f7f7f7;
  color: #130f40;
  border-radius: 0.5rem;
  margin-left: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.header .icons div:hover {
  color: #fff;
  background: #27ae60 !important;
}

.header .icons a.router-link-exact-active .cart {
  background: #f38609;
  color: white;
}

#menu-btn {
  display: none;
}

.header .icons .account .drop-down-select {
  display: none;
  position: absolute;
  margin-left: -65px;
  list-style-type: none;
}

.header .icons .account .drop-down-select a {
  text-decoration: none;
  color: #130f40;
  font-size: 15px;
  font-weight: 500;
  float: left;
  width: 95px;
  border-radius: 5%;
}

.header .icons .account .drop-down-select.active {
  display: block !important;
}

.header .icons .account .drop-down-select.active a {
  background-color: #f7f7f7;
}

.header .icons .account .drop-down-select.active a:hover {
  background-color: #f38609;
  color: white;
}
.icons li router-link {
  font-family: inherit !important;
}

/* .header .icons .account:hover .drop-down-select {
    display: block;
} */

.header .icons .account:hover .drop-down-select a {
  background-color: #f7f7f7;
}

.header .icons .account:hover .drop-down-select a:hover {
  background-color: #f38609;
  color: white;
}

@media (min-width: 769px) {
  .header .icons .account:hover .drop-down-select {
    display: block;
  }
}

@media (max-width: 768px) {
  .header .navbar {
    position: absolute;
    top: 99%;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }

  .header .navbar.active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  .header .navbar a {
    font-size: 1.5rem;
    margin: 1rem;
    display: block;
  }

  #menu-btn {
    display: inline-block;
  }
}

@media (max-width: 576px) {
  .header .navbar a {
    font-size: 0.5rem;
    margin: 0;
  }
}
</style>
