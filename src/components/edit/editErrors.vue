<template>
  <div class="edit_error">
    <div class="edit">
      <div class="edit_title">
        <span class="title">错误提示</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <div class="scrollbar" style="padding-right: 5px">
        <ul class="edit_error_ul">
          <li v-for="(item, index) in errorData" :key="index">
            <span>{{ index + 1 }}:</span>
            <span>{{ item.rowNumber + 1 }}行{{ item.errorMsg }}</span>
          </li>
        </ul>
      </div>

      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="close">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["errorData"],
  methods: {
    close() {
      this.$parent.errors = false;
      this.$parent.mask = false;
      this.$parent.main_mask = false;
    },
  },
};
</script>

<style lang="scss">
.edit_error {
  .edit_error_ul {
    max-height: 500px;
    overflow-y: auto;
    li {
      display: flex;
      align-items: center;
      width: 96%;
      padding: 0 10px;
      height: 30px;
      margin: 10px 0;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>