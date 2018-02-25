import Vue from 'vue'
import App from './App'
import router from './router' // 路由配置
import VueProgressBar from 'vue-progressbar' // 加载进度条
import ElementUI from 'element-ui' // element-ui组件
import 'element-ui/lib/theme-chalk/index.css' // element-ui样式
// import axios from 'axios' // 拦截器
import axios from './http'
import VueAxios from 'vue-axios'
import moment from 'moment' // 日期操作模块
import store from './vuex/store'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

Vue.use(ElementUI, {
  size: 'mini'
})

Vue.use(VueAxios, axios)
Vue.prototype.$moment = moment;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
