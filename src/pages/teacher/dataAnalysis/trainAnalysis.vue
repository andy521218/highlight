<template>
  <div class="train_analysis">
    <div class="main_header">
      <div class="main_header_left"></div>
      <div class="main_header_right">
        <selectBox
          :title="'病系'"
          :listData="list"
          :typeId="'diseaseType'"
          :itemName="'name'"
          :itemId="'diseaseType'"
        ></selectBox>
        <button class="submit" @click="getTrain(1)">检索</button>
      </div>
    </div>

    <table class="main_table">
      <thead class="thead-dark">
        <tr>
          <th>序号</th>
          <th>病系</th>
          <th>病人姓名</th>
          <th>学习人数</th>
          <th>学习人次</th>
          <th>最高分</th>
          <th>平均分</th>
          <th>平均用时</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in trainData" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>{{ list[item.diseaseType - 1].name }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.totalUser }}</td>
          <td>{{ item.totalCnt }}</td>
          <td>{{ parseInt(item.maxScore) }}</td>
          <td>{{ parseInt(item.avgScore) }}</td>
          <td>{{ parseInt(item.avgCostTime / 60) }}分</td>
        </tr>
      </tbody>
    </table>
    <main-itps v-show="main_show"></main-itps>
    <turn-page
      v-show="total > 10"
      :totaltotal="Number(total)"
      :size="10"
      @getData="getTrain"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../../components/turnPage";
import mainItps from "../../../components/mainItps";
import selectBox from "../../../components/selectBox";

export default {
  name: "train-analysis",
  components: {
    turnPage,
    mainItps,
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
      page: "1",
      total: "",
      diseaseType: "1",
      main_show: false,
      trainData: {},
    };
  },
  mounted() {
    this.getTrain();
  },
  methods: {
    getTrain(page = "1") {
      this.page = page;
      this.axios
        .get("/case/report/train", {
          params: {
            diseaseType: this.diseaseType,
            size: "10",
            page: this.page,
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
  },
};
</script>

<style lang="scss">
.train_analysis {
  width: 100%;
  height: 100%;
  .main_header {
    justify-content: flex-end;
  }
}
</style>