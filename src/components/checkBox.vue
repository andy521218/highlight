<template>
  <i
    class="checkbox"
    :class="{ active: isChecked == true }"
    @click="checkFlag"
  ></i>
</template>

<script>
export default {
  name: "check-box",
  data() {
    return {
      isChecked: true,
    };
  },
  methods: {
    checkFlag() {
      this.$emit("checkFlag");
    },
  },
};
</script>

<style lang="scss">
.checkbox {
  display: inline-block;
  width: 11%;
  height: 100%;
  background: #06498d;
  border: 1px solid #0096ff;
  border-radius: 3px;
}

.checkbox.active {
  border: none;
  background: url("../assets/public/checkbox.png") no-repeat center;
  background-size: 100% 100%;
}
</style>