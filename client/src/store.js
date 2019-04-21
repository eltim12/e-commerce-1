import Vue from "vue"
import Vuex from "vuex"
import router from "./router"
import store from "./store"
import Swal from "sweetalert2"
import axios from "axios"
import serverAPI from "@/api/serverAPI";

Vue.use(Vuex)

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
})

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: "",
    allProducts: [],
    productLoading: true,
    editProduct: {},
    userCart: [],
    load: true,
    myCart: [],
    name: "",
    totalPrice: 0,
    search: "",
  },
  mutations: {
    setUserStatus(state, payload) {
      state.role = payload.role
      state.isLogin = payload.status
    },
    postProduct(state, payload) {
      state.allProducts = payload.productData.data.reverse()
      state.productLoading = false
    },
    populateProductData(state, payload) {
      state.editProduct = payload.foundProduct.data
    },
    getMyCart(state, payload) {
      state.load = true 
      state.userCart = payload.myCart
      state.name = payload.name
      state.totalPrice = payload.totalPrice
      state.load = false
    },
    updateSearch(state, payload) {
      state.search = payload.name
    }
  },
  actions: {
    notif({ commit }, { type, message }) {
      Toast.fire({
        type: type,
        text: message
      })
    },

    logout({ commit }) {
      localStorage.clear()
      commit("setUserStatus", {
        status: false,
        role: ""
      })
    },
    getProducts({ commit }) {
      serverAPI
        .get("/products",
          {
            headers: {
              token: localStorage.getItem("token")
            }
          })
        .then(productData => {
          commit("postProduct", {
            productData
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    findProduct({ commit }, { productId }) {
      serverAPI
        .get(`/products/${productId}`,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          })
        .then(foundProduct => {
          commit("populateProductData", {
            foundProduct
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserCart({ commit }, { userId }) {
      serverAPI
        .get(`/users/${userId}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(userData => {
          let myCart = userData.data.cart
          let name = userData.data.name
          let totalPrice = 0
          userData.data.cart.map(e => {
            totalPrice += Number(e.price)
          })

          commit("getMyCart", {
            myCart,
            name,
            totalPrice
          })
          router.push(`/myCart/${userId}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
})
