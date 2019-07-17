
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

//删除工单
$(document).on('click', '.gongdan_del', function () {
    //var token = localStorage.getItem("token");
    var wordercode = GetQueryString("Wid");
    $.ajax({
        cache: true,
        type: "POST",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=WXDeleteGd",
        data: {
           //"token": token,
            "wordercode": wordercode
        },
        dataType: "json",
        async: true,
        error: function (request) {
            alert("连接失败，请稍候再试");
        },
        success: function (data) {
            if (data.errcode == 0) {
                weui.alert("删除成功!");
                setTimeout(function () {
                    window.location.href = "gongdan_server_info.aspx";
                }, 2000)
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
                    
                    switch (obj.gdstate) {
                        case "1":
                            state = '处理中';
                            $("#del1").hide();
                            break;
                        case "2":
                            state = '待评价';
                            gdstate = obj.gdstate;
                            break;
                        case "3":
                            //state = '已完成';
                            $("#huifu_kuang").remove();   //评价之后 状态改为3  回复框删除
                            $("#queren").remove();  //评价之后 状态改为3  确认框  删除
                            var pingjia = '';   //确认评价了之后   这里改为查看按钮  点击可以查看评价的内容
                            pingjia += '<div class="weui-cell__ft" style="color: blue"><a href="comment_content.aspx?Wid=' + wordercode + '">查看</a></div>  ';
                            $("#chakan").append(pingjia);

                            var shanchu = ''; //确认评价了之后  添加删除按钮  点击可以删除工单
                            shanchu += '<div class="weui-cell">';
                            shanchu += '<div class="weui-cell__bd" style="width:100%;bottom:0;text-align: center;">';
                            shanchu += '<a><span style="text-align: center;color:blue;" class="weui-cells__title gongdan_del">删除工单</span></a>';
                            shanchu += '</div>';
                            shanchu += '</div>';
                            $("#del1").append(shanchu);
                            break;
                    }
                    content += '<div class="weui-cells__title weui-cell__hd" style="text-align: center;">';                   
                    content += '<span id="gongdan_create_date">工单详情</span>'; // <!-- 这里获取创建工单的日期 -->
                    content += '</div>';
                    content += '<div class="weui-cells">';  
                    content += '<div class="weui-cell">';
                    content += '<div class="weui-cell__hd ">';
                    content += '<img src="img/noavatar_big.gif" width="50px" height="50px;" alt="" style="margin-top: -70px;display:flex;">';   
                    content += '</div>';                  
                    content += '<div class="weui-cell__bd" >';
                    content += '<span class="weui-cells__title"> 部门：' + obj.wordtypecode + ' </span>';
                    content += '<p id="" class="weui-cells__title" >工单标题： ' + obj.apptittle + ' </p>'; //  <!-- 创建的工单标题 -->
                    content += '<p id="" class="weui-cells__title" >工单详情： ' + obj.content + ' </p>'; //  <!-- 创建的工单描述内容 -->
                    //content += '<p id="gongdan_picture" class="weui-cells__title" ></p>';// <!-- 这里获取图片 -->
                    content += '<div id="" class="weui-cells__title list"  style="margin-left:25px;" ></div>';
                    content += '<p id="gongdan_create_time" class="weui-cells__title"><span class="name">用户名：' + obj.username + '</span></p>';// <!-- 这里获取username --> 
                    content += '<p id="" class="weui-cells__title" >创建时间： ' + obj.createtime + ' </p>'; //  <!-- 这里获取具体的创建时间 -->

                    content += '</div>';
                    content += '</div>';        
                    content += '</div>';

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

                    var queren = '';
                    queren += '<div class="weui-cell__ft" style="color: blue"><a href="comment.aspx?Wid=' + wordercode + '">确认</a></div>  ';
                    $("#queren").append(queren);  //有数据之后  显示确认按钮

                    var gongdan = '';
                    gongdan += '' + wordercode + '';  //有数据之后  显示工单号                 
                    $("#gd").text(gongdan);

                    
                });
                $('#WordID').empty();
                $('#WordID').append(content);
                
                $('.list').append("<img class='img1' id='xianshi' src=http://o24034e466.qicp.vip/" + img + " alt=''>&nbsp;<img src=http://o24034e466.qicp.vip/" + img1 + " alt=''>&nbsp;&nbsp;<img src=http://o24034e466.qicp.vip/" + img2 + " alt=''>");//data.User+"&nbsp;&nbsp;"+obj.CREATETIME
                $(document).on('click', '.list img:eq(0)', function () {
                    if ($(this).attr('src') !== "http://o24034e466.qicp.vip/") {
                        var a = $(".imgzoom_pack").show();
                        //点击图片之后弹框再一次显示这张图
                        var b = $(".imgzoom_img").append("<img src=http://o24034e466.qicp.vip/" + img + " alt=''>");
                        if (a) {
                            $(".quan").hide();
                        }
                    }
                })
                $(document).on('click', '.list img:eq(1)', function () {
                    if ($(this).attr('src') !== "http://o24034e466.qicp.vip/") {
                        var a = $(".imgzoom_pack").show();
                        //点击图片之后弹框再一次显示这张图
                        var b = $(".imgzoom_img").append("<img src=http://o24034e466.qicp.vip/" + img1 + " alt=''>");
                        if (a) {
                            $(".quan").hide();
                        }
                    }
                })
                $(document).on('click', '.list img:eq(2)', function () {
                    if ($(this).attr('src') !== "http://o24034e466.qicp.vip/") {
                        var a = $(".imgzoom_pack").show();
                        //点击图片之后弹框再一次显示这张图
                        var b = $(".imgzoom_img").append("<img src=http://o24034e466.qicp.vip/" + img2 + " alt=''>");
                        if (a) {
                            $(".quan").hide();
                        }
                    }
                })

                $(document).on('click', '.imgzoom_x', function () { //点击X号就显示所有内容
                    $(".quan").show();
                })
                var a = $(".list img:eq(0)").attr("src");  //判断如果没有图片显示就隐藏
              
                var b = $(".list img:eq(1)").attr("src");
               
                var c = $(".list img:eq(2)").attr("src");
                
                if (a == "http://o24034e466.qicp.vip/") {
                    $(".list img:eq(0)").hide();
                    $(".list").remove();
                }
                if (b == "http://o24034e466.qicp.vip/") {
                    $(".list img:eq(1)").hide();
                }
                if (c == "http://o24034e466.qicp.vip/") {
                    $(".list img:eq(2)").hide();
                }
                //if ($(".list img:eq(0)").length == 0 && $(".list img").attr("src") == "http://o24034e466.qicp.vip/") {
                //    $(".list").remove();  //判断如果没有插入图片就删除图片div
                //}
                
                $('#text').empty();
                $('#text').append(goodsid);
                $('#page1').empty();
                $('#page1').append(data.totalnum);
                $('#count').empty();
                $('#count').append(data.pagecount);


                var state = $("#state").text();
                var ul = document.getElementById("ull");
                //var lis = ul.getElementsByTagName("div");
                //lis[0].style.background = "#ff0042";

                //if (state == "处理中") {
                //    lis[1].style.background = "#ff0042";
                //    $(".comment2").hide();
                //    $(".comment1").hide();
                //}
                //else if (state == "待评价") {
                //    for (var i = 0; i <= 2; i++) {
                //        lis[i].style.background = "#ff0042";
                //    }
                //    $(".comment2").hide();
                //    $(".comment1").show();
                //}
                //else if (state == "已完成") {
                //    for (var i = 0; i <= 3; i++) {
                //        lis[i].style.background = "#ff0042";
                //    }
                //    $(".comment1").hide();
                //    $(".comment2").show();

                //}
                //$("#comment_updata").hide();



            }
            else {
                alert(data.errmsg);
            }

        }
    });
}

