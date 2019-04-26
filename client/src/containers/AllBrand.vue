<template>
  <div id="container" class="content container center">
    <div class="row" v-for="(brand, index) in brands" :key="index">
      <div
        class="box"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-anchor-placement="top-bottom"
      >
        <a href @click.prevent="toBrandName(brand.name)">
          <h4
            class="mt-mb"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
            data-aos-anchor="found-products"
          >{{ brand.name }}</h4>
        </a>
      </div>
    </div>
    <router-view v-if="showChild"></router-view>
  </div>
</template>

<script>
import serverAPI from "@/api/serverAPI";
import AOS from "aos";

export default {
  name: "All-Brands",
  data() {
    return {
      brands: [],
      showChild: false,
      name: ""
    };
  },
  created() {
    this.showChild = false;
    serverAPI
      .get("/brands")
      .then(allBrands => {
        this.brands = allBrands.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    toBrandName(name) {
      this.showChild = false;
      this.name = name;
      this.$router.push(`/brands`);
      setTimeout(() => {
        this.changeRoute();
      }, 10);
    },
    changeRoute() {
      this.$router.push(`/brands/${this.name}`);
      this.showChild = true;
    }
  }
};
</script>

<style scoped>
.row {
  margin-bottom: 0px;
}

.mt-mb {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.content {
  margin-top: 4rem;
}

.box {
  border-top: 1px solid black;
}

.last {
  border-bottom: 1px solid black;
}

a {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  color: black;
}

a:hover {
  color: #d0d0cf;
}
</style>
