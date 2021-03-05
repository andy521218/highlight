<template>
  <div class="login" ref="login">
    <div class="login-bg">
      <div class="setting_logo">
        <img :src="url + '/metrics/logo'" alt="" />
      </div>
      <div class="login_box">
        <div class="login-left">
          <img src="../assets/img/login/left.png" alt />
        </div>
        <div class="login-right" v-if="!RetrievePassword_show">
          <div class="login-right_bg">
            <div class="login-right-title"></div>
            <div class="login-box user">
              <img src="../assets/img/login/user.png" alt />
              <input
                type="text"
                v-model="user"
                placeholder="请输入用户名"
                @change="userName"
              />
            </div>
            <div class="login-box pwd">
              <img style="width: 5%" src="../assets/img/login/pwd.png" alt />
              <input
                type="password"
                v-model="pwd"
                placeholder="请输入密码......"
                @change="password"
              />
            </div>
            <div class="login-box code">
              <input
                type="text"
                class="text_box"
                v-model="code"
                placeholder="请输入验证码"
              />
              <img :src="codeUrl" alt="" @click="refreshImg" />
            </div>
            <div class="related">
              <div class="related_left">
                <check-box ref="checkbox" @checkFlag="checkFlag"></check-box>
                <label for>记住密码</label>
              </div>
              <div class="related_right">
                <span @click="RetrievePassword_show = true">忘记密码?</span>
              </div>
            </div>
            <button class="submit" @click="login">登 入</button>
          </div>
          <span class="count">访问次数:{{ count }}次</span>
          <div class="notes">技术支持:上海域圆信息科技有限公司</div>
        </div>
        <RetrievePassword v-if="RetrievePassword_show" />
      </div>
    </div>
  </div>
</template>

<script>
import { initRoutes } from "../router/index";
import RetrievePassword from "../components/RetrievePassword";
import checkBox from "../components/checkBox";

export default {
  name: "login",
  data() {
    return {
      user: "",
      pwd: "123456",
      isShow: true,
      RetrievePassword_show: false,
      count: "",
      url: "",
      code: "",
      codeUrl: "",
    };
  },
  components: {
    RetrievePassword,
    checkBox,
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.pwd = localStorage.getItem("pwd");
    this.$refs.checkbox.isChecked = JSON.parse(
      localStorage.getItem("isChecked")
    );
    this.axios.get("/metrics/login").then((res) => {
      this.count = res.data;
    });
    this.url = this.$url.replace("/download/", "");
    this.refreshImg();
  },
  methods: {
    userName() {
      if (!this.user) {
        return false;
      }
      return true;
    },
    password() {
      if (!this.pwd) {
        return false;
      }
      return true;
    },
    checkFlag() {
      this.$refs.checkbox.isChecked = !this.$refs.checkbox.isChecked;
    },
    refreshImg() {
      let random = Math.round(Math.random() * 10);
      this.codeUrl = this.url + "/metrics/captcha/?random=" + random;
    },
    login() {
      if(localStorage.getItem('authority')) return this.$Message.error('您当前已经登入,请退出其他账号!')
      if (!this.userName() || !this.password()) {
        return this.$Message.error("用户名或密码不能为空");
      }
      this.axios
        .post("login", {
          username: this.user,
          password: this.pwd,
          captcha_key: this.code,
        })
        .then((res) => {
          if (res.code == "000000") {
            sessionStorage.setItem("token", res.data.authority);
            localStorage.setItem("authority", res.data.authority);
            initRoutes();
            let isChecked = this.$refs.checkbox.isChecked;
            if (isChecked) {
              localStorage.setItem("user", this.user);
              localStorage.setItem("pwd", this.pwd);
              localStorage.setItem("isChecked", true);
            } else {
              localStorage.removeItem("user");
              localStorage.removeItem("pwd");
              localStorage.setItem("isChecked", false);
            }
            if (res.data.authority == "ADMIN") {
              this.$router.push("adminmaster");
              return;
            }
            this.$router.push("/index");
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
  position: relative;
  color: #6f93fb;
  .login-bg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/img/login/bg.png") no-repeat;
    background-size: 100% 100%;
    .setting_logo {
      position: absolute;
      top: 2%;
      right: 2%;
      display: flex;
      justify-content: flex-end;
      width: 21%;
      height: 5%;
      img {
        max-height: 100%;
        max-height: 100%;
      }
    }
    .login_box {
      width: 90%;
      height: 80%;
      background-color: rgb(255, 255, 255, 0.82);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-left {
      width: 50%;
      height: 100%;
      text-align: center;
      img {
        width: 78%;
        height: 100%;
      }
    }
    .login-right {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .login-right_bg {
        width: 47%;
        height: 82%;
        display: flex;
        flex-direction: column;
        .login-right-title {
          background: url("../assets/img/login/title.png") no-repeat center;
          background-size: 100% 100%;
          width: 79.5%;
          height: 23%;
          margin-bottom: 2em;
        }

        .login-box {
          width: 100%;
          height: 7.5%;
          background: rgb(240, 246, 255);
          border: rgb(111, 147, 251) 1px solid;
          border-radius: 6px;
          display: flex;
          align-items: center;
          margin-bottom: 2em;
          input {
            border: none;
            outline: none;
            background: rgb(240, 246, 255);
            color: rgb(111, 147, 251);
          }
          img {
            margin: 0 3%;
            height: 52%;
            width: 6%;
          }
        }
        .code {
          width: 100%;
          height: 7.5%;
          border: none;
          background: transparent;
          align-items: center;

          input {
            border: 1px solid rgb(111, 147, 251);
            border-radius: 5px;
            width: 8em;
            margin-right: 1em;
          }
          img {
            border-radius: 6px;
            width: 27%;
            height: 100%;
            margin: 0 0;
          }
        }
        .related {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 7.5%;
          .related_left,
          .related_right {
            display: flex;
            align-items: center;
            width: 50%;
            label {
              width: 86%;
            }
          }
          .related_right {
            display: flex;
            justify-content: flex-end;
            span {
              cursor: pointer;
            }
          }
        }
        .submit {
          width: 80%;
          cursor: pointer;
          margin-top: 2em;
          margin-left: 10%;
        }
      }
      .count {
        position: absolute;
        right: 2%;
        bottom: 6%;
      }
      .notes {
        position: absolute;
        right: 2%;
        bottom: 2%;
      }
    }
  }
}
</style>