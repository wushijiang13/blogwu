<template>
      <WuIcon :type="type"
              :style="{fontSize:size+'px',color}"
              :class="themeDis ? 'icon icon-theme' : 'icon' "/>
</template>

<script>
    import {Icon} from 'ant-design-vue'
    const WuIcon = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_2835719_rii6npab6i.js', // 在 iconfont.cn 上生成
    });
    export default {
        name: "wu-icon",
        components:{
          WuIcon
        },
        props:{
          type:{
            default:"",
            type:String
          },
          size:{
            default:22,
            type:Number
          },
          color:{
            default:'',
            type:String
          },
          themeDis:{
            default:true,
            type:Boolean
          }
        }
    }
</script>

<style scoped lang="less">
  .icon{
    vertical-align: text-top;
  }
  .icon-theme{
    color:@theme-font-1-color;
  }
  .ant-menu-item .anticon{
    margin: 0;
  }
</style>
