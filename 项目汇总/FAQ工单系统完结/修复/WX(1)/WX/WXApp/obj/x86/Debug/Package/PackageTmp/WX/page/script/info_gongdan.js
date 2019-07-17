//获取用户名
$(function () {
    var username = localStorage.getItem("username");
    $("#info_gongdan_user").text(username);
})
//注销 
$(document).on('click', '#layout11', function () {
    layout11();
});
function layout11() {
    // var usercode = localStorage.getItem("usercode");
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=LogoutUser",
        // async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("注销成功！");
                window.location.href = "index.html";

            }
            else {
                alert(data.errmsg);
            }
        }
    });
};


var wordercode = GetQueryString("Wid");
$(function () {
    
    GetInfoWordOrder(wordercode);
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

//删除工单和评价
$(document).on('click', '#delete', function () {
    //var wordercode = Wid;
    var token = localStorage.getItem("token");
    var wordercode = $(".wordercode").text();
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=DeleteGd",
        data: {
            "token": token,
            "wordercode": wordercode
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("删除成功!!!");
                //GetInfoWordOrder(wordercode);
                window.location.href = "gongdan_list.html";
            }
        }
    });
});

$(document).on('click', '.updata', function () {

    var attitude = $(".fuwu").text();
    var functiongn = $(".item11").text();
    var content = $(".liuyan").text();
    $("#appraise-textarea").text(content);
    $("#comment_sure").hide();
    $("#comment_updata").show();
    $(".comment2").hide();
    $(".comment1").show();

});

//修改评价
$(document).on('click', '#comment_updata', function () {
    var attitude = document.getElementById("attitude").value;
    var functiongn = document.getElementById("function").value;
    var content = document.getElementById("appraise-textarea").value;
    //var wordercode = Wid;
    //var wordercode = GetQueryString("Wid");
    var wordercode = $(".wordercode").text();
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UpdateAssess",
        data: {
            "wordercode": wordercode,
            "attitude": attitude,
            "function": functiongn,
            "content": content
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            //if (data.errcode == 0) {
                alert("修改成功！！！");
                GetInfoWordOrder(wordercode);
                //window.location.href = "info_gongdan.html";
            //}
        }
    });
});

//确认评价
$(document).on('click', '#comment_sure', function () {
    $("#huifu").remove();   //点击确认评价  隐藏回复的框
    $(".huifu > div#huifu").hide();
    var attitude = document.getElementById("attitude").selectedIndex;
    var functiongn = document.getElementById("function").selectedIndex;
    var content = document.getElementById("appraise-textarea").value;
    //var attitude = $("#attitude option:selected").text();
    //var functiongn = $("#function option:selected").val();
    //var content = document.getElementById("appraise-textarea").value;
    //var wordercode = Wid;
    //alert("Wid=" + Wid);
    //var wordercode = GetQueryString("Wid");
    var wordercode = $(".wordercode").text();
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=evaluatecreate",
        data: {
            "wordercode": wordercode,
            "attitude": attitude,
            "function": functiongn,
            "content": content
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0) {
                GetInfoWordOrder(wordercode);
                //window.location.href = "info_gongdan.html";
            }
        }
    });
});


/****************************************** Ajax *********************************************/
// var usercode = localStorage.getItem("usercode");





