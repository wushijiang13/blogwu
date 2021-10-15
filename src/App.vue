<template>
  <div id="app">
    <router-view />
    <loading />
  </div>
</template>

<script>

  import loading from '@/components/utlis/loading.vue'
export default {
  name: 'App',
  components:{
    loading
  }
}
</script>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  body{
    background-color: @body-bg-color;
  }
  p{
    margin: 0px;
  }
  .ant-divider-horizontal{
    margin: 0;
    width: 98%;
    min-width: 98%;
    margin: 0px auto;
  }
</style>
