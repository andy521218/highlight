<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initRoutes } from "./router/index";
export default {
  mounted() {
    window.addEventListener("beforeunload", () => {
      if(this.$route.name=='login'||this.$route.name==null) return
      localStorage.removeItem("login");
    });
    initRoutes();
  },
};
</script>
