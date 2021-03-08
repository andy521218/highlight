<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import  { initRoutes } from "./router/index";
export default {
  mounted() {
    initRoutes();
  },
};
</script>
