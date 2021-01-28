<template>
  <div class="logo" @click="link">
    <h1 v-if="authority != 'ADMIN' && exam == null && index == true"></h1>
    <span v-if="authority != 'ADMIN' && exam == null && index == true"
      >首页</span
    >
  </div>
</template>

<script>
export default {
  name: "logo",
  props: ["exam", "index"],
  data() {
    return {
      authority: "",
    };
  },
  methods: {
    link() {
      if (this.authority == "STUDENT") {
        let url = window.location.href;
        if (
          /userask/.test(url) ||
          /userlook/.test(url) ||
          /userHear/.test(url) ||
          /usercut/.test(url) ||
          /userdialectical/.test(url) ||
          /usertreatment/.test(url)
        ) {
          this.$parent.index_show = true;
          return;
        }
      }
      this.$router.push("/index");
    },
  },
  mounted() {
    this.authority = localStorage.getItem("authority");
    if (/index/.test(window.location.href)) {
      this.$parent.index = false;
    } else {
      this.$parent.index = true;
    }
  },
};
</script>

<style lang="scss">
.logo {
  width: 5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(255, 255, 255);
  cursor: pointer;
  h1 {
    width: 40%;
    height: 35%;
    background: url("../assets/public/home.png") no-repeat center;
    background-size: 100% 100%;
  }
}
</style>