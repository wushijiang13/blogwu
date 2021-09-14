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
        <div class="article-cover">
          <img :src="articleInfo.article_cover"/>
        </div>
        <div class="article-content" v-html="articleInfo.article_html">
        </div>
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
  </div>
</template>

<script>
import {isNullCheck,getConversionTime} from '../../utils/utils'
import {getArticleById} from '../../config/request/requestUrl'
export default {
  name: "articles",
  data(){
      return {
        articleInfo:'',//文章信息
        isCloseInit:false,//是否结束初始化请求了
      }
  },
  created() {
   this.init();
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
          if (code == 200) {
            if(isNullCheck(data.article_info)){
              this.isCloseInit=true;
              this.articleInfo=data.article_info;
              this.articleInfo.article_html=unescape(this.articleInfo.article_html);
            }
          }
        }).catch(e=>{
          this.isCloseInit=true;
        })
      }
    }
  }
}
</script>

<style scoped>
  .article{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .article-details{
    width: 95%;
    padding: 0.8rem;
    background-color: #fff;
    word-break: break-all;
    display: inline-block;
  }
  .article-title{
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 1rem;
    padding: 0px 0.6rem;
  }
  .article-title:hover{
    text-decoration: underline;
  }
  .article-content{
    margin: 1rem 0px;
    padding: 0px 0.6rem;
    font-size: 14px;
    color: #000;
  }
  .article-content >>> pre{
    padding: 16px;
    font-size: 13px;
    background-color: #f8f8f8;
    margin-top: 10px;
    user-select: text;
  }
  .article-content >>> p{
    margin: 10px 0px;
  }
  .article-content >>> hr{
    margin: 10px 0px;
  }
  .article-content >>> a{
    color: #00B7FF;
  }

  .article-cover{
    width: 100%;
    margin-top: 0.8rem;
  }

  .article-cover img{
    width: 100%;
  }

  @media screen and (max-width: 960px) {
    .article-content >>> pre{
      width: 85vw;
    }
    .article-details{
      min-width: 95vw;
    }
    .not-data{
      width: 95vw;
    }
  }
</style>
