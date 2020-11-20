// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'

import router from './router'

Vue.config.productionTip = false
Vue.use(Antd);
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
  components: { App },
  template: '<App/>'
})
