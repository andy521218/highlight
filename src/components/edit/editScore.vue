<template>
  <div class="teacher_score">
    <div class="edit">
      <div class="edit_title">
        <span class="title">主观成绩</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_text">姓名:</span>
          </div>
          <span class="edit_text_i">{{ editData.name }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_text">班级:</span>
          </div>
          <span class="edit_text_i">{{ editData.classroomName }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_text">考试成绩:</span>
          </div>
          <span class="edit_text_i">{{ parseInt(editData.score) }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">主观成绩:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入成绩"
            v-model="examNumber"
          />
          <p class="edit_tips">{{ scoreText }}</p>
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
  name: "edit-score",
  props: ["editData"],
  data() {
    return {
      scoreText: "",
      examNumber: "",
    };
  },
  methods: {
    close() {
      this.$parent.editscore_show = false;
      this.editData = {};
      this.scoreText = "";
      this.examNumber = "";
    },
    submit() {
      if (!this.examNumber) {
        this.scoreText = "请输入主观成绩";
        return;
      }
      var reg = new RegExp("^([1-9]|[1-9]\\d|100)$");
      if (!reg.test(this.examNumber)) {
        this.scoreText = "请输入1-100的分数";
        return;
      }
      this.scoreText = "";
      this.http
        .put(
          `/exam/result/${this.editData.id}?${this.qs.stringify({
            score: this.examNumber,
          })}`
        )
        .then(() => {
          this.close();
          this.$emit("getResult");
        });
    },
  },
};
</script>