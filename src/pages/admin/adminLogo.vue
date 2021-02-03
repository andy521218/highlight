<template>
  <div class="admin_logo">
    <div class="logo_box">
      <img :src="url" alt="" />
      <img src="../../assets/public/uploadImg1.png" alt="" />
      <input type="file" class="logo_file" @change="getFile" ref="logo" />
      <span @click="deleLogo">删除</span>
      <button class="submit" @click="uploadLogo">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/metrics/logo",
      logoFile: "",
    };
  },
  mounted() {
    let url = this.$url.replace("/download/", "");
    this.url = url + this.url;
  },
  methods: {
    getFile() {
      this.logoFile = this.$refs.logo.files[0];
      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.logoFile);
      fileExample.onload = (ev) => {
        this.url = ev.target.result;
      };
    },
    uploadLogo() {
      let fromData = new window.FormData();
      fromData.append("file", this.logoFile);
      this.upload.post("/upload", fromData).then((res) => {
        this.axios
          .post("/settings/logo", {
            path: res.data,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.logoFile = "";
              this.$Message.warning("更改成功!");
            } else {
              this.$Message.error(res.msg);
            }
          });
      });
    },
    deleLogo() {
      this.axios
        .delete("/settings/logo")
        .then(() => {
          let url = this.$url.replace("/download/", "");
          this.url = url + "/metrics/logo";
        })
        .catch((res) => {
          this.$Message.error(res.msg);
        });
    },
  },
};
</script>

<style lang="scss">
.admin_logo {
  width: 100%;
  height: 80%;
  .logo_box {
    width: 50%;
    height: 80%;
    margin: 5% auto;
    position: relative;
    display: flex;
    justify-content: center;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      max-height: 100%;
      max-width: 100%;
      transform: translate(-50%, -50%);
    }
    .logo_file {
      position: absolute;
      opacity: 0;
      z-index: 99;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    span {
      position: absolute;
      color: red;
      bottom: 0%;
      right: 20%;
      cursor: pointer;
    }
    .submit {
      position: absolute;
      bottom: 0;
      width: 20em;
    }
  }
}
</style>
