<template>
  <div class="content container center">
    <div id="empty-cart" v-if="userCart.length === 0 && load === false">
      <h3>Your cart is currently empty.</h3>
      <div class="shopnow-button mt-custom">
        <router-link to="/products" href>
          <h4 class="shopnow-text">SHOP NOW</h4>
        </router-link>
      </div>
      <div class="shopnow-button">
        <router-link to="/myTransaction" href>
          <h4 class="shopnow-text">TRANSACTIONS</h4>
        </router-link>
      </div>
    </div>
    <div v-else>
      <h3 v-if="load === false">{{ name }}'s cart</h3>
      <div class="progress white" v-if="load">
        <div class="indeterminate black"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Detail</th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody v-for="product in userCart" :key="product._id">
          <tr>
            <td>
              <img :src="product.photo" width="140px" height="100px" alt>
            </td>
            <td>
              <h5 class="title">{{ product.name }}</h5>
            </td>
            <td>
              <h5>Rp.{{ product.price.toLocaleString() }}</h5>
            </td>
            <td class="center">
              <a id="cancel" href @click.prevent="cancelProduct(product._id)">
                <div id="cancel-button">
                  <h5 class="bt-custom">cancel</h5>
                </div>
              </a>
            </td>
          </tr>
        </tbody>
        <tr id="last-row">
          <td></td>
          <th id="total">Total</th>
          <td></td>

          <td class>
            <h5 id="total">Rp.{{ totalPrice.toLocaleString() }}</h5>
          </td>
          <td></td>
        </tr>
      </table>
      <router-view></router-view>
      <div class="shopnow-button mt-custom">
        <a href @click.prevent="checkout">
          <h4 id="checkout-text">CHECKOUT</h4>
        </a>
      </div>
      <div class="shopnow-button">
        <router-link to="/myTransaction" href>
          <h4 class="shopnow-text">TRANSACTIONS</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
import serverAPI from "@/api/serverAPI";
import { mapState } from "vuex";

export default {
  name: "cart",
  computed: mapState(["userCart", "name", "totalPrice", "load"]),
  created() {
    console.log("masok created!");
    this.myCart = [];
    this.$store.dispatch("getUserCart", {
      userId: localStorage.getItem("userId")
    });
  },
  methods: {
    cancelProduct(productId) {
      serverAPI
        .patch(
          `/users/removeFromCart/${localStorage.getItem("userId")}`,
          {
            productId
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(deleted => {
          this.$store.dispatch("getUserCart", {
            userId: localStorage.getItem("userId")
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkout() {
      this.$router.push(`/payment`);
    }
  }
};
</script>

<style scoped>
.mt-custom {
  margin-top: 2rem;
}

.bt-custom {
  font-weight: 700;
  font-size: 1.2rem;
}

h5 {
  font-size: 1.5rem;
}

#cancel-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#cancel-button:hover {
  background-color: #ca0029;
  color: white;
}

#cancel {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#cancel:hover {
  color: white;
}

#total {
  font-size: 1.5rem;
  font-weight: bold;
}

#last-row {
  background-color: rgb(241, 241, 241);
}

#checkout {
  border: black solid 1px;
  /* width: 30rem; */
}

#checkout-text {
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#checkout-text:hover {
  color: white;
}

#checkout-button {
  border: black solid 1px;
  width: 30rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
  margin-left: 28rem;

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#checkout-button:hover {
  background-color: black;
}

.shopnow-text {
  color: black;

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.shopnow-text:hover {
  color: white;
}

.shopnow-button {
  border: black solid 1px;
  width: 20rem;
  /* margin-top: 5rem; */
  margin-bottom: 2rem;
  margin-left: 33rem;

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.shopnow-button:hover {
  background-color: black;
}

#empty-cart {
  margin-top: 18rem;
}

.content {
  margin-top: 4rem;
}
</style>
