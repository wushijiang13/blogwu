<template>
  <div class="index">
    <el-backtop :bottom="100">
    </el-backtop>
    <div class="above">
      <!--主要的-->
      <div class="above_main">
        <div class="item_article mute-item" v-for=" n in 20">
          <p class="meta-list">
            <span class="mute-state">系列</span>-
            <span class="mute-noactive">前端攻城狮-阿江</span>-
            <span class="mute-noactive">6小时前</span>-
            <span class="mute-noactive">javaScript</span>
          <p class="meta-title">v-if和v-show的区别你真的知道吗？</p>
          <div class="">
            <p class="mute-giveup">
              <span class="iconfont icon-style icon-dianzan" ref="dianzan" @click="clickgiveup">123</span>
              <span class="iconfont icon-style icon-pinglun1"><span class="icons-text">123</span></span>
            </p>
          </div>
          <img
            src="https://user-gold-cdn.xitu.io/2020/6/2/172739afbfc76121?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1"
            class="mute-img" alt="缩略图">
        </div>
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
        }
      }
    },
    methods: {
      clickgiveup() {
        this.$refs.dianzan.style.color = "#67C23A";
      }
    },
    computed: {},

  }
</script>

<style scoped>
  .index {
    width: 980px;
    height: 1000px;
    margin: 1rem auto;
  }

  last-child {
    margin-bottom: 0;
  }

  .above {
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

  .item_article {
    height: 5.5rem;
    padding: 0.5rem 0.5rem;
  }

  .mute-item {
    color: #909399;
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #EBEEF5;
  }

  .meta-list {
    font-size: 0.5rem;
  }

  .mute-state {
    color: #6aff55;
  }

  .mute-noactive:hover {
    color: #409EFF;
  }

  .meta-title {
    width: 80%;
    font-size: 1rem;
    font-weight: 600;
    color: #000;
    margin-top: 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .meta-title:hover {
    text-decoration: underline;
  }

  .mute-giveup {
    height: 1.3rem;
    margin-top: 0.6rem;
    font-size: 0;
  }

  .icon-style {
    font-size: 0.8rem;
    color: #DCDFE6;
    font-weight: 600;
    padding: 0.3rem 0.4rem;
    border: 1px solid #EBEEF5;
    display: inline-block;
  }

  .mute-img {
    position: absolute;
    width: 4rem;
    height: 4rem;
    top: 1.4rem;
    right: 1rem;

  }

  .icons-text {
    font-size: 0.8rem;
    color: #DCDFE6;
    font-weight: 600;
  }

  .icon-pinglun1 {
    font-size: 0.9rem;
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
