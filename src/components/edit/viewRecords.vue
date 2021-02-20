<template>
  <div class="view_records">
    <div class="edit_title">
      <span class="title">学习记录</span>
      <span class="edit_switch" @click="close"></span>
    </div>
    <div class="records_bottom scrollbar">
      <ul class="records_header">
        <li class="table_smal">病系</li>
        <li class="table_smal">患者</li>
        <li class="table_big">开始时间</li>
        <li class="table_big">完成时间</li>
        <li class="table_smal">用时</li>
        <li class="table_smal">成绩</li>
      </ul>
      <ul class="records_cont">
        <li v-for="(item, index) in recordData.rows" :key="index">
          <p class="table_smal">
            {{ diseType(item.diseaseType) }}
          </p>
          <p class="table_smal">
            {{ item.name }}
          </p>
          <p class="table_big">
            {{ item.beginTime | lastTime(item.beginTime) }}
          </p>
          <p class="table_big">
            {{ item.endTime | lastTime(item.endTime) }}
          </p>
          <p class="table_smal">{{ item.duringTime / 60 }}min</p>
          <p class="table_smal">{{ Math.round(item.score) }}</p>
        </li>
        <li v-for="(item, index) in recordData.rows" :key="index">
          <p class="table_smal">
            {{ diseType(item.diseaseType) }}
          </p>
          <p class="table_smal">
            {{ item.name }}
          </p>
          <p class="table_big">
            {{ item.beginTime | lastTime(item.beginTime) }}
          </p>
          <p class="table_big">
            {{ item.endTime | lastTime(item.endTime) }}
          </p>
          <p class="table_smal">{{ item.duringTime / 60 }}min</p>
          <p class="table_smal">{{ Math.round(item.score) }}</p>
        </li>
        <li v-for="(item, index) in recordData.rows" :key="index">
          <p class="table_smal">
            {{ diseType(item.diseaseType) }}
          </p>
          <p class="table_smal">
            {{ item.name }}
          </p>
          <p class="table_big">
            {{ item.beginTime | lastTime(item.beginTime) }}
          </p>
          <p class="table_big">
            {{ item.endTime | lastTime(item.endTime) }}
          </p>
          <p class="table_smal">{{ item.duringTime / 60 }}min</p>
          <p class="table_smal">{{ Math.round(item.score) }}</p>
        </li>
        <li v-for="(item, index) in recordData.rows" :key="index">
          <p class="table_smal">
            {{ diseType(item.diseaseType) }}
          </p>
          <p class="table_smal">
            {{ item.name }}
          </p>
          <p class="table_big">
            {{ item.beginTime | lastTime(item.beginTime) }}
          </p>
          <p class="table_big">
            {{ item.endTime | lastTime(item.endTime) }}
          </p>
          <p class="table_smal">{{ item.duringTime / 60 }}min</p>
          <p class="table_smal">{{ Math.round(item.score) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "view-records",
  props: ["recordData"],
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
    };
  },
  methods: {
    close() {
      this.$parent.recordshow = false;
      this.$parent.mask = false;
    },
    diseType(index) {
      return this.list[index - 1].name;
    },
  },
};
</script>

<style lang="scss">
.view_records {
  width: 80%;
  margin: 0 10%;
  position: absolute;
  z-index: 9999;
  background-color: rgb(212, 229, 255);
  border-radius: 10px;
  border: 1px solid rgb(111, 147, 251);
  .edit_title {
    width: 100%;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: rgb(111, 147, 251);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: rgb(255, 255, 255);
    .edit_switch {
      background: url("../../assets/public/switch.png") no-repeat center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      cursor: pointer;
      &:hover {
        background: url("../../assets/public/switchmove1.png") no-repeat center;
      }
    }
  }
  .records_bottom {
    width: 100%;
    .records_header {
      display: flex;
      li {
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        background: rgb(240, 246, 255);
      }
    }
    .records_cont {
      width: 100%;
      height: 40em;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      li {
        width: 100%;
        height: 3em;
        display: flex;
        p {
          height: 3em;
          line-height: 3em;
          flex: 1;
          text-align: center;
        }
        &:hover {
          background-color: rgb(111, 147, 251, 0.62) !important;
        }
      }
      li:nth-child(even) {
        background: rgb(240, 246, 255);
      }
    }
  }
}
</style>
