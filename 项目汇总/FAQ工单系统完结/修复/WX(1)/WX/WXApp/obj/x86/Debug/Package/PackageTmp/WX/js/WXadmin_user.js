$(function () {
    //var token = localStorage.getItem("token");
    //wode_paigong(token);
    GetAllPublishedGoodsInfo(1)
})


function GetAllPublishedGoodsInfo(page) {
    
    //var search = $('#search_content1').val();
    //var token = localStorage.getItem("token");
    //var usercode = $("#usercode").val();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetB",
        data: {
            //"token": token,
            "page": page,
            
            //"search": search
        },
        async: true,
        error: function (request) {
            
        },
        success: function (data) {
            if (data.errcode == 0) {               
                var content = '';
                $.each(data.data, function (idx, obj) {
                    //content += '<a href="../WXadmin_click_info/WXadmin_click_info.html?Wid=' + obj.usercode + '">'; //点击链接进入详情
                    
                    content += '<div class="weui-cells">';
                    content += '<div class="weui-cell">';
                    content += '<div class="">';
                    content += '<p id="type" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">账号：<span class="username"> ' + obj.username + '</span></p>';
                    
                    content += '</div>';
                   
                    content += '</div>';
                    content += '<div class="">';  //weui-cell 加这个 就有下划线
                    content += '<div class="" id="' + idx + '">';
                    if (obj.usertype == 1) {
                        content += '<p id="status" class="weui-cell__ft">普通用户</p>';  //判断用户类型  填写在右边显示                       
                    }
                    if (obj.usertype == 2) {
                        content += '<p id="status" class="weui-cell__ft">技术员</p>';
                    }
                    if (obj.usertype == 3) {
                        content += '<p id="status" class="weui-cell__ft">超级管理员</p>';
                    }
                    content += '<p id="content" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">联系人：<span class="name">' + obj.name + '</span></p>';
                    
                    content += '<p id="create_time" class="weui-cell__hd weui-cells__title">电话号码：<span class="phone">' + obj.phone + '</span></p>';
                    content += '<span username="' + obj.username + '" class="un"></span>';
                    content += '<span usertype="' + obj.usertype + '" class="ut"></span>';
                    content += '<span usercode="' + obj.usercode + '" class="uc"></span>';  //拿到usercode
                    content += '<span id="bianji"  class="weui-cell__hd weui-cells__title" style="color:red;">编辑</span>';
                    content += '<span id="del"  class="weui-cell__hd weui-cells__title"  style="color:red;">删除</span>';
                 
                    if (obj.usertype == 1) {
                        content += '<a class="guanliyuan weui-cells__title" href="#" data-usertype="2"  style="color:red;">设置为管理员</a>';
                        //content += '<a class="cjguanliyuan weui-cells__title" href="#"  data-usertype="3" style="color:red;">设置为超级管理员</a>';
                    }
                    if (obj.usertype == 2) {
                        content += '<a class="putongyonghu weui-cells__title" href="#"  data-usertype="1" style="color:red;">设置为普通用户</a>';
                        //content += '<a class="cjguanliyuan weui-cells__title" href="#"  data-usertype="3" style="color:red;">设置为超级管理员</a>';
                    }
                    if (obj.usertype == 3) {
                        content += '<a class="putongyonghu weui-cells__title" href="#" data-usertype="1" style="color:red;">设置为普通用户</a>';
                        content += '<a class="guanliyuan weui-cells__title" href="#"  data-usertype="2" style="color:red;">设置为管理员</a>';
                    }
                    content += '</div>';
                    content += '</div>';
                    //content += '</a>';
                });
                $('#tb_account1').empty();
                $('#tb_account1').append(content);
                var pagecount = data.pagecount;
                page_num($('#yy_pagegps01'), page, pagecount);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}
var trid = '';
trid = $(this).parent().attr('id');
$(document).on('click', '#bianji', function () {
    //编辑确定模态框弹出开始
    $('#AddUserModal88').modal('show');
    $(".modal-content").draggable();
    trid = $(this).parent().attr('id');  //拿到每一个对应的id
    var name = $('#' + trid).find('.name').text();  //拿到联系人
    var phone = $('#' + trid).find('.phone').text();  //拿到电话号码
    var username = $('#' + trid).find('.un').attr("username");  //拿到账号
    var usertype = $('#' + trid).find('.ut').attr("usertype"); //拿到用户类型
    $('#three').val(phone); //电话号码
    if (usertype == 1) {
        $('#four').text("普通用户");  //用户类型
    }
    if (usertype == 2) {
        $('#four').text("技术员"); 
    }
    //if (usertype == 3) {
    //    $('#four').text("超级管理员");  
    //}
    
    $("#one").text(username); //账号
    $('#two').val(name); //联系人    
    var usercode = $('#' + trid).find('.uc').attr("usercode"); //拿到usercode
    $('#usercode').text(usercode);
});

$(document).on('click', '#add_sure_edit', function () {                 //编辑确定
    trid = $(this).parent().attr('id');  //拿到每一个对应的id
    var usercode = $('#usercode').text(); //usercode
    var phone = $('#three').val(); //电话号码
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        weui.alert("请输入11位正确的手机号！")
        return false;
    }    
    //$('#four').text();  //用户类型
    //$("#one").text(); //账号
    var name = $('#two').val(); //联系人    
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UpdateU", 
        data: {
            "usercode": usercode,
            "name": name,
            "phone": phone
        },
        async: true,
        error: function (request) {
            //hideLoading();
        },
        success: function (data) {
            //hideLoading();
            if (data.errcode == 0) {
                weui.alert("编辑成功！");
                setTimeout(function(){         	
                location.href = "WXadmin_user.aspx";  //修改之后  还是跳转回这个页面 刷新一遍
                },2000);              

            }

            else {
                alert(data.errmsg)
            }
           
        }
    });
    
});

