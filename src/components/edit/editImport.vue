<template>
  <div class="editimport">
    <div class="case_right edit">
      <div class="edit_title">
        <span class="title">导入{{ title }}</span>
        <span class="edit_switch" @click="close()"></span>
      </div>
      <div class="case_right_cont">
        <ul>
          <li>
            <i>*</i>
            <span>第一步:</span>
          </li>
          <li>
            <button class="submit" @click="downLoad">下载模板</button>
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
              <input type="file" @change="getFile()" ref="file" />
            </div>
            <div>
              <span>仅支持Excel文件</span>
            </div>
          </li>
          <li>
            <input type="text" disabled class="disabled" v-model="path" />
          </li>
        </ul>
      </div>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-import",
  props: ["title", "uploadUrl"],
  data() {
    return {
      xlsxFile: "",
      path: "",
    };
  },
  methods: {
    getFile() {
      this.xlsxFile = this.$refs.file.files[0];
      this.path = this.$refs.file.value;
    },
    downLoad() {
      this.$emit("downLoad");
    },
    close() {
      this.$parent.editload = false;
      this.$parent.mask = false;
    },
    submit() {
      if (!this.xlsxFile) {
        return this.$Message.error("请先添加文件!");
      }
      let formData = new window.FormData();
      formData.append("file", this.xlsxFile);
      this.upload.post(this.uploadUrl, formData).then((res) => {
        if (res.code == "000000") {
          if (res.data.errors.length != 0) {
            this.$parent.errors = true;
            this.$parent.errorData = res.data.errors;
            this.close();
            this.$parent.mask = true;
            return;
          }
          this.$Message.warning(`${this.title}导入成功!`);
          this.close();
          this.$parent.mask = false;
          this.$emit("getData");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.editimport {
  z-index: 9999;
  position: absolute;
  left: 50%;
  margin-left: -235px;
  z-index: 99;

  .case_right {
    .case_right_cont {
      height: 300px;
      width: 85%;
      margin-left: 35px;
      margin-top: 35px;

      ul {
        li {
          display: flex;
          align-items: center;
          height: 50px;
          margin-top: 10px;

          i {
            margin-top: 8px;
            margin-right: 10px;
            color: rgb(255, 0, 0);
          }

          .submit {
            color: rgb(255, 255, 255);
            width: 110px;
            margin-left: 15px;
            margin-right: 15px;
          }

          .case_rigt_tips {
            display: flex;
            flex-direction: column;
          }

          .disabled {
            width: 90%;
            height: 40px;
            margin-left: 15px;
            background: rgb(255, 255, 255);
            padding-left: 10px;
            font-size: 18px;
          }

          .upload {
            position: relative;

            input {
              width: 110px;
              height: 40px;
              position: absolute;
              left: 15px;
              top: 0;
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>