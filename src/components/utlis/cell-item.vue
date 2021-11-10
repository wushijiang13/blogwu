<template>
  <div>
    <div class="item_article mute-item" >
      <a-skeleton active v-show="info == ''" :paragraph="{ rows: 2 ,width :[500,200]}"/>
      <div class="mute-item-div" v-show="info != ''">
        <p class="meta-list">
          <span :class="info.article_type == 0 ? 'mute-single' : 'mute-state' ">{{info.article_technology_type}}</span>-
          <span class="mute-noactive">{{info.nick_name}}</span>-
          <span class="mute-noactive">{{getConversionTime(info.article_time)}}</span>-
          <span class="mute-noactive">{{info.article_types_name}}</span>
        </p>
        <p class="meta-title" @click="goArticle(info)">{{info.article_title}}</p>
        <a-tooltip placement="bottomLeft">
          <template slot="title">
            <span> {{info.article_desc}}</span>
          </template>
          <p class="meta-desc">
              {{info.article_desc}}
          </p>
        </a-tooltip>
      </div>
      <div class="mute-item-img"  v-if="info.article_cover">
        <img
          :src="info.article_cover"
          class="mute-img" alt="缩略图"/>
      </div>
    </div>
    <slot name="dividers"></slot>
  </div>
</template>

<script>
  import {getConversionTime} from "../../utils/utils";
export default {
  name: "cell-item",
  props:[
    'info'
  ],
  methods:{
    getConversionTime(article_time){
      return  getConversionTime(article_time)
    },
    /***
     * 前往文章页面
     * @param articleId 文章id
     */
    goArticle(articleInfo) {
      this.$router.push({
        path: '/details',
        query: {
          article_id: articleInfo.article_id,
        }
      });
    },
  },
}
</script>

<style scoped lang="less">
.item_article {
  padding: 1rem;
}

.mute-item{
  color:@theme-font-2-color;
  background-color: @theme-bubble-bg-color;
  cursor: pointer;
  position: relative;
  font-size: 0px;
  display: flex;
  border-radius:@theme-boder-radius-width;
  margin-bottom: 10px;
}

.mute-item-div{
  flex: 5;
  display: inline-block;
  overflow: hidden;
}
.mute-item-img{
  flex: 2;
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-radius:@theme-boder-radius-width;
}
.meta-list {
  font-size: 0.5rem;
}

.mute-noactive:hover {
  color: @primary-color;
}
p{
  margin: 0px;
  padding: 0px !important;
}
.meta-title {
  font-size: @theme-title-size;
  font-weight: 600;
  color: @theme-font-1-color;
  margin: 0.5rem 0px;
  padding-right: 0.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.meta-title:hover {
  text-decoration: underline;
}
.meta-desc{
  height: 34px;
  font-size: @theme-unimportant-size;
  color: @theme-font-3-color;
  padding-right: 0.4rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; //这里是在第二行有省略号
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*overflow: hidden;*/
}

.mute-giveup {
  margin-top: 0.6rem;
  font-size: 0;
}

.icon-style {
  font-size: 0.8rem;
  color: @theme-font-2-color;
  font-weight: 600;
  margin-right: 10px;
 /* border: 1px solid @theme-boder-color;
  border-radius:@theme-boder-radius-width;*/
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mute-img {
  height: 5.3rem;
}
</style>
