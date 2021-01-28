<template>
  <div class="login-right">
    <div class="login-right_bg">
      <div class="login-right_bg_box">
        <div class="login-box user">
          <img src="../assets/img/login/user.png" alt />
          <input type="text" v-model="user" :placeholder="userItps" />
        </div>
        <div class="login-box pwd">
          <img src="../assets/img/login/pwd.png" alt />
          <input type="text" v-model="pwd" :placeholder="passwordlItps" />
        </div>
        <div class="related">
          <div class="related_left"></div>
          <div class="related_right">
            <span @click="sendEmail" style="color: red">{{ sendText }}</span>
            <span v-show="text_show">秒后重新发送</span>
          </div>
        </div>
        <div class="login_bottom">
          <button
            class="edit_cancel"
            @click="$parent.RetrievePassword_show = false"
          >
            取消
          </button>
          <button class="edit_submit" @click="submit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RetrievePassword",
  data() {
    return {
      user: "",
      userItps: "请输入预留邮箱",
      passwordlItps: "请输入验证码",
      sendText: "发送验证码",
      pwd: "",
      token: "",
      text_show: false,
    };
  },
  methods: {
    close() {
      this.user = "";
      this.userItps = "请输入预留邮箱";
      this.passwordlItps = "请输入验证码";
      this.sendText = "发送验证码";
      this.pwd = "";
      this.token = "";
      this.$parent.RetrievePassword_show = false;
    },
    sendEmail() {
      if (this.sendText == "发送验证码" || this.sendText == "重新发送") {
        if (!this.user) {
          this.$Message.error("请输入邮箱");
          return;
        }
        /* eslint-disable */
        var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        if (!reg.test(this.user)) {
          this.$Message.error("邮箱格式错误");
          return;
        }

        this.axios
          .post("/help/reset_pwd/identity/email/verifycode", {
            email: this.user,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.sendText = 60;
              this.text_show = true;
              let time = setInterval(() => {
                this.sendText--;
                if (this.sendText == 0) {
                  this.sendText = "重新发送";
                  this.text_show = false;
                  clearInterval(time);
                }
              }, 1000);
            } else {
              this.$Message.error(res.msg);
            }
          });
      }
    },
    submit() {
      if (
        this.userItps == "请输入预留邮箱" &&
        this.passwordlItps == "请输入验证码"
      ) {
        if (!this.user) {
          this.$Message.error("请输入邮箱");
          return;
        }
        /* eslint-disable */
        var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        if (!reg.test(this.user)) {
          this.$Message.error("邮箱格式错误");
          return;
        }

        if (!this.pwd) {
          this.$Message.error("请输入验证码");
          return;
        }

        if (!/^\d{8}$/.test(this.pwd)) {
          this.$Message.error("请输入8位验证码");
          return;
        }
        this.axios
          .post("/help/reset_pwd/identity/email", {
            email: this.user,
            verifyCode: this.pwd,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.userItps = "请输入密码";
              this.passwordlItps = "请确认新密码";
              this.user = "";
              this.pwd = "";
              this.token = res.data;
            } else {
              this.$Message.error(res.msg);
            }
          });
        return;
      }

      if (!this.user || !this.pwd) {
        this.$Message.error("密码不能为空");
        return;
      }
      if (this.user != this.pwd) {
        this.$Message.error("两次输入密码不一致");
        return;
      }
      this.axios
        .post("/help/reset_pwd/do", {
          pwd: this.pwd,
          token: this.token,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.close();
          } else {
            this.$Message.error("验证码超时!");
          }
        });
    },
  },
};
</script>

<style lang="scss">
.login_bottom {
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: space-between;
  .edit_cancel {
    background: rgb(255, 255, 255, 0.5);
  }
  button {
    width: 40%;
    height: 100%;
  }
}
</style>