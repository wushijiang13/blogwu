import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/components/layout/layout-main'//全局布局模板
import article_add from '../article-add'//新增文章
// import bytemd_add from '@/view/aboveMain/bytemd-add'//新增md

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

NProgress.configure({ showSpinner: false });

const router =new Router({
  routes: [
    {
      path: '/addArticle',
      name: "addArticle",
      component: Layout,
      children: [{
        path:'/',
        components:{
          freeMain:article_add,//新增文章
        },
      }]
    },
    // {
    //   path: '/addBytemd',
    //   name: "addBytemd",
    //   component: Layout,
    //   children: [{
    //     path:'/',
    //     components:{
    //       freeMain:bytemd_add,//新增md
    //     },
    //   }]
    // },
  ]
})

router.beforeEach((to, from, next)=>{
  NProgress.start();
  Vue.prototype.$loading.open();
  next();
})

router.afterEach(()=>{
  document.documentElement.scrollTop=0;
  Vue.prototype.$loading.close();
  NProgress.done();
})

export default  router;
