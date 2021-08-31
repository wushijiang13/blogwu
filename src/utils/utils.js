 /*
  * 根据时间转换成文字显示
  * 传进来一个2020-6-20 10:20:23 这种时间格式
  * 1.需要检测这个传进来的参数是不是一个date对象
  * 2。从年开始比如果不一样就返回相差年数转成汉字
  * 不然就向下比对
  * */
  /*showTimeStr:function (date) {
  if(!isNaN(Date.parse(date))){
    date=date.replace(/-/g,"/"); //日期字符串转换成date 对象可以识别的时间格式
    let olddDate=new Date(date);//将旧时间传入date 里面
    let newData=new Date();
    if(newData.getFullYear() > olddDate.getFullYear()){
      return newData.getFullYear()-olddDate.getFullYear()+"年前";
    }else if(newData.getMonth() > olddDate.getMonth()){
      return newData.getMonth()- olddDate.getMonth()+"月前";
    }else if(newData.getDate() > olddDate.getDate()){
      let days=newData.getDate()-olddDate.getDate();
      if(days > 7 ){
        return  parseInt(days/7)+"周前";
      }else{
        return days+"天前";
      }
    }else if(newData.getHours() > olddDate.getHours()){
      return newData.getHours()-olddDate.getHours()+"小时前";
    }else if(newData.getMinutes()- olddDate.getMinutes()){
      return newData.getMinutes()-olddDate.getMinutes()+"分钟前";
    }
  }
}*/
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
  let oldDate=new Date(date); //老时间
  let newDate=new Date(); //新时间
  let diffDay=(newDate.getDate()-oldDate.getDate());
  if(oldDate.getFullYear() < newDate.getFullYear()){
    return newDate.getFullYear()-oldDate.getFullYear()+"年前";
  }else if(oldDate.getMonth() < newDate.getMonth()){
    return ((newDate.getMonth()-oldDate.getMonth())+1)+"月前";
  }else if(diffDay >= 6){
    return parseInt(diffDay/6)+"周前";
  }else if(diffDay < 6 && diffDay >=0){
    return (diffDay+1)+"天前";
  }else if(diffDay < 0  && newDate.getMonth() > oldDate.getHours()  ){
    return parseInt((newDate.getMonth()-oldDate.getMonth())+1)+"小时前";
  }else if(newDate.getMonth() == oldDate.getHours()  && newDate.getMinutes() > oldDate.getMinutes()  ){
    return parseInt((newDate.getMinutes()-oldDate.getMinutes())+1)+"分前";
  }
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


/**
 * 依赖浏览器的base64加密
 * @param value 需要加密的对象
 * @returns {string} 返回加密结果
 */
function base64En(value){
  if(isNullCheck(value)){
    return  btoa(encodeURIComponent(JSON.stringify(value)));
  }
}

/***
 * 依赖浏览器的base64解密
 * @param value 传入需要解密的字符
 */
function  base64De(value){
  if(isNullCheck(value)){
    return JSON.parse(decodeURIComponent(atob(value)));
  }
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
  base64En,
  base64De,
  debounce,
}
