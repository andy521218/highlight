<template>
  <div class="disease_correct">
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 10%; padding-left: 10px">正确答案</span>
        <span style="width: 10%"></span>
        <span style="width: 2%"></span>
        <div
          class="downMenu"
          style="width: 35%; text-align: center; padding-left: 0"
        >
          <span @click="downMenu_show = true" style="cursor: default">{{
            title
          }}</span>
          <i-con
            type="md-arrow-dropdown"
            size="30"
            @click="downMenu_show = true"
          />
          <div class="downMenu_item" v-show="downMenu_show" style="left: 238px">
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
        <span style="width: 15%; text-align: center" v-show="title != '问'"
          >正确答案</span
        >
        <span style="width: 15%; text-align: center" v-show="title != '问'"
          >我的答案</span
        >
        <span
          style="width: 15%; text-align: center"
          v-show="title == '问'"
        ></span>
        <span
          style="width: 15%; text-align: center"
          v-show="title == '问'"
        ></span>
        <span style="width: 15%; text-align: center">是否为依据</span>
      </li>
    </ul>
    <!-- 病名 -->
    <div class="layout_flex scrollbar" v-show="mainId == '1'">
      <ul class="study_main_left">
        <li>
          <span style="width: 163px; padding-left: 10px">{{
            showData.diseaseName
          }}</span>
          <span style="width: 163px">{{ showData.answer }}</span>
        
        </li>
      </ul>
      <!-- 问诊 -->
      <ul class="study_main_right" v-show="title == '问'">
        <li v-for="(item, index) in askData" :key="index">
          <div class="disease_ask_item" style="padding: 5px 10px">
            <span>问: {{ item.question }}</span>
            <span>答: {{ item.answer }}</span>
          </div>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right" v-show="title == '望'">
        <li v-for="(item, index) in watchData" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.correctAnswer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right" v-show="title == '闻'">
        <li v-for="(item, index) in listenData" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.correctAnswer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 切诊 -->
      <ul class="study_main_right" v-show="title == '切'">
        <li v-show="pulseData.id">
          <span style="width: 561px; text-align: center">脉诊</span>
          <span style="width: 240px; text-align: center"
            >{{ pulseData.correctAnswer }}
          </span>
          <span style="width: 240px; text-align: center">{{
            pulseData.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
        <li v-for="(item, index) in feelData" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.correctAnswer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
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
          <span style="width: 163px; padding-left: 10px">{{ item.name }}</span>
          <!-- <span style="width: 163px">{{ item.answer }}</span> -->
          <span style="width: 10%" class="options"> </span>
        </li>
      </ul>
      <!-- 问诊 -->
      <ul class="study_main_right" v-show="title == '问'">
        <li v-for="(item, index) in diseaseAsk" :key="index">
          <div class="disease_ask_item" style="padding: 5px 10px">
            <span>问: {{ item.question }}</span>
            <span>答: {{ item.answer }}</span>
          </div>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 望诊 -->
      <ul class="study_main_right" v-show="title == '望'">
        <li v-for="(item, index) in diseaseWatch" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.correctAnswer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>
      <!-- 闻诊 -->
      <ul class="study_main_right" v-show="title == '闻'">
        <li v-for="(item, index) in diseaseListen" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.correctAnswer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
      </ul>

      <!-- 切诊 -->
      <ul class="study_main_right" v-show="title == '切'">
        <li v-show="diseasePulse.id">
          <span style="width: 561px; text-align: center">脉诊</span>
          <span style="width: 240px; text-align: center"
            >{{ diseasePulse.correctAnswer }}
          </span>
          <span style="width: 240px; text-align: center">{{
            diseasePulse.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
            <i class="right"></i>
          </span>
        </li>
        <li v-for="(item, index) in diseaseFeel" :key="index">
          <span style="width: 561px; text-align: center">{{ item.name }}</span>
          <span style="width: 240px; text-align: center">
            {{ item.correctAnswer }}</span
          >
          <span style="width: 240px; text-align: center">{{
            item.answer
          }}</span>
          <span style="width: 240px; text-align: center" class="options">
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
    this.userId = localStorage.getItem("examId");
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