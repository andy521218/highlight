<template>
  <div class="user_record" style="width: 100%; height: 100%">
    <div class="main_header">
      <div class="main_header_left"></div>
      <div class="main_header_right">
        <selectBox
          :title="'病系'"
          :listData="list"
          :typeId="'diseaseType'"
          :itemName="'name'"
          :itemId="'diseaseType'"
          :defaultTitle="'请选择病系'"
        ></selectBox>
        <input
          type="text"
          class="text_box"
          placeholder="请输入患者名字"
          v-model="searchName"
        />
        <button class="submit" @click="getTrain(1)">检索</button>
      </div>
    </div>

    <table class="main_table">
      <thead class="thead-dark">
        <tr>
          <th class="table_5">序号</th>
          <th class="table_10">病系</th>
          <th class="table_10">患者</th>
          <th class="table_10">开始时间</th>
          <th class="table_10">完成时间</th>
          <th class="table_10">用时</th>
          <th class="table_10">成绩</th>
          <th class="table_10">查看</th>
        </tr>
      </thead>
      <tbody v-show="!main_show">
        <tr v-for="(item, index) in trainData" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>{{ checkDisease(item.diseaseType) }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.beginTime | lastTime(item.beginTime) }}</td>
          <td>{{ item.endTime | lastTime(item.endTime, "未完成") }}</td>
          <td>{{ parseInt(item.duringTime / 60) }}min</td>
          <td>{{ Math.round(item.score) }}分</td>
          <td v-show="item.status == 1">
            <span @click="toKeep(item)">继续学习</span>
          </td>
          <td v-show="item.status == 2">
            <span style="margin-right: 0.8em" @click="toStudy(item)"
              >辨证过程</span
            >
            <span @click="toMapping(item)">思维导图</span>
          </td>
        </tr>
      </tbody>
      <main-itps v-show="main_show"></main-itps>
    </table>
    <turn-page
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      :currentPage="Number(page)"
      @getData="getTrain"
    ></turn-page>
  </div>
</template>

<script>
import mainItps from "../../components/mainItps";
import turnPage from "../../components/turnPage";
import selectBox from "../../components/selectBox";

export default {
  name: "user-record",
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
      searchName: "",
      total: "",
      size: "10",
      trainData: {},
      page: "",
      main_show: false,
      isRouter: false,
    };
  },
  components: {
    turnPage,
    mainItps,
    selectBox,
  },

  mounted() {
    this.getTrain(this.$store.state.dialecticalPage);
    localStorage.removeItem("correctaskked");
    localStorage.removeItem("correctwatch");
  },
  methods: {
    toKeep(e) {
      this.axios.get(`/answer/${e.examNo}/${e.caseId}/asked`).then((res) => {
        localStorage.setItem("askedArr", JSON.stringify(res.data));
        localStorage.setItem("examNo", e.examNo);
        localStorage.setItem("caseId", e.caseId);
        this.$router.push("userask");
      });
    },
    toMapping(e) {
      localStorage.setItem("examNo", e.examNo);
      localStorage.setItem("caseId", e.caseId);
      localStorage.setItem("caseName", e.name);
      this.$router.push("usermap");
    },
    toStudy(e) {
      this.isRouter = true;
      localStorage.setItem("examNo", e.examNo);
      localStorage.setItem("caseId", e.caseId);
      this.$router.push("ask");
    },
    getTrain(page) {
      this.page = page;
      this.$store.state.dialecticalPage = page;
      this.axios
        .get("/my/train", {
          params: {
            diseaseType: this.diseaseType,
            fuzzyName: this.searchName,
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          if (res.data.rows.length == 0) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.trainData = res.data.rows;
          this.total = res.data.total;
        });
    },
    checkDisease(type) {
      switch (type) {
        case 1:
          return "心系病";

        case 2:
          return "肝系病";

        case 3:
          return "脾胃病";

        case 4:
          return "肺系病";

        case 5:
          return "肾系病";
      }
    },
  },
  beforeRouteLeave(to, form, next) {
    if (this.isRouter) {
      next();
      return;
    }
    this.$store.state.dialecticalPage = 1;
    next();
  },
};
</script>
