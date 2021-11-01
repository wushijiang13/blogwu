<template>
    <span class="wu-img">
        <img :src="url"/>
    </span>
</template>

<script>
    export default {
        name: "wu-img",
        props:{
          'params':{
            default:()=>{},
            type:()=>Object
          }
        },
        data(){
          return {
            url:"",
          }
        },
        methods:{
          init(){
            if(this.params.attrs && this.params.attrs.length){
                this.url=this.params.attrs[0].value;
            }
          }
        },
        watch:{
          'params':{
            handler(newValue){
              if (newValue && Object.keys(newValue).length) {
                this.init();
              }
            },
            deep:true,
            immediate: true,
          }
        }
    }
</script>

<style lang="less" scoped>
  img{
    width: 100%;
    border-radius: @theme-boder-radius-width;
  }
</style>
