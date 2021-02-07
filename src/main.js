// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './utils/ant-import'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './vuex/store'
import 'swiper/css/swiper.css'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'

import router from './router'
import {get,post,asyncFunQueue} from './request/request'

Vue.prototype.$get=get;
Vue.prototype.$post=post;
Vue.prototype.$asyncFunQueue=asyncFunQueue;

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

router.beforeEach(function(to,form,next){
  console.log(form);
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
