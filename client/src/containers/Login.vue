<template>
  <div id="info" class="container">
    <div class="row no-margin">
      <div class="col s6 fit-img">
        <img class="fit-img" src="login-register-wallpaper.png" alt width="605px">
      </div>
      <div id="middle-line" class="col s6">
        <div id="form" class="container center">
          <div class="row mt-custom">
            <form class="col s12" @keyup.enter="submitLogin()">
              <h4 class="header">Login</h4>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email-input" type="email" class="input" v-model="emailInput">
                  <label for="email_inline">Email</label>
                  <span class="helper-text" data-error="wrong email format" data-success="right"></span>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="pass-input"
                    type="password"
                    class="input"
                    v-model="passwordInput"
                  >
                  <label for="password">Password</label>
                </div>
              </div>
              <div class="row">
                <router-link to="/register">
                  <p class="create-btn">create account +</p>
                </router-link>
              </div>
              <div class="err-msg" v-if="err">
                <p class="no-margin">{{ errMsg }}</p>
              </div>
            </form>
          </div>
        </div>
        <div class="center black-bottom-btn">
          <a href type="submit" @click.prevent="submitLogin">
            <p class="p-in-button">Login</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import serverAPI from "@/api/serverAPI";

export default {
  name: "login-form",
  data() {
    return {
      emailInput: "",
      passwordInput: "",
      errMsg: "",
      err: false,
    };
  },
  methods: {
    submitLogin() {
      serverAPI
        .post(`/users/login`, {
          email: this.emailInput,
          password: this.passwordInput
        })
        .then(loggedIn => {
          console.log(loggedIn)
          localStorage.setItem("token", loggedIn.data.token);
          localStorage.setItem("userId", loggedIn.data.userId);
          localStorage.setItem("role", loggedIn.data.role);

          this.$store.dispatch("notif", {
            type: "success",
            message: "Logged in Successfully"
          });

          this.$store.commit("setUserStatus", {
            role: loggedIn.data.role,
            status: true
          });

          this.$router.push("/products");
        })
        .catch(err => {
          this.errMsg = err.response.data.msg
          this.err = true
        });
    }
  }
};
</script>

<style scoped>
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

a:hover {
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

form {
  margin-top: 2.2rem;
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

#email-input:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#email-input:focus + label {
  color: #000000;
}

#pass-input:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#pass-input:focus + label {
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

#info {
  border: 1px black solid;
  margin-top: 4rem;
}

#middle-line {
  border-left: 1px solid black;
}

.no-margin {
  margin-bottom: 0%;
}

.mt-custom {
  margin-top: 3rem;
  margin-bottom: 7.85rem;
}

.err-msg {
  /* height: 3rem; */
  color: white;
  font-size: 1.5rem;
  /* font-weight: bolder;; */
  background-color: #ca0029;
}

.no-margin {
  margin: 0%;
}

.fit-img {
  overflow: hidden;
}
</style>
