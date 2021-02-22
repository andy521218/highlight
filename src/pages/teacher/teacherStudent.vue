<template>
  <div class="teacher_student" style="width: 100%; height: 100%">
    <edit-score
      v-show="editscore_show"
      :editData="editData"
      @getResult="getResult"
    ></edit-score>

    <div class="edit" v-if="load_show">
      <div class="edit_title">
        <span class="title">批量存档</span>
        <span class="edit_switch" @click="load_show = false"></span>
      </div>
      <ul>
        <li style="display: flex">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">班级:</span>
          </div>
          <select-box
            :defaultTitle="'请选择班级'"
            :listData="classrooms"
            :itemId="'id'"
            :itemName="'name'"
            :typeId="'downloadClassroomId'"
            :index="99"
            @changeItem="getReport"
          ></select-box>
        </li>
        <li style="display: flex">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">试卷名称:</span>
          </div>
          <select-box
            :defaultTitle="'请选择试卷'"
            :listData="examName"
            :itemId="'testPaperId'"
            :itemName="'name'"
            :typeId="'downloadTestPaperId'"
          ></select-box>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="load_show = false">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
    <div class="main_header">
      <div class="main_header_left">
        <button class="add" @click="load_show = true">批量存档</button>
      </div>
      <div class="main_header_right">
        <label for>班级</label>

        <select-box
          :defaultTitle="'请选择班级'"
          :listData="classrooms"
          :itemId="'id'"
          :itemName="'name'"
          :typeId="'classroomId'"
          @changeItem="getReport"
        ></select-box>
        <label for class="big_left">试卷名称</label>

        <select-box
          :defaultTitle="'请选择试卷'"
          :listData="examName"
          :itemId="'testPaperId'"
          :itemName="'name'"
          :typeId="'testPaperId'"
        ></select-box>
        <button class="submit" @click="getResult(1)">检索</button>
      </div>
    </div>
    <!-- 学习记录 -->
    <!-- <div class="records" v-if="records_show">
      <div class="records_tile">
        <ul>
          <li
            v-for="(item, index) in caseId"
            :key="index"
            @click="tapExam(item, index)"
          >
            案例{{ index + 1 }}
            <p :class="{ active: title_index == index }"></p>
          </li>
        </ul>
        <div class="switch_close" @click="close">X</div>
      </div>
      <study-main></study-main>
    </div> -->

    <table class="main_table">
      <thead class="thead-dark">
        <tr>
          <th>序号</th>
          <th>考试名称</th>
          <th>用户名/学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>开始日期</th>
          <th>结束日期</th>
          <th>学生用时</th>
          <th>考试成绩</th>
          <th>作答记录</th>
          <th>主观成绩</th>
        </tr>
      </thead>
      <tbody v-show="!main_show">
        <tr v-for="(item, index) in examNumber" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>{{ item.examName }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.classroomName }}</td>
          <td>{{ item.startTime | lastTime(item.startTime) }}</td>
          <td>{{ item.finishTime | lastTime(item.finishTime) }}</td>
          <td v-if="item.startTime && item.finishTime">
            {{ parseInt((item.finishTime - item.startTime) / 60000) }}分
          </td>
          <td v-else>
            <p
              style="
                color: rgb(252, 94, 95);
                border: 1px solid rgb(252, 94, 95);
              "
            >
              缺考
            </p>
          </td>
          <td v-if="item.startTime && item.finishTime">
            {{ parseInt(item.score) }}
          </td>
          <td v-else>
            <p
              style="
                color: rgb(252, 94, 95);
                border: 1px solid rgb(252, 94, 95);
              "
            >
              缺考
            </p>
          </td>

          <td v-if="item.startTime && item.finishTime">
            <p @click="seeExam(item)">查看</p>
          </td>
          <td v-else>
            <p
              @click="seeExam(item)"
              style="
                color: rgb(252, 94, 95);
                border: 1px solid rgb(252, 94, 95);
              "
            >
              缺考
            </p>
          </td>
          <td v-if="item.startTime && item.finishTime">
            <p v-if="!item.adjustScore" @click="editScore(item)">打分</p>
            <span v-else>{{ item.adjustScore }}</span>
          </td>
          <td v-else>
            <p
              style="
                color: rgb(252, 94, 95);
                border: 1px solid rgb(252, 94, 95);
              "
            >
              缺考
            </p>
          </td>
        </tr>
      </tbody>
      <main-itps v-show="main_show"></main-itps>
    </table>
    <turn-page
      v-show="total > 10"
      :totaltotal="Number(total)"
      :size="Number(10)"
      @getData="getResult"
    ></turn-page>
  </div>
