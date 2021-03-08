<template>
  <div class="pulse diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask" v-if="imgShow"></div>
      <div class="edit" v-if="imgShow">
        <div class="edit_title">
          <span class="title">{{ puleseTitle }}诊断结果</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉诊名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="pulseShow"
              placeholder="请输入脉诊名称"
              v-model="pulse.name"
            />
            <span class="edit_text_i" v-else>{{ pulse.name }}</span>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉诊描述:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="pulseShow"
              placeholder="请输入脉诊描述"
              v-model="pulse.description"
            />
            <span class="edit_text_i" v-else>{{ pulse.description }}</span>
          </li>
          <li class="display" style="align-items: flex-start">
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉诊图片:</span>
            </div>
            <div class="uploadImg1">
              <div class="mask" v-show="!imgUrl"></div>
              <img :src="imgUrl" v-show="imgUrl" class="tipsImg" alt="" />
              <input
                type="file"
                ref="imgs"
                @change="uploadImg1"
                v-show="pulseShow"
              />
              <img
                :class="{ option: imgUrl != '' }"
                src="../../../assets/public/uploadImg1.png"
                alt
                v-if="pulseShow"
              />
            </div>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="editSwitch()" v-if="pulseShow">
            取消
          </button>
          <button class="edit_submit" @click="submitPulse" v-if="pulseShow">
            确定
          </button>
        </div>
      </div>
      <!-- 左侧内容 -->
      <div class="cont_header">脉诊</div>
      <div class="scrollbar">
        <ul>
          <li v-for="(item, index) in pulseData" :key="index">
            <div class="item_cont">
              <div class="item_left">
                <i></i>
                <!--                <span>{{reg(item.name) }}</span>-->
                <span>{{ item.name }}</span>
              </div>
              <div class="item_container_between">
                <div style="width: 100%">
                  <span @click="seePulse(item)">查看</span>
                  <span @click="editPulse(item)">编辑</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <button class="addResult" @click="editImg()">+</button>
      <!-- <button @click="fn">++++++++++++++</button> -->
    </div>
    <div class="cont_bg right">
      <!-- 弹窗 -->
      <div class="mask" v-if="addCont"></div>
      <div class="edit" v-if="addCont">
        <div class="edit_title">
          <span class="title">添加按诊结果</span>
          <span class="edit_switch" @click="addSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">按诊部位:</span>
            </div>
            <select-box
              :defaultTitle="'请选择按诊部位'"
              :listData="itemDown"
              :typeId="'diagnosisName'"
              :itemId="'name'"
              :itemName="'name'"
            ></select-box>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">检查结果:</span>
            </div>
            <input
              type="text"
              class="text_box"
              placeholder="请以逗号分隔"
              v-model="diagnosis.options"
            />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="addSwitch()">取消</button>
          <button class="edit_submit" @click="submitDiagnosis()">确定</button>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="cont_header">按诊</div>
      <div class="scrollbar">
        <ul ref="scroll">
          <li v-for="(item, index) in diagnosisData" :key="index">
            <div class="item_cont" style="justify-content: flex-start">
              <div class="item_left" style="width: 13%">
                <i></i>
                <span>{{ item.name }}</span>
              </div>
              <div class="ietm_options">
                <span v-for="(i, index) in item.options" :key="index">{{
                  i
                }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <button class="addResult" @click="addResult()">+</button>
    </div>
  </div>
</template>

<script>
import selectBox from "../../../components/selectBox";

export default {
  name: "pulse-diagnosis",
  components: {
    selectBox,
  },
  data() {
    return {
      className: "",
      imgShow: false,
      addCont: false,
      pulse: {},
      pulseShow: true,
      pulseData: "",
      diagnosis: {},
      diagnosisData: "",
      puleseTitle: "",
      itemDown: [
        {
          name: "右胸",
        },
        {
          name: "胸膺",
        },
        {
          name: "左胸",
        },
        {
          name: "右胁肋",
        },
        {
          name: "心下",
        },
        {
          name: "左胁肋",
        },
        {
          name: "虚里",
        },
        {
          name: "胃脘",
        },
        {
          name: "大腹",
        },
        {
          name: "小腹",
        },
        {
          name: "左腹",
        },
        {
          name: "右腹",
        },
        {
          name: "下肢",
        },
        {
          name: "足背",
        },
      ],
      imgsData: "",
      imgUrl: "",
      feelId: "",
      selectdefault: undefined,
      diagnosisName: "",
    };
  },
  mounted() {
    this.getData0();
    this.getData1();
  },
  methods: {
    editImg() {
      this.puleseTitle = "添加";
      this.imgShow = true;
    },
    editSwitch() {
      this.pulse = {};
      this.imgUrl = "";
      this.pulseShow = true;
      this.imgShow = false;
      this.getData0();
    },
    addResult() {
      this.addCont = true;
    },
    addSwitch() {
      this.diagnosis = {};
      this.addCont = false;
    },
    getData0() {
      this.axios.get(`/meta/feel/0`).then((res) => {
        this.pulseData = res.data;
      });
    },
    getData1() {
      this.axios.get(`/meta/feel/1`).then((res) => {
        this.diagnosisData = res.data;
      });
    },
    getText(val) {
      let index = this.itemDown.indexOf(val);
      if (index > "-1") {
        if (!this.diagnosisData[index].id) {
          return;
        } else {
          this.diagnosis.options = this.diagnosisData[index].options.toString();
          this.feelId = this.diagnosisData[index].id;
        }
      }
    },
    submitDiagnosis() {
      if (!this.feelId) {
        if (!this.diagnosisName) {
          return this.$Message.warning("请选择按诊类别");
        }
        this.diagnosis.name = this.diagnosisName;
        if (!this.diagnosis.options)
          return this.$Message.warning("请填写按诊结果");
        this.diagnosis.options = this.diagnosis.options.split(",");
        this.http.post(`/meta/feel/1`, this.diagnosis).then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("添加成功!");
            setTimeout(() => {
              this.$refs.scroll.scrollTop =
                this.$refs.scroll.scrollHeight + 155;
            }, 300);
            this.getData1();
            this.addSwitch();
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.diagnosis.options = this.diagnosis.options.split(",");
        this.http
          .put(`/meta/feel/1/${this.feelId}`, this.diagnosis)
          .then((res) => {
            if (res.code == "000000") {
              this.$Message.warning("添加成功!");
              this.getData1();
              this.addSwitch();
            } else {
              this.$Message.error(res.msg);
            }
          });
      }
    },
    postPulse(methods, url, config) {
      if (!this.pulse.name) return this.$Message.error("请填写脉诊名称");
      if (!this.pulse.description)
        return this.$Message.warning("请填写脉诊描述");
      if (this.imgUrl.length > 1000) {
        if (!this.imgsData) return this.$Message.error("请先选择图片");
        let imgData = new window.FormData();
        imgData.append("file", this.imgsData);
        this.upload.post("/upload", imgData).then((res) => {
          if (res.code == "000000") {
            this.pulse.picUrl = res.data;
            this.http[methods](url, this.pulse).then((res) => {
              if (res.code == "000000") {
                this.$Message.warning(`${config}成功!`);
                this.editSwitch();
                this.imgShow = false;
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.picUrl = this.imgUrl;
        this.http[methods](url, this.pulse).then((res) => {
          if (res.code == "000000") {
            this.$Message.warning(`${config}成功!`);
            this.editSwitch();
            this.imgShow = false;
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    uploadImg1() {
      this.imgsData = this.$refs.imgs.files[0];
      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.imgsData);
      fileExample.onload = (ev) => {
        this.imgUrl = ev.target.result;
      };
    },

    submitPulse() {
      if (this.pulse.id) {
        return this.postPulse("put", `/meta/feel/0/${this.pulse.id}`, "编辑");
      }
      this.postPulse("post", "/meta/feel/0", "添加");
    },

    seePulse(item) {
      this.imgUrl = this.$url + item.picUrl;
      this.pulseShow = false;
      this.pulse = item;
      this.imgShow = true;
      this.puleseTitle = "查看";
    },
    editPulse(item) {
      this.imgUrl = this.$url + item.picUrl;
      this.pulseShow = true;
      this.pulse = item;
      this.imgShow = true;
      this.puleseTitle = "编辑";
      this.class_show = false;
    },
  },
};
</script>
<style lang="scss">
.pulse {
  .cont_bg {
    width: 40%;

    .edit {
      margin: 0 12%;

      ul {
        height: auto;

        li {
          border: none;
        }
      }
    }

    ul {
      .edit_text_i {
        width: 70%;
        text-align: left;
      }

      .display {
        display: flex;

        .uploadImg1 {
          width: 70%;
          height: 9em;
          background: rgb(240, 246, 255);
          border: rgb(111, 147, 251) 1px solid;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          .tipsImg {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: 0 0;
            top: 0;
            left: 0;
          }

          input {
            width: 35%;
            height: 80%;
            position: absolute;
            opacity: 0;
            z-index: 100;
          }

          img {
            max-width: 100%;
            max-height: 100%;
            position: absolute;
          }

          .option {
            opacity: 0.7;
            z-index: 99;
          }

          .mask {
            pointer-events: none;
          }
        }
      }

      li {
        .ietm_options {
          width: 90%;
          text-align: left;

          span {
            padding: 0 2%;
            color: rgb(111, 147, 251);
            border-left: 1px solid rgb(111, 147, 251);
          }
        }
      }
    }

    .edit.big ul li input,
    .edit.big ul li .select {
      width: 410px;
    }

    .edit.big .edit_cancel {
      margin-left: 165px;
    }
  }

  .right {
    .edit_class {
      overflow-y: visible;

      input {
        width: 53%;
      }
    }

    .select_title_text {
      text-align: left;
    }
  }
}
</style>
