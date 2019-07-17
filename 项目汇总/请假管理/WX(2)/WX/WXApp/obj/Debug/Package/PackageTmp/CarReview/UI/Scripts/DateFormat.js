/*将日期转换成指定格式
timer:传入时间
str:指定转换的格式,样式：yyyy-MM-dd HH:mm:ss
*/
function GetDateFormat(timer,str)
{
    if ( timer == null || timer == undefined || timer == '') {
        str = '';
    } else {
        var date = new Date(timer);
        var yyyy = date.getFullYear();
        var MM = date.getMonth() + 1;
        
        MM = MM > 9 ? MM : ('0' + MM);
        var dd = date.getDate();
        dd = dd > 9 ? dd : ('0' + dd);
        var hh = date.getHours();
        hh = hh > 9 ? hh : ('0' + hh);
        var HH = date.getHours();
        HH = HH > 9 ? HH : ('0' + HH);
        var mm = date.getMinutes();
        mm = mm > 9 ? mm : ('0' + mm);
        var ss = date.getSeconds();
        ss = ss > 9 ? ss : ('0' + ss);
        str = str.replace('yyyy', yyyy);
        str = str.replace('MM', MM);
        str = str.replace('dd', dd);
        str = str.replace('hh', hh);
        str = str.replace('HH', HH);
        str = str.replace('mm', mm);
        str = str.replace('ss', ss);
        if (isNaN(MM) || isNaN(dd) || isNaN(hh) || isNaN(HH) || isNaN(mm) || isNaN(ss)) {
            str = '';
        }
    }
    return str;
}

//将日期时间字符串格式化
function StringToDateFormat(datestring,format)
{
    var d = new Date(Date.parse(datestring.replace(/-/g, "/")));
    return GetDateFormat(d, format);
}







// 日期，在原有日期基础上，增加days天数，默认增加1天
function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + parseInt(days));
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day) + ' ' + getFormatDate(hour) + ':' + getFormatDate(minute) + ':' + getFormatDate(second);
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}


/*
获取月底最后一天
*/
function getFinalyDay(year,month){
    month = parseint(month,10)+1;
    var temp = new date(year + '/' + month + '/' + 0);
    return temp.getdate();
}

/*
两个日期相差秒数
*/
function TimeSeconds(time1, time2) {
    var d1 = new Date(time1);
    var d2 = new Date(time2);
    return parseInt(d2 - d1) / 1000;//相差秒数
}