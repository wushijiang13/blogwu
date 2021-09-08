import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articleList: ['','','','',''],
    articlePage: 1,
    articleLimit: 6,
    articleListEnd:false,//是否是没有数据了
    articleSearch:"",//搜索条件
  },
  mutations: {
    ADD_ARTICLE_LIST (state,data) {
      state.articleList=data;
    },
    PUSH_ADD_ARTICLE_LIST(state,data){
      state.articleList.push(...data);
    },
    CLEAR_ARTICLE_PAGE(state){
      state.articlePage=1;
    },
    ADD_ARTICLE_PAGE(state){
      state.articlePage++;
    },
    SET_ARTICLE_LIST_END(state,data){
      state.articleListEnd=data;
    },
    SET_ARTICLE_SEARCH(state,data){
      state.articleSearch=data;
    }
  },
  actions:{
    setAddArticleList({commit},data){
      return new Promise(resolve => {
        commit("ADD_ARTICLE_LIST",data);
        // console.log(state.articleList); //这里有点问题就是没有真正调用vuex里面的对象内容，不保险，回头修改成调用vuex保存好的数据然后callback回去
        resolve(data);
      })
    },
    setPushArticleList({commit},data){
      return new Promise(resolve => {
        commit("PUSH_ADD_ARTICLE_LIST",data);
        // console.log(state.articleList); //这里有点问题就是没有真正调用vuex里面的对象内容，不保险，回头修改成调用vuex保存好的数据然后callback回去
        resolve(data);
      })
    },
    clearArticlePage(state){
      return new Promise(resolve => {
        state.commit("CLEAR_ARTICLE_PAGE");
        state.commit("SET_ARTICLE_LIST_END",false);
        resolve(state.articlePage);
      })
    },
    addArticlePage(state){
      return new Promise(resolve => {
        state.commit("ADD_ARTICLE_PAGE");
        resolve(state.articlePage);
      })
    },
    setArticleListEnd(state,data){
      return new Promise(resolve => {
        state.commit("SET_ARTICLE_LIST_END",data);
        resolve(state.articleListEnd);
      })
    },
    setArticleSearch(state,data){
      return new Promise(resolve => {
        state.commit("SET_ARTICLE_SEARCH",data);
        resolve(state.articleSearch);
      })
    },
  }
})

export default store;
