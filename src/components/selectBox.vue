<template>
  <div
    class="select_box"
    id="select_box"
    @mouseleave="
      showDown = 0;
      showDownHeight = 0;
    "
    :style="{ 'z-index': index ? index : 1 }"
  >
    <span class="select_title_span">{{ title }}</span>
    <div class="select_title">
      <div class="select_title_text" @click="selectItem()">
        <span>{{ selectTitle }}</span>
      </div>
      <span class="select-icon"
        ><i-con type="ios-arrow-down" size="22" @click="selectItem()"
      /></span>
      <div
        class="select_title_down"
        :style="{ opacity: showDown, height: downHeight + 'px' }"
      >
        <div class="select_bar" v-show="showBar" ref="select_bar"></div>
        <div
          v-show="showBar"
          class="select_scrollbar"
          :style="{
            height: barHeight + 'px',
            'margin-top': scrollbarTop + 'px',
          }"
        ></div>
        <ul
          ref="select_header"
          @mousewheel="handleScroll"
          @mouseleave="showDown = false"
        >
          <li
            @click="selectOption(item)"
            :style="{ width: liWidth + 'em' }"
            v-for="(item, index) in selectData"
            :key="index"
          >
            {{ item[itemName] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Myselect-box",
  props: [
    "title",
    "listData",
    "typeId",
    "itemName",
    "defaultTitle",
    "itemId",
    "index",
  ],
  data() {
    return {
      selectData: [],
      barHeight: "",
      liWidth: 16,
      scrollbarTop: "",
      showBar: true,
      showDown: 0,
      selectTitle: "",
      time: "",
      downHeight: 0,
    };
  },
  mounted() {
    var browser = window.navigator.userAgent.toLowerCase().indexOf("firefox");
    if (browser != -1) {
      document.addEventListener("DOMMouseScroll", this.handleScroll);
    }
    this.initBar();
  },
  methods: {
    initBar() {
      this.selectData = [];
      if (this.defaultTitle) {
        if (!this.selectData[0]) {
          this.selectData.push({
            [this.itemName]: this.defaultTitle,
            [this.typeId]: "",
          });
        }
      }

      this.selectData = [...this.selectData, ...this.listData];
      this.selectTitle = this.selectData[0][this.itemName];
    },
    handleScroll() {
      if (this.time) return;
      this.time = setTimeout(() => {
        //元素距离顶部距离
        let scrollTop = this.$refs.select_header.scrollTop;
        //元素最大高度
        let scrollHeight = this.$refs.select_header.scrollHeight;
        //元素可视化高度
        let offsetHeight = this.$refs.select_header.offsetHeight;
        //滚动条背景可视化高度
        let select_bar_height = this.$refs.select_bar.offsetHeight;

        this.scrollbarTop =
          (scrollTop / (scrollHeight - offsetHeight)) *
          (select_bar_height - this.barHeight);
        this.time = "";
      }, 500);
    },
    selectOption(item) {
      setTimeout(() => {
        this.$emit("changeItem");
      }, 500);
      this.selectTitle = item[this.itemName];
      if (this.$parent[this.typeId] == undefined) {
        this.$store.state.typeId = item[this.itemId];
      } else {
        this.$parent[this.typeId] = item[this.itemId];
      }
      this.showDown = 0;
      this.downHeight = 0;
    },
    selectItem() {
      this.showDown = 1;
      let offsetHeight = this.$refs.select_header.offsetHeight;
      let scrollHeight = this.$refs.select_header.scrollHeight;
      this.barHeight = (offsetHeight / scrollHeight) * offsetHeight;
      this.downHeight = offsetHeight;
      if (scrollHeight <= offsetHeight) {
        this.showBar = false;
        this.liWidth = 16;
      } else {
        this.liWidth = 15;
        this.showBar = true;
      }
    },
  },
  watch: {
    listData: function () {
      this.initBar();
    },
  },
};
</script>

<style lang="scss">
.select_box {
  display: flex;
  align-items: center;
  height: 3em;
  z-index: 9;
  margin-right: 2em;
  .select_title_span {
    margin-right: 1em;
    color: rgb(111, 147, 251);
  }
  .select_title {
    cursor: default;
    width: 16em;
    height: 100%;
    border: 1px solid rgb(111, 147, 251);
    background: rgb(240, 246, 255);
    color: rgb(111, 147, 251);
    display: flex;
    justify-content: space-between;
    padding: 0 2% 0 5%;
    position: relative;
    .select_title_text {
      width: 100%;
      height: 3em;
      line-height: 3em;
      span {
        width: 100%;
        display: inline-block;
      }
    }
    .select_bar {
      position: absolute;
      border-radius: 3px;
      width: 0.5em;
      height: 98%;
      top: 1%;
      background-color: rgb(219, 235, 255);
      right: 0.1em;
      z-index: 99;
    }
    .select_scrollbar {
      position: absolute;
      border-radius: 3px;
      width: 0.5em;
      background-color: rgb(111, 147, 251, 0.82);
      right: 0.1em;
      top: 1%;
      z-index: 99;
    }
    .select_title_down {
      width: 16em;
      max-height: 23em;
      border: 1px solid rgb(111, 147, 251);
      background: rgb(240, 246, 255);
      position: absolute;
      left: -1px;
      top: 2.9em;
      overflow: hidden;
      ul {
        width: 25em;
        max-height: 23em;
        overflow-y: auto;
        li {
          padding-left: 4%;
          height: 3em;
          line-height: 3em;
          &:hover {
            color: rgb(255, 255, 255);
            background: rgb(111, 147, 251, 0.62);
          }
        }
      }
    }
    .select-icon {
      display: flex;
      align-items: center;
    }
  }
}
</style>>
