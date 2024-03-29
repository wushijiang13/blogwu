import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/components/layout/layout-main'//全局布局模板
import article_list from '@/view/aboveMain/article-list' //博客列表
import article from '@/view/aboveMain/article-details'// 文章详情
import about_my from '@/view/aboveMain/about-my'//关于我
import documentation from '@/view/aboveMain/documentation'//文档记录
import notice from '@/view/aboveSecondary/notice'//公告


Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

NProgress.configure({ showSpinner: false });

const router =new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Layout,
      children: [{
        path:'/',
        components:{
          aboveMain:article_list,
          aboveSecondary:notice,
        },
      }]
    },
    {
      path:'/details',
      name: "details",
      component: Layout,
      children: [{
        path:'/',
        components:{
          freeMain:article,//文章详情页面
        },
      }]
    },
    {
      path: '/documentation',
      name: "documentation",
      component: Layout,
      children: [{
        path:'/',
        components:{
          aboveMain:documentation,
        },
      }]
    },
    {
      path: '/aboutMy',
      name: "aboutMy",
      component: Layout,
      children: [{
        path:'/',
        components:{
          aboveMain:about_my,
        },
      }]
    },
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
