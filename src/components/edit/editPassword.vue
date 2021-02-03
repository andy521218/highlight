<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">修改密码</span>
      <span class="edit_switch" @click="close"></span>
    </div>
    <ul>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">旧密码:</span>
        </div>
        <input
          type="text"
          class="text_box"
          placeholder="请输入旧密码"
          v-model="password.oldPwd"
        />
        <p class="edit_tips">{{ oldPwd }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">新密码:</span>
        </div>
        <input
          :type="type"
          class="text_box"
          placeholder="请输入新密码"
          v-model="password.newPwd"
        />
        <img
          v-if="type == 'password'"
          src="../../assets/public/pwd.png"
          class="edit_pwd"
          @click="type = 'text'"
        />
        <img
          v-else
          src="../../assets/public/pwdmove.png"
          @click="type = 'password'"
          class="edit_pwd"
        />
        <p class="edit_tips">{{ newPwd }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">确认新密码:</span>
        </div>
        <input
          :type="type"
          class="text_box"
          placeholder="请确认新密码"
          v-model="password.confirmPwd"
        />
        <img
          v-if="type == 'password'"
          src="../../assets/public/pwd.png"
          class="edit_pwd"
          @click="type = 'text'"
        />
        <img
          v-else
          src="../../assets/public/pwdmove.png"
          @click="type = 'password'"
          class="edit_pwd"
        />
        <p class="edit_tips">{{ confirmPwd }}</p>
      </li>
    </ul>
    <div class="edit_btn_box">
      <button class="edit_cancel" @click="close">取消</button>
      <button class="edit_submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-passwrod",
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
    close() {
      this.$store.commit("editPassword", false);
    },
    submit() {
      if (!this.password.oldPwd) {
        return (this.oldPwd = "请输入旧密码");
      }
      this.oldPwd = "";
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
            oldPasswd: this.password.oldPwd,
            newPasswd: this.password.newPwd,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("密码修改成功!");
            this.password = {};
            this.close();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss">
</style>