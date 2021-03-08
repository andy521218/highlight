/*eslint-disable*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'view-design/dist/styles/iview.css'
import "./assets/css/rest.css"
import "./assets/css/base.scss"
import { Switch, Message, Circle, Icon, } from 'view-design';
import axios from "axios"
import http from "../src/http/http"
import upload from "../src/http/upload"
import VueAxios from "vue-axios"
import qs from "qs";
import filters from './filters'
import { DatePicker, TimePicker, MessageBox } from "element-ui"

Vue.component('i-switch', Switch);
Vue.component('i-circle', Circle);
Vue.component('i-con', Icon);
Vue.use(VueAxios, axios);
Vue.use(DatePicker, TimePicker)

Vue.use(filters)
Vue.prototype.http = http
Vue.prototype.teacherAvatar = '09/1609119208449.png'
Vue.prototype.studentAvatar = '82/1609119248774.png'
Vue.prototype.qs = qs
Vue.prototype.$url = 'http://101.132.150.87/api/download/'
Vue.prototype.upload = upload
Vue.prototype.$Message = Message
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

axios.interceptors.response.use(function onFulfilled(response) {
  if (response.data.code == '100014') {
    MessageBox.alert("其他地点登入", "提示", {
      confirmButtonText: "确定",
      type: "error",
      callback: () => {
        router.push('/login')
      }
    });
  }
  if (response.data.code == '500192') {
    MessageBox.alert("您考试时间已到!", "提示", {
      confirmButtonText: "确定",
      type: "error",
      callback: () => {
        router.push('/index')
      }
    });
  }
  return response.data;
}, function onRejected(reason) {
  Message.error('连接服务器超时')
  return Promise.reject(reason.data);
});

axios.defaults.validateStatus = function (status) {
  if (status == '401') {
    localStorage.removeItem('authority')
    Message.error('长时间未操作,请重新登入!')
    router.push('/login')
  }
  return /^(2|3|4)\d{2}$/.test(status);
}

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  let url = window.location.href;
  url = url.match(/http:\/\/.+\//)[0]
  Vue.prototype.$url = url + 'api/download/'
  const token = sessionStorage.getItem('token')
  if (to.name == 'login') {
    next()
  } else {
    if (!token) {
      MessageBox.alert("你尚未登陆,请先登入后查看!", "提示", {
        confirmButtonText: "确定",
        type: "error",
        callback: () => {
          next('login')
        }
      });
    }
  }
  if (to.name == 'index') {
    store.state.flag = false
  } else {
    store.state.flag = true
  }
  //获取提示消息
  if (to.name != 'login') {
    axios
      .get("/message/my", {
        params: {
          page: "1",
          size: "500",
        },
      })
      .then((res) => {
        store.state.total = 0
        store.state.messageData = res.data
        res.data.rows.forEach((item) => {
          if (item.status) {
            store.state.total++
          }
        });
      });
  }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
