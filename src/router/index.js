import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import Index from '@/components/index'
import article_Details from "../components/article_Details";
=======
import Index from '@/components/index'//首页模板
import aboutMy from "../components/page/aboutMy"; //关于我
import article from "../components/modelPage/article"; //文章页面
import addArticle from "../components/page/addArticle"; //新增文章

//引入模块页面
import home from '@/components/modelPage/home' //首页列表页面
import notice from '@/components/modelPage/notice' //公告页面

>>>>>>> 099c61508feea35083d4977af016199f05345bc2

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
<<<<<<< HEAD
      component: Index
    },
    {
      path:'/details',
      name:'article_Details',
      component: article_Details
    }
=======
      component: Index,
      children: [{
        path:'/',
        components:{
          aboveMain:home,
          aboveSecondary:notice,
        },
      }]
    },
    {
      path:'/article',
      name: "article",
      component: Index,
      children: [{
        path:'/',
        components:{
          aboveMain:article,
          aboveSecondary:notice,
        },
      }]
    },
    {
      path: '/aboutMy',
      name: "aboutMy",
      component: aboutMy
    },
    {
      path: '/addArticle',
      name: "addArticle",
      component: addArticle
    },
>>>>>>> 099c61508feea35083d4977af016199f05345bc2
  ]
})
