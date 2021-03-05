<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initRoutes } from "./router/index";
export default {
  mounted() {
   window.addEventListener('beforeunload',()=>this.beforeunloadHandler())
    initRoutes()
  },
  methods:{
    beforeunloadHandler(){
      if(this.$route.path=='/') return
      localStorage.removeItem('authority')
    }
  }
};
</script>
