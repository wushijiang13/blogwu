/***
 *工具类
 */

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
    return parseFloat(diffDay/6)+"周前";
  }else if(diffDay < 6 && diffDay >=0){
    return (diffDate+1)+"天前";
  }else if(diffDay < 0  && newDate.getMonth() > oldDate.getHours()  ){
    return ((newDate.getMonth()-oldDate.getMonth())+1)+"小时前";
  }else if(newDate.getMonth() == oldDate.getHours()  && newDate.getMinutes() > oldDate.getMinutes()  ){
    return ((newDate.getMinutes()-oldDate.getMinutes())+1)+"分前";
  }
}
module.exports={
  getConversionTime,
}
