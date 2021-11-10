<template>
      <div class="wu-icon">
            <WuIcon v-if="!type.includes('http')"
                    :type="type"
                    :style="{fontSize:size+'px',color}"
                    :class="themeDis ? 'icon icon-theme' : 'icon' "/>
            <img  v-else
                  :style="{width:'80px'}"
                  :src="type"/>
      </div>
</template>

<script>
    import {Icon} from 'ant-design-vue'
    const WuIcon = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_2835719_97cgxr3zum4.js', // 在 iconfont.cn 上生成
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
  .wu-icon{
    display: inline-block;
  }
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
