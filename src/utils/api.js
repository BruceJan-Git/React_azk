import axios from 'axios'
// 配置基准路径
axios.defaults.baseURL='http://localhost:8080'
// 配置响应拦截
axios.interceptors.response.use(res => {
  return res.data
})