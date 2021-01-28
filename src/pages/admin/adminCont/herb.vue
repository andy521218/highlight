<template>
  <div class="herb diagnosis">
    <left-herb></left-herb>
    <right-herb></right-herb>
  </div>
</template>

<script>
import leftHerb from "./leftHerb";
import rightHerb from "./rightHerb";
export default {
  name: "prescription-diagnosis",
  components: {
    leftHerb,
    rightHerb,
  },
};
</script>
<style lang="scss">
.herb {
  .cont_bg {
    width: 35%;
    .edit {
      margin: 0 7%;
      ul {
        height: auto;
        li {
          border: none;
        }
      }
    }
    .item_container_between_dele {
      color: rgb(252, 94, 95);
    }
    .item_container_between_dele:hover {
      border-bottom-color: rgb(252, 94, 95);
    }
  }
}
</style>