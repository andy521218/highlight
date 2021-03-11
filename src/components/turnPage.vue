<template>
  <div class="turn_page">
    <div class="pagination">
      <Page :total="totaltotal" :page-size="size" @on-change="change" :current='currentPage'/>
    </div>
    <div class="count">
      <span>共{{ totaltotal }}条数据/每页{{ size }}条</span>
    </div>
  </div>
</template>

<script>
import { Page } from "view-design";
export default {
  name: "turn_page",
  props: ["totaltotal", "size",'currentPage'],
  data() {
    return {
      pageNumber: "",
      pages: "1",
    };
  },
  methods: {
    change(page) {
      this.$emit("getData", page);
    },
  },
  components: {
    Page,
  },
};
</script>

<style lang="scss">
.turn_page {
  width: 100%;
  height: 2em;
  display: flex;
  margin-top: 0.7em;
  position: relative;
  .count {
    position: absolute;
    right: 3em;
  }
  .pagination {
    margin: 0 auto;
  }
}
</style>