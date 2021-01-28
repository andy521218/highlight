<template>
  <div class="study_treat">
    <div class="study_title">
      <span>治疗</span>
      <div v-for="(item, index) in list" :key="index" style="display: flex">
        <div class="custom_radio" style="margin: 0 10px">
          <span
            class="custom_text"
            :class="{ active_radio: typeId == item.id }"
          ></span>
          <input
            class="custom_none"
            type="radio"
            name="treat"
            :value="item.id"
            v-model="typeId"
            @click="seeFeel(item)"
          />
        </div>
        <label for="">{{ item.name }}</label>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 48%; padding-left: 20px">正确答案</span>
        <span style="width: 48%; padding-left: 5px">我的答案</span>
        <span style="width: 4%"></span>
      </li>
    </ul>
    <!-- 治则治法 -->
    <div class="scrollbar">
      <ul class="study_main_item" v-show="showId == '1'">
        <li style="height: 40px" v-for="(item, index) in showData" :key="index">
          <span style="width: 48%">{{ item.correctAnswer }}</span>
          <span style="width: 48%">{{ item.answer }}</span>
          <span style="width: 4%; height: 20px" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
    <!-- 遣方用药 -->
    <div class="scrollbar">
      <ul class="study_main_item" v-show="showId == '2'">
        <li style="height: 40px" v-for="(item, index) in showData" :key="index">
          <span style="width: 48%">{{ item.agentiaCorrectAnswer }}</span>
          <span style="width: 48%">{{ item.agentiaAnswer }}</span>
          <span style="width: 4%; height: 20px" class="options">
            <i class="right" v-show="item.agentiaCorrect"></i>
            <i class="error" v-show="!item.agentiaCorrect"></i
          ></span>
        </li>
      </ul>
    </div>
    <!-- 药物组成 -->
    <div class="scrollbar">
      <ul class="study_main_item" v-show="showId == '3'">
        <li style="height: 40px" v-for="(item, index) in showData" :key="index">
          <span style="width: 48%">{{
            item.correctDruggeryName ? item.correctDruggeryName : item.name
          }}</span>
          <span style="width: 48%">{{ item.druggeryName }}</span>
          <span style="width: 4%; height: 20px" class="options">
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
  name: "study-treat",
  data() {
    return {
      list: [
        { id: 1, name: "治则治法" },
        { id: 2, name: "遣方用药" },
        { id: 3, name: "药物组成" },
      ],
      typeId: "1",
      caseId: "",
      examNo: "",
      showData: [],
      showId: "1",
      trearData: [],
      agentiaData: {},
      trearCorrectData: [],
      druggeriesData: [],
      userId: "",
    };
  },
  computed: {
    ...mapState(["examId"]),
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.userId = localStorage.getItem("examId");
    this.getTreat();
    this.getAgentia();
  },
  methods: {
    sortName(property) {
      return function (a, b) {
        const val1 = a[property];
        const val2 = b[property];
        return val2.localeCompare(val1);
      };
    },
    seeFeel(item) {
      this.showId = item.id;
      if (item.id == "1") {
        this.showData = this.trearData;
      }
      if (item.id == "2") {
        this.showData = this.agentiaData;
        if (!this.agentiaData[0].agentiaCorrectAnswer) {
          this.showData[0].agentiaCorrectAnswer = this.trearCorrectData[0].name;
        }
      }
      if (item.id == "3") {
        let showData = this.agentiaData[0].druggeries;
        let showlen = showData.length;
        let correctData = this.trearCorrectData[0].druggeries;
        let correctlen = correctData.length;
        if (showlen > correctlen) {
          if (!this.agentiaData[0].agentiaCorrect) {
            correctData.forEach((item, index) => {
              showData[index].correctDruggeryName = item.name;
            });
            this.showData = showData;
          } else {
            this.showData = showData;
          }
        } else {
          if (!this.agentiaData[0].agentiaCorrect) {
            showData.forEach((item, index) => {
              correctData[index].druggeryName = item.druggeryName;
            });
            this.showData = correctData;
          } else {
            let showarr = [];
            showData.forEach((item) => {
              showarr.push(item.correctDruggeryName);
            });
            correctData.forEach((item) => {
              if (showarr.indexOf(item.name) == -1) {
                var obj = { name: item.name };
                showData.push(obj);
              }
            });
            this.showData = showData;
          }
        }
      }
    },
    getTreat() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/treat`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.trearData.push(res.data);
          this.showData.push(res.data);
        });
    },
    //我的答案
    getAgentia() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/agentia`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.agentiaData = res.data;
        });
    },
    //正确答案
    getTreatCorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/treat/correct`, {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.trearCorrectData = res.data.agentias;
        });
    },
  },
  watch: {
    agentiaData: function () {
      this.getTreatCorrect();
    },
    examId: function () {
      this.caseId = this.examId;
      this.trearData = [];
      this.showData = [];
      this.showId = "1";
      this.typeId = "1";
      this.getTreat();
      this.getAgentia();
    },
  },
};
</script>

<style lang="scss">
.study_treat {
  .study_title {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    span {
      font-size: 20px;
    }

    label {
      margin-right: 15px;
    }
  }
}
</style>