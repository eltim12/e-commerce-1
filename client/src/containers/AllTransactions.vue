<template>
  <div id="content" class="content container center">
    <h3 class>Transaction History</h3>
    <div class="progress white" v-if="load">
      <div class="indeterminate black"></div>
    </div>
    <div class="row">
      <div class="col s12">
        <table class="highlight">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Address</th>
              <th>Total Payment</th>
              <th>Issued At</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody v-for="transaction in transactions" :key="transaction._id">
            <tr>
              <td>
                <h5>{{ transaction.userId.name }}</h5>
              </td>
              <td>
                <h5>{{ transaction.phone }}</h5>
              </td>
              <td>
                <h5
                  v-for="(product, index) in transaction.productList"
                  :key="index"
                >{{ index + 1 }}. {{product.name}}</h5>
              </td>
              <td>
                <h5>{{ transaction.address }}</h5>
              </td>
              <td>
                <h5>Rp.{{ transaction.totalPayment.toLocaleString() }}</h5>
              </td>
              <td>
                <h5>{{ transaction.createdAt.slice(0,10) }}</h5>
              </td>
              <td>
                <h5 style="color: #ca0029;" v-if="transaction.status === 'pending'">
                  <b>{{ transaction.status }}</b>
                </h5>
                <h5 style="color: green;" v-else>
                  <b>{{ transaction.status }}</b>
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col s6">
        <router-view v-if="showChild"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import serverAPI from "@/api/serverAPI";
import { mapState } from "vuex";

export default {
  name: "all-transaction",
  data() {
    return {
      transactions: [],
      status: "",
      showChild: false,
      load: true
    };
  },
  computed: mapState(["userCart", "name", "totalPrice"]),
  created() {
    serverAPI
      .get("/transactions", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(transactions => {
        this.load = false;
        let totalPrice = 0;
        transactions.data.map(e => {
          e.productList.forEach(p => {
            totalPrice += p.price;
          });
          e.totalPrice = totalPrice;
          if (e.status === false) {
            e.status = "pending";
          } else {
            e.status = "arrived";
          }
        });
        this.transactions = transactions.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    cancelProduct(productId) {
      serverAPI
        .patch(`/users/removeFromCart/${localStorage.getItem("userId")}`, {
          productId
        })
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
      this.$router.push(`/myTransaction`);
    },
    toDetails() {}
  }
};
</script>

<style scoped>
#content {
  min-width: 98rem;
}

h5 {
  font-size: 1.3rem;
  color: black;
}

#cancel-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#cancel-button:hover {
  background-color: black;
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
  width: 30rem;
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
  margin-bottom: 10rem;
  margin-left: 29rem;

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#checkout-button:hover {
  background-color: black;
}

#shopnow-text {
  color: black;

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#shopnow-text:hover {
  color: white;
}

#shopnow-button {
  border: black solid 1px;
  width: 20rem;
  /* margin-top: 5rem; */
  margin-bottom: 10rem;
  margin-left: 33.5rem;

  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#shopnow-button:hover {
  background-color: black;
}

#empty-cart {
  margin-top: 18rem;
}

.content {
  margin-top: 4rem;
}
</style>
