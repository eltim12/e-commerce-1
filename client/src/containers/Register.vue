<template>
  <div id="info" class="container">
    <div class="row no-margin">
      <div class="col s6 fit-img">
        <img class="fit-img" src="login-register-wallpaper.png" alt width="605px">
      </div>
      <div id="middle-line" class="col s6">
        <div id="form" class="container center">
          <div class="row">
            <form class="col s12" @keyup.enter="register()">
              <h4 class="header">Register</h4>
              <div class="row">
                <div class="input-field col s12">
                  <input id="input-username" type="text" class="" v-model="name">
                  <label for="username">Fullname</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="input-email" type="email" class="" v-model="email">
                  <label for="email_inline">Email</label>
                  <span class="helper-text" data-error="wrong email format" data-success="right"></span>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="input-pass" type="password" class="" v-model="password">
                  <label for="password">Password</label>
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
              <router-link to="/login">
                <p class="p-in-white-button">Back</p>
              </router-link>
            </div>
          </div>
          <div class="col s6">
            <div class="center black-bottom-btn">
              <a href="#" type="submit" @click.prevent="register">
                <p class="p-in-button">Create account</p>
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
  name: "regisrer",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errMsg: "",
      err: false,
    };
  },
  methods: {
    register() {
      serverAPI
        .post("/users/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(createdUser => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "register success"
          });
          this.$router.push("/login");
        })
        .catch(err => {
          this.errMsg = err.response.data.msg
          this.err = true
          // console.log(err.response.data);
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
  margin-top: 5.5rem;
  margin-bottom: 9.3rem;
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
  margin-top: 4rem;
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
