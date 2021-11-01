<template>
  <div :id="queryId">

  </div>
</template>

<script>
  import Valine from 'valine';
    export default {
        name: "wu-comment",
        data(){
          return{
            isInit:false,//是否已经初始化了
          }
        },
        props:{
          queryId:{
            default:"valine-default",
            type:String,
          },
          placeholder:{
            default:"小亮给他整个活！",
            type:String,
          },
          path:{
            default:"",
            type:String,
          }
        },
        methods:{
          /**
           * 初始化valine 评论
           */
          initValine(){
            new Valine({
              el:`#${this.queryId}`,
              appId:'nCs0aefGfbbCXa5psLwnW8NL-gzGzoHsz',
              appKey:'I0toIiyX54JTB5NUpXbkCDxQ',
              placeholder:this.placeholder,
              path:this.path,
              recordIP:true,
              enableQQ:true,
              avatar:'/mp/identicon/monsterid/wavatar/robohash/retro/hide',
              visitor: true
            })
            this.isInit=true;
          },
        },
      watch:{
          'path'(){
            if (this.path) {
              this.initValine();
            }
          },
          'queryId'(){
              this.initValine();
          }
      }
    }
</script>

<style lang="less" scoped>
  /deep/.vcount {
    color:@theme-font-1-color !important;
  }
  /deep/.vbtn:hover{
    color:@primary-color !important;
    border-color: @primary-color !important;
  }
  /deep/.vicon.actived{
    fill:@primary-color !important;
  }
</style>
