import {BackTop,Button,Input,Icon,Divider,InputNumber
  ,Skeleton,Result,Popover,message,FormModel,Select,Upload,Layout,Dropdown,Menu,Switch,Drawer
} from 'ant-design-vue';
import WuIcon from '@/components/utlis/wu-icon'
import  Vue from 'vue';
import './ant-design.less'


[Input,Skeleton,Result,Popover,FormModel,Select,Upload,Layout,BackTop,Switch
  ,Button,InputNumber,Icon,Divider,Dropdown,Menu,Drawer].forEach(item=>{
  Vue.use(item);
})
Vue.component(WuIcon.name,WuIcon);
Vue.prototype.$message=message;
