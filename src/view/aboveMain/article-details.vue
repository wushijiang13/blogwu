<!--文章页面-->
<template>
  <div class="article">
    <sideNavigation class="article-navigation" ref="sideNavigationRef" />
    <div class="article-details">
      <detailsContent :articleInfo="articleInfo"/>
      <div class="article-comment">
        <comment :path="articleInfo.article_title"  :placeholder="'看完文章了，有什么想说的？'" />
      </div>
      <div class="not-data">
        <div  v-show="!articleInfo && isCloseInit">
          <a-result status="404" title="404" sub-title="抱歉，页面走丢了。。">
            <template #extra>
              <a-button @click="goBack" type="link">
                返回上一页
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
    </div>
    <div class="article-right">
    </div>

  </div>
</template>

<script>
  /**
   * 详情页面待开发
   * 侧边导航 需要整理成对应的数据格式
   *
   */
import {isNullCheck} from '@/utils/utils'
import {getArticleById} from '@/config/request/requestUrl'
import comment from '@/components/utlis/wu-comment'
import sideNavigation from '@/components/utlis/side/wu-side-navigation'
import detailsContent from '@/components/details/details-content'
// import 'highlight.js/styles/base16/atelier-forest-light.css'
export default {
  name: "articleDetails",
  data(){
      return {
        articleInfo:{},//文章信息
        isCloseInit:false,//是否结束初始化请求了
      }
  },
  async mounted() {
   await this.init();
  },
  methods:{
    goBack(){
      this.$router.back();
    },
    init(){
      if (this.$route.query.article_id) {
        this.$https.post(getArticleById,{article_id:this.$route.query.article_id}).then(({code,data})=>{
          this.isCloseInit=true;
          if (code == 200) {
            if(isNullCheck(data.article_info)){
              this.articleInfo=data.article_info;
              this.articleInfo.article_html=unescape(this.articleInfo.article_html);
              this.articleInfo.article_json=JSON.parse(unescape(this.articleInfo.article_json));
              this.$nextTick(()=>{
                this.$refs.sideNavigationRef.init();
              })
            }
          }
        }).catch(()=>{
          this.isCloseInit=true;
        })
      }
    }
  },
  components:{
    comment,
    sideNavigation,
    detailsContent
  }
}
</script>

<style scoped lang="less">
  .article{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
  }
  .article-details{
    width: 700px;
    padding: 1rem;
    padding-bottom: 20px;
    background-color: @theme-bubble-bg-color;
    word-break: break-all;
    display: inline-block;
    border-radius: @theme-boder-radius-width;
  }
  .data-show{
    padding: 1rem;
  }
  .article-comment{
    padding: 1rem;
  }

  @media screen and (max-width: 960px) {
    .article{
      margin:0  0.5rem 0.5rem 0.5rem;
      justify-content:center;
    }
    .article-navigation{
      display: none;
    }
    .article-details{
      width: auto;
      min-height: 600px;
      padding: 0px;
    }
    .not-data{
      width: 95vw;
    }
  }
</style>
