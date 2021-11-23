<template>
  <div class="details-content">
    <a-popover placement="bottomLeft">
      <template slot="content">
        <p>{{getConversionTime(articleInfo.article_time)}}</p>
      </template>
      <template slot="title">
        <span>{{articleInfo.article_technology_type}}-{{articleInfo.nick_name}}-{{articleInfo.article_types_name}}</span>
      </template>
      <div class="article-title">{{articleInfo.article_title}}</div>
    </a-popover>
    <p v-if=" type=='look' " :id="articleInfo.article_title" class="leancloud_visitors" data-flag-title="Your Article Title">
      <em class="post-meta-item-text">阅读量 </em>
      <i class="leancloud-visitors-count"></i>
    </p>
    <div v-show="articleInfo.article_cover" class="article-cover" >
      <img :src="articleInfo.article_cover">
    </div>
    <div class="render-content"  v-html="articleInfo.article_html">
    </div>
  </div>
</template>

<script>
    import {getConversionTime} from '@utils/utils'
    import Prism from 'prismjs';

    export default {
        name: "details-content",
        props:{
          articleInfo:{
            default:function () {
              return {};
            },
            type:Object
          },
          type:{
            default:function () {
              return "look";
            },
            type:String,
          }
        },
        methods:{
          getConversionTime(article_time){
            return getConversionTime(article_time)
          },
          initLineNumber(){
            document.querySelectorAll("pre").forEach(item=>{
              item.className+='line-numbers';
            })
          }
       },
      watch:{
        'articleInfo.article_html'(){
          if (this.articleInfo.article_html) {
            this.$nextTick(()=>{
              this.initLineNumber();
              Prism.highlightAll();
            })
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .details-content{
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
  /deep/.article-content,.render-content{
    margin: 1rem 0px;
    font-size: 14px;
    color: @theme-font-1-color !important;
  }
  .article-cover{
    width: 100%;
    height: 380px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-top: 0.8rem;
    border-radius: @theme-boder-radius-width;
  }
  .article-cover img{
    width: 100%;
  }
  .not-data{
    color: @theme-font-1-color;
  }
  .details-content pre{
    border-radius: @theme-boder-radius-width;
    margin-top: 10px;
    width: 100%;
  }
  /deep/img{
    border-radius: @theme-boder-radius-width;
    margin-top: 10px;
    width: 100%;
  }
  /deep/pre{
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .details-content pre > code {
    padding: 16px;
    font-size: 13px;
    user-select: text;
  }
  p{
    margin: 10px 0px;
  }
  hr{
    margin: 10px 0px;
  }
  a{
    color: @primary-color;
  }
  /deep/h1, /deep/h2, /deep/h3, /deep/h4, /deep/h5, /deep/h6{
    color: @theme-font-1-color;
  }
  @media screen and (max-width: 960px) {
    .article-cover{
      height: 174px;
    }
    /deep/pre{
      width: 87vw;
    }
  }
</style>
