// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/border.css'
import './assets/reset.css'
import axios from 'axios'
import md5 from 'md5'
import Vuejsonp from 'vue-jsonp'

Vue.use(Vuejsonp)
Vue.prototype.$md5 = md5
Vue.prototype.$http = axios.create({
  baseURL:'http://api.fanyi.baidu.com/api/trans/vip/'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
