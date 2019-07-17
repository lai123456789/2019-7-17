/**
 * Created by WZH on 2017/7/31.
 */
/**
 * 日历控件
 * v1.0
 */
(function ($) {
    var Calendar = function (elem, options) {
        this.$calendar = elem;
        var _date = new Date();
        this.defaults = {
            ifSwitch: true,
            hoverDate: false,
            backToday: false,
            year:_date.getFullYear(),
            month:_date.getMonth(),
            day:_date.getDate(),
            click:function () {
 
            }
        };
 
        this.opts = $.extend({}, this.defaults, options);
        dateObj.setDate(new Date(this.opts.year,this.opts.month,this.opts.day));
    };
 
    Calendar.prototype = {
        showHoverInfo: function (obj) { // hover 时显示当天信息
 
        },
 
        showCalendar: function () { // 输入数据并显示
            var self = this;
            var year = dateObj.getDate().getFullYear();
            var month = dateObj.getDate().getMonth() + 1;
            var dateStr = returnDateStr(dateObj.getDate());
            var firstDay = new Date(year, month - 1, 1); // 当前月的第一天
 
            this.$calendarTitle_text.text(year + '年' + dateStr.substr(4, 2)+"月");
 
            this.$calendarDate_item.each(function (i) {
                // allDay: 得到当前列表显示的所有天数
                var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
                var allDay_str = returnDateStr(allDay);
 
                $(this).html('<span>'+allDay.getDate()+'</span>').attr('data', allDay_str);
                if (returnDateStr(new Date(self.opts.year,self.opts.month,self.opts.day)) === allDay_str) {
                    // $(this).attr('class', 'item');
                    $(this).find("span").addClass('active');
                } else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
                    if($(this).hasClass("calendar_weekend")){
                        $(this).addClass('item bg');//周末
                    }else {
                        $(this).attr('class', 'item '); //普通日期
                    }
                } else {
                    // $(this).attr('class', 'item bg-no');//非本月日期
                }
            });
 
            // 已选择的情况下，切换日期也不会改变
            if (self.selected_data) {
                var selected_elem = self.$calendar_body.find('[data='+self.selected_data+']');
 
                selected_elem.addClass('item-selected');
            }
        },
 
        renderDOM: function () { // 渲染DOM
            this.$calendar.children().remove();
            this.$calendar_title = $('<div class="m-card-head"></div>');
            this.$calendar_body = $('<div class="m-card-body" style="min-height:299px;"><div class="pt20 pb20"><table class="aui-table-calendar"><tbody></tbody></table></div></div>')
            this.$calendar_week = $('<tr></tr>');
 
 
            var _titleStr = '<div class="m-card-head-title clearfix"><a href="#" class="fl width15 tc">'+
                            '<img src="images/left-arrow.png" class="imgArrow arrow-prev" alt=""></a>'+
                            '<h3 class="fl width70 title-font tc fwn">2017 四月</h3><a href="#" class="fr width15 tc">'+
                            '<img src="images/right-arrow.png" class="imgArrow arrow-next" alt=""></a></div>';
            var _weekStr = '<th width="14%" class="calendar_weekend">S</th>'+
                '<th width="14%" class="">M</th>'+
                '<th width="14%" class="">T</th>'+
                '<th width="14%" class="">W</th>'+
                '<th width="14%" class="">T</th>'+
                '<th width="14%" class="">F</th>'+
                '<th width="14%" class="calendar_weekend">S</th>';
            this.$calendar_week.html(_weekStr);
            this.$calendar_body.find("tbody").append(this.$calendar_week);
            for (var i = 0; i < 6; i++) {
                var _dateStr = '';
                _dateStr += '<tr><td class="item bg-no calendar_weekend"><span>26</span></td>'+
                    '<td class="item bg-no "><span>26</span></td>'+
                    '<td class="item bg-no"><span>26</span></td>'+
                    '<td class="item bg-no"><span>26</span></td>'+
                    '<td class="item bg-no"><span>26</span></td>'+
                    '<td class="item bg-no"><span>26</span></td>'+
                    '<td class="item bg-no calendar_weekend"><span>26</span></td></tr>';
                this.$calendar_body.find("tbody").append($(_dateStr));
            }
            this.$calendar_title.html(_titleStr);
 
            this.$calendar.append(this.$calendar_title,this.$calendar_body);
            this.$calendar.show();
        },
 
        inital: function () { // 初始化
            var self = this;
 
            this.renderDOM();
 
            this.$calendarTitle_text = this.$calendar_title.find('.title-font');
            this.$backToday = $('#backToday');
            this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
            this.$arrow_next = this.$calendar_title.find('.arrow-next');
            this.$calendarDate_item = this.$calendar_body.find('.item');
 
            this.selected_data = 0;
 
            this.showCalendar();
 
            if (this.opts.ifSwitch) {
                this.$arrow_prev.bind('click', function () {
                    var _date = dateObj.getDate();
 
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));
 
                    self.showCalendar();
                });
 
                this.$arrow_next.bind('click', function () {
                    var _date = dateObj.getDate();
 
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));
 
                    self.showCalendar();
                });
            }
 
            this.$calendarDate_item.hover(function () {
                self.showHoverInfo($(this));
            });
 
            this.$calendarDate_item.click(function () {
                var _dateStr = $(this).attr('data');
                var _date = changingStr(addMark(_dateStr));
                var $curClick = null;
                self.selected_data = $(this).attr('data');
 
                dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));
                self.opts.year = _date.getFullYear();
                self.opts.month = _date.getMonth();
                self.opts.day = _date.getDate();
 
                if ($(this).hasClass('bg-no')) {
                    self.showCalendar();
                }
 
                $curClick = self.$calendar_body.find('[data='+_dateStr+']');
                if (!$curClick.find("span").hasClass('active')) {
                    self.$calendarDate_item.find("span").removeClass('active');
 
                    $curClick.find("span").addClass('active');
                }
                if(typeof self.opts.click == "function"){
                    self.opts.click(self.selected_data);
                }
            });
        },
        constructor: Calendar
    };
 
    $.fn.extend({
        defaultOptions:{
 
        },
        calendar:function (options) {
            var calendar = new Calendar(this, options);
            calendar.inital();
            this.defaultOptions = $.extend({},this.defaultOptions,options)
            return this.each(function () {
            });
        },
        setDate:function (year,month,day) {
            this.defaultOptions.year = year;
            this.defaultOptions.month = month-1;
            this.defaultOptions.day = day;
            var calendar = new Calendar(this,this.defaultOptions);
            calendar.inital();
            return this.each(function () {
            });
        }
    })
 
 
    // ========== 使用到的方法 ==========
 
    var dateObj = (function () {
        var _date = new Date();
 
        return {
            getDate: function () {
                return _date;
            },
 
            setDate: function (date) {
                _date = date;
            }
        }
    })();
 
    function returnDateStr(date) { // 日期转字符串
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
 
        month = month <= 9 ? ('0' + month) : ('' + month);
        day = day <= 9 ? ('0' + day) : ('' + day);
 
        return year + month + day;
    };
 
    function changingStr(fDate) { // 字符串转日期
        var fullDate = fDate.split("-");
 
        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    };
 
    function addMark(dateStr) { // 给传进来的日期字符串加-
        return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
    };
 
    // 条件1：年份必须要能被4整除
    // 条件2：年份不能是整百数
    // 条件3：年份是400的倍数
    function isLeapYear(year) { // 判断闰年
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }
 
})(jQuery);
