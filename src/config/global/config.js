import Vue from 'vue';

Vue.prototype.$loading={
  open:()=>{config.isLoading = true},
  close:()=>{
    config.isLoading = false
    /*setTimeout(()=>{

    },2000)*/
  }
}
export const config={
  isLoading:true,
}
