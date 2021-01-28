<template>
  <div class="edit">
    <div class="edit_teacher">
      <div class="edit_title">
        <span class="title">{{ data.title }}</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            :placeholder="data.text"
            v-model="name"
          />
          <p class="edit_tips"></p>
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
export default {
  name: "edit-admin",
  props: ["data"],
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    this.name = this.data.name;
  },
  methods: {
    close() {
      this.name = "";
      this.$parent.editShow = false;
      this.$parent.data = {};
    },
    submit() {
      var url,
        id,
        methods = "put";
      id = this.data.id ? this.data.id : "";
      if (!this.name) return this.$Message.error("请输入内容");
      if (/添加年级/.test(this.data.title)) {
        url = "/grade";
      } else if (/添加院系/.test(this.data.title)) {
        url = "/departments";
      } else if (/添加专业/.test(this.data.title)) {
        url = "/specialty";
      }
      if (!this.data.id) {
        methods = "post";
      }
      var updata = this.qs.stringify({
        name: this.name,
      });
      this.axios[methods](`${url}/${id}?${updata}`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning(`添加${this.data.title}成功!`);
          this.close();
          if (/添加年级/.test(this.data.title)) {
            this.$emit("getGrade");
          } else if (/添加院系/.test(this.data.title)) {
            this.$emit("getDepartments");
          } else if (/添加专业/.test(this.data.title)) {
            this.$emit("getSpecialty");
          }
        }
      });
    },
  },
};
</script>
