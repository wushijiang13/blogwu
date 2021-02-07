import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articleList: [],
  },
  mutations: {
    Add_ARTICLE_LIST (state,data) {
      state.articleList=data;
    }
  },
  actions:{
    setAddArticleList({commit},data){
      return new Promise(resolve => {
        commit("Add_ARTICLE_LIST",data);
        console.log(data);
        // console.log(state.articleList); //这里有点问题就是没有真正调用vuex里面的对象内容，不保险，回头修改成调用vuex保存好的数据然后callback回去
        resolve(data);
      })
    },
  }
})

export default store;
