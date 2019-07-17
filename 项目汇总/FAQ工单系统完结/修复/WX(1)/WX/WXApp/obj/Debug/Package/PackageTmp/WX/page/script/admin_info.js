$(document).ready(function () {   //拿到token的缓存   
    var token = localStorage.getItem("token");
    console.log("token " + token);
    $("#result3").append('<p>' + "token：" + "<input type='text'  name='token' class='tk' value='" + token + "'>" + '</p>');
});
$(function () {
    var token = $(".tk").val();
    wode_paigong(token);
});

$(document).on('click', '.query_btn', function () {
    var token = $(".s").val();
    alert(search);
    wode_paigong(token);
});

function wode_paigong(token) {   //页面刷新加载函数   我的派工接口
    var usercode = localStorage.getItem("usercode");
    var search = $('#search_content1').val();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetWork",
        data: {
            "token": token,
            "usercode": usercode,
            "search": search
        },
        async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                var content = '';
                console.log(data);
                nextPage(1);
            }
            else {
                // alert(data.errmsg)
                alert("身份验证失败！");
                location.href = "index.html";
            }
        }
    });
}


//****************页面控制********************/
function pageControl(data, nowpage) {
    var rnnum = '';
    var divvv = '';
    var huifu = '';
    var clickbackpage = '';
    var clicknextpage = '';
    console.log(data);
    console.log(nowpage);
    if (data.data.length>0) {

        $.each(data.data, function (idx, obj) {
            divvv += '<tr id="' + idx + '">';   //获取id值
            divvv += '    <td class="username">' + obj.usercode + '</td>';
            divvv += '    <td class="password">' + obj.wordercode + '</td>';
            divvv += '    <td class="password">' + obj.title + '</td>';
            divvv += '    <td class="position">' + obj.content + '</td>';
            divvv += '    <td class="position">' + obj.name + '</td>';
            divvv += '    <td class="position">' + obj.phone + '</td>';
            rnnum = obj.rn;
            if (obj.account == 'admin') {
                divvv += '    <td></td>';
            } else {
                divvv += '    <td>';

                divvv += '        <a class="shezhi" href="info.html?Wid=' + obj.wordercode + '" style="margin-left:10px;">详情</a>';
                divvv += '    </td>';
                divvv += '</tr>';
            }
        });



        if (data.totalnum > 0) {
            if (data.totalnum % 10 > 0) {
                $("#totalpage").text(parseInt(data.totalnum / 10 + 1));
                totalpage = parseInt(data.totalnum / 10 + 1);
            } else if (data.totalnum % 10 == 0) {
                $("#totalpage").text(parseInt(data.totalnum / 10));
                totalpage = parseInt(data.totalnum / 10);
            }
            if (nowpage <= 1) {
                $(".backpage").hide();
            } else {
                $(".backpage").show();
                clickbackpage = '<input type="button" value="＜上一页" id="back"  onclick="backPage(' + nowpage + ')" />';
            }
            if ((nowpage >= totalpage)) {
                $(".nextpage").hide();
            } else {
                $(".nextpage").show();
                clicknextpage = '<input type="button" value="下一页＞" id="next" onclick="nextPage(' + nowpage + ')" />';

            }

        }
        $("#now").text(nowpage);
        $('#form_tb33').empty();
        $('#form_tb33').append(divvv);

        $(".backpage").empty();
        $(".backpage").append(clickbackpage)

        $(".nextpage").empty();
        $(".nextpage").append(clicknextpage)
    }
}

//****************下一页********************/
function nextPage(rn) {
    var usercode = localStorage.getItem("usercode");
    var search = $('#search_content1').val();
    var token = $(".tk").val();
    var next = $("#next").val();
    if (next == null) {
        var nowpage = 1;
    } else {
        if (next != null) {
            nowpage = rn + 1;
        }
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetWork",
        dataType: "json",
        async: true,
        data: {
            "token": token,
            "page": nowpage,
            "usercode": usercode,
            "search": search
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                pageControl(data, nowpage);
            } else//提取失败
            {
                alert(data.errmsg);
            }

        },
    });
}

