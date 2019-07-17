//$(document).ready(function () {   //拿到token的缓存   
//    var token = localStorage.getItem("token");
    
//    $("#result3").append('<p>' + "token：" + "<input type='text'  name='token' class='tk' value='" + token + "'>" + '</p>');
//});
//$(function () {
//    var token = $(".tk").val();
//    GetAllPublishedGoodsInfo(1,token);
//});

//$(document).on('click', '.query_btn', function () {
//    //var token = $(".s").val();
//    var token = $(".tk").val();
//    GetAllPublishedGoodsInfo(1,token);
//});

//function GetAllPublishedGoodsInfo(page) {   //页面刷新加载函数   我的派工接口
//    var usercode = localStorage.getItem("usercode");
//    var search = $('#search_content1').val();
//    var token = $(".tk").val();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetWork",
//        data: {
//            "token": token,
//            "usercode": usercode,
//            "search": search,
//            "sort": sort,
//            "sortfield": sortfield,
//            "page":page
            
//        },
//        async: true,
//        error: function (request) {
//        },
//        success: function (data) {
//            if (data.errcode == 0) {
//                var divvv = '';
//                if (data.data.length > 0 && data.totalnum > 0) {
//                    var usename = $("#am").text();
//                    $.each(data.data, function (idx, obj) {
//                        divvv += '<tr id="' + idx + '">';   //获取id值
//                        divvv += '    <td class="username">' + obj.usercode + '</td>';
//                        divvv += '    <td class="password">' + obj.wordercode + '</td>';
//                        divvv += '    <td class="password">' + obj.title + '</td>';
//                        divvv += '    <td class="position">' + obj.content + '</td>';
//                        divvv += '    <td class="position">' + obj.name + '</td>';
//                        divvv += '    <td class="position">' + obj.phone + '</td>';
//                        if (obj.gdstate == '3') {
//                            divvv += '    <td style="color:red;">已完成</td>';
//                        } else {
//                            divvv += '    <td class="position">进行中</td>';
//                        }
//                        divvv += '    <td class="position">' + obj.createtime + '</td>';

//                        rnnum = obj.rn;
//                        if (obj.account == 'admin') {
//                            divvv += '    <td></td>';
//                        } else {
//                            divvv += '    <td>';

//                            divvv += '        <a class="shezhi" href="info.html?Wid=' + obj.wordercode + '&usename=' + usename + '" style="margin-left:10px;">详情</a>';
//                            divvv += '    </td>';
//                            divvv += '</tr>';
//                        }
//                    });
//                    $("#form_tb33").empty();
//                    $("#form_tb33").append(divvv);
//                    var pagecount = data.pageCount;                   
//                    page_num($('#yy_pagegps01'), page, pagecount);

//                }
//            }
//            else {
//                // alert(data.errmsg)
//                alert("身份验证失败！");
//                location.href = "index.html";
//            }
//        }
//    });
//}

var usename = $("#am").text();

var sortfield = ''; //升序或者降序的对应字段名
var sort = '';//排序升序或者降序
//排序开始
$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    sortfield = $(this).attr('data-val');  //ip表示获取每一个的表头不同th的值
    //paixu = '';
    if ($(this).hasClass('contor')) {
        sort = 'asc';
    }
    else {
        sort = 'desc';
    }
    GetAllPublishedGoodsInfo(1);
});
//这里结束
$(function () {
    GetAllPublishedGoodsInfo(1);//
});

$(document).on('click', '.query_btn', function () {
    GetAllPublishedGoodsInfo(1);
});
/*
获取请求数据的信息
*/
var usercode = '';
var token = '';
var username = '';
var usertype = '';
//获取URL地址中的参数值
(function () { //获取url的每一个参数名
    //返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var urlParameters = location.search;
    //声明并初始化接收请求参数的对象
    var requestParameters = new Object();
    //如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
    if (urlParameters.indexOf('?') != -1) {
        //获取请求参数的字符串
        var parameters = decodeURI(urlParameters.substr(1));
        //将请求的参数以&分割中字符串数组
        parameterArray = parameters.split('&');
        //循环遍历，将请求的参数封装到请求参数的对象之中
        for (var i = 0; i < parameterArray.length; i++) {
            requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1]);
        }
        
        usercode = requestParameters.Wid;//这里拿到地址栏的usercode 
        token = requestParameters.token;
        username = requestParameters.username;
        usertype = requestParameters.usertype;
    }
    else {
        console.info('There is no request parameters');
    }
    return requestParameters;
})();

function GetAllPublishedGoodsInfo(page) {
    
    //var usercode = localStorage.getItem("usercode");    
    //var token = localStorage.getItem("token");
    
    var search = $('#search_content1').val();
    //var sortfield = 'wordercode'; //升序或者降序的对应字段名
    //var sort = 'desc';//排序升序或者降序
    
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetWork",
        data: {
            "page": page,
            "usercode": usercode,
            "search": search,
            "token": token,
            "sort": sort,
            "sortfield": sortfield,

        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0) {
                var divvv = '';
                if (data.data.length > 0 && data.totalnum > 0) {
                    var usename = $("#am").text();
                    $.each(data.data, function (idx, obj) {
                        divvv += '<tr id="' + idx + '">';   //获取id值
                        divvv += '    <td class="username">' + obj.usercode + '</td>';
                        divvv += '    <td class="password">' + obj.wordercode + '</td>';
                        divvv += '    <td class="password">' + obj.title + '</td>';
                        divvv += '    <td class="position">' + obj.content + '</td>';
                        divvv += '    <td class="position">' + obj.name + '</td>';
                        divvv += '    <td class="position">' + obj.phone + '</td>';
                        if (obj.gdstate == '3') {
                            divvv += '    <td style="color:red;">已完成</td>';
                        } else {
                            divvv += '    <td class="position">进行中</td>';
                        }
                        divvv += '    <td class="position">' + obj.createtime + '</td>';

                        rnnum = obj.rn;
                        if (obj.account == 'admin') {
                            divvv += '    <td></td>';
                        } else {
                            divvv += '    <td>';

                            divvv += '        <a class="shezhi" href="info.html?Wid=' + obj.wordercode + '&username=' + username + '&usercode=' + usercode + '&token=' + token + '&usertype=' + usertype + '" style="margin-left:10px;">详情</a>';
                            divvv += '    </td>';
                            divvv += '</tr>';
                        }
                    });
                    $("#form_tb33").empty();
                    $("#form_tb33").append(divvv);
                    var pagecount = data.pagecount;
                    page_num($('#yy_pagegps01'), page, pagecount);

                }

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}









// 轮询  发送请求给服务端 settimeout   查询是否有新消息派工给技术员
function getRe() {
    //var usercode = localStorage.getItem("usercode");
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
            
           // window.location.href = "admin_info.html?Wid=" + wordercode + '&usercode=' + usercode + '&username=' + username + '&token=' + token;

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
                        window.location.href = "info.html?Wid=" + wordercode + '&usercode=' + usercode + '&username=' + username + '&token=' + token;

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






/************************************* Ajax End *******************************************/












