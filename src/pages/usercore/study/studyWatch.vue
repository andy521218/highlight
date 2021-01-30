<template>
  <div class="study_watch">
    <div class="study_title">
      <span>望诊</span>
      <div class="study_title_item" v-for="(item, index) in list" :key="index">
        <div class="custom_radio">
          <span
            class="custom_text"
            :class="{ active_radio: typeId == item.id }"
          ></span>
          <input
            class="custom_none"
            type="radio"
            name="watch"
            :value="item.id"
            v-model="typeId"
            @click="seeWatch(item)"
          />
        </div>
        <label for="">{{ item.name }}</label>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 30%; padding-left: 10px">问题</span>
        <span style="width: 30%">正确答案</span>
        <span style="width: 35%">我的答案</span>
        <span style="width: 5%"></span>
      </li>
    </ul>
    <div class="scrollbar">
      <!-- 望神色 -->
      <ul class="study_main_item" v-show="showId == '0'">
        <li v-for="(item, index) in watchone" :key="index" style="height: 40px">
          <span style="width: 30%; padding-left: 10px">{{ item.name }}</span>
          <span style="width: 30%">{{ item.correctAnswer }}</span>
          <span style="width: 35%">{{ item.answer }}</span>
          <span style="width: 5%; height: 20px" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 望局部 -->
      <ul class="study_main_item" v-show="showId == '1'">
        <li v-for="(item, index) in watchtwo" :key="index" style="height: 40px">
          <span style="width: 30%; padding-left: 10px">{{ item.name }}</span>
          <span style="width: 30%">{{ item.correctAnswer }}</span>
          <span style="width: 35%">{{ item.answer }}</span>
          <span style="width: 5%; height: 20px" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
      <!-- 望舌 -->
      <ul class="study_main_item" v-show="showId == '2'">
        <li
          v-for="(item, index) in watchthree"
          :key="index"
          style="height: 40px"
        >
          <span style="width: 30%; padding-left: 10px">{{ item.name }}</span>
          <span style="width: 30%">{{ item.correctAnswer }}</span>
          <span style="width: 35%">{{ item.answer }}</span>
          <span style="width: 5%; height: 20px" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "study-watch",
  data() {
    return {
      list: [
        { id: 0, name: "望神色形态" },
        { id: 1, name: "望局部" },
        { id: 2, name: "望舌" },
      ],
      caseId: "",
      examNo: "",
      typeId: "0",
      title: "望神色形态",
      watchone: [],
      watchtwo: [],
      watchthree: [],
      showId: "0",
    };
  },
  computed: {
    ...mapState(["examId"]),
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.userId = localStorage.getItem("examId");
    for (let i = 0; i < 3; i++) {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/watched/${i}`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          if (i == 0) {
            this.watchone = res.data;
          }
          if (i == 1) {
            this.watchtwo = res.data;
          }
          if (i == 2) {
            this.watchthree = res.data;
          }
        });
    }
  },
  methods: {
    seeWatch(item) {
      this.showId = item.id;
    },
  },
  watch: {
    examId: function () {
      this.caseId = this.examId;
      this.typeId = "0";
      this.showId = "0";
      for (let i = 0; i < 3; i++) {
        this.axios
          .get(`/${this.examNo}/${this.caseId}/watched/${i}`, {
            params: {
              userId: this.userId,
            },
          })
          .then((res) => {
            if (i == 0) {
              this.watchone = res.data;
            }
            if (i == 1) {
              this.watchtwo = res.data;
            }
            if (i == 2) {
              this.watchthree = res.data;
            }
          });
      }
    },
  },
};
</script>

<style lang="scss">

</style>