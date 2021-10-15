import Vue from 'vue';

Vue.prototype.$loading={
  open:()=>{config.isLoading = true},
  close:()=>{
    setTimeout(()=>{
      config.isLoading = false
    },2000)
  }
}
export const config={
  isLoading:true,
}
