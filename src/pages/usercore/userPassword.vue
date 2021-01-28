<template>
  <div class="user_pwd">
    <ul>
      <li style="position: relative">
        <span>新密码:</span>
        <div class="relative_input">
          <input
            :type="type"
            class="text_box"
            placeholder="请输入新密码"
            v-model="password.newPwd"
          />
          <i-con
            class="edit_pwd"
            type="ios-eye-off-outline"
            @click="type = 'text'"
            v-if="type == 'password'"
            style="color: rgb(111, 147, 251)"
          />
          <i-con
            class="edit_pwd"
            type="ios-eye-off-outline"
            @click="type = 'password'"
            v-else
            style="color: red"
          />
          <p>{{ newPwd }}</p>
        </div>
      </li>
      <li style="position: relative">
        <span>确认新密码:</span>
        <div class="relative_input">
          <input
            :type="type"
            class="text_box"
            placeholder="请确认新密码"
            v-model="password.confirmPwd"
          />
          <i-con
            class="edit_pwd"
            type="ios-eye-off-outline"
            @click="type = 'text'"
            v-if="type == 'password'"
            style="color: rgb(111, 147, 251)"
          />
          <i-con
            class="edit_pwd"
            type="ios-eye-off-outline"
            @click="type = 'password'"
            v-else
            style="color: red"
          />

          <p>{{ confirmPwd }}</p>
        </div>
      </li>
      <li>
        <button class="submit" @click="submit">保存</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "user-pwd",
  data() {
    return {
      password: {},
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      type: "password",
    };
  },
  methods: {
    submit() {
      // if (!this.password.oldPwd) {
      //   return (this.oldPwd = "请输入旧密码");
      // }
      // this.oldPwd = "";
      if (!this.password.newPwd) {
        return (this.newPwd = "请输入新密码");
      }
      this.newPwd = "";
      if (!this.password.confirmPwd) {
        return (this.confirmPwd = "请确认新密码");
      }
      this.confirmPwd = "";
      if (this.password.newPwd != this.password.confirmPwd) {
        return (this.newPwd = "两次输入密码不一致");
      }
      this.http
        .put(
          `/my/password?${this.qs.stringify({
            oldPasswd: this.password.confirmPwd,
            newPasswd: this.password.newPwd,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("密码修改成功!");
            this.password = {};
            this.$router.push("/");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss">
.user_pwd {
  width: 80%;
  margin: 10% auto;
  ul {
    margin: 0 auto;
    width: 60%;
    li {
      width: 100%;
      margin-top: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        text-align: right;
        width: 8em;
      }
      .relative_input {
        position: relative;
        display: flex;
        width: 42%;
        .text_box {
          width: 23em;
          margin-left: 3%;
        }
        .edit_pwd {
          width: 1.5em;
          position: absolute;
          right: 4%;
          top: 20%;
          font-size: 20px;
        }
        p {
          position: absolute;
          color: rgb(255, 0, 0);
          right: 3%;
          bottom: -55%;
        }
      }
      .submit {
        height: 2.5em;
        width: 20em;
      }
    }
  }
}
</style>