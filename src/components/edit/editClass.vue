<template>
  <div class="edit_class">
    <div class="edit">
      <div class="edit_title">
        <span class="title">{{ tips ? "编辑" : "新建" }}班级</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li style="display: flex">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">院/系:</span>
          </div>
          <span class="edit_text_i" v-if="tips">{{
            editData.departmentName
          }}</span>
          <select-box
            :defaultTitle="'请选择院系'"
            :listData="departmentsData"
            :typeId="'did'"
            :itemId="'id'"
            :itemName="'name'"
            style="z-index: 999"
            v-else
          ></select-box>
        </li>
        <li style="display: flex">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">专业:</span>
          </div>
          <span class="edit_text_i" v-if="tips">{{
            editData.specialtyName
          }}</span>
          <select-box
            :defaultTitle="'请选择专业'"
            :listData="specialtyData"
            :typeId="'sid'"
            :itemId="'id'"
            :itemName="'name'"
            style="z-index: 99"
            v-else
          ></select-box>
        </li>
        <li style="display: flex">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">年级:</span>
          </div>
          <span class="edit_text_i" v-if="tips">{{ editData.gradeName }}</span>
          <select-box
            :defaultTitle="'请选择年级'"
            :listData="gradeData"
            :typeId="'gradeId'"
            :itemId="'id'"
            :itemName="'name'"
            v-else
          ></select-box>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">班级名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-model="upData.name"
            placeholder="请输入班级名称"
          />
          <p class="edit_tips"></p>
        </li>
        <li class="custom_radio_li">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">班级状态:</span>
          </div>

          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{ active_radio: status == true }"
            ></span>
            <input
              type="radio"
              class="custom_none"
              v-model="status"
              :value="true"
            />
          </div>
          <label for class="edit_off">正常</label>

          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{ active_radio: status == false }"
            ></span>
            <input
              type="radio"
              class="custom_none"
              v-model="status"
              :value="false"
            />
          </div>
          <label for class="edit_off">禁用</label>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import selectBox from "../../components/selectBox";

export default {
  name: "edit-class",
  props: ["specialtyData", "gradeData", "departmentsData", "editData", "tips"],
  components: {
    selectBox,
  },
  data() {
    return {
      did: "",
      sid: "",
      gradeId: "",
      title: true,
      upData: {},
      status: true,
      active: 1,
    };
  },
  mounted() {
    if (this.tips) {
      this.upData = this.editData;
      this.status = this.editData.status;
      this.did = this.editData.departmentId;
      this.sid = this.editData.specialtyId;
    }
  },
  methods: {
    close() {
      this.upData = {};
      this.$parent.tips = true;
      this.$parent.editClass = false;
    },
    submit() {
      var methods = "put";
      var url = this.upData.id;
      if (!this.upData.departmentId) {
        methods = "post";
        url = "";
        if (!this.did) return this.$Message.error("请选择院/系");
        if (!this.sid) return this.$Message.error("请选择专业");
        if (!this.gradeId) return this.$Message.error("请选择年级");
        if (!this.upData.name) return this.$Message.error("请输入班级名称");
      }
      this.axios[methods](
        `/classrooms/${url}?${this.qs.stringify({
          did: this.did,
          name: this.upData.name,
          gradeId: this.gradeId,
          sid: this.sid,
          status: this.status,
        })}`
      ).then((res) => {
        if (res.code == "000000") {
          this.close();
          this.$emit("getData");
          this.$Message.warning(`${this.tips ? "编辑" : "新建"}班级成功!`);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>

