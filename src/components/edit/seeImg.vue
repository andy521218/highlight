<template>
  <div class="see_img">
    <img :src="url" alt />
    <div @click="$parent.imgs_show = false">
      <img src="../../assets/public/switch.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "see-img",
  props: ["url"],
};
</script>

<style lang="scss">
.see_img {
  position: absolute;
  width: 410px;
  height: 380px;
  background: rgb(255, 255, 255);
  z-index: 999999;
  border-radius: 5px;
  left: 50%;
  top: 115px;
  margin-left: -205px;
  padding: 25px;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    display: inline-block;
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    top: -405px;
    right: -360px;
    background: rgb(6, 114, 200);
    padding: 10px;
    cursor: pointer;
  }
  div:hover {
    background:rgb(111,147,251);
  }
}
</style>