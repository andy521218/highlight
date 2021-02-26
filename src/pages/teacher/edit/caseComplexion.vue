<template>
  <div class="case_option complexion">
    <div class="edit" style="width: 43em">
      <div class="edit_teacher">
        <div class="edit_title">
          <span class="title">{{ option.name }}</span>
          <span class="edit_switch" @click="close"></span>
        </div>
      </div>
      <div class="complexion_one">
        <ul class="" v-for="(item, index) in optionData" :key="index">
          <li v-for="(i, index) in item" :key="index">
            <div class="custom_radio">
              <span
                class="custom_text"
                :class="{
                  active_radio: radioData == i,
                }"
              ></span>
              <input
                type="radio"
                class="custom_none"
                style="width: 22px; height: 22px"
                :value="i"
                v-model="radioData"
              />
            </div>
            <label for="">{{ i }} </label>
          </li>
        </ul>
      </div>

      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-complexion",
  props: ["option"],
  data() {
    return {
      radioData: "",
      optionData: [],
    };
  },
  mounted() {
    this.radioData = this.option.answer;
    this.init();
  },
  methods: {
    init() {
      let arr = this.option.options;
      let arr1 = ["面色正常"],
        arr2 = [],
        arr3 = [],
        arr4 = [],
        arr5 = [];
      arr.forEach((element, index) => {
        if (element == "正常" || /黄/.test(element)) {
          arr1.push(element);
        }
        if (/白/.test(element)) {
          arr2.push(element);
        }
        if (/红/.test(element)) {
          arr3.push(element);
        }
        if (/青/.test(element)) {
          arr4.push(element);
        }
        if (/黑/.test(element)) {
          arr5.push(element);
        }
        if (index == arr.length - 1) {
          this.optionData.push(arr1);
          this.optionData.push(arr2);
          this.optionData.push(arr3);
          this.optionData.push(arr4);
          this.optionData.push(arr5);
        }
      });
    },
    close() {
      this.$parent.optionShow = false;
      this.$parent.complexion = false;
      this.$parent.mask = false;
      this.radioData = "";
    },
    submit() {
      if (!this.radioData) return this.$Message.error("请选择一项正确答案");
      this.$emit("editcaseData");
    },
  },
};
</script>

<style lang="scss">
.complexion {
  .complexion_one {
    display: flex;
    ul {
      width: 100%;
      flex-direction: column;
      li {
        width: 100%;
        padding-left: 1.5em;
        .custom_radio {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>