// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './config/global/config'
import store from './config/vuex/store'
import infiniteScroll from 'vue-infinite-scroll'
import router from './config/router'
import https from './config/request/request'

import './config/css/ant-import'

Vue.prototype.$https=https;

Vue.config.productionTip = false
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

