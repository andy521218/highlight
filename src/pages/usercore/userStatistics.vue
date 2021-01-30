<template>
  <div class="user_statistics">
    <div class="statistics_title">
      <div class="statistics_left">
        <div class="casetrain" @click="tabCase(1)">
          案例训练
          <p :class="{ active: active == 1 }"></p>
        </div>
        <div class="caseexam" @click="tabCase(2)">
          正式考试
          <p :class="{ active: active == 2 }"></p>
        </div>
      </div>
      <div class="statistics_right" v-show="active == 1">
        <selectBox
          :listData="list"
          :typeId="'diseaseType'"
          :itemName="'name'"
          :itemId="'diseaseType'"
          :defaultTitle="'请选择病系'"
          style="text-align: left"
        ></selectBox>
        <button class="submit" @click="search">检索</button>
      </div>
    </div>
    <div class="content">
      <case-tarin
        v-show="active == 1"
        :diseaseType="diseaseType"
        ref="caseTarin"
      ></case-tarin>
      <exam-case v-if="active == 2"></exam-case>
    </div>
  </div>
</template>

<script>
import caseTarin from "./statustics/caseTarin";
import examCase from "./statustics/examCase";
import selectBox from "../../components/selectBox";

export default {
  name: "user-statistics",
  components: {
    caseTarin,
    examCase,
    selectBox,
  },
  data() {
    return {
      list: [
        {
          diseaseType: 1,
          name: "心系病",
        },
        {
          diseaseType: 2,
          name: "肝系病",
        },
        {
          diseaseType: 3,
          name: "脾胃病",
        },
        {
          diseaseType: 4,
          name: "肺系病",
        },
        {
          diseaseType: 5,
          name: "肾系病",
        },
      ],
      diseaseType: "",
      active: "1",
    };
  },
  methods: {
    tabCase(index) {
      this.active = index;
    },
    search() {
      this.$refs.caseTarin.getreport();
    },
  },
};
</script>

<style lang="scss">
.user_statistics {
  width: 100%;
  height: 100%;
  .statistics_title {
    width: 99%;
    height: 12%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(111, 147, 256);
    display: flex;
    justify-content: space-between;
    .statistics_left,
    .statistics_right {
      display: flex;
      height: 100%;
      align-items: center;
      text-align: center;
      width: 50%;
    }
    .casetrain,
    .caseexam {
      font-weight: bold;
      width: 13%;
      font-size: 1.3em;
      margin-right: 1%;
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60%;
      color: rgb(36, 57, 124);
      p {
        display: none;
        position: absolute;
        width: 100%;
        bottom: 0;
        border: 3px solid rgb(111, 147, 256);
        border-radius: 3px;
      }
      .active {
        display: block;
      }
    }
    .casetrain {
      margin-left: 4%;
    }
    .statistics_right {
      justify-content: flex-end;
      padding-right: 2.4%;
      .submit {
        margin: 0;
      }
    }
  }
  .content {
    height: 88%;
    width: 95%;
    margin: 0 auto;
  }
  .tarin_top_item_title {
    width: 100%;
    height: 20%;
    position: relative;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    i {
      width: 1.8em;
      height: 3.5em;
      background: url("../../assets/public/0235255.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      margin-left: 10px;
    }
    .orange {
      background: url("../../assets/public/25113894.png");
      background-size: 100% 100%;
    }
    .violet {
      background: url("../../assets/public/171130255.png");
      background-size: 100% 100%;
    }
    span {
      font-size: 17px;
      font-weight: bold;
      margin-left: 2.5em;
    }
    .train_bottom_right_total {
      position: absolute;
      right: 20px;
    }
  }
}
</style>

