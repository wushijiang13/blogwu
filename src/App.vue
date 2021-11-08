<template>
  <div id="app">
    <loading />
    <router-view />
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
  }
  body{
    background-color: @body-bg-color !important;
  }
  p{
    margin: 0px;
  }
</style>
