    <template>
  <div class="teacher case release">
    <div class="main_mask" v-if="mask"></div>
    <!-- 发布考试 -->
    <div class="edit release_exam" v-if="releaseExam_show">
      <div class="edit_title">
        <span class="title">发布考试</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-model="examData.name"
            placeholder="请输入考试名称"
          />
          <p class="edit_tips">{{ nameText }}</p>
        </li>
        <li style="display: flex">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试班级:</span>
          </div>
          <selectBox
            :listData="classrooms"
            :typeId="'rommsId'"
            :itemName="'name'"
            :itemId="'id'"
       
          ></selectBox>

          <p class="edit_tips">{{ roomsText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">开始时间:</span>
          </div>
          <el-date-picker
            v-model="starttime"
            type="datetime"
            v-on:blur="start"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          <p class="edit_tips">{{ startText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">结束时间:</span>
          </div>
          <el-date-picker
            v-model="endtime"
            type="datetime"
            v-on:blur="end"
            placeholder="选择结束时间"
          >
          </el-date-picker>
          <p class="edit_tips">{{ endText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试时长:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-model="examData.examTime"
            placeholder="请输入考试时长"
          />
          <p class="edit_tips">{{ examText }}</p>
        </li>
      </ul>
      <div class="number scrollbar">
        <div class="number_itps">
          <p>案例总分值累计应为100分</p>
        </div>
        <div class="number_title">
          <span>案例</span>
          <span>分值</span>
        </div>
        <div class="ul_scrollbar">
          <ul class="case_item">
            <li v-for="(item, index) in check" :key="index">
              <span>{{ item }}</span>
              <input
                type="text"
                class="text_box"
                v-model="examCaseNumber[item]"
                placeholder="请输入分数"
                @change="totalNumber"
              />
            </li>
          </ul>
        </div>
        <div class="bottom_text">
          <p>目前案例分数:</p>
          {{ examNumber }}分
        </div>
      </div>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
    <div class="main_header">
      <div class="main_header_left">
        <button class="add" @click="add">发布考试</button>
      </div>
      <div class="main_header_right">
        <selectBox
          :listData="list"
          :typeId="'diseaseType'"
          :itemName="'name'"
          :itemId="'diseaseType'"
          :defaultTitle="'请选择病系'"
        ></selectBox>
        <button class="submit" @click="getManage('1')">检索</button>
      </div>
    </div>
    <div class="main_table" style="height: 80%">
      <main-itps v-show="main_show" :title="'请先添加考核案例'"></main-itps>
      <ul class="caseList" v-show="!main_show">
        <li v-for="(item, index) in manageData" :key="index">
          <div class="case_user_item_box">
            <div class="case_top">
              <img :src="$url + item.picUrl" alt="" />
              <div class="state">
                <div class="custom_radio">
                  <span
                    class="custom_text"
                    :class="{ active_checkbox: item.active == true }"
                  ></span>
                  <input
                    type="checkbox"
                    class="custom_none"
                    v-model="check"
                    :value="item.name"
                    @click="item.active = !item.active"
                  />
                </div>
                <div class="state_item">
                  <div class="item_three" v-if="item.exam">考</div>
                </div>
              </div>
            </div>
            <div class="case_bottom">
              <span>姓名: {{ item.name }}</span>
              <span>性别: {{ item.gender ? "男" : "女" }}</span>
              <span>年龄: {{ item.age }}岁</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <turn-page
      ref="turnPage"
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getManage"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import mainItps from "../../components/mainItps";
import selectBox from "../../components/selectBox";

export default {
  name: "teacher-release",
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
      starttime: "",
      endtime: "",
      diseaseType: "",
      manageData: [],
      total: "",
      size: "10",
      caseId: "",
      releaseExam_show: false,
      mask: false,
      check: [],
      searchOptions: "",
      screenWidth: "",
      examData: {},
      classrooms: "",
      nameText: "",
      roomsText: "",
      startText: "",
      endText: "",
      examText: "",
      examNumber: 0,
      flag: true,
      examCase: [],
      examCaseNumber: {},
      main_show: false,
      rommsId: "1111111111",
      active: null,
    };
  },
  mounted() {
    localStorage.removeItem("caseMenuId");
    this.getManage();
    this.getClassroom();
  },
  methods: {
    add() {
      if (this.check.length == "0")
        return this.$Message.error("至少选择一下案例");
      this.mask = true;
      this.releaseExam_show = true;
    },
    start() {
      this.flag = true;
      this.startText = "";
      this.endText = "";
      this.starttime = new Date(this.starttime).getTime();
      let time = new Date().getTime();
      if (this.starttime < time) {
        this.startText = "开始时间早于当前时间";
        this.flag = false;
        return;
      }
      if (!this.endtime) return;
      if (this.starttime > this.endtime) {
        this.endText = "结束时间早于开始时间";
        this.flag = false;
        return;
      }
    },
    end() {
      this.flag = true;
      this.startText = "";
      this.endText = "";
      this.endtime = new Date(this.endtime).getTime();
      if (!this.starttime) return;
      let time = new Date().getTime();
      if (this.starttime < time) {
        this.startText = "开始时间早于当前时间";
        this.flag = false;
        return;
      }
      if (this.starttime > this.endtime) {
        this.endText = "结束时间早于开始时间";
        this.flag = false;
        return;
      }
    },
    close() {
      this.mask = false;
      this.check = [];
      this.examCaseNumber = {};
      this.examData = {};
      this.starttime = "";
      this.endtime = "";
      this.releaseExam_show = false;
      this.rommsId = "";
      this.startText=''
      this.endText ='';
      this.manageData.forEach((item) => (item.active = false));
    },
    //获取案例列表
    getManage(page = "1") {
      let isExam = true,
        isTrain = true,
        isCompelete = "";
      this.axios
        .get("/case/manage", {
          params: {
            diseaseType: this.diseaseType,
            isExam: isExam,
            isTrain: isTrain,
            isCompelete: isCompelete,
            size: this.size,
            page: page,
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.main_show = true;
            return;
          } else {
            this.main_show = false;
          }
          this.total = res.data.total;
          res.data.rows.forEach((item) => {
            item.active = false;
            this.manageData.push(item);
          });
        });
    },
    //获取班级列表
    getClassroom() {
      this.axios
        .get("/classrooms", {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.classrooms = res.data.rows;
        });
    },
    //提交
    submit() {
      try {
        this.examData.name.trim()
      } catch (error) {
        this.nameText = "请输入考试名称"
        return error
      }
      if (!this.examData.name.trim()) {
        return (this.nameText = "请输入考试名称");
      } else {
        this.nameText = "";
      }
      if (!this.rommsId) {
        console.log(this.rommsId);
        return (this.roomsText = "请选择班级");
      } else {
        this.roomsText = "";
      }
      if (!this.starttime) {
        return (this.startText = "请选择开始时间");
      } else {
        this.startText = "";
      }
      if (!this.endtime) {
        return (this.endText = "请选择结束时间");
      } else {
        this.endText = "";
      }
      if (!this.examData.examTime.trim()) {
        this.examText = "请输入考试时长";
        return;
      }
      if (isNaN(this.examData.examTime)) {
        this.examText = "请输入正确的数字";
        return;
      }
      this.examText = "";
      this.start();
      this.end();
      let obj = Object.keys(this.examCaseNumber);
      if (obj.length > 0) {
        this.uploadexam();
      } else {
        this.check.forEach((ele) => {
          this.examCaseNumber[ele] = "";
        });
        this.uploadexam();
      }
    },
    //上传发布考试
    uploadexam() {
      let obj = Object.keys(this.examCaseNumber).length;
      if (obj != this.check.length) {
        this.$Message.error("请检查案例分值不可为空");
        return;
      }
      for (const key in this.examCaseNumber) {
        if (!this.examCaseNumber[key]) {
          this.$Message.error("请检查案例分值不可为空");
          return;
        }
      }
      if (this.examNumber != "100") {
        this.$Message.error("请重新设置各项案例分数,总分应为100分!");
        return;
      }
      let cases = [];
      for (let key in this.examCaseNumber) {
        this.manageData.forEach((item) => {
          if (item.name == key) {
            cases.push({
              caseId: item.caseId,
              score: this.examCaseNumber[key],
            });
          }
        });
      }
      this.http
        .post("/exam", {
          cases,
          classes: [
            {
              beginTime: this.starttime,
              classroomId: this.rommsId,
              endTime: this.endtime,
              duringLimit: this.examData.examTime,
            },
          ],
          name: this.examData.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.close();
            this.$Message.warning("发布考试成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 计算分数
    totalNumber() {
      this.examNumber = 0;
      for (const key in this.examCaseNumber) {
        this.examNumber += Number(this.examCaseNumber[key]);
      }
    },
  },
};
</script>

<style lang="scss">
.case {
  .release_exam {
    position: absolute;
    z-index: 9;
    left: 50%;
    margin-left: -235px;
    // z-index: 99999;
    .number {
      margin-left: 13%;
      margin-top: 20px;
      width: 72%;
      span {
        display: inline-block;
        width: 50%;
        text-align: center;
      }
      span:first-child {
        border-right: 1px solid rgb(111, 147, 251);
      }
      .number_title {
        border: 1px solid rgb(111, 147, 251);
        border-bottom: none;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
      }
      .ul_scrollbar {
        border: 1px solid rgb(111, 147, 251);
        border-bottom: none;
        .case_item {
          width: 100%;
          margin-left: 0;
          max-height: 60px;
          overflow-y: auto;
          li {
            margin-top: 0;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid rgb(111, 147, 251);
            .text_box {
              text-align: center;
              padding-left: 0;
              width: 50%;
              height: 28px;
              border: none;
            }
          }
        }
      }
      .bottom_text {
        margin-top: 10px;
        display: flex;

        justify-content: space-between;
      }
      .number_itps {
        display: flex;

        justify-content: space-between;
      }
    }
    .edit_btn_box {
      margin: 20px auto;
    }
  }
  .el-date-editor
    .el-input
    .el-input--prefix
    .el-input--suffix
    .el-date-editor--datetime {
    z-index: 999999;
  }
  .el-date-editor--datetime {
    width: 51%;
  }
  .el-input__inner {
    background: rgb(240, 246, 255);
    border: rgb(111, 147, 251) 1px solid;
    color: rgb(111, 147, 251);
    width: 100%;
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgb(111, 147, 251);
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgb(111, 147, 251);
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgb(111, 147, 251);
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgb(111, 147, 251);
  }
  ::-webkit-scrollbar {
    width: 0;
  }
}
.release {
  .main_mask {
    z-index: 9;
  }
}
</style>