<template>
  <div id="form" class="container center">
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="editProduct">
        <h4 class>Edit Product</h4>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="text" class="validate" v-model="nameInput">
            <label for="input" class="active">product name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="number" step="50000" class="validate" v-model="priceInput">
            <label for="input" class="active">price</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="input" type="number" step="1" class="validate" v-model="stockInput">
            <label for="input" class="active">stock</label>
          </div>
        </div>
        <div class="row">
          <div class="container center">
            <div class="input-field col s6">
              <img id="img" class width="200" height="150" :src="currentFile">
            </div>
            <div class="input-field col s6">
              <picture-input
                ref="pictureInput"
                width="450"
                height="350"
                margin="16"
                accept="image/jpeg, image/png"
                size="10"
                :hideChangeButton="true"
                button-class="btn"
                :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'change photo'
      }"
                @change="onChange"
              ></picture-input>
            </div>
          </div>
        </div>
        <div class="row">
          <button
            id="submit-button"
            class="waves-effect waves-light white grey-text text-darken-2 btn"
            type="submit"
          >
            <span>Confirm</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import PictureInput from "vue-picture-input";
import serverAPI from "@/api/serverAPI";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000
});

export default {
  data() {
    return {
      productId: "",
      nameInput: "",
      priceInput: "",
      stockInput: "",
      currentFile: "",
      newFileInput: "",
      fileInput: ""
    };
  },
  created() {
    serverAPI
      .get(`/products/${this.$route.params.id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(foundProduct => {
        this.productId = foundProduct.data._id;
        this.nameInput = foundProduct.data.name;
        this.priceInput = foundProduct.data.price;
        this.stockInput = foundProduct.data.stock;
        this.currentFile = foundProduct.data.photo;
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    PictureInput
  },
  methods: {
    onChange(image) {
      if (image) {
        this.fileInput = image;
      }
    },
    editProduct() {
      Toast.fire({
        text: "Editing your Product..."
      });
      let updateObj = {};
      if (this.fileInput.length === 0) {
        updateObj = {
          name: this.nameInput,
          price: this.priceInput,
          stock: this.stockInput,
          existed: this.currentFile
        };
      } else {
        updateObj = {
          name: this.nameInput,
          price: this.priceInput,
          stock: this.stockInput,
          image: this.fileInput
        };
      }
      serverAPI
        .patch(`/products/${this.$route.params.id}`, updateObj, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(product => {
          this.$router.push("/products");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#form {
  margin-top: 2rem;
}

#submit-button {
  font-weight: lighter;
  width: 8rem;
}

#submit-button:hover {
  width: 10rem;
}

#input:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input:focus + label {
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

#img {
  margin-right: 3rem;
}

#change-button {
  margin-top: 6rem;
  margin-left: 3rem;
  /* padding: 3rem 0; */
}
</style>
