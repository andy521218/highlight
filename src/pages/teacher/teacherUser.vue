<template>
  <div class="teacher_user" style="width: 100%; height: 100%">
    <div class="main_mask" v-show="mask"></div>
    <!-- 学习记录 -->
    <view-records v-show="recordshow" :recordData="recordData"></view-records>
    <!-- switch -->

    <edit-errors v-if="errors" :errorData="errorData"></edit-errors>

    <!-- 编辑 添加 -->
    <edit-user
      :tips="tips"
      :email="false"
      v-if="editStudentShow"
      title="学生"
      :upData="upData"
      @submit="submit"
    >
      <template v-slot:user>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">用户名/学号:</span>
        </div>
      </template>
      <template v-slot:select>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">班级:</span>
        </div>

        <select-box
          v-if="tips"
          :listData="classRoom"
          :typeId="'classRoomId'"
          :itemName="'name'"
          :itemId="'id'"
          :defaultTitle="'请选择班级'"
          :index="99999"
        ></select-box>
        <span class="edit_text_i" v-else>{{ upData.classRoomName }}</span>
        <p class="edit_tips">{{ classRoomIdText }}</p>
      </template>
    </edit-user>

    <!-- 导入 导出 -->

    <edit-import
      :title="'学生'"
      :uploadUrl="uploadUrl"
      @getData="getData"
      @downLoad="downLoad"
      v-if="editload"
    ></edit-import>
    <div class="main_header">
      <div class="main_header_left">
        <button class="add" @click="addStudent" style="margin-right: 2em">
          添加学生
        </button>
        <button class="import" @click="importstudent">导入学生</button>
      </div>
      <div class="main_header_right">
        <select-box
          :listData="classRoom"
          :title="'班级'"
          :typeId="'classRoomId'"
          :itemName="'name'"
          :itemId="'id'"
          :defaultTitle="'请选择班级'"
        ></select-box>

        <select-box
          :listData="statusData"
          :title="'状态'"
          :typeId="'status'"
          :itemName="'name'"
          :itemId="'status'"
          :defaultTitle="'请选择状态'"
        ></select-box>
        <label for class="label_mairgin_right">姓名</label>
        <input
          type="text"
          class="text_box"
          placeholder="请输入学生姓名"
          v-model="searchName"
        />
        <button class="submit" @click="getData(1)">检索</button>
      </div>
    </div>
    <table class="main_table">
      <thead class="thead-dark">
        <tr>
          <th class="table_5">序号</th>
          <th class="table_10">用户名/学号</th>
          <th class="table_10">密码</th>
          <th class="table_10">姓名</th>
          <th class="table_10">班级</th>
          <th class="table_10">最近登入时间</th>
          <th class="table_10">状态</th>
          <th class="table_10">操作</th>
          <th class="table_10">查看</th>
        </tr>
      </thead>
      <tbody v-show="!main_show">
        <tr v-for="(item, index) in studentData" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.passwd }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.classRoomName }}</td>
          <td>
            {{ item.lastLoginTime | lastTime(item.lastLoginTime, "从未登入") }}
          </td>
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
          <td>
            <p @click="seeRecord(item)">学习记录</p>
          </td>
        </tr>
      </tbody>
      <main-itps v-show="main_show"></main-itps>
    </table>
    <turn-page
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getData"
    ></turn-page>
  </div>
</template>

<script>
import mainItps from "../../components/mainItps";
import turnPage from "../../components/turnPage";
import editUser from "../../components/edit/editUser";
import editImport from "../../components/edit/editImport";
import viewRecords from "../../components/edit/viewRecords";
import selectBox from "../../components/selectBox";
import editErrors from "../../components/edit/editErrors";

export default {
  name: "teacher-user",
  data() {
    return {
      uploadUrl: "/users/student/import",
      switchValue: "",
      editStudentShow: false,
      tips: true,
      page: "1",
      size: "10",
      total: "",
      searchName: "",
      status: "",
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
      classRoom: "",
      classRoomId: "",
      studentData: {},
      upData: {},
      selected: undefined,
      classRoomIdText: "",
      editload: false,
      mask: false,
      recordData: "",
      recordshow: false,
      main_show: false,
      errors: false,
      errorData: "",
    };
  },
  components: {
    turnPage,
    editUser,
    viewRecords,
    editImport,
    mainItps,
    selectBox,
    editErrors,
  },
  mounted() {
    this.getData();
    this.getclassRoom();
  },
  methods: {
    addStudent() {
      this.mask = true;
      this.editStudentShow = true;
    },
    importstudent() {
      this.mask = true;
      this.editload = true;
    },
    getData(page = "1") {
      this.page = page;
      this.axios
        .get("/users/student", {
          params: {
            classRoomId: this.classRoomId,
            fuzzyName: this.searchName,
            status: this.status,
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          if (!res.data.rows.length == 0) {
            this.main_show = false;
          } else {
            this.main_show = true;
          }
          this.studentData = res.data.rows;
          this.total = res.data.total;
        });
    },
    getclassRoom() {
      this.axios
        .get("/classrooms", {
          params: {
            page: "1",
            size: "200",
          },
        })
        .then((res) => {
          this.classRoom = res.data.rows;
        });
    },
    downLoad() {
      let url = this.$url.replace("/download/", "");
      window.location.href = `${url}/users/student/template`;
    },
    edit(e) {
      this.mask = true;
      this.tips = false;
      this.editStudentShow = true;
      this.upData = e;
    },
    checkclassRoomId() {
      if (!+this.classRoomId) {
        this.classRoomIdText = "请选择班级";
        return false;
      }
      this.classRoomIdText = "";
      return true;
    },
    seeRecord(e) {
      this.axios
        .get(`${e.id}/train/list`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          if (res.data.rows.length == "0") {
            this.$Message.error("暂无学习记录");
            return;
          }
          this.recordshow = true;
          this.mask = true;
          this.recordData = res.data.rows;
          console.log(this.recordData);
        });
    },
    submit() {
      this.classRoomId=this.$store.state.classRoomId || this.upData.classRoomId
      if (!this.classRoomId) {
        this.classRoomIdText = "请选择班级";
        return;
      }
      this.classRoomIdText = "";

      var methods = "post",
        url = "",
        msg = "添加";
      this.status = "";
      if (!this.tips) {
        methods = "put";
        url = this.upData.id;
        this.classRoomId=this.upData.classRoomId
        this.status = "";
        msg = "编辑";
      }
      {
        this.http[methods](`/users/student/${url}`, {
          avatar: this.studentAvatar,
          name: this.upData.name,
          passwd: this.upData.passwd,
          userName: this.upData.userName,
          classRoomId: this.classRoomId,
          mobile: this.upData.mobile,
          status: this.status,
          email: this.upData.email,
        }).then((res) => {
          if (res.code == "000000") {
            this.getData(this.page);
            this.upData = {};
            this.tips = true;
            this.editStudentShow = false;
            this.$Message.warning(`${msg}成功!`);
            this.mask = false;
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    switchChange(e) {
      if (e.status) {
        return this.axios.put(`/users/${e.id}/enable`).then((res) => {
          if (res.code == "000000") {
            this.$Message.warning(`${e.name}已启用!`);
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
      this.axios.delete(`/users/${e.id}/disable`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning(`${e.name}已禁用!`);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>


