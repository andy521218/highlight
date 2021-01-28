<template>
  <div class="message_private scrollbar">
    <div class="private_left">
      <div class="private_left_header">
        <button class="dele" @click="deleTopic">批量删除</button>
      </div>
      <div class="private_left_cont">
        <ul class="dialogue edit_class">
          <li v-for="(item, index) in messagelist" :key="index">
            <div class="custom_radio" style="margin: 0 1em">
              <span
                class="custom_text"
                :class="{ active_checkbox: item.active == true }"
              ></span>
              <input
                type="checkbox"
                class="custom_none"
                v-model="topicArr"
                :value="item.id"
                @click="item.active = !item.active"
              />
            </div>
            <div class="user_img">
              <div class="border" v-show="item.hasUnread" v-if="0"></div>
              <img :src="$url + item.avatar" />
              <span>{{ item.name }}</span>
            </div>
            <div class="private_title" @click="seetopic(item)">
              <span>{{ item.message }}</span>
              <p>{{ item.time | lastTime(item.time) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="private_right">
      <div class="private_right_header">
        <span>{{ name }}</span>
      </div>
      <div class="private_right_cont">
        <ul ref="scroll">
          <li
            :class="{ active: item.userId == checkId }"
            v-for="(item, index) in dialogue"
            :key="index"
          >
            <div class="private_right_left" v-if="item.userId != checkId">
              <img :src="$url + avatarUrl" />
              <div class="frame">
                <span>{{ item.message }}</span>
                <div></div>
              </div>
            </div>
            <div class="private_right_right" v-if="item.userId == checkId">
              <div class="frame">
                <span>{{ item.message }}</span>
                <div></div>
              </div>
              <img :src="$url + $store.state.current.avatar" alt />
            </div>
          </li>
        </ul>
        <div class="private_right_bottom">
          <textarea v-model="message"></textarea>
          <button style="margin-left: 0" class="submit" @click="submit">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message-private",
  data() {
    return {
      imgUrl: "../../assets/img/home/user.png",
      messagelist: [],
      dialogue: "",
      name: "",
      userId: "",
      message: "",
      id: "",
      checkId: "",
      topicArr: [],
      avatarUrl: "",
    };
  },
  mounted() {
    this.checkId = localStorage.getItem("userId");
    this.getIm();
    //此Id发送私信获得
    let userId = this.$route.params.userId;
    if (!userId) {
      this.userId = "";
    } else {
      this.userId = userId;
    }
    //此id消息回复获得
    let topicId = this.$route.params.topicId;
    if (!topicId) return;
    this.userId = userId;
    this.id = topicId;
    this.getImid(topicId);
  },
  methods: {
    //获取对话列表
    getIm() {
      this.messagelist = [];
      this.axios.get("/im").then((res) => {
        try {
          res.data.forEach((item) => {
            item.active = false;
            this.messagelist.push(item);
          });
        } catch (error) {
          error;
        }
        if (!this.userId) {
          return;
        }
        res.data.forEach((item) => {
          if (item.userId == this.userId) {
            this.avatarUrl = item.avatar;
          }
        });
      });
    },
    //获取聊天信息列表
    getImid(id) {
      this.axios.get(`/im/${id}`).then((res) => {
        this.dialogue = res.data;
      });
    },
    //发送聊天信息
    submit() {
      this.axios
        .post(`/im`, {
          userId: this.userId,
          message: this.message,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.getImid(this.id);
            this.message = "";
            setTimeout(() => {
              this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
            }, 1000);
          }
        });
    },
    //查看聊天对话框信息
    seetopic(item) {
      this.userId = item.userId;
      this.id = item.id;
      this.name = item.name;
      this.avatarUrl = item.avatar;
      this.getImid(item.id);
    },
    //删除对话
    deleTopic() {
      this.axios.delete(`/im/${this.topicArr}`).then(() => {
        this.getIm();
      });
    },
  },
};
</script>

<style lang="scss">
.message_private {
  height: 100%;
  width: 100%;
  padding: 1%;
  display: flex;
  img {
    border-radius: 3px;
    width: 55px;
    height: 55px;
  }
  .private_left {
    width: 40%;
    height: 100%;
    margin-right: 1%;
    border-right: 1px solid rgb(111, 147, 251);
    .private_left_header {
      width: 98%;
      height: 8%;
      border-bottom: 1px solid rgb(111, 147, 251);
    }
    .private_left_cont {
      width: 98%;
      height: 91%;
      margin-top: 1%;
      overflow-y: auto;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 98%;
          background: rgb(240, 246, 255);
          display: flex;
          margin-bottom: 1%;
          align-items: center;
          padding: 0.5em 0;
          .user_img {
            width: 4em;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            img {
              width: 3.6em;
              height: 3.6em;
            }
          }
          .private_title {
            width: 82%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              padding-left: 1em;
              width: 75%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        li:hover {
          background-color: rgb(111, 147, 251, 0.62);
        }
      }
    }
  }
  .private_right {
    width: 59%;
    height: 100%;
    background-color: rgb(212, 229, 255, 0.4);
    border-radius: 10px;
    .private_right_header {
      width: 98%;
      height: 8%;
      display: flex;
      align-items: center;
      margin: 0 auto;
      padding-left: 1em;
      border-bottom: 1px solid rgb(111, 147, 251);
    }
    .private_right_cont {
      width: 98%;
      height: 87%;
      margin: 0 auto;
      ul {
        height: 88%;
        overflow-y: auto;
        li {
          width: 98%;
          display: flex;
          margin-top: 1%;
          color: rgb(0, 0, 0);
          .private_right_left {
            display: flex;
            width: 48%;
            img {
              width: 3.6em;
              height: 3.6em;
            }
            .frame {
              position: relative;
              max-width: 80%;
              word-break: break-all;
              background: rgb(255, 255, 255);
              border-radius: 10px;
              padding: 15px;
              margin-left: 1em;
              div {
                width: 15px;
                height: 15px;
                position: absolute;
                z-index: 99;
                left: -7px;
                top: 20px;
                transform: rotate(-45deg);
                background: rgb(255, 255, 255);
              }
            }
          }
          .private_right_right {
            display: flex;
            justify-content: flex-end;
            width: 48%;
            img {
              width: 3.6em;
              height: 3.6em;
            }
            .frame {
              position: relative;
              background: rgb(111, 147, 251);
              border-radius: 10px;
              margin-right: 1em;
              padding: 15px;
              max-width: 80%;
              word-break: break-all;
              div {
                width: 15px;
                height: 15px;
                position: absolute;
                z-index: 99;
                right: -7px;
                top: 20px;
                transform: rotate(-45deg);
                background: rgb(111, 147, 251);
              }
            }
          }
        }
        .active {
          justify-content: flex-end;
        }
      }
      .private_right_bottom {
        width: 100%;
        height: 10%;
        margin-top: 1%;
        display: flex;
        align-items: center;
        textarea {
          width: 88%;
          height: 100%;
          margin-left: 1%;
          margin-right: 1.5%;
          padding: 1%;
        }
      }
    }
  }
}
</style>