import Vue from 'vue'
import Vuex from 'vuex'
import qs from "qs";
import { Message } from 'view-design';
import http from '../http/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sex: '',
    flag: false,
    menuId: '-1',
    editPwd: false,
    editCurrent: false,
    total: 0,
    messageData: '',
    current: '',
    avatar: '',
    examId: '',
    typeId: '',
    did: '',
    messageMenu: [
      {
        title: '问题讨论',
        router: 'messageforum',
        item: ''
      },
      {
        title: '问题提问',
        router: 'messagepublish',
        item: ''
      },
      {
        title: '我的问题',
        router: 'messagemy',
        item: ''
      },
      {
        title: '我的私信',
        router: 'messageprivate',
        item: ''
      },
    ],
    adminMenu: [
      {
        title: "教师管理",
        item: "",
        show: false,
        router: "adminmaster",
        itemRouter: "",
      },
      {
        title: "编制管理",
        item: "",
        show: false,
        router: "adminorganization",
        itemRouter: "",
      },
      {
        title: "数据管理",
        item: "",
        show: false,
        router: "adminstatistics",
        itemRouter: "",
      },
      {
        title: "LOGO修改",
        item: "",
        show: false,
        router: "adminlogo",
        itemRouter: "",
      },
      {
        title: "算分逻辑",
        item: "",
        show: false,
        router: "adminnumber",
        itemRouter: "",
      },
      {
        title: "修改密码",
        item: "",
        show: false,
      },
      {
        title: "内容管理",
        item: [
          "望诊诊断",
          "闻诊诊断",
          "切诊诊断",
          "病名诊断",
          "治则治法",
          "方剂方药",
          "药材库",
        ],
        show: false,
        router: "adminlook",
        itemRouter: [
          "adminlook",
          "adminhear",
          "adminpulse",
          "adminname",
          "admintreatment",
          "adminprescription",
          "adminHerb",
        ],
      },
    ],
    teacherMenu: [
      {
        title: "账号管理",
        router: "teacheruser",
        item: "",
        show: false,
      },
      {
        title: "班级管理",
        router: "teacherclass",
        item: "",
        show: false,
      },
      {
        title: "学生成绩",
        router: "teacherstudent",
        item: "",
        show: false,
      },
      {
        title: "案例管理",
        router: "teachercase",
        item: "",
        show: false,
      },
      {
        title: "发布考试",
        router: "teacherrelease",
        item: "",
        show: false,
      },
      {
        title: "考试管理",
        router: "teacherexam",
        item: "",
        show: false,
      },
      {
        title: "数据分析",
        show: false,
        item: [
          "训练分析",
          "考试分析",
        ],
        router: "trainanalysis",
        itemRouter: [
          "trainanalysis",
          "examanalysis",
        ],
      },
      {
        title: "修改密码",
        item: "",
        show: false,
      },
      {
        title: "个人信息",
        item: "",
        show: false,
      },
    ],
    stuedntMenu: [
      {
        title: "个人信息 ",
        router: "usercenter",
        item: "",
      },
      {
        title: "修改密码 ",
        router: "userpassword",
        item: "",
      },
      {
        title: "学习记录",
        router: "userrecord",
        item: "",
      },
      {
        title: "数据统计",
        router: "userstatistics",
        item: "",
      },
    ],
  },
  mutations: {
    editPassword(state, flag) {
      state.editPwd = flag
    },
    editCurrent(state, flag) {
      state.editCurrent = flag
    },
    submit(state) {
      let obj = {
        mobile: state.current.mobile,
        email: ''
      }
      http.put(`/my/profile?${qs.stringify(obj)}`,).then(res => {
        if (res.code == '000000') {
          state.editCurrent = false
          return
        } else if (res.code != '400003') {
          Message.error(res.msg)
        }
      })
    }
  },
  actions: {


  },
  modules: {
  }
})
