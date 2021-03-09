<template>
  <div class="case_layout">
    <div class="main_mask" v-if="main_mask||allShow"></div>
    <edit-errors v-if="errors" :errorData="errorsData"></edit-errors>
    <!-- 编辑弹窗 -->
    <case-problem
      v-if="edit_cont"
      :editData="editData"
      :typeId="typeId"
      @getaskData="getaskData"
    ></case-problem>
    <!-- 提示弹窗 -->
    <tips v-if="tips"></tips>
    <!-- 删除弹窗 -->
    <edit-dele v-if="allShow" :title="`删除`" @deleSubmit="deleSubmit">
      <template v-slot:edit_p>
        <p>确定删除本条信息吗?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <!-- 现病史颜色分类 -->
    <div class="ask_add_color" v-if="askColorshow">
      <div class="edit">
        <div class="edit_title">
          <span class="title">提示</span>
          <span class="edit_switch" @click="askColorshow = false"></span>
        </div>
        <div class="edit_left big">
          <span class="edit_red">*</span>
          <span class="edit_text">请选择现病史问题分类</span>
          <customize-select></customize-select>
        </div>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="askColorshow = false">
            取消
          </button>
          <button class="edit_submit" @click="uploadAskData(editData.colorId)">
            确定
          </button>
        </div>
      </div>
    </div>
    <div class="case_left" style="width: 60%">
      <case-header></case-header>
      <main>
        <ul class="main_tab">
          <li
            v-for="(item, index) in tabData"
            :key="index"
            class="item_title"
            @click="container(item.moduleId)"
          >
            {{ item.name }}
            <div :class="{ active: item.moduleId == typeId }"></div>
          </li>
          <i class="tips" @click="opneTips"></i>
        </ul>
        <div class="content scrollbar" style="height: 80%">
          <div class="content_scrollbar teacher_case_ask" ref="scroll">
            <ul>
              <li v-for="(item, index) in askData" :key="index">
                <i
                  v-if="typeId == 1"
                  :style="{ background: select[item.colorId].color }"
                ></i>
                <div class="item_cont" style="flex-direction: column">
                  <span>问: {{ item.question }}</span>
                  <span>答: {{ item.answer }}</span>
                </div>
                <div class="item_edit">
                  <i class="icon_edit" @click="openCont(item)"></i>
                  <i class="icon_dele" @click="openDele(item)"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="content_bottom teacher_case_ask_add">
          <label for="" style="color: rgb(111, 147, 251);">干扰项</label>
          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{
                active_checkbox: upDatacorrect == true,
              }"
            ></span>
            <input
              class="custom_none"
              type="checkbox"
              v-model="upDatacorrect"
            />
          </div>
          <input
            type="text"
            class="text_box"
            v-model="question"
            placeholder="请输入问题..."
          />
          <input
            type="text"
            class="text_box"
            v-model="answer"
            placeholder="请输入答案.."
          />
          <button class="submit" @click="submit">添加</button>
        </div>
      </main>
    </div>
    <div class="case_right" style="width: 38.5%">
      <div class="case_right_title">
        <span>导入问诊问题及答案</span>
      </div>
      <div class="case_right_cont">
        <ul>
          <li>
            <i>*</i>
            <span>第一步:</span>
          </li>
          <li>
            <button class="submit" @click="download">下载模板</button>
            <div class="case_rigt_tips">
              <span>请先下载Excel模板</span>
              <span>(已有模板请执行第二步)</span>
            </div>
          </li>
          <li>
            <i>*</i>
            <span>第二步:</span>
          </li>
          <li>
            <div class="upload">
              <button class="submit">选择文件</button>
              <input type="file" @change="changeFile()" ref="file" />
            </div>
            <div>
              <span>仅支持Excel文件</span>
            </div>
          </li>
          <li>
            <input type="text" disabled class="disabled" v-model="route" />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="close">取消</button>
          <button class="edit_submit" @click="submitExcel">确定</button>
        </div>
        <div class="case_right_desc">
          <span>提示:</span>
          <span>
            1.下载问诊问题模板,在模板中输入问题及答案,上传模板后即可导入问诊数据
          </span>
          <span> 2.上传完成后可以在网页中直接修改 </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import caseProblem from "../edit/caseProblem";
