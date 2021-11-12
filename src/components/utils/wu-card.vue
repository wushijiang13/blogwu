<template>
    <div class="wu-card" @click="goHref">
        <div class="care-top">
            <wu-icon  :type="icon"  :size="18"/>
            <span class="title">{{title}}</span>
        </div>
        <div class="care-bottom">
            {{content}}
        </div>
    </div>
</template>

<script>
    import wuIcon from './wu-icon'
    export default {
        name: "wu-card",
        props:[
            'icon',
            'title',
            'content',
            'hrefs'
        ],
        methods:{
          goHref(){
              if (this.hrefs) {
                  window.open(this.hrefs);
              }
          }
        },
        components:{
            wuIcon,
        }
    }
</script>

<style lang="less" scoped>
    .wu-card{
        width: 100%;
        background-color:@theme-bubble-bg-color;
        color:@theme-font-1-color;
        border-radius: @theme-boder-radius-width;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #333333;
        padding: 10px;
        cursor: pointer;
        font-weight: 600;
    }
    .care-top{
        font-size: @theme-secondary-size;
        .title{
            margin-left: 10px;
            text-align: center;
            display: inline-block;
            line-height: 30px;
        }
    }
    .care-main{
        font-size: @theme-secondary-size;
    }
    .care-bottom{
        font-size: @theme-secondary-size;
    }
</style>