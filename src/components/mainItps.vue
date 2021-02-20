<template>
  <div class="main_table_none_title">
    <span>{{ title ? title : "暂无数据" }}</span>
    <div class="main_table_none_title_bottm"></div>
  </div>
</template>

<script>
export default {
  name: "main-itps",
  props: ["title"],
};
</script>

<style lang="scss">
.main_table_none_title {
  width: 100em;
  height: 10em;
  margin: 5% auto;
  border: 1px solid rgb(111, 147, 251);
  background: fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  span {
    font-size: 1.8em;
  }
  .main_table_none_title_bottm {
    position: absolute;
    width: 40em;
    height: 0.5em;
    background: rgb(111, 147, 251);
    border-radius: 3px;
    bottom: 0px;
  }
}
</style>