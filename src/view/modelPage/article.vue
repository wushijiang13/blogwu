<!--文章页面-->
<template>
  <div class="article">
    <div class="article-details">
      <a-popover placement="bottomLeft">
        <template slot="content">
          <p>{{articleInfo.article_time}}</p>
        </template>
        <template slot="title">
          <span>{{articleInfo.user_name}}-{{articleInfo.user_position}}-{{articleInfo.article_types_name}}</span>
        </template>
        <div class="article-title">{{articleInfo.article_title}}</div>
      </a-popover>
      <div class="article-content" v-html="articleInfo.article_html">
      </div>
    </div>
    <div class="not-data" v-if="!articleInfo">
      <a-result status="404" title="404" sub-title="抱歉，页面走丢了。。">
        <template #extra>
          <a-button @click="goBack" type="link">
           返回上一页
          </a-button>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script>
import {isNullCheck,base64De} from '../../utils/utils'
export default {
  name: "articles",
  data(){
      return {
        articleInfo:'',//文章信息
      }
  },
  created() {
    if(isNullCheck(this.$route.query.articleInfo)){
      this.articleInfo=base64De(this.$route.query.articleInfo);
    }
    console.log(this.articleInfo);
  },
  methods:{
    goBack(){
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .article{
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .article-details{
    width: 95%;
    padding: 20px;
    background-color: #fff;
    min-height: 300px;
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
</style>
