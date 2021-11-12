<!--扩展-->
<template>
    <div class="expand">
      <div class="expand-head">
        <div class="expand-head-left">
          <slot name="expand-head-left">
            {{title}}
          </slot>
        </div>
        <div class="expand-head-right">
          <slot name="expand-head-right">
            <a-button shape="circle" ghost @click="comment('commitRef'+currentId)">
              <wu-icon  :type="iconHeadComment"  :size="18"/>
            </a-button>
            <a-button v-if="isShowUnfold" shape="circle" ghost @click="unfoldPutAway">
              <wu-icon  :type="iconHeadUnfold"  :size="18"/>
            </a-button>
          </slot>
        </div>
      </div>
      <div class="expand-main">
        <div class="expand-main"  :style="{height:limitHeight}">
          <div ref="expanMain">
            <slot name="expand-main">

            </slot>
          </div>
        </div>
      </div>
      <div class="expand-bottom" >
        <div class="expand-bottom">
          <slot name="expand-bottom">
            <div  class="expand-bottom-box">
              <div v-if="isShowUnfold" @click="unfoldPutAway">
                 <span class="expand-bottom-text">
                  {{tipsUnfold}}
                 </span>
                <wu-icon style="vertical-align: baseline;" :type="iconUnfold"  :size="10"/>
              </div>
            </div>
            <transition name="unfold">
              <div class="expand-bottom-comment-box" v-show="isComment">
                <comment :queryId="'expand'+currentId" :placeholder="'对文档有什么想说的？'" :path="title" :ref="'commitRef'+currentId" />
              </div>
            </transition>
          </slot>
        </div>
      </div>
    </div>
</template>

<script>
    import comment from './wu-comment'
    export default {
        name: "wu-expand",
        props:{
          currentId:{
            type:Number,
            default:0,
          },
          title:{
            type:String,
            default:"",
          },
          height:{
            type:String,
            default:"95px",
          }
        },
        data(){
          return{
            limitHeight:"95px",
            isUnfold:false,//是否展开
            iconUnfold:"icon-xiala",
            iconHeadUnfold:"icon-zhanshi",
            isComment:false,
            iconHeadComment:"icon-open-pinglun",
            tipsUnfold:"展开",
            isShowUnfold:false,//是否显示展开
          }
        },
        components:{
          comment,
        },
        methods:{
          /**
           * 展开或收起
           */
          unfoldPutAway(){
            this.isUnfold = !this.isUnfold;
            this.iconUnfold=this.isUnfold ?  "icon-shouhui" : "icon-xiala";
            this.iconHeadUnfold=this.isUnfold ?  "icon-shouqi" : "icon-zhanshi";
            this.tipsUnfold=this.isUnfold ?  "收起" : "展开";
            this.limitHeight=this.isUnfold ?  this.$refs.expanMain.scrollHeight+"px" : this.height;
          },
          /**
           * 展开评论
           */
          comment(){
            this.isComment= !this.isComment;
            this.iconHeadComment=this.isComment ? 'icon-close-pinglun' : 'icon-open-pinglun';
            let commitRef=this.$refs['commitRef' + this.currentId];
            if (!commitRef.isInit && this.isComment) {
              commitRef.initValine();
            }
          },
          init(){
            this.isShowUnfold =
              parseInt(this.height) <  this.$refs.expanMain.scrollHeight ?
                true : false; //是否满足需展开条件
            if (!this.isShowUnfold) { //如果不满足的话 让高度变成自适应
              this.limitHeight='auto';
            }
          }
        },
        mounted() {
          this.init();
        }
    }
</script>

<style lang="less" scoped>
  .expand{
    width: 100%;
    padding: .6rem 1rem;
    background-color: @theme-bubble-bg-color;
    border-radius: @theme-boder-radius-width;
    color: @theme-font-1-color;
    overflow: hidden;
  }
  .expand-head{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .expand-head-left{
    font-size: @theme-emphasize-size;
    font-weight: 600;
  }
  .expand-head-right i{
    cursor: pointer;
  }
  .expand-main{
    margin-top: 0.4rem;
    width: 100%;
    transition: .4s ease-in-out;
    overflow: hidden;
  }
  .expand-bottom{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .expand-bottom-box{
    cursor: pointer;
  }
  .expand-bottom-comment-box{
    margin-top: 10px;
    width: 100%;
  }
  .unfold-enter-active,.unfold-enter{
    max-height: 20px;
    transition: .4s ease-in-out;
  }
  .unfold-enter-to{
    max-height: 400px;
  }
  .unfold-leave-active{
    max-height: 400px;
    transition: .4s ease-in-out;
  }
  .unfold-leave-to{
    max-height: 20px;
  }
  .expand-bottom-text:hover{
    text-decoration: underline;
  }
  .expand-bottom-text{
    display: inline-block;
    margin-right: 5px;
  }
  @media screen and (max-width: 960px) {
    .expand{
      width: 95%;
      padding: .6rem 1rem;
    }
  }
</style>
