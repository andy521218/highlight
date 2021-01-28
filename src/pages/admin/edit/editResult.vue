<template>
  <div class="edit edit_result">
    <div class="edit_title">
      <span class="title">添加{{ title }}结果</span>
      <span class="edit_switch" @click="closeResult()"></span>
    </div>
    <ul class="edit_class">
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">诊断项:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-model="name"
          placeholder="请输入诊断项"
        />
        <p class="edit_tips" style="top: 42px; right: 40px">{{ tipsName }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">诊断结果:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-model="options"
          placeholder="请以逗号分隔"
        />
        <p class="edit_tips" style="top: 42px; right: 40px">
          {{ tipsOptions }}
        </p>
      </li>
    </ul>
    <div class="edit_btn_box">
      <button class="edit_cancel" @click="closeResult()">取消</button>
      <button class="edit_submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-result",
  data() {
    return {
      name: "",
      options: "",
      tipsName: "",
      tipsOptions: "",
    };
  },
  props: ["title", "type", "item"],
  mounted() {
    try {
      this.name = this.item.name;
      this.options = this.item.options.toString();
    } catch (error) {
      error;
    }
  },
  methods: {
    closeResult() {
      this.$parent.item = "";
      this.$parent.result = false;
    },
    submit() {
      if (!this.item.id) {
        if (!this.name) {
          return (this.tipsName = "请输入诊断项");
        }
        this.tipsName = "";
        if (!this.options) {
          return (this.tipsOptions = "请输入诊断结果");
        }
        this.tipsOptions = "";
        this.options = this.options.split(",");
        var str = {
          name: this.name,
          options: this.options,
          type: this.type,
        };
        this.http.post(`/meta/watch/${this.type}/options`, str).then((res) => {
          if (res.code == "000000") {
            this.$parent.result = false;
            this.$emit("getItemData");
            this.$Message.warning("添加成功!");
          }
        });
      } else {
        this.options = this.options.split(",");
        this.http
          .put(`/meta/watch/${this.type}/options/${this.item.id}`, {
            name: this.name,
            options: this.options,
            type: this.type,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.$parent.result = false;
              this.$emit("getItemData");
              this.$Message.warning("添加成功!");
            }
          });
      }
    },
  },
};
</script>


<style lang="scss">
.edit_result {
  margin: 0 0;
  ul {
    height: auto;
    li {
      border: none;
    }
  }
}
</style>
