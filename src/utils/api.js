import axios from 'axios'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:8080'
export const API_BASE = 'http://localhost:8080'
// 配置响应拦截
axios.interceptors.response.use(res => {
  return res.data
})
export const currentCity = () => {
  return new Promise((resolve, reject) => {
    let city = window.localStorage.getItem('currentCity')
    // 判断是否有缓存地址
    if (city) {
      let res = JSON.parse(city)
      resolve(res)
    } else {
      var myCity = new window.BMap.LocalCity();
      myCity.get(async (res) => {
        let currentCity = await axios.get('area/info', {
          params: {
            name: res.name
          }
        })
        console.log(currentCity)
        window.localStorage.setItem('currentCity', JSON.stringify(currentCity.body))
        resolve(currentCity.body)
      });
    }
  })
}
// 定义发布订阅模式处理非父子组件之间的传值
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

export const myEmitter = new MyEmitter();

const TOKEN = 'mytoken'
export const token = {
  getToken:() => {
    return sessionStorage.getItem(TOKEN)
  },
  setToken: (token) => {
    sessionStorage.setItem(TOKEN,token)
  },
  removeToken: () => {
    sessionStorage.removeItem(TOKEN)
  }
}
// 接口拦截,统一添加接口的请求头
axios.interceptors.request.use((config) => {
  let url = config.url
  if(url.startsWith('user') && !url.startsWith('user/login') && !url.startsWith('user/registered')) {
    config.headers.Authorization = token.getToken()
  }
  return config
})