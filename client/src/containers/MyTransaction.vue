<template>
  <div class="content container center">
    <div id="empty-cart" v-if="transactions.length === 0 && load === false">
      <h3>
        You have no transactions recorded
        <br>for this time period.
      </h3>
      <div class="shopnow-button">
        <router-link to="/products" href>
          <h4 class="shopnow-text">SHOP NOW</h4>
        </router-link>
      </div>
    </div>
    <div v-else>
      <h3 class="title">Transaction History</h3>
      <div class="progress white" v-if="load">
        <div class="indeterminate black"></div>
      </div>
      <table class="highlight">
        <thead>
          <tr>
            <th>Total Items</th>
            <th>Items</th>
            <th>Proccess Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody v-for="transaction in transactions" :key="transaction._id">
          <tr>
            <td>
              <h5>{{ transaction.productList.length }}</h5>
            </td>
            <td>
              <h5
                v-for="(product, index) in transaction.productList"
                :key="index"
              >{{ index + 1 }}. {{product.name}}</h5>
            </td>
            <td>
              <h5>{{ transaction.createdAt.slice(0,10) }}</h5>
            </td>
            <td>
              <h5>Rp.{{ transaction.totalPrice.toLocaleString() }}</h5>
            </td>
            <td>
              <h5 style="color: #ca0029;" v-if="transaction.status === 'pending'">
                <b>{{ transaction.status }}</b>
              </h5>
              <h5 style="color: green;" v-else>
                <b>{{ transaction.status }}</b>
              </h5>
            </td>
            <td class="center">
              <div id="cancel-button" v-if="transaction.status === 'pending'">
                <a id="cancel" href @click.prevent="checkStatus(transaction._id)">
                  <h5>Arrived</h5>
                </a>
              </div>
              <div v-else></div>
            </td>
          </tr>
        </tbody>
      </table>
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
      .get(`/transactions/user/${localStorage.getItem("userId")}`, {
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
    checkStatus(id) {
      serverAPI
        .patch(`/transactions/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(checked => {
          this.updateInfo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateInfo() {
      serverAPI
        .get(`/transactions/user/${localStorage.getItem("userId")}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(transactions => {
          let totalPrice = 0;
          transactions.data.map(e => {
            e.productList.forEach(p => {
              totalPrice += p.price;
            });
            e.totalPrice = totalPrice;
            if (e.status === false) {
              e.status = "pending";
            } else {
              e.status = "finish";
            }
          });
          this.transactions = transactions.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
h5 {
  font-size: 1.4rem;
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

#check-button {
  border: 1px black solid;

  background-color: black;
  color: white;

  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#check-button:hover {
  background-color: white;
  color: black;
}

#check {
  color: white;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#check:hover {
  color: black;
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
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 33.5rem;

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
