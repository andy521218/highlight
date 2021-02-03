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
          <li v-if="pulseData.answer">
            <span style="width: 50px"> 脉诊 </span>
            <p>-----</p>
            {{ pulseData.answer }}
          </li>
          <li v-for="(item, index) in pressData" :key="index">
            <span style="width: 50px">
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
              style="border-bottom: none"
              class="text_box"
              v-model="searchDisease"
              @focus="focusName"
              @blur="timerDiseaseout"
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
      <div class="title">
        病名:{{ searchDisease }}
        <button class="submit" @click="submitName">添加到辩证</button>
      </div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="typeId = index"
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
            <div>
              <div class="custom_radio" style="margin-right: 10px">
                <span
                  class="custom_text"
                  :class="{
                    active_checkbox: nameAskData.indexOf(item.id) > -1,
                  }"
                ></span>
                <input
                  type="checkbox"
                  class="custom_none"
                  :value="item.id"
                  v-model="nameAskData"
                />
              </div>
            </div>
            <div style="display: flex; flex-direction: column">
              <span class="start">问:{{ item.question }}</span>
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
                  active_checkbox: nameWatchData.indexOf(item.id) > -1,
                }"
              ></span>
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
                  active_checkbox: namelistenData.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                :value="item.id"
                v-model="namelistenData"
              />
            </div>
            {{ item.name }}
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
                  active_checkbox: namePressData.indexOf(pulseData.id) > -1,
                }"
              ></span>
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
          <li v-for="(item, index) in pressData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: namePressData.indexOf(item.id) > -1,
                }"
              ></span>
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
    <!-- 右侧 -->
    <div class="dialectical_layout_right_two" v-show="!step">
      <button
        class="edit_submit"
        style="right: 0; bottom: -10%"
        @click="changeView"
        v-show="!step"
      >
        上一步
      </button>
      <div class="title" style="justify-content: flex-start">
        证型:
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
        <button class="submit disease" @click="submitDisease">辨证依据</button>
      </div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="diseaseChangeId = index"
        >
          {{ item }}
          <div :class="{ active: diseaseChangeId == index }"></div>
        </li>
      </ul>
      <!-- 问诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 0">
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
                  active_checkbox: diseaseAskData.indexOf(item.id) > -1,
                }"
              ></span>
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
        </ul>
      </div>

      <!-- 望诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 1">
        <ul class="main_cont">
          <li v-for="(item, index) in wachData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: diseaseWatchData.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                class="custom_none"
                type="checkbox"
                :value="item.id"
                v-model="diseaseWatchData"
              />
            </div>
            {{ item.name }}
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 闻诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 2">
        <ul class="main_cont">
          <li v-for="(item, index) in listenData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: diseaselistenData.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                class="custom_none"
                type="checkbox"
                :value="item.id"
                v-model="diseaselistenData"
              />
            </div>
            {{ item.name }}
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>

      <!-- 切诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 3">
        <ul class="main_cont">
          <li v-if="pulseData.answer">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: diseasePressData.indexOf(pulseData.id) > -1,
                }"
              ></span>
              <input
                class="custom_none"
                type="checkbox"
                :value="pulseData.id"
                v-model="diseasePressData"
              />
            </div>
            脉诊
            <p>-----</p>
            {{ pulseData.answer }}
          </li>
          <li v-for="(item, index) in pressData" :key="index">
            <div class="custom_radio" style="margin-right: 10px">
              <span
                class="custom_text"
                :class="{
                  active_checkbox: diseasePressData.indexOf(item.id) > -1,
                }"
              ></span>
              <input
                class="custom_none"
                type="checkbox"
                :value="item.id"
                v-model="diseasePressData"
              />
            </div>
            {{ item.name }}
            <p>-----</p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "user-dialectical",
  data() {
    return {
      tab: ["问", "望", "闻", "切"],
      diseaseNameShow: false,
      caseId: "",
      typeId: "",
      examNo: "",
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
      diseaseUpdata: {},
      diseaseCheckArr: [],
      diseaseCheckArr1: [],
      diseaseDeafault: "",
      diseaseChangeId: "",
      nameWatchData: [],
      namelistenData: [],
      nameAskData: [],
      namePressData: [],
      diseaseWatchData: [],
      diseaselistenData: [],
      diseaseAskData: [],
      diseasePressData: [],
      diseasecorrectData: {},
      upDiseaseName: [
        { issueIds: [], stageId: "1" },
        { issueIds: [], stageId: "2" },
        { issueIds: [], stageId: "3" },
        { issueIds: [], stageId: "4" },
      ],
      upDiseaseData: {
        id: "",
        issues: [
          { issueIds: [], stageId: "1" },
          { issueIds: [], stageId: "2" },
          { issueIds: [], stageId: "3" },
          { issueIds: [], stageId: "4" },
        ],
        name: "",
      },
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getListendata();
    this.getAskdata();
    this.getPressData();
    this.getPulseData();
    this.getAlldata();
    this.getDiseaseDefault();
    // 获取望诊数据
    for (let i = 0; i < 3; i++) {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/watch/${i}`)
        .then((res) => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].answer) {
              this.wachData.push(res.data.list[i]);
            }
          }
        });
    }
  },
  methods: {
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
        // this.getAlldata();
        this.diseaseWatchData = [];
        this.diseaselistenData = [];
        this.diseaseAskData = [];
        this.diseasePressData = [];
        this.getDiseaseDefault();
      } else {
        // this.diseaseWatchData = [];
        // this.diseaselistenData = [];
        // this.diseaseAskData = [];
        // this.diseasePressData = [];
        // this.getAlldata();
        this.diseaseUpdata = "";
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
        this.axios.post(`/answer/${this.examNo}/${this.caseId}/disease`, {
          diseaseId: item.id,
        });
        return;
      }
      this.axios.delete(
        `/answer/${this.examNo}/${this.caseId}/disease/${item.id}`
      );
    },
    // 获取闻诊数据
    getListendata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/listen`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].answer) {
              this.listenData.push(res.data[i]);
            }
          }
        });
    },
    //获取问诊数据
    getAskdata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/asked`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.askData = res.data;
        });
    },
    //获取按诊数据
    getPressData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/press`)
        .then((res) => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].answer) {
              this.pressData.push(res.data.list[i]);
            }
          }
        });
    },
    //获取脉诊数据
    getPulseData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/pulse`)
        .then((res) => {
          if (res.data.answer) {
            this.pulseData = res.data;
          }
        });
    },
    // search正确病名
    diseaseVal(e) {
      this.diseaseCheckArr = [];
      this.searchDisease = e.name;
      this.diseaseNameId = e.id;
      this.axios.get(`/meta/disease/${e.id}`).then((res) => {
        this.diseaseCheckData = res.data.rows;
      });
      //设置更改病名
      this.http
        .post(`/answer/${this.examNo}/${this.caseId}/diseasename/${e.id}`)
        .then(() => {
          this.diseaseWatchData = [];
          this.diseaselistenData = [];
          this.diseaseAskData = [];
          this.diseasePressData = [];
          this.nameAskData = [];
          this.namelistenData = [];
          this.nameWatchData = [];
          this.namePressData = [];
        });
    },
    //获取病症默认选项
    getDiseaseDefault() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/disease`)
        .then((res) => {
          try {
            this.diseaseDeafault = res.data.diseases[0].id;
            this.diseasecorrectData.forEach((item) => {
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
    // 查看证型单选项
    seeDisease(e) {
      this.diseaseUpdata = e;
      this.getAlldata();
      let flag = false;
      let ask_flag = false;
      let watch_flag = false;
      let listen_flag = false;
      let press_flag = false;
      try {
        this.diseasecorrectData.forEach((item) => {
          if (e.id == item.id) {
            flag = true;
            if (item.issues == null) {
              this.diseaseWatchData = [];
              this.diseaselistenData = [];
              this.diseaseAskData = [];
              this.diseasePressData = [];
            }
            item.issues.forEach((issueIds) => {
              if (issueIds.stageId == "1") {
                this.diseaseAskData = issueIds.issueIds;
                this.upDiseaseData.issues[0].issueIds = issueIds.issueIds;
                ask_flag = true;
              }
              if (issueIds.stageId == "2") {
                this.diseaseWatchData = issueIds.issueIds;
                this.upDiseaseData.issues[1].issueIds = issueIds.issueIds;
                watch_flag = true;
              }
              if (issueIds.stageId == "3") {
                this.diseaselistenData = issueIds.issueIds;
                this.upDiseaseData.issues[2].issueIds = issueIds.issueIds;
                listen_flag = true;
              }
              if (issueIds.stageId == "4") {
                this.upDiseaseData.issues[3].issueIds = issueIds.issueIds;
                this.diseasePressData = issueIds.issueIds;
                press_flag = true;
              }
            });
          }
        });
        if (!ask_flag) {
          this.diseaseAskData = [];
        }
        if (!watch_flag) {
          this.diseaseWatchData = [];
        }
        if (!listen_flag) {
          this.diseaselistenData = [];
        }
        if (!press_flag) {
          this.diseasePressData = [];
        }
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
    //上传病名
    submitName() {
      this.http
        .put(
          `/answer/${this.examNo}/${this.caseId}/diseasename/${this.diseaseNameId}`,
          [
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
          ]
        )
        .then((res) => {
          if (res.code == "000000") {
            this.getAlldata();
            this.$Message.warning(`设置病名成功!`);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    //上传病症
    submitDisease() {
      let index = this.diseaseCheckArr1
        .map((item) => item.id)
        .indexOf(this.diseaseDeafault);
      if (index == "-1") return this.$Message.error("请选择一项证型");

      this.http
        .put(`/answer/${this.examNo}/${this.caseId}/disease`, {
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
        })
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
    //获取全部信息
    async getAlldata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/disease`)
        .then((res) => {
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
              this.upDiseaseName[0].issueIds = item.issueIds;
              this.nameAskData = item.issueIds;
            }
            if (item.stageId == "2") {
              this.upDiseaseName[1].issueIds = item.issueIds;
              this.nameWatchData = item.issueIds;
            }
            if (item.stageId == "3") {
              this.upDiseaseName[2].issueIds = item.issueIds;
              this.namelistenData = item.issueIds;
            }
            if (item.stageId == "4") {
              this.upDiseaseName[3].issueIds = item.issueIds;
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
    searchDisease: function () {
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

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
          width: 175px;
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
      height: 98%;
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
      border-bottom: rgb(212, 229, 255) 1px solid;
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
    }
  }
  .dialectical_layout_left_two {
    margin-right: 1.5%;
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
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-right: 1%;
    }

    .active {
      position: absolute;
      width: 100%;
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
      font-size: 1.1em;
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