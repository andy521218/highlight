<template>
  <div class="case_exam">
    <div class="case_exam_top">
      <div class="case_exam_examumber">
        <div class="tarin_top_item_title">
          <i></i>
          <span>考试成绩</span>
          <p class="train_bottom_right_people">分数</p>
          <div class="tarin_top_item_title_itps">注:滚动鼠标滑轮翻页</div>
        </div>
        <div class="exam_none" v-show="exam_show">
          <img
            class="case_exam_top_itps"
            src="../../../assets/public/number.png"
            alt=""
          />
          <span>暂无数据</span>
        </div>
        <div class="case_exam_main_number">
          <div
            class="case_exam_main_number_block"
            v-for="(item, index) in score"
            :key="index"
          >
            <span>{{ parseInt(item.score) }}分</span>
            <img
              :style="{ height: item.height + '%' }"
              src="../../../assets/public/452f0ad494a800823f29c9f1608c38d.png"
              alt=""
            />
          </div>
        </div>
        <div class="case_exam_examumber_list">
          <span v-for="(item, index) in name" :key="index">{{
            index | sortNumber(page)
          }}</span>
        </div>
      </div>
      <div class="caee_exam_classrommsort">
        <div class="tarin_top_item_title">
          <i class="violet"></i>
          <span>班级排名</span>
          <p class="train_bottom_right_people">名次</p>
          <div class="tarin_top_item_title_itps">注:滚动鼠标滑轮翻页</div>
        </div>
        <div class="exam_none" v-show="!classroom_show">
          <img
            class="case_exam_top_itps"
            src="../../../assets/public/number.png"
            alt=""
          />
          <span>暂无数据</span>
        </div>

        <div class="case_exam_main_classroom" ref="classroom">
          <canvas id="canvas"></canvas>
        </div>
        <div class="case_exam_main_classroom_list">
          <span v-for="(item, index) in name" :key="index">{{
            index | sortNumber(page)
          }}</span>
        </div>
      </div>
    </div>
    <div class="case_exam_bottom">
      <ul>
        <li v-for="(item, index) in itemName" :key="index">
          <p>{{ index | sortNumber(page) }}</p>
          <span>{{ item.name }}</span>
          <span
            style="color: rgb(252, 94, 95); margin-left: 5px"
            v-if="item.flag == 0"
            >(缺考)</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-exam",
  data() {
    return {
      exam_show: true,
      classroom_show: true,
      size: 10,
      page: "1",
      name: [],
      rank: [],
      score: [],
      sortHeight: [],
      itemName: [],
      time: "",
      classroom_timer: "",
      canvasH: "",
      canvasW: "",
      total: "",
    };
  },
  mounted() {
    this.getReport();
    this.canvasW = this.$refs.classroom.offsetWidth;
    this.canvasH = this.$refs.classroom.offsetHeight;
    window.addEventListener("mousewheel", this.handleScroll);
    window.onresize = () => {
      if (this.classroom_timer) return;
      this.classroom_timer = setTimeout(() => {
        this.canvasW = this.$refs.classroom.offsetWidth;
        this.canvasH = this.$refs.classroom.offsetHeight;
        this.classroomSort(this.canvasW);
        this.classroom_timer = "";
      }, 1000);
    };
  },
  methods: {
    handleScroll(e) {
      clearTimeout(this.time);
      if (this.name.length < 10 && this.total < 10) {
        if (e.wheelDelta < 1) {
          return;
        }
      }
      if (this.page == "1") {
        if (e.wheelDelta > 1) {
          return;
        }
      }
      this.time = setTimeout(() => {
        if (e.wheelDelta > 1) {
          this.page--;
          this.getReport();
        } else {
          this.page++;
          this.getReport();
        }
      }, 800);
    },
    getReport() {
      this.axios
        .get("/my/exam/report", {
          params: {
            size: this.size,
            page: this.page,
          },
        })
        .then((res) => {
          this.itemName = res.data.rows;
          this.total = res.data.total;
          this.name = [];
          this.rank = [];
          this.score = [];
          if (res.data.length == 0) {
            this.exam_show = true;
            return;
          } else {
            this.exam_show = false;
          }
          res.data.rows.forEach((item, index) => {
            this.name.push(item.name);
            this.rank.push(item.rank);
            this.score.push({
              score: item.score,
              height: (item.score / 100) * 100,
            });
            if (res.data.rows.length - 1 == index) {
              this.classroomSort(this.canvasW);
            }
          });
        });
    },
    classroomSort(canvasW) {
      this.sortHeight = [];
      let canvas = document.getElementById("canvas");
      canvas.width = this.canvasW;
      canvas.height = this.canvasH;
      let arr = JSON.parse(JSON.stringify(this.rank));
      arr = arr.sort();
      let min = arr[0],
        max = arr[arr.length - 1];
      this.itemName.forEach((item, index) => {
        if (item.flag == 0) {
          this.rank[index] = max;
        }
      });
      this.rank.forEach((item) => {
        if (item == 1) {
          this.sortHeight.push(this.canvasH * 0.15);
        } else if (item == max) {
          this.sortHeight.push(this.canvasH * 0.9);
        } else {
          this.sortHeight.push(
            (item / (max - min)) * this.canvasH * 0.444 + 20
          );
        }
      });

      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgb(111,147,251)";
      ctx.font = "18px Arial";
      ctx.fillStyle = "rgb(60,190,250)";
      ctx.beginPath();
      let x = canvasW * 0.111 * 0.49;
      this.sortHeight.forEach((item, index) => {
        ctx.lineTo(x, item);
        ctx.fillText(this.rank[index] + "名", x - 15, item - 15);
        let img = new Image();
        // img.src = `http://localhost:8080/api/download/61/1608018030700.png`;
        img.src = `${this.$url}50/1609136198447.png`;
        (() => {
          let img_x = x;
          img.onload = () => {
            ctx.drawImage(img, img_x - 10, item - 10, 20, 20);
          };
        })();
        x += canvasW * 0.111;
        if (this.sortHeight.length - 1 == index) {
          ctx.stroke();
        }
      });
    },
  },
  watch: {
    page: function () {
      this.getReport();
    },
  },
};
</script>