$(document).on('click', '#del', function () {    //删除确定
    $('#AddUserModal3').modal('show');
    $(".modal-content").draggable();
    trid = $(this).parent().attr('id');
});
$(document).on('click', '#shanchu', function () {
    var usercode = $('#' + trid).find('.uc').attr("usercode");
    $.ajax({
        cache: true,
        type: "get",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=DeleteUser",
        data: {
            "usercode": usercode
            //"usertype": usertype
        },
        async: true,
        error: function (request) {
            //hideLoading();
        },
        success: function (data) {
            //hideLoading();
            if (data.errcode == 0) {
                //GetWordOrderInfo(usercode);
                weui.alert("删除成功！");
                setTimeout(function () {
                    location.href = "WXadmin_user.aspx";  //修改之后  还是跳转回这个页面 刷新一遍
                }, 2000);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
});



//修改用户权限
//$(document).on('click', '.cjguanliyuan', function () {
//    trid = $(this).parent().attr('id');
//    var usercode = $('#' + trid).find('.uc').attr("usercode"); //拿到usercode   
//    var usertype = $('#' + trid).find('a.cjguanliyuan').attr("data-usertype"); //超级管理员
//    GetUpdatetype(usercode, usertype);
//});
$(document).on('click', '.guanliyuan', function () {
    trid = $(this).parent().attr('id');
    var usercode = $('#' + trid).find('.uc').attr("usercode"); //拿到usercode
    
    var usertype = $('#' + trid).find('a.guanliyuan').attr("data-usertype"); //技术员
    
    GetUpdatetype(usercode, usertype);
});
$(document).on('click', '.putongyonghu', function () {
    trid = $(this).parent().attr('id');
    var usercode = $('#' + trid).find('.uc').attr("usercode"); //拿到usercode    
    var usertype = $('#' + trid).find('a.putongyonghu').attr("data-usertype"); //普通用户    
    GetUpdatetype(usercode, usertype);
});
//设置为管理员模块
function GetUpdatetype(usercode, usertype) {
    $.ajax({
        cache: true,
        type: "get",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UserDat",
        data: {
            "usercode": usercode,
            "usertype": usertype
        },
        async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                //GetWordOrderInfo(usercode);
                alert("设置成功！");
                location.href = "WXadmin_user.aspx";  //修改之后  还是跳转回这个页面 刷新一遍
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


    



