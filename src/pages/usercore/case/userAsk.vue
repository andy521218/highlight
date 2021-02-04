<template>
  <div class="user_ask">
    <div class="case_layout">
      <edit-module v-if="module_show"></edit-module>
      <div class="case_left">
        <case-header></case-header>
        <main>
          <ul class="main_tab">
            <li
              v-for="(item, index) in tabData"
              :key="index"
              class="item_title"
              @click="container(item)"
            >
              {{ item.name }}
              <div :class="{ active: typeId == item.moduleId }"></div>
            </li>
            <div class="voice">
              <i-switch
                true-color="rgb(111,147,251)"
                v-model="status"
              ></i-switch>
              <span>语 音</span>
            </div>
            <div class="tips" @click="module_show = true">
              <i></i><span>提示</span>
            </div>
          </ul>
          <div class="content scrollbar" style="height: 80%">
            <div class="content_scrollbar">
              <!-- 主诉 -->
              <ul v-show="'主诉' == typeName">
                <li v-for="(item, index) in askData0" :key="index">
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 现病史 -->
              <ul v-show="'现病史' == typeName">
                <li v-for="(item, index) in askData1" :key="index">
                  <div class="item_cont_two">
                    <i
                      v-if="typeId == 1"
                      :style="{ background: select[item.colorId].color }"
                    ></i>
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 既往史 -->
              <ul v-show="'既往史' == typeName">
                <li v-for="(item, index) in askData2" :key="index">
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 个人史 -->
              <ul v-show="'个人史' == typeName">
                <li v-for="(item, index) in askData3" :key="index">
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 婚育史 -->
              <ul v-show="'婚育史' == typeName">
                <li v-for="(item, index) in askData4" :key="index">
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 月经史 -->
              <ul v-show="'月经史' == typeName">
                <li v-for="(item, index) in askData5" :key="index">
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 家族史 -->
              <ul v-show="'家族史' == typeName">
                <li v-for="(item, index) in askData6" :key="index">
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit">
                    <span
                      @click="
                        asked(item);
                        item.typeId = 1;
                      "
                      v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="content_bottom">
            <input
              type="text"
              class="text_box"
              placeholder="请输入关键字.."
              v-model="keyword"
            />
            <button class="submit" @click="keyword = ''">清空</button>
          </div>
        </main>
      </div>
      <div class="case_right scrollbar">
        <ul ref="scroll">
          <li v-for="(item, index) in askedArr" :key="index">
            <div class="asked_right">
              <img
                src="../../../assets/public/45cd92c819e6690dbd64f5fb99c291f1.png"
                alt=""
              />
              <div class="asked_right_box">
                <i></i>
                <span>{{ item.question }}</span>
              </div>
            </div>
            <div class="asked_left">
              <img src="../../../assets/public/boy.png" v-if="!sex" alt="" />
              <img src="../../../assets/public/girl.png" v-else alt="" />
              <div class="asked_left_box">
                <i></i>
                <span>{{ item.answer }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="bdtts_div_id">
      <audio id="tts_autio_id" autoplay="autoplay">
        <source id="tts_source_id" :src="vido" type="audio/mpeg" />
        <embed id="tts_embed_id" height="0" width="0" src="" />
      </audio>
    </div>
  </div>
</template>

<script>
import caseHeader from "../../teacher/edit/caseHeader";
import editModule from "../../../components/edit/editModule";
export default {
  name: "user-ask",
  components: {
    caseHeader,
    editModule,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
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
      tabData: {},
      askData0: {},
      askData1: {},
      askData2: {},
      askData3: {},
      askData4: {},
      askData5: {},
      askData6: {},
      askedArr: [],
      vido: "",
      caseId: "",
      typeId: "0",
      typeName: "主诉",
      examNo: "",
      currentIndex: "",
      keyword: "",
      answerSong: "",
      questionSong: "",
      sex: "",
      status: "",
      module_show: false,
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.sex = localStorage.getItem("sex");
    let exam = localStorage.getItem("exam");
    if (exam) {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          this.tabData = res.data;
        });
    } else {
      this.getTabdata();
    }

    let arr = JSON.parse(localStorage.getItem("askedArr"));
    if (arr == null || arr.length == "0") {
      return;
    }
    this.askedArr = arr;
  },
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("askedArr", JSON.stringify(this.askedArr));
    });
  },
  methods: {
    getTabdata() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          this.tabData = res.data;
          for (let i = 0; i < res.data.length; i++) {
            this.getAskData(res.data[i].moduleId);
          }
        });
    },
    getAskData(typeId) {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/asks`, {
          params: {
            keyword: this.keyword,
            typeId: typeId,
            page: "1",
            size: "1000",
          },
        })
        .then((res) => {
          if (typeId == 0) {
            this.askData0 = res.data.rows;
          }
          switch (typeId) {
            case 1:
              this.askData1 = res.data.rows;
              break;
            case 2:
              this.askData2 = res.data.rows;
              break;
            case 3:
              this.askData3 = res.data.rows;
              break;
            case 4:
              this.askData4 = res.data.rows;
              break;
            case 5:
              this.askData5 = res.data.rows;
              break;
            case 6:
              this.askData6 = res.data.rows;
              break;
          }
        });
    },
    asked(item) {
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/ask/${item.id}`)
        .then(() => {
          setTimeout(() => {
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
          }, 300);
          this.askedArr.push(item);
        });
      if (!this.status) return;
      clearTimeout(this.questionSong);
      this.questionSong = setTimeout(() => {
        this.song(item.question);
      }, 500);

      let time = (item.question.length / 3.2) * 1000;
      clearTimeout(this.answerSong);
      this.answerSong = setTimeout(() => {
        this.song(item.answer);
      }, time + 1000);
    },
    song(text) {
      var ttsDiv = document.getElementById("bdtts_div_id");
      var ttsAudio = document.getElementById("tts_autio_id");
      var ttsText = text;

      ttsDiv.removeChild(ttsAudio);
      var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
      var sss =
        '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=4&text=' +
        ttsText +
        '" type="audio/mpeg">';
      var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
      var au2 = "</audio>";
      ttsDiv.innerHTML = au1 + sss + eee + au2;

      ttsAudio = document.getElementById("tts_autio_id");

      ttsAudio.play();
    },
    container(i) {
      this.typeId = i.moduleId;
      this.typeName = i.name;
    },
  },
  watch: {
    keyword: function () {
      let exam_flag = localStorage.getItem("exam");
      if (exam_flag) {
        if (!this.keyword) return;
      }
      this.getAskData(this.typeId);
    },
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("askedArr", JSON.stringify(this.askedArr));
    next();
  },
};
</script>

