import Vue from 'vue'
import App from './App.vue'
import './config/global/config'
import store from './config/vuex/store'
import infiniteScroll from 'vue-infinite-scroll'
import router from './config/router'
import https from './config/request/request'
import VueTypedJs from 'vue-typed-js'
import './config/ant/ant-import'

Vue.prototype.$https=https;

Vue.config.productionTip = false;

Vue.use(infiniteScroll)
Vue.use(VueTypedJs)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
