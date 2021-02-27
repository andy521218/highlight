<template>
  <div class="case_cut">
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
      <div class="case_left">
        <case-header ref="header"></case-header>
        <main>
          <ul class="main_tab">
            <li
              v-for="(item, index) in tab"
              :key="index"
              class="item_title"
              @click="container(index)"
            >
              {{ item }}
              <div :class="{ active: typeId == index }"></div>
            </li>
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar_">
              <ul class="content_scrollbar_pulse" v-show="typeId == 0">
                <li style="border: none">
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li v-for="(item, index) in pulseData" :key="index">
                  <div
                    class="item_cont"
                    v-for="(i, index) in item"
                    :key="index"
                  >
                    <div class="custom_radio">
                      <span
                        class="custom_text"
                        :class="{ active_radio: i == answer }"
                      ></span>
                      <input
                        type="radio"
                        class="custom_none"
                        v-model="answer"
                        :value="i"
                        @change="putPulse"
                      />
                    </div>
                    <p class="item_cont_title">
                      {{ i }}
                    </p>
                  </div>
                </li>
              </ul>
              <div class="normal_edit" v-if="normal_edit_show && typeId == 1">
                按诊的结果均为正常
                <p></p>
              </div>
              <ul
                class="content_scrollbar_press"
                v-show="typeId == 1 && normal_edit_show == false"
              >
                <li>
                  <p>请先在右图中进行按诊并选出正确选项:</p>
                </li>
                <li v-for="(item, index) in pressItemData" :key="index">
                  <span>{{ item.name }}</span>
                  <span>{{ item.answer }}</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div class="case_right" v-show="typeId == 0">
        <span class="case_title_name">患者{{ name }}正在接受脉诊:</span>
        <img :src="imgsUrl" alt="" class="seeimg" />
        <p class="seedesc">{{ imgDesc }}</p>
      </div>
      <div
        class="case_right"
        style="text-align: center"
        v-if="typeId == 1 && sex == 'false'"
      >
        <span class="case_title_name">患者{{ name }}正在接受按诊:</span>
        <img
          src="../../../assets/public/girl1.png"
          alt=""
          class="follow"
          usemap="#mapgirl"
          style="margin-top: 8%; width: 85.7%; height: 77.2%"
          ref="mapGirl"
          @load="initCoords"
        />
        <map name="mapgirl">
          <area
            shape="rect"
            v-for="(item, index) in mapArea"
            :key="index"
            :coords="item.area"
            alt="右胸"
            style="cursor: pointer"
            @click="pressAnswer(item.name)"
          />
        </map>
      </div>

      <div
        class="case_right"
        style="text-align: center"
        v-if="typeId == 1 && sex == 'true'"
      >
        <span class="case_title_name">患者{{ name }}正在接受按诊:</span>
        <div>
          <img
            src="../../../assets/public/boy1.png"
            alt=""
            class="follow"
            usemap="#mapboy"
            ref="mapBoy"
            style="margin-top: 8%; width: 85.7%; height: 77.2%"
            @load="initCoords"
          />
          <map name="mapboy">
            <area
              shape="rect"
              v-for="(item, index) in mapArea"
              :key="index"
              :coords="item.area"
              alt="右胸"
              style="cursor: pointer"
              @click="pressAnswer(item.name)"
            />
          </map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import caseOption from "../../teacher/edit/caseOption";
