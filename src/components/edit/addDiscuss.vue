<template>
  <div class="add_discuss">
    <div class="discuss_header">
      <span>{{ discussData.name }}</span>
      <span class="discuss_icon" @click="close"></span>
    </div>
    <div class="discuss_cont">
      <textarea
        :placeholder="textIpts ? textIpts : '请输入回复内容....'"
        maxlength="130"
        v-model="message"
      ></textarea>
      <span>{{ message.length }}/130</span>
      <button class="submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-discuss",
  props: ["discussData", "messageId", "index", "privateTopic", "textIpts"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    close() {
      this.$parent.discuss_show = false;
      this.message = "";
      this.$parent.messageId = "";
      this.$parent.discussData = {};
      this.$parent.textIpts = "";
    },
    submit() {
      if (!this.message) {
        this.$Message.error("请输入要回复的内容");
        return;
      }
      if (!this.discussData.topicId) {
        this.axios
          .post(`/im`, {
            userId: this.discussData.userId,
            message: this.message,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.close();
            } else {
              this.$Message.error(res.msg);
            }
          });
        return;
      }
      if (!this.messageId) {
        this.axios
          .post(`/topic/${this.discussData.topicId}/message`, {
            message: this.message,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.axios
                .get(`/topic/${this.discussData.topicId}/message`, {
                  params: {
                    page: "1",
                    size: "500",
                  },
                })
                .then((res) => {
                  this.$parent.replyTwoData = res.data.rows;
                  this.$parent.notice_top_show = this.index;
                });
              this.close();
            }
          });
        return;
      }
      this.axios
        .post(`/topic/${this.discussData.topicId}/message/${this.messageId}`, {
          message: this.message,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.axios
              .get(`/topic/${this.discussData.topicId}/message`, {
                params: {
                  page: "1",
                  size: "500",
                },
              })
              .then((res) => {
                this.$parent.notice_top_show = this.index;
                this.$parent.replyTwoData = res.data.rows;
              });
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
.add_discuss {
  width: 405px;
  height: 380px;
  position: absolute;
  left: 50%;
  top: 17%;
  margin-left: -202px;
  z-index: 999999;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  .discuss_header {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background: rgb(111, 147, 251);
    color: rgb(255, 255, 255);
    .discuss_icon {
      width: 19px;
      height: 19px;
      margin-right: 20px;
      background: url("../../assets/public/switch.png") no-repeat center;
      &:hover {
        background: url("../../assets/public/switchmove1.png") no-repeat center;
      }
    }
    span {
      margin-left: 25px;
    }
  }
  .discuss_cont {
    height: 335px;
    width: 100%;
    order: 1px solid transparent;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    position: relative;
    text-align: center;
    .submit {
      width: 100px;
      margin: 10px auto;
    }
    textarea {
      width: 360px;
      height: 220px;
      margin: 15px 23px;
      padding: 10px 15px;
    }
    span {
      position: absolute;
      right: 30px;
      bottom: 105px;
      color: rgb(111, 147, 251);
    }
  }
}
</style>