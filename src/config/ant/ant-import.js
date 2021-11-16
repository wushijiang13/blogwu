import {BackTop,Button,Input,Icon,InputNumber
  ,Skeleton,Result,Popover,message,FormModel,Select,Upload,Layout,Menu,Drawer,
  Tooltip
} from 'ant-design-vue';
import WuIcon from '@/components/utils/wu-icon'
import  Vue from 'vue';
import './ant-design.less'

[Input,Skeleton,Result,Popover,FormModel,Select,Upload,Layout,BackTop
  ,Button,InputNumber,Icon,Menu,Drawer,Tooltip].forEach(item=>{
  Vue.use(item);
})
Vue.component(WuIcon.name,WuIcon);
Vue.prototype.$message=message;