/*
获取请求数据的信息
*/
function GetInfoWordOrder(wordercode) {
   // $(".huifu > div#huifu").hide(); //回复框div删除
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=lookworkorder",
        data: {
            "wordercode": wordercode
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == "#code#") {
                var totalpage = '';
                var goodsid = '';
                var content = '';
                var username = '';
                var time = '';
                var state = '';
                $.each(data.data1, function (idx, obj) {
                    content += '<p class="info-title">工单信息</p>';
                    content += '<ul class="workOrder-info-list clear">';
                    content += ' <li class="left">';
                    content += '    <span style="margin-left:-58px;">工单编号：</span><span class="wordercode">' + obj.wordercode + '</span>';
                    content += ' </li>';
                    content += ' <li>';
                    switch (obj.gdstate) {
                        case "1":
                            state = '处理中';
                            break;
                        case "2":
                            state = '待评价';
                            gdstate = obj.gdstate;
                            break;
                        case "3":
                            state = '已完成';
                            //gdstate = obj.gdstate;
                            break;
                    }
                    content += '    <span>工单状态：</span><span class="red" id="state">' + state + '</span>';
                    content += ' </li>';
                    content += ' <li class="left">';
                    content += '    <span>创建时间：</span><span class="value"> ' + obj.createtime + ' </span>';
                    content += ' </li>';
                    content += ' <li>';
                    content += '     <span>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品：</span><span class="value"> ' + obj.wordtypecode + ' </span>';
                    content += ' </li>';
                    content += '</ul>';
                    time = obj.createtime;
                    username = obj.username;
                    goodsid += ' <span style="float:left;">' + obj.content + '</span>';
                    img = obj.imgurl;  //拿到图片值路径  这里只拿到一个图片  obj.imgurl1  obj.imgurl2  还没拿
                    img1 = obj.imgurl1;
                    img2 = obj.imgurl2;
                    $(".fuwu").text(obj.attitude);
                    $(".item11").text(obj.function);
                    $('.liuyan').empty();
                    $(".liuyan").text(obj.content1);

                });

                $('#WordID').empty();
                $('#WordID').append(content);
                $('#fl').empty();                
                $('#fl').append(username + "<span class=\"time\">" + time + "</span><br/><img src=http://o24034e466.qicp.vip/" + img + " alt=' '>&nbsp;<img src=http://o24034e466.qicp.vip/" + img1 + " alt=' '>&nbsp;&nbsp;<img src=http://o24034e466.qicp.vip/' + img2 + '  alt=' ' />");//data.User+"&nbsp;&nbsp;"+obj.CREATETIME
                //$('#fl').append(username + "<span class=\"time\">" + time + "</span><br/>");
                //$("#fl > img").attr("src", "http://192.168.2.195:1680/" + " " + img + "  ");
                $('#text').empty();
                $('#text').append(goodsid);
                $('#page1').empty();
                $('#page1').append(data.totalnum);
                $('#count').empty();
                $('#count').append(data.pagecount);
                

                var state = $("#state").text();
                var ul = document.getElementById("ull");
                var lis = ul.getElementsByTagName("div");
                lis[0].style.background = "#ff0042";

                if (state == "处理中") {
                    lis[1].style.background = "#ff0042";
                    $(".comment2").hide();
                    $(".comment1").hide();
                }
                else if (state == "待评价") {
                    for (var i = 0; i <= 2; i++) {
                        lis[i].style.background = "#ff0042";
                    }
                    $(".comment2").hide();
                    $(".comment1").show();
                }
                else if (state == "已完成") {
                    for (var i = 0; i <= 3; i++) {
                        lis[i].style.background = "#ff0042";
                    }
                    $(".comment1").hide();
                    $(".comment2").show();
                    
                }
                $("#comment_updata").hide();



                if (data.data2.length> 0) {
                    nextPage(1);
                }

            }
            else {
                alert(data.errmsg);
            }
           
        }
    });
}

//window.onload = function () {
//    var a = $('#fl > img');
//    for (var i = 0;i < a.length; i++) {
//        (a[i].onerror = function () {
//            a[i].style.display = 'none';
//        })(); //注意这里的写法。形如(function(){...})()，这是js里的一种特殊写法，很有效。
//    }
//}

//---------------------------回复信息----------------------------------
function replySubmit() {
    var wordercode = $(".wordercode").text();
    var replycontent = document.getElementById("replycontent").value;
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
            "content": replycontent
            //"Wid": Wid,
        },
        success: function (data) {
           // GetWordOrderInfo(wordercode);
            alert("回复成功！！");
            nextPage(0);   //这里再调用一次 页码转换   不用刷新显示
        }
    });
}
//下一页

