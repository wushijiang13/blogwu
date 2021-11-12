<template>
  <div id="app">
    <loading />
    <router-view />
  </div>
</template>

<script>
  import loading from '@/components/utils/loading.vue'
  export default {
    name: 'App',
    components:{
      loading
    }
  }
</script>

<style lang="less">
  *{
    margin: 0px;
    padding: 0px;
  }
  body{
    background-color: @body-bg-color !important;
    scroll-behavior: smooth;
  }
  html{
    scroll-behavior: smooth;
  }
  p{
    margin: 0px;
  }
</style>
