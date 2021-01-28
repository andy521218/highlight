<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="user_core" v-if="this.$store.state.flag">
      <div class="user_menu">
        <menuTab></menuTab>
      </div>
      <div class="user_main">
        <div class="return" @click="$router.push('userrecord')">
          <i-con type="ios-arrow-round-back" size="40" />
          <span>返回</span>
        </div>
        <study-main></study-main>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../../../components/user";
import menuTab from "../../../components/menu";
import logo from "../../../components/logo";
import studyMain from "../study/studyMain";
export default {
  name: "user-study",
  components: {
    user,
    menuTab,
    logo,
    studyMain,
  },
};
</script>

<style lang="scss">
.return {
  position: absolute;
  top: -40px;
  display: flex;
  height: 40px;
  line-height: 40px;
}
</style>