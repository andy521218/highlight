<template>
  <div class="treatment_layout">
    <div class="layout_left">
      <div class="title" @click="focusTreat">
        <p>治则治法</p>
        <div class="search scrollbar">
          <input
            type="text"
            class="text_box"
            v-model="searchTreat"
            @focus="treatShow = true"
            @blur="timerOuttreat"
            style="background-position: 99% 50%"
          />
          <div class="search_down scrollbar" v-show="treatShow">
            <div
              class="search_down_cont"
              v-for="(item, index) in treatData"
              :key="index"
              @click="treatVal(item)"
            >
              <div class="search_item">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout_search">
        <div class="search_top" @click="searchDurhshow = false">
          <p>遣方用药</p>
          <a href="javascript:;">药材库</a>
        </div>
        <div class="search_bottom">
          <div class="prescription" @click="searchDurhshow = false">
            <p>常见方剂</p>
            <div class="search scrollbar">
              <input
                type="text"
                class="text_box"
                v-model="searchAgentia"
                @focus="focusAgentia"
                @blur="timerOutagentia"
              />
              <div class="search_down" v-show="agentiaShow">
                <div class="search_down_cont">
                  <div
                    class="search_item"
                    v-for="(item, index) in agentiaData"
                    :key="index"
                    @click="agentiaVal(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="prescription" v-show="strategy">
            <p>药物组成</p>
            <div class="search scrollbar">
              <input
                type="text"
                class="text_box drug_input"
                v-model="searchDrug"
                @focus="focusDrug"
              />
              <div class="search_down" v-show="searchDurhshow">
                <div class="search_down_cont">
                  <div
                    class="search_item"
                    v-for="(item, index) in searchDrugdata"
                    :key="index"
                  >
                    <div class="custom_radio" style="margin-right: 10px">
                      <span
                        class="custom_text"
                        :class="{
                          active_checkbox: upDrugitem.indexOf(item.id) > -1,
                        }"
                      ></span>
                      <input
                        class="custom_none"
                        type="checkbox"
                        v-model="upDrugitem"
                        :value="item.id"
                      />
                    </div>
                    <span> {{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="submit" @click="submitDrug" v-show="strategy">
            确定
          </button>
        </div>
      </div>
      <div class="treatment_main" @click="searchDurhshow = false">
        <div class="main_left">
          <ul>
            <li>{{ agentiaListName }}</li>
          </ul>
        </div>
        <div class="main_right">
          <ul>
            <li v-for="(item, index) in agentiaList" :key="index">
              <div v-for="(i, index) in item" :key="index" class="drug_item">
                <span class="drug_dele">
                  {{ i.name }}
                </span>
                <i class="drug_dele_icon" @click="deleDrug(i)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="layout_right" @click="searchDurhshow = false">
      <div class="title">辨证依据</div>
      <div class="disease" style="margin-bottom: 5%">
        <div class="disease_title">病名: {{ diseaseName }}</div>
        <ul class="main_tab">
          <li
            v-for="(item, index) in tab"
            :key="index"
            class="item_title"
            @click="seeItem(index)"
          >
            {{ item }}
            <div :class="{ active: typeId == index }"></div>
          </li>
        </ul>
        <div class="scrollbar">
          <!-- 问诊 -->
          <ul v-show="typeId == 0" class="ask">
            <li v-for="(item, index) in askData" :key="index">
              <span>问: {{ item.question }}</span>
              <span> 答: {{ item.answer }}</span>
            </li>
          </ul>
          <!-- 望诊 -->
          <ul v-show="typeId == 1">
            <li v-for="(item, index) in watchData" :key="index">
              <span>{{ item.name }}</span>
              <p>----</p>
              {{ item.answer }}
            </li>
          </ul>
          <!-- 闻诊 -->
          <ul v-show="typeId == 2">
            <li v-for="(item, index) in listenData" :key="index">
              <span>{{ item.name }}</span>
              <p>----</p>
              {{ item.answer }}
            </li>
          </ul>
          <!-- 切诊 -->
          <ul v-show="typeId == 3">
            <li v-if="pulseData.answer">
              <span style="width: 8%">脉诊</span>
              <p>----</p>
              {{ pulseData.answer }}
            </li>
            <li v-for="(item, index) in pressData" :key="index">
              <span>{{ item.name }}</span>
              <p>----</p>
              {{ item.answer }}
            </li>
          </ul>
        </div>
      </div>
      <div class="disease">
        <div class="disease_title">
          证型:
          <div v-for="(item, index) in diseasesRadio" :key="index">
            <div class="custom_radio">
              <span
                class="custom_text"
                :class="{ active_radio: active == index }"
              ></span>
              <input
                class="custom_none"
                type="radio"
                name="disease"
                @change="seeDisease(item, index)"
                :value="item.id"
                v-model="defaultOptions.id"
              />
            </div>
            <label for="">{{ item.name }}</label>
          </div>
        </div>
        <ul class="main_tab">
          <li
            style="height: auto"
            v-for="(item, index) in tab"
            :key="index"
            class="item_title"
            @click="changeDisease(index)"
          >
            {{ item }}
            <div :class="{ active: diseaseId == index }"></div>
          </li>
        </ul>
        <div class="scrollbar">
          <!-- 问诊 -->
          <ul v-show="diseaseId == 0" class="ask">
            <li v-for="(item, index) in diseasesAsk" :key="index">
              <div
                v-for="(i, index) in diseasesAskData"
                :key="index"
                v-show="i.id == item"
              >
                <span>问: {{ i.question }}</span>
                <span> 答: {{ i.answer }}</span>
              </div>
            </li>
          </ul>
          <!-- 望诊 -->
          <ul v-show="diseaseId == 1">
            <li v-for="(item, index) in diseasesWatch" :key="index">
              <div
                v-for="(i, index) in diseasesWatchData"
                :key="index"
                v-show="i.id == item"
              >
                <span>{{ i.name }}</span>
                <p>----</p>
                {{ i.answer }}
              </div>
            </li>
          </ul>
          <!-- 闻诊 -->
          <ul v-show="diseaseId == 2">
            <li v-for="(item, index) in diseasesListenth" :key="index">
              <div
                v-for="(i, index) in diseasesListenthData"
                :key="index"
                v-show="i.id == item"
              >
                <span>{{ i.name }}</span>
                <p>----</p>
                {{ i.answer }}
              </div>
            </li>
          </ul>
          <!-- 切诊 -->
          <ul v-show="diseaseId == 3">
            <li v-if="pulseData.answer">
              <span style="width: 8%">脉诊</span>
              <p>----</p>
              {{ pulseData.answer }}
            </li>
            <li
              v-for="(item, index) in diseasesPress"
              :key="index"
              style="height: auto"
            >
              <div
                v-for="(i, index) in diseasesPressData"
                :key="index"
                v-show="i.id == item"
              >
                <span>{{ i.name }}</span>
                <p>----</p>
                {{ i.answer }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-treatment",
  data() {
    return {
      tab: ["问", "望", "闻", "切"],
      examNo: "",
      typeId: "",
      diseaseId: "",
      caseId: "",
      treatData: {},
      treatShow: false,
      searchTreat: "",
      agentiaData: {},
      searchAgentia: "",
      agentiaShow: false,
      agentiaList: [],
      agentiaId: [],
      agentiaListName: "",
      diseasesWatchData: [],
      diseasesWatch: [],
      diseasesListenthData: [],
      diseasesListenth: [],
      diseasesPressData: [],
      diseasesPress: [],
      diseasesPulseData: [],
      diseasesAskData: [],
      diseasesAsk: [],
      watchData: [],
      listenData: [],
      pressData: [],
      pulseData: {},
      diseasesRadio: [],
      askData: [],
      diseaseName: "",
      defaultOptions: [],
      searchDrug: "",
      searchDrugdata: {},
      upDrugitem: [],
      searchDurhshow: false,
      active: "0",
      strategy: true,
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getTreatVal();
    this.getdiseaseData();
  },
  methods: {
    seeItem(index) {
      this.typeId = index;
    },
    changeDisease(index) {
      this.diseaseId = index;
    },
    //获取治则治法 方剂正确答案
    getTreatVal() {
      this.agentiaList = [];
      this.upDrugitem = [];
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/treat`)
        .then((res) => {
          if (res.data.agentias.length != "0") {
            this.searchTreat = res.data.treatName;
            this.searchAgentia = this.agentiaListName =
              res.data.agentias[0].name;
            this.agentiaId = res.data.agentias[0].id;
            let druggeries = res.data.agentias[0].druggeries;
            let item = res.data.agentias[0].druggeries;
            for (let i = 0; i < item.length; i++) {
              if (this.upDrugitem.indexOf(item[i].id) == "-1") {
                this.upDrugitem.push(item[i].id);
              }
            }
            let arr = [];
            for (let i = 0; i < druggeries.length; i++) {
              arr.push(druggeries[i]);
              if (arr.length % 4 == "0") {
                this.agentiaList.push(arr);
                arr = [];
              }
            }
            if (arr.length > 0) {
              this.agentiaList.push(arr);
            }
          }
        });
    },
    timerOuttreat() {
      setTimeout(() => {
        this.treatShow = false;
      }, 500);
    },
    timerOutagentia() {
      setTimeout(() => {
        this.agentiaShow = false;
      }, 500);
    },
    //设置治则治法正确答案
    treatVal(e) {
      this.searchTreat = e.name;
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/treat`, {
          treat: e.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 获取药物列表
    getDruggery() {
      this.axios
        .get("/meta/druggery", {
          params: {
            name: this.searchDrug,
            page: "1",
            size: "1000",
          },
        })
        .then((res) => {
          this.searchDrugdata = res.data.rows;
        });
    },
    // 设置药物组成
    submitDrug() {
      if (!this.agentiaListName) return this.$Message.error("请先选择方剂!");
      if (this.upDrugitem.length == "0")
        return this.$Message.error("至少选择一项方药!");
      this.axios
        .delete(
          `/answer/${this.examNo}/${this.caseId}/treat/agentia/${this.agentiaId}`
        )
        .then(() => {
          this.http
            .put(`/answer/${this.examNo}/${this.caseId}/treat/agentia`, {
              agentiaId: this.agentiaId,
              druggeryIds: this.upDrugitem,
            })
            .then((res) => {
              if (res.code == "000000") {
                this.searchDurhshow = false;
                this.getTreatVal();
              } else {
                this.$Message.error(res.msg);
              }
            });
        });
    },
    // 删除单项药物组成
    deleDrug(e) {
      this.axios
        .delete(
          `/answer/${this.examNo}/${this.caseId}/treat/agentia/${this.agentiaId}/${e.id}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.getTreatVal();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    //设置方剂答案
    agentiaVal(e) {
      if (!this.agentiaListName) {
        this.searchAgentia = e.name;
        this.http
          .put(`/answer/${this.examNo}/${this.caseId}/treat/agentia`, {
            agentiaId: e.id,
            druggeryIds: [],
          })
          .then((res) => {
            if (res.code == "000000") {
              // if (!e.druggeries) {
              //   this.strategy = true;
              // } else {
              //   this.recite(e.name);
              //   this.strategy = false;
              // }
              this.getTreatVal();
            } else {
              this.$Message.error(res.msg);
            }
          });
        return;
      }
      this.axios
        .delete(
          `/answer/${this.examNo}/${this.caseId}/treat/agentia/${this.agentiaId}`
        )
        .then(() => {
          this.searchAgentia = e.name;
          this.http
            .put(`/answer/${this.examNo}/${this.caseId}/treat/agentia`, {
              agentiaId: e.id,
              druggeryIds: [],
            })
            .then((res) => {
              if (res.code == "000000") {
                // if (!e.druggeries) {
                //   this.strategy = true;
                // } else {
                //   this.recite(e.name);
                //   this.strategy = false;
                // }
                this.getTreatVal();
              } else {
                this.$Message.error(res.msg);
              }
            });
        });
    },
    //上传无需背诵方剂
    recite(name) {
      this.axios
        .get("/meta/agentia", {
          params: {
            name: name,
          },
        })
        .then((res) => {
          let data = res.data.rows[0].druggeries;
          let arr = [];
          data.forEach((item) => {
            arr.push(item.id);
          });
          this.axios
            .delete(
              `/answer/${this.examNo}/${this.caseId}/treat/agentia/${this.agentiaId}`
            )
            .then(() => {
              this.http
                .put(`/answer/${this.examNo}/${this.caseId}/treat/agentia`, {
                  agentiaId: this.agentiaId,
                  druggeryIds: arr,
                })
                .then((res) => {
                  if (res.code == "000000") {
                    this.getTreatVal();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            });
        });
    },
    // 辨证数据
    getdiseaseData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/disease`)
        .then((res) => {
          let watch, listen, ask, press;
          try {
            this.diseaseName = res.data.diseaseName;
            res.data.diseaseNameIssues.forEach((element) => {
              if (element.stageId == "1") {
                ask = element.issueIds;
              }
              if (element.stageId == "2") {
                watch = element.issueIds;
              }
              if (element.stageId == "3") {
                listen = element.issueIds;
              }
              if (element.stageId == "4") {
                press = element.issueIds;
              }
            });
            this.diseasesRadio = res.data.diseases;
            this.defaultOptions = res.data.diseases[0];
          } catch (error) {
            error;
          }

          let arr = [];
          // 获取望诊数据
          for (let i = 0; i <= 2; i++) {
            this.axios
              .get(`/answer/${this.examNo}/${this.caseId}/watch/${i}`)
              .then((res) => {
                for (let i = 0; i < res.data.list.length; i++) {
                  arr.push(res.data.list[i]);
                }
                this.diseasesWatchData = arr;
                try {
                  for (let i = 0; i < watch.length; i++) {
                    for (let y = 0; y < arr.length; y++) {
                      if (watch[i] == arr[y].id) {
                        if (this.watchData.indexOf(arr[y]) > "-1") {
                          continue;
                        } else {
                          this.watchData.push(arr[y]);
                        }
                      }
                    }
                  }
                } catch (error) {
                  error;
                }
              });
          }
          // 获取闻诊
          this.axios
            .get(`/answer/${this.examNo}/${this.caseId}/listen`)
            .then((res) => {
              this.diseasesListenthData = res.data;
              try {
                for (let i = 0; i < listen.length; i++) {
                  for (let y = 0; y < res.data.length; y++) {
                    if (listen[i] == res.data[y].id) {
                      this.listenData.push(res.data[y]);
                    }
                  }
                }
              } catch (error) {
                error;
              }
            });
          // 获取问诊
          this.axios
            .get(`/answer/${this.examNo}/${this.caseId}/asked`, {
              params: {
                page: "1",
                size: "500",
              },
            })
            .then((res) => {
              this.diseasesAskData = res.data;
              try {
                for (let i = 0; i < ask.length; i++) {
                  for (let y = 0; y < res.data.length; y++) {
                    if (ask[i] == res.data[y].id) {
                      this.askData.push(res.data[y]);
                    }
                  }
                }
              } catch (error) {
                error;
              }
            });
          // 获取切诊=>按珍数据
          this.axios
            .get(`/answer/${this.examNo}/${this.caseId}/feel/press`)
            .then((res) => {
              this.diseasesPressData = res.data.list;
              try {
                for (let i = 0; i < press.length; i++) {
                  for (let y = 0; y < res.data.list.length; y++) {
                    if (press[i] == res.data.list[y].id) {
                      this.pressData.push(res.data.list[y]);
                    }
                  }
                }
              } catch (error) {
                error;
              }
            });
          // 获取切诊=>脉诊
          this.axios
            .get(`/answer/${this.examNo}/${this.caseId}/feel/pulse`)
            .then((res) => {
              if (res.data.answer) {
                this.pulseData = res.data;
              }
            });
        })
        .then(() => {
          this.seeDisease(this.defaultOptions, 0);
        });
    },
    // 病症查看数据
    seeDisease(e, index) {
      this.diseasesWatch = [];
      this.diseasesListenth = [];
      this.diseasesAsk = [];
      this.diseasesPress = [];
      this.active = index;
      try {
        for (let i = 0; i < e.issues.length; i++) {
          if (e.issues[i].stageId == "1") {
            this.diseasesAsk = e.issues[i].issueIds;
          }
          if (e.issues[i].stageId == "2") {
            this.diseasesWatch = e.issues[i].issueIds;
          }
          if (e.issues[i].stageId == "3") {
            this.diseasesListenth = e.issues[i].issueIds;
          }
          if (e.issues[i].stageId == "4") {
            this.diseasesPress = e.issues[i].issueIds;
          }
        }
      } catch (error) {
        return error;
      }
    },
    //获取焦点查询治则治法
    focusTreat() {
      this.treatShow = true;
      this.axios
        .get("/meta/treat", {
          params: {
            name: this.searchTreat,
          },
        })
        .then((res) => {
          this.treatData = res.data;
        });
    },
    //获取焦点查询治则治法
    focusAgentia() {
      this.agentiaShow = true;
      this.axios
        .get("/meta/agentia", {
          params: {
            name: this.searchAgentia,
            size: "1000",
          },
        })
        .then((res) => {
          this.agentiaData = res.data.rows;
        });
    },
    // 获取交代呢查询药物组成
    focusDrug() {
      this.searchDurhshow = true;
      this.getDruggery();
    },
  },
  watch: {
    searchDrug: function() {
      this.getDruggery();
    },
    searchTreat: function() {
      this.axios
        .get("/meta/treat", {
          params: {
            name: this.searchTreat,
          },
        })
        .then((res) => {
          this.treatData = res.data;
        });
    },
    searchAgentia: function() {
      this.axios
        .get("/meta/agentia", {
          params: {
            name: this.searchAgentia,
            size: "1000",
          },
        })
        .then((res) => {
          this.agentiaData = res.data.rows;
        });
    },
  },
};
</script>

<style lang="scss">
.treatment_layout {
  width: 100%;
  height: 100%;
  padding: 1%;
  display: flex;

  .layout_left {
    width: 57%;
    height: 100%;
    padding: 0 1%;
    border-right: 1px solid rgb(111, 147, 251);
    .title {
      font-size: 16px;
      width: 99%;
      border-bottom: 1px solid rgb(111, 147, 251);
      height: 15%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      input {
        width: 100%;
        margin-top: 1%;
      }
      .search_down {
        width: 100%;
      }
      .scrollbar {
        height: auto;
      }
    }
    .layout_search {
      height: 15%;
      width: 99%;
      .search_top {
        display: flex;
        justify-content: space-between;
        height: 50%;
        width: 100%;
        align-items: center;
        align-content: center;
        a {
          text-decoration: none;
          color: rgb(111, 147, 251);
          font-size: 16px;
          position: relative;
          &::after {
            content: "";
            background: url("../../../assets/public/cef75fb33557bcdbbe2c217b6f0bce2.png")
              no-repeat center;
            width: 34px;
            height: 34px;
            position: absolute;
            left: -35px;
            top: -5px;
          }
        }
      }
    }
    .search_bottom {
      height: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .prescription {
        width: 43%;
        height: 100%;
        display: flex;
        align-items: center;
        p {
          width: 17%;
        }
        .search {
          width: 83%;
          .text_box {
            width: 100%;
          }
          .search_down {
            width: 100%;
            .custom_radio {
              display: flex;
              align-items: center;
            }
          }
        }
      }
      .submit {
        margin: 0;
      }
    }
    .treatment_main {
      width: 100%;
      height: 69%;
      display: flex;
      margin-top: 1%;
      .main_left {
        width: 44%;
        border-right: 1px solid rgb(111, 147, 251);
        li {
          height: 40px;
          line-height: 40px;
        }
      }
      .main_right {
        width: 56%;
        height: 100%;
        ul {
          width: 100%;
          height: 100%;
          li {
            border-bottom: 1px solid rgb(212, 229, 255);
            width: 98%;
            margin-left: 1%;
            display: flex;
            padding: 1.2% 0;
            .drug_item {
              display: flex;
              width: 25%;
              justify-content: center;
              .drug_dele {
                width: 43%;
              }
              .drug_dele_icon {
                display: inline-block;
                width: 17px;
                height: 20px;
                background: url("../../../assets/public/dele.png") no-repeat
                  center;
                background-size: 100% 90%;
              }
              .drug_dele_icon:hover {
                cursor: pointer;
                border-bottom: 1px solid red;
              }
            }
          }
        }
      }
    }
  }
  .layout_right {
    width: 42%;
    height: 100%;

    margin-left: 1%;
    .title {
      width: 100%;
      height: 7%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3em;
      font-weight: bold;
    }
    .disease {
      background-color: rgb(212, 229, 255, 0.4);
      border-radius: 10px;
      width: 96%;
      height: 42%;
      margin: 0 auto;
      .disease_title {
        width: 98%;
        height: 13%;
        margin-left: 1%;
        border-bottom: 1px solid rgb(212, 229, 255);
        display: flex;
        padding-left: 3%;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          .custom_radio {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            margin-left: 10px;
          }
        }
      }
      .main_tab {
        width: 100%;
        height: 13%;
        display: flex;
        position: relative;
        padding-left: 3%;
        .item_title {
          cursor: pointer;
          width: 5%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1%;
          position: relative;
        }
        .active {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          border: 3px solid rgb(111, 147, 251);
          border-radius: 3px;
        }
      }
      .scrollbar {
        margin-top: 1%;
        width: 100%;
        height: 60%;
        ul {
          width: 98%;
          margin: 0 auto;
          height: 100%;
          overflow-y: auto;
          li {
            width: 99%;
            display: flex;
            position: relative;
            padding: 1% 1% 1% 3%;
            div {
              width: 100%;
              display: flex;
              span {
                width: 8%;
              }
            }
            p {
              margin-right: 1%;
            }
          }
        }
        .ask {
          li {
            padding-right: 5px;
            height: auto;
            line-height: 25px;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid rgb(212, 229, 255);
            span {
              width: 100%;
            }
            div {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
    }
  }
}
</style>
