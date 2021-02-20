<template>
  <div class="teacher_class" style="width: 100; height: 100%">
    <div class="main_mask" v-show="editClass"></div>
    <edit-class
      v-if="editClass"
      :specialtyData="specialtyData"
      :gradeData="gradeData"
      :departmentsData="departmentsData"
      :editData="editData"
      :tips="tips"
      @getData="getData"
    ></edit-class>
    <div class="main_header">
      <div class="main_header_left">
        <button class="add" @click="addClass()">新建班级</button>
      </div>
      <div class="main_header_right">
        <select-box
          :title="'专业'"
          :defaultTitle="'请选择专业'"
          :listData="specialtyData"
          :typeId="'specialtyId'"
          :itemId="'id'"
          :itemName="'name'"
        ></select-box>

        <select-box
          :title="'年级'"
          :defaultTitle="'请选择年级'"
          :listData="gradeData"
          :typeId="'gradeId'"
          :itemId="'id'"
          :itemName="'name'"
        ></select-box>

        <select-box
          :listData="statusData"
          :title="'状态'"
          :typeId="'status'"
          :itemName="'name'"
          :itemId="'status'"
          :defaultTitle="'请选择状态'"
        ></select-box>
        <button class="submit" @click="search()">检索</button>
      </div>
    </div>
    <table class="main_table">
      <thead class="thead-dark">
        <tr>
          <th class="table_5">序号</th>
          <th class="table_10">院/系</th>
          <th class="table_10">专业</th>
          <th class="table_10">年级</th>
          <th class="table_10">班级</th>
          <th class="table_10">学生人数</th>
          <th class="table_10">状态</th>
          <th class="table_10">操作</th>
        </tr>
      </thead>
      <tbody v-show="!main_show">
        <tr v-for="(item, index) in classroomsData" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>{{ item.departmentName }}</td>
          <td>{{ item.specialtyName }}</td>
          <td>{{ item.gradeName }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.studentCnt }}</td>
          <td>
            <i-switch
              true-color="rgb(111,147,251)"
              v-model="item.status"
              @on-change="switchChange(item)"
            ></i-switch>
          </td>
          <td>
            <span @click="edit(item)">编辑</span>
          </td>
        </tr>
      </tbody>
      <main-itps v-show="main_show"></main-itps>
    </table>
    <turn-page
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="10"
      @getData="getData"
    ></turn-page>
  </div>
</template>

<script>
import mainItps from "../../components/mainItps";
import editClass from "../../components/edit/editClass";
import turnPage from "../../components/turnPage";
import selectBox from "../../components/selectBox";
export default {
  name: "teacher-class",
  components: {
    editClass,
    turnPage,
    mainItps,
    selectBox,
  },
  data() {
    return {
      editClass: false,
      classroomsData: "",
      specialtyData: "",
      gradeData: "",
      departmentsData: "",
      page: "1",
      size: "200",
      total: "",
      status: "",
      editData: {},
      tips: true,
      selected: undefined,
      searchName: "",
      main_show: false,
      specialtyId: "",
      gradeId: "",
      statusData: [
        {
          status: true,
          name: "正常",
        },
        {
          status: false,
          name: "禁用",
        },
      ],
    };
  },
  mounted() {
    this.getSpecialty();
    this.getDepartments();
    this.getGrade();
    this.getData();
  },
  methods: {
    addClass() {
      this.tips = false;
      this.editClass = true;
    },
    getClassrooms(name) {
      this.axios("classrooms", {
        name: name,
      });
    },
    getSpecialty() {
      this.axios
        .get("/specialty", {
          params: { page: this.page, size: this.size },
        })
        .then((res) => {
          this.specialtyData = res.data.rows;
        });
    },
    getGrade() {
      this.axios
        .get("/grade", {
          params: { page: this.page, size: this.size },
        })
        .then((res) => {
          this.gradeData = res.data.rows;
        });
    },
    getDepartments() {
      this.axios
        .get("/departments", {
          params: { page: this.page, size: this.size },
        })
        .then((res) => {
          this.departmentsData = res.data.rows;
        });
    },
    search() {
      this.getData();
    },
    getData(page = 1) {
      this.page = page;
      this.axios
        .get("classrooms", {
          params: {
            gradeId: this.gradeId,
            specialtyId: this.specialtyId,
            fuzzyName: this.searchName,
            status: this.status,
            page: page,
            size: "10",
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.total = res.data.total;
          this.classroomsData = res.data.rows;
        });
    },
    switchChange(e) {
      this.axios
        .put(
          `/classrooms/${e.id}?${this.qs.stringify({
            did: e.departmentId,
            name: e.name,
            gradeId: e.gradeId,
            sid: e.specialtyId,
            status: e.status,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("修改班级成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    edit(e) {
      this.editClass = true;
      this.editData = e;
    },
  },
};
</script>
