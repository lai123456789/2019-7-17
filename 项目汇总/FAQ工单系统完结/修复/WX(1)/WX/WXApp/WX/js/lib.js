/*
    日历事件，可发挥
*/

function bindEvent(){
    var prevMonth = document.getElementById("prevMonth");

    var toPrevMonth = function(){
         var date = dateObj.getDate();
         dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
         showCalendarData();
    };
    addEvent(prevMonth, 'click', toPrevMonth);

    var toNextMonth = function(){
         var date = dateObj.getDate();
         dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
         showCalendarData();
    }


    var nextMonth = document.getElementById("nextMonth");
     addEvent(nextMonth, 'click', toNextMonth);    

}

// getElementById()
// getElementsByTagName()

function showCalendarData(){
    var odate = dateObj.getDate();
    var titlestr = getDateStr(odate,'title');

    console.log(titlestr);
    var calendarTitle = document.getElementById('calendarTitle');
        calendarTitle.innerText = titlestr;
    // con
    var calendarTable = document.getElementById('calendarTable');
    var tds = calendarTable.getElementsByTagName('td');

    var _firstDay = new Date(odate.getFullYear(), odate.getMonth(), 1);  // 当前月第一天


    for(var i = 0,len= tds.length; i<len;i++) {
        var _thisDay = new Date(odate.getFullYear(),
                             odate.getMonth(), 
                             i + 1 - _firstDay.getDay());
        var _thisDayStr = getDateStr(_thisDay,'YYYYMMDD');
        var item = tds[i];
        item.innerText = _thisDay.getDate();
        item.setAttribute('data', _thisDayStr);

        // 当前天
        if(_thisDayStr == getDateStr(odate,'YYYYMMDD')) { 
            item.className ='cur-day';
        }else if(_thisDayStr.substr(0, 6) 
            == getDateStr(_firstDay,'YYYYMMDD').substr(0, 6)) { 
            item.className ='cur-mounth';
        }else{
            item.className ='other-mounth';
        }



    }

    // console.log(_thisDayStr.substr(0,6));

}

// renderHtml()
function renderHtml(){
    var calendar = document.getElementById('calendar');
    var calendar_top = document.createElement('div');
    var calendar_con = document.createElement('div');

    calendar_top.className='calendar-title-box';
    calendar_top.innerHTML='<span class="prev-month" id="prevMonth"></span>'
    +'<span class="calendar-title" id="calendarTitle"></span>'
    +'<span class="next-month" id="nextMonth"></span>';

    // 表格区
    calendar_con.className='calendar-body-box';

    var _th ='<tr>'
        +'<th>日</th>'
        +'<th>一</th>'
        +'<th>二</th>'
        +'<th>三</th>'
        +'<th>四</th>'
        +'<th>五</th>'
        +'<th>六</th>'
        +'</tr>';

    var _tbody ='';
    for(var i=0;i<6;i++){
        _tbody+='<tr>'
        +'<td></td>'
        +'<td></td>'
        +'<td></td>'
        +'<td></td>'
        +'<td></td>'
        +'<td></td>'
        +'<td></td>'
        +'</tr>';

    };

    calendar_con.innerHTML='<table class="calendar-table" id="calendarTable">'
    +_th+_tbody+'</table>';
    calendar.appendChild(calendar_top);
    calendar.appendChild(calendar_con);

}
