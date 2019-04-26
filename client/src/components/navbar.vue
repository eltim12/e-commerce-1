<template>
  <div id="navbar" class="container center">
    <div id="navbar-content" class="row">
      <div class="col s1">
        <router-link to="/products" class="black-text">
          <span>Collections</span>
        </router-link>
      </div>
      <div class="col s3" v-if="role !== 'admin'">
        <router-link to="/brands" class="black-text">
          <span>Brands</span>
        </router-link>
      </div>
      <div class="col s3" v-if="role === 'admin' && isLogin === true">
        <router-link class="black-text" to="/addProduct">
          <span>Add Product</span>
        </router-link>
      </div>
      <div class="col s6" v-if="role === 'admin' && isLogin === true">
        <router-link class="black-text transaction" to="/allTransactions">
          <span>Transactions</span>
        </router-link>
      </div>
      <div class="class col s1 right">
        <router-link to="/search">
          <i id="search" class="material-icons black-text small">search</i>
        </router-link>
      </div>
      <div class="col s1 right" v-if="isLogin === false">
        <router-link class="black-text" to="/login">
          <span>Login</span>
        </router-link>
      </div>
      <div class="right" v-if="isLogin === true">
        <a href="#" class="black-text" @click.prevent="logout">
          <span>Logout</span>
        </a>
      </div>
      <div class="col s3 right cart" v-if="isLogin === true && role === 'customer'">
        <a href="#" class="black-text" @click.prevent="toMyCart">
          <span class="ml-custom">My Cart</span>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["isLogin", "role"]),
  created() {
    this.userId = localStorage.getItem("userId");
  },
  data() {
    return {
      navbarData: "ini navbar",
      userId: ""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("notif", {
        type: "success",
        message: "You Have Successfully Logged Out"
      });
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    toMyCart() {
      this.$router.push(`/myCart/${this.userId}`);
    }
  }
};
</script>


<style scoped>
.transaction {
  margin-left: 27rem;
}

.ml-custom {
  margin-left: 30pt;
}

#navbar {
  margin-top: 3rem;
  /* margin-left: 20rem; */
  /* position: fixed; */
}

#navbar-content {
}

span {
  font-size: 1.7rem;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

span:hover {
  color: grey;
}

i {
  margin-top: 5px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

i:hover {
  color: grey !important;
}

.cart {
  padding-top: 0%;
}
</style>