//****************上一页********************/
function backPage(rn) {
    var usercode = localStorage.getItem("usercode");
    var search = $('#search_content1').val();
    var token = $(".tk").val();
    var back = $("#back").val();
    if (back == null) {
        var nowpage = 1;
    } else {
        if (back != null) {
            nowpage = rn - 1;
        }
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetWork",
        dataType: "json",
        async: true,
        data: {
            "token": token,
            "page": nowpage,
            "usercode": usercode,
            "search": search
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                pageControl(data, nowpage);
            } else//提取失败
            {
                alert(data.errmsg);
            }

        },
    });

}




// 轮询  发送请求给服务端 settimeout   查询是否有新消息派工给技术员
function getRe() {
    var usercode = localStorage.getItem("usercode");
    $.ajax({
        type: 'post',
        url: 'http://o24034e466.qicp.vip/UserManage.aspx?action=GetS',
        dataType: 'json',
        timeout: 5000,
        data: {
            // "state":state,
            "usercode": usercode
        },
        async: false,
        success: function (data) {
            var number = 0;
            timer = setTimeout(getRe, 8000);   //  处理完消息之后 继续向服务端 一直发送请求
            $.each(data.data, function (idx, obj) {
                console.log(obj.wordercode);
                console.log(obj.state);                
                if (number < 1) {
                    var state = obj.state;
                    var wordercode = obj.wordercode;
                    var num = (idx + 1);
                    if (state == "0") {
                        //alert("为0,有新消息!");
                        number++;
                        setTimeout(function () {
                            mesgNotice(wordercode);
                        }, 300 * num);
                    }
                }
            })
        }
    });
};

getRe();

function ReadNotify(wordercode)
{
    $.ajax({
        type: 'post',
        url: 'http://o24034e466.qicp.vip/UserManage.aspx?action=DP',  //点击这个状态改为1
        dataType: 'json',
        data: {
            "wordercode": wordercode
        },
        async: false,
        error: function (request) {
            hideLoading();
            alert("出错！");
        },
        success: function (data) {            
            timer = setTimeout(getRe, 3000);            
           window.location.href = "admin_info.html";

        }
    });
}
function mesgNotice(wordercode) {
    var usercode = localStorage.getItem("usercode");
    $.ajax({
        type: 'post',
        url: 'http://o24034e466.qicp.vip/UserManage.aspx?action=GetS',
        dataType: 'json',
        timeout: 5000,
        data: {
            // "state":state,
            "usercode": usercode
        },
        async: false,
        success: function (data) {
            if (window.Notification && Notification.permission !== "denied") {
                Notification.requestPermission(function (status) {
                    var notice_ = new Notification("工单标题：" + data.data[0].title, {
                        dir: "ltr",
                        tag: "Beyoung",
                        lang: "utf-8",
                        body: "工单内容：" + data.data[0].content,
                        // icon: "http://xuhong.github.io/images/gravatar.png"
                    });
                    notice_.onclick = function () {//单击消息提示框，进入浏览器页面
                        window.location.href = "info.html?Wid=" + data.data[0].wordercode;
                        ReadNotify(wordercode);
                    }
                    notice_.onclose = function () {    //处理 close 事件的处理。当用户关闭通知时被触发。
                        console.log("notification closed!");
                        ReadNotify(wordercode);
                        timer = setTimeout(getRe, 3000);
                    };
                });
            }
        }
    });
}



//这里弹出右下角状态提醒框开始 桌面消息框
//function mesgNotice(wordercode) {  这个也可以用 就是没把拿到的内容显示在消息栏的body
//    if (window.Notification && Notification.permission !== "denied") {
//        Notification.requestPermission(function (status) {
//            var notice_ = new Notification('新的消息', {
//                dir: "ltr",
//                tag: "Beyoung",
//                lang: "utf-8",
//                body: '你好，您有新的消息！',
//                icon: "http://xuhong.github.io/images/gravatar.png"
//            });
//            notice_.onclick = function () {//单击消息提示框，进入浏览器页面
//                window.location.href = "admin_info.html";
//                ReadNotify(wordercode);
//            }
//            notice_.onclose = function () {    //处理 close 事件的处理。当用户关闭通知时被触发。
//                console.log("notification closed!");
//                timer = setTimeout(getRe, 3000);
//            };
//        });
//    }
//}
//这里弹出右下角状态提醒框结束