import caseHeader from "../edit/caseHeader";
import tips from "../edit/tips";
import editDele from "../../../components/edit/editDele";
import customizeSelect from "../../../components/customizeSelect";
import editErrors from "../../../components/edit/editErrors";
export default {
  name: "edit-look",
  components: {
    caseProblem,
    tips,
    editDele,
    caseHeader,
    customizeSelect,
    editErrors,
  },
  data() {
    return {
      select: [
        {
          title: "发病情况",
          color: "rgb(255,167,39)",
        },
        {
          title: "主症特点",
          color: "rgb(254,236,74)",
        },
        {
          title: "伴随症状及鉴别诊断症状",
          color: "rgb(115,213,114)",
        },
        {
          title: "诊疗过程",
          color: "rgb(36,169,245)",
        },
        {
          title: "发作情况",
          color: "rgb(150,117,206)",
        },
        {
          title: "刻下症",
          color: "rgb(0,230,255)",
        },
      ],
      typeId: "0",
      itemid: "",
      upDatacorrect: false,
      caseId: "",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
      askColorshow: false,
      answer: "",
      question: "",
      askData: {},
      editData: {},
      tabData: {},
      excel: "",
      errors: false,
      errorsData: "",
      main_mask: false,
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getaskData();
    this.getTabdata();
  },
  methods: {
    download() {
      let url = this.$url.replace("/download/", "");
      window.location.href = `${url}/case/manage/ask/template`;
    },
    close() {
      this.route = "";
      this.excel = "";
    },
    submitExcel() {
      let fromData = new window.FormData();
      fromData.append("file", this.excel);
      this.upload
        .post(`/case/manage/${this.caseId}/import`, fromData)
        .then((res) => {
          if (res.code == "000000") {
            if (res.data.errors.length != 0) {
              this.errorsData = res.data.errors;
              this.route = "";
              this.excel = "";
              this.main_mask = true;
              this.getaskData();
              this.errors = true;
              return;
            }
            this.route = "";
            this.excel = "";
            this.getaskData();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    container(i) {
      this.typeId = i;
      this.getaskData();
    },
    changeFile() {
      this.route = this.$refs.file.value;
      this.excel = this.$refs.file.files[0];
    },
    openCont(e) {
      this.editData = e;
      this.editData.correct = !e.correct;
      this.edit_cont = true;
      this.main_mask = true;
    },
    opneTips() {
      this.tips = true;
    },
    openDele(e) {
      this.allShow = true;
      this.itemid = e.id;
    },
    getTabdata() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          this.tabData = res.data;
        });
    },
    deleSubmit() {
      this.axios
        .delete(`/case/manage/${this.caseId}/ask/${this.itemid}`)
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("删除成功!");
            this.getaskData();
            this.allShow = false;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    submit() {
      if (!this.answer) return this.$Message.error("请输入问题!");
      if (!this.question) return this.$Message.error("请输入答案!");
      if (this.typeId == "1") {
        return (this.askColorshow = true);
      }
      this.uploadAskData();
    },
    uploadAskData(colorId = "0") {
      this.http
        .post(`/case/manage/${this.caseId}/ask`, {
          answer: this.answer,
          colorId: colorId,
          correct: !this.upDatacorrect,
          question: this.question,
          typeId: this.typeId,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.answer = "";
            this.question = "";
            this.upDatacorrect = false;
            this.getaskData();
            this.askColorshow = false;
            setTimeout(() => {
              this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight + 55;
            }, 1000);
            this.$Message.warning("添加成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    getaskData() {
      this.axios
        .get(`/case/manage/${this.caseId}/ask`, {
          params: {
            page: "1",
            size: "500",
            typeId: this.typeId,
          },
        })
        .then((res) => {
          if (res.code == "000000") {
            this.askData = res.data.rows;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.teacher_case_ask {
  ul {
    li {
      padding: 3px 15px !important;
      height: auto !important;
      .item_cont {
        width: 91%;
        display: flex;
        span {
          width: 100%;
        }
      }
    }
  }
}
.teacher_case_ask_add {
  justify-content: space-between;
  .text_box {
    width: 40% !important;
  }
  .submit {
   margin-left: 0 !important;
  }
}
.ask_add_color {
  .edit_left {
    margin-top: 20px;
    margin-left: 80px;
    .edit_red {
      color: red;
    }
  }
  .select_layout {
    margin-top: 20px;
  }
}
</style>