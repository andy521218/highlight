<template>
  <div class="study_disease">
    <div class="study_title">
      <div class="study_title_left">
        <span>辩证</span>
        <div v-for="(item, index) in list" :key="index" style="display: flex">
          <div class="custom_radio" style="margin: 0 10px">
            <span
              class="custom_text"
              :class="{ active_radio: typeId == item.id }"
            ></span>
            <input
              class="custom_none"
              type="radio"
              name="listen"
              :value="item.id"
              v-model="typeId"
              @click="seeDisease(item)"
            />
          </div>
          <label for="">{{ item.name }}</label>
        </div>
      </div>
      <div class="study_title_right">
        <i-switch v-model="correctshow"></i-switch>
        <p>正确答案</p>
      </div>
    </div>
    <ul class="study_main" v-show="!correctshow">
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
    <!-- 正确选项 -->
    <study-correct
      :tabData="tabData"
      :mainId="mainId"
      :watch="watch"
      v-show="correctshow"
    >
    </study-correct>
    <!-- 病名 -->
    <div
      class="layout_flex scrollbar"
      v-show="mainId == '1' && correctshow == false"
    >
      <ul class="study_main_left">
        <li>
          <span>{{ showData.correctAnswer }}</span>
          <span>{{ showData.answer }}</span>
          <span class="options">
            <i class="right" v-show="showData.correct"></i>
            <i class="error" v-show="!showData.correct"></i>
          </span>
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
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right special" v-show="title == '望'">
        <li v-for="(item, index) in watchData" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right special" v-show="title == '闻'">
        <li v-for="(item, index) in listenData" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 切诊 -->
      <ul class="study_main_right special" v-show="title == '切'">
        <li v-show="pulseData.id">
          <span>脉诊</span>
          <span>{{ pulseData.correctAnswer }} </span>
          <span>{{ pulseData.answer }}</span>
          <span class="options">
            <i class="right" v-show="pulseData.correct"></i>
            <i class="error" v-show="!pulseData.correct"></i
          ></span>
        </li>
        <li v-for="(item, index) in feelData" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>

    <!-- 病症 -->
    <div
      class="layout_flex scrollbar"
      v-show="mainId == '2' && correctshow == false"
    >
      <ul class="study_main_left">
        <li
          v-for="(item, index) in showData"
          :key="index"
          @click="seeDiseaseItem(item)"
        >
          <span>{{ item.correctAnswer }}</span>
          <span>{{ item.answer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i>
          </span>
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
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right special" v-show="title == '望'">
        <li v-for="(item, index) in diseaseWatch" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.answer }}</span>
          <span>{{ item.correctAnswer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right special" v-show="title == '闻'">
        <li v-for="(item, index) in diseaseListen" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.answer }}</span>
          <span>{{ item.correctAnswer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>

      <!-- 切诊 -->
      <ul class="study_main_right special" v-show="title == '切'">
        <li v-show="diseasePulse.id">
          <span>脉诊</span>
          <span>{{ diseasePulse.answer }} </span>
          <span>{{ diseasePulse.correctAnswer }}</span>
          <span class="options">
            <i class="right" v-show="diseasePulse.correct"></i>
            <i class="error" v-show="!diseasePulse.correct"></i
          ></span>
        </li>
        <li v-for="(item, index) in diseaseFeel" :key="index">
          <span>{{ item.name }}</span>
          <span> {{ item.answer }}</span>
          <span>{{ item.correctAnswer }}</span>
          <span class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import studyCorrect from "./studyCorrect";
import { mapState } from "vuex";
export default {
  name: "study-disease",
  components: {
    studyCorrect,
  },
  computed: {
    ...mapState(["examId"]),
  },
  data() {
    return {
      list: [
        { id: 1, name: "病名" },
        { id: 2, name: "证型" },
      ],
      select: [
        {
          title: "发病情况",
          color: "rgb(255,167,39)",
        },
        {
          title: "主症特点",
          color: "rgb(254,236,74)",
        },
        {
          title: "伴随症状及鉴别诊断症状",
          color: "rgb(115,213,114)",
        },
        {
          title: "诊疗过程",
          color: "rgb(36,169,245)",
        },
        {
          title: "发作情况",
          color: "rgb(150,117,206)",
        },
        {
          title: "刻下症",
          color: "rgb(0,230,255)",
        },
      ],
      caseId: "",
      examNo: "",
      tabData: [
        { id: 1, name: "问" },
        { id: 2, name: "望" },
        { id: 3, name: "闻" },
        { id: 4, name: "切" },
      ],
      typeId: "1",
      title: "问",
      downMenu_active: "1",
      mainId: "1",
      downMenu_show: false,
      diseaseData: [],
      diseaseNameData: [],
      showData: {},
      askData: [],
      watchData: [],
      listenData: [],
      ask: [],
      diseaseAsk: [],
      watch: [],
      diseaseWatch: [],
      listen: [],
      diseaseListen: [],
      press: [],
      pulse: {},
      pulseData: {},
      diseasePulse: {},
      feelData: [],
      diseaseFeel: [],
      correctshow: false,
      userId: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.userId = localStorage.getItem("caseUserId");
    this.getDiseasename();
  },
  methods: {
    //获取病名数据
    getDiseasename() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/diseasename`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.diseaseNameData = res.data;
          this.showData = res.data;
          let ask, watch, listen, feel;
          try {
            res.data.issueResults.forEach((item) => {
              if (item.stageId == "1") {
                ask = item.issues;
              }
              if (item.stageId == "2") {
                watch = item.issues;
              }
              if (item.stageId == "3") {
                listen = item.issues;
              }
              if (item.stageId == "4") {
                feel = item.issues;
              }
            });
          } catch (error) {
            error;
          }
          //获取问诊
          this.axios
            .get(`${this.examNo}/${this.caseId}/asked`, {
              params: {
                userId: this.userId,
              },
            })
            .then((res) => {
              this.ask = res.data;
              try {
                res.data.forEach((item) => {
                  ask.forEach((ele) => {
                    if (ele.issueId == item.id) {
                      item.correct = ele.correct;
                      this.askData.push(item);
                    }
                  });
                });
              } catch (error) {
                error;
              }
            });
          //获取望诊

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
                      if (item.id == ele.issueId) {
                        item.correct = ele.correct;
                        this.watchData.push(item);
                      }
                    });
                  });
                } catch (error) {
                  error;
                }
              });
          }
          //获取闻诊
          this.axios
            .get(`/${this.examNo}/${this.caseId}/listened`, {
              params: {
                userId: this.userId,
              },
            })
            .then((res) => {
              this.listen = res.data;
              try {
                res.data.forEach((ele) => {
                  listen.forEach((item) => {
                    if (item.issueId == ele.id) {
                      ele.correct = item.correct;
                      this.listenData.push(ele);
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
                    if (ele.issueId == item.id) {
                      ele.correct = item.correct;
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
                  if (res.data.id == item.issueId) {
                    this.pulseData = res.data;
                  }
                });
              } catch (error) {
                error;
              }
            });
        });
    },
    //获取证型数据
    getDisease() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/disease`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.diseaseData = res.data;
        });
    },
    //下拉框四诊
    switchIteM(item) {
      this.downMenu_active = item.id;
      this.downMenu_show = false;
      this.title = item.name;
    },
    // 切换右侧证型
    seeDiseaseItem(item) {
      this.diseaseAsk = [];
      this.diseaseWatch = [];
      this.diseaseListen = [];
      this.diseaseFeel = [];
      try {
        let issueResults = item.issueResults;
        let ask, watch, listen, feel;
        issueResults.forEach((item) => {
          if (item.stageId == "1") {
            ask = item.issues;
          }
          if (item.stageId == "2") {
            watch = item.issues;
          }
          if (item.stageId == "3") {
            listen = item.issues;
          }
          if (item.stageId == "4") {
            feel = item.issues;
          }
        });

        this.ask.forEach((ele) => {
          try {
            ask.forEach((item) => {
              if (ele.id == item.issueId) {
                ele.correct = item.correct;
                this.diseaseAsk.push(ele);
              }
            });
          } catch (error) {
            error;
          }
        });

        this.watch.forEach((ele) => {
          try {
            watch.forEach((item) => {
              if (ele.id == item.issueId) {
                ele.correct = item.correct;
                this.diseaseWatch.push(ele);
              }
            });
          } catch (error) {
            error;
          }
        });
        this.listen.forEach((ele) => {
          try {
            listen.forEach((item) => {
              if (ele.id == item.issueId) {
                this.diseaseListen.push(ele);
              }
            });
          } catch (error) {
            error;
          }
        });
        try {
          feel.forEach((ele) => {
            if (this.pulse.id == ele.issueId) {
              this.diseasePulse = this.pulse;
            }
          });
          this.press.forEach((ele) => {
            this.press((item) => {
              if (ele.id == item.issueId) {
                this.diseaseFeel.push(ele);
              }
            });
          });
        } catch (error) {
          error;
        }
      } catch (error) {
        error;
      }
    },
    //切换病名 证型
    seeDisease(item) {
      if (item.id == "1") {
        this.mainId = item.id;
        this.showData = this.diseaseNameData;
      }
      if (item.id == "2") {
        this.mainId = item.id;
        this.showData = this.diseaseData;
        this.seeDiseaseItem(this.diseaseData[0]);
      }
    },
  },
  watch: {
    press: function () {
      this.getDisease();
    },
    examId: function () {
      this.caseId = this.examId;
      this.askData = [];
      this.watchData = [];
      this.listenData = [];
      this.feelData = [];
      this.getDiseasename();
    },
  },
};
</script>

<style lang="scss">
.study_disease {
  .study_title {
    justify-content: space-between;
  }
  .study_item_title {
    justify-content: space-between;
    .study_item_title_left {
      width: 23%;
      display: flex;
      span {
        text-align: center;
        width: 45%;
      }
    }
    .study_item_title_right {
      width: 77%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .downMenu {
        width: 30%;
      }
    }
  }
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