<template>
  <div class="user_map">
    <header>
      <ul>
        <li>
          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{ active_radio: show == 'myanswer' }"
            ></span>
            <input
              class="custom_none"
              type="radio"
              name="map"
              v-model="show"
              value="myanswer"
              @click="show = 'myanswer'"
            />
          </div>
          <label>我的答案</label>
        </li>
        <li>
          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{ active_radio: show == 'contrast' }"
            ></span>
            <input
              class="custom_none"
              type="radio"
              name="map"
              @click="show = 'contrast'"
            />
          </div>
          <label>答案对比</label>
        </li>
        <li>
          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{ active_radio: show == 'correct' }"
            ></span>
            <input
              class="custom_none"
              type="radio"
              name="map"
              @click="show = 'correct'"
            />
          </div>
          <label>正确答案</label>
        </li>
      </ul>
      <ul>
        <li>
          <i class="correct"></i>
          <span>正确答案</span>
        </li>
        <li>
          <i class="error"></i>
          <span>错误答案</span>
        </li>
        <li>
          <i class="forget"></i>
          <span>漏选答案</span>
        </li>
      </ul>
    </header>
    <main ref="map">
      <my-map
        v-show="show == 'myanswer'"
        :ask="ask"
        :watch="watch"
        :listen="listen"
        :press="press"
        :pulse="pulse"
        :width="width"
        :height="height"
      ></my-map>
      <correct-map
        v-show="show == 'correct'"
        :ask="ask"
        :watch="watch"
        :listen="listen"
        :press="press"
        :pulse="pulse"
        :correct="correct"
        :width="width"
        :height="height"
      ></correct-map>
      <contrast-map
        v-show="show == 'contrast'"
        :ask="ask"
        :watch="watch"
        :listen="listen"
        :press="press"
        :pulse="pulse"
        :correct="correct"
        :width="width"
        :height="height"
      />
    </main>
  </div>
</template>

<script>
import correctMap from "./correctMap";
import myMap from "./myMap";
import contrastMap from "./contrastMap";
export default {
  name: "user-map",
  components: {
    correctMap,
    contrastMap,
    myMap,
  },
  data() {
    return {
      caseId: "",
      examNo: "",
      show: "myanswer",
      ask: [],
      watch: [],
      listen: [],
      press: [],
      pulse: [],
      correct: "",
      width: "",
      height: "",
      time: "",
    };
  },
  mounted() {
    window.onresize = () => {
      if (this.timer) return;
      this.time = setTimeout(() => {
        this.width = this.$refs.map.offsetWidth;
        this.height = this.$refs.map.offsetHeight;
        clearTimeout(this.time);
      }, 1000);
    };
    this.width = this.$refs.map.offsetWidth;
    this.height = this.$refs.map.offsetHeight;
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getAsk();
    this.getWatch();
    this.getListen();
    this.getPress();
    this.getPulse();
    this.getcorrect();
  },
  methods: {
    getAsk() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          let asklist = [];
          for (let i = 0; i < res.data.length; i++) {
            asklist.push(
              new Promise((resolve) => {
                this.axios
                  .get(`/${this.examNo}/${this.caseId}/correctasked`, {
                    params: {
                      typeId: res.data[i].moduleId,
                    },
                  })
                  .then((res) => {
                    return resolve(res.data);
                  });
              })
            );
          }
          Promise.all(asklist).then((res) => {
            this.ask = [].concat(...res);
          });
        });
    },
    getWatch() {
      let watch = [];
      for (let i = 0; i < 3; i++) {
        this.axios
          .get(`/${this.examNo}/${this.caseId}/watched/${i}`)
          .then((res) => {
            try {
              res.data.forEach((item) => {
                watch.push(item);
              });
            } catch (error) {
              error;
            }
          });
      }
      this.watch = watch;
    },
    getListen() {
      this.axios.get(`/${this.examNo}/${this.caseId}/listened`).then((res) => {
        this.listen = res.data;
      });
    },
    getPress() {
      this.axios.get(`/${this.examNo}/${this.caseId}/press`).then((res) => {
        this.press = res.data;
      });
    },
    getPulse() {
      this.axios.get(`/${this.examNo}/${this.caseId}/pulse`).then((res) => {
        this.pulse = res.data;
      });
    },
    getcorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`)
        .then((res) => {
          this.correct = res;
        });
    },
  },
};
</script>

<style lang="scss">
.user_map {
  padding: 1%;
  width: 100%;
  height: 100%;
  header {
    width: 98%;
    height: 5%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        align-items: center;
        .custom_radio {
          margin: 0 10px;
        }
        label,
        span {
          margin-left: 5px;
          margin-right: 15px;
        }
        i {
          height: 30px;
          width: 15px;
        }
        .correct {
          background: rgb(111, 147, 251);
        }
        .error {
          background: rgb(254, 98, 102);
        }
        .forget {
          background: rgb(255, 200, 40);
        }
      }
    }
  }
  main {
    width: 98%;
    height: 95%;
    div {
      width: 100%;
      height: 100%;
    }
    .none_data {
      background: url("../../../assets/public/classroom.png") no-repeat center;
      position: relative;
      span {
        position: absolute;
        top: 400px;
        left: 680px;
      }
    }
  }
}
</style>