//管理员回复问题之后  微信网页显示答复
$(function () {
    aa();
})
function aa() {
$.ajax({
    cache: true,
    type: "POST",
    url: "http://o24034e466.qicp.vip/UserManage.aspx?action=getreplypagelistWX",
    dataType: "json",
    async: true,
    data: {
        "wordercode": wordercode,
        //"page": nowpage
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
                
                //$(".xianshi").show();  
                //管理员回复了之后  微信网页问题回复div 显示
                divvv += '<div class="weui-cells__title weui-cell__hd" style="text-align: center;">工单回复</div>';
                divvv += '<div class="weui-cells">';  
                divvv += '<div class="weui-cell">';
                divvv += '<div class="weui-cell__hd" >';
                divvv += '<img src="img/noavatar_big.gif" width="50px" height="50px" alt="">';    
                divvv += '</div>';                  
                divvv += '<div class="weui-cell__bd">';
                divvv += '<p id="reply_content" class="" style="font-size: 15px;margin-left: 1rem;">' + obj.replycontent + '</p>';
                divvv += '<p id="reply_create_time" class="weui-cells__title">' + obj.replyname + ' </p>';
                divvv += '<p id="" class="weui-cells__title">' + obj.replytime + '</p>';
                divvv += '</div>';            
                divvv += '</div>';
                divvv += '<div class="append_content">';        
                divvv += '</div>';          
                divvv += '</div>';
                
            });
            ////if (gdstate != "3") {
            //$(".huifu").show();
            //huifu += '<div style="width:600px;height:100px;" id="huifu">';   //
            //// huifu += '<textarea class="lowin-input" id="con"></textarea>';  //  qwfwefawegwaeg
            //huifu += '用户回复：&nbsp;<input type="text" id="replycontent" style="width:300px; height:20px;"/>';
            //huifu += '<input type="button" class="btn btn-primary" style="width:50px; height:35px;margin-left:15px;" value="回复"  />';
            //huifu += '</div>';
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
            //$("#now").text(nowpage);
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




////---------------------------回复信息----------------------------------
function replySubmit() {
    var wordercode = GetQueryString("Wid");
    var replycontent = document.getElementById("user_reply_input").value;
    var usercode1 = localStorage.getItem("usercode");
    var username = $("#username").val();
    alert(username);
    if (replycontent == null || replycontent == "") {
        weui.alert("回复内容不能为空！");
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
            weui.alert("回复成功啦！");
            aa();           
            
        }
    });
}


