import axios from 'axios' // 拦截器
import router from './router'
import {
  Message
} from 'element-ui'

axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = window.localStorage.getItem('token');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit('loginOut');
          localStorage.removeItem('appid');
          localStorage.removeItem('token');
          // this.$router.push('/login');
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    Message.error({
      message: "身份验证错误或者已过期，请重新登录"
    })
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

export default axios;
