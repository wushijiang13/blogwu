<template>
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
      京ICP备2020046294号-1 | Mr.Wu
    </div>
  </div>
</template>

<script>
export default {
  name: "notice",
}
</script>

<style scoped lang="less">
.above_secondary {
    width: 16rem;
    display: inline-block;
    vertical-align: top;
    float: right;
    position: fixed;
    top: 4rem;
    margin-left: 1rem;
}
.user-notice {
  background-color: @theme-bubble-bg-color;
  padding-bottom: 1rem;
}

.notice-title {
  height: 2.5rem;
  border-bottom: 1px solid @theme-boder-color;
  padding: 0rem 0.7rem;
  color: @theme-font-1-color;
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
  color: @theme-font-1-color;
  font-size: 0.6rem;
  line-height: 1.2rem;
}

.statement {
  text-align: center;
  font-size: 0.8rem;
  padding: 1rem 0rem;
  width: 100%;
  color: @theme-font-3-color;
}

@media screen and (max-width: 980px) {
  .above_secondary{
    display: none;
  }
}
</style>
