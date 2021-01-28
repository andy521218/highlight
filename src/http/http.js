import axios from "axios";
import {Message} from 'view-design';

  const http =axios.create({
    baseURL :'/api',
    timeout:8000,
    headers: { "Content-Type": " application/json" },
    transformRequest: [
      function (data) {
        return JSON.stringify(data);
      },
    ]
  })
  http.defaults.withCredentials = true;
  http.defaults.validateStatus = function (status) {
    if(status=='401') return  Message.warning('长时间未操作,请重新登入!')
     return /^(2|3|4)\d{2}$/.test(status);
   }
   http.interceptors.response.use(function onFulfilled(response) {
    return response.data;
  }, function onRejected(reason) {
    // Message.error('连接服务器超时')
    return Promise.reject(reason);
  });
export default http