<style lang="scss">
.user_ask {
  width: 100%;
  height: 100%;
  .content_scrollbar {
    ul {
      li {
        .item_edit {
          span:first-child:hover {
            cursor: pointer;
          }
        }
        .ask_tips {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: url("../../../assets/public/askTips1.png") no-repeat
            center;
          background-size: 100% 100%;
        }
        .item_cont_two {
          display: flex;
          width: 95%;
          align-items: center;
        }
      }
    }
  }
  .case_right {
    width: 38.5%;
    height: 94.5%;
    margin-top: 1%;
    font-size: 1.1em;
    ul {
      width: 99%;
      height: 100%;
      overflow-y: auto;
      padding-top: 25px;
      li {
        width: 100%;
        margin-bottom: 10px;
        .asked_right,
        .asked_left {
          width: 96%;
          margin: 0 auto;
          display: flex;
          .asked_right_box,
          .asked_left_box {
            max-width: 250px;
            position: relative;
            border-radius: 5px;
            display: flex;
            align-items: center;
            padding: 10px 10px;
            span {
              min-width: 30px;
              max-width: 96%;
              word-break: break-word;
              color: rgb(0, 0, 0);
              margin-left: 10px;
            }
            i {
              display: block;
              width: 15px;
              height: 15px;
              position: absolute;
            }
          }
          img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
        .asked_right {
          flex-direction: row-reverse;
          .asked_right_box {
            margin-right: 30px;
            background: rgb(169, 197, 251);
            i {
              background: rgb(169, 197, 251);
              right: -5px;
              top: 12px;
              transform: rotate(-45deg);
            }
          }
        }
        .asked_left {
          margin-top: 15px;
          .asked_left_box {
            margin-left: 30px;
            background: rgb(255, 255, 255);
            i {
              background: rgb(255, 255, 255);
              left: -5px;
              top: 12px;
              transform: rotate(-45deg);
            }
          }
        }
      }
    }
  }
}
</style>