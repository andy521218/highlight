<template>
  <div class="cont_bg">
    <div class="mask" v-if="drug"></div>
    <div class="edit" v-if="drug">
      <div class="edit_title">
        <span class="title">添加常见方剂</span>
        <span class="edit_switch" @click="close()"></span>
      </div>
      <ul class="edit_class" style="overflow-y: visible" ref="list">
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方剂名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-if="prescriptionSwitch"
            placeholder="请输入方剂名称"
            v-model="prescription.name"
          />
          <span class="edit_text_i" v-else>{{ prescription.name }}</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">方剂方药:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请以逗号分隔"
            v-if="prescriptionSwitch"
            v-model="prescription.description"
          />
          <span class="edit_text_i" v-else>{{ prescription.description }}</span>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close()" v-if="prescriptionSwitch">
          取消
        </button>
        <button
          class="edit_submit"
          @click="submitPrescription()"
          v-if="prescriptionSwitch"
        >
          确定
        </button>
      </div>
    </div>

    <edit-dele
      :title="'方剂删除'"
      v-if="allShow"
      @deleSubmit="deleSubmit"
      @closeEdit="close"
    >
      <template v-slot:edit_p>
        <p>确定删除 {{ prescription.name }} 吗?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>

    <div class="cont_header">常见方剂</div>
    <div class="search_title">
      <input
        type="text"
        class="text_box"
        v-model="prescriptionSearch"
        @blur="prescriptionSearchShow = false"
        @focus="prescriptionSearchShow = true"
      />
      <button class="submit" @click="getPrescriptionData()">检索</button>
    </div>
    <div class="scrollbar">
      <ul style="height: 31em">
        <li v-for="(item, index) in prescriptionData" :key="index">
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
            </div>
            <div
              class="item_container_between"
              style="justify-content: flex-end"
            >
              <span @click="seePrescription(item)" v-if="prescriptionSwitch"
                >查看</span
              >
              <span @click="editPrescription(item)" v-if="prescriptionSwitch"
                >修改</span
              >
              <span
                class="item_container_between_dele"
                @click="delePrescription(item)"
                >删除</span
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button class="addResult" @click="addDrug()">+</button>
  </div>
</template>

<script>
import editDele from "../../../components/edit/editDele";
export default {
  name: "left-herb",
  components: {
    editDele,
  },
  data() {
    return {
      allShow: false,
      drug: false,
      prescription: {},
      prescriptionSearch: "",
      prescriptionData: "",
      prescriptionSwitch: true,
    };
  },
  mounted() {
    this.getPrescriptionData();
  },
  methods: {
    close() {
      this.drug = false;
      this.prescriptionSwitch = true;
      this.allShow = false;
      this.prescription = {};
    },
    addDrug() {
      this.drug = true;
    },
    getPrescriptionData() {
      this.axios
        .get("/meta/herb/agentia", {
          params: {
            name: this.prescriptionSearch,
            size: "500",
          },
        })
        .then((res) => {
          this.prescriptionData = res.data.rows;
        });
    },
    submitPrescription() {
      if (!this.prescription.name) return this.$Message.error("请填写方剂名称");
      if (!this.prescription.description)
        return this.$Message.error("请填写方剂方药");
      var title, methods, id;
      if (!this.prescription.id) {
        (title = "添加"), (methods = "post"), (id = "");
      } else {
        (title = "修改"), (methods = "put"), (id = this.prescription.id);
      }
      this.http[methods](`/meta/herb/agentia/${id}`, {
        name: this.prescription.name,
        description: this.prescription.description,
      }).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning(`${title}成功!`);
          this.getPrescriptionData();
          this.close();
        }
      });
    },
    seePrescription(e) {
      this.drug = true;
      this.prescriptionSwitch = false;
      this.prescription = e;
    },
    editPrescription(e) {
      this.drug = true;
      this.prescription = e;
    },
    delePrescription(e) {
      this.allShow = true;
      this.prescription = e;
    },
    deleSubmit() {
      this.axios
        .delete(`/meta/herb/agentia/${this.prescription.id}`)
        .then((res) => {
          if (res.code == "000000") {
            this.getPrescriptionData();
            this.$Message.warning("删除成功!");
            this.close();
          }
        });
    },
  },
};
</script>