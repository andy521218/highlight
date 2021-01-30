<template>
  <div class="edit_problem">
    <div class="edit">
      <div class="edit_title">
        <span class="title">编辑</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">问题:</span>
          </div>
          <input type="text" class="text_box" v-model="editData.question" />
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">答案:</span>
          </div>
          <input type="text" class="text_box" v-model="editData.answer" />
        </li>
        <li>
          <div class="custom_radio">
            <span
              class="custom_text"
              :class="{ active_radio: editData.correct == true }"
            ></span>
            <input
              type="checkbox"
              class="custom_none"
              v-model="editData.correct"
            />
          </div>
          <!-- <input type="checkbox" class="checkbox" v-model="editData.correct" /> -->
          <label for="">干扰项</label>
          <div class="edit_left big" v-if="typeId == 1">
            <span class="edit_red">*</span>
            <span class="edit_text">请选择现病史问题分类</span>
          </div>
          <customize-select v-if="typeId == 1"></customize-select>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import customizeSelect from "../../../components/customizeSelect";
export default {
  name: "case-problem",
  props: ["editData", "typeId"],
  components: {
    customizeSelect,
  },
  data() {
    return {
      caseId: "",
      flag: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.flag = !this.editData.correct;
  },
  methods: {
    close() {
      this.$parent.edit_cont = false;
      this.$parent.editData.correct = this.flag;
      this.$parent.main_mask = false;
    },
    submit() {
      this.editData.typeId = this.typeId;
      this.editData.correct = !this.editData.correct;
      this.http
        .put(
          `/case/manage/${this.caseId}/ask/${this.editData.id}`,
          this.editData
        )
        .then((res) => {
          if (res.code == "000000") {
            this.close();
            this.$emit("getaskData");
            this.$Message.warning("编辑成功!");
          } else {
            this.message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss">
.edit_problem {
  .edit {
    width: 850px;
    left: 50%;
    margin-left: -425px;
    ul {
      position: relative;
      li {
        display: flex;
        .edit_left {
          width: 85px;
        }
        .big {
          width: 175px;
        }
        .checkbox {
          width: 22px;
          height: 22px;
          margin-left: 85px;
          margin-right: 10px;
        }
        label {
          margin-right: 150px;
        }
        input {
          width: 700px;
        }
        .select_layout {
          float: right;
          margin-right: 22px;
        }
        .custom_radio {
          margin-left: 85px;
          margin-right: 10px;
          input {
            width: 22px !important;
          }
        }
      }
      .answer,
      .question {
        position: absolute;
        top: 10px;
        right: 25px;
      }
    }
  }
}
</style>