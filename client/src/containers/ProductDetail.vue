<template>
  <div id="info" class="container center">
    <div class="row">
      <div class="col s6">
        <div class="card" id="card">
          <div class="card-image">
            <img :src="productPhoto">
          </div>
        </div>
      </div>
      <div id="middle-line" class="col s6 no-margin">
        <form id="product-name">
          <h4 class="title">{{ productName }}</h4>
        </form>
        <div class="row">
          <div class="col s6 no-pad">
            <div class="center white-bottom-btn">
              <p class="p-in-white-button">{{ productStock }} in stock</p>
            </div>
          </div>
          <div class="col s6 no-pad" v-if="role !== 'admin'">
            <div class="center black-bottom-btn" v-if="productStock > 0">
              <a href="#" type="button" @click.prevent="addToCart()">
                <p class="p-in-button">Rp.{{ productPrice.toLocaleString() }} add to Cart</p>
              </a>
            </div>
            <div class="center black-bottom-btn" v-else>
              <a href="#" class="isDisabled" type="button" @click.prevent="addToCart()">
                <p class="p-in-button">Rp.{{ productPrice.toLocaleString() }} add to Cart</p>
              </a>
            </div>
          </div>
          <div class="col s6 no-pad" v-else>
            <div class="center black-bottom-btn">
              <router-link href="#" type="button" :to="'/editProduct/' + productId">
                <p class="p-in-button">Edit Product</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import serverAPI from "@/api/serverAPI";

export default {
  name: "product-detail",
  computed: mapState(["role"]),
  data() {
    return {
      productId: "",
      productName: "",
      productPrice: "",
      productStock: "",
      productPhoto: ""
    };
  },
  created() {
    console.log(this.$route.params);
    serverAPI
      .get(`/products/${this.$route.params.id}`)
      .then(foundProduct => {
        this.productId = foundProduct.data._id;
        this.productName = foundProduct.data.name;
        this.productPrice = foundProduct.data.price;
        this.productStock = foundProduct.data.stock;
        this.productPhoto = foundProduct.data.photo;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addToCart() {
      console.log("masok add to cart whoooi");
      if (localStorage.getItem("userId") !== null) {
        if (this.productStock > 0) {
          serverAPI
            .patch(
              `/users/addToCart/${localStorage.getItem("userId")}`,
              {
                productId: this.$route.params.id
              },
              {
                headers: {
                  token: localStorage.getItem("token")
                }
              }
            )
            .then(addedProduct => {
              this.$store.dispatch("notif", {
                type: "success",
                message: "Added Item to Your Cart.."
              });
              this.$router.push("/products");
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.$store.dispatch("notif", {
          type: "error",
          message: "You have to login duls"
        });
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
.isDisabled {
  cursor: not-allowed;
  text-decoration: none;
}

.col {
  padding: 0%;
}
.row {
  margin: 0;
}

.no-pad {
  padding: 0px !important;
  /* padding-left: 0%; */
  /* padding-right: 0%; */
}

a {
  text-decoration: none;
  color: white;
  background-image: linear-gradient(
    to top,
    transparent 13%,
    white,
    transparent 17%
  );
}

.p-in-button {
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.p-in-button:hover {
  text-decoration: underline;
  color: rgb(199, 199, 199);
}

.black-bottom-btn {
  background-color: black;
  margin-bottom: 0%;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.black-bottom-btn:hover {
  /* background-color: white; */
  /* border-top: black 1px solid; */
}

.white-bottom-btn {
  border-top: black 1px solid;
  background-color: white;
  color: black;
  margin-bottom: 0%;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.p-in-white-button {
  font-size: 20px;
  margin-top: 7px;
  color: black;
  margin-bottom: 7px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.p-in-white-button:hover {
  /* text-decoration: underline; */
  /* color: rgb(161, 161, 161); */
}

#card {
  box-shadow: none !important;
  /* border: 1px black solid; */
}

#content {
  margin-top: 10rem;
}

#info {
  border: 1px black solid;
}

#middle-line {
  border-left: 1px solid black;
}

#inner-line {
  border-right: 1px solid black;
  /* height: 3rem; */
}

#product-name {
  margin-top: 12rem;
  margin-bottom: 214.5px;
}

#detail-box {
  border-top: 1px solid black;
  /* margin-top: 3; */
  /* bottom: 14.2rem; */
  width: 103.7%;
}

#add-to-cart {
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#add-to-cart:hover {
  color: grey;
}

#info {
  border: 1px black solid;
  margin-top: 8rem;
}

form {
  margin-top: 5.5rem;
  margin-bottom: 9.3rem;
}
</style>
