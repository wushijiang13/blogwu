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


export {
  getConversionTime,
  isNullCheck,
  debounce,
}
