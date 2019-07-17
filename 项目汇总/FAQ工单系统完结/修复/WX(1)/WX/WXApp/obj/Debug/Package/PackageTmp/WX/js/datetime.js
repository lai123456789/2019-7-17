//  onfocus="currentWeek(this);"
(function($){
    $(".datetimeInputCls").focus(function(){
        currentWeek(this);
    });

    $.fn.customedDateTime = function(options){
        var defaults = {
             width:200,
             height:30
        };

        var opts = $.extend(defaults,options);

        this.css({height:opts.height,width:opts.width});

        if(!this.hasClass("datetimeInputCls")){
            this.addClass("datetimeInputCls");
            this.focus(function(){
                currentWeek(this);
            });
        }

    };

    function currentWeek(ele) {
        var obj = offset(ele);
        //console.log(obj);

        var x = obj.left;
        var y = obj.top + ele.offsetHeight + 1;

        //创建日历界面
        if (!document.getElementById('week')) {
            var oDiv = document.createElement('div');
            document.body.appendChild(oDiv);
            oDiv.id = 'week';

            oDiv.style.position="relative";                 
            oDiv.style.top = y + "px";
            oDiv.style.left = x + "px";

            //创建日历title
            var h6 = document.createElement('h6');
            oDiv.appendChild(h6);

            var prevYear = document.createElement('div');
            h6.appendChild(prevYear);
            prevYear.className = 'prev';
            prevYear.innerHTML = '上一年';

            var prev = document.createElement('div');
            h6.appendChild(prev);
            prev.className = 'prev';
            prev.innerHTML = '上个月';

            var content = document.createElement('div');
            content.className = "content";
            h6.appendChild(content);

            var nextYear = document.createElement('div');
            h6.appendChild(nextYear);
            nextYear.className = 'next';
            nextYear.innerHTML = '下一年';

            var next = document.createElement('div');
            h6.appendChild(next);
            next.className = 'next';
            next.innerHTML = '下个月';

            //创建星期日到星期六的文字行
            var oPs = document.createElement('p');
            oPs.className = "rlTitle";
            oDiv.appendChild(oPs);
            var opsCont = ['日', '一', '二', '三', '四', '五', '六'];
            for (var i = 0; i <= 6; i++) {
                var oSpan = document.createElement('span');
                oPs.appendChild(oSpan);
                oSpan.innerHTML = opsCont[i];
            }

            //创建日历上面的日期行数所需要的变量
            var oUl = document.createElement('ul');
            oUl.className = "rlCenter";
            oDiv.appendChild(oUl);
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth();

            active(currentYear,currentMonth);//传参数月份
            //创建日历上下翻月
            prev.onclick = function () {
                active(currentYear,--currentMonth);
            };
            next.onclick = function () {
                active(currentYear,++currentMonth);
            };

            //创建日历上下翻年
            prevYear.onclick = function () {
                active(--currentYear,currentMonth);
            };
            nextYear.onclick = function () {
                active(++currentYear,currentMonth);
            };

        }else{//已存在ID为week的元素
           alert("页面中存在ID为week的元素，与日期插件中元素ID重复，请更换名称！");
           return;
        }

        //动态创建日历上面日期，变包装成方法
        function active(y,m) {
            //alert("y: " + y + "; m: " + m);
            oUl.innerHTML = ''; //切忌一定要把这个内容去掉，要不然会点一次翻页都在日历下面依次显示出来
            var activeDate = new Date(y, m, 1); //外面传进来的不断变化的日期对象
            var year = activeDate.getFullYear();
            var month = activeDate.getMonth(); //把当前的月份保存下来只是为了给title获取月份
            content.innerHTML = year + '年' + (month + 1) + '月';

            //创建日历上面的日期行数 getDay 获取星期的某一天 周日对应getDay() = 0
            //alert("activeDate.getDay(): " + activeDate.getDay());
            var n = 1 - activeDate.getDay();
            if (n == 1) {
                n = -6;
            } //为了日历更友好的显示三个月，让用户看的更明白。
            //将日期设为n天之后的日期 |n|+1为显示上个月的天数
            activeDate.setDate(n); //如果n为负数，则减少月份.在用这个月最后一天减去这个值就可以获得日历从哪天开始的。

            //alert("activeDate.getDate(): " + activeDate.getDate());
            for (var i = 0; i < 42; i++) {//显示六行
                var oLi = document.createElement('li');
                oUl.appendChild(oLi);
                var date = activeDate.getDate(); //返回日期1-31号
                oLi.innerHTML = date;

                oLi.dateValue = year + "/" + formatNumber(activeDate.getMonth() + 1) 
                              + "/" + formatNumber(date); //这里必须是activeDate.getMonth()+1，不能用m+1。因为这个是一直变化的。要不然日历不管点哪天都是属于当前月份的。

                if (activeDate.getMonth() != month) {
                    oLi.style.color = "#ccc"; //不是本月的天数颜色变成灰色       
                }else{//上一个月的不可选择
                    oLi.onclick = function () {
                        ele.value = this.dateValue;//文本框获取的年月日
                        //console.log("oDiv: ");
                        //console.log(oDiv);
                        document.body.removeChild(oDiv); //获取到年月日，日历取消
                        oDiv = null;
                    };

                    //定义日期的鼠标经过和移出事件
                    oLi.onmouseover = function(){
                      this.style.backgroundColor = "#ddd";
                    }
                    oLi.onmouseout = function(){
                      this.style.backgroundColor = "#fff";
                    }
                }
                //切忌下面这个增加天数语句，一定要判断完上面是不是本月的天数，然后在添加这条增加语句，要不然会出现错误。
                activeDate.setDate(date + 1); //如果超出该月份应有的天数则增加月份
            }
        }
     }

    function formatNumber(number){
         if(number != undefined && number != ""){
              if(number < 10 ){
                 return "0" + number;
              }else{
                 return number;
              }
          } 
          return "";
     }

    function offset(ele) {
            var l = ele.offsetLeft;
            var t = ele.offsetTop;
            var p = ele.offsetParent;
            while (p) {
                if (window.navigator.userAgent.indexOf("MSIE 8") > -1) {
                    l += p.offsetLeft;
                    t += p.offsetTop;
                } else {
                    l += p.offsetLeft + p.clientLeft;
                    t += p.offsetTop + p.clientTop;
                }
                p = p.offsetParent;
            }
            return {
                left: l,
                top: t
            }
    }
})(jQuery);
