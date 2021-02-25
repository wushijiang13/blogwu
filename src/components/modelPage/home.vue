<template>
  <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="10">
      <cellItem  v-for="(item,index) in articleList" :key="index" :info="item" @click.native="goArticle(item)">
        <a-divider slot="dividers" v-if="(articleList.length-1) != index "/>
      </cellItem>
      <div class="not-list" v-show="articleList.length == 0 && typeof  articleList != 'string'">
        <p class="not-title">
          数据库都查炸了╮(╯▽╰)╭<br/>
          都没有找到您想要的信息。。
        </p>
      </div>
  </div>
</template>

<script>
import cellItem from '../public/cell-item'
import {getArticleList} from '../../request/requestUrl'
import {mapState} from 'vuex';
import {getConversionTime, base64En, isNullCheck} from "../../utils/utils";

export default {
  name: "home",
  data(){
    return {
      loading:false,
      busy:false,
      page:0,//默认是0 页面刚打开没数据会触发下拉监听函数 里面默认page +1 所以设置默认值0
    }
  },
  components: {
    cellItem,
  },
  computed: {
    ...mapState({
      articleList: state => state.articleList  /*从vuex中获取到数据*/
    })
  },
  created() {
    this.loading=true;
  },
  methods:{
    /**
     * 获取文章推荐list
     * @params type  = replace 替换查询数组 =push 追加查询数组
     */
    getArticleList(type = 'replace') {
        return new Promise((resolve,reject) => {
          this.$post(getArticleList, {page: isNullCheck(this.page) ? this.page : 1 , limit: 7}).then((res) => {
            if (res.code == 0) {
              if (res.data.length >= 1) {
                let data = res.data.map(item => {
                  if (item.article_time != undefined) {
                    item.article_time = getConversionTime(item.article_time);
                  }
                  return item;
                });
                if(type == 'replace'){
                  this.$store.dispatch("setAddArticleList", data).then(() => {
                    resolve();
                  });
                }else {
                  this.$store.dispatch("setPushArticleList", data).then(() => {
                    resolve();
                  });
                }
              }else{
                reject();
              }
            }
          })
        })
    },
    /***
     * 前往文章页面
     * @param articleId 文章id
     */
    goArticle(articleInfo) {
      this.$router.push({
        path: '/article',
        query: {
         articleInfo:base64En(articleInfo),
        }
      });
    },
    /**
     * 加载成功
     */
    requestSucess(){
      this.busy = false;
      this.loading=false;
    },
    /**
     * 下拉刷新
     */
    loadMore() {
      if(this.busy){
        return ;
      }
      let type = 'replace';//遍历结果类型
      this.page=this.page+1;
      this.busy = true;
      if(this.page == 1){ //第一次
        type='replace';
      }else {
        type='push';
      }
      this.getArticleList(type).then(()=>{
        this.requestSucess();
      }).catch(()=>{

      });
    },
  }
}
</script>

<style scoped>
.not-list {
}
.not-title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 200px;
}
</style>
