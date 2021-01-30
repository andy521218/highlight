<template>
  <div class="prescription diagnosis">
    <!-- 左侧内容 -->
    <div class="cont_bg">
      <!-- 左侧弹窗 -->
      <div class="mask" v-if="drug"></div>
      <div class="edit" v-show="drug">
        <div class="edit_title">
          <span class="title">添加常见方剂</span>
          <span class="edit_switch" @click="closeDrug()"></span>
        </div>
        <div class="scrollbar">
          <ul class="edit_class" ref="list">
            <li>
              <div class="edit_left">
                <span class="edit_red">*</span>
                <span class="edit_text">方剂名称:</span>
              </div>
              <input
                type="text"
                class="text_box"
                v-if="true"
                placeholder="请输入方剂名称"
                v-model="prescription.description"
              />
              <!-- <p class="edit_tips">1111111111</p> -->
            </li>
            <li v-for="(item, index) in addArr" :key="index">
              <div class="edit_left">
                <span class="edit_red">*</span>
                <span class="edit_text">方剂组成:</span>
              </div>
              <input
                type="text"
                class="text_box"
                placeholder="请输入方剂组成"
                v-model="prescription[`value${item}`]"
              />
              <p class="edit__tips">
                <img
                  src="../../../assets/public/dele.png"
                  alt=""
                  :index="item"
                  @click="dele($event)"
                />
              </p>
            </li>
          </ul>
        </div>
        <i class="addList" @click="add()">+</i>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="closeDrug()">取消</button>
          <button class="edit_submit" @click="submitPrescription()">
            确定
          </button>
        </div>
      </div>

      <div class="edit" v-if="drugSee">
        <div class="edit_title">
          <span class="title">查看方剂</span>
          <span class="edit_switch" @click="closeDrug()"></span>
        </div>

        <ul class="edit_class" ref="list">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂名称:</span>
            </div>
            <span class="edit_text_i">{{ prescriptionItemData.name }}</span>
          </li>
          <li class="flex-wrap">
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂组成:</span>
            </div>
            <div class="flex-right">
              <span
                class="edit_text_i"
                v-for="(item, index) in prescriptionItemData.druggeries"
                :key="index"
                >{{ item.name }},</span
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="cont_header">常见方剂</div>
      <div class="search_title">
        <input
          type="text"
          class="text_box"
          v-model="prescriptionSearch"
          @focus="prescriptionSearchShow = true"
          @blur="blurprescription"
        />
        <button class="submit">检索</button>
      </div>
      <div class="scrollbar">
        <ul ref="scroll" style="height: 31em">
          <li v-for="(item, index) in prescriptionData" :key="index">
            <div class="item_cont">
              <div class="item_left">
                <i></i>
                <span>{{ item.name }}</span>
              </div>
              <span
                @click="seePrescription(item)"
                style="color: rgb(111, 147, 251)"
                >查看</span
              >
            </div>
          </li>
        </ul>
      </div>
      <button class="addResult" @click="addDrug()">+</button>
    </div>
    <!-- 右侧内容 -->
    <div class="cont_bg">
      <!-- 右侧弹窗 -->
      <div class="mask" v-if="prescriptionShow"></div>
      <div class="edit" v-if="prescriptionShow">
        <div class="edit_title">
          <span class="title">添加常见方药</span>
          <span class="edit_switch" @click="closePrescription()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方药名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              placeholder="请输方药名称"
              v-model="name"
            />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="closePrescription()">取消</button>
          <button class="edit_submit" @click="submitName()">确定</button>
        </div>
      </div>
      <div class="cont_header">常见方药</div>
      <div class="search_title">
        <input
          type="text"
          class="text_box"
          v-model="nameSearch"
          @focus="searchShow = true"
          @blur="blurName"
        />
        <button class="submit">检索</button>
        <div class="search_box scrollbar" v-show="searchShow">
          <div class="search_scrollbar">
            <div
              v-for="(item, index) in seacrhNamedata"
              :key="index"
              @click="changeName(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="scrollbar">
        <ul style="height: 31em">
          <li v-for="(item, index) in nameData" :key="index">
            <div class="item_cont" style="justify-content: flex-start">
              <div
                class="divideEqually"
                v-for="(i, index) in item"
                :key="index"
              >
                <i></i>
                <span>{{ i.name }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <button class="addResult" @click="addPrescription()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "prescription-diagnosis",
  data() {
    return {
      prescriptionShow: false,
      drug: false,
      prescription: {},
      prescriptionData: "",
      prescriptionItemData: "",
      prescriptionSearchData: "",
      prescriptionSearch: "",
      prescriptionSearchShow: false,
      name: "",
      nameData: [],
      nameSearch: "",
      nameSearchData: "",
      seacrhNamedata: "",
      searchShow: false,
      drugSee: false,
      addArr: ["1"],
      druggeryData: {},
    };
  },
  mounted() {
    this.getName();
    this.getPrescriptionData();
  },
  methods: {
    closePrescription() {
      this.prescriptionShow = false;
      this.name = "";
    },
    addPrescription() {
      this.prescriptionShow = true;
    },
    blurName() {
      setTimeout(() => {
        this.searchShow = false;
      }, 200);
    },
    changeName(e) {
      this.nameSearch = e.name;
    },
    blurprescription() {
      setTimeout(() => {
        this.prescriptionSearchShow = false;
      }, 200);
    },
    changPrescription(e) {
      this.prescriptionSearch = e.name;
      this.blurprescription();
    },
    closeDrug() {
      let list = this.$refs.list;
      try {
        for (let i = list.children.length; i > 2; i--) {
          list.removeChild(list.children[i - 1]);
        }
      } catch (error) {
        error;
      }
      this.prescription = {};
      this.drugSee = false;
      this.drug = false;
    },
    addDrug() {
      this.drug = true;
    },
    add() {
      this.addArr.push(this.addArr.length + 1);
    },
    seePrescription(e) {
      this.drugSee = true;
      // this.drug = true;
      this.prescriptionItemData = e;
    },
    getPrescriptionData() {
      this.axios
        .get("/meta/agentia", {
          params: {
            name: this.prescriptionSearch,
            page: "1",
            size: "1000",
          },
        })
        .then((res) => {
          this.prescriptionData = res.data.rows;
        });
    },
    submitPrescription() {
      if (!this.prescription.description)
        return this.$Message.error("方剂名称不能为空");
      for (const key in this.prescription) {
        if (/value/.test(key)) {
          if (!this.prescription[key]) {
            return this.$Message.error("方剂组成不能有空项!");
          }
        }
      }
      this.prescription.druggeryIds = [];
      let flag = false;
      let flag1 = true;
      for (const key in this.prescription) {
        if (key == "description" || key == "druggeryIds") continue;
        for (const i in this.druggeryData) {
          if (this.prescription[key] == this.druggeryData[i].name) {
            this.prescription.druggeryIds.push(this.druggeryData[i].id);
            flag = true;
          }
        }
        if (!flag) {
          this.$Message.error(this.prescription[key]);
          flag = false;
          flag1 = false;
          return;
        } else {
          flag = false;
        }
      }
      if (flag1) {
        this.http
          .post("/meta/agentia", {
            druggeryIds: this.prescription.druggeryIds,
            name: this.prescription.description,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.$Message.warning("添加成功!");
              setTimeout(() => {
                this.$refs.scroll.scrollTop =
                  this.$refs.scroll.scrollHeight + 155;
              }, 300);
              this.closeDrug();
              this.getPrescriptionData();
            } else {
              this.$Message.error(`${this.prescription.description}重复添加!`);
            }
          });
      }
    },
    dele(e) {
      let li = e.target.parentNode.parentNode;
      let index = e.target.getAttribute("index");
      this.$refs.list.removeChild(li);
      for (var i in this.prescription) {
        if (`value${index}` == i) {
          delete this.prescription[i];
        }
      }
    },
    getName() {
      this.axios
        .get("/meta/druggery", {
          params: {
            name: this.nameSearch,
            page: "1",
            size: "1000",
          },
        })
        .then((res) => {
          this.druggeryData = res.data.rows;
          let rows = res.data.rows;
          let arr = [];
          for (let i = 0; i < rows.length; i++) {
            arr.push(rows[i]);
            if (i % 7 == "1") {
              this.nameData.push(arr);
              arr = [];
            }
          }
          this.nameData.reverse();
        });
    },
    submitName() {
      if (!this.name) return this.$Message.warning("方药名称不能为空");
      this.http
        .post("/meta/druggery", {
          name: this.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("添加成功!");
            this.prescriptionShow = false;
            this.name = "";
            this.getName();
          } else {
            this.$Message.warning(`${this.name} 已添加!`);
          }
        });
    },
  },
  watch: {
    nameSearch: function () {
      this.axios
        .get("/meta/druggery", {
          params: {
            name: this.nameSearch,
            page: "1",
            size: "1000",
          },
        })
        .then((res) => {
          this.seacrhNamedata = res.data.rows;
        });
    },
    prescriptionSearch: function () {
      this.getPrescriptionData();
    },
  },
};
</script>
<style lang="scss">
.prescription {
  .cont_bg {
    width: 35%;
    .divideEqually {
      width: 14%;
      text-align: left;
    }
    .edit {
      margin: 0 7%;
      ul {
        height: auto;
        max-height: 25em;
        li {
          border: none;
          .edit__tips {
            img {
              margin-left: 5px;
            }
          }
        }
        .flex-wrap {
          align-items: flex-start;
          .flex-right {
            width: 70%;
            display: flex;
            flex-wrap: wrap;
            span {
              width: 19%;
            }
          }
        }
      }
      .addList {
        display: inline-block;
        background: rgb(8, 75, 130);
        border: rgb(111, 147, 251) 1px solid;
        font-size: 30px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        margin-top: 1.5em;
        cursor: pointer;
      }
    }
  }
}
</style>