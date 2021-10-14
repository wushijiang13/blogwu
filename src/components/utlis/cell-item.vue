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
        <div>
          <p class="mute-giveup">
            <span class="iconfont icon-style" ref="dianzan" @click="clickgiveup">
              <wuButton>
                <template slot="btn-icon">
                  <wu-icon type="icon-dianzan"  :size="14"/>
                </template>
                <template slot="btn-text">
                  赞
                </template>
                <template slot="btn-num">
                  {{info.article_like}}
                </template>
              </wuButton>
            </span>
          </p>
        </div>
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
  import wuButton from "./wu-button"
export default {
  name: "cell-item",
  props:[
    'info'
  ],
  methods:{
    clickgiveup() {
      this.$refs.dianzan.style.color = "#67C23A";
    },
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
  components:{
    wuButton,
  }
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

.meta-title {
  font-size: 1rem;
  font-weight: 600;
  color: @theme-font-1-color;
  margin-top: 0.5rem;
  padding-right: 0.4rem;
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
