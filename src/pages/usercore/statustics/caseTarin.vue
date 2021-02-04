<template>
  <div class="case_tarin">
    <div class="tarin_top">
      <div class="tarin_top_item">
        <div class="tarin_top_item_title">
          <i></i>
          <span>训练完成次数</span>
        </div>
        <div class="train_itm_main">
          <span>{{ report.totalCnt }}</span>
          <span class="train_itm_main_smal">次</span>
        </div>
        <div class="tarin_bottm_border" style="color: rgb(36, 204, 206)">
          <span>{{ report.totalAllCnt }}次训练完成{{ report.totalCnt }}次</span>
          <p></p>
        </div>
      </div>
      <div class="tarin_top_item">
        <div class="tarin_top_item_title">
          <i class="orange"></i>
          <span>训练总用时</span>
        </div>
        <div class="train_itm_main">
          <span style="color: rgb(251, 138, 94)">{{
            parseInt(report.totalDuring / 60)
          }}</span>
          <span style="color: rgb(251, 138, 94)" class="train_itm_main_smal"
            >分</span
          >
        </div>
        <div class="tarin_bottm_border">
          <span style="color: rgb(251, 138, 94)"
            >{{ report.totalCnt }}次训练完成{{
              parseInt(report.totalDuring / 60)
            }}分钟</span
          >
          <p class="orange_border"></p>
        </div>
      </div>
      <div class="tarin_top_item">
        <div class="tarin_top_item_title">
          <i></i>
          <span>训练覆盖率</span>
        </div>
        <div class="train_itm_main">
          <i-circle
            :percent="parseInt((report.caseCnt / report.totalCaseCnt) * 100)"
            class="item"
            style="width: 25.5%; height: 91%"
            stroke-color="rgb(40,210,208)"
            trail-color="rgb(40,210,208,0.62)"
          >
            <span class="demo-Circle-inner" style="font-size: 40px">
              {{
                report.totalCaseCnt
                  ? parseInt((report.caseCnt / report.totalCaseCnt) * 100)
                  : "0"
              }}%</span
            >
          </i-circle>
        </div>
        <div class="tarin_bottm_border">
          <span style="color: rgb(0, 235, 245)"
            >{{ report.totalCaseCnt }}个案例训练覆盖率为{{
              report.totalCaseCnt
                ? parseInt((report.caseCnt / report.totalCaseCnt) * 100)
                : "0"
            }}%</span
          >
          <p></p>
        </div>
      </div>
    </div>
    <div class="tarin_bottom">
      <div class="train_bottom_left">
        <div class="tarin_top_item_title">
          <i class="train_bottom_left_i"></i>
          <span>分数分析</span>
        </div>
        <div class="train_bottom_left_main">
          <div class="train_bottom_left_main_list">
            <span>最低分</span>
            <span>最高分</span>
            <span>平均分</span>
          </div>
          <div class="train_bottom_left_main_block">
            <div class="data_none" v-show="!score_show">
              <img
                class="train_bottom_left_main_itps"
                src="../../../assets/public/number.png"
                alt=""
              />
              <span>暂无数据</span>
            </div>
            <div v-show="min && score_show == true">
              <img
                src="../../../assets/public/yellowblock.png"
                :style="{ width: min + '%' }"
                alt=""
              />
              <span style="color: rgb(255, 180, 99)"
                >{{ parseInt(report.minScore) }}分</span
              >
            </div>
            <div v-show="max && score_show == true">
              <img
                src="../../../assets/public/bluenlock.png"
                :style="{ width: max + '%' }"
                alt=""
              />
              <span style="color: rgb(0, 245, 255)"
                >{{ parseInt(report.maxScore) }}分</span
              >
            </div>
            <div v-show="avg && score_show == true">
              <img
                src="../../../assets/public/violetblokc.png"
                :style="{ width: avg + '%' }"
                alt=""
              />
              <span style="color: rgb(96, 120, 255)"
                >{{ parseInt(report.avgScore) }}分</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="train_bottom_right" style="margin-left: 30px">
        <div class="tarin_top_item_title">
          <i class="train_bottom_right_i"></i>
          <span>训练成绩分布</span>
          <p class="train_bottom_right_total">总次数:{{ report.totalCnt }}</p>
        </div>
        <div class="train_bottom_right_main">
          <div class="train_bottom_right_main_box">
            <div class="data_none" v-show="!number_show">
              <img
                class="train_bottom_right_main_itps"
                src="../../../assets/public/number.png"
                alt=""
              />
              <span>暂无数据</span>
            </div>
            <div
              class="train_bottom_right_main_box_item"
              v-show="report.historgram050"
            >
              <span>{{ report.historgram050 }}次</span>
              <img
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                :style="{ height: historgram050 + '%' }"
                alt=""
              />
            </div>
            <div
              class="train_bottom_right_main_box_item"
              v-show="report.historgram5060"
            >
              <span>{{ report.historgram5060 }}次</span>
              <img
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                :style="{ height: historgram5060 + '%' }"
                alt=""
              />
            </div>
            <div
              class="train_bottom_right_main_box_item"
              v-show="report.historgram6070"
            >
              <span>{{ report.historgram6070 }}次</span>
              <img
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                :style="{ height: historgram6070 + '%' }"
                alt=""
              />
            </div>
            <div
              class="train_bottom_right_main_box_item"
              v-show="report.historgram7080"
            >
              <span>{{ report.historgram7080 }}次</span>
              <img
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                :style="{ height: historgram7080 + '%' }"
                alt=""
              />
            </div>
            <div
              class="train_bottom_right_main_box_item"
              v-show="report.historgram8090"
            >
              <span>{{ report.historgram8090 }}次</span>
              <img
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                :style="{ height: historgram8090 + '%' }"
                alt=""
              />
            </div>
            <div
              class="train_bottom_right_main_box_item"
              v-show="report.historgram90"
            >
              <span>{{ report.historgram90 }}次</span>
              <img
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                :style="{ height: historgram90 + '%' }"
                alt=""
              />
            </div>
          </div>
          <div class="train_bottom_right_main_item">
            <span>50分以下</span>
            <span>51-60分</span>
            <span>61-70分</span>
            <span>71-80分</span>
            <span>81-90分</span>
            <span>91分以上</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-tarin",
  props: ["diseaseType"],
  data() {
    return {
      report: {},
      score_show: true,
      number_show: false,
      min: 0,
      max: 0,
      avg: 0,
      historgram050: 0,
      historgram5060: 0,
      historgram6070: 0,
      historgram7080: 0,
      historgram8090: 0,
      historgram90: 0,
    };
  },
  mounted() {
    this.getreport();
  },
  methods: {
    getreport() {
      this.axios
        .get("/my/train/report", {
          params: {
            diseaseType: this.diseaseType,
          },
        })
        .then((res) => {
          this.score_show = true;
          this.number_show = true;
          this.report = res.data;
          this.min = (res.data.minScore / 100) * 100;
          this.max = (res.data.maxScore / 100) * 100;
          this.avg = (res.data.avgScore / 100) * 100;
          if (res.data.minScore == null) {
            this.score_show = false;
          }
          this.historgram050 = 0;
          this.historgram5060 = 0;
          this.historgram6070 = 0;
          this.historgram7080 = 0;
          this.historgram90 = 0;
          let totalCnt = res.data.totalCnt;
          if (res.data.historgram050 == null) {
            this.number_show = false;
            return;
          }
          this.historgram050 = (res.data.historgram050 / totalCnt) * 100;
          this.historgram5060 = (res.data.historgram5060 / totalCnt) * 100;
          this.historgram6070 = (res.data.historgram6070 / totalCnt) * 100;
          this.historgram7080 = (res.data.historgram7080 / totalCnt) * 100;
          this.historgram90 = (res.data.historgram90 / totalCnt) * 100;
        });
    },
  },
};
</script>

