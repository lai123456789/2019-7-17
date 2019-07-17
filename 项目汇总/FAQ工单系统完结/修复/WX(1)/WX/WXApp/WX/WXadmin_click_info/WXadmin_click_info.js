
var wordercode = GetQueryString("Wid");
onload = function(){
    info_wenti(wordercode);
    info_reply(wordercode);//显示问题回复对话

    //这里拿到工单号
    $("#gongdanhao").next().append('<div class="weui-cell__ft" style="float:right;font-size: 16px;line-height: 50px;">工单号： ' + wordercode + '</div>');
    
}
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
    var wordercode = GetQueryString("Wid");
        $.ajax({
        cache: true,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetDetails",
        async: true,
        data: {
            "wordercode": wordercode,
            "usercode": usercode
        },
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                $.each(data.data, function (idx, obj) {
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
                    var content = '';
                    content += '<div class="weui-cells__title weui-cell__hd" style="text-align: center;">';
                    content += '<span id="gongdan_create_date">管理员查看问题详情页</span>'; // <!-- 这里获取创建工单的日期 -->
                    content += '</div>';
                    content += '<div class="weui-cells">';
                    content += '<div class="weui-cell">';
                    content += '<div class="weui-cell__hd ">';
                    content += '<img src="../img/noavatar_big.gif" alt="" style="margin-top: -60px;display:flex;">';
                    content += '</div>';
                    content += '<div class="weui-cell__bd" >';
                    content += '<p id="" class="weui-cells__title" >工单标题： ' + obj.title + ' </p>'
                    content += '<p id="gongdan_content" class="weui-cells__title" >工单详情： ' + obj.content + ' </p>'; //  <!-- 创建的工单描述内容 -->
                    //content += '<p id="gongdan_picture" class="weui-cells__title" ></p>';// <!-- 这里获取图片 -->
                    content += '<div id="" class="weui-cell__bd list" style="margin-left:25px;"></div>';
                    content += '<p id="gongdan_create_time" class="weui-cells__title"><span class="name">用户名：' + obj.name + '</span></p>';// <!-- 这里获取具体的创建时间 --> 
                    content += '<p id="" class="weui-cells__title">创建时间：' + obj.createtime + '</p>';// <!-- 这里获取具体的创建时间 --> 

                    content += '</div>';
                    content += '</div>';
                    content += '</div>';
                    img = obj.imgurl;  
                    img1 = obj.imgurl1;
                    img2 = obj.imgurl2;
                    
                    $('#WordID').empty();
                    $("#WordID").append(content);
                    $('#gongdan_picture').empty();
                    
                    $('.list').append("<img class='img1' id='xianshi' src=http://o24034e466.qicp.vip/" + img + " alt=''>&nbsp;<img src=http://o24034e466.qicp.vip/" + img1 + " alt=''>&nbsp;&nbsp;<img src=http://o24034e466.qicp.vip/" + img2 + " alt=''>");//data.User+"&nbsp;&nbsp;"+obj.CREATETIME
                    $(document).on('click', '.list img:eq(0)', function () {                        
                        if ($(this).attr('src') !== "http://o24034e466.qicp.vip/") {
                            var a = $(".imgzoom_pack").show();
                            //点击图片之后弹框再一次显示这张图
                            var b = $(".imgzoom_img").append("<img src=http://o24034e466.qicp.vip/" + img + " alt=''>");
                            if (a) {
                                $(".quanbu").hide();
                            }
                        }
                    })
                    $(document).on('click', '.list img:eq(1)', function () {                       
                        if ($(this).attr('src') !== "http://o24034e466.qicp.vip/") {
                            var a = $(".imgzoom_pack").show();
                            //点击图片之后弹框再一次显示这张图
                            var b = $(".imgzoom_img").append("<img src=http://o24034e466.qicp.vip/" + img1 + " alt=''>");
                            if (a) {
                                $(".quanbu").hide();
                            }
                        }
                    })
                    $(document).on('click', '.list img:eq(2)', function () {
                        if ($(this).attr('src') !== "http://o24034e466.qicp.vip/") {
                            var a = $(".imgzoom_pack").show();
                            //点击图片之后弹框再一次显示这张图
                            var b = $(".imgzoom_img").append("<img src=http://o24034e466.qicp.vip/" + img2 + " alt=''>");
                            if (a) {
                                $(".quanbu").hide();
                            }
                        }
                    })



                    $(document).on('click', '.imgzoom_x', function () { //点击X号就显示所有内容
                        $(".quanbu").show();
                    })
                    
                    var a = $(".list img:eq(0)").attr("src");  //判断如果没有图片显示就隐藏
                    var b = $(".list img:eq(1)").attr("src");
                    var c = $(".list img:eq(2)").attr("src");
                    if (a == "http://o24034e466.qicp.vip/") {
                        $(".list img:eq(0)").remove();
                    }
                    if (b == "http://o24034e466.qicp.vip/") {
                        $(".list img:eq(1)").remove();
                    }
                    if (c == "http://o24034e466.qicp.vip/") {
                        $(".list img:eq(2)").remove();
                    }
                    if ($(".list img").length == 1 && $(".list img").attr("src") == "http://o24034e466.qicp.vip/") {
                        $(".list").remove();  //判断如果没有插入图片就删除图片div
                    }

                });  // 这里拿到问题的详情data

                
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
function info_reply(wordercode) {  //把技术员和用户的对话展示出来  data.data2
    var usercode = localStorage.getItem("usercode");
    var wordercode = GetQueryString("Wid");
    $.ajax({
        cache: true,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=getreplypagelistWX",//GetDetails 是PC端分页的
        async: true,
        data: {
            "wordercode": wordercode,
            "usercode": usercode
        },
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) { 
                if (data.data[0] != null) {
                    $.each(data.data, function (idx, obj) {   //这里开始显示问题回复的内容                     
                        var divvv = '';
                        divvv += '<div class="weui-cells__title weui-cell__hd" style="text-align: center;">工单回复</div>';
                        divvv += '<div class="weui-cells">';
                        divvv += '<div class="weui-cell">';
                        divvv += '<div class="weui-cell__hd" >';
                        divvv += '<img src="../img/noavatar_big.gif" alt="">';
                        divvv += '</div>';
                        divvv += '<div class="weui-cell__bd">';
                        divvv += '<p id="reply_content" class="" style="font-size: 15px;margin-left: 1rem;">' + obj.replycontent + '</p>';
                        divvv += '<p id="reply_create_time" class="weui-cells__title">' + obj.replyname + ' &nbsp;' + obj.replytime + '</p>';
                        divvv += '</div>';
                        divvv += '</div>';
                        divvv += '<div class="">';
                        divvv += '</div>';
                        divvv += '</div>';
                        //$('#admin_reply').empty(); //每次循环都清空上一个
                        $('#admin_reply').append(divvv);
                    });
                }
                


            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





function admin_huifu() {   //微信技术员回复问题模块
    var wordercode = GetQueryString("Wid"); //拿到wordercode
    var usertype = localStorage.getItem("usertype");
    var replycontent = $("#admin_reply_input").val();
    var usercode1 = localStorage.getItem("usercode");
    var username = localStorage.getItem("username");    
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
            "content": replycontent,
            "usertype": usertype
        },
        success: function (data) {            
            weui.alert("回复成功！");
            //info_reply(wordercode);
            var wordercode = GetQueryString("Wid");
            //再调用一次 不用刷新 
            //location.href = "WXadmin_click_info.html?Wid=" + wordercode;
            setTimeout(function () {
                window.location.href = "WXadmin_click_info.html?Wid=" + wordercode;
            }, 2000);
            

        }
    });
}
