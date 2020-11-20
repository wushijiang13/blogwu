<template>
  <div class="head">
    <div class="navbar">
      <span class="title" @click="gohome()"><span class="xing">Wu</span>的个人博客</span>
      <div class="navlink">
        <ul>
          <li>
            <a-input-search placeholder="搜索一下吧~" style="width: 200px" @search="onSearch" />
          </li>
          <li class="mouseIcon">写文章</li>
          <li class="mouseIcon">文章</li>
          <li class="mouseIcon">分类</li>
          <li class="mouseIcon" @click="goaboutMy()">关于我<a-icon type="qrcode"/></li>
          <li class="mouseIcon" @click="gogitHub()"><a-icon type="github" class="iconBig"/></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Head",
    methods:{
      goaboutMy(){
        this.$router.push('/aboutMy');
      },
      gohome(){
        this.$router.push("/");
      },
      onSearch(){

      },
      gogitHub(){
        window.open("https://github.com/wushijiang13")
      },
    }
  }
</script>

<style scoped>
  .head {
    width: 100%;
    border-bottom: 1px solid #DCDFE6;
    background-color: #fff;
    position: sticky;
    top: 0rem;
    z-index: 10;
  }

  .navbar {
    min-width: 980px;
    margin: 0px auto;
    height: 100%;
    padding: 0.5rem 2rem;
  }

  .xing, .title {
    display: inline-block;
    cursor: pointer;
  }

  .xing {
    width: 40px;
    transition: 1s;
    font-size: 22px;
  }

  .xing:hover {
    width: 60px;
  }

  .title {
    color: #303133;
    font-size: 22px;
  }

  .navlink {
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    right: 2rem;
    text-align: center;
  }
  .navlink ul{
    font-size: 0;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
  }
  .navlink li {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0rem 0.8rem;
  }
  .icon-color{
    color: #909399;
  }
  .iconBig{
    font-size: 1.4rem;
  }
  .mouseIcon{
    cursor: pointer;
  }
</style>
