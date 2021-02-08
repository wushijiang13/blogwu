<template>
  <div>
    <cellItem v-for="(item,index) in articleList" :key="index" :info="item" @click.native="goArticle(item)">
      <a-divider slot="dividers" v-if="(articleList.length-1) != index "/>
    </cellItem>
    <div class="not-list" v-show="articleList.length == 0">
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
import {getConversionTime,base64En} from "../../utils/utils";

export default {
  name: "home",
  components: {
    cellItem,
  },
  computed: {
    ...mapState({
      articleList: state => state.articleList  /*从vuex中获取到数据*/
    })
  },
  created() {
    this.$asyncFunQueue.call(this, this.getArticleList);
  },
  methods:{
    /**
     * 获取文章推荐list
     */
    getArticleList() {
      return new Promise((resolve) => {
        this.$post(getArticleList, {page: 1, limit: 10}).then((res) => {
          if (res.code == 0) {
            if (res.data.length >= 1) {
              let data = res.data.map(item => {
                if (item.article_time != undefined) {
                  item.article_time = getConversionTime(item.article_time);
                }
                return item;
              });
              this.$store.dispatch("setAddArticleList", data).then(() => {
                resolve();
              });
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