import caseHeader from "../../teacher/edit/caseHeader";
export default {
  name: "user-look",
  components: {
    caseOption,
    caseHeader,
  },
  data() {
    return {
      tab: ["脉诊", "按诊"],
      examNo: "",
      typeId: "0",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
      optionShow: false,
      normal_edit_show: false,
      answer: "",
      imgsUrl: "",
      imgDesc: "",
      caseId: "",
      pressItemData: [],
      pressData: [],
      pulseData: [],
      option: {},
      name: "",
      sex: false,
      mapArea: [],
      timer: "",
    };
  },
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("pressItemData", JSON.stringify(this.pressItemData));
    });
  },
  mounted() {
    window.onresize = () => {
      if (this.timer) return;
      this.timer = setTimeout(() => {
        this.initCoords();
        this.timer = "";
      }, 1000);
    };
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.name = localStorage.getItem("name");
    this.sex = localStorage.getItem("sex");
    this.getpressData();
    this.getpulseData();
    let arr = JSON.parse(localStorage.getItem("pressItemData"));
    if (arr == null || arr.length == "0") {
      return;
    }
    this.pressItemData = arr;
  },
  methods: {
    initCoords() {
      if (this.typeId !== 1) return;
      if (this.sex == "false") {
        let width = this.$refs.mapGirl.offsetWidth;
        let height = this.$refs.mapGirl.offsetHeight;
        this.girl(width, height);
      } else {
        let width = this.$refs.mapBoy.offsetWidth;
        let height = this.$refs.mapBoy.offsetHeight;
        this.boy(width, height);
      }
    },
    girl(width, height) {
      let arr = [];
      arr[0] = {
        name: "右胸",
        area:
          width * 0.432 +
          "," +
          height * 0.248 +
          "," +
          width * 0.488 +
          "," +
          height * 0.303,
      };
      arr[1] = {
        name: "胸膺",
        area:
          width * 0.49 +
          "," +
          height * 0.248 +
          "," +
          width * 0.526 +
          "," +
          height * 0.305,
      };
      arr[2] = {
        name: "左胸",
        area:
          width * 0.526 +
          "," +
          height * 0.247 +
          "," +
          width * 0.594 +
          "," +
          height * 0.303,
      };
      arr[3] = {
        name: "右胁肋",
        area:
          width * 0.432 +
          "," +
          height * 0.308 +
          "," +
          width * 0.494 +
          "," +
          height * 0.355,
      };
      arr[4] = {
        name: "心下",
        area:
          width * 0.494 +
          "," +
          height * 0.317 +
          "," +
          width * 0.556 +
          "," +
          height * 0.3333,
      };
      arr[5] = {
        name: "虚里",
        area:
          width * 0.544 +
          "," +
          height * 0.31 +
          "," +
          width * 0.584 +
          "," +
          height * 0.33,
      };
      arr[6] = {
        name: "左胁肋",
        area:
          width * 0.552 +
          "," +
          height * 0.33 +
          "," +
          width * 0.58 +
          "," +
          height * 0.355,
      };
      arr[7] = {
        name: "胃脘",
        area:
          width * 0.385 +
          "," +
          height * 0.3516 +
          "," +
          width * 0.596 +
          "," +
          height * 0.3833,
      };
      arr[8] = {
        name: "大腹",
        area:
          width * 0.468 +
          "," +
          height * 0.3916 +
          "," +
          width * 0.596 +
          "," +
          height * 0.4233,
      };
      arr[9] = {
        name: "右腹",
        area:
          width * 0.428 +
          "," +
          height * 0.42 +
          "," +
          width * 0.492 +
          "," +
          height * 0.47,
      };
      arr[10] = {
        name: "小腹",
        area:
          width * 0.49 +
          "," +
          height * 0.42 +
          "," +
          width * 0.546 +
          "," +
          height * 0.4683,
      };
      arr[11] = {
        name: "左腹",
        area:
          width * 0.546 +
          "," +
          height * 0.42 +
          "," +
          width * 0.61 +
          "," +
          height * 0.4683,
      };
      arr[12] = {
        name: "下肢",
        area:
          width * 0.404 +
          "," +
          height * 0.7966 +
          "," +
          width * 0.454 +
          "," +
          height * 0.92,
      };
      arr[13] = {
        name: "足背",
        area:
          width * 0.404 +
          "," +
          height * 0.955 +
          "," +
          width * 0.452 +
          "," +
          height * 0.983,
      };
      arr[14] = {
        name: "皮肤",
        area:
          width * 0.48 +
          "," +
          height * 0.187 +
          "," +
          width * 0.593 +
          "," +
          height * 0.224,
      };
      arr.forEach((item) => this.mapArea.push(item));
    },
    boy(width, height) {
      let arr = [];
      arr[0] = {
        name: "右胸",
        area:
          width * 0.404 +
          "," +
          height * 0.2016 +
          "," +
          width * 0.583 +
          "," +
          height * 0.224,
      };
      arr[1] = {
        name: "胸膺",
        area:
          width * 0.492 +
          "," +
          height * 0.2066 +
          "," +
          width * 0.54 +
          "," +
          height * 0.28,
      };
      arr[2] = {
        name: "左胸",
        area:
          width * 0.54 +
          "," +
          height * 0.205 +
          "," +
          width * 0.606 +
          "," +
          height * 0.2816,
      };
      arr[3] = {
        name: "右胁肋",
        area:
          width * 0.414 +
          "," +
          height * 0.2916 +
          "," +
          width * 0.484 +
          "," +
          height * 0.35,
      };
      arr[4] = {
        name: "心下",
        area:
          width * 0.484 +
          "," +
          height * 0.3033 +
          "," +
          width * 0.566 +
          "," +
          height * 0.3416,
      };
      arr[5] = {
        name: "虚里",
        area:
          width * 0.566 +
          "," +
          height * 0.2916 +
          "," +
          width * 0.618 +
          "," +
          height * 0.32,
      };
      arr[6] = {
        name: "左胁肋",
        area:
          width * 0.586 +
          "," +
          height * 0.33 +
          "," +
          width * 0.646 +
          "," +
          height * 0.3566,
      };
      arr[7] = {
        name: "胃脘",
        area:
          width * 0.446 +
          "," +
          height * 0.3516 +
          "," +
          width * 0.586 +
          "," +
          height * 0.3983,
      };
      arr[8] = {
        name: "大腹",
        area:
          width * 0.4 +
          "," +
          height * 0.4083 +
          "," +
          width * 0.62 +
          "," +
          height * 0.4516,
      };
      arr[9] = {
        name: "右腹",
        area:
          width * 0.4 +
          "," +
          height * 0.455 +
          "," +
          width * 0.476 +
          "," +
          height * 0.5216,
      };
      arr[10] = {
        name: "小腹",
        area:
          width * 0.476 +
          "," +
          height * 0.455 +
          "," +
          width * 0.55 +
          "," +
          height * 0.5216,
      };
      arr[11] = {
        name: "左腹",
        area:
          width * 0.554 +
          "," +
          height * 0.455 +
          "," +
          width * 0.604 +
          "," +
          height * 0.5216,
      };
      arr[12] = {
        name: "下肢",
        area:
          width * 0.43 +
          "," +
          height * 0.8133 +
          "," +
          width * 0.472 +
          "," +
          height * 0.9216,
      };
      arr[13] = {
        name: "足背",
        area:
          width * 0.418 +
          "," +
          height * 0.9516 +
          "," +
          width * 0.472 +
          "," +
          height * 0.98,
      };
      arr[14] = {
        name: "皮肤",
        area:
          width * 0.675 +
          "," +
          height * 0.3792 +
          "," +
          width * 0.74 +
          "," +
          height * 0.488,
      };
      arr.forEach((item) => this.mapArea.push(item));
    },
    container(i) {
      this.typeId = i;
    },
    upload() {
      this.route = this.$refs.file.value;
    },
    openCont() {
      this.edit_cont = true;
    },
    opneTips() {
      this.tips = true;
    },
    openDele() {
      this.allShow = true;
    },
    editPress(e) {
      this.optionShow = true;
      this.option = e;
    },
    editcaseData() {
      this.axios
        .put(
          `/case/manage/${this.caseId}/feel/press/${
            this.option.id
          }?${this.qs.stringify({
            answer: this.$children[1].radioData,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.getpressData();
          }
        });
    },
    getpressData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/press`)
        .then((res) => {
          if (res.data.list.length == 0) {
            return (this.normal_edit_show = true);
          }
          this.pressData = res.data.list;
        });
    },
    getpulseData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/pulse`)
        .then((res) => {
          this.pulseData = [];
          let arr = [];
          let flag = false;
          for (let i = 0; i < res.data.options.length; i++) {
            flag = false;
            arr.push(res.data.options[i]);
            if (i % 8 == "7") {
              this.pulseData.push(arr);
              arr = [];
              flag = true;
            }
          }
          if (!flag) {
            this.pulseData.push(arr);
          }
          if (/localhost/.test(res.data.picUrl)) {
            this.imgsUrl = res.data.picUrl.replace(
              /localhost/,
              "101.132.150.87"
            );
          } else {
            this.imgsUrl = this.$url + res.data.picUrl;
          }
          this.imgDesc = res.data.description;
          this.answer = res.data.answer;
        });
    },
    pressAnswer(name) {
      if (this.normal_edit_show) return;
      let length = this.pressItemData.length;
      let flag = false;
      if (length == 0) {
        this.check(name);
      } else {
        for (let i = 0; i < length; i++) {
          if (this.pressItemData[i].name == name) {
            flag = true;
            return this.$Message.error("重复查看");
          }
        }
        if (!flag) {
          this.check(name);
        }
      }
    },
    check(name) {
      let flag = false;
      this.pressData.forEach((item) => {
        if (item.name == name) {
          flag = true;
          this.axios.post(
            `/answer/${this.examNo}/${this.caseId}/feel/press/${item.id}`
          );
          return this.pressItemData.push(item);
        }
      });
      if (!flag) {
        let arr = {
          name: name,
          answer: "正常",
        };
        return this.pressItemData.push(arr);
      }
    },
    putPulse() {
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/feel/pulse`, {
          answer: this.answer,
        })
        .then((res) => {
          if (res.code == "000000") {
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("pressItemData", JSON.stringify(this.pressItemData));
    next();
  },
};
</script>
<style lang="scss">
.case_cut {
  width: 100%;
  height: 100%;
  .content_scrollbar_ {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .content_scrollbar_pulse {
      li {
        display: flex;
        width: 100%;
        border-bottom: rgb(212, 229, 255) 1px solid;
        height: 35px;
        align-items: center;
        padding-left: 15px;
        .item_cont {
          width: 12.5%;
          display: flex;
          align-items: center;
          .item_cont_title {
            margin-left: 5%;
          }
        }
      }
    }
    .content_scrollbar_press {
      width: 98%;
      margin-left: 1%;
      li:nth-child(1) {
        border: none;
        border-bottom: rgb(212, 229, 255) 1px solid;
      }
      li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 35px;
        border: 1px solid rgb(212, 229, 255);
        border-top: none;
        padding-left: 15px;
        span:nth-child(1) {
          width: 8%;
          text-align: center;
          height: 35px;
          line-height: 35px;
          border-right: 1px solid rgb(212, 229, 255);
        }
        span:last-child {
          padding-left: 15px;
        }
      }
    }
  }
  .case_right {
    text-align: center;
    img {
      max-width: 70%;
      margin-top: 3%;
    }
    .seedesc {
      text-align: left;
      margin-left: 20px;
      font-size: 1.2em;
    }
    &:hover {
      .follow {
        margin-top: 2% !important;
        transform: scale(1.3);
        transition: 0.5s;
      }
    }
  }
}
</style>