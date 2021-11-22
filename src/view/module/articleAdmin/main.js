import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import VueTypedJs from 'vue-typed-js'

import '@config/global/config'
import store from '@config/vuex/store'
import https from '@config/request/request'
import '@config/ant/ant-import'

Vue.prototype.$https=https;

Vue.config.productionTip = false;

Vue.use(VueTypedJs)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
