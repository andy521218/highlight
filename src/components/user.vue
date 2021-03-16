<template>
  <div class="home_user">
    <div class="home_user_left" @mousemove="move" @mouseleave="leave">
      <i></i>
      <span>消息</span>
      <p :class="{ active: total > 0 }">
        {{ total }}
      </p>
      <div class="user_message" :class="{ active: active_show }">
        <i></i>
        <div class="user_pseudo"></div>
        <div class="user_name">
          <span class="my_message">我的消息</span>
          <span class="dele_message" @click="deleallmessage">清空消息</span>
        </div>
        <div class="user_list scrollbar">
          <ul>
            <li
              v-for="(item, index) in messageData.rows"
              :key="index"
              @click="seeMessage(item)"
            >
              <div class="user_img">
                <div class="border" v-show="item.status"></div>
                <img :src="$url + item.avatar" alt />
              </div>
              <div class="user_column">
                <div class="title">{{ item.name }}回复:{{ item.message }}</div>
                <div class="cont">
                  {{ item.title }}
                </div>
                <div class="time">
                  {{ item.createTime | lastTime(item.createTime) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home_user_right">
      <div
        class="user_img_big"
        @mousemove="select_show = true"
        @mouseleave="select_show = false"
      >
        <img :src="$url + current.avatar" alt="" v-if="current.avatar" />
        <img
          v-else
          src="../assets/public/cfbadfe21ef4dd007eff3324a281cc9.png"
          alt=""
        />
        <div class="headr_select" v-show="select_show">
          <p></p>
          <div class="pseudo"></div>
          <div class="select_name">用户名</div>
          <div class="select_list">
            <ul>
              <li
                v-for="(item, index) in list"
                :key="index"
                :class="{ select_item: itemIndex == index }"
                @click="routeLink(item, index)"
              >
                {{ item.title }}
              </li>
              <li @click="routeLink('退出登入')">退出登入</li>
            </ul>
          </div>
        </div>
      </div>
      <span>{{ current.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "user-header",
  data() {
    return {
      itemIndex: "-1",
      current: "",
      list: [],
      active_show: false,
      select_show: false,
    };
  },
  computed: {
    ...mapState([
      "adminMenu",
      "teacherMenu",
      "stuedntMenu",
      "avatar",
      "total",
      "messageData",
    ]),
  },
  mounted() {
    localStorage.setItem("login", true);
    this.axios.get("/users/current").then((res) => {
      this.current = res.data;
      localStorage.setItem("userId", res.data.id);
      if (res.data.authority == "ADMIN") {
        this.list = this.adminMenu;
      }
      if (res.data.authority == "TEACHER") {
        this.list = this.teacherMenu;
      }
      if (res.data.authority == "STUDENT") {
        this.list = this.stuedntMenu;
      }
    });
  },
  methods: {
    routeLink(item, index) {
      if (item.title == "修改密码") {
        this.$store.commit("editPassword", true);
        this.select_show = false;
        return;
      }
      if (item.title == "个人信息") {
        this.$store.commit("editCurrent", true);
        this.select_show = false;
        return;
      }
      this.itemIndex = index;
      if (item == "退出登入") {
        localStorage.removeItem("login");
        this.$router.push("/");
        window.sessionStorage.clear();
      }
      this.$router.push(item.router);
      this.$store.state.menuId = index;
      localStorage.setItem("bgindex", index);
    },
    //获取提示消息
    getmessage() {
      this.axios
        .get("/message/my", {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.$store.state.messageData = res.data;
          this.$store.state.total = 0;
        });
    },
    //设为已读消息
    seeMessage(item) {
      this.axios.delete(`/message/${item.messageId}`).then((res) => {
        if (res.code == "000000") {
          this.$store.state.menuId = 3;
          if (!item.title) {
            this.$router.push({
              name: "messageprivate",
              params: {
                topicId: item.topicId,
                userId: item.userId,
              },
            });
          } else {
            this.$store.state.menuId = 0;
            this.$router.push("messageforum");
          }
        } else {
          this.$Message.error(res.msg);
        }
        this.getmessage();
      });
    },
    //清空所有消息
    deleallmessage() {
      this.axios.delete("message/my").then((res) => {
        if (res.code == "000000") {
          this.getmessage();
          this.active_show = false;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //显示隐藏消息
    move() {
      if (this.messageData.rows.length > 0) {
        this.active_show = true;
      }
    },
    leave() {
      this.active_show = false;
    },
  },
};
</script>

<style lang="scss">
.home_user {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 20%;
  color: rgb(255, 255, 255);
  .home_user_left {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    width: 70%;
    height: 100%;
    margin-right: 2%;
    i {
      background: url("../assets/img/home/news.png") no-repeat center;
      background-size: 100% 100%;
      width: 11%;
      height: 40%;
      margin-right: 4%;
    }
    p {
      border-radius: 50%;
      width: 1.4em;
      height: 1.4em;
      background-color: rgb(255, 0, 0);
      position: absolute;
      text-align: center;
      line-height: 1.4em;
      top: 19%;
      right: 15%;
      display: none;
    }
    .user_message {
      position: absolute;
      width: 265%;
      background: rgb(255, 255, 255);
      z-index: 999999;
      left: -129%;
      top: 100%;
      border-radius: 10px;
      display: none;
      i {
        width: 2em;
        height: 2em;
        position: absolute;
        background: rgb(255, 255, 255);
        left: 76%;
        margin-top: -2.2%;
        transform: rotate(-45deg);
      }
      .user_pseudo {
        width: 88%;
        height: 7.5%;
        position: absolute;
        top: -5%;
      }
      .user_name {
        width: 100%;
        padding: 2% 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(220, 230, 240);
        .my_message {
          width: 50%;
          text-align: right;
          margin-left: 8%;
          background: linear-gradient(
            to right,
            rgb(18, 195, 237),
            rgb(47, 138, 255)
          );
          background-clip: text;
          color: transparent;
        }
        .dele_message {
          width: 50%;
          text-align: right;
          padding-right: 10%;
          color: rgb(175, 175, 175);
        }
        .dele_message:hover {
          cursor: pointer;
        }
      }
      .user_list {
        width: 100%;
        ::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: rgb(175, 175, 175);
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: rgb(217, 218, 219);
        }
        ul {
          overflow-y: auto;
          width: 98%;
          margin: 0 auto;
          max-height: 34em;
          li {
            width: 96%;
            margin: 1% auto;
            border-bottom: 1px solid rgb(212, 227, 241);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .user_img {
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              width: 8%;
              img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
              .border {
                background: rgb(255, 0, 0);
                border-radius: 50%;
                width: 25%;
                height: 25%;
                position: absolute;
                right: -5%;
                top: -5%;
              }
            }
            .user_column {
              display: flex;
              flex-direction: column;
              width: 87%;
              .title,
              .cont {
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: rgb(40, 200, 240);
              }
              .cont {
                height: 1.5em;
                color: rgb(175, 175, 175);
              }
              .time {
                color: rgb(175, 175, 175);
                text-align: right;
              }
            }
          }
          li:hover {
            cursor: pointer;
            background: rgb(0, 0, 0, 0.1);
          }
        }
      }
    }
    .active {
      display: block;
    }
  }
  .home_user_right {
    width: 43%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 3%;
    .user_img_big {
      margin-right: 7%;
      width: 3.5em;
      height: 3.5em;
      padding: 5.5px;
      border-radius: 50%;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      .headr_select {
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        text-align: center;
        flex-direction: column;
        left: -28%;
        top: 100%;
        z-index: 999999;
        .pseudo {
          height: 30%;
          position: relative;
          width: 100%;
          position: absolute;
          top: -20%;
        }
        p {
          width: 1.5em;
          height: 1.5em;
          background: rgb(255, 255, 255);
          position: absolute;
          top: 0;
          z-index: 999999;
          transform: rotate(-45deg);
        }
        .select_name {
          background: rgb(255, 255, 255);
          color: rgb(34, 163, 247);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom: 1px solid rgb(220, 230, 240);
          padding: 6% 0;
          width: 100%;
          margin-top: 7%;
          z-index: 9999999;
        }
        .select_list {
          background: rgb(255, 255, 255);
          color: rgb(0, 0, 0);
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          width: 100%;
          li {
            padding: 5% 0;
          }
          li:hover {
            color: rgb(255, 255, 255);
            cursor: pointer;
            background-image: linear-gradient(
              to right,
              rgb(18, 195, 237),
              rgb(47, 138, 255)
            );
          }
          li:last-child {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .select_item {
            color: rgb(255, 255, 255);
            background-image: linear-gradient(
              to right,
              rgb(18, 195, 237),
              rgb(47, 138, 255)
            );
          }
        }
      }
    }
    span {
      width: 5em;
    }
  }
}
</style>
