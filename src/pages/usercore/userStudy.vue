<template>
  <div class="user_study">
    <ul class="case_id" v-if="authority == 'TEACHER'">
      <li
        v-for="(item, index) in caseList"
        :key="index"
        @click="routerDisease(item, index)"
      >
        <span>案例{{ index + 1 }}</span
        ><i :class="{ caseId_border: caseIndex == index }"></i>
      </li>
    </ul>
    <header>
      <div class="chart_item">
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text">总分(100分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.total) / 100) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.total) }}分</span
          >
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 1 }"
        @click="routerView(1, 'ask')"
      >
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text">问({{ askscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.ask) / askscore) * 100"
          class="item"
          stroke-color="rgb(117,147,251)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.ask) }}分
          </span>
        </i-circle>
      </div>

      <div
        class="chart_item"
        :class="{ active: titleIndex == 2 }"
        @click="routerView(2, 'watch')"
      >
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text">望({{ watchscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.watch) / watchscore) * 100"
          class="item"
          stroke-color="rgb(117,147,251)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.watch) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 3 }"
        @click="routerView(3, 'listen')"
      >
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text">闻({{ listenscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.listen) / listenscore) * 100"
          class="item"
          stroke-color="rgb(117,147,251)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.listen) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 4 }"
        @click="routerView(4, 'feel')"
      >
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text">切({{ feelscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.feel) / feelscore) * 100"
          class="item"
          stroke-color="rgb(117,147,251)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.feel) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 5 }"
        @click="routerView(5, 'disease')"
      >
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text"
          >辩证({{ dialecticalscore }}分)</span
        >
        <i-circle
          :percent="(Math.floor(scoreData.disease) / dialecticalscore) * 100"
          class="item"
          stroke-color="rgb(117,147,251)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.disease) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 6 }"
        @click="routerView(6, 'treat')"
      >
        <div class="chart_item_title"></div>
        <span class="chart_item_title_text">治疗({{ treatmentscore }}分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.treat) / treatmentscore) * 100"
          class="item"
          stroke-color="rgb(117,147,251)"
          trail-color="rgb(196,217,232)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.treat) }}分</span
          >
        </i-circle>
      </div>
    </header>
    <div class="user_main_item">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "study-main",
  computed: {
    ...mapState(["examId"]),
  },
  data() {
    return {
      caseId: "",
      scoreData: "",
      titleIndex: "1",
      askscore: "",
      watchscore: "",
      listenscore: "",
      feelscore: "",
      dialecticalscore: "",
      treatmentscore: 0,
      examNo: "",
      userId: "",
      authority: "",
      caseList: [],
      caseIndex: "0",
    };
  },
  mounted() {
    this.examNo = localStorage.getItem("examNo");
    this.caseId = localStorage.getItem("caseId");
    this.userId = localStorage.getItem("caseUserId");
    this.authority = localStorage.getItem("authority");
    this.getscore();
    this.getSettingScore();
    if (this.authority == "TEACHER") {
      this.caseList = JSON.parse(localStorage.getItem("ArrayCaseId"));
    }
  },
  methods: {
    routerDisease(caseId, index) {
      localStorage.setItem("caseId", caseId);
      this.$router.push("ask");
      this.titleIndex = 1;
      this.caseIndex = index;
    },
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
    routerView(index, router) {
      this.titleIndex = index;
      this.$router.push(router);
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
};
</script>

<style lang="scss">
.user_study {
  height: 99%;
  width: 100%;
  padding: 1%;
  position: relative;
  .case_id {
    position: absolute;
    width: 90%;
    height: 5%;
    top: -5%;
    display: flex;
    align-items: center;
    li {
      width: 4%;
      height: 100%;
      margin-right: 1em;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      i {
        width: 100%;
        height: 3px;
        border-radius: 3px;
      }
      .caseId_border {
        border: 3px solid rgb(111, 147, 251);
      }
      &:hover {
        i {
          border: 3px solid rgb(111, 147, 251);
        }
      }
    }
  }
  header {
    width: 100%;
    height: 28%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .chart_item {
      width: 12.5%;
      height: 100%;
      border-radius: 5px;
      border: 2px solid rgb(111, 147, 251);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .chart_item_title {
        position: absolute;
        width: 60%;
        height: 0;
        border-top: 30px solid rgb(111, 147, 251);
        border-right: 1em solid transparent;
        border-left: 1em solid transparent;
      }
      .chart_item_title_text {
        position: absolute;
        height: 30px;
        line-height: 30px;
      }
      .item {
        margin-top: 25%;
        width: 55% !important;
        height: 55% !important;
      }
    }
    .active {
      background-color: rgb(225, 237, 254);
      border: none;
    }
    .chart_item:last-child {
      margin-right: 0;
    }
  }
  .user_main_item {
    width: 100%;
    height: 72%;
  }
}
</style>