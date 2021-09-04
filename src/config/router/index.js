import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/components/layout/layout_main'//全局布局模板
import article_list from '@/view/modelPage/article_list' //首页列表
import notice from '@/view/modelPage/notice'//公告
import article from '@/view/modelPage/article'// 文章详情
import article_details from '@/components/article_details'// 文章详情 demo
import about_my from '@/view/page/about_my'//关于我
import add_article from '@/view/page/add_article'//新增文章

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
      path:'/article',
      name: "article",
      component: Layout,
      children: [{
        path:'/',
        components:{
          aboveMain:article,//文章详情页面
          aboveSecondary:null,
        },
      }]
    },
    {
      path:'/details',
      name:'details',
      component: article_details //文章详情demo
    },
    {
      path: '/aboutMy',
      name: "aboutMy",
      component: Layout,
      children: [{
        path:'/',
        components:{
          aboveMain:about_my,//关于我
          aboveSecondary:null,
        },
      }]
    },
    {
      path: '/addArticle',
      name: "addArticle",
      component: Layout,
      children: [{
        path:'/',
        components:{
          aboveMain:add_article,//新增文章
          aboveSecondary:null,
        },
      }]
    },
  ]
})

router.beforeEach((to, from, next)=>{
  NProgress.start();
  next();
})

router.afterEach(()=>{
  NProgress.done();
})

export default  router;
