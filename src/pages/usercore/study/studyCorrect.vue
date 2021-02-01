<template>
  <div class="disease_correct">
    <ul class="study_main">
      <li class="study_item_title">
        <div class="study_item_title_left">
          <span>正确答案</span>
          <span>我的答案</span>
        </div>
        <div class="study_item_title_right">
          <div class="downMenu">
            <span @click="downMenu_show = true" style="cursor: default">{{
              title
            }}</span>
            <i-con
              type="md-arrow-dropdown"
              size="30"
              @click="downMenu_show = true"
            />
            <div class="downMenu_item" v-show="downMenu_show">
              <ul>
                <li
                  v-for="(item, index) in tabData"
                  :key="index"
                  :class="{ active: downMenu_active == item.id }"
                  @click="switchIteM(item)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <span style="width: 30%" v-show="title != '问'">正确答案</span>
          <span style="width: 30%" v-show="title != '问'">我的答案</span>
          <span style="width: 30%" v-show="title == '问'"></span>
          <span style="width: 30%" v-show="title == '问'"></span>
          <span style="width: 10%; text-align: center">是否为依据</span>
        </div>
      </li>
    </ul>
    <!-- 病名 -->
    <div class="layout_flex scrollbar" v-show="mainId == '1'">
      <ul class="study_main_left">
        <li>
          <span>{{ showData.diseaseName }}</span>
          <span>{{ showData.answer }}</span>
        </li>
      </ul>
      <!-- 问诊 -->
      <ul class="study_main_right" v-show="title == '问'">
        <li v-for="(item, index) in askData" :key="index">
          <div class="disease_ask_item" style="padding: 5px 10px">
            <span>问: {{ item.question }}</span>
            <span>答: {{ item.answer }}</span>
          </div>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right special" v-show="title == '望'">
        <li v-for="(item, index) in watchData" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right special" v-show="title == '闻'">
        <li v-for="(item, index) in listenData" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 切诊 -->
      <ul class="study_main_right special" v-show="title == '切'">
        <li v-show="pulseData.id">
          <span>脉诊</span>
          <span>{{ pulseData.correctAnswer }} </span>
          <span>{{ pulseData.answer }}</span>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
        <li v-for="(item, index) in feelData" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span
            >class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
    </div>

    <!-- 病症 -->
    <div class="layout_flex scrollbar" v-show="mainId == '2'">
      <ul class="study_main_left">
        <li
          v-for="(item, index) in showData.diseases"
          :key="index"
          @click="seeDiseaseItem(item)"
        >
          <span>{{ item.name }}</span>
          <!-- <span style="width: 163px">{{ item.answer }}</span> -->
          <span class="options"> </span>
        </li>
      </ul>
      <!-- 问诊 -->
      <ul class="study_main_right" v-show="title == '问'">
        <li v-for="(item, index) in diseaseAsk" :key="index">
          <div class="disease_ask_item" style="padding: 5px 10px">
            <span>问: {{ item.question }}</span>
            <span>答: {{ item.answer }}</span>
          </div>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right special" v-show="title == '望'">
        <li v-for="(item, index) in diseaseWatch" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right special" v-show="title == '闻'">
        <li v-for="(item, index) in diseaseListen" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>

      <!-- 切诊 -->
      <ul class="study_main_right special" v-show="title == '切'">
        <li v-show="diseasePulse.id">
          <span>脉诊</span>
          <span>{{ diseasePulse.correctAnswer }} </span>
          <span>{{ diseasePulse.answer }}</span>
          <span class="options">
            <i class="right"></i>
          </span>
        </li>
        <li v-for="(item, index) in diseaseFeel" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span s class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "study-correct",
  props: ["tabData", "mainId"],
  computed: {
    ...mapState(["examId"]),
  },
  data() {
    return {
      caseId: "",
      examNo: "",
      showData: {},
      title: "问",
      downMenu_show: false,
      downMenu_active: "1",
      askData: [],
      watchData: [],
      listenData: [],
      pulseData: {},
      feelData: [],
      diseaseAsk: [],
      diseaseWatch: [],
      diseaseListen: [],
      diseasePulse: {},
      diseaseFeel: [],
      correctData: {},
      ask: [],
      watch: [],
      listen: [],
      press: [],
      pulse: [],
      userId: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.userId = localStorage.getItem("caseUserId");
    this.getcorrect();
  },
  methods: {
    switchIteM(item) {
      this.downMenu_active = item.id;
      this.downMenu_show = false;
      this.title = item.name;
    },
    getcorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.correctData = res.data;
          this.showData = res.data;
          let ask, watch, listen, feel;
          // 病名
          try {
            res.data.diseaseNameIssues.forEach((item) => {
              if (item.stageId == "1") {
                ask = item.issueIds;
              }
              if (item.stageId == "2") {
                watch = item.issueIds;
              }
              if (item.stageId == "3") {
                listen = item.issueIds;
              }
              if (item.stageId == "4") {
                feel = item.issueIds;
              }
            });
          } catch (error) {
            error;
          }
          // 问诊

          this.axios
            .get(`/meta/ask/module`, {
              params: {
                caseId: this.caseId,
              },
            })
            .then((res) => {
              let asklist = [];
              for (let i = 0; i < res.data.length; i++) {
                asklist.push(
                  new Promise((resolve) => {
                    this.axios
                      .get(`/${this.examNo}/${this.caseId}/correctasked`, {
                        params: {
                          typeId: res.data[i].moduleId,
                          userId: this.userId,
                        },
                      })
                      .then((res) => {
                        return resolve(res.data);
                      });
                  })
                );
              }
              Promise.all(asklist).then((res) => {
                this.ask = [].concat(...res);
                try {
                  this.ask.forEach((item) => {
                    ask.forEach((ele) => {
                      if (ele == item.id) {
                        this.askData.push(item);
                      }
                    });
                  });
                } catch (error) {
                  error;
                }
              });
            });

          // 望诊
          for (let i = 0; i < 3; i++) {
            this.axios
              .get(`/${this.examNo}/${this.caseId}/watched/${i}`, {
                params: {
                  userId: this.userId,
                },
              })
              .then((res) => {
                try {
                  res.data.forEach((item) => {
                    this.watch.push(item);
                    watch.forEach((ele) => {
                      if (item.id == ele) {
                        this.watchData.push(item);
                      }
                    });
                  });
                } catch (error) {
                  error;
                }
              });
          }

          // 闻诊
          this.axios
            .get(`/${this.examNo}/${this.caseId}/listened`, {
              params: {
                userId: this.userId,
              },
            })
            .then((res) => {
              this.listen = res.data;
              try {
                res.data.forEach((item) => {
                  listen.forEach((ele) => {
                    if (item.id == ele) {
                      this.listenData.push(item);
                    }
                  });
                });
              } catch (error) {
                error;
              }
            });
          //获取切诊
          this.axios
            .get(`/${this.examNo}/${this.caseId}/press`, {
              params: {
                userId: this.userId,
              },
            })
            .then((res) => {
              this.press = res.data;
              try {
                feel.forEach((ele) => {
                  res.data.forEach((item) => {
                    if (ele == item.id) {
                      this.feelData.push(item);
                    }
                  });
                });
              } catch (error) {
                error;
              }
            });
          // 脉诊
          this.axios
            .get(`/${this.examNo}/${this.caseId}/pulse`, {
              params: {
                userId: this.userId,
              },
            })
            .then((res) => {
              this.pulse = res.data;
              try {
                feel.forEach((item) => {
                  if (res.data.id == item) {
                    this.pulseData = res.data;
                  }
                });
              } catch (error) {
                error;
              }
            });
        });
    },
    seeDiseaseItem(item) {
      this.diseaseAsk = [];
      this.diseaseWatch = [];
      this.diseaseListen = [];
      this.diseaseFeel = [];
      let issues = item.issues;
      let ask, watch, listen, feel;
      try {
        issues.forEach((item) => {
          if (item.stageId == "1") {
            ask = item.issueIds;
          }
          if (item.stageId == "2") {
            watch = item.issueIds;
          }
          if (item.stageId == "3") {
            listen = item.issueIds;
          }
          if (item.stageId == "4") {
            feel = item.issueIds;
          }
        });
      } catch (error) {
        error;
      }

      try {
        this.ask.forEach((ele) => {
          ask.forEach((item) => {
            if (ele.id == item) {
              this.diseaseAsk.push(ele);
            }
          });
        });
      } catch (error) {
        error;
      }

      try {
        this.watch.forEach((ele) => {
          watch.forEach((item) => {
            if (ele.id == item) {
              this.diseaseWatch.push(ele);
            }
          });
        });
      } catch (error) {
        error;
      }

      try {
        this.listen.forEach((ele) => {
          listen.forEach((item) => {
            if (ele.id == item) {
              this.diseaseListen.push(ele);
            }
          });
        });
      } catch (error) {
        error;
      }
      try {
        feel.forEach((ele) => {
          if (this.pulse.id == ele) {
            this.diseasePulse = this.pulse;
          }
        });
        feel.forEach((ele) => {
          this.press.forEach((item) => {
            if (item.id == ele) {
              this.diseaseFeel.push(item);
            }
          });
        });
      } catch (error) {
        error;
      }
    },
  },
  watch: {
    mainId: function () {
      this.seeDiseaseItem(this.showData.diseases[0]);
    },
    examId: function () {
      this.caseId = this.examId;
      this.askData = [];
      this.watchData = [];
      this.listenData = [];
      this.pulseData = {};
      this.feelData = [];
      this.correctData = {};
      this.ask = [];
      this.watch = [];
      this.press = [];
      this.pulse = [];
      this.$parent.typeId = "1";
      this.$parent.mainId = "1";
      this.getcorrect();
      this.seeDiseaseItem(this.showData.diseases[0]);
    },
  },
};
</script>

<style lang="scss">
.disease_correct {
  .layout_flex {
    display: flex;
    width: 100%;
    height: 78%;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      min-height: 40px;
    }
    li:nth-child(even) {
      background: rgb(240, 246, 255);
    }
    li:hover {
      background-color: rgb(111, 147, 251, 0.62);
    }
    .study_main_left {
      width: 23%;
      height: 100%;
      border-right: rgb(111, 147, 251) 1px solid;
      li {
        display: flex;
        span {
          text-align: center;
          width: 45%;
        }
        .options {
          width: 10%;
        }
      }
    }
    .study_main_right {
      height: 100%;
      width: 77%;
      overflow-y: auto;
      .disease_ask_item {
        display: flex;
        flex-direction: column;
        width: 90%;
      }
      .options {
        width: 10%;
      }
      li {
        display: flex;
      }
    }
    .special {
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
          width: 30%;
        }
        span:first-child {
          padding-left: 1%;
        }
      }
    }
  }
}
</style>