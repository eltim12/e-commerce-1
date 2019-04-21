<template>
  <div id="info" class="container">
    <div class="row no-margin">
      <div class="col s6">
        <div class="container center" style="margin-top: 11rem;">
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th class="fr">{{ userCart.length }}</th>
              </tr>
              <tr>
                <th>Subtotal</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th class="fr">{{ subTotalToLocale }}</th>
              </tr>
              <tr>
                <th>Delivery fee</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th class="fr">{{ deliveryFee }}</th>
              </tr>
              <tr>
                <th>
                  <p class="grand-total title">Grand total</p>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <p class="grand-total title fr">{{ getTotal.toLocaleString() }}</p>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div id="middle-line" class="col s6">
        <div id="form" class="container center">
          <div class="row">
            <form class="col s12" @keyup.enter="checkout()">
              <h4 class="header">Ship & Pay</h4>
              <div class="row">
                <div class="input-field col s12">
                  <input id="input-province" type="text" class v-model="provinceInput">
                  <label for="input-province">Province</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="input-username"
                    type="text"
                    class
                    v-model="cityInput"
                    @blur="getDeliveryFee"
                  >
                  <label for="username">City</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="input-pass" type="text" v-model="fullAddressInput">
                  <label for="password">Full Address</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="input-pass" type="text" v-model="phone">
                  <label for="password">Phone Number</label>
                </div>
              </div>
              <div class="err-msg" v-if="err">
                <p class="no-margin">{{ errMsg }}</p>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <div class="center white-bottom-btn">
              <router-link :to="{ path: `/myCart/${userId}`}">
                <p class="p-in-white-button">Back</p>
              </router-link>
            </div>
          </div>
          <div class="col s6">
            <div class="center black-bottom-btn">
              <a href="#" type="submit" @click.prevent="checkout()">
                <p class="p-in-button">Confirm</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverAPI from "@/api/serverAPI";

export default {
  name: "my-transaction",
  data() {
    return {
      errMsg: "",
      err: false,
      provinceInput: "",
      cityInput: "",
      fullAddressInput: "",
      userId: "",
      userCart: [],
      subTotal: 0,
      subTotalToLocale: "",
      deliveryFee: 0,
      grandTotal: 0,
      phone: ""
    };
  },
  created() {
    this.userId = localStorage.getItem("userId");
    this.userCart = this.$store.state.userCart;
    this.$store.state.userCart.map(e => {
      this.subTotal += e.price;
    });
    this.subTotalToLocale = Number(this.subTotal).toLocaleString();
  },
  computed: {
    getTotal() {
      return this.subTotal + this.deliveryFee;
    }
  },
  methods: {
    checkout() {
      serverAPI
        .post(
          `/transactions/checkout/${localStorage.getItem("userId")}`,
          {
            phone: this.phone,
            address: this.fullAddressInput,
            totalPayment: this.getTotal
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(checkedout => {
          this.$store.dispatch("getUserCart", {
            userId: localStorage.getItem("userId")
          });
          this.$store.dispatch("notif", {
            type: "success",
            message: `Thank you for purchasing, you paid $${this.getTotal}`
          });
        })
        .catch(err => {
          this.errMsg = err.response.data.msg;
          this.err = true;
        });
    },
    getDeliveryFee() {
      serverAPI
        .post(
          `/transactions/delivery`,
          {
            province: this.provinceInput,
            city: this.cityInput
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(fee => {
          this.err = false;
          this.deliveryFee = fee.data;
        })
        .catch(err => {
          this.errMsg = err.response.data.msg;
          this.err = true;
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.fr {
  float: right;
}

.grand-total {
  font-size: 1.4rem;
  margin: 0%;
}

.mt-custom {
  margin-top: 12rem;
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

.row {
  margin: 0;
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
  color: rgb(161, 161, 161);
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
  text-decoration: underline;
  color: rgb(161, 161, 161);
}

.create-btn {
  color: black;
  font-size: 20px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.create-btn:hover {
  color: #3f3f3f;
}

.err-msg {
  /* height: 3rem; */
  color: white;
  font-size: 1.5rem;
  /* font-weight: bolder;; */
  background-color: #ca0029;
}

form {
  margin-top: 3rem;
  margin-bottom: 5rem;
}

.header {
  font-weight: bold;
}

#login-button {
  font-weight: lighter;
  width: 8rem;
}

#login-button:hover {
  width: 10rem;
}

#register-button {
  font-weight: lighter;
  width: 8rem;
}

#register-button:hover {
  width: 10rem;
}

#input-province:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-province + label {
  color: #000000;
}

#input-username:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-username + label {
  color: #000000;
}

#input-email:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-email + label {
  color: #000000;
}

#input-pass:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-pass + label {
  color: #000000;
}

span {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

span:hover {
  color: grey;
}

.col {
  padding: 0%;
}

.no-margin {
  margin: 0%;
}

#info {
  border: 1px black solid;
  margin-top: 6rem;
}

#middle-line {
  border-left: 1px solid black;
}

.no-margin {
  margin-bottom: 0%;
}

.mt {
  /* margin-top: 1rem; */
}

.mt-custom {
  margin-top: 3rem;
  margin-bottom: 7.85rem;
}

.fit-img {
  overflow: hidden;
}
</style>
