<template>
  <div class="case_hear">
    <case-option
      :option="option"
      :videoUrl="videoUrl"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
      <div class="case_left">
        <div class="main_mask" v-show="optionShow"></div>
        <case-header></case-header>
        <main>
          <ul class="main_tab">
            <li v-for="(item, index) in tab" :key="index" class="item_title">
              {{ item }}
              <div :class="{ active: typeId == index }"></div>
            </li>
            <i class="tips"></i>
          </ul>
          <div class="normal_edit" v-if="normal_edit_show">
            闻诊的结果均为正常
            <p></p>
          </div>
          <div class="content scrollbar" v-if="!normal_edit_show">
            <div class="content_scrollbar">
              <ul>
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in listenData"
                  :key="index"
                >
                  <div class="item_cont" @click="openOption(item)">
                    <p class="item_cont_title">{{ item.name }}</p>
                    <p class="item_cont_option">
                      {{ item.answer }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import caseOption from "../../teacher/edit/caseOption";
import caseHeader from "../../teacher/edit/caseHeader";
export default {
  name: "user-hear",
  data() {
    return {
      tab: ["闻诊"],
      typeId: "",
      normal_edit_show: false,
      optionShow: false,
      caseId: "",
      listenData: {},
      examNo: "",
      listenId: "",
      videoUrl: "",
    };
  },
  components: {
    caseOption,
    caseHeader,
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getListenData();
  },
  methods: {
    openOption(e) {
      this.option = e;
      if (/localhost/.test(e.videoUrl)) {
        this.videoUrl = e.videoUrl.replace(/localhost/, "101.132.150.87");
      } else {
        this.videoUrl = this.$url + e.videoUrl;
      }
      this.listenId = e.id;
      this.optionShow = true;
    },
    getListenData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/listen`)
        .then((res) => {
          if (res.data.length == "0") return (this.normal_edit_show = true);
          this.listenData = res.data;
        });
    },
    editcaseData() {
      let answer = this.$children[1].radioData;
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/Listen/${this.listenId}`, {
          answer: answer,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.getListenData();
          }
        });
    },
  },
};
</script>

<style lang="scss">
.case_hear {
  width: 100%;
  height: 100%;
  .case_left {
    main {
      .item_cont_border {
        border: 1px solid rgb(111,147,251);
        border-top: none;
        height: 30px;
        line-height: 30px;
        .item_cont {
          display: flex;
          .item_cont_title {
            width: 300px;
            border-right: rgb(111,147,251) 1px solid;
          }
          .item_cont_option {
            cursor: pointer;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>