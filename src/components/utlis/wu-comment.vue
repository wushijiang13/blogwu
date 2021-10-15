<template>
  <div id="gitalk-container">

  </div>
</template>

<script>
  import 'gitalk/dist/gitalk.css'
  import Gitalk from 'gitalk'
    export default {
        name: "wu-comment",
        props:{
          title:{
            default:"",
            type:String,
          },
          serial:{
            default:0,
            type:Number,
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
              id:this.serial+"wu",  // Ensure uniqueness and length less than 50
              distractionFreeMode: false  // Facebook-like distraction free mode
            })
            gitalk.render('gitalk-container')
          },
        },
      watch:{
          'title'(){
            if (this.title) {
              this.initGitAlk();
            }
          }
      }
    }
</script>

<style scoped>

</style>
