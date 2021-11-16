import Vue from 'vue';

Vue.prototype.$loading={
  open:()=>{config.isLoading = true},
  close:()=>{
    config.isLoading = false
  }
}
export const config={
  isLoading:true,
}
