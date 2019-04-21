<template>
  <div id="app">
    <navbar></navbar>
    <brand></brand>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Brand from "@/components/brand.vue";
import serverAPI from "@/api/serverAPI.js";

export default {
  components: {
    navbar: Navbar,
    brand: Brand
  },
  name: "app",
  created() {
    if (localStorage.getItem("token")) {
      this.verify();
    } else {
      this.$store.commit("setUserStatus", {
        role: "customer",
        status: false
      });
    }
  },
  methods: {
    verify() {
      serverAPI
        .post("/users/verify", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(verified => {
          this.$store.commit("setUserStatus", {
            role: verified.data.info.role,
            status: true
          });
        })
        .catch(err => {
          this.$store.commit("setUserStatus", {
            role: "customer",
            status: false
          });
          localStorage.clear();
        });
    }
  }
};
</script>
