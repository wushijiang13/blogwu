<!--关于我-->
<template>
  <div class="aboutmy">
    <p class="title">作者是谁：</p>
    <p>作者是阿江，一个前端3年开发经验的攻城狮。做出本项目主要是记录自己的一些知识点，并且练习自己对整体框架的架构以及掌握</p>
  </div>
</template>

<script>
  export default {
    name: "aboutmy",
    data(){
         return {

         }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .aboutmy{
    width: 980px;
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