</template>
<script>
import turnPage from "../../components/turnPage";
import mainItps from "../../components/mainItps";
import editScore from "../../components/edit/editScore";
import selectBox from "../../components/selectBox";

export default {
  name: "teahcer-student",
  components: {
    turnPage,
    editScore,
    mainItps,
    selectBox,
  },
  data() {
    return {
      classrooms: "",
      classroomId: "",
      downloadClassroomId: "",
      downloadTestPaperId: "",
      examName: "",
      testPaperId: "",
      result: "",
      total: "",
      page: "",
      main_show: false,
      examNumber: "",
      editscore_show: false,
      records_show: false,
      load_show: false,
      editData: "",
      title_index: "",
      caseId: [],
      selected: "",
      uploadData: "",
    };
  },
  mounted() {
    this.getResult();
    this.getclassrooms();
  },
  methods: {
    //班级
    getclassrooms() {
      this.axios
        .get("classrooms", {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.classrooms = res.data.rows;
        });
    },
    //试卷名称二级联动
    getReport() {
      let id = "";
      if (this.load_show) {
        id = this.downloadClassroomId;
      } else {
        id = this.classroomId;
      }
      this.axios.get(`/case/report/testpaper/${id}`).then((res) => {
        this.testPaperId = "";
        this.examName = res.data;
      });
    },
    //获取数据与检索
    getResult(page = "1") {
      this.page = page;
      this.axios
        .get("/exam/result", {
          params: {
            classroomId: this.classroomId,
            testPaperId: this.testPaperId,
            page: page,
            size: "10",
          },
        })
        .then((res) => {
          if (res.data.rows.length == 0) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.examNumber = res.data.rows;
          this.total = res.data.total;
        });
    },
    // 打分
    editScore(item) {
      this.editscore_show = true;
      this.editData = item;
    },
    //查看
    seeExam(item) {
      if (!item.caseId) {
        this.$Message.error("当前考试无案例");
        return;
      }
      localStorage.setItem("caseId", item.caseId[0]);
      localStorage.setItem("examNo", item.examNo);
      this.caseId = item.caseId;
      localStorage.setItem("examNo", item.examNo);
      localStorage.setItem("caseUserId", item.userId);
      localStorage.setItem("caseId", item.caseId[0]);
      localStorage.setItem("ArrayCaseId", JSON.stringify(item.caseId));
      this.$router.push("ask");
    },
    //切换案例
    tapExam(caseId, index) {
      this.title_index = index;
      this.$store.state.examId = caseId;
    },
    close() {
      this.records_show = false;
    },
    submit() {
      if (!this.downloadClassroomId) {
        this.$Message.error("请选择班级!");
        return;
      }
      if (!this.downloadTestPaperId) {
        this.$Message.error("请选择试卷!");
        return;
      }
      this.axios
        .get("/exam/result", {
          params: {
            classroomId: this.downloadClassroomId,
            testPaperId: this.downloadTestPaperId,
            page: 1,
            size: "10",
          },
        })
        .then((res) => {
          if (res.data.total == 0) {
            this.$Message.error("当前试卷无信息!");
            return;
          }
          let url = this.$url.replace("/download/", "");
          window.location.href = `${url}/exam/result/save?classroomId=${this.downloadClassroomId}&testPaperId=${this.downloadTestPaperId}&page=1&size=${res.data.total}`;
        });
    },
  },
};
</script>


<style lang="scss">
.records {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgb(255, 255, 255);
  z-index: 999;
  .records_tile {
    width: 99%;
    height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(111, 147, 251);
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      li {
        width: 5%;
        cursor: pointer;
        position: relative;
        margin-right: 15px;
        p {
          display: none;
          position: absolute;
          width: 80%;
          height: 3px;
          background: rgb(111, 147, 251);
          border-radius: 2px;
          left: 10%;
          bottom: -13px;
        }
        .active {
          display: block;
        }
      }
    }
    .switch_close {
      position: absolute;
      font-size: 22px;
      right: 20px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>

