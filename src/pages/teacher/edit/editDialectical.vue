<template>
  <div
    class="case_dialectical"
    :style="{ 'align-items': step ? 'center' : 'flex-start' }"
  >
    <div class="dialectical_layout_left" v-show="step">
      <div class="title">病史合成</div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="seeTabdata(item, index)"
        >
          {{ item }}
          <div :class="{ active: typeId == index }"></div>
        </li>
      </ul>
      <!-- 问诊 -->
      <div class="scrollbar" v-show="typeId == 0">
        <ul class="main_cont">
          <li
            v-for="(item, index) in askData"
            :key="index"
            style="
              flex-direction: column;
              border-bottom: 1px solid rgb(212, 229, 255);
            "
          >
            <span class="start">问: {{ item.question }}</span>
            <span class="end">答: {{ item.answer }}</span>
          </li>
        </ul>
      </div>

      <!-- 望诊 -->
      <div class="scrollbar" v-show="typeId == 1">
        <ul class="main_cont">
          <li v-for="(item, index) in wachData" :key="index">
            <span style="width: 50px">
              {{ item.name }}
            </span>
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 闻诊 -->
      <div class="scrollbar" v-show="typeId == 2">
        <ul class="main_cont">
          <li v-for="(item, index) in listenData" :key="index">
            {{ item.name }}
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 切诊 -->
      <div class="scrollbar" v-show="typeId == 3">
        <ul class="main_cont">
          <li style="display: flex" v-if="pulseData.answer">
            <span style="width: 50px"> 脉诊 </span>
            <p>-----</p>
            {{ pulseData.answer }}
          </li>
          <li
            v-for="(item, index) in pressData"
            :key="index"
            style="display: flex"
          >
            <span>
              {{ item.name }}
            </span>
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
    </div>

    <div class="dialectical_layout_right" v-show="step">
      <ul>
        <li><p class="tips">提示:根据病史合成选择病名和证型</p></li>
        <li>病名</li>
        <li>
          <div class="search scrollbar">
            <input
              type="text"
              class="text_box"
              v-model="searchDisease"
              @focus="focusName"
              @blur="timerDiseaseout"
              style="border-bottom: none"
            />
            <div
              class="search_down"
              :style="{
                'border-top': diseaseNameShow
                  ? '1px solid rgb(111,147,251)'
                  : 'none',
              }"
            >
              <div class="search_down_cont" v-show="diseaseNameShow">
                <div
                  class="search_item"
                  v-for="(item, index) in diseaseNameData"
                  :key="index"
                  @click="diseaseVal(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>证型</li>
        <li class="layout">
          <div v-for="(item, index) in diseaseCheckData" :key="index">
            <div class="custom_radio">
              <span
                class="custom_text"
                :class="{ active_checkbox: contains(diseaseCheckArr, item) }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                v-model="diseaseCheckArr"
                @change="changeDiseasechkeck($event, item)"
                :value="item"
              />
            </div>
            <label for="">{{ item.name }}</label>
          </div>
        </li>
      </ul>
      <button class="edit_submit" @click="changeView">下一步</button>
    </div>

    <!-- 步骤2 -->
    <div class="dialectical_layout_left_two" v-show="!step">
      <ul class="main_tab" style="height:50px">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="seeTabdata(item, index)"
        >
          {{ item }}
          <div :class="{ active: typeId == index }"></div>
        </li>
      </ul>
      <!-- 问诊 -->
      <div class="scrollbar" v-show="typeId == 0">
        <ul class="main_cont">
          <li
            v-for="(item, index) in askData"
            :key="index"
            style="border-bottom: 1px solid rgb(212, 229, 255)"
          >
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: temporaryAsk.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                :value="item.id"
                v-model="temporaryAsk"
              />
            </div>
            <div style="display: flex; flex-direction: column">
              <span class="start" style="height: auto"
                >问:{{ item.question }}</span
              >
              <span class="end">答:{{ item.answer }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 望诊 -->
      <div class="scrollbar" v-show="typeId == 1">
        <ul class="main_cont">
          <li v-for="(item, index) in wachData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: temporaryWatch.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                :value="item.id"
                v-model="temporaryWatch"
              />
            </div>

            <span style="width: 50px">
              {{ item.name }}
            </span>
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 闻诊 -->
      <div class="scrollbar" v-show="typeId == 2">
        <ul class="main_cont">
          <li v-for="(item, index) in listenData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: temporaryListent.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                :value="item.id"
                v-model="temporaryListent"
              />
            </div>
            <span style="width: 50px">
              {{ item.name }}
            </span>
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 切诊 -->
      <div class="scrollbar" v-show="typeId == 3">
        <ul class="main_cont">
          <li v-if="pulseData.answer">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: temporaryPress.indexOf(pulseData.id) > -1,
                }"
              ></span>
              <input
                class="custom_none"
                type="checkbox"
                :value="pulseData.id"
                v-model="temporaryPress"
              />
            </div>
            <span style="width: 50px"> 脉诊 </span>
            <p>-----</p>
            {{ pulseData.answer }}
          </li>
          <li v-for="(item, index) in pressData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: temporaryPress.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                :value="item.id"
                v-model="temporaryPress"
              />
            </div>
            <span style="width: 50px">
              {{ item.name }}
            </span>
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
    </div>
    <div class="dialectical_submit" v-show="!step">
      <div class="submit_top">
        <i class="el-icon-right" @click="viewName"></i>
        <h5 @click="viewName">添加到病名</h5>
      </div>
      <div class="submit_bottom">
        <i class="el-icon-right" @click="viewdisease"></i>
        <h5 @click="viewdisease">添加到症候</h5>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="dialectical_layout_right_two" v-show="!step">
      <button
        class="edit_submit"
        @click="changeView"
        v-show="!step"
        style="right: 0; bottom: -10%"
      >
        上一步
      </button>
      <div class="dialectical_warp">
        <div class="title">
          辨病依据:{{ searchDisease }}
          <button class="submit" @click="submitName">确定</button>
        </div>
        <div class="scrollbar">
          <ul class="main_cont">
            <!-- 问诊 -->
            <li
              v-for="item in askData"
              :key="item.id"
              style="border-bottom: 1px solid rgb(212, 229, 255)"
              v-show="nameAskData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  type="checkbox"
                  class="custom_none"
                  :value="item.id"
                  v-model="nameAskData"
                />
              </div>
              <div style="display: flex; flex-direction: column">
                <span class="start" style="height: auto"
                  >问:{{ item.question }}</span
                >
                <span class="end">答:{{ item.answer }}</span>
              </div>
            </li>
            <!-- 望诊 -->
            <li
              v-for="item in wachData"
              :key="item.id"
              v-show="nameWatchData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  type="checkbox"
                  class="custom_none"
                  :value="item.id"
                  v-model="nameWatchData"
                />
              </div>

              <span style="width: 50px">
                {{ item.name }}
              </span>
              <p>-----</p>
              {{ item.answer }}
            </li>
            <!-- 闻诊 -->
            <li
              v-for="item in listenData"
              :key="item.id"
              v-show="listenData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  type="checkbox"
                  class="custom_none"
                  :value="item.id"
                  v-model="namelistenData"
                />
              </div>
              <span style="width: 50px">
                {{ item.name }}
              </span>
              <p>-----</p>
              {{ item.answer }}
            </li>
            <!-- 切诊 -->
            <li v-show="namePressData.indexOf(pulseData.id) > -1">
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  type="checkbox"
                  class="custom_none"
                  :value="pulseData.id"
                  v-model="namePressData"
                />
              </div>
              <span style="width: 50px"> 脉诊 </span>
              <p>-----</p>
              {{ pulseData.answer }}
            </li>
            <li
              v-for="item in pressData"
              :key="item.id"
              v-show="namePressData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  type="checkbox"
                  class="custom_none"
                  :value="item.id"
                  v-model="namePressData"
                />
              </div>
              <span style="width: 50px">
                {{ item.name }}
              </span>
              <p>-----</p>
              {{ item.answer }}
            </li>
          </ul>
        </div>
      </div>
      <div class="dialectical_warp" style="margin-top:2%">
        <div class="title" style="justify-content: flex-start">
          辩证依据:
          <div v-for="(item, index) in diseaseCheckArr1" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_radio: diseaseDeafault == item.id,
                }"
              ></span>
              <input
                class="custom_none"
                type="radio"
                name="disease"
                :value="item.id"
                v-model="diseaseDeafault"
                @change="seeDisease(item)"
              />
            </div>
            <label for="">{{ item.name }}</label>
          </div>
          <button class="submit disease" @click="submitDisease">
            确定
          </button>
        </div>
        <div class="scrollbar">
          <ul class="main_cont">
            <!-- 问诊 -->
            <li
              v-for="item in askData"
              :key="item.id"
              v-show="diseaseAskData.indexOf(item.id) > -1"
              style="border-bottom: 1px solid rgb(212, 229, 255)"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  class="custom_none"
                  type="checkbox"
                  :value="item.id"
                  v-model="diseaseAskData"
                />
              </div>
              <div style="display: flex; flex-direction: column">
                <span class="start">问:{{ item.question }}</span>
                <span class="end">答:{{ item.answer }}</span>
              </div>
            </li>
            <!-- 望诊 -->
            <li
              v-for="item in wachData"
              :key="item.id"
              v-show="diseaseWatchData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  class="custom_none"
                  type="checkbox"
                  :value="item.id"
                  v-model="diseaseWatchData"
                />
              </div>
              <span style="width: 50px">
                {{ item.name }}
              </span>
              <p>-----</p>
              {{ item.answer }}
            </li>
            <!-- 闻诊 -->
            <li
              v-for="item in listenData"
              :key="item.id"
              v-show="diseaselistenData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  class="custom_none"
                  type="checkbox"
                  :value="item.id"
                  v-model="diseaselistenData"
                />
              </div>
              <span style="width: 50px">
                {{ item.name }}
              </span>
              <p>-----</p>
              {{ item.answer }}
            </li>
            <!-- 切诊 -->
            <li
              v-if="pulseData.answer"
              v-show="diseasePressData.indexOf(pulseData.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  class="custom_none"
                  type="checkbox"
                  :value="pulseData.id"
                  v-model="diseasePressData"
                />
              </div>
              <span style="width: 50px"> 脉诊 </span>
              <p>-----</p>
              {{ pulseData.answer }}
            </li>
            <li
              v-for="item in pressData"
              :key="item.id"
              v-show="diseasePressData.indexOf(item.id) > -1"
            >
              <div class="custom_radio" style="margin-right: 10px">
                <i class="el-icon-error"></i>
                <input
                  class="custom_none"
                  type="checkbox"
                  :value="item.id"
                  v-model="diseasePressData"
                />
              </div>
              <span style="width: 50px">
                {{ item.name }}
              </span>
              <p>-----</p>
              {{ item.answer }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-dialectical",
  data() {
    return {
      tab: ["问", "望", "闻", "切"],
      diseaseNameShow: false,
      caseId: "",
      typeId: "",
      step: true,
      listenData: [],
      askData: [],
      pressData: [],
      pulseData: [],
      searchDisease: "",
      diseaseNameId: "",
      diseaseNameData: {},
      wachData: [],
      diseaseCheckData: {},
      diseaseDeafault: [],
      diseaseUpdata: {},
      diseaseCheckArr: [],
      diseaseChangeId: "",
      temporaryAsk: [],
      temporaryWatch: [],
      temporaryListent: [],
      temporaryPress: [],
      nameWatchData: [],
      namelistenData: [],
      nameAskData: [],
      namePressData: [],
      diseaseWatchData: [],
      diseaselistenData: [],
      diseaseAskData: [],
      diseasePressData: [],
      diseasecorrectData: {},
      diseaseCheckArr1: [],
      temporary: {},
      uploadName: {
        id: "",
        issues: [
          {
            issueIds: [],
            stageId: 1,
          },
          {
            issueIds: [],
            stageId: 2,
          },
          {
            issueIds: [],
            stageId: 3,
          },
          {
            issueIds: [],
            stageId: 4,
          },
        ],
        name: "",
      },
      upDiseaseData: {
        id: "",
        issues: [
          {
            issueIds: [],
            stageId: 1,
          },
          {
            issueIds: [],
            stageId: 2,
          },
          {
            issueIds: [],
            stageId: 3,
          },
          {
            issueIds: [],
            stageId: 4,
          },
        ],
        name: "",
      },
    };
  },

  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getListendata();
    this.getAskdata();
    this.getPressData();
    this.getPulseData();
    this.getAlldata();
    this.getDiseaseDefault();
    // 获取望诊数据
    for (let i = 0; i < 3; i++) {
      this.axios.get(`/case/manage/${this.caseId}/watch/${i}`).then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].answer && res.data.list[i].answer != "正常") {
            this.wachData.push(res.data.list[i]);
          }
        }
      });
    }
  },
  methods: {
    //右侧试图更新
    viewdisease() {
      this.temporaryAsk.forEach((item) => {
        this.checkView(this.diseaseAskData, item);
      });
      this.temporaryWatch.forEach((item) => {
        this.checkView(this.diseaseWatchData, item);
      });
      this.temporaryListent.forEach((item) => {
        this.checkView(this.diseaselistenData, item);
      });
      this.temporaryPress.forEach((item) => {
        this.checkView(this.diseaselistenData, item);
      });
      this.init();
    },
    viewName() {
      this.temporaryAsk.forEach((item) => {
        this.checkView(this.nameAskData, item);
      });
      this.temporaryWatch.forEach((item) => {
        this.checkView(this.nameWatchData, item);
      });
      this.temporaryListent.forEach((item) => {
        this.checkView(this.namelistenData, item);
      });
      this.temporaryPress.forEach((item) => {
        this.checkView(this.namePressData, item);
      });
      this.init();
    },
    checkView(arr, item) {
      if (arr.indexOf(item) > -1) {
        return;
      } else {
        arr.push(item);
      }
    },
    init() {
      this.temporaryAsk = [];
      this.temporaryWatch = [];
      this.temporaryListent = [];
      this.temporaryPress = [];
    },
    // 第一步查看tab选项
    seeTabdata(item, i) {
      this.typeId = i;
    },
    contains(a, obj) {
      for (var i = 0; i < a.length; i++) {
        if (JSON.stringify(a[i]) === JSON.stringify(obj)) {
          return true;
        }
      }
      return false;
    },
    // 下一步
    changeView() {
      if (this.step) {
        if (!this.searchDisease) return this.$Message.error("请先选择病名");
        if (this.diseaseCheckArr.length == "0")
          return this.$Message.error("至少选择一项证型");
        this.step = false;
        this.getDiseaseDefault();
      } else {
        // 上一步
        this.getAlldata();
        this.diseaseWatchData = [];
        this.diseaselistenData = [];
        this.diseaseAskData = [];
        this.diseasePressData = [];
        this.diseaseCheckArr1 = [];
        this.upDiseaseData = {
          id: "",
          issues: [
            {
              issueIds: [],
              stageId: 1,
            },
            {
              issueIds: [],
              stageId: 2,
            },
            {
              issueIds: [],
              stageId: 3,
            },
            {
              issueIds: [],
              stageId: 4,
            },
          ],
          name: "",
        };
        this.step = true;
      }
      this.diseaseCheckArr1 = this.diseaseCheckArr;
    },
    timerDiseaseout() {
      setTimeout(() => {
        this.diseaseNameShow = false;
      }, 500);
    },
    // 证型checkbox
    changeDiseasechkeck(e, item) {
      if (e.target.checked) {
        this.http.put(`/case/manage/${this.caseId}/disease`, {
          id: item.id,
          issues: [
            {
              issueIds: [],
              stageId: "",
            },
          ],
          name: item.name,
        });
        return;
      }
      this.axios.delete(`/case/manage/${this.caseId}/disease/${item.id}`);
    },
    // 获取闻诊数据
    getListendata() {
      this.axios.get(`/case/manage/${this.caseId}/listen`).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].answer && res.data[i].answer != "正常") {
            this.listenData.push(res.data[i]);
          }
        }
      });
    },
    //获取问诊数据
    getAskdata() {
      this.axios
        .get(`/case/manage/${this.caseId}/ask`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          if (!res.data.rows) return;
          let data = res.data.rows;
          data.forEach((item) => {
            if (item.correct) {
              this.askData.push(item);
            }
          });
        });
    },
    //获取按诊数据
    getPressData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/press`).then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].answer && res.data.list[i].answer != "正常") {
            this.pressData.push(res.data.list[i]);
          }
        }
      });
    },
    //获取脉诊数据
    getPulseData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/pulse`).then((res) => {
        if (res.data.answer) {
          this.pulseData = res.data;
        }
      });
    },
    // search正确病名
    diseaseVal(e) {
      this.diseaseCheckArr = [];
      this.axios.delete(`/case/manage/${this.caseId}/disease/name`).then(() => {
        this.searchDisease = e.name;
        this.diseaseNameId = e.id;
        this.axios.get(`/meta/disease/${e.id}`).then((res) => {
          this.diseaseCheckData = res.data.rows;
        });
        // 设置更改病名
        this.http
          .post(`/case/manage/${this.caseId}/disease/name`, {
            id: e.id,
            issues: [
              {
                issueIds: [],
                stageId: "",
              },
            ],
            name: e.name,
          })
          .then(() => {
            this.diseaseAskData = [];
            this.diseaseWatchData = [];
            this.diseaselistenData = [];
            this.diseasePressData = [];
            this.nameAskData = [];
            this.nameWatchData = [];
            this.namelistenData = [];
            this.namePressData = [];
          });
      });
    },

    //上传病名
    submitName() {
      let updataName = [
        {
          issueIds: this.nameAskData,
          stageId: 1,
        },
        {
          issueIds: this.nameWatchData,
          stageId: 2,
        },
        {
          issueIds: this.namelistenData,
          stageId: 3,
        },
        {
          issueIds: this.namePressData,
          stageId: 4,
        },
      ];
      this.http
        .put(`/case/manage/${this.caseId}/disease/name`, updataName)
        .then((res) => {
          if (res.code == "000000") {
            this.getAlldata();
            this.$Message.warning(`设置病名成功!`);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 上传证型
    submitDisease() {
      let index = this.diseaseCheckArr1
        .map((item) => item.id)
        .indexOf(this.diseaseDeafault);
      if (index == "-1") return this.$Message.error("请选择一项证型");
      let updataDisease = {
        id: this.diseaseDeafault,
        issues: [
          {
            issueIds: this.diseaseAskData,
            stageId: 1,
          },
          {
            issueIds: this.diseaseWatchData,
            stageId: 2,
          },
          {
            issueIds: this.diseaselistenData,
            stageId: 3,
          },
          {
            issueIds: this.diseasePressData,
            stageId: 4,
          },
        ],
        name: this.diseaseCheckArr1[index].name,
      };
      this.http
        .put(`/case/manage/${this.caseId}/disease`, updataDisease)
        .then((res) => {
          if (res.code == "000000") {
            this.getAlldata();
            this.$Message.warning(
              `设置${this.diseaseCheckArr1[index].name}成功!`
            );
          } else {
            this.$Message.error(res.msg);
          }
        });
    },

    // 查看证型单选项
    seeDisease(e) {
      this.diseaseUpdata = e;
      this.getAlldata();
      let flag = false;
      try {
        this.diseasecorrectData.forEach((item) => {
          if (e.id == item.id) {
            flag = true;
            item.issues.forEach((issueIds) => {
              if (issueIds.stageId == "1") {
                this.diseaseAskData = issueIds.issueIds;
                this.upDiseaseData.issues[0].issueIds = issueIds.issueIds;
              }
              if (issueIds.stageId == "2") {
                this.diseaseWatchData = issueIds.issueIds;
                this.upDiseaseData.issues[1].issueIds = issueIds.issueIds;
              }
              if (issueIds.stageId == "3") {
                this.diseaselistenData = issueIds.issueIds;
                this.upDiseaseData.issues[2].issueIds = issueIds.issueIds;
              }
              if (issueIds.stageId == "4") {
                this.upDiseaseData.issues[3].issueIds = issueIds.issueIds;
                this.diseasePressData = issueIds.issueIds;
              }
            });
          }
        });
        if (!flag) {
          this.diseaseWatchData = [];
          this.diseaselistenData = [];
          this.diseaseAskData = [];
          this.diseasePressData = [];
          this.upDiseaseData = {
            id: "",
            issues: [
              { issueIds: [], stageId: "1" },
              { issueIds: [], stageId: "2" },
              { issueIds: [], stageId: "3" },
              { issueIds: [], stageId: "4" },
            ],
            name: "",
          };
        }
      } catch (error) {
        return error;
      }
    },

    //获取病症默认选项
    getDiseaseDefault() {
      this.axios.get(`/case/manage/${this.caseId}/disease`).then((res) => {
        try {
          this.diseaseDeafault = res.data.diseases[0].id;
          res.data.diseases.forEach((item) => {
            if (this.diseaseDeafault == item.id) {
              item.issues.forEach((issueIds) => {
                if (issueIds.stageId == "1") {
                  this.diseaseAskData = issueIds.issueIds;
                  this.upDiseaseData.issues[0].issueIds = issueIds.issueIds;
                }
                if (issueIds.stageId == "2") {
                  this.diseaseWatchData = issueIds.issueIds;
                  this.upDiseaseData.issues[1].issueIds = issueIds.issueIds;
                }
                if (issueIds.stageId == "3") {
                  this.diseaselistenData = issueIds.issueIds;
                  this.upDiseaseData.issues[2].issueIds = issueIds.issueIds;
                }
                if (issueIds.stageId == "4") {
                  this.upDiseaseData.issues[3].issueIds = issueIds.issueIds;
                  this.diseasePressData = issueIds.issueIds;
                }
              });
            }
          });
        } catch (error) {
          return error;
        }
      });
    },
    //获取全部信息
    getAlldata() {
      this.axios.get(`/case/manage/${this.caseId}/disease`).then((res) => {
        if (!res.data.diseaseName) return;
        //获取正确病名 证型选项
        this.searchDisease = res.data.diseaseName;
        this.diseaseNameId = res.data.diseaseNameId;
        let arr = JSON.parse(JSON.stringify(res.data.diseases));
        arr.forEach((item) => {
          delete item["issues"];
        });
        this.diseaseCheckArr = arr.sort((a, b) => {
          return a.id - b.id;
        });
        this.axios
          .get(`/meta/disease/${res.data.diseaseNameId}`)
          .then((res) => {
            this.diseaseCheckData = res.data.rows;
          });
        //获取正确望闻问切选项(病名)
        res.data.diseaseNameIssues.forEach((item) => {
          if (item.stageId == "1") {
            this.uploadName.issues[0].issueIds = item.issueIds;
            this.nameAskData = item.issueIds;
          }
          if (item.stageId == "2") {
            this.uploadName.issues[1].issueIds = item.issueIds;
            this.nameWatchData = item.issueIds;
          }
          if (item.stageId == "3") {
            this.uploadName.issues[2].issueIds = item.issueIds;
            this.namelistenData = item.issueIds;
          }
          if (item.stageId == "4") {
            this.uploadName.issues[3].issueIds = item.issueIds;
            this.namePressData = item.issueIds;
          }
        });
        //获取正确证型选项
        this.diseasecorrectData = res.data.diseases;
      });
    },
    //获取焦点查询
    focusName() {
      this.diseaseNameShow = true;
      this.axios
        .get("/meta/disease/name", {
          params: {
            name: this.searchDisease,
          },
        })
        .then((res) => {
          this.diseaseNameData = res.data;
        });
    },
  },
  watch: {
    searchDisease: function() {
      this.axios
        .get("/meta/disease/name", {
          params: {
            name: this.searchDisease,
          },
        })
        .then((res) => {
          this.diseaseNameData = res.data;
        });
    },
  },
};
</script>

<style lang="scss">
.case_dialectical {
  width: 96%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .dialectical_layout_left {
    width: 53%;
    height: 96%;
    background-color: rgb(212, 229, 255, 0.4);
    border-radius: 10px;
    .title {
      width: 100%;
      height: 5%;
      font-size: 1.2em;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .scrollbar {
      width: 100%;
      height: 88%;
    }
    li {
      display: flex;
    }
  }
  .dialectical_layout_right {
    width: 44%;
    height: 96%;
    position: relative;
    margin-left: 1%;
    background-color: rgb(212, 229, 255, 0.4);
    border-radius: 10px;
    ul {
      width: 94%;
      margin-left: 3%;
      li {
        margin-top: 20px;
        .tips {
          float: right;
        }
        .search {
          position: relative;
          input {
            width: 100%;
          }
          .search_down {
            width: 100%;
          }
        }
      }
      .layout {
        display: flex;
        flex-wrap: wrap;
        div {
          margin-bottom: 20px;
          width: 25%;
          display: flex;
          align-items: center;
        }
        .custom_radio {
          width: 22px;
          margin-bottom: 0px;
          margin-right: 10px;
          span {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
  .dialectical_submit {
    height: 85%;
    margin-top: 2%;
    .submit_top,
    .submit_bottom {
      cursor: pointer;
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: rgb(111, 147, 251);
      .el-icon-right {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
  .dialectical_layout_left_two,
  .dialectical_layout_right_two {
    width: 47.5%;
    height: 85%;
    margin-top: 2%;
    background-color: rgb(212, 229, 255, 0.4);
    border-radius: 10px;
    position: relative;
    .disease {
      position: absolute;
      right: 10px;
    }
    .scrollbar {
      width: 99%;
      height: 100%;
      .main_cont {
        width: 100%;
        height: 84%;
        li {
          display: flex;
        }
      }
    }
    .title {
      height: 8%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1% 0 3%;
      border-bottom: 1px solid rgb(111, 147, 251);
      div {
        width: 100px;
        margin-left: 15px;
        display: flex;
        align-items: center;
      }
      .custom_radio {
        width: 22px;
        height: 22px;
        margin: 0 0;
      }
    }
    .custom_radio {
      width: 20px;
      height: 20px;
      &:hover {
        color: rgb(111, 147, 251);
      }
      i {
        font-size: 20px;
      }
    }
  }
  .dialectical_layout_right_two {
    background-color: transparent;
    display: flex;
    width: 45%;
    flex-direction: column;
    .dialectical_warp {
      width: 100%;
      height: 49%;
      background-color: rgb(212, 229, 255, 0.4);
      overflow: hidden;
      border-radius: 10px;

      .dialectical_submit {
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-content: center;
      }
      .title {
        height: 60px;
      }
      .scrollbar {
        height: 78%;
        .main_cont {
          height: 100%;
        }
      }
    }
  }

  //   公共样式
  .edit_submit {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .main_tab {
    display: flex;
    position: relative;
    height: 5%;
    width: 100%;
    display: flex;
    padding-left: 2%;
    font-size: 1.2em;
    margin-bottom: 1%;
    .item_title {
      cursor: pointer;
      width: 5%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .active {
      position: absolute;
      width: 80%;
      bottom: 0;
      border: 3px solid rgb(111, 147, 251);
      border-radius: 3px;
    }
  }

  .main_cont {
    width: 99%;
    height: 100%;
    padding-left: 1%;
    overflow-y: auto;
    li {
      position: relative;
      padding: 1%;
      width: 99%;
      .custom_radio {
        margin-bottom: 12px;
      }
      p {
        margin-right: 1%;
      }
    }
  }
}
</style>
