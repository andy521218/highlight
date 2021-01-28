<template>
  <div class="treatment diagnosis">
    <div class="cont_bg" style="width: 35%">
      <!-- 弹窗 -->
      <div class="mask" v-if="treatment"></div>
      <div class="edit big" v-if="treatment">
        <div class="edit_title">
          <span class="title">添加治则治法</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">治则治法:</span>
            </div>
            <input
              type="text"
              class="text_box"
              placeholder="请输入治则治法"
              v-model="name"
            />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="editSwitch()">取消</button>
          <button class="edit_submit" @click="submit()">确定</button>
        </div>
      </div>

      <!-- 内容 -->
      <div class="cont_header">治则治法</div>
      <div class="scrollbar">
        <ul ref="scroll">
          <li v-for="(item, index) in data" :key="index">
            <div class="item_cont">
              <div class="item_left">
                <i></i>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <button class="addResult" @click="addTreatment()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "treatment-diagnosis",
  data() {
    return {
      treatment: false,
      data: "",
      name: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    editSwitch() {
      this.treatment = false;
    },
    addTreatment() {
      this.treatment = true;
    },
    getData() {
      this.axios.get("/meta/treat").then((res) => {
        this.data = res.data;
      });
    },
    submit() {
      if (!this.name) return this.$Message.error("内容不能为空!");
      this.axios
        .post("/meta/treat", {
          name: this.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.treatment = false;
            this.getData();
            setTimeout(() => {
              this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
            }, 300);
            this.$Message.warning("添加成功!");
          }
        });
    },
  },
};
</script>

<style lang="scss">
.treatment {
  .edit {
    margin: 0 7%;
    ul {
      height: auto;
      li {
        border: none;
      }
    }
  }
}
</style>

