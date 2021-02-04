<template>
  <div class="user_center">
    <div class="user_top">
      <div class="user_big">
        <input type="file" class="uploadlogo" @change="uploadlogo" ref="logo" />
        <img :src="imgurl" v-if="current.avatar" />
      </div>
      <span class="edit_logo">点击修改头像</span>
    </div>
    <div class="user_bottom">
      <ul>
        <li>
          <span>姓名:</span>
          <p>{{ current.userName }}</p>
        </li>
        <li>
          <span>班级:</span>
          <p>{{ current.classRoomName }}</p>
        </li>
        <li>
          <span>手机号:</span>
          <input class="text_box" type="text" v-model="current.mobile" />
        </li>
        <li>
          <span>{{ eamilTips }}:</span>
          <input
            class="text_box"
            type="text"
            :placeholder="emailPlaceholder"
            v-model="email"
          />
          <span class="verification_email" @click="editEmail">{{
            codeText
          }}</span>
        </li>
      </ul>
      <button class="submit" @click="submit">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-center",
  data() {
    return {
      current: {},
      email: "",
      eamilTips: "邮箱",
      emailPlaceholder: "请输入邮箱",
      codeText: "验证邮箱",
      initEamail: "",
      imgurl: "",
    };
  },
  mounted() {
    this.getCurrent();
  },
  methods: {
    getCurrent() {
      this.axios.get("/users/current").then((res) => {
        this.current = res.data;
        this.imgurl = this.$url + this.current.avatar;
        this.initEamail = this.email = res.data.email;
      });
    },
    uploadlogo() {
      let logo = this.$refs.logo.files[0];
      if (!logo) return;

      let fileExample = new FileReader();
      fileExample.readAsDataURL(logo);
      fileExample.onload = (ev) => {
        this.imgurl = ev.target.result;
        this.$store.state.avatar = ev.target.result;
      };
      let formData = new window.FormData();
      formData.append("file", logo);
      this.upload.post("/upload", formData).then((res) => {
        let url = this.qs.stringify({
          avatar: res.data,
        });
        this.http.put(`/users/avatar?${url}`);
      });
    },
    checkPhone() {
      if (!this.current.mobile) {
        this.$Message.error("手机号码不能为空!");
        return false;
      }
      if (
        !/^1(?:70\d|(?:9[89]|8[0-24-9]|7[135-8]|66|5[0-35-9])\d|3(?:4[0-8]|[0-35-9]\d))\d{7}$/.test(
          this.current.mobile
        )
      ) {
        this.$Message.error("请填写正确的手机号!");
        return false;
      }
      return true;
    },
    checkEmail() {
      if (!this.email) {
        /*eslint-disable*/
        this.$Message.error("请填写邮箱!");
        return false;
      }
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.email)) {
        this.$Message.error("请输入正确的邮箱!");
        return false;
      }
      return true;
    },
    editEmail() {
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.email)) {
        this.$Message.error("请输入正确的邮箱!");
        return;
      }
      this.axios
        .get("/my/email/verifycode", {
          params: {
            email: this.email,
          },
        })
        .then((res) => {
          if (res.code == "000000") {
            this.verifyCode = this.email;
            this.eamilTips = "验证码";
            this.emailPlaceholder = "请登入邮箱查看验证码";
            this.codeText = "已发送";
            this.email = "";
          }
        });
    },
    submit() {
      if (
        this.initEamail == undefined &&
        this.email != undefined &&
        this.codeText == "验证邮箱"
      ) {
        this.$Message.error("请点击验证邮箱,修改邮箱!");
        return;
      }

      if (this.initEamail != this.email && this.codeText == "验证邮箱") {
        this.$Message.error("请点击验证邮箱,修改邮箱!");
        return;
      }
      if (this.codeText == "已发送") {
        this.axios
          .put(
            `/my/email/change?${this.qs.stringify({
              email: this.verifyCode,
              verifyCode: this.email,
            })}`
          )
          .then((res) => {
            if (res.code == "000000") {
              let updata = this.qs.stringify({
                mobile: this.current.mobile,
                email: this.email,
              });
              this.axios.put(`/my/profile?${updata}`).then((res) => {
                if (res.code == "000000") {
                  this.eamilTips = "邮箱";
                  this.emailPlaceholder = "请输入邮箱";
                  this.codeText = "验证邮箱";
                  this.getCurrent();
                  return this.$Message.warning("修改成功!");
                } else {
                  this.$Message.error(res.msg);
                }
              });
            } else {
              this.$Message.error(res.msg);
            }
          });
        return;
      }
      if (!this.checkPhone() && !this.checkEmail()) return;
      let updata = this.qs.stringify({
        mobile: this.current.mobile,
        email: "",
      });
      this.axios.put(`/my/profile?${updata}`).then((res) => {
        if (res.code == "000000") {
          return this.$Message.warning("修改成功!");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.user_center {
  width: 100%;
  height: 100%;
  text-align: center;
  .user_top {
    width: 99%;
    height: 45%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(111, 147, 251);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .user_big {
      width: 18em;
      height: 18em;
      border: 1px solid rgb(111, 147, 251);
      border-radius: 50%;
      padding: 5px;
      position: relative;
      .uploadlogo {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .edit_logo {
      margin-top: 1%;
    }
  }
  .user_bottom {
    width: 100%;
    height: 55%;
    ul {
      margin-left: 22%;
      width: 70%;
      height: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      li {
        display: flex;
        width: 50%;
        position: relative;
        align-items: center;
        span {
          margin-right: 1%;
        }
        .verification_email {
          color: red;
          position: absolute;
          bottom: 0;
          right: 37%;
          cursor: pointer;
        }
        .text_box {
          width: 19em;
        }
      }
    }
    .submit {
      width: 23em;
      height: 3em;
    }
  }
  @media (max-width: 1366px) {
    .verification_email {
      right: 33% !important;
    }
  }
}
</style>