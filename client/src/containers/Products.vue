<template>
  <div class="container center">
    <h1 id="header" class="title">Collections</h1>
    <div class="progress white" v-if="productLoading">
      <div class="indeterminate black"></div>
    </div>
    <div class="row">
      <div>
        <div class="col s4 m4" id="allcard" v-for="product in allProducts" :key="product._id">
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
          <div v-if="role === 'admin'">
            <div class="card-action left" id="card-action">
              <a
                id="edit-button"
                class="waves-effect waves-light white black-text btn"
                @click="editProduct(product._id)"
              >
                <span>edit</span>
              </a>
              <a
                id="delete-button"
                class="waves-effect waves-light white black-text btn"
                @click="deleteProduct(product._id)"
              >
                <span>delete</span>
              </a>
            </div>
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
  name: "products",
  computed: mapState(["productLoading", "allProducts", "role"]),
  data() {
    return {
      products: [],
      load: true
    };
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  methods: {
    deleteProduct(id) {
      serverAPI
        .delete(`/products/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(deletedProduct => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "product successfully deleted"
          });
          this.$store.dispatch("getProducts");
        })
        .catch(err => {
          console.log(err);
        });
    },
    editProduct(productId) {
      this.$router.push(`/editProduct/${productId}`);
    },

    findProduct(productId) {
      console.log("masok find product");
      this.$store.dispatch("findProduct", {
        productId,
        to: "detail"
      });
    }
  }
};
</script>

<style scoped>
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
