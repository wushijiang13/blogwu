<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      isMaster:false,
    }
  }
}
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  body{
    background-color: #f8f9fb;
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
