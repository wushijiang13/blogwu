import {BackTop,Button,Input,Icon,Divider,InputNumber,Skeleton,Result,Popover,message,FormModel,Select,Upload} from 'ant-design-vue';
import  Vue from 'vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Input);
Vue.use(Skeleton);
Vue.use(Result);
Vue.use(Popover);
Vue.use(FormModel);
Vue.use(Select);
Vue.use(Upload);
Vue.component(BackTop.name, BackTop)
Vue.component(Button.name, Button)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Icon.name, Icon)
Vue.component(Divider.name, Divider)

Vue.prototype.$message=message;
