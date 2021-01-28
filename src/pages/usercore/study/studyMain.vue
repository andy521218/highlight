<template>
  <div class="user_study">
    <header>
      <div class="chart_item">
        <span class="chart_item_title">总分(100分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.total) / 100) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.total) }}分</span
          >
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 1 }"
        @click="titleIndex = 1"
      >
        <span class="chart_item_title">问({{ askscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.ask) / askscore) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.ask) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 2 }"
        @click="titleIndex = 2"
      >
        <span class="chart_item_title">望({{ watchscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.watch) / watchscore) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.watch) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 3 }"
        @click="titleIndex = 3"
      >
        <span class="chart_item_title">闻({{ listenscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.listen) / listenscore) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.listen) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 4 }"
        @click="titleIndex = 4"
      >
        <span class="chart_item_title">切({{ feelscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.feel) / feelscore) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.feel) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 5 }"
        @click="titleIndex = 5"
      >
        <span class="chart_item_title">辩证({{ dialecticalscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.disease) / dialecticalscore) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.disease) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 6 }"
        @click="titleIndex = 6"
      >
        <span class="chart_item_title">治疗({{ treatmentscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.treat) / treatmentscore) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.treat) }}分</span
          >
        </i-circle>
      </div>
    </header>
    <div class="user_main_item">
      <study-ask v-show="titleIndex == 1" :scoreData="scoreData"></study-ask>
      <study-watch v-show="titleIndex == 2"></study-watch>
      <study-listen v-show="titleIndex == 3"></study-listen>
      <study-feel v-show="titleIndex == 4"></study-feel>
      <study-disease v-if="titleIndex == 5"></study-disease>
      <study-treat v-show="titleIndex == 6"></study-treat>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import studyAsk from "../study/studyAsk";
import studyWatch from "../study/studyWatch";
import studyListen from "../study/studyListen";
import studyFeel from "../study/studyFeel";
import studyDisease from "../study/studyDisease";
import studyTreat from "../study/studyTreat";
export default {
  name: "study-main",
  components: {
    studyAsk,
    studyWatch,
    studyListen,
    studyFeel,
    studyDisease,
    studyTreat,
  },
  computed: {
    ...mapState(["examId"]),
  },
  data() {
    return {
      examNo: "",
      caseId: "",
      userId: "",
      scoreData: "",
      titleIndex: "1",
      askscore: "",
      watchscore: "",
      listenscore: "",
      feelscore: "",
      dialecticalscore: "",
      treatmentscore: 0,
    };
  },
  mounted() {
    this.userId = localStorage.getItem("examId");
    this.examNo = localStorage.getItem("examNo");
    this.caseId = localStorage.getItem("caseId");
    this.getSettingScore();
    this.getscore();
  },
  methods: {
    getSettingScore() {
      this.axios.get("/case/manage/score/setting").then((res) => {
        res.data.forEach((item) => {
          if (item.name == "问诊") {
            this.askscore = item.score;
          }
          if (item.name == "望诊") {
            this.watchscore = item.score;
          }
          if (item.name == "闻诊") {
            this.listenscore = item.score;
          }
          if (item.name == "切诊") {
            this.feelscore = item.score;
          }
          if (item.name == "辩证") {
            this.dialecticalscore = item.score;
          }
          if (item.name == "治则治法" || item.name == "方药方剂") {
            this.treatmentscore += item.score;
          }
        });
      });
    },
    getscore() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/score`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.scoreData = res.data;
        });
    },
  },
  watch: {
    examId: function () {
      this.caseId = this.examId;
      this.getscore();
    },
  },
};
</script>

<style lang="scss">
.user_study {
  height: 99%;
  width: 100%;
  padding: 1%;
  header {
    width: 100%;
    height: 210px;
    display: flex;
    .chart_item {
      flex: 1;
      max-width: 210px;
      max-height: 210px;
      margin-right: 28px;
      background: url("../../../assets/public/chart_deafuly.png") no-repeat
        center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .chart_item_title {
        position: absolute;
        text-align: center;
        line-height: 30px;
        display: inline-block;
        height: 30px;
        width: 130px;
        background: url("../../../assets/public/chart_default_title.png")
          no-repeat center;
        background-size: 100% 100%;
        left: 0;
        top: 0;
      }

      .item {
        margin-top: 20px;
        width: 70% !important;
        height: 70% !important;
      }
    }
    .active {
      background: url("../../../assets/public/chart.png") no-repeat center;
      background-size: 100% 100%;
      .chart_item_title {
        background: url("../../../assets/public/chart_title.png") no-repeat
          center;
        background-size: 100% 100%;
      }
    }
    .chart_item:last-child {
      margin-right: 0;
    }
  }
  .user_main_item {
    width: 100%;
    height: 534px;
  }
}
</style>