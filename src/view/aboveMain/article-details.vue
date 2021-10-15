<!--文章页面-->
<template>
  <div class="article">
    <div class="article-details">
      <div class="data-show">
        <a-popover placement="bottomLeft">
          <template slot="content">
            <p>{{getConversionTime(articleInfo.article_time)}}</p>
          </template>
          <template slot="title">
            <span>{{articleInfo.article_technology_type}}-{{articleInfo.nick_name}}-{{articleInfo.article_types_name}}</span>
          </template>
          <div class="article-title">{{articleInfo.article_title}}</div>
        </a-popover>
        <div class="article-cover" v-show="articleInfo.article_cover" :style="{'background-image':'url('+articleInfo.article_cover+')'}" />
        <div class="article-content" v-html="articleInfo.article_html"/>
      </div>
      <div class="article-right">
        <ul>
          <li>

          </li>
        </ul>
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
      <comment :title="articleInfo.article_title" :serial="articleInfo.article_id"/>
    </div>
  </div>
</template>

<script>
import {isNullCheck,getConversionTime} from '@/utils/utils'
import {getArticleById} from '@/config/request/requestUrl'
import comment from '@/components/utlis/wu-comment'
// import 'highlight.js/styles/base16/atelier-forest-light.css'
export default {
  name: "articleDetails",
  data(){
      return {
        articleInfo:'',//文章信息
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
    getConversionTime(article_time){
      return  getConversionTime(article_time)
    },
    init(){
      if (this.$route.query.article_id) {
        this.$https.post(getArticleById,{article_id:this.$route.query.article_id}).then(({code,data})=>{
          this.isCloseInit=true;
          if (code == 200) {
            if(isNullCheck(data.article_info)){
              this.articleInfo=data.article_info;
              this.articleInfo.article_html=unescape(this.articleInfo.article_html);
            }
          }
        })
          .catch(e=>{
          this.isCloseInit=true;
        })
      }
    }
  },
  components:{
    comment,
  }
}
</script>

<style scoped lang="less">
  .article{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .article-details{
    width: 700px;
    padding: 0.8rem;
    background-color: @theme-bubble-bg-color;
    word-break: break-all;
    display: inline-block;
    border-radius: @theme-boder-radius-width;
    padding-bottom: 20px;
  }
  .data-show{
    padding: 1rem;
  }
  .article-title{
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 1rem;
    color: @theme-font-1-color;
    display: inline-block;
    cursor: pointer;
  }
  .article-title:hover{
    text-decoration: underline;
  }
  /deep/.article-content{
    margin: 1rem 0px;
    font-size: 14px;
  }
  /deep/.article-content > *{
    color: @theme-font-1-color !important;
  }
  /deep/.article-content > pre > code {
    padding: 16px;
    font-size: 13px;
    margin-top: 10px;
    user-select: text;
  }
  /deep/.article-content > p{
    margin: 10px 0px;
  }
  /deep/.article-content > p > img{
    width: 100%;
  }
  /deep/.article-content > hr{
    margin: 10px 0px;
  }
  /deep/.article-content > a{
    color: @primary-color;
  }

  .article-cover{
    width: 100%;
    height: 380px;
    background-size: 100%;
    background-position: center;
    background-repeat:no-repeat;
    margin-top: 0.8rem;
  }

  .article-cover img{
    width: 100%;
  }
  .not-data{
    color: @theme-font-1-color;
  }

  .article-right{

  }
  /deep/.gt-container{
    color:@theme-font-1-color !important;
    padding: 1rem;
  }
  /deep/.gt-container a{
    color:@primary-color !important;
  }
  /deep/.gt-container .gt-link{
    border-bottom: 1px dotted @primary-color !important;
  }
  /deep/.gt-container .gt-svg svg{
    fill:@primary-color !important;
  }
  /deep/.gt-container .gt-popup .gt-action.is--active:before{
    background-color: @primary-color !important;
  }
  /deep/.gt-container .gt-btn-public,/deep/.gt-container .gt-btn{
    border: 1px solid @primary-color;
    background-color: @primary-color;
    color:#fff;
  }
  /deep/.gt-container .gt-btn-preview{
    border: 1px solid @primary-color !important;
    background-color: #fff;
    color:@primary-color !important;
  }
  /deep/.gt-container .gt-header-textarea{
    color: #000;
  }

  @media screen and (max-width: 960px) {
    .article{
      margin: 0.5rem;
    }
    /deep/.article-content > pre{
      width: 87vw;
    }
    .article-details{
      width: auto;
      min-height: 600px;
      padding: 0px;
    }
    .not-data{
      width: 95vw;
    }
    .article-cover{
      height: 200px;
    }

  }
</style>
