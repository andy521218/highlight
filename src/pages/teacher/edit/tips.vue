<template>
  <div class="case_tips">
    <div class="edit" style="width:340px;top:-30px;">
      <div class="edit_title">
        <span class="title">编辑</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left" style="width: 200px; text-align:left;">
            <span class="edit_red">*</span>
            <span class="edit_text">请选择现病史问题分类:</span>
          </div>
        </li>
      </ul>
      <customize-select style="margin-left:20px;margin-top:10px"></customize-select>
      <div class="edit_btn_box">
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import customizeSelect from "../../../components/customizeSelect";
export default {
  name: "tips",
  components: {
    customizeSelect,
  },
  methods:{
    close(){
      this.$parent.tips=false
    }
  }
};
</script>


