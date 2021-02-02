<template>
  <div class="home">
    <div class="main_mask" v-if="fractionshow"></div>
    <header class="home_header">
      <logo :exam="exam"></logo>
      <div class="home_user">
        <div class="home_case_left">
          <div class="stop" v-if="authority == 'STUDENT' && exam == null">
            <img
              src="../../../assets/public/stop.png"
              alt=""
              @click="stopTime"
            />
            <span @click="stopTime">暂停</span>
          </div>
          <div class="sonserve" @click="complete" v-if="authority == 'STUDENT'">
            <img src="../../../assets/public/sonserve.png" alt="" />
            <span>完成</span>
          </div>
          <div
            class="sonserve"
            @click="saveCase()"
            v-if="authority == 'TEACHER'"
          >
            <img src="../../../assets/public/sonserve.png" alt="" />
            <span>完成</span>
          </div>

          <div
            class="sonserve"
            @click="saveCase_show = true"
            v-if="authority == 'TEACHER'"
          >
            <img
              src="../../../assets/public/71a24bde9ce251874a5f2c6be1e3955.png"
              alt=""
            />
            <span>撤销</span>
          </div>
        </div>
      </div>
    </header>
    <div class="case_container">
      <div class="case_menu">
        <ul>
          <li
            v-for="(item, index) in item"
            :key="index"
            :class="{ active: bgIndex == index }"
            @click="routeLink(index)"
          >
            <span>{{ item.name }}</span>
          </li>
          <div class="timer" v-if="exam">
            <i></i>
            <div>
              <span v-if="hour >= 10">{{ hour }}:</span>
              <span v-else>0{{ hour }}:</span>
              <span v-if="mint >= 10">{{ mint }}:</span>
              <span v-else>0{{ mint }}:</span>
              <span v-if="second >= 10">{{ second }}</span>
              <span v-else>0{{ second }}</span>
            </div>
          </div>
        </ul>
      </div>
      <div class="case_main">
        <!-- 提交训练得分 -->
        <div class="edit_dele" v-if="number_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title">本次{{ exam ? "考试" : "训练" }}得分</span>
            </div>
            <ul>
              <li style="justify-content: center">
                <span style="font-size: 50px; font-weight: bold"
                  >{{ Math.round(fraction) }}分</span
                >
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_cancel"
                style="margin-right: 40px"
                @click="$router.push('index')"
              >
                返回首页
              </button>
              <button
                class="submit"
                v-if="!exam"
                @click="$router.push('userrecord')"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>

        <!-- 提交确认 -->
        <div class="edit_dele" v-if="confirm_show" style="z-index: 99999">
          <div class="edit">
            <div class="edit_title">
              <span class="title">提示</span>
            </div>
            <ul>
              <li style="justify-content: center">
                <span>您确认提交本次{{ exam ? "考试" : "训练" }}吗?</span>
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_cancel"
                style="margin-right: 40px"
                @click="
                  confirm_show = false;
                  fractionshow = false;
                "
              >
                取消
              </button>
              <button class="submit" @click="submit">确认</button>
            </div>
          </div>
        </div>
        <!-- 暂停确认 -->
        <div class="edit_dele" v-if="stop_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title">已暂停</span>
            </div>
            <ul>
              <li style="justify-content: center">
                <p style="font-weight: bold">案例训练已暂停</p>
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_cancel"
                style="margin-right: 40px"
                @click="$router.push('index')"
              >
                返回首页
              </button>
              <button class="submit" @click="startTime">继续训练</button>
            </div>
          </div>
        </div>
        <!-- 返回首页 -->
        <div class="edit_dele" v-if="index_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title">提 示</span>
            </div>
            <ul>
              <li style="text-align: center">
                <p style="font-weight: bold">确定返回首页并暂停案例训练吗</p>
                <span style="font-weight: bold"
                  >（您可以在个人中心-学习记录中继续完成没有完成的训练）</span
                >
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_cancel"
                style="margin-right: 40px"
                @click="$router.push('index')"
              >
                返回首页
              </button>
              <button class="submit" @click="startTime">继续训练</button>
            </div>
          </div>
        </div>
        <!-- 撤销案例 -->
        <div class="edit_dele" v-if="saveCase_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title">提示</span>
            </div>
            <ul>
              <li style="text-align: center">
                <span>确定放弃本次修改吗?</span>
              </li>
            </ul>
            <div class="edit_btn_box">
              <button class="edit_cancel" @click="saveCase_show = false">
                取消
              </button>
              <button class="submit" @click="revokeCase">确定</button>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../../../components/logo";
