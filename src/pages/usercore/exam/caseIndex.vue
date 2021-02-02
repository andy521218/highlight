<template>
  <div class="home">
    <header class="home_header"></header>
    <div class="case_user_main exam_index_list">
      <div class="main_mask" v-if="deleshow || examNumber_show"></div>
      <edit-dele :title="'提示'" v-show="deleshow" @deleSubmit="submit">
        <template v-slot:edit_p>
          <p>{{ tips }}</p>
          <p class="edit_dele_p">(提交后无法更改)</p>
        </template>
      </edit-dele>
      <div class="edit_dele" v-show="examNumber_show">
        <div class="edit">
          <div class="edit_title">
            <span class="title">本次考试得分</span>
            <span class="edit_switch" @click="closeItps"></span>
          </div>
          <ul>
            <li>
              <p>
                <span style="font-size: 30px; font-weight: bold">{{
                  parseInt(examNumber)
                }}</span
                >分
              </p>
            </li>
          </ul>
          <div class="edit_btn_box">
            <button class="edit_submit" @click="closeItps">确定</button>
          </div>
        </div>
      </div>
      <ul>
        <li
          class="case_user_item"
          v-for="(item, index) in examData"
          :key="index"
          @click="startExam(item)"
        >
          <div class="case_user_item_box">
            <img :src="$url + item.picUrl" alt="" />
            <div class="case_current">
              <span>姓名:{{ item.name }}</span>
              <span style="text-align: right"
                >性别:{{ item.gender ? "男" : "女" }}</span
              >
              <span>年龄:{{ item.age }}</span>
            </div>
            <div class="case_active">
              <button class="train_btn">进入考试</button>
              <!-- <span class="totlal_second">累计学习:{{ item.count }}次</span> -->
            </div>
          </div>
        </li>
      </ul>
      <button class="import" @click="deleshow = true">提交考试</button>
    </div>
  </div>
</template>


<script>
import editDele from "../../../components/edit/editDele";
export default {
  name: "case-index",
  components: {
    editDele,
  },
  data() {
    return {
      examData: "",
      tips: "您确定提交本次考试吗?",
      deleshow: false,
      examNumber: "111",
      examNumber_show: false,
    };
  },
  mounted() {
    this.getExam();
    localStorage.removeItem("bgindex");
    localStorage.removeItem("examNo");
    localStorage.removeItem("caseId");
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
    localStorage.removeItem("sex");
    localStorage.removeItem("exam");
    localStorage.removeItem("total");
    var de = document.documentElement;
    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen();
    }
  },
  methods: {
    getExam() {
      this.axios.get("/exam").then((res) => {
        localStorage.setItem("examNo", res.data[0].examNo);
        let caseIds = res.data[0].caseId;
        this.axios.post(`/exam/${res.data[0].examNo}/start`).then((res) => {
          if (res.code == "000000") {
            return;
          } else {
            this.$Message.error(res.data.msg);
          }
        });
        this.axios.get(`/case/${caseIds}/meta`).then((res) => {
          this.examData = res.data;
        });
      });
    },

    //开始考试
    startExam(item) {
      localStorage.setItem("caseId", item.caseId);
      localStorage.setItem("exam", true);
      this.$router.push("userask");
    },
    //提交考试
    submit() {
      let examNo = localStorage.getItem("examNo");
      this.axios.put(`/exam/${examNo}/finished`).then((res) => {
        this.examNumber = res.data;
        this.examNumber_show = true;
        this.deleshow = false;
      });
    },
    closeItps() {
      this.examNumber_show = false;
      this.$router.push("index");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "userlookuserlookuserlookuserlook") {
      next();
      return;
    }
    var de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
    }
    next();
  },
};
</script>

<style lang="scss">
.exam_index_list {
  margin-top: 3%;
  background-color: rgb(255, 255, 255, 0.82);
  height: 80%;
  text-align: center;
  position: relative;
  .edit_dele {
    .edit {
      top: 10%;
      left: 50%;
      margin-left: -16.5em;
    }
  }
  ul {
    background-color: transparent;
    height: 93%;
    text-align: left;
  }
  .import {
    width: 15em;
  }
}
</style>