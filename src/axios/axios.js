/**
* ajax请求配置
*/
import axios from "axios";
// axios默认配置
axios.defaults.timeout = 10 * 60000; // 超时时间 1分钟
axios.defaults.baseURL = "http://192.168.147.1:8088"; // 默认请求地址的前缀，如：/api/login => http://localhost:8081/api/login
// 格式化数据，将请求参数转化成 json 字符串
// axios.defaults.transformRequest = function (data) {
//   return JSON.stringify(data);
// };
// http request interceptor
axios.interceptors.request.use(
  config => {
    if (!config.headers.hasOwnProperty("Content-Type")) {
      config.headers["Content-Type"] = "application/json;charset=UTF-8"; // 设置请求参数提交方式
      // config.headers["token"] = sessionStorage.getItem("token");
      // 添加会话身份认证令牌（可选）
    }
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });
// http response interceptor
axios.interceptors.response.use(
  response => {
    // 后台接口返回值格式：{data: {}, msg:{}, code: 200}
    // 将 data 数据取出后，返回给方法的 promise 函数，可以简化回调函数
    return response.data;
  },
  error => {
    return Promise.reject(error.response); // 返回接口返回的错误信息
  });
export default axios;