<style lang="scss">
.case_exam {
  width: 100%;
  height: 100%;
  padding: 1% 0;
  .exam_none {
    position: absolute;
    width: 32.5%;
    height: 33.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    span {
      color: rgb(111, 147, 251);
      font-size: 1.2em;
      font-weight: bold;
    }
  }
  .tarin_top_item_title_itps {
    position: absolute;
    right: 15px;
  }
  .train_bottom_right_people {
    position: absolute;
    bottom: 0;
    left: 3.5%;
  }
  .case_exam_top {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: space-between;
    color: rgb(111, 147, 251);
    .case_exam_examumber {
      width: 49%;
      height: 100%;
      background: url("../../../assets/public/0e0644c15de83e6b6f7e1b6b02d589e.png")
        no-repeat center;
      background-size: 100% 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .case_exam_main_number {
        border: 1px solid rgb(111, 147, 251);
        border-top: none;
        border-right: none;
        width: 90%;
        height: 75%;
        display: flex;
        .case_exam_main_number_block {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 11.1%;
          justify-content: flex-end;
          img {
            width: 25px;
            height: 25px;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;
          }
        }
      }
      .case_exam_examumber_list {
        width: 90%;
        height: 8%;
        margin: 0 auto;
        display: flex;
        text-align: center;
        align-items: center;
        position: relative;
        span {
          width: 11.1%;
        }
      }
    }
    .caee_exam_classrommsort {
      background: url("../../../assets/public/0e0644c15de83e6b6f7e1b6b02d589e.png")
        no-repeat center;
      background-size: 100% 100%;
      width: 49%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .case_exam_main_classroom {
        width: 90%;
        height: 75%;
        border: 1px solid rgb(111, 147, 251);
        border-top: none;
        border-right: none;
      }
      .case_exam_main_classroom_list {
        width: 90%;
        height: 8%;
        margin: 0 auto;
        display: flex;
        text-align: center;
        align-items: center;
        position: relative;
        span {
          width: 11.1%;
        }
      }
    }
  }
  .case_exam_bottom {
    width: 100%;
    height: 10%;
    ul {
      width: 100%;
      height: 100%;
      align-items: center;
      display: flex;
      li {
        display: flex;
        width: 10%;
        p {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: rgb(111, 147, 251);
          border-radius: 3px;
          margin-right: 5px;
          color: rgb(255, 255, 255);
        }
        span {
          color: rgb(111, 147, 251);
        }
      }
      li:first-child {
        margin-left: 20px;
      }
    }
  }
}
</style>