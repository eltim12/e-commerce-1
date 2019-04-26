<template>
  <div class="container border content">
    <form @submit.prevent="submitForm()">
      <input
        autofocus
        id="input-name"
        type="text"
        class="center title xl mt"
        v-model="name"
        placeholder="type to search"
        ref="focusMe"
      >
    </form>
  </div>
</template>

<script>
import serverAPI from "@/api/serverAPI.js";

export default {
  name: "searchBar",
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    this.$refs.focusMe.focus();
  },
  methods: {
    submitForm() {
      this.$router.push(`/search/q/${this.name}`);
    }
  }
};
</script>

<style scoped>
#input-name {
  height: 7rem;
  font-size: 4em;
  margin: 0%;
}

.content {
  margin-top: 4rem;
}

.border {
  border: 1px solid black;
}

html {
  background-color: white;
}

input {
  border-bottom: none !important;
  box-shadow: none !important;
}
</style>