function nextPage(rn) {
    var next = $("#next").val();
    if (next == null) {
        var nowpage = 1;
    } else {
        if (parseInt(rn) % 2 == 0) {
            nowpage = parseInt(rn / 2);
        } else if (parseInt(rn) % 2 > 0) {
            nowpage = parseInt(rn / 2) + 1;
        }
        if (next != null) {
            nowpage = nowpage + 1;
        }
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=getreplypagelist",
        dataType: "json",
        async: true,
        data: {
            "wordercode": wordercode,
            "page": nowpage
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                var rnnum = '';
                var divvv = '';
                var huifu = '';
                var clickbackpage = '';
                var clicknextpage = '';
                $.each(data.data, function (idx, obj) {
                    $(".xianshi").show();  //管理员回复了之后  问题回复div 显示
                    divvv += '<div class="work-order-section reply-section" style="margin-bottom: 0; border-radius: 5px 5px 0 0; -webkit-border-radius: 5px 5px 0 0;">';
                    divvv += ' <p class="title" style="border: none;text-align: left;" id="replyname">问题回复</p>';
                    divvv += ' </div>';
                    rnnum = obj.rn;//获取行号
                    divvv += ' <div class="work-order-section reply-section" style="border-radius: 0 0 5px 5px; -webkit-border-radius: 0 0 5px 5px; border-top: none;">';
                    divvv += ' <div class="item-box clear">';
                    divvv += '<div class="img-item fl">';
                    divvv += '  <img src="img/noavatar_big.gif" width="48" height="48">';
                    divvv += ' </div>';
                    divvv += ' <div class="text-item">';
                    divvv += ' <p class="sub-til clear">';
                    divvv += ' <span class="fl">' + obj.replyname + '</span><span class="time">';
                    divvv += ' ' + obj.replytime + '<!-- 这里获取系统回复的时间  -->';
                    divvv += ' </span>';
                    divvv += ' </p>';
                    divvv += ' <div class="text">' + obj.replycontent + '</div>';
                    divvv += ' </div>';
                    divvv += ' </div>';
                    divvv += ' </div>';

                });
                //if (gdstate != "3") {
                $(".huifu").show();
                huifu += '<div style="width:600px;height:100px;" id="huifu">';   //
               // huifu += '<textarea class="lowin-input" id="con"></textarea>';  //  qwfwefawegwaeg
                huifu += '用户回复：&nbsp;<input type="text" id="replycontent" style="width:300px; height:20px;"/>';
                huifu += '<input type="button" class="btn btn-primary" style="width:50px; height:35px;margin-left:15px;" value="回复" onclick="replySubmit()" />';
                huifu += '</div>';
                //}

                if (data.totalnum > 0) {
                    if (data.totalnum % 2 > 0) {
                        $("#totalpage").text(parseInt(data.totalnum / 2 + 1));
                        totalpage = parseInt(data.totalnum / 2 + 1);
                    } else if (data.totalnum % 2 == 0) {
                        $("#totalpage").text(parseInt(data.totalnum / 2));
                        totalpage = parseInt(data.totalnum / 2);
                    }
                    if (rnnum <= 2) {
                        $(".backpage").hide();
                    } else {
                        $(".backpage").show();
                        clickbackpage = '<input type="button" value="＜上一页" id="back"  onclick="backPage(' + rnnum + ')" />';
                    }
                    if ((rnnum >= totalpage * 2) || (rnnum >= (totalpage * 2) - 1)) {
                        $(".nextpage").hide();
                    } else {
                        $(".nextpage").show();
                        clicknextpage = '<input type="button" value="下一页＞" id="next" onclick="nextPage(' + rnnum + ')" />';

                    }

                }
                $("#now").text(nowpage);
                $('#dd').empty();
                $('#dd').append(divvv);

                $('.huifu').empty();
                $('.huifu').append(huifu);

                $(".backpage").empty();
                $(".backpage").append(clickbackpage)

                $(".nextpage").empty();
                $(".nextpage").append(clicknextpage)

            } else//提取失败
            {
                alert(data.errmsg);
            }

        }
    });
}
//上一页
function backPage(rn) {
    var back = $("#back").val();
    if (back == null) {
        var nowpage = 1;
    } else {
        if (parseInt(rn) % 2 == 0) {
            nowpage = parseInt(rn / 2);
        } else if (parseInt(rn) % 2 > 0) {
            nowpage = parseInt(rn / 2) + 1;
        }
        if (back != null) {
            nowpage = nowpage - 1;
        }
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=getreplypagelist",
        dataType: "json",
        async: true,
        data: {
            "wordercode": wordercode,
            "page": nowpage
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                var rnnum = '';
                var divvv = '';
                var huifu = '';
                var clickbackpage = '';
                var clicknextpage = '';
                $.each(data.data, function (idx, obj) {
                    $(".xianshi").show();  //管理员回复了之后  问题回复div 显示
                    divvv += '<div class="work-order-section reply-section" style="margin-bottom: 0; border-radius: 5px 5px 0 0; -webkit-border-radius: 5px 5px 0 0;">';
                    divvv += ' <p class="title" style="border: none;text-align: left;" id="replyname">问题回复</p>';
                    divvv += ' </div>';
                    rnnum = obj.rn;//获取行号
                    divvv += ' <div class="work-order-section reply-section" style="border-radius: 0 0 5px 5px; -webkit-border-radius: 0 0 5px 5px; border-top: none;">';
                    divvv += ' <div class="item-box clear">';
                    divvv += '<div class="img-item fl">';
                    divvv += '  <img src="img/noavatar_big.gif" width="48" height="48">';
                    divvv += ' </div>';
                    divvv += ' <div class="text-item">';
                    divvv += ' <p class="sub-til clear">';
                    divvv += ' <span class="fl">' + obj.replyname + '</span><span class="time">';
                    divvv += ' ' + obj.replytime + '<!-- 这里获取系统回复的时间  -->';
                    divvv += ' </span>';
                    divvv += ' </p>';
                    divvv += ' <div class="text">' + obj.replycontent + '</div>';
                    divvv += ' </div>';
                    divvv += ' </div>';
                    divvv += ' </div>';

                });
                if (data.totalnum > 0) {
                    if (data.totalnum % 2 > 0) {
                        $("#totalpage").text(parseInt(data.totalnum / 2 + 1));
                        totalpage = parseInt(data.totalnum / 2 + 1);
                    } else if (data.totalnum % 2 == 0) {
                        $("#totalpage").text(parseInt(data.totalnum / 2));
                        totalpage = parseInt(data.totalnum / 2);
                    }
                    if (rnnum <= 2) {
                        $(".backpage").hide();
                    } else {
                        $(".backpage").show();
                        clickbackpage = '<input type="button" value="＜上一页" id="back"  onclick="backPage(' + rnnum + ')" />';
                    }
                    if ((rnnum >= totalpage * 2) || (rnnum >= (totalpage * 2) - 1)) {
                        $(".nextpage").hide();
                    } else {
                        $(".nextpage").show();
                        clicknextpage = '<input type="button" value="下一页＞" id="next" onclick="nextPage(' + rnnum + ')" />';

                    }

                }
                $("#now").text(nowpage);
                $('#dd').empty();
                $('#dd').append(divvv);

                $(".backpage").empty();
                $(".backpage").append(clickbackpage)

                $(".nextpage").empty();
                $(".nextpage").append(clicknextpage)

            } else//提取失败
            {
                alert(data.errmsg);
            }

        }
    });

}

