import axios from "axios";


const upload = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: { "Content-Type": " application/json" }
})
upload.defaults.withCredentials = true;
upload.defaults.validateStatus = function (status) {
  return /^(2|3|4)\d{2}$/.test(status);
}
upload.interceptors.response.use(function onFulfilled(response) {
  return response.data;
}, function onRejected(reason) {
  return Promise.reject(reason);
});
export default upload