export default {
  name: "case-index",
  data() {
    return {
      item: [
        {
          name: "问",
          link: "editask",
        },
        {
          name: "望",
          link: "editlook",
        },
        {
          name: "闻",
          link: "edithear",
        },
        {
          name: "切",
          link: "editcut",
        },
        {
          name: "辩证",
          link: "editdialectical",
        },
        {
          name: "治疗",
          link: "edittreatment",
        },
      ],
      fractionshow: false,
      fraction: "",
      bgIndex: "0",
      authority: "",
      examNo: "",
      time: "",
      confirm_show: false,
      number_show: false,
      stop_show: false,
      index_show: false,
      exam: null,
      hour: 0,
      mint: 0,
      second: 0,
      duringLimit: "",
      saveCase_show: false,
      total: 0,
      endtime: "",
      totalExam: "",
      timerTotal: "",
    };
  },
  components: {
    logo,
  },
  mounted() {
    this.exam = localStorage.getItem("exam");
    this.examNo = localStorage.getItem("examNo");
    this.authority = localStorage.getItem("authority");
    if (this.bgIndex == "0") {
      localStorage.getItem("caseMenuId")
        ? (this.bgIndex = localStorage.getItem("caseMenuId"))
        : "0";
    }

    if (this.authority == "STUDENT") {
      this.item = [
        {
          name: "问",
          link: "userask",
        },
        {
          name: "望",
          link: "userlook",
        },
        {
          name: "闻",
          link: "userHear",
        },
        {
          name: "切",
          link: "usercut",
        },
        {
          name: "辩证",
          link: "userdialectical",
        },
        {
          name: "治疗",
          link: "usertreatment",
        },
      ];
    }
    this.totalExam = localStorage.getItem("total");
    if (!this.totalExam) {
      localStorage.setItem("total", 1);
    }
    let exam_flag = localStorage.getItem("exam");
    if (exam_flag) {
      var de = document.documentElement;
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }

      this.axios.get("/exam").then((res) => {
        let startTime = res.data[0].startTime;
        let beginTime = res.data[0].beginTime;
        let endTime = res.data[0].endTime;
        let systemTime = res.data[0].systemTime;
        //考试时长
        let duringLimit = res.data[0].duringLimit * (1000 * 60);
        //考试结束时间-考试开始时间
        let diff_1 = endTime - beginTime;
        // 已用时间
        let diff_2 = systemTime - startTime;
        //如果duringLimit<diff_1 则用duringLimit
        if (duringLimit < diff_1) {
          this.duringLimit = duringLimit - diff_2;
        } else {
          this.duringLimit = diff_1 - diff_2;
        }
        this.hour = parseInt(
          (this.duringLimit % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.mint = parseInt(
          (this.duringLimit % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.second = parseInt((this.duringLimit % (1000 * 60)) / 1000);
        this.timerTotal = setInterval(() => {
          this.countDown();
        }, 1000);
        this.disableExam();
      });
    } else {
      this.startTime();
    }
  },
  methods: {
    routeLink(i) {
      this.bgIndex = i;
      localStorage.setItem("caseMenuId", i);
      this.$router.push(this.item[i].link);
    },
    saveCase() {
      this.$router.push("/teachercase");
    },
    revokeCase() {
      let caseId = localStorage.getItem("caseId");
      this.axios.delete(`/case/manage/draft/${caseId}`).then((res) => {
        if (res.code == "000000") {
          this.$router.push("/teachercase");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //点击完成
    complete() {
      let exam = localStorage.getItem("exam");
      if (exam) {
        this.$router.push("examcase");
      } else {
        this.confirm_show = true;
        this.fractionshow = true;
      }
    },
    submit() {
      this.number_show = true;
      this.confirm_show = false;
      this.axios.post(`/train/${this.examNo}/finished`).then((res) => {
        if (res.code == "000000") {
          this.fraction = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //案例训练开始计时
    stopTime() {
      this.fractionshow = true;
      this.stop_show = true;
      clearInterval(this.time);
    },
    //案例训练停止计时
    startTime() {
      this.fractionshow = false;
      this.stop_show = false;
      this.index_show = false;
      this.time = setInterval(() => {
        this.http.put(
          `/exam/${this.examNo}/during?${this.qs.stringify({
            during: 30,
          })}`
        );
      }, 30000);
    },
    //正式考试倒计时
    countDown() {
      if (this.hour == 0 && this.mint == 0 && this.second == 0) {
        clearInterval(this.timerTotal);
        this.second = 0;
        let examNo = localStorage.getItem("examNo");
        this.$MessageBox.alert("您考试时间已到,自动为您提交本次考试!", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: () => {
            this.number_show = true;
            this.fractionshow = true;
          },
        });
        localStorage.removeItem("total");
        this.axios.put(`/exam/${examNo}/finished`).then((res) => {
          this.fraction = res.data;
        });
        return;
      }
      this.duringLimit -= 1000;
      this.hour = parseInt(
        (this.duringLimit % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.mint = parseInt((this.duringLimit % (1000 * 60 * 60)) / (1000 * 60));
      this.second = parseInt((this.duringLimit % (1000 * 60)) / 1000);
    },
    //禁用考试项
    disableExam(flag) {
      document.oncontextmenu = function () {
        return flag;
      };
      document.onkeydown = function () {
        var e = window.event || arguments[0];
        if (e.keyCode == 123) {
          return flag;
        }
      };
      if (flag) {
        window.onblur = "";
        window.onbeforeunload = "";
        return;
      }
      let _this = this;
      window.onblur = function () {
        let total = localStorage.getItem("total");
        if (total >= 4) {
          let examNo = localStorage.getItem("examNo");
          _this.axios.put(`/exam/${examNo}/finished`).then((res) => {
            _this.fraction = res.data;
            clearInterval(_this.timerTotal);
            localStorage.removeItem("total");
            _this
              .$confirm(`您已经离开考试界面超过3次自动提交本次考试!`, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              })
              .then(() => {
                window.onblur = "";
                window.onbeforeunload = "";
                _this.fractionshow = true;
                _this.number_show = true;
              });
          });
          return;
        }
        _this.$confirm(
          `您已经离开考试界面${total}次,超过3次将会自动提交本次考试!`,
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        );
        total++;
        localStorage.setItem("total", total);
      };
      window.onbeforeunload = function (e) {
        var a = window.event || e;
        a.returnValue = "确定离开当前页面吗？";
      };
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "examcase") {
      clearInterval(this.timerTotal);
      clearInterval(this.time);
      this.disableExam(true);
      next();
      return;
    }
    clearInterval(this.timerTotal);
    clearInterval(this.time);
    this.disableExam(true);
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
.home_case_left {
  margin-right: 50px;
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    img {
      margin-bottom: 5px;
    }
  }

  div:hover {
    cursor: pointer;
    color: rgb(111, 147, 251);
  }
}
.case_container {
  width: 100%;
  height: 88%;
  margin-top: 1%;
  display: flex;
  .case_menu {
    width: 5%;
    height: 100%;
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        height: 6%;
        margin-top: 30px;
        border: 3px solid rgb(111, 147, 251);
        border-left: none;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(111, 147, 251);
        span {
          font-size: 1.4em;
          text-decoration: none;
        }
      }
      li:nth-child(1) {
        margin-top: 0;
      }
      .active {
        background: rgb(111, 147, 251);
        color: rgb(255, 255, 255);
      }
      li:hover {
        background: rgb(111, 147, 251);
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
  }
  .case_main {
    width: 91%;
    height: 100%;
    margin-left: 2%;
    background: rgb(255, 255, 255, 0.82);
    border-radius: 20px;
  }
}
.case_menu {
  ul {
    position: relative;
    .timer {
      width: 100%;
      bottom: 0;
      position: absolute;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      i {
        width: 40px;
        height: 40px;
        background: url("../../../assets/public/time.png") no-repeat;
      }
      span {
        font-size: 18px;
      }
    }
  }
}
</style>