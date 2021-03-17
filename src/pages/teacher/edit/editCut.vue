<template>
  <div class="case_cut">
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
         <div
      class="main_mask"
     
      v-show="optionShow"
    ></div>
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
                <li style="border: none" class="pulse_title">
                  <span>浮脉类</span>
                  <span>沉脉类</span>
                  <span>迟脉类</span>
                  <span>数脉类</span>
                  <span>虚脉类</span>
                  <span>实脉类</span>
                  <span>相兼脉类</span>
                </li>
                <li class="pulse_item">
                  <ul v-for="(item, index) in optinos" :key="index">
                    <li v-for="(i, index) in item" :key="index">
                      <div class="custom_radio" style="margin-right: 10px">
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
                    </li>
                  </ul>
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
        <img :src="imgsUrl" v-if="url" alt="" class="seeimg" />
       <img v-else src="../../../assets/public/f455781e08a0076236ca9f624e9dc26.png" alt="">
        <p class="seedesc" v-if="imgsUrl">{{ imgDesc }}</p>
      </div>
      <div class="case_right" style="text-align: center" v-if="typeId == 1">
        <img
          v-if="sex == 'false'"
          src="../../../assets/public/boy1.png"
          alt=""
          style="max-height: 100%; margin-top: 10%"
        />
        <img
          v-if="sex == 'true'"
          src="../../../assets/public/girl1.png"
          alt=""
          style="max-height: 100%; margin-top: 10%"
        />
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
      sex: false,
      optinos:{},
      url:''
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getpressData();
    this.getpulseData();
    this.sex = localStorage.getItem("sex");
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
      this.url=e.picUrl
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
        this.optinos = [];
        let arr = [],
          arr1 = [],
          arr2 = [],
          arr3 = [],
          arr4 = [],
          arr5 = [],
          arr6 = [];
        let data = res.data.optinos;
        for (let i = 0; i < res.data.optinos.length; i++) {
          if (/浮脉类/.test(data[i].name)) {
            let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr.push(data[i]);
          }
          if (/沉脉类/.test(data[i].name)) {
             let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr1.push(data[i]);
          }
          if (/迟脉类/.test(data[i].name)) {
            let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr2.push(data[i]);
          }
          if (/数脉类/.test(data[i].name)) {
            let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr3.push(data[i]);
          }
          if (/虚脉类/.test(data[i].name)) {
           let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr4.push(data[i]);
          }
          if (/实脉类/.test(data[i].name)) {
            let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr5.push(data[i]);
          }
          if (/相兼脉类/.test(data[i].name)) {
            let str = data[i].name.match(/(\S*)-/)[1];
            data[i].name = str;
            arr6.push(data[i]);
          }
          if (i == res.data.optinos.length - 1) {
            this.optinos.push(arr);
            this.optinos.push(arr1);
            this.optinos.push(arr2);
            this.optinos.push(arr3);
            this.optinos.push(arr4);
            this.optinos.push(arr5);
            this.optinos.push(arr6);
          }
        }

        this.answer = res.data.answer;
        res.data.optinos.forEach((item) => {
          if (res.data.answer == item.name) {
            this.url=item.picUrl
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
        border-bottom: 1px solid rgb(212, 229, 255);
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
      .pulse_title {
        span {
          flex: 1;
        }
      }
      .pulse_item {
        height: auto;
        border: none;
        align-items: flex-start;
        ul {
          flex: 1;
          li {
            padding-left: 0;
            text-align: center;
            border: none;
          }
        }
      }
    }
    .content_scrollbar_press {
      width: 98%;
      margin-left: 1%;
      li:nth-child(1) {
        border: none;
        border-bottom: 1px solid #d4e5ff;
      }
      li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 35px;
        border: 1px solid #d4e5ff;
        border-top: none;
        padding-left: 15px;
        span:nth-child(1) {
          width: 8%;
          text-align: center;
          height: 35px;
          line-height: 35px;
          border-right: 1px solid #d4e5ff;
        }
        span:last-child {
          padding-left: 15px;
        }
        &:hover{
          background: #cddbff;
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
  }
}
</style>
