import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import article_Details from "../components/article_Details";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/details',
      name:'article_Details',
      component: article_Details
    }
  ]
})
