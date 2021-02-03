<template>
  <div class="case_look">
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
      <div class="main_mask" v-show="optionShow"></div>
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
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar">
              <div class="normal_edit" v-show="!normal_show">
                按诊的结果均为正常
                <p></p>
              </div>
              <ul v-show="normal_show">
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in watchData"
                  :key="index"
                >
                  <div class="item_cont" @click="openOption(item)">
                    <p class="item_cont_title">{{ item.name }}</p>
                    <p class="item_cont_option">{{ item.answer }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div class="case_right" v-if="imgurl">
        <span class="case_title_name">患者{{ name }}正在接望诊:</span>
        <div class="main_mask_img">
          <img :src="imgurl" accept="image/*" alt="" class="userlogo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import caseHeader from "../../teacher/edit/caseHeader";
import caseOption from "../../teacher/edit/caseOption";
export default {
  name: "user-look",
  components: {
    caseHeader,
    caseOption,
  },
  data() {
    return {
      tab: ["望神色形态", "望局部", "望舌"],
      optionShow: false,
      caseId: "",
      examNo: "",
      typeId: "0",
      watchData: {},
      option: {},
      id: "",
      imgurl: "",
      name: "",
      normal_show: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.name = localStorage.getItem("name");
    this.getwatchdata();
  },
  methods: {
    container(i) {
      this.typeId = i;
      this.getwatchdata();
    },
    getwatchdata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/watch/${this.typeId}`)
        .then((res) => {
          this.watchData = res.data.list;
          this.normal_show = res.data.list.length;
          if (/localhost/.test(res.data.url)) {
            this.imgurl = res.data.url.replace(/localhost/, "101.132.150.87");
          } else if (!res.data.url) {
            this.imgurl = "";
          } else {
            this.imgurl = this.$url + res.data.url;
          }
        });
    },
    openOption(e) {
      this.id = e.id;
      this.option = e;
      this.optionShow = true;
    },
    editcaseData() {
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/watch/${this.id}`, {
          answer: this.$children[1].radioData,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.optionShow = false;
            this.getwatchdata();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>
