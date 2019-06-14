//2019-02 转化为 2019年2月
function formatTimeStr (date) {
    if (date == '' || date == null) {
        return
    }
   var year = date.substr(0,4),month = date.substr(5);
   return year + '年' + month +'月'
}
//  2019年2月转化为2019-02
function formatTimeStr2(date) {
  if (date == '' || date == null) {
    return
  }
  var year = date.substr(0, 4), month = date.substr(5,2);
  return year + '-' + month 
}
//2019-02 转化为 201902
function timeConvertNum (date) {
    if (date == '' || date == null) {
        return
    }
   var year = date.substr(0,4),month = date.substr(5,2);
   return year  + month ;
}

// 获取当前年月的上一个月
function getCurrentMonth(){
    var myDate = new Date();//获取系统当前时间
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    month = month < 10 ? ('0'+month ): month;
    return year + '年' + month +'月' 
}
// 获取上个月
function getCurrentMonthNum(){
    var myDate = new Date();//获取系统当前时间
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    month = month < 10 ? ('0'+month ): month;
    return year + month  
}

//保留2位小数
/**
 * 保留小数点位数,四舍五入,不够位数不0;
 * param1:num是要处理的数据;param2:count是要保留的小数位数
 */
function toFixed2(num) {
    var count =2;//保留2位小数
    var result = parseFloat(num);
    var temp = 1, temCount = count;
    if (isNaN(result)) {
        console.log('传递参数错误，请检查！');
        return false;
    }
    while (count != 0) {
        temp += "0";
        count--
    }
    temp = parseInt(temp);
    result = Math.round(num * temp) / temp;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + temCount) {
        s_x += '0';
    }
    return s_x;
};

module.exports = {
    formatTimeStr:formatTimeStr,
    formatTimeStr2: formatTimeStr2,
    timeConvertNum:timeConvertNum,
    getCurrentMonth:getCurrentMonth,
    getCurrentMonthNum:getCurrentMonthNum,
    toFixed2:toFixed2
}
