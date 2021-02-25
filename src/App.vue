<template>
  <div id="app">
    <cmdOpen @closeCmd="closeCmd" v-show="isMaster"></cmdOpen>
    <heads class="head"></heads>
    <router-view style="margin-top: 70px"/>
  </div>
</template>

<script>
import heads from "./components/public/head";
import cmdOpen from './components/master/cmdOpen';
export default {
  name: 'App',
  data(){
    return{
      isMaster:false,
    }
  },
  components: {heads,cmdOpen},
  methods:{
    keyCodeForEvent(){
      let self = this;
      let cCode = false;
      let mCode = false;
      let dCode = false;
      document.onkeydown =((e)=>{
        let evn = e || event ;
        let key = evn.keyCode || evn.which || evn.charCode ;
        if(key == 67){
          cCode = true ;
        }
        if(key === 77){
          mCode = true;
        }
        if(key === 68){
          dCode = true;
        }
        if(cCode && mCode && dCode){
          this.isMaster=true;
          cCode,mCode,dCode = false;
        }
      })
    },
    closeCmd(){
      this.isMaster=false;
    }
  },
  created() {
    this.keyCodeForEvent();
  }
}
</script>

<style>
.head {
  width: 100%;
  border-bottom: 1px solid #DCDFE6;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 10;
}

body{
  background-color: #f8f9fb;
}
#app {
  overflow: hidden;
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
