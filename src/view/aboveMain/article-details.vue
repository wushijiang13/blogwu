<!--文章页面-->
<template>
  <div class="article">
    <wuSideNavigation class="article-navigation" ref="sideNavigationRef" />
    <div class="article-details">
      <wuDetailsContent :articleInfo="articleInfo"/>
      <div class="article-comment">
        <wuComment :path="articleInfo.article_title"  :placeholder="'看完文章了，有什么想说的？'" />
      </div>
      <div class="not-data">
        <div  v-show="!articleInfo && isCloseInit">
          <a-result status="404" title="404" sub-title="抱歉，页面走丢了。。">
            <template #extra>
              <a-button @click="goBack" type="link">
                返回上一页
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </div>
    <div class="article-right">
    </div>

  </div>
</template>

<script>
  /**
   * 详情页面待开发
   * 侧边导航 需要整理成对应的数据格式
   *
   */
import {isNullCheck} from '@/utils/utils'
import {getArticleById} from '@/config/request/requestUrl'

import {wuComment,wuSideNavigation,wuDetailsContent} from '@/components/utils'
export default {
  name: "articleDetails",
  data(){
      return {
        articleInfo:{},//文章信息
        isCloseInit:false,//是否结束初始化请求了
      }
  },
  async mounted() {
   await this.init();
  },
  methods:{
    goBack(){
      this.$router.back();
    },
    init(){
      if (this.$route.query.article_id) {
        this.$https.post(getArticleById,{article_id:this.$route.query.article_id}).then(({code,data})=>{
          this.isCloseInit=true;
          if (code == 200) {
            if(isNullCheck(data.article_info)){
              this.articleInfo=data.article_info;
              this.articleInfo.article_html=unescape(this.articleInfo.article_html);
              this.articleInfo.article_json=JSON.parse(unescape(this.articleInfo.article_json));
              this.$nextTick(()=>{
                this.$refs.sideNavigationRef.init();
              })
            }
          }
        }).catch(()=>{
          this.isCloseInit=true;
        })
      }
    }
  },
  components:{
    wuComment,
    wuSideNavigation,
    wuDetailsContent
  }
}
</script>

<style scoped lang="less">
  .article{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
  }
  .article-details{
    flex:3;
    width: 700px;
    padding: 1rem 1rem 20px 1rem;
    background-color: @theme-bubble-bg-color;
    word-break: break-all;
    display: inline-block;
    border-radius: @theme-boder-radius-width;
  }
  .article-navigation{
    flex:2;
  }
  .article-right{
    flex:2;
  }
  .data-show{
    padding: 1rem;
  }
  .article-comment{
    padding: 1rem;
  }
  /deep/div.code-toolbar > .toolbar{
    opacity:1;
  }
  /deep/div.code-toolbar > .toolbar > .toolbar-item{
    margin: 0px 0.4rem;
    cursor: pointer;
    span{
      cursor: pointer;
    }
  }
  /deep/div.code-toolbar > .toolbar > .toolbar-item > span:hover{
    color: #bbb;
  }
  /deep/div.code-toolbar > .toolbar > .toolbar-item > button:hover{
    color: #bbb;
  }
  /deep/table,/deep/table tr th, /deep/table tr td { border:1px solid @theme-boder-color; }
  /deep/table{
    border:1px solid @theme-boder-color;
    border-radius: @theme-boder-radius-width;
    text-align: center;
    border-collapse: collapse;
    margin: 10px 0px;
  }
  /deep/table tr th{
    background-color: @theme-disabled-color;
  }
  /deep/table tr th,/deep/table td{
    padding: 10px 0px;
    font-weight: 600;
  }

  /deep/.post-meta-item-text,/deep/.leancloud-visitors-count{
    color: @theme-font-2-color;
  }
  /deep/.ant-popover-inner-content{
    padding: 2px 16px !important;
  }
  /deep/img{
    border-radius: @theme-boder-radius-width;
  }

  @media screen and (max-width: 960px) {
    .article{
      margin:0  0.5rem 0.5rem 0.5rem;
      justify-content:center;
    }
    .article-navigation{
      display: none;
    }
    .article-details{
      width: auto;
      min-height: 600px;
      padding: 0px;
    }
    .not-data{
      width: 95vw;
    }
  }
</style>
