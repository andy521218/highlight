<template>
  <div class="home">
    <header class="home_header">
      <logo :index="true"></logo>
      <user></user>
    </header>
    <div class="prose">
      <div class="prose_title">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{ active: title_index == index }"
            @click="title_index = index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="prose_main">
        <prose-one v-show="title_index == 0"></prose-one>
        <prose-two v-show="title_index == 1"></prose-two>
        <prose-three v-show="title_index == 2"></prose-three>
        <prose-four v-show="title_index == 3"></prose-four>
        <prose-five v-show="title_index == 4"></prose-five>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../components/user";
import logo from "../components/logo";
import proseOne from "../components/prose/proseOne";
import proseTwo from "../components/prose/proseTwo";
import proseThree from "../components/prose/proseThree";
import proseFour from "../components/prose/proseFour";
import proseFive from "../components/prose/proseFive";
export default {
  name: "prose",
  components: {
    user,
    logo,
    proseOne,
    proseTwo,
    proseThree,
    proseFour,
    proseFive,
  },
  data() {
    return {
      list: [
        "中医望诊人文修养",
        "营造良好的人文诊疗环境",
        "医患沟通的人文修养",
        "四诊操作规范的人文修养",
        "中医四诊人文故事",
      ],
      title_index: "",
    };
  },
};
</script>

<style lang="scss">
.prose {
  width: 90%;
  height: 88%;
  margin: 0 auto;
  .prose_title {
    width: 100%;
    height: 10%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      li {
        height: 65%;
        width: 15%;
        display: flex;
        font-size: 1.2em;
        justify-content: center;
        align-items: center;
        margin-right: 2%;
        border: 2px solid rgb(111, 147, 251);
        color: rgb(111, 147, 251);
        border-radius: 5px;
      }
      li:hover {
        cursor: pointer;
        background: rgb(111, 147, 251);
        color: rgb(255, 255, 255);
      }
      .active {
        background: rgb(111, 147, 251);
        color: rgb(255, 255, 255);
      }
    }
  }
  .prose_main {
    background-color: rgb(255,255,255,0.82);
    border-radius: 10px;
    width: 100%;
    height: 90%;
    padding: 2%;
    margin: 0 auto;
    margin-top: 1%;
  }
  //公共样式
  .background_box {
    background: rgb(244, 244, 244);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .border_top {
    text-align: center;
    font-size: 1.3em;
    height: 2.5em;
    line-height: 2.5em;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    color: rgb(255, 255, 255);
  }
}
</style>