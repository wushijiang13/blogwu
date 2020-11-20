<template>
  <div class="index">
    <a-back-top />
    <div class="above">
      <!--主要的-->
      <div class="above_main">
        <cellItem v-for="(item,index) in articleList" :key="index" :info="item"></cellItem>
      </div>
      <!--次要的-->
      <div class="above_secondary">
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

  export default {
    name: "index",
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: true,
          // Some Swiper option/callback...
        },


        articleList:[
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
          {typeName:"系列",position:"前端攻城狮",nickName:"阿江",articleType:"javaScript",titles:"v-if和v-show的区别你真的知道吗？",likeNum:"123",commentNum:"123"},
        ]
      }
    },
    methods: {

    },
    components: {
      cellItem,
    },

  }
</script>

<style scoped>
  .index {
    width: 980px;
    margin: 1rem auto;
  }

  last-child {
    margin-bottom: 0;
  }


  .above_main {
    width: 44rem;
    background-color: #fff;
    display: inline-block;
  }

  .above_secondary {
    width: 16rem;
    height: 200px;
    display: inline-block;
    vertical-align: top;
    float: right;
    position: sticky;
    top: 4rem;
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
</style>
