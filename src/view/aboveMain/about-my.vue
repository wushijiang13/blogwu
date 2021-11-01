<!--关于我-->
<template>
  <div class="aboutmy">
    <p class="title">我是谁：</p>
    <p>
      <vue-typed-js :strings="introduction">
        <span class="typing"></span>
      </vue-typed-js>
    </p>
  </div>
</template>

<script>

  export default {
    name: "aboutmy",
    data(){
         return {
           introduction:[
             '一个人知道自己为什么而活，就可以忍受任何一种生活,学习如同逆水行舟，不进则退。欢迎大家来到我的博客。在这里我会陆续上传我的学习过的知识点一方面是为了分享知识，一方面是加深知识点记忆，希望大家可以共同进步(〃\'▽\'〃)!',
           ]
         }
    },
    methods:{

    },
  }
</script>

<style scoped>
  .aboutmy{
    width: 90%;
    height: 200px;
    background: #fff;
    margin: 0px auto;
    margin-top: 1rem;
  }
  .aboutmy p{
    padding: 1rem 1rem 0rem;
  }
  .aboutmy>.title{
    font-size: 1.2rem;
  }
</style>
