<template>
  <div class="index">
    <a-back-top />
    <div class="above">
      <!--主要的-->
      <div class="above-main">
        <cellItem v-for="(item,index) in articleList" :key="index" :info="item">
          <a-divider slot="dividers" v-if="(articleList.length-1) != index "/>
        </cellItem>
        <div class="not-list"  v-show="articleList.length == 0">
           <p class="not-title">
             数据库都查炸了╮(╯▽╰)╭<br/>
             都没有找到您想要的信息。。
           </p>
        </div>
      </div>
      <!--次要的-->
      <div class="above-secondary">
        <div class="user-notice">
          <p class="notice-title">公告
            <svg class="icon-star" aria-hidden="true">
              <use xlink:href="#icon-star"></use>
            </svg>
          </p>
          <p class="notice-mian">&nbsp;&nbsp;一个人知道自己为什么而活，就可以忍受任何一种生活。<br>
            &nbsp;&nbsp;学习如同逆水行舟，不进则退。欢迎大家来到我的博客。在这里我会陆续上传我的学习过的知识点一方面是为了分享知识，一方面是加深知识点记忆，希望大家可以共同进步(〃'▽'〃)!!!
          </p>
        </div>
        <div class="statement">
          麻省理工学院许可| 版权所有©2018-至今 Mr.Wu
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import cellItem from './public/cell-item'
  import {getArticleList} from '../request/requestUrl'
  import {getConversionTime} from '../utils/utils'
  import { mapState } from 'vuex';

  export default {
    name: "index",
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: true,
        },
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
      this.$asyncFunQueue.call(this,this.getArticleList);
    },
    methods: {
      /**
       * 获取文章推荐list
       */
      getArticleList(){
       return  new Promise((resolve)=>{
          this.$post(getArticleList,{page:1,limit:10}).then((res)=>{
            if(res.code == 0){
              if(res.data.length >= 1){
                let data =res.data.map(item=>{
                  if(item.article_time != undefined){
                    item.article_time=getConversionTime(item.article_time);
                  }
                  return item;
                });
                this.$store.dispatch("setAddArticleList",data).then(()=>{
                  resolve();
                });
              }
            }
          })
        })
      },
    },
  }
</script>

<style scoped>
  .index {
    margin: 1rem auto;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  last-child {
    margin-bottom: 0;
  }

  .above-main {
    width: 44rem;
    background-color: #fff;
    display: inline-block;
  }

  .above-secondary {
    width: 16rem;
    height: 200px;
    display: inline-block;
    vertical-align: top;
    float: right;
    position: sticky;
    top: 4rem;
    margin-left: 2rem;
  }
  .user-notice {
    background-color: #fff;
    padding-bottom: 1rem;
  }

  .notice-title {
    height: 2.5rem;
    border-bottom: 1px solid #EBEEF5;
    padding: 0rem 0.7rem;
    color: #000;
    line-height: 2.5rem;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .icon-star {
    width: 1rem;
    height: 1rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .notice-mian {
    padding: 0.4rem 0.9rem;
    color: #000;
    font-size: 0.6rem;
    line-height: 1.2rem;
  }
  .statement{
    text-align: center;
    font-size: 0.8rem;
    padding: 1rem 0rem;
    width: 100%;
    color: #606266;
  }
  .not-list{
  }
  .not-title{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 200px;
  }
  @media screen and (max-width: 980px) {
      .above-secondary{
        display: none;
      }
  }
</style>
