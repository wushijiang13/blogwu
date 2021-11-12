<template>
  <div :id="queryId">

  </div>
</template>

<script>
  import 'gitalk/dist/gitalk.css'
  import Gitalk from 'gitalk'
  export default {
    name: "wu-comment",
    data(){
      return{
        isInit:false,//是否已经初始化了
      }
    },
    props:{
      queryId:{
        default:"gitalk-container",
        type:String,
      },
      title:{
        default:"default",
        type:String,
      },
      serial:{
        default:"",
        type:String,
      }
    },
    methods:{
      /**
       * 初始化gitalk 评论
       */
      initGitAlk(){
        var gitalk = new Gitalk({
          clientID: 'c37a93c69f65ed9b31da',
          clientSecret: '11ebc353cd2598db899c2ccebec19bdb263ca8a0',
          repo: 'blogwu-gitalk',
          owner: 'wushijiang13',
          admin: ['wushijiang13'],
          title: this.title,
          id:this.serial,  // Ensure uniqueness and length less than 50
          distractionFreeMode: false  // Facebook-like distraction free mode
        })
        gitalk.render(this.queryId)
        this.isInit=true;
      },
    },
    watch:{
      'title'(){
        if (this.title) {
          this.initGitAlk();
        }
      },
      'queryId'(){
        this.initGitAlk();
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/.gt-container{
    color:@theme-font-1-color !important;
    padding-bottom: 1rem;
  }
  /deep/.gt-container .gt-meta{
    margin-top: 0px;
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

</style>
