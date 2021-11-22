import moment  from 'moment'
import 'moment/locale/zh-cn';

/***
 *工具类
 */
let timeout=null;
/**
 * 传入一个时间，根据当前时间转换成时分秒
 */
function getConversionTime(date){
  if(date == undefined  || date == null  || date == ""){
    return ;
  }
  return moment(date).fromNow().replace(/\s/g,"");
}
/**
 * 是否为null字符的判断
 * return true 正确不等于空 false 空
 */
function isNullCheck(value){
  if(value!= null && value != undefined && value != ''){
      return true;
  }
  return false;
}

/***
 * 防抖
 * @param fn 需要执行的函数
 * @param error error执行的函数
 * @returns {function(...[*]=)}
 */
function debounce(fn,message){
    if(timeout != null){
      this.$message.error(message);
    }
    clearTimeout(timeout);
    timeout=setTimeout(()=>{
      fn();
      timeout=null;
      clearTimeout(timeout);
    },300)
}

/***
 * 判断数组完全相等
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 * @returns 返回boolean 是否相等
 */
function arrayEqual(arr1,arr2){
    if(arr1 == arr2)return true;
    if(arr1.length != arr2.length) return false;
    let isEqual = true ; //是否相等的变量
    arr1.forEach((item,index)=>{
        if (item != arr2[index]) {
            isEqual= false;
        }
    })
    return isEqual;
}


export {
  getConversionTime,
  isNullCheck,
  debounce,
  arrayEqual
}
