<template>
  <div class="name diagnosis">
    <div class="cont_bg" style="width: 35%">
      <!-- 添加病名 -->
      <div class="edit" v-if="nameShow">
        <div class="edit_teacher">
          <div class="edit_title">
            <span class="title">添加病名</span>
            <span class="edit_switch" @click="colseName"></span>
          </div>
          <ul>
            <li>
              <div class="edit_left">
                <span class="edit_red">*</span>
                <span class="edit_text">名称:</span>
              </div>
              <input
                type="text"
                class="text_box"
                placeholder="请输入病名"
                v-model="name"
              />
              <p class="edit_tips"></p>
            </li>
          </ul>
          <div class="edit_btn_box">
            <button class="edit_cancel" @click="colseName">取消</button>
            <button class="edit_submit" @click="submitName">确定</button>
          </div>
        </div>
      </div>
      <!-- 添加证型 -->
      <div class="edit" v-if="diseaseShow">
        <div class="edit_teacher">
          <div class="edit_title">
            <span class="title">{{ diseaseName ? "编辑" : "添加" }}证型</span>
            <span class="edit_switch" @click="colseDisease"></span>
          </div>
          <ul>
            <li>
              <div class="edit_left">
                <span class="edit_red">*</span>
                <span class="edit_text">证型:</span>
              </div>
              <input
                type="text"
                class="text_box"
                placeholder="请输入证型"
                v-model="diseaseName"
              />
              <p class="edit_tips"></p>
            </li>
          </ul>
          <div class="edit_btn_box">
            <button class="edit_cancel" @click="colseDisease">取消</button>
            <button class="edit_submit" @click="submitDisease">确定</button>
          </div>
        </div>
      </div>
      <div class="mask" v-if="mask"></div>
      <div class="cont_header">病名证型</div>
      <div class="scrollbar">
        <ul ref="scroll">
          <li v-for="(item, index) in nameData" :key="index">
            <div class="item_cont" @click="tabShow(item, index)">
              <div class="item_left">
                <i></i>
                <span>{{ item.name }}</span>
              </div>
              <div style="display: flex">
                <span class="edid_look_item" @click="editName(item)"
                  >编辑病名</span
                >
                <div
                  class="item_right"
                  :class="{ transform: showIndex == index }"
                ></div>
              </div>
            </div>
            <div class="item_container" :class="{ active: showIndex == index }">
              <div
                class="item_container_between"
                v-for="(i, index) in diseaseData"
                :key="index"
                v-show="diseaseData"
              >
                <p>{{ i.name }}</p>
                <div style="width: 50%">
                  <span @click="addDisease(item)">添加证型</span>
                  <span @click="editDisease(item, i)">编辑证型</span>
                </div>
              </div>
              <div class="item_container_between">
                <p></p>
                <div v-show="!diseaseData">
                  <span @click="addDisease(item)">添加证型</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <button class="addResult" @click="addName()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "name-diagnosis",
  data() {
    return {
      nameData: {},
      showIndex: "2000",
      diseaseData: {},
      nameShow: false,
      mask: false,
      diseaseShow: false,
      name: "",
      diseaseName: "",
      nameId: "",
      diseaseId: "",
    };
  },
  mounted() {
    this.getNamedata();
  },
  methods: {
    getNamedata() {
      this.axios.get(`/meta/disease/name`).then((res) => {
        this.nameData = res.data;
      });
    },
    tabShow(e, index) {
      this.showIndex = index;
      this.axios.get(`/meta/disease/${e.id}`).then((res) => {
        this.diseaseData = res.data.rows;
      });
    },
    // 证型
    colseDisease() {
      this.diseaseName = "";
      this.mask = false;
      this.nameId = "";
      this.diseaseId = "";
      this.diseaseShow = false;
    },
    submitDisease() {
      if (!this.diseaseId) {
        this.axios
          .post(`/meta/disease/${this.nameId}`, {
            name: this.diseaseName,
          })
          .then((res) => {
            if (res.code == "000000") {
              let id = {
                id: this.nameId,
              };
              setTimeout(() => {
                this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
              }, 300);
              this.tabShow(id);
              this.colseDisease();
            }
          });
        return;
      }
      this.axios
        .put(
          `/meta/disease/${this.nameId}/${this.diseaseId}?${this.qs.stringify({
            name: this.diseaseName,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改证型成功!");
            let id = {
              id: this.nameId,
            };
            this.tabShow(id);
            this.colseDisease();
          }
        });
    },
    addDisease(e) {
      this.nameId = e.id;
      this.mask = true;
      this.diseaseShow = true;
    },
    editDisease(item, e) {
      this.mask = true;
      this.diseaseShow = true;
      this.diseaseName = e.name;
      this.nameId = item.id;
      this.diseaseId = e.id;
    },
    // 病名
    colseName() {
      this.mask = false;
      this.nameShow = false;
      this.name = "";
      this.nameId = "";
      this.diseaseId = "";
    },
    editName(e) {
      this.mask = true;
      this.nameShow = true;
      this.name = e.name;
      this.nameId = e.id;
    },
    submitName() {
      if (!this.name) return this.$Message.error("请填写病名");
      if (!this.nameId) {
        this.axios
          .post(`/meta/disease/name`, {
            name: this.name,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.colseName();
              this.getNamedata();
            } else {
              this.$Message.error(res.msg);
            }
          });
        return;
      }
      this.axios
        .put(
          `/meta/disease/name/${this.nameId}?${this.qs.stringify({
            name: this.name,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改病名成功!");
            this.colseName();
            this.getNamedata();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    addName() {
      this.mask = true;
      this.nameShow = true;
    },
  },
};
</script>

<style lang="scss">
.name {
  .edit {
    margin: 0 7%;
    ul {
      height: auto;
      li {
        border: none;
      }
    }
  }
}
</style>

