var salescode = '';


$(document).on('click', '#replyoperation > .right > .sure_ok', function () {
   
    if (salescode == null && salescode == '') {
        salescode = $('#salescode').val();
    }

    var msgcontent = $('#replyoperation > .mid > textarea').val();
    AddReplyContent('IIS3380', '/SalesManage.aspx?action=submit', {
        "pj": salescode,
        "usercode": $('#usercode').val(),
        "wxcontent": msgcontent
    });
});

$(function () {
    Get();
    window.setInterval("Get()", 2000);
})

function Get() {
    salescode = getQueryString("dcode");
    if (salescode != null && salescode != '') {
        GetReply('IIS3380', '/SalesManage.aspx?action=GetReply', {
            "pj": salescode
        });
    } else {
        salescode = $('#salescode').val();
        GetReply('IIS3380', '/SalesManage.aspx?action=GetReply', {
            "pj": salescode
        });
    }
}

function wordStatic(textarea) {
    $('#replyoperation').css('position', 'static');
}


/*
获取回复列表
*/
function GetReply(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            
        },
        success: function (data) {
            if (data.errcode == 0) {
                var content = '';
                var lastdate;
                $.each(data.data, function (idx, obj) {
                    /*
                    创建时间: "2019/3/11 14:41:18"
                    消息内容: "你好"
                    消息类型: "文字"
                    用户代码: "mt00000001"
                    用户代码1: "林展浩"
                    部门: "总经办"
                    */

                    if (lastdate != null && (obj.创建时间 != null || obj.创建时间 != '')) {
                        if (TimeSeconds(lastdate, obj.创建时间) > 300) {
                            content += '<div class="centre">';
                            content += '    <div class="showdate">' + GetDateFormat(obj.创建时间, 'yyyy-MM-dd HH:mm') + '</div>';
                            content += '</div>';

                        }
                    }

                    if (lastdate == null) {
                        content += '<div class="centre">';
                        content += '    <div class="showdate">' + GetDateFormat(obj.创建时间, 'yyyy-MM-dd HH:mm') + '</div>';
                        content += '</div>';
                    }

                    lastdate = obj.创建时间;
                    
                     var usercode = $('#usercode').val();
                    
                    if (usercode == obj.用户代码) {
                        content += '<div class="right">';
                        content += '    <div class="content">';
                        content += '        <div class="userinfo">';
                        content += '            <div class="username">' + obj.用户名称 + '</div>';
                        content += '            <div class="account">' + obj.工号 + '</div>';
                        content += '        </div>';
                        
                        content += '        <div class="msg">' + obj.消息内容.replace(/\n/g, "<br />") + '</div>';
                        content += '    </div>';
                        content += '</div>';
                    }
                    else {
                        content += '<div class="left">';
                        content += '    <div class="content">';
                        content += '        <div class="userinfo">';
                        content += '            <div class="username">' + obj.用户名称 + '</div>';
                        content += '            <div class="account">' + obj.工号 + '</div>';
                        content += '        </div>';
                        content += '        <div class="msg">' + obj.消息内容.replace(/\n/g, "<br />") + '</div>';
                        content += '    </div>';
                        content += '</div>';
                    }
                });
                $('#replydetails').empty();
                $('#replydetails').append(content);
                setTimeout(function () {
                    $('#replydetails').scrollTop($("#replydetails")[0].scrollHeight + 1000)
                }, 300);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
发送聊天
*/
function AddReplyContent(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
               
                if (salescode == null && salescode == '') {
                    salescode = $('#salescode').val();
                }
                GetReply('IIS3380', '/SalesManage.aspx?action=GetReply', {
                    "pj": salescode
                });
                $('#replyoperation > .mid > textarea').val('');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*将日期转换成指定格式
timer:传入时间
str:指定转换的格式,样式：yyyy-MM-dd HH:mm:ss
*/
function GetDateFormat(timer, str) {
    if (timer == null || timer == undefined || timer == '') {
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

/*
两个日期相差秒数
*/
function TimeSeconds(time1, time2) {
    var d1 = new Date(time1);
    var d2 = new Date(time2);
    return parseInt(d2 - d1) / 1000;//相差秒数
}