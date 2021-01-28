<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">{{ tips ? "添加" : "编辑" }}{{ title }}</span>
      <span class="edit_switch" @click="close"></span>
    </div>
    <ul>
      <li>
        <slot name="user"></slot>
        <input
          type="text"
          class="text_box"
          placeholder="请输入用户名/学号"
          v-if="!$store.state.editCurrent"
          v-model="upData.userName"
          @change="checkuserName"
        />
        <span class="edit_text_i" v-else>{{ upData.userName }}</span>
        <p class="edit_tips">{{ userNameText }}</p>
      </li>
      <li v-show="!$store.state.editCurrent">
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">密码:</span>
        </div>
        <input
          :type="type"
          class="text_box"
          placeholder="请输入密码"
          v-model="upData.passwd"
          @change="checkpasswd"
        />
        <i-con
          class="edit_pwd"
          type="ios-eye-off-outline"
          v-if="pwdSwitch"
          @click="pwdShow"
          style="color: rgb(111, 147, 251)"
        />
        <i-con
          class="edit_pwd"
          type="ios-eye-off-outline"
          v-else
          @click="pwdShow"
          style="color: red"
        />
        <!-- <img
          src="../../assets/public/pwd.png"
          class="edit_pwd"
          alt
          v-if="pwdSwitch"
          @click="pwdShow"
        />
        <img
          src="../../assets/public/pwdmove.png"
          class="edit_pwd"
          alt
          v-else
          @click="pwdShow"
        /> -->
        <p class="edit_tips">{{ passwdText }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">姓名:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-if="tips"
          placeholder="请输入姓名"
          v-model="upData.name"
          @change="checkavatar"
        />
        <span class="edit_text_i" v-else>{{ upData.name }}</span>
        <p class="edit_tips">{{ avaterText }}</p>
      </li>
      <li style="display: flex">
        <slot name="select"></slot>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_text">手机号:</span>
        </div>
        <input
          type="text"
          class="text_box"
          placeholder="请输入手机号"
          v-model="upData.mobile"
          @change="checkPhone"
        />
        <p class="edit_tips">{{ mobileText }}</p>
      </li>
      <li v-if="!email">
        <div class="edit_left">
          <span class="edit_text">邮箱:</span>
        </div>
        <input
          type="text"
          class="text_box"
          placeholder="请输入邮箱"
          v-model="upData.email"
          @change="checkEmail"
          v-if="tips"
        />
        <span class="edit_text_i" v-else>{{ upData.email }}</span>
        <p class="edit_tips">{{ emailText }}</p>
      </li>
      <li v-else>
        <div class="edit_left">
          <span class="edit_text">{{ eamilTips }}:</span>
        </div>
        <input
          type="text"
          class="text_box"
          :placeholder="emailPlaceholder"
          v-model="updataEmail"
          style="width: 190px"
        />
        <span class="edit_text_i_email" @click="editEamil">{{ codeText }}</span>
        <p class="edit_tips" style="left: 115px">{{ emailText }}</p>
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
  name: "edit-user",
  data() {
    return {
      pwdSwitch: true,
      type: "password",
      classRoom: "",
      mobileText: "",
      emailText: "",
      avaterText: "",
      passwdText: "",
      userNameText: "",
      eamilTips: "邮箱",
      emailPlaceholder: "请输入邮箱",
      codeText: "验证邮箱",
      updataEmail: "",
      initEamil: "",
      verifyCode: "",
    };
  },
  props: ["tips", "upData", "title", "email"],
  mounted() {
    this.updataEmail = this.initEamil = this.upData.email;
  },
  methods: {
    pwdShow() {
      this.pwdSwitch = !this.pwdSwitch;
      this.pwdSwitch ? (this.type = "password") : (this.type = "text");
    },
    close() {
      this.$parent.upData = {};
      this.$parent.tips = true;
      this.$parent.mask = false;
      this.$parent.editStudentShow = false;
      this.$store.commit("editCurrent", false);
      this.eamilTips = "邮箱";
      this.emailPlaceholder = "请输入邮箱";
      this.codeText = "验证邮箱";
      this.updataEmail = "";
    },
    checkavatar() {
      if (!this.upData.name) {
        this.avaterText = "请输入姓名";
        return false;
      }
      this.avaterText = "";
      return true;
    },
    checkpasswd() {
      if (!this.upData.passwd) {
        this.passwdText = "请输入密码";
        return false;
      }
      this.passwdText = "";
      return true;
    },
    checkuserName() {
      if (!this.upData.userName) {
        this.userNameText = "请输入用户名";
        return false;
      }
      this.userNameText = "";
      return true;
    },

    checkPhone() {
      if (!this.upData.mobile) {
        this.mobileText = "";
        return true;
      }
      if (
        !/^1(?:70\d|(?:9[89]|8[0-24-9]|7[135-8]|66|5[0-35-9])\d|3(?:4[0-8]|[0-35-9]\d))\d{7}$/.test(
          this.upData.mobile
        )
      ) {
        this.mobileText = "请输入正确手机号";
        return false;
      }
      this.mobileText = "";
      return true;
    },
    checkEmail() {
      /* eslint-disable */
      if (!this.upData.email) {
        this.emailText = "";
        return true;
      }
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.upData.email)) {
        this.emailText = "请输入正确格式邮箱";
        return true;
      }
      this.emailText = "";
      return true;
    },
    editEamil() {
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.updataEmail)) {
        this.emailText = "请输入正确格式邮箱";
        return;
      }
      this.emailText = "";
      this.axios
        .get("/my/email/verifycode", {
          params: {
            email: this.updataEmail,
          },
        })
        .then((res) => {
          if (res.code == "000000") {
            this.eamilTips = "验证码";
            this.emailPlaceholder = "请登入邮箱查看验证码";
            this.codeText = "已发送";
            this.verifyCode = this.updataEmail;
            this.updataEmail = "";
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    putEmail() {
      return this.axios.put(
        `/my/email/change?${this.qs.stringify({
          email: this.verifyCode,
          verifyCode: this.updataEmail,
        })}`
      );
    },
    submit() {
      if (this.email == true) {
        if (this.eamilTips == "验证码") {
          if (!this.updataEmail) {
            this.emailText = "请输入邮箱验证码";
            return;
          }
          this.putEmail().then((res) => {
            if (res.code == "000000") {
              this.close();
              this.$emit("submit");
              this.axios.get("/users/current").then((res) => {
                this.$store.state.current = res.data;
              });
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
        if (this.eamilTips == "邮箱") {
          if (this.initEamil == this.updataEmail) {
            this.close();
            this.$emit("submit");
          }
        }
        return;
      }
      if (this.checkEmail() && this.checkPhone()) {
        if (this.checkuserName() && this.checkpasswd() && this.checkavatar()) {
          this.$emit("submit");
        }
      }
    },
  },
};
</script>

