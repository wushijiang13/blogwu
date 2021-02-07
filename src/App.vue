<template>
  <div id="app">
    <cmdOpen @closeCmd="closeCmd" v-show="isMaster"></cmdOpen>
    <heads></heads>
    <router-view/>
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
