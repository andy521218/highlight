<template>
  <div class="teacher case">
    <div class="main_mask" v-if="mask"></div>
    <!-- 删除案例 -->
    <edit-dele v-if="deleshow" :title="`删除案例`" @deleSubmit="deleSubmit">
      <template v-slot:edit_p>
        <p>确定删除案例?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <!-- 设为考核案例 -->

    <edit-dele :title="`设为考核案例`" @deleSubmit="addExam" v-if="allShow">
      <template v-slot:edit_p>
        <p>确定将选中的案例设为考核案例?</p>
        <p class="edit_dele_p">(设置后无法更改)</p>
      </template>
    </edit-dele>

    <edit-dele :title="`设为训练案例`" @deleSubmit="addTrain" v-if="trainshow">
      <template v-slot:edit_p>
        <p>确定将选中的案例设为训练案例?</p>
        <p class="edit_dele_p">(设置后无法更改)</p>
      </template>
    </edit-dele>
    <!-- 新增案例 -->
    <add-case v-if="addCase" :list="list" @getManage="getManage"></add-case>
    <div class="main_header">
      <div class="main_header_left">
        <button class="add" @click="add">新增案例</button>
        <button class="add_case one" @click="addAssessment">设为考核</button>
        <button class="add_case two" @click="addAssessTrain">设为训练</button>
      </div>
      <div class="main_header_right">
        <selectBox
          :title="'病系'"
          :listData="list"
          :typeId="'diseaseType'"
          :itemName="'name'"
          :itemId="'diseaseType'"
          :defaultTitle="'请选择病系'"
        ></selectBox>

        <selectBox
          :title="'分类'"
          :listData="options"
          :typeId="'searchOptions'"
          :itemName="'name'"
          :itemId="'upName'"
          :defaultTitle="'请选择分类'"
        ></selectBox>
        <button class="submit" @click="getManage('1')">检索</button>
      </div>
    </div>
    <div class="main_table" v-show="!main_show" style="height: 80%">
      <ul class="caseList">
        <li v-for="(item, index) in manageData" :key="index">
          <div class="case_top">
            <img :src="$url + item.picUrl" alt="" v-if="item.picUrl" />
            <div class="state">
              <div class="custom_radio">
                <span
                  class="custom_text"
                  :class="{ active_radio: active == item.caseId }"
                ></span>
                <input
                  type="radio"
                  class="custom_none"
                  v-model="check"
                  @change="getRadiodata(item)"
                  :value="item.caseId"
                />
              </div>
              <div class="state_item">
                <div class="item_one" v-if="!item.complete">
                  未<br />完<br />成
                </div>
                <div class="item_draft" v-if="item.draft">草<br />稿</div>
                <div class="item_two" v-if="item.train">训</div>
                <div class="item_three" v-if="item.exam">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit" @click="link(item)">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele(item)">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>姓名: {{ item.name }}</span>
            <span>性别: {{ item.gender ? "男" : "女" }}</span>
            <span>年龄: {{ item.age }}岁</span>
          </div>
        </li>
      </ul>
    </div>
    <main-itps v-show="main_show"></main-itps>
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
import mainItps from "../../components/mainItps";
import turnPage from "../../components/turnPage";
import editDele from "../../components/edit/editDele";
import addCase from "../../components/edit/addCase";
import selectBox from "../../components/selectBox";

export default {
  name: "teacher-case",
  components: {
    turnPage,
    editDele,
    addCase,
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
      options: [
        {
          upName: "isExam",
          name: "考核案例",
        },
        {
          upName: "isTrain",
          name: "训练案例",
        },
        {
          upName: "isCompelete",
          name: "完成案例",
        },
        {
          upName: "Compelete",
          name: "未完成案例",
        },
      ],
      addCase: false,
      deleshow: false,
      allShow: false,
      text: "",
      itps: "",
      diseaseType: "",
      manageData: {},
      total: "",
      size: "10",
      caseId: "",
      mask: false,
      check: "",
      trainshow: false,
      searchOptions: "",
      radioData: {},
      screenWidth: "",
      main_show: false,
      active: null,
    };
  },
  mounted() {
    localStorage.removeItem("caseMenuId");
    this.getManage();
  },
  methods: {
    dele(e) {
      this.deleshow = true;
      this.mask = true;
      this.caseId = e.caseId;
    },
    deleSubmit() {
      this.axios.delete(`/case/manage/${this.caseId}`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("删除案例成功!");
          this.deleshow = false;
          this.mask = false;
          this.getManage();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    add() {
      this.mask = true;
      this.addCase = true;
    },
    getRadiodata(item) {
      this.active = item.caseId;
      this.radioData = item;
    },
    addAssessTrain() {
      if (!this.check) return this.$Message.error("请选择一项案例!");
      this.trainshow = true;
      this.mask = true;
    },
    addExam() {
      if (!this.radioData.complete)
        return this.$Message.error("当前案例未完成,不可以设置为考核案例!");
      this.axios.put(`/case/manage/${this.check}/exam`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("设为考核案例成功!");
          this.allShow = false;
          this.mask = false;
          this.$refs.turnPage.change;
          this.getManage(this.$refs.turnPage.pages);
        } else {
          this.$Message.error("案例未完成,不可以设置为考核案例!");
        }
      });
    },
    addTrain() {
      if (!this.radioData.complete)
        return this.$Message.error("当前案例未完成,不可以设置为训练案例!");
      this.axios.put(`/case/manage/${this.check}/train`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("设为训练案例成功!");
          this.trainshow = false;
          this.mask = false;
          this.getManage(this.$refs.turnPage.pages);
        } else {
          this.$Message.error("案例未完成,不可以设置为训练案例!");
        }
      });
    },
    getManage(page = "1") {
      let isExam = "",
        isTrain = "",
        isCompelete = "";
      if (this.searchOptions == "isExam") isExam = true;
      if (this.searchOptions == "isTrain") isTrain = true;
      if (this.searchOptions == "isCompelete") isCompelete = true;
      if (this.searchOptions == "Compelete") isCompelete = false;
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
          } else {
            this.main_show = false;
          }
          this.manageData = res.data.rows;
          this.total = res.data.total;
        });
    },
    addAssessment() {
      if (!this.check) return this.$Message.error("请选择一项案例!");
      this.allShow = true;
      this.mask = true;
    },
    link(item) {
      if (!item.draft) {
        this.axios.post(`/case/manage/draft/${item.caseId}`).then((res) => {
          if (res.code == "000000") {
            localStorage.setItem("caseId", res.data);
            this.$router.push("/case");
            this.$Message.warning("开始修改案例!");
          } else {
            this.$Message.error(res.msg);
          }
        });
        return;
      }
      localStorage.setItem("caseId", item.caseId);
      this.$router.push("/case");
    },
  },
};
</script>

