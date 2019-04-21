import Vue from "vue"
import Vuex from "vuex"
import Router from "vue-router"

Vue.use(Vuex)
Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "Home" */ '@/containers/Home.vue')

    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: () => import(/* webpackChunckName: "ProductDetail" */'@/containers/ProductDetail.vue')
    },
    {
      path: "/products",
      name: "products",
      component: () => import(/* webpackChunckName: "Products" */'@/containers/Products.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunckName: "Login" */'@/containers/Login.vue')
    },
    {
      path: "/search",
      name: "search",
      component: () => import(/* webpackChunckName: "Search" */'@/containers/Search.vue')
    },
    {
      path: "/search/q/:name",
      name: "FoundProduct",
      component: () => import(/* webpackChunckName: "FoundProduct" */'@/containers/FoundProduct.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunckName: "Register" */'@/containers/Register.vue')
    },
    {
      path: "/addProduct",
      name: "add-product",
      component: () => import(/* webpackChunckName: "AddProduct" */'@/containers/AddProduct.vue')
    },
    {
      path: "/editProduct/:id",
      name: "edit-product",
      component: () => import(/* webpackChunckName: "EditProduct" */'@/containers/EditProduct.vue')
    },
    {
      path: "/myCart/:id",
      name: "cart",
      component: () => import(/* webpackChunckName: "Cart" */'@/containers/Cart.vue')
    },
    {
      path: "/myTransaction",
      name: "myTransaction",
      component: () => import(/* webpackChunckName: "MyTransaction" */'@/containers/MyTransaction.vue')
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import(/* webpackChunckName: "Payment" */'@/containers/Payment.vue')
    },
    {
      path: "/allTransactions",
      name: "allTransactions",
      component: () => import(/* webpackChunckName: "AllTransactions" */'@/containers/AllTransactions.vue'),
      children: [
        {
          path: ":id",
          name: "transactionDetail",
          component: () => import(/* webpackChunckName: "transactionDetail" */'@/components/TransactionDetail.vue'),
        }
      ]
    },
    {
      path: "/brands",
      name: "allBrands",
      component: () => import(/* webpackChunckName: "allBrands" */'@/containers/AllBrand.vue'),
      children: [
        {
          path: ":name",
          name: "brandName",
          component: () => import(/* webpackChunckName: "productByBrand" */'@/components/ProductByBrand.vue'),
        }
      ]
    }
  ]
})
