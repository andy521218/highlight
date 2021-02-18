<template>
  <div class="select_layout">
    <div class="select_title" @click="down">
      <i
        v-if="this.$parent.editData.colorId"
        :style="{
          background: select[this.$parent.editData.colorId].color,
        }"
      ></i>
      <p v-if="this.$parent.editData.colorId">
        {{ select[this.$parent.editData.colorId].title }}
      </p>
      <i
        style="background: rgb(255, 167, 39)"
        v-if="!this.$parent.editData.colorId"
      ></i>
      <p v-if="!this.$parent.editData.colorId">发病情况</p>
      <a href="javascript:;"></a>
    </div>
    <div class="select_down" v-if="show" style="border-top: none">
      <div
        class="select_item"
        v-for="(item, index) in select"
        :key="index"
        @click="option(item, index)"
      >
        <i :style="{ background: item.color }"></i>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customize-select",
  data() {
    return {
      select: [
        {
          title: "发病情况",
          color: "rgb(255,167,39)",
        },
        {
          title: "主症特点",
          color: "rgb(254,236,74)",
        },
        {
          title: "伴随症状及鉴别诊断症状",
          color: "rgb(115,213,114)",
        },
        {
          title: "诊疗过程",
          color: "rgb(36,169,245)",
        },
        {
          title: "发作情况",
          color: "rgb(150,117,206)",
        },
        {
          title: "刻下症",
          color: "rgb(0,230,255)",
        },
      ],
      show: false,
      itemNmae: "",
    };
  },
  methods: {
    down() {
      this.show = !this.show;
    },
    option(item, index) {
      this.rgb = item.color;
      this.treatVal = item.title;
      this.$parent.editData.colorId = index;
      this.show = false;
    },
  },
};
</script>

<style lang="scss">
.select_layout {
  width: 300px;
  position: relative;

  .select_item,
  .select_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    background: rgb(240, 246, 255);
    color: rgb(111, 147, 251);

    i {
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }

    p {
      width: 220px;
    }

    a {
      margin-top: 5px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: rgb(111, 147, 251);
      margin-right: 15px;
    }
  }

  .select_title,
  .select_down {
    border: rgb(111, 147, 251) 1px solid;
  }

  .select_down {
    width: 100%;

    position: absolute;
    z-index: 9999;

    .select_item {
      p {
        width: 255px;
      }
    }

    .select_item:hover {
      color: rgb(255, 255, 255);
      background: rgb(111, 147, 251);
    }
  }
}
</style>