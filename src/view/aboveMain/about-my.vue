<!--关于我-->
<template>
  <div class="about-my">
    <div class="about-desc">
      <p class="title">我是谁：</p>
      <p>
        <vue-typed-js
                :strings="introduction"
                :typeSpeed="50">
          <span class="typing"></span>
        </vue-typed-js>
      </p>
      <p class="title">
        从哪里可以找我~
      </p>
      <p>当然在博客上留言是最好的,除了这里还有以下出没环境</p>
      <div class="card-box">
        <div class="card-item"
           v-for="item in contactList"
           :key="item.icon"
      >
        <wuCard
           :icon="item.icon"
           :title="item.title"
           :content="item.content"
           :hrefs="item.hrefs"
        />
      </div>
      </div>
      <p class="title">
       最最重要的是：
      </p>
      <p>推荐一下我自己搭建的脚手架：<b>Vue3-Vite-Cli</b>,基于vite为基础搭建的风格脚手架,现在也有两套项目模板，不管是入门vue3练手，还是项目改造都推荐大家尝试一下！</p>
      <p>并且我会及时去解决并更新issus，并且现在已经支持npm 下载安装，并且如果各位有好的模板推荐我也可以更新到我的脚手架模板里，这样你也可以一键下载你熟悉的项目模板。最后附上文档地址：
        <a href="https://wushijiang.cn/vue3-vite-cli/">文档地址</a>&nbsp;&nbsp;
        <a href="https://wushijiang.cn/vue3-vite-cli/">https://wushijiang.cn/vue3-vite-cli/</a>
      </p>
    </div>

    <div class="about-comment">
      <wuComment
        :path="'关于我'"
        :placeholder="'有什么想说的？'"
        ref="comment"
      />
    </div>
  </div>
</template>

<script>
  import {wuCard,wuComment} from '@/components/utils'
  export default {
    name: "aboutmy",
    data(){
         return {
           introduction:[
             `我是阿江，有点拖延症的我，终于上线了自己的博客！其实博客这个项目很早就创建了，期间一直做出来的效果不满意，一直在重构。换了很多组件最后基本上还是达不到我的预期，其中要自己设计页面效果,要如何如何布局，总之自己还是喜欢简洁风格。<br/>这点也算是我个人的风格，更希望大家注重在文章上。现在前后台开发差不多了，总算在拖了两年后的今天，上线了~ 后续会持续加入我喜欢的功能，并且做技术上的分享！<br/><b>一个高级前端或许应该思考一下，如何让初级前端发挥出中级前端效果。</b><br/>所以我想提升自己或许可以把自己总结的一些知识点分享出来这样也可以学习大家的只是或许提升更大！<br/>最后欢迎大家来到我的博客。在这里我会陆续上传我的学习过的知识点一方面是为了分享知识，一方面是加深知识点记忆，希望大家可以共同进步(〃'▽'〃)!欢迎在下留言哦~`,
           ],
           contactList:[
             {
               icon:'icon-weixin',
               title:'独奏宥',
               content:'微信号：LoseerX',
               hrefs:''
             },
             {
               icon:'icon-github',
               title:'Mr.吴先森',
               content:'id：wushijiang13',
               hrefs:'https://github.com/wushijiang13'
             },
             {
               icon:'icon-juejin',
               title:'JS心法',
               content:'id：JS心法',
               hrefs:'https://juejin.cn/user/2172290706442423'
             },
             {
               icon:'icon-bilibili',
               title:'独奏宥',
               content:'UID：33454876',
               hrefs:'https://space.bilibili.com/33454876/'
             },
           ],
         }
    },
    mounted() {
      let commitRef=this.$refs.comment;
      if (!commitRef.isInit) {
        commitRef.initValine();
      }
    },
    components:{
      wuCard,
      wuComment
    }
  }
</script>

<style lang="less" scoped>
  .about-my{
  }
  .about-desc{
    width: 100%;
    background-color: @theme-bubble-bg-color;
    border-radius: @theme-boder-radius-width;
    color:@theme-font-1-color;
    font-size: @theme-secondary-size;
    padding: 20px;
  }
  .title{
    position: relative;
    margin-left:14px;
    font-size: @theme-title-size;
  }
  .title::before{
    content: "";
    display: inline-block;
    position: absolute;
    width: 4px;
    top: 3px;
    left:-10px;
    height:  @theme-emphasize-size;
    background-color: @primary-color;
  }
  .card-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .card-item{
    width: 23%;
    display: inline-block;
  }
  .about-comment{
    background-color: @theme-bubble-bg-color;
    border-radius: @theme-boder-radius-width;
    margin-top: 20px;
  }
  @media screen and (max-width: 960px) {
    .about-my{
      width: 95%;
      margin: 0px auto;
      display: block;
    }
    .card-item{
      width: 100%;
      display: inline-block;
    }
    .card-box{
      flex-direction: column;
      height: 320px;
    }
    .about-desc,.about-comment{
      padding: 20px;
    }
  }
</style>
