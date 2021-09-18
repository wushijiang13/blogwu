<template>
    <div class="article_Details">
      <div class="article_mian">
        <p class="ar_title">v-if和v-show的区别？</p>
        <p class="ar_info"><span>Mr.wu</span><span></span></p>
      </div>
      <div class="article_right">

      </div>
    </div>
</template>

<script>
    export default {
        name: "article_Details"
    }
</script>

<style scoped>
  .article_Details{
    width: 980px;
    margin-top: 1rem;
  }
  .article_mian{
    width: 44rem;
    background-color: #fff;
    height: 300px;
    display: inline-block;
  }
  .article_right{
    width: 16rem;
    height: 200px;
    display: inline-block;
    background-color: #fff;
    float: right;
  }
  .ar_title{
    padding: 1rem 0rem 0rem 0rem ;
    font-size: 1.2rem;
    text-align: center;
  }
  .ar_info{
    font-size: 1rem;
  }
</style>