<style lang="scss">
.case_tarin {
  width: 100%;
  height: 100%;
  padding: 1% 0;
  .tarin_top {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-between;
    .tarin_top_item {
      width: 32%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: url("../../../assets/public/0e0644c15de83e6b6f7e1b6b02d589e.png")
        no-repeat center;
      background-size: 100% 100%;
      .train_itm_main {
        width: 100%;
        height: 60%;
        text-align: center;
        span {
          font-weight: bold;
          font-size: 80px;
          color: rgb(36, 204, 206);
        }
        .train_itm_main_smal {
          font-size: 20px;
        }
      }
      .tarin_bottm_border {
        width: 100%;
        height: 27%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        position: relative;
        p {
          position: absolute;
          width: 220px;
          border: 3px rgb(36, 204, 206) solid;
          border-radius: 3px;
          left: 50%;
          bottom: 0;
          margin-left: -110px;
        }
        .orange_border {
          border: 3px solid rgb(251, 138, 94);
        }
      }
    }
    .tarin_top_item:last-child {
      margin-right: 0;
    }
  }
  .tarin_bottom {
    width: 100%;
    height: 57%;
    margin-top: 1%;
    display: flex;
    .train_bottom_left,
    .train_bottom_right {
      flex: 1;
      background: url("../../../assets/public/0e0644c15de83e6b6f7e1b6b02d589e.png")
        no-repeat center;
      background-size: 100% 100%;
      .train_bottom_left_i {
        background: url("../../../assets/public/25518099.png");
        background-size: 100% 100%;
      }
      .train_bottom_right_i {
        background: url("../../../assets/public/34163255.png");
        background-size: 100% 100%;
      }
    }
    .train_bottom_left_main,
    .train_bottom_right_main {
      margin: 0 auto;
      width: 85%;
      height: 70%;
    }
    .train_bottom_left_main {
      display: flex;
      .train_bottom_left_main_list {
        width: 10%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
      }
      .train_bottom_left_main_block {
        position: relative;
        height: 90%;
        width: 100%;
        border: 1px solid rgb(111, 147, 251);
        border-top: none;
        border-right: none;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        div {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          img {
            width: 100px;
            height: 25px;
            border-top-right-radius: 7px;
            border-bottom-right-radius: 7px;
          }
          span {
            margin-left: 10px;
          }
        }
        .data_none {
          width: 21%;
          height: 42%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          .train_bottom_left_main_itps {
            width: 100%;
            height: 100%;
          }
          span {
            color: rgb(111, 147, 251);
            font-size: 1.2em;
            font-weight: bold;
          }
        }
      }
    }
    .train_bottom_right_main {
      text-align: center;
      .train_bottom_right_main_box {
        position: relative;
        height: 90%;
        width: 100%;
        border: 1px solid rgb(111, 147, 251);
        border-top: none;
        border-right: none;
        display: flex;
        align-items: center;

        .train_bottom_right_main_box_item {
          display: flex;
          flex-direction: column;
          width: 16.6667%;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          img {
            width: 25px;
            height: 50px;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;
          }
          span {
            color: rgb(111, 147, 251);
          }
        }
        .data_none {
          width: 19%;
          height: 42%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          .train_bottom_right_main_itps {
            width: 100%;
            height: 100%;
          }
          span {
            color: rgb(111, 147, 251);
            font-size: 1.2em;
            font-weight: bold;
          }
        }
      }
      .train_bottom_right_main_item {
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: rgb(100, 190, 255);
          flex: 1;
        }
      }
    }
  }
}
</style>

