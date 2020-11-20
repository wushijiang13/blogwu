import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import aboutMy from "../components/aboutMy";

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
      component: Index
    },
    {
      path: '/aboutMy',
      name: "aboutMy",
      component: aboutMy
    }
  ]
})
