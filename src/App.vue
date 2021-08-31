<template>
  <div id="app">
    <CmdOpen @closeCmd="closeCmd" v-show="isMaster"></CmdOpen>
    <router-view />
  </div>
</template>

<script>
import CmdOpen from './components/master/cmd_open.vue';
export default {
  name: 'App',
  data(){
    return{
      isMaster:false,
    }
  },
  components: {CmdOpen},
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
