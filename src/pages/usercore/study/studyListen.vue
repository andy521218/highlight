<template>
  <div class="study_listen">
    <div class="study_title">
      <span>闻诊</span>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 30%; padding-left: 10px">问题</span>
        <span style="width: 30%">正确答案</span>
        <span style="width: 35%">我的答案</span>
        <span style="width: 5%"></span>
      </li>
    </ul>
    <div class="scrollbar">
      <div class="normal_edit" v-show="listen_item_data.length == '0'">
        {{ title }}的结果均为正常
        <p></p>
      </div>
      <ul class="study_main_item" v-show="listen_item_data.length != '0'">
        <li
          v-for="(item, index) in listen_item_data"
          :key="index"
          style="height: 40px"
        >
          <span style="width: 30%; padding-left: 10px">{{
            item.name ? item.name : "按诊"
          }}</span>
          <span style="width: 30%">{{ item.correctAnswer }}</span>
          <span style="width: 35%">{{ item.answer }}</span>
          <span style="width: 5%; height: 20px" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "study-listen",
  data() {
    return {
      title: "闻诊",
      listen_item_data: [],
      typeId: "0",
      caseId: "",
      userId: "",
      examNo: "",
    };
  },
  computed: {
    ...mapState(["examId"]),
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.userId = localStorage.getItem("examId");
    this.getListen();
  },
  methods: {
    getListen() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/listened`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.listen_item_data = res.data;
        });
    },
  },
  watch: {
    examId: function () {
      this.caseId = this.examId;
      this.getListen();
    },
  },
};
</script>

<style lang="scss">
.study_listen {
  .study_title {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .study_main {
    .study_item_title {
      width: 100%;
      background: rgb(21, 100, 157);
      height: 50px;
      display: flex;
      align-items: center;
    }
  }
}
</style>