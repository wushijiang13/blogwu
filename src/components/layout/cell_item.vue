<template>
  <div>
    <div class="item_article mute-item" >
      <a-skeleton active v-show="info == ''" :paragraph="{ rows: 2 ,width :[500,200]}"/>
      <div class="mute-item-div" v-show="info != ''">
        <p class="meta-list">
          <span :class="info.article_type == 0 ? 'mute-single' : 'mute-state' ">{{info.article_type == 0 ? "单文" : "系列"}}</span>-
          <span class="mute-noactive">{{info.user_position}}-{{info.user_name}}</span>-
          <span class="mute-noactive">{{info.article_time}}</span>-
          <span class="mute-noactive">{{info.article_types_name}}</span>
        <p class="meta-title">{{info.article_title}}</p>
        <div>
          <p class="mute-giveup">
            <span class="iconfont icon-style" ref="dianzan" @click="clickgiveup"><a-icon type="like" class="icons-text"/>{{info.article_like}}</span>
            <span class="iconfont icon-style "><a-icon type="message" class="icons-text"/>{{info.article_comments}}</span>
          </p>
        </div>
      </div>
      <div class="mute-item-img" v-show="info != ''">
        <img
          src="https://user-gold-cdn.xitu.io/2020/6/2/172739afbfc76121?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1"
          class="mute-img" alt="缩略图"/>
      </div>
    </div>
    <slot name="dividers"></slot>
  </div>
</template>

<script>
export default {
  name: "cell-item",
  props:[
    'info'
  ],
  methods:{
    clickgiveup() {
      this.$refs.dianzan.style.color = "#67C23A";
    },
  }
}
</script>

<style scoped>
.item_article {
  padding: 1rem;
}

.mute-item {
  color: #909399;
  cursor: pointer;
  position: relative;
  font-size: 0px;
}
.mute-item-div{
  width: 80%;
  display: inline-block;
}
.mute-item-img{
  width: 20%;
  display: inline-block;
}
.meta-list {
  font-size: 0.5rem;
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
  vertical-align: top;
}

.mute-img {
  position: absolute;
  width: 4rem;
  height: 4rem;
  top: 1.4rem;
  right: 1rem;

}
.icons-text {
  margin-right: .6rem;
}

</style>
