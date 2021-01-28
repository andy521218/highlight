<template>
  <div class="case_option">
    <div class="edit">
      <div class="edit_teacher">
        <div class="edit_title">
          <span class="title">{{ option.name }}</span>
          <span class="edit_switch" @click="close"></span>
        </div>
        <div class="song" v-if="videoUrl">
          <audio hidden="true" style="display: none" id="song"></audio>
          <img src="../../../assets/public/play.png" alt="" @click="play" />
          <span>请根据音频选出正确答案</span>
        </div>
        <ul>
          <li v-for="(item, index) in option.options" :key="index">
          
            <div class="custom_radio">
              <span
                class="custom_text"
                :class="{
                  active_radio: radioData == (item.name ? item.name : item),
                }"
              ></span>
              <input
                type="radio"
                class="custom_none"
                style="width: 22px; height: 22px"
                :value="item.name ? item.name : item"
                v-model="radioData"
              />
            </div>
            <label for="">{{ item.name ? item.name : item }} </label>
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
  name: "case-option",
  props: ["option", "videoUrl"],
  data() {
    return {
      radioData: "",
      optionData: [],
    };
  },
  mounted() {
    this.radioData = this.option.answer;
  },
  methods: {
    close() {
      this.$parent.optionShow = false;
      this.$parent.mask = false;
      this.radioData = "";
    },
    submit() {
      if (!this.radioData) return this.$Message.error("请选择一项正确答案");
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
      li {
        display: flex;
        margin-left: 70px;
        width: 150px;
        .custom_radio {
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
