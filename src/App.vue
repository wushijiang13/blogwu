<template>
  <div id="app">
    <CmdOpen v-show="isMaster"></CmdOpen>
    <Head></Head>
    <router-view/>
  </div>

</template>

<script>
import Head from "./components/public/head";
import CmdOpen from './components/master/cmdOpen';
export default {
  name: 'App',
  data(){
    return{
      isMaster:false,
    }
  },
  components: {Head,CmdOpen},
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
          console.log("锦");
          this.isMaster=true;
          cCode,mCode,dCode = false;
        }
      })
    },
  },
  created() {
    this.keyCodeForEvent();
  }
}
</script>

<style>
#app {
  background-color: #f8f9fb;
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
