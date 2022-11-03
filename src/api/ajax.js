
import axios from "axios";

//在当前模块中引入store
import store from '@/store';


let requests = axios.create({
  //基础路径
  baseURL: "/api",
  //请求不能超过5S
  timeout: 5000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {

    //相应成功做的事情
    return res.data;
  },
  (err) => {
    alert("服务器响应数据失败");
  }
);
export default requests;