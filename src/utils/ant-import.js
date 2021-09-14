import {BackTop,Button,Input,Icon,Divider,InputNumber
  ,Skeleton,Result,Popover,message,FormModel,Select,Upload,Layout,Dropdown,Menu} from 'ant-design-vue';
import  Vue from 'vue';
import '../config/css/ant-design.less'

[Input,Skeleton,Result,Popover,FormModel,Select,Upload,Layout,BackTop,Button,InputNumber,Icon,Divider,Dropdown,Menu].forEach(item=>{
  Vue.use(item);
})

Vue.prototype.$message=message;
