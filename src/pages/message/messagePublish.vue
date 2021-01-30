<template>
  <div class="message_publish">
    <img alt="" />
    <div class="publish_select">
      <selectBox
        :title="'病系'"
        :listData="list"
        :typeId="'diseaseType'"
        :itemName="'name'"
        :itemId="'diseaseType'"
        :defaultTitle="'请选择病系'"
      ></selectBox>
    </div>
    <div class="publish_text">
      <label for>标题</label>
      <input
        type="text"
        placeholder="请输入问题标题..."
        maxlength="30"
        class="text_box"
        v-model="title"
      />
      <span>{{ title.length }}/30</span>
    </div>
    <div class="publish_area">
      <label for>内容</label>
      <textarea
        placeholder="请输入问题内容..."
        v-model="message"
        maxlength="130"
      ></textarea>
      <span>{{ message.length }}/130</span>
    </div>
    <div class="input_file">
      <div
        class="preview_img"
        :class="{ small: index > 0 }"
        v-for="(item, index) in imgUrl"
        :key="index"
      >
        <i @click="deleImg(index)"></i>
        <img :src="item" alt="" />
      </div>
      <input type="file" accept="image/*" @change="uploadImgs" ref="imgs" />
      <p>+</p>
    </div>
    <button class="submit" @click="submit">提交</button>
  </div>
</template>

<script>
import selectBox from "../../components/selectBox";
export default {
  name: "message-publish",
  components: {
    selectBox,
  },
  data() {
    return {
      message: "",
      title: "",
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
      diseaseType: "",
      file: "",
      imgUrl: [],
      uploadImgData: [],
    };
  },
  methods: {
    submit() {
      if (!this.diseaseType) {
        this.$Message.error("请选择病系");
        return;
      }
      if (!this.title) {
        this.$Message.error("请输入标题");
        return;
      }
      if (this.imgUrl.length > 3) {
        this.$Message.error("照片超出上限3张");
        return;
      }
      let promise = [];
      for (let i = 0; i < this.uploadImgData.length; i++) {
        let formData = new window.FormData();
        promise.push(
          new Promise((resolve, rejected) => {
            formData.append("file", this.uploadImgData[i]);
            this.upload.post("upload", formData).then((res) => {
              if (res.code == "000000") {
                return resolve(res.data);
              } else {
                return rejected();
              }
            });
          })
        );
      }
      Promise.all(promise).then((res) => {
        this.http
          .post("/topic", {
            diseaseType: this.diseaseType,
            imgs: res,
            message: this.message,
            title: this.title,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.diseaseType = "";
              this.message = "";
              this.title = "";
              let authority = localStorage.getItem("authority");
              if (authority == "STUDENT") {
                this.$store.state.menuId = 2;
                this.$router.push("/messagemy");
              }
            } else {
              this.$Message.error(res.msg);
            }
          });
      });
    },
    //上传图片
    uploadImgs() {
      let file = "";
      if (this.imgUrl.length > 2) {
        this.$Message.error("图片超出上限3张");
        return;
      }
      file = this.$refs.imgs.files[0];
      this.uploadImgData.push(file);
      let fileExample = new FileReader();
      fileExample.readAsDataURL(file);
      fileExample.onload = (ev) => {
        this.imgUrl.push(ev.target.result);
      };
    },
    //删除预览图片
    deleImg(index) {
      this.imgUrl.splice(index, 1);
      this.uploadImgData.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.message_publish {
  width: 60%;
  height: 80%;
  margin-top: 3%;
  margin-left: 25%;
  label {
    margin-right: 1em;
  }
  .publish_select {
    display: flex;
  }
  .publish_text {
    width: 80%;
    margin: 2em 0;
    position: relative;
    display: flex;
    align-items: center;
    .text_box {
      width: 93%;
    }

    span {
      position: absolute;
      color: rgb(111, 147, 251);
      right: 3%;
    }
  }
  .publish_area {
    width: 80%;
    position: relative;

    display: flex;
    textarea {
      width: 93%;
      height: 20em;
      padding: 1%;
    }

    span {
      position: absolute;
      color: rgb(111, 147, 251);
      right: 20px;
      bottom: 10px;
    }
  }
  .input_file {
    width: 78.8%;
    height: 7em;
    position: relative;
    margin-top: 2em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    input {
      width: 7em;
      height: 7em;
      outline: none;
      opacity: 0;
      z-index: 99;
      right: 0;
      position: absolute;
    }
    p {
      color: rgb(255, 255, 255);
      background-color: rgb(111, 147, 251);
      width: 2.3em;
      height: 2.3em;
      line-height: 2.3em;
      text-align: center;
      font-size: 3em;
      font-weight: bold;
    }
    .preview_img {
      border: 1px solid rgb(111, 147, 251);
      position: relative;
      margin-right: 3%;
      width: 7em;
      height: 7em;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../assets/public/error.png") no-repeat center;
        border-radius: 50%;
        position: absolute;
        right: -15px;
        top: -14px;
      }
    }
  }
  .submit {
    width: 30%;
    margin-left: 27%;
    margin-top: 3%;
  }
}
</style>