////****************页面控制********************/
//这里开始微信网页分页接口
//function pageControl(data, nowpage) {
//    var rnnum = '';
//    var divvv = '';
//    var huifu = '';
//    var clickbackpage = '';
//    var clicknextpage = '';
//    console.log(data);
//    console.log(nowpage);
//    if (data.data.length > 0) {

//        var content = '';
//        $.each(data.data, function (idx, obj) {
//            content += '<tr id="' + idx + '">';   //获取id值
//            content += '    <td class="usercode">' + obj.usercode + '</td>';
//            content += '    <td class="username">' + obj.username + '</td>';
//            content += '    <td class="name">' + obj.name + '</td>';
//            content += '    <td class="phone">' + obj.phone + '</td>';
//            //content += '    <td class="usertype">' + obj.usertype + '</td>';
//            if (obj.usertype == 1) {
//                content += '    <td class="usertype">普通用户</td>';
//            }
//            if (obj.usertype == 2) {
//                content += '    <td class="usertype">管理员</td>';
//            }
//            if (obj.usertype == 3) {
//                content += '    <td class="usertype">超级管理员</td>';
//            }
//            if (obj.account == 'admin') {
//                content += '    <td></td>';
//            } else {
//                content += '    <td>';
//                content += '        <a class="edit1" href="JavaScript:;" style="margin-left:10px;">编辑</a>';
//                content += '        <a class="del" href="JavaScript:;" style="margin-left:10px;">删除</a>';
//                if (obj.usertype == 1) {
//                    content += '        <a class="shezhi" href="#" style="margin-left:10px;">设置为管理员</a>';
//                }
//                content += '    </td>';
//                content += '</tr>';
//            }
//        });




//        if (data.totalnum > 0) {
//            if (data.totalnum % 10 > 0) {
//                $("#totalpage").text(parseInt(data.totalnum / 10 + 1));
//                totalpage = parseInt(data.totalnum / 10 + 1);
//            } else if (data.totalnum % 10 == 0) {
//                $("#totalpage").text(parseInt(data.totalnum / 10));
//                totalpage = parseInt(data.totalnum / 10);
//            }
//            if (nowpage <= 1) {
//                $(".backpage").hide();
//            } else {
//                $(".backpage").show();
//                clickbackpage = '<input type="button"  class="btn btn-primary"  value="＜上一页" id="back"  onclick="backPage(' + nowpage + ')" />';
//            }
//            if ((nowpage >= totalpage)) {
//                $(".nextpage").hide();
//            } else {
//                $(".nextpage").show();
//                clicknextpage = '<input type="button" class="btn btn-primary"  value="下一页＞" id="next" onclick="nextPage(' + nowpage + ')" />';

//            }

//        }
//        $("#now").text(nowpage);
//        $('#form_tb').empty();
//        $('#form_tb').append(content);

//        $(".backpage").empty();
//        $(".backpage").append(clickbackpage)

//        $(".nextpage").empty();
//        $(".nextpage").append(clicknextpage)
//    }
//}



////****************下一页********************/
//function nextPage(rn) {
//    var token = $(".s").val();
//    var next = $("#next").val();
//    var search = $('#search_content1').val();
//    if (next == null) {
//        var nowpage = 1;
//    } else {
//        if (next != null) {
//            nowpage = rn + 1;
//        }
//    }
//    $.ajax({
//        cache: true,
//        type: "POST",
//        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetB",
//        dataType: "json",
//        async: true,
//        data: {
//            "token": token,
//            "page": nowpage,
//            "search": search
//        },
//        success: function data(data) {
//            if (data.errcode == 0)//提取成功
//            {
//                pageControl(data, nowpage);
//            } else//提取失败
//            {
//                alert(data.errmsg);
//            }

//        },
//    });
//}



////****************上一页********************/
//function backPage(rn) {
//    var token = $(".s").val();
//    var back = $("#back").val();
//    var search = $('#search_content1').val();
//    if (back == null) {
//        var nowpage = 1;
//    } else {
//        if (back != null) {
//            nowpage = rn - 1;
//        }
//    }
//    $.ajax({
//        cache: true,
//        type: "POST",
//        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetB",
//        dataType: "json",
//        async: true,
//        data: {
//            "token": token,
//            "page": nowpage,
//            "search": search
//        },
//        success: function data(data) {
//            if (data.errcode == 0)//提取成功
//            {
//                pageControl(data, nowpage);
//            } else//提取失败
//            {
//                alert(data.errmsg);
//            }

//        },
//    });

//}


