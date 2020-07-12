const  Utils={
  /*
  * 根据时间转换成文字显示
  * 传进来一个2020-6-20 10:20:23 这种时间格式
  * 1.需要检测这个传进来的参数是不是一个date对象
  * 2。从年开始比如果不一样就返回相差年数转成汉字
  * 不然就向下比对
  * */
  showTimeStr:function (date) {
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
  }
}

export default Utils;

