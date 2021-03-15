<template>
  <div class="case_option">
    <div class="edit">
      <div class="edit_teacher">
        <div class="edit_title">
          <span class="title">{{ option.name }}</span>
          <span class="edit_switch" @click="close"></span>
        </div>
        <ul>
          <li
            class="case_option_li"
            v-for="(item, index) in option.options"
            :key="index"
          >
            <div class="custom_radio">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: radioData.indexOf(item) > -1,
                }"
              >
              </span>
              <input
                type="checkbox"
                class="custom_none"
                style="width: 22px; height: 22px"
                :value="item"
                v-model="radioData"
              />
            </div>
            <label for="">{{ item }} </label>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="close">取消</button>
          <button class="edit_submit" @click="submit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "look-option",
  props: ["option", "videoUrl"],
  data() {
    return {
      radioData: [],
      optionData: [],
    };
  },
  mounted() {
    try {
      this.radioData = this.option.answer.split(",");
    } catch (error) {
      return error
    }
  },
  methods: {
    close() {
      this.$parent.optionShow = false;
      this.$parent.checkboxShow = false;
      this.$parent.mask = false;
      this.radioData = "";
    },
    submit() {
      if (!this.radioData) return this.$Message.error("请选择一项正确答案");
      this.radioData = this.radioData.toString();
      this.$emit("editcaseData");
    },
    play() {
      let song = document.getElementById("song");
      song.src = this.videoUrl;
      song.play();
    },
  },
};
</script>

<style lang="scss">
.case_option {
  .edit {
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .case_option_li {
        display: flex;
        width: 50%;
        margin: 1.5em 0 0 0;
        .custom_radio {
          margin-left: 30%;
          margin-right: 10px;
        }
      }
    }
    .song {
      display: flex;
      margin-top: 20px;
      align-content: center;
      justify-content: center;
      span {
        line-height: 42px;
        margin-left: 20px;
      }
    }
  }
}
</style>