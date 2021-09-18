<template>
  <div class="above_main">
    <div class="above_list">
      <div v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="$store.state.articleListEnd"
           :infinite-scroll-immediate-check="false"
           :infinite-scroll-distance="100">
        <CellItem v-for="(item,index) in articleList" :key="index" :info="item" @click.native="goArticle(item)">
          <a-divider slot="dividers" v-if="(articleList.length-1) != index "/>
        </CellItem>

        <div class="not-list" v-show="articleList.length == 0 && typeof  articleList != 'string'">
          <p class="not-title">
            数据库都查炸了╮(╯▽╰)╭<br/>
            都没有找到您想要的信息。。
          </p>
        </div>
      </div>
    </div>
    <div class="list_end" v-show="$store.state.articleListEnd">
      已经到底了, ε=ε=ε=ε=ε=ε=┌(;￣◇￣)┘
    </div>
  </div>
</template>

<script>
  import CellItem from '../../components/layout/cell-item'
  import {getArticleList} from '@config/request/requestUrl'
  import {mapState} from 'vuex';

  export default {
    name: "article_list",
    data() {
      return {
        loading: false,
      }
    },
    components: {
      CellItem,
    },
    computed: {
      ...mapState({
        articleList: state => state.articleList  /*从vuex中获取到数据*/
      })
    },
    created() {
      this.$store.dispatch("clearArticlePage");
      this.loading = true;
    },
    methods: {
      /**
       * 获取文章推荐list
       * @params type  = replace 替换查询数组 =push 追加查询数组
       */
      getArticleList(type = 'replace') {
        return new Promise((resolve, reject) => {
          this.$https.post(getArticleList, {
            page: this.$store.state.articlePage,
            limit: 7,
            search: this.$store.state.articleSearch
          }).then(async ({code, data}) => {
            if (code == 200) {
              if (data.length >= 1) {
                const operateStatus = type == 'replace' ? "setAddArticleList" : "setPushArticleList";
                await this.$store.dispatch(operateStatus, data);
                await this.$store.dispatch("addArticlePage");
                resolve();
              } else {
                await this.$store.dispatch("setArticleListEnd", true);
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
            article_id: articleInfo.article_id,
          }
        });
      },
      /**
       * 下拉刷新
       */
      async loadMore() {
        try {
          if (this.$store.state.articleListEnd) {
            return;
          }
          let type = 'replace';//遍历结果类型
          if (this.$store.state.articlePage == 1) { //第一次
            type = 'replace';
          } else {
            type = 'push';
          }
          await this.getArticleList(type);
        }catch (e) {
          this.$message.warning("到底了，没数据啦");
        } finally {
          this.loading = false;
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .not-list {
  }

  .not-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
  }

  .above_main {
    width: 44rem;
    display: inline-block;
  }

  .above_list {
    width: 100%;
    background-color: @body-bg-color;
    display: inline-block;
  }

  .list_end {
    text-align: center;
    background-color: @theme-bubble-bg-color;
    color: @theme-font-1-color;
    padding: 0.6rem;
    margin-top: 0.8rem;
  }

  @media screen and (max-width: 960px) {
    .above_list{
      width: 95%;
      margin: 0px auto;
      display: block;
    }
    .above_main{
      width: 100vw;
    }
    .not-list{
      width: 100%;
      padding: 2rem;
    }
  }
</style>
