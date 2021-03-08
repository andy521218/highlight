<template>
  <div class="admin_number">
    <div class="admin_number_item">
      <div class="number_item_title">
        <span>问 诊</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in ask" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            @click="submit(item, index, '问诊')"
            :class="{ active: ask_show == index }"
            @blur="upload($event, item)"
            :value="item.score"
          />
        </li>
      </ul>
    </div>

    <div class="admin_number_item">
      <div class="number_item_title">
        <span>辨 证</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in diagnosis" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            :class="{ active: diagnosis_show == index }"
            @blur="upload($event, item)"
            @click="submit(item, index, '辨证')"
            :value="item.score"
          />
        </li>
      </ul>

      <div class="number_item_title">
        <span>方 药 方 剂</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in treat" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            :class="{ active: treat_show == index }"
            @blur="upload($event, item)"
            @click="submit(item, index, '方药方剂')"
            :value="item.score"
          />
        </li>
      </ul>
    </div>

    <div class="admin_number_item">
      <div class="number_item_title">
        <span>望 诊</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in watch" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            :class="{ active: watch_show == index }"
            @blur="upload($event, item)"
            @click="submit(item, index, '望诊')"
            :value="item.score"
          />
        </li>
      </ul>
      <div class="number_item_title">
        <span>闻 诊</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in listen" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            :class="{ active: listen_show == index }"
            @blur="upload($event, item)"
            @click="submit(item, index, '闻诊')"
            :value="item.score"
          />
        </li>
      </ul>
      <div class="number_item_title">
        <span>切 诊</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in feel" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            @click="submit(item, index, '切诊')"
            :class="{ active: feel_show == index }"
            @blur="upload($event, item)"
            :value="item.score"
          />
        </li>
      </ul>
      <div class="number_item_title">
        <span>治 则 治 法</span>
      </div>
      <ul class="number_item_list">
        <li v-for="(item, index) in dialectical" :key="index">
          <span>{{ item.name }}</span>
          <input
            type="text"
            class="text_box"
            @click="submit(item, index, '治则治法')"
            :class="{ active: dialectical_show == index }"
            @blur="upload($event, item)"
            :value="item.score"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-number",
  data() {
    return {
      ask: [],
      ask_show: "-1",
      watch: [],
      watch_show: "-1",
      listen: [],
      listen_show: "-1",
      feel: [],
      feel_show: "-1",
      diagnosis: [],
      diagnosis_show: "-1",
      dialectical: [],
      dialectical_show: "-1",
      treat: {},
      treat_show: "-1",
      score: "",
      uploadData: {},
    };
  },
  mounted() {
    this.getScore();
  },
  methods: {
    getScore() {
      this.axios.get("/case/manage/score/setting").then((res) => {
        let arr = [];
        res.data.forEach((item) => {
          arr.push(item);
          if (item.id == 15) {
            this.ask = arr;
            arr = [];
          }
          if (item.id == 16) {
            this.watch = arr;
            arr = [];
          }
          if (item.id == 17) {
            this.listen = arr;
            arr = [];
          }
          if (item.id == 20) {
            this.feel = arr;
            arr = [];
          }
          if (item.id == 27) {
            this.diagnosis = arr;
            arr = [];
          }
          if (item.id == 28) {
            this.dialectical = arr;
            arr = [];
          }
          if (item.id == 33) {
            this.treat = arr;
            arr = [];
          }
        });
      });
    },
    submit(item, index, name) {
      if (name == "问诊") {
        this.ask_show = index;
      }
      if (name == "辨证") {
        this.diagnosis_show = index;
      }
      if (name == "方药方剂") {
        this.treat_show = index;
      }
      if (name == "望诊") {
        this.watch_show = index;
      }
      if (name == "闻诊") {
        this.listen_show = index;
      }
      if (name == "切诊") {
        this.feel_show = index;
      }
      if (name == "治则治法") {
        this.dialectical_show = index;
      }
    },
    upload(e, item) {
      this.ask_show = "-1";
      this.watch_show = "-1";
      this.listen_show = "-1";
      this.feel_show = "-1";
      this.treat_show = "-1";
      this.dialectical_show = "-1";
      this.diagnosis_show = "-1";
      let val = e.target.value;
      this.uploadData = item;
      this.uploadData.score = val;
      this.http
        .post("/case/manage/score/setting", [this.uploadData])
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning(`设置${item.name}成功!`);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss">
.admin_number {
  width: 100%;
  height: 100%;
  padding: 1%;
  display: flex;
  .text_box {
    width: 3em;
    border: none;
    text-align: center;
    padding: 0;
    background-color: "";
    cursor: pointer;
  }
  .active {
    border: 1px solid rgb(111, 147, 251);
  }
  .admin_number_item {
    flex: 1;
    height: 100%;

    .number_item_title {
      width: 100%;
      padding: 2% 0;
      background-color: rgb(111, 147, 251);
      text-align: center;
      font-size: 1.3em;
      font-weight: bold;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: rgb(255, 255, 255);
    }
  }
  .admin_number_item:nth-child(2) {
    margin: 0 3%;
  }
  .number_item_list {
    background-color: rgb(212, 229, 255, 0.4);
    margin-bottom: 2em;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    li {
      padding: 0 4%;
      display: flex;

      align-items: center;
      span {
        flex: 1;
      }
    }
  }
}
</style>