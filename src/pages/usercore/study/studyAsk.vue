<template>
  <div class="study_ask" style="z-index: 99999">
    <div class="study_title" style="justify-content: space-between">
      <div class="study_title_left">
        <span>问诊</span>
        <p v-show="scoreData.askSortScore == '0'">包含顺序分5分</p>
        <p v-show="scoreData.askSortScore == '5'">
          因未按照正确顺序进行问诊,扣除顺序分5分
        </p>
      </div>
      <div class="study_title_right" @click="getcoreectasked()">
        <i-switch v-model="correct"></i-switch>
        <span>显示正确答案</span>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
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
                :class="{ active: downMenu_active == '总问题' }"
                @click="switchIteM('总问题')"
              >
                总问题
              </li>
              <li
                v-for="(item, index) in tabData"
                :key="index"
                :class="{ active: downMenu_active == item.moduleId }"
                @click="switchIteM(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <span style="width: 10%; text-align: center">正确答案</span>
        <span style="width: 10%; text-align: center">我的答案</span>
      </li>
    </ul>
    <div class="scrollbar">
      <!-- 我的答案 -->
      <ul class="study_main_item" v-show="!correct">
        <li
          v-for="(item, index) in askItemData"
          :key="index"
          style="padding-left: 10px"
        >
          <div class="ask_item">
            <i
              v-if="item.typeId == 1"
              :style="{ background: select[item.colorId].color }"
            ></i>
            <div class="ask_column">
              <span>问: {{ item.question }}</span>
              <span>答: {{ item.answer }}</span>
            </div>
          </div>
          <span style="width: 10%; text-align: center"></span>
          <span style="width: 10%" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 正确答案 -->
      <ul class="study_main_item" v-if="correct && title == '总问题'">
        <li
          v-for="(item, index) in correctaskked"
          :key="index"
          style="padding-left: 10px"
        >
          <div class="ask_item">
            <i
              v-show="item.typeId == 1"
              :style="{ background: select[item.colorId].color }"
            ></i>
            <div class="ask_column">
              <span>问: {{ item.question }}</span>
              <span>答: {{ item.answer }}</span>
            </div>
          </div>
          <span style="width: 10%" class="options"><i class="right"></i> </span>
          <span style="width: 10%; text-align: center"></span>
        </li>
      </ul>
      <ul class="study_main_item" v-show="correct && title != '总问题'">
        <li
          v-for="(item, index) in correctaskked"
          :key="index"
          v-show="item.typeId == askId"
        >
          <div class="ask_item">
            <i
              v-show="item.typeId == 1"
              :style="{ background: select[item.colorId].color }"
            ></i>
            <div class="ask_column">
              <span>问: {{ item.question }}</span>
              <span>答: {{ item.answer }}</span>
            </div>
          </div>
          <span style="width: 10%" class="options"><i class="right"></i> </span>
          <span style="width: 10%; text-align: center"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "study-ask",
  computed: {
    ...mapState(["examId"]),
  },
  data() {
    return {
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
      downMenu_show: false,
      downMenu_active: "总问题",
      title: "总问题",
      tabData: "",
      caseId: "",
      examNo: "",
      userId: "",
      askedData: {},
      askItemData: {},
      correctaskked: [],
      correct: false,
      askId: "",
      scoreData: "",
    };
  },
  mounted() {
    this.examNo = localStorage.getItem("examNo");
    this.caseId = localStorage.getItem("caseId");
    this.userId = localStorage.getItem("caseUserId");
    this.getTabdata();
    this.getAskdata();
    this.getscore();
  },
  methods: {
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
    getTabdata() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          this.tabData = res.data;
        });
    },
    getAskdata() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/asked`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.askedData = res.data;
          this.askItemData = res.data;
        });
    },
    getcoreectasked() {
      if (!this.correct) return;
      let asklist = [];
      for (let i = 0; i < this.tabData.length; i++) {
        asklist.push(
          new Promise((resolve) => {
            this.axios
              .get(`/${this.examNo}/${this.caseId}/correctasked`, {
                params: {
                  typeId: this.tabData[i].moduleId,
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
        this.correctaskked = [].concat(...res);
      });
    },
    switchIteM(item) {
      this.downMenu_active = item.moduleId;
      this.downMenu_show = false;
      if (item == "总问题") {
        this.title = "总问题";
        this.downMenu_active = "总问题";
        this.askItemData = this.askedData;
        return;
      }
      this.title = item.name;
      this.askItemData = [];
      this.askId = item.moduleId;
      this.askedData.forEach((ele) => {
        if (ele.typeId == item.moduleId) {
          this.askItemData.push(ele);
        }
      });
    },
  },
};
</script>
