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
  background: rgb(240, 246, 255);
  border: 1px solid rgb(111, 147, 251);
  border-radius: 3px;
  height: 1.6em;
  margin-right: 3%;
}

.checkbox.active {
  border: none;
  background: url("../assets/public/checkbox.png") no-repeat center;
  background-size: 100% 100%;
}
</style>