<template>
  <div id="container">
    <div id="found-content">
      <h1 id="header" class="title" >{{ productFound.name }} </h1>

      <div class="progress white" v-if="load">
        <div class="indeterminate black"></div>
      </div>
      <div class="row">
        <div>
          <div
            class="col s4 m4"
            id="allcard"
            v-for="product in productFound.products"
            :key="product._id"
          >
            <router-link :to="'/product/' + product._id" href id="card-container">
              <div class="card" id="card">
                <div class="card-image">
                  <img :src="product.photo">
                </div>
                <div class="container left left-align" id="card-content">
                  <h5 id="name">
                    {{ product.name }}
                    <br>
                    <hr size="1px">
                    Rp.{{ product.price.toLocaleString() }}
                  </h5>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import serverAPI from "@/api/serverAPI";

export default {
  name: "productsByBrand",
  computed: mapState(["productLoading", "allProducts", "role"]),
  props: ["test"],
  data() {
    return {
      productFound: [],
      load: true
    };
  },
  created() {
    serverAPI
      .get(`/brands/search?name=${this.$route.params.name}`)
      .then(products => {
        this.productFound = products.data;
        this.load = false;
        this.scrollToEnd();
        // var elem = this.$el;
        // elem.scrollTop = elem.clientHeight;
        // console.log(elem);
        // container.scrollTop = container.scrollHeight;
        // console.log(products.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    scrollToEnd() {
      var container = this.$el.querySelector("#container");
      // container.scrollTop = container.scrollHeight;
    }
  }
};
</script>

<style scoped>
#found-content {
  margin-top: 6rem;
  margin-bottom: 22rem;
}

h1 {
  margin-bottom: 0%;
}

#delete-button {
  width: 6rem;
}

#edit-button {
  width: 6rem;
  margin-right: 25px;
}

#detail-button {
  width: 8.5rem;
  margin-right: 7px;
}

#add-to-cart-button {
  width: 8.5rem;
  margin-left: 7px;
}

#card {
  box-shadow: none !important;
  /* margin-bottom: 7rem; */
}

#card-container {
  color: black;
  /* margin-bottom: 3rem; */

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#card-container:hover {
  color: rgb(117, 117, 117);
  /* width: 3rem; */
}

#price {
  /* margin-bottom: 3rem; */
  font-size: 1.2rem;
}

#name {
  font-size: 1.3rem;
}

#card-action {
  margin-bottom: 3rem;
}
</style>
