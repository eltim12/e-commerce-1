<template>
  <div id="form" class="container center">
    <div class="row">
      <form class="col s6 offset-s3" @submit.prevent="addNewProduct">
        <h4 class>Add Product</h4>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" id="input-name" class="validate" v-model="nameInput">
            <label for="input">product name</label>
          </div>
          <div class="input-field col s6">
            <input type="text" id="input-brand" class="validate" v-model="brandInput">
            <label for="input">brand</label>
          </div>
        </div>
        <div class="row no-margin-bottom">
          <div class="input-field col s6">
            <input
              type="number"
              step="50000"
              id="input-price"
              class="validate"
              v-model="priceInput"
            >
            <label for="input">price</label>
          </div>
          <div class="input-field col s6">
            <input type="number" step="1" id="input-stock" class="validate" v-model="stockInput">
            <label for="input">stock</label>
          </div>
        </div>
        <div class="row">
          <div class="file-field input-field col s12">
            <picture-input
              ref="pictureInput"
              width="390"
              height="300"
              margin="16"
              accept="image/jpeg, image/png"
              size="10"
              :hideChangeButton="true"
              button-class="btn"
              :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'product photo'
      }"
              @change="onChange"
            ></picture-input>
          </div>
        </div>
        <div class="row">
          <button
            id="submit-button"
            class="waves-effect waves-light black white-text btn"
            type="submit"
          >
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import serverAPI from "@/api/serverAPI";
import PictureInput from "vue-picture-input";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000
});

export default {
  data() {
    return {
      nameInput: "",
      priceInput: "",
      stockInput: "",
      brandInput: "",
      fileInput: ""
    };
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
    addNewProduct() {
      serverAPI
        .post(
          `/products`,
          {
            name: this.nameInput,
            stock: this.stockInput,
            price: this.priceInput,
            image: this.fileInput,
            brand: this.brandInput
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
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
  margin-top: 4rem;
}

#submit-button {
  /* font-weight: bolder; */
  height: 3rem;
  width: 8rem;
}

#submit-button:hover {
  width: 10rem;
}

#input-name:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-name:focus + label {
  color: #000000;
}

#input-brand:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-brand:focus + label {
  color: #000000;
}

#input-stock:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-stock:focus + label {
  color: #000000;
}

#input-price:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-price:focus + label {
  color: #000000;
}

span {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.no-margin-bottom {
  margin-bottom: 0px;
}

span:hover {
  color: rgb(209, 209, 209);
}
</style>