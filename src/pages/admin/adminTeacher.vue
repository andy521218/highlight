<template>
  <div class="admin_record" style="width: 100%; height: 100%">
    <div class="main_mask" v-show="mask"></div>
    <edit-user
      :tips="tips"
      v-if="editStudentShow"
      title="教师"
      :upData="upData"
      @submit="submit"
    >
      <template v-slot:user>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">用户名/工号:</span>
        </div>
      </template>
      <template v-slot:select>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">院系:</span>
        </div>
        <!-- <select
          class="select"
          v-if="tips"
          v-model="upData.did"
          @change="checkDid"
        >
          <option :value="selected">请选择院系</option>
          <option
            :value="item.id"
            v-for="(item, index) in departments"
            :key="index"
          >
            {{ item.name }}
          </option>
        </select> -->
        <selectBox
          v-if="tips"
          :listData="departments"
          :typeId="'did'"
          :itemName="'name'"
          :itemId="'id'"
          :defaultTitle="'请选择院系'"
        ></selectBox>
        <span class="edit_text_i" v-else>{{ upData.departmentName }}</span>
        <p class="edit_tips">{{ departmentsText }}</p>
      </template>
    </edit-user>

    <edit-import
      :title="'教师'"
      :uploadUrl="uploadUrl"
      @getData="getData"
      @downLoad="downLoad"
      v-if="editload"
    ></edit-import>

    <div class="main_header">
      <div class="main_header_left">
        <button class="add" @click="addTeacher" style="margin-right: 2em">
          添加教师
        </button>
        <button class="import" @click="importTeacher">教师导入</button>
      </div>
      <div class="main_header_left">
        <selectBox
          :title="'院系'"
          :listData="departments"
          :typeId="'departmentId'"
          :itemName="'name'"
          :itemId="'id'"
          :defaultTitle="'请选择院系'"
        ></selectBox>
        <select-box
          :listData="statusData"
          :title="'状态'"
          :typeId="'status'"
          :itemName="'name'"
          :itemId="'status'"
          :defaultTitle="'请选择状态'"
        ></select-box>
        <label class="label_mairgin_right">教师姓名</label>
        <input
          type="text"
          class="text_box"
          v-model="searchName"
          placeholder="请输入教师姓名"
        />
        <button class="submit" @click="getData">检索</button>
      </div>
    </div>

    <table
      class="main_table"
      style="border-collapse: separate; border-spacing: 0px 8px"
    >
      <thead class="thead-dark">
        <tr>
          <th class="table_5">序号</th>
          <th class="table_10">用户名/工号</th>
          <th class="table_10">密码</th>
          <th class="table_10">姓名</th>
          <th class="table_10">院系</th>
          <th class="table_10">最近登入时间</th>
          <th class="table_10">状态</th>
          <th class="table_10">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in studentData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.passwd }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.departmentName }}</td>
          <td>{{ item.lastLoginTime | lastTime(item.lastLoginTime) }}</td>
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
    </table>
    <turn-page
      v-show="total > 10"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getData"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editUser from "../../components/edit/editUser";
import editImport from "../../components/edit/editImport";
import selectBox from "../../components/selectBox";
export default {
  name: "admin-teacher",
  components: {
    turnPage,
    editUser,
    editImport,
    selectBox,
  },
  data() {
    return {
      upData: {},
      uploadUrl: "/users/teacher/import",
      tips: true,
      switchValue: "",
      editStudentShow: false,
      total: "",
      page: "1",
      size: "10",
      searchName: "",
      status: "",
      studentData: {},
      departments: "",
      departmentsText: "",
      departmentId: "",
      selected: undefined,
      editload: false,
      mask: false,
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
    this.getData();
    this.getdepartments();
  },
  methods: {
    addTeacher() {
      this.mask = true;
      this.editStudentShow = true;
    },
    getdepartments() {
      this.axios
        .get("/departments", {
          params: {
            classRoomId: this.classRoomID,
            fuzzyName: this.searchName,
            status: this.status,
            page: this.page,
            size: this.size,
          },
        })
        .then((res) => {
          this.departments = res.data.rows;
        });
    },
    getData() {
      this.axios
        .get("/users/teacher", {
          params: {
            departmentId: this.departmentId,
            fuzzyName: this.searchName,
            status: this.status,
            page: this.page,
            size: this.size,
          },
        })
        .then((res) => {
          this.studentData = res.data.rows;
          this.total = res.data.total;
        });
    },
    checkDid() {
      if (!this.$store.state.did) {
        this.departmentsText = "请选择院系";
        return false;
      }
      this.departmentsText = "";
      return true;
    },
    downLoad() {
      let url = this.$url.replace("/download/", "");
      window.location.href = `${url}/users/teach/template`;
    },
    importTeacher() {
      this.mask = true;
      this.editload = true;
    },
    edit(e) {
      this.tips = false;
      this.mask = true;
      this.editStudentShow = true;
      this.upData = e;
      this.$store.state.did = e.departmentId;
    },
    submit() {
      if (!this.checkDid()) return;
      var methods = "post",
        url = "",
        id = this.$store.state.did,
        msg = "添加";
      if (!this.tips) {
        methods = "put";
        id = this.$store.state.did;
        url = this.upData.id;
        msg = "编辑";
      }
      this.http[methods](`/users/${id}/teacher/${url}`, {
        avatar: this.teacherAvatar,
        name: this.upData.name,
        passwd: this.upData.passwd,
        userName: this.upData.userName,
        mobile: this.upData.mobile,
        status: this.status,
        email: this.upData.email,
      }).then((res) => {
        if (res.code == "000000") {
          this.getData();
          this.upData = {};
          this.tips = true;
          this.editStudentShow = false;
          this.mask = false;
          this.$Message.warning(`${msg}成功!`);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    switchChange(e) {
      this.http
        .put(`/users/${e.departmentId}/teacher/${e.id}`, {
          avatar: e.avatar,
          passwd: e.passwd,
          userName: e.userName,
          classRoomId: e.classRoomId,
          mobile: e.mobile,
          status: e.status,
          email: e.email,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("修改成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>

