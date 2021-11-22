import Vue from 'vue'
import Router from 'vue-router'
import article_add from '../article-add'//新增文章
// import bytemd_add from '@/view/aboveMain/bytemd-add'//新增md

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router =new Router({
  routes: [
    {
      path: '/addArticle',
      name: "addArticle",
      component: article_add,
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


export default  router;
