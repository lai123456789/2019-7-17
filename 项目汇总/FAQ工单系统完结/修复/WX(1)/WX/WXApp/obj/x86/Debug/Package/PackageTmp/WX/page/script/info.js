
$(function () {
    var Wid = GetQueryString("Wid");
    info_wenti(Wid);
})

//获取URL地址中的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function info_wenti(wordercode) {  //问题详情接口
    var usercode = localStorage.getItem("usercode");
    $.ajax({
        cache: true,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetDetails",
        async: true,
        data:{
            "wordercode":wordercode,
             "usercode":usercode
        },
        error: function (request) {
        },
        success: function (data) {            
            if (data.errcode == 0) {
                $("#biaoti").text(data.data[0].title);
                $("#wenti").text(data.data[0].content);
                $("#tupian").empty();
                $("#tupian").append('<img src=http://o24034e466.qicp.vip/' + data.data[0].imgurl + ' style="width:60px;height:40px;" alt=" ">');
                //$("#img_tupian").attr("src", "http://192.168.2.195:1680/" + data.data[0].imgurl);
                $("#createtime").text(data.data[0].createtime);
                $("#mingzi").text(data.data[0].name);
                $("#phone").text(data.data[0].phone);                
                //这里展示内容回复
                //这里开始展示
                if (data.data2[0] != null) {                    
                    var divvv = '';
                    var huifu = '';
                    $.each(data.data2, function (idx, obj) {
                        $(".reply_xianshi").show();  //用户回复了之后  问题回复div 显示
                        divvv += ' <div style="margin-bottom: 30px;>';
                        divvv += ' <div style="margin-bottom: 20px;>';
                        divvv += '<div class="work-order-section reply-section" style="margin-bottom: 10px; border-radius: 5px 5px 0 0; -webkit-border-radius: 5px 5px 0 0;">';
                        divvv += ' <p  style="border: none;margin-left: -10px;margin-bottom: 10px;text-align: left;" id="replyname">问题回复</p>';
                        divvv += ' </div>';
                        divvv += ' <div class="work-order-section reply-section" style="border-radius: 0 0 5px 5px; -webkit-border-radius: 0 0 5px 5px; border-top: none;">';
                        divvv += ' <div class="item-box clear">';
                        divvv += '<div class="img-item fl" style="float:left;">';
                        divvv += '  <img src="img/noavatar_big.gif" width="48" height="48">';
                        divvv += ' </div>';
                        divvv += ' <div class="text-item">';
                        divvv += ' <p class="sub-til clear">';
                        divvv += ' <span class="fl" style="float:left;">' + obj.replyname + '</span><span class="time" style="font-size:10px;">';
                        divvv += ' ' + obj.replytime + '<!-- 这里获取系统回复的时间  -->';
                        divvv += ' </span>';
                        divvv += ' </p>';
                        divvv += ' <div class="text">' + obj.replycontent + '</div>';
                        divvv += ' </div>';
                        divvv += ' </div>';
                        divvv += ' </div>';
                        divvv += ' </div>';
                        divvv += ' </div>';

                    });                    
                    $('#dd').empty();
                    $('#dd').append(divvv);
                    $('.huifu').empty();
                    $('.huifu').append(huifu);

                }
                //这里展示内容回复
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





$(document).on('click', '#btn_sure_reply', function () {
    wenti_reply();
});
function wenti_reply() {   //管理员回复问题模块
    var wordercode = GetQueryString("Wid"); //拿到wordercode
    var usertype = localStorage.getItem("usertype");
    var replycontent = $("#con").val();
    var usercode1 = localStorage.getItem("usercode");
    var username = localStorage.getItem("username");
    if (replycontent == null || replycontent == "") {
        alert("回复内容不能为空！");
        return;
    }
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=sysreply",
        async: true,
        error: function (request) {
        },
        data: {
            "wordercode": wordercode,
            "userid": usercode1,
            "username": username,
            "content": replycontent,
            "usertype":usertype
            
        },
        success: function (data) {
            //location.href = "info.html";
            alert("回复成功！");
            info_wenti(wordercode);  //再调用一次 不用刷新 
            
        }
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

function ReadNotify(wordercode) {
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


