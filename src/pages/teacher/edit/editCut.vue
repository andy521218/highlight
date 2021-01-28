<template>
  <div class="case_cut">
    <div
      class="main_mask"
      style="height: 730px; width: 87.5%"
      v-show="optionShow"
    ></div>
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
      <div class="case_left">
        <case-header></case-header>
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
            <i class="tips" @click="opneTips"></i>
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar_">
              <ul class="content_scrollbar_pulse" v-show="typeId == 0">
                <li style="border: none">
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li v-for="(item, index) in pulseData.optinos" :key="index">
                  <div
                    class="item_cont"
                    v-for="(i, index) in item"
                    :key="index"
                  >
                    <div class="custom_radio">
                      <span
                        class="custom_text"
                        :class="{ active_radio: i.name == answer }"
                      ></span>
                      <input
                        type="radio"
                        class="custom_none"
                        v-model="answer"
                        :value="i.name"
                        @change="putPulse(i)"
                      />
                    </div>
                    <p class="item_cont_title" @click="seeImg(i)">
                      {{ i.name }}
                    </p>
                  </div>
                </li>
              </ul>
              <ul class="content_scrollbar_press" v-show="typeId == 1">
                <li>
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li
                  v-for="(item, index) in pressData.list"
                  :key="index"
                  @click="editPress(item)"
                >
                  <span>{{ item.name }}</span>
                  <span>{{ item.answer }}</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div class="case_right" v-show="typeId == 0">
        <div class="case_right_title">
          <span>脉诊图片</span>
        </div>
        <img :src="imgsUrl" v-if="imgsUrl" alt="" class="seeimg" />
        <p class="seedesc">{{ imgDesc }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import caseOption from "../edit/caseOption";
import caseHeader from "../edit/caseHeader";
export default {
  name: "edit-look",
  components: {
    caseOption,
    caseHeader,
  },
  data() {
    return {
      tab: ["脉诊", "按诊"],
      typeId: "0",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
      optionShow: false,
      answer: "",
      imgsUrl: "",
      imgDesc: "",
      caseId: "",
      pressData: {},
      pulseData: {},
      option: {},
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getpressData();
    this.getpulseData();
  },
  methods: {
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
    seeImg(e) {
      if (/localhost/.test(e.picUrl)) {
        this.imgsUrl = e.picUrl.replace(/localhost/, "101.132.150.87");
      } else {
        this.imgsUrl = this.$url + e.picUrl;
      }
      this.imgDesc = e.description;
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
      this.axios.get(`/case/manage/${this.caseId}/feel/press`).then((res) => {
        this.pressData = res.data;
      });
    },
    getpulseData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/pulse`).then((res) => {
        this.pulseData.optinos = [];
        let arr = [];
        let flag = false;
        for (let i = 0; i < res.data.optinos.length; i++) {
          flag = false;
          arr.push(res.data.optinos[i]);
          if (i % 8 == "7") {
            this.pulseData.optinos.push(arr);
            arr = [];
            flag = true;
          }
        }
        if (!flag) {
          this.pulseData.optinos.push(arr);
        }
        this.answer = res.data.answer;
        res.data.optinos.forEach((item) => {
          if (res.data.answer == item.name) {
            this.imgsUrl = this.$url + item.picUrl;
            this.imgDesc = item.description;
          }
        });
      });
    },
    putPulse(e) {
      this.http
        .put(
          `/case/manage/${this.caseId}/feel/pulse?${this.qs.stringify({
            answer: this.answer,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改答案成功!");
            if (/localhost/.test(e.picUrl)) {
              this.imgsUrl = e.picUrl.replace(/localhost/, "101.132.150.87");
            } else {
              this.imgsUrl = this.$url + e.picUrl;
            }
            this.imgDesc = e.description;
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
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
        border-bottom: rgb(111, 147, 251) 1px solid;
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
        border-bottom: 1px solid rgb(111, 147, 251);
      }
      li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 35px;
        border: 1px solid rgb(111, 147, 251);
        border-top: none;
        padding-left: 15px;
        span:nth-child(1) {
          width: 8%;
          text-align: center;
          height: 35px;
          line-height: 35px;
          border-right: 1px solid rgb(111, 147, 251);
        }
        span:last-child {
          padding-left: 15px;
        }
      }
    }
  }
  .content_scrollbar_press {
  }
  .case_right {
    text-align: center;
    img {
      width: 90%;
      height: 30%;
    }
    .seedesc {
      text-align: left;
      margin-left: 20px;
    }
  }
}
</style>