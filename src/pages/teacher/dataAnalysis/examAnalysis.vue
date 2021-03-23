<template>
  <div class="analysis">
    <div class="main_header">
      <div class="main_header_left"></div>
      <div class="main_header_right">
        <selectBox
          :title="'班级'"
          :listData="classrooms"
          :typeId="'classroomsId'"
          :itemName="'name'"
          :itemId="'id'"
          :defaultTitle="'请选择班级'"
          @changeItem="getExamName"
        ></selectBox>

        <selectBox
          :title="'试卷'"
          :listData="testPaperData"
          :typeId="'testPaperId'"
          :itemName="'name'"
          :itemId="'testPaperId'"
          :defaultTitle="'请选择试卷'"
        ></selectBox>
        <button class="submit" @click="serarch">检索</button>
      </div>
    </div>
    <div class="exam_analysis">
      <div class="exam_left">
        <div class="exam_left_top">
          <div class="exam_left_top_peopleTotal analysis_background">
            <div class="tarin_top_item_title">
              <i class="train_bottom_left_i"></i>
              <span>考试参与人数</span>
            </div>
            <div class="state_none" v-show="people_show">
              <img src="../../../assets/public/classroom.png" alt="" />
              <span>暂无数据</span>
            </div>

            <div class="exam_left_top_peopleTotal_main">
              <i-circle
                v-show="!people_show"
                :percent="parseInt((report.userDone / report.totalUser) * 100)"
                class="item"
                style="width: 47%; height: 70%"
                stroke-color="rgb(40,210,208)"
                trail-color="rgb(40,210,208,0.62)"
              >
                <span class="demo-Circle-inner" style="font-size: 3em">
                  {{
                    parseInt((report.userDone / report.totalUser) * 100)
                  }}%</span
                >
              </i-circle>
            </div>
            <div class="tarin_bottm_border" v-show="!people_show">
              <span
                >当前参与人数:{{ report.userDone }}/{{ report.totalUser }}</span
              >
              <p style="border: 3px rgb(40, 210, 208) solid"></p>
            </div>
          </div>
          <div class="exam_left_top_averageTime analysis_background">
            <div class="tarin_top_item_title">
              <i class="train_bottom_left_i orange"></i>
              <span>考试平均用时</span>
            </div>
            <div class="state_none" v-show="examtime_show">
              <img src="../../../assets/public/classroom.png" alt="" />
              <span>暂无数据</span>
            </div>

            <div class="exam_left_top_averageTime_main" v-show="!examtime_show">
              <span>{{ parseInt(report.avgCostTime / 60000) }}</span>
              <span style="font-size: 30px">分</span>
            </div>
            <div class="tarin_bottm_border" v-show="!examtime_show">
              <span
                >{{ report.userDone }}次考试平均用时{{
                  parseInt(report.avgCostTime / 60000)
                }}分钟</span
              >
              <p style="border: 3px rgb(251, 138, 94) solid"></p>
            </div>
          </div>
        </div>
        <div class="exam_left_bottom analysis_background">
          <div class="tarin_top_item_title">
            <i class="train_bottom_left_i yellow"></i>
            <span>分数分析</span>
          </div>
          <div class="state_none" v-show="avgnumber_show">
            <img src="../../../assets/public/classroom.png" alt="" />
            <span>暂无数据</span>
          </div>

          <div class="exam_left_bottom_main" v-show="!avgnumber_show">
            <div class="exam_left_bottom_main_title">
              <span>最低分</span>
              <span>最高分</span>
              <span>平均分</span>
            </div>
            <div class="exam_left_bottom_main_block">
              <div class="exam_left_bottom_main_block_item">
                <img
                  src="../../../assets/public/yellowblock.png"
                  :style="{ width: min + '%' }"
                  alt=""
                />
                <span style="color: rgb(255, 180, 99)" v-show="min"
                  >{{ parseInt(report.minScore) }}分</span
                >
              </div>
              <div class="exam_left_bottom_main_block_item">
                <img
                  src="../../../assets/public/bluenlock.png"
                  :style="{ width: max + '%' }"
                  alt=""
                />
                <span style="color: rgb(111, 147, 251)" v-show="max"
                  >{{ parseInt(report.maxScore) }}分</span
                >
              </div>
              <div class="exam_left_bottom_main_block_item">
                <img
                  src="../../../assets/public/violetblokc.png"
                  :style="{ width: avg + '%' }"
                  alt=""
                />
                <span style="color: rgb(171, 130, 255)" v-show="avg"
                  >{{ parseInt(report.avgScore) }}分</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exam_right analysis_background">
        <div class="tarin_top_item_title" style="height: 10%">
          <i class="train_bottom_left_i blue"></i>
          <span>考试成绩分布</span>
        </div>
        <div class="state_none" v-show="examNumber_show">
          <img src="../../../assets/public/classroom.png" alt="" />
          <span>暂无数据</span>
        </div>

        <div class="exam_right_main" v-show="!examNumber_show">
          <div class="exam_right_main_block">
            <div class="exam_right_main_block_item">
              <span v-show="historgram050">{{ report.historgram050 }}人</span>
              <img
                :style="{ height: historgram050 + '%' }"
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram5060">{{ report.historgram5060 }}人</span>
              <img
                :style="{ height: historgram5060 + '%' }"
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram6070">{{ report.historgram6070 }}人</span>
              <img
                :style="{ height: historgram6070 + '%' }"
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram8090">{{ report.historgram7080 }}人</span>
              <img
                :style="{ height: historgram7080 + '%' }"
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram8090">{{ report.historgram8090 }}人</span>
              <img
                :style="{ height: historgram8090 + '%' }"
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram90">{{ report.historgram90 }}人</span>
              <img
                :style="{ height: historgram90 + '%' }"
                src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
                alt=""
              />
            </div>
          </div>
          <div class="exam_right_main_title">
            <span>50分以下</span>
            <span>51分-60分</span>
            <span>61分-70分</span>
            <span>71分-80分</span>
            <span>81分-90分</span>
            <span>91分以上</span>
          </div>
        </div>
        <div class="exam_right_bottom" v-show="!examNumber_show">
          <div class="tarin_bottm_border">
            <span>共{{ report.totalUser }}人</span>
            <p style="border: 3px rgb(34, 163, 255) solid"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import selectBox from "../../../components/selectBox";
