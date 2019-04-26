<template>
  <router-link to="/">
    <a href>
      <h1 id="vertical-text">HYPE LEASH</h1>
    </a>
  </router-link>
</template>

<script>
export default {
  name: "brand"
};
</script>


<style scoped>
#vertical-text {
  transform: rotate(-90deg);
  transform-origin: left 0;
  margin-top: 35rem;
}
#vertical-text {
  float: left;
  position: fixed;
  /* left:0; */
  /* right: 91rem; */
}

h1 {
  left: 6rem;
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  font-weight: 500;
}

h1:hover {
  color: grey;
}
</style>
