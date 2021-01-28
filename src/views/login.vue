<template>
  <div class="login" ref="login">
    <div class="login-bg">
      <div class="setting_logo">
        <img :src="url + '/metrics/logo'" alt="" />
      </div>
      <div class="login-left">
        <img src="../assets/img/login/left.png" alt />
      </div>
      <div class="login-right" v-if="!RetrievePassword_show">
        <div class="login-right_bg">
          <div class="login-right_bg_box">
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
              <img src="../assets/img/login/pwd.png" alt />
              <input
                type="password"
                v-model="pwd"
                placeholder="请输入密码......"
                @change="password"
              />
            </div>
            <div class="login-box code">
              <input type="text" v-model="code" placeholder="请输入验证码" />
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
            <div class="btn" @click="login">
              <span>登 入</span>
            </div>
            <span class="count">访问次数:{{ count }}次</span>
            <div class="notes">技术支持:上海域圆信息科技有限公司</div>
          </div>
        </div>
      </div>
      <RetrievePassword v-if="RetrievePassword_show" />
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
        width: 100%;
        height: 100%;
      }
    }
    .login-left {
      width: 50%;
      height: 100%;
      img {
        width: 100%;
        height: 85%;
        margin-top: 13%;
      }
    }
    .login-right {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .login-right_bg {
        width: 53%;
        height: 60%;
        background: url("../assets/img/login/login_bg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        position: relative;
        justify-content: flex-end;
        flex-direction: column;
        align-items: center;
        .login-right_bg_box {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 78%;
          height: 65%;
          .login-box {
            width: 100%;
            height: 14%;
            border: 1px solid rgb(255, 255, 255);
            background-color: rgb(20, 37, 75);
            border-radius: 6px;
            display: flex;
            align-items: center;
            input {
              color: rgb(255, 255, 255);
              background-color: rgb(20, 37, 75);
              border: none;
              outline: none;
            }
            img {
              margin: 0 3%;
              height: 52%;
              width: 6%;
            }
          }
          .code {
            width: 100%;
            border: none;
            align-items: center;
            justify-content: flex-end;
            input {
              text-align: center;
              border: rgb(255, 255, 255) 1px solid;
              height: 100%;
              width: 29%;
              border-radius: 6px;
              margin-right: 3%;
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
            .related_left,
            .related_right {
              display: flex;
              align-items: center;
              width: 50%;
              .checkbox {
                margin-right: 3%;
              }
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
          .btn {
            width: 51%;
            height: 14%;
            background: url("../assets/img/login/btn.png") no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .btn:hover {
            background: url("../assets/img/login/btnmove.png") no-repeat center;
            background-size: 100% 100%;
          }
          .count {
            position: absolute;
            bottom: -7%;
            right: 0;
          }
          .notes {
            position: absolute;
            right: 0;
            bottom: -30%;
          }
        }
      }
    }
  }
}
</style>