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
          <div class="case_img">
            <img :src="$url + item.picUrl" alt="" />
            <div class="case_active">
              <div class="case_img_tips">
                <span>开始考试</span>
              </div>
            </div>
          </div>
          <div class="case_current">
            <span>姓名: {{ item.name }}</span>
            <span>性别: {{ item.gender ? "男" : "女" }}</span>
            <span>年龄: {{ item.age }}</span>
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
  },
  methods: {
    getExam() {
      this.axios.get("/exam").then((res) => {
        localStorage.setItem("examNo", res.data[0].examNo);
        let caseIds = res.data[0].caseId;
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
};
</script>

<style lang="scss">
.exam_index_list {
  margin-top: 3%;
  position: relative;
  .case_user_item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .import {
    width: 200px;
    left: 50%;
    bottom: 10px;
    margin-left: -100px;
    position: absolute;
  }
  .case_active {
    width: 100% !important;
    height: 100% !important;
    left: 0 !important;
    top: 0 !important;
  }
  .edit_dele {
    .edit {
      margin: 10% 40%;
    }
  }
}
</style>