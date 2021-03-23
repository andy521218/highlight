<template>
  <div class="cont_bg">
    <!-- 右侧弹窗 -->
    <div class="mask" v-if="druggeryShow"></div>
    <!-- 删除弹窗 -->
    <edit-dele
      :title="'方药删除'"
      v-if="allShow"
      @deleSubmit="deleSubmit"
      @closeEdit="close"
    >
      <template v-slot:edit_p>
        <p>确定删除 {{ druggery.name }} 吗?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <!-- 编辑 添加 -->
    <div class="edit" v-if="druggeryShow">
      <div class="edit_title">
        <span class="title">添加常见方药</span>
        <span class="edit_switch" @click="close()"></span>
      </div>
      <ul class="edit_class" style="overflow: visible">
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-if="druggerySwitch"
            placeholder="请输入方药名称"
             v-model="druggery.name"
            
          />
          <span class="edit_text_i" v-else>{{ druggery.alias }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药别名:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-if="druggerySwitch"
            placeholder="请输入方药别名"
           v-model="druggery.alias"
          />
          <span class="edit_text_i" v-else>{{ druggery.name }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方药用法:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入方药用法"
            v-if="druggerySwitch"
            v-model="druggery.notice"
          />
          <span class="edit_text_i" v-else>{{ druggery.notice }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">注意事项:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入注意事项"
            v-if="druggerySwitch"
            v-model="druggery.usage"
          />
          <span class="edit_text_i" v-else>{{ druggery.usage }}</span>
        </li>
        <li class="display_herb">
          <div class="edit_left">
            <span class="edit_red"></span>
            <span class="edit_text">方药图片:</span>
          </div>
          <div class="uploadImg1">
            <input type="file" ref="uploadImg1" @change="uploadImg1" />
            <img
              src="../../../assets/public/uploadImg1.png"
              class="upload_itps_img"
              alt
            />
            <img v-show="imgUrl" class="preview_img" :src="imgUrl" alt="" />
          </div>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close()" v-if="druggerySwitch">
          取消
        </button>
        <button
          class="edit_submit"
          @click="submitDruggery()"
          v-if="druggerySwitch"
        >
          确定
        </button>
      </div>
    </div>
    <div class="cont_header">常见方药</div>
    <div class="search_title">
      <input
        type="text"
        class="text_box"
        v-model="druggerySearch"
        @blur="searchShow = false"
        @focus="
          searchShow = true;
          druggerySearch = '';
        "
      />
      <button class="submit" @click="getDruggeryData">检索</button>
    </div>

    <div class="scrollbar">
      <ul style="height: 31em">
        <li v-for="(item, index) in druggeryData" :key="index">
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
            </div>
            <div
              class="item_container_between"
              style="justify-content: flex-end"
            >
              <span @click="see(item)">查看</span>
              <span @click="edit(item)">修改</span>
              <span class="item_container_between_dele" @click="dele(item)"
                >删除</span
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button class="addResult" @click="addDruggery()">+</button>
  </div>
</template>


<script>
import editDele from "../../../components/edit/editDele";
export default {
  name: "right-herb",
  components: {
    editDele,
  },
  data() {
    return {
      allShow: false,
      druggeryShow: false,
      druggerySwitch: true,
      druggerySearch: "",
      druggeryData: "",
      druggery: {},
      fileImg: "",
      imgUrl: "",
    };
  },
  mounted() {
    this.getDruggeryData();
  },
  methods: {
    close() {
      this.druggeryShow = false;
      this.druggerySwitch = true;
      this.allShow = false;
      this.druggery = {};
      this.imgUrl = "";
      this.fileImg = "";
    },
    addDruggery() {
      this.druggeryShow = true;
    },
    see(e) {
      this.druggeryShow = true;
      this.druggerySwitch = false;
      this.druggery = e;
      if (!e.picUrl) return;
      this.imgUrl = this.$url + e.picUrl;
    },
    edit(e) {
      this.druggeryShow = true;
      this.druggery = e;
      if (!e.picUrl) return;
      this.imgUrl = this.$url + e.picUrl;
    },
    dele(e) {
      this.allShow = true;
      this.druggery = e;
    },
    deleSubmit() {
      this.axios
        .delete(`/meta/herb/druggery/${this.druggery.id}`)
        .then((res) => {
          if (res.code == "000000") {
            this.close();
            this.getDruggeryData();
            this.$Message.warning("删除成功!");
          }
        });
    },
    getDruggeryData() {
      this.axios
        .get("/meta/herb/druggery", {
          params: {
            name: this.druggerySearch,
            size: "500",
          },
        })
        .then((res) => {
          this.druggeryData = res.data.rows;
        });
    },
    uploadImg1() {
      this.fileImg = this.$refs.uploadImg1.files[0];
      let preview = new FileReader();
      preview.readAsDataURL(this.fileImg);
      preview.onload = (ev) => {
        this.imgUrl = ev.target.result;
      };
    },
    submitDruggery() {
      if (!this.druggery.alias) return this.$Message.error("请填写方药名称");
      if (!this.druggery.name) return this.$Message.error("请填写方药别名");
      if (!this.druggery.notice) return this.$Message.error("请填写方药用法");
      if (!this.druggery.usage) return this.$Message.error("请填写注意事项");
      var methods, title, url;

      if (!this.druggery.id) {
        methods = "post";
        title = "添加";
        url = "/meta/herb/druggery";
      } else {
        methods = "put";
        title = "修改";
        url = `/meta/herb/druggery/${this.druggery.id}`;
      }

      if (!this.fileImg) {
        this.http[methods](url, this.druggery).then((res) => {
          if (res.code == "000000") {
            this.$Message.warning(`${title}成功!`);
            this.close();
            this.getDruggeryData();
          }
        });
      } else {
        let from = new window.FormData();
        from.append("file", this.fileImg);
        this.upload.post("/upload", from).then((res) => {
          if (res.code == "000000") {
            this.http[methods](url, {
              alias: this.druggery.alias,
              name: this.druggery.name,
              notice: this.druggery.notice,
              usage: this.druggery.usage,
              picUrl: res.data,
            }).then((res) => {
              if (res.code == "000000") {
                this.$Message.warning(`${title}成功!`);
                this.close();
                this.getDruggeryData();
              }
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
.display_herb {
  align-items: flex-start !important;
  .uploadImg1 {
    width: 51%;
    height: 14em;
    background: rgb(240, 246, 255);
    border: rgb(111, 147, 251) 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .preview_img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .upload_itps_img {
      position: absolute;
    }
    input {
      width: 48px;
      height: 40px;
      position: absolute;
      opacity: 0;
      z-index: 99;
    }
  }
}
</style>