// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './utils/ant-import'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './config/vuex/store'
import 'swiper/css/swiper.css'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'
import infiniteScroll from 'vue-infinite-scroll'
import router from './config/router'
import https from './config/request/request'

Vue.prototype.$https=https;

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(infiniteScroll)

router.beforeEach(function(to,form,next){
  if(to.name === form.name){
  }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