export default {
  name: "exam-analysis",
  components: {
    selectBox,
  },
  data() {
    return {
      classroomsId: "",
      testPaperId: "",
      people_show: true,
      examtime_show: true,
      avgnumber_show: true,
      examNumber_show: true,
      classrooms: {},
      examNameData: {},
      testPaperData: [],
      report: {},
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
    this.getClassrooms();
  },
  methods: {
    getClassrooms() {
      this.axios
        .get("/classrooms", {
          params: {
            size: "500",
            page: "1",
          },
        })
        .then((res) => {
          this.classrooms = res.data.rows;
        });
    },
    getExamName() {
      this.axios
        .get(`/case/report/testpaper/${this.classroomsId}`)
        .then((res) => {
          this.testPaperData = res.data;
        });
    },
    serarch() {
      this.axios
        .get("/case/report/exam", {
          params: {
            classroomId: this.classroomsId,
            testPaperId: this.testPaperId,
          },
        })
        .then((res) => {
          this.report = res.data;
          //人数
          if (!res.data.totalUser) {
            this.people_show = true;
          } else {
            this.people_show = false;
          }
          //时间
          if (!res.data.avgCostTime) {
            this.examtime_show = true;
          } else {
            this.examtime_show = false;
          }
          //分数分析
          if (res.data.minScore == null) {
            this.avgnumber_show = true;
          } else {
            this.avgnumber_show = false;
            this.min = res.data.minScore * 0.9;
            this.max = res.data.maxScore * 0.9;
            this.avg = res.data.avgScore * 0.9;
          }

          //考试成绩分布
          if (res.data.historgram050 == null) {
            this.examNumber_show = true;
          } else {
            this.examNumber_show = false;
            this.historgram050 =
              (res.data.historgram050 / res.data.totalUser) * 100;
            this.historgram5060 =
              (res.data.historgram5060 / res.data.totalUser) * 100;
            this.historgram6070 =
              (res.data.historgram6070 / res.data.totalUser) * 100;
            this.historgram7080 =
              (res.data.historgram7080 / res.data.totalUser) * 100;
            this.historgram8090 =
              (res.data.historgram8090 / res.data.totalUser) * 100;
            this.historgram90 =
              (res.data.historgram90 / res.data.totalUser) * 100;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.analysis {
  width: 100%;
  height: 100%;

  //公共样式
  .analysis_background {
    background: url("../../../assets/public/0e0644c15de83e6b6f7e1b6b02d589e.png")
      no-repeat center;
    background-size: 100% 100%;
  }
  .tarin_bottm_border {
    height: 10%;
    text-align: center;
    position: relative;
    width: 50%;
    p {
      width: 100%;
      position: absolute;
      border-radius: 3px;
      bottom: 0;
    }
  }
  .tarin_top_item_title {
    width: 100%;
    height: 15%;
    display: flex;
    padding-top: 10px;
    i {
      margin-left: 10px;
      width: 25px;
      height: 49px;
      background: url("../../../assets/public/0235255.png");
    }
    .orange {
      background: url("../../../assets/public/25113894.png");
    }
    .yellow {
      background: url("../../../assets/public/25518099.png");
    }
    .blue {
      background: url("../../../assets/public/34163255.png");
    }
    span {
      font-size: 17px;
      margin-left: 10px;
      font-weight: bold;
    }
  }
  //结束
  .exam_analysis {
    width: 92%;
    height: 88%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 1% 0;
    .exam_left {
      width: 49%;
      height: 100%;
      .exam_left_top {
        width: 100%;
        height: 50%;
        display: flex;
        text-align: center;
        .state_none {
          width: 50%;
          height: 40%;
          top: 50%;
          left: 50%;
          margin-left: -25%;
          margin-top: -20%;
          position: absolute;
          display: flex;
          flex-direction: column;
          img {
            max-height: 100%;
            max-width: 100%;
          }
          span {
            color: rgb(111, 147, 251);
            font-size: 1.2em;
            font-weight: bold;
          }
        }
        .exam_left_top_peopleTotal {
          width: 48%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .exam_left_top_peopleTotal_main {
            width: 100%;
            height: 75%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .exam_left_top_averageTime {
          margin-left: 4%;
          width: 48%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .exam_left_top_averageTime_main {
            width: 100%;
            height: 75%;
            span {
              line-height: 208px;
              font-weight: bold;
              font-size: 80px;
              color: rgb(251, 138, 94);
            }
          }
        }
      }
      .exam_left_bottom {
        margin-top: 3%;
        width: 100%;
        height: 46%;
        text-align: center;
        .exam_left_bottom_main {
          margin: 3% auto;
          width: 90%;
          height: 60%;
          display: flex;
          .exam_left_bottom_main_title {
            width: 8%;
            height: 100%;
            display: flex;
            flex-direction: column;
            span {
              display: flex;
              align-items: center;
              flex: 1;
            }
          }
          .exam_left_bottom_main_block {
            width: 92%;
            height: 100%;
            border: 1px solid rgb(111, 147, 251);
            border-top: none;
            border-right: none;
            display: flex;
            flex-direction: column;
            .exam_left_bottom_main_block_item {
              display: flex;
              flex: 1;
              align-items: center;
              img {
                height: 25px;
                border-top-right-radius: 7px;
                border-bottom-right-radius: 7px;
                margin-right: 10px;
              }
              span {
                display: flex;
                align-items: center;
              }
            }
          }
        }
        .state_none {
          width: 34%;
          height: 66%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          img {
            max-height: 100%;
            max-width: 100%;
          }
          span {
            color: rgb(111, 147, 251);
            font-size: 1.2em;
            font-weight: bold;
          }
        }
      }
    }
    .exam_right {
      width: 49%;
      height: 100%;
      text-align: center;
      position: relative;
      .exam_right_main {
        width: 80%;
        height: 80%;
        margin: 0 auto;
        .exam_right_main_block {
          width: 100%;
          height: 90%;
          border: 1px solid rgb(111, 147, 251);
          border-top: none;
          border-right: none;
          display: flex;
          align-items: flex-end;
          .exam_right_main_block_item {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              height: 0px;
              width: 25px;
              border-top-right-radius: 7px;
              border-top-left-radius: 7px;
            }
          }
        }
        .exam_right_main_title {
          width: 100%;
          height: 10%;
          display: flex;
          align-items: center;
          span {
            flex: 1;
          }
        }
      }
      .exam_right_bottom {
        width: 80%;
        height: 10%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .tarin_bottm_border {
          position: absolute;
          bottom: 5px;
          height: 50%;
        }
      }
      .state_none {
        width: 34%;
        height: 30%;
        left: 50%;
        top: 50%;
        margin-left: -17%;
        margin-top: -15%;
        position: absolute;
        display: flex;
        flex-direction: column;
        img {
          max-height: 100%;
          max-width: 100%;
        }
        span {
          color: rgb(111, 147, 251);
          font-size: 1.2em;
          font-weight: bold;
        }
      }
    }
  }
}
</style>