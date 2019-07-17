
var 全局搜索 = '';
var 全局页码 = 1;
//$(function () {
//    GetDepartmentList("IIS", "BasicData.aspx?action=getdepartmentlist", {});
//})


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {

    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});



//$(document).on('click', '#query_title > .query_content .query_btn', function () {
//    var search = $('#search_content').val();
//    全局搜索 = search;
//    全局页码 = 1;
//    GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
//        "page": 1,
//        "search": search
//    });
//});


$(document).on('click', '#adduserinfo', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show')
});






/************************************* Ajax *******************************************/



//****************页面控制********************/
function pageControl(data, nowpage) {
    var rnnum = '';
    var divvv = '';
    var huifu = '';
    var clickbackpage = '';
    var clicknextpage = '';
    
    if (data.data.length > 0) {

        var content = '';
        $.each(data.data, function (idx, obj) {
            content += '<tr id="' + idx + '">';   //获取id值
            content += '    <td class="usercode">' + obj.usercode + '</td>';
            content += '    <td class="username">' + obj.username + '</td>';
            content += '    <td class="name">' + obj.name + '</td>';
            content += '    <td class="phone">' + obj.phone + '</td>';
            //content += '    <td class="usertype">' + obj.usertype + '</td>';
            if (obj.usertype == 1) {
                content += '    <td class="usertype">普通用户</td>';
            }
            if (obj.usertype == 2) {
                content += '    <td class="usertype">管理员</td>';
            }
            if (obj.usertype == 3) {
                content += '    <td class="usertype">超级管理员</td>';
            }
            if (obj.account == 'admin') {
                content += '    <td></td>';
            } else {
                content += '    <td>';
                content += '        <a class="edit1" href="JavaScript:;" style="margin-left:10px;">编辑</a>';
                content += '        <a class="del" href="JavaScript:;" style="margin-left:10px;">删除</a>';
                if (obj.usertype == 1) {
                    content += '        <a class="shezhi" href="#" style="margin-left:10px;">设置为管理员</a>';
                }
                content += '    </td>';
                content += '</tr>';
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
        $('#form_tb').empty();
        $('#form_tb').append(content);

        $(".backpage").empty();
        $(".backpage").append(clickbackpage)

        $(".nextpage").empty();
        $(".nextpage").append(clicknextpage)
    }
}



//****************下一页********************/
function nextPage(rn) {
    var token = $(".s").val();
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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetB",
        dataType: "json",
        async: true,
        data: {
            "token": token,
            "page": nowpage
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
    var token = $(".s").val();
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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetB",
        dataType: "json",
        async: true,
        data: {
            "token": token,
            "page": nowpage
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



$(function () {
    var Wid = GetQueryString("Wid");
})

////获取URL地址中的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}



var trid = '';
$(document).on('click', '#form_tb > tr > td > a.del', function () {    //删除模态框弹出
    $('#AddUserModal3').modal('show');
    $(".modal-content").draggable();
    trid = $(this).parents("tr").attr('id');
});
$(document).on('click', '#shanchu', function () {
    var usercode = $('#' + trid).find('td.usercode').text();
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
                alert("删除成功！！！");
            }
            else {
                alert(data.errmsg)
            }
        }
    });
});

$(document).on('click', '.edit1', function () {                 //编辑确定模态框弹出开始
    $('#AddUserModal88').modal('show');
    $(".modal-content").draggable();
    trid = $(this).parents("tr").attr('id');
    var usercode = $('#' + trid).find('td.usercode').text();
    var username = $('#' + trid).find('td.username').text();
    var name = $('#' + trid).find('td.name').text();
    var phone = $('#' + trid).find('td.phone').text();
    $('#usercodea').text(usercode);
    $('#usernamea').text(username);
    $('#namea').val(name);
    $('#phonea').val(phone);
});
$(document).on('click', '#add_sure2', function () {    //
    //拿到所有编辑的值
    var usercode = $('#usercodea').text();
    //var username = $('#usernamea').text();
    var name = $('#namea').val();
    var phone = $('#phonea').val();
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
                alert("修改成功！！");
                location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            }
            else {
                alert(data.errmsg)
            }
        }
    });

});
//编辑确定模态框弹出结束

$(document).on('click', '.shezhi', function () {
    var id = $(this).parents('tr').attr('id');
    var usercode = $('#' + id).find('td.usercode').text();
    //alert(usercode);
    GetUpdatetype(usercode);
});

//设置为管理员模块
function GetUpdatetype(usercode) {
    //var usertype = localStorage.getItem("usertype");
    //alert(usertype + "," + usercode);
    $.ajax({
        cache: true,
        type: "get",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UserDat",
        data: {
            "usercode": usercode,
            //"usertype":usertype
        },
        async: true,
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                //GetWordOrderInfo(usercode);
                alert("成功！！！");
                location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

//var trid = '';

//$(document).on('click', '#form_tb > tr > td > a.del', function () {    //删除模态框弹出
//    $('#AddUserModal3').modal('show');
//    $(".modal-content").draggable();
//    trid = $(this).parents("tr").attr('id');
//    $(this).parents('tr').remove(); //删除一行
//    alert(trid);
//});
//$(document).on('click', '#shanchu', function () {

//    var usercode = $('#' + trid).find('td.usercode').text();
//    alert(usercode);
//    $.ajax({
//        cache: true,
//        type: "get",
//        dataType: "json",
//        url: "http://192.168.2.195:1680/UserManage.aspx?action=DeleteUser",
//        data: {
//            "usercode": usercode
//            //"usertype": usertype
//        },
//        async: true,
//        error: function (request) {
//            //hideLoading();
//        },
//        success: function (data) {
//            //hideLoading();
//            //if (data.errcode == 0) {
//            //    GetWordOrderInfo(usercode);

//            //}
//            //else {
//            //    alert(data.errmsg)
//            //}
//        }
//    });
//});


$(function () {

})


function wei_paigong() {   //未派工接口
    $(".nextpage").empty();
    $(".backpage").empty();
    nextPage2(1);
}

//****************页面控制********************/
function pageControl2(data, nowpage) {
    var rnnum = '';
    var divvv = '';
    var huifu = '';
    var clickbackpage = '';
    var clicknextpage = '';
    

    if (data.data.length > 0) {

        var content = '';
        var content1 = '';
        $.each(data.data, function (idx, obj) {
            //content += '<tr id="' + idx + '">';   //获取id值                
            //content += '    <td class="wordercode">' + obj.wordercode + '</td>';
            //content += '    <td class="usercode">' + obj.usercode + '</td>';
            //content += '    <td class="pcname">' + obj.pcname + '</td>';
            //content += '    <td class="content">' + obj.content + '</td>';
            //content += '    <td class="gdstate">' + obj.gdstate + '</td>';
            //这里
            //content += '    <td class="wordtypecode">' + obj.wordtypecode + '</td>';
            //content += '    <td class="apptittle">' + obj.apptittle + '</td>';
            //content += '    <td class="name">' + obj.name + '</td>';
            //content += '    <td class="phone">' + obj.phone + '</td>';
            //content += '    <td class="createtime">' + obj.createtime + '</td>';
            //content += '    <td><a class="paigong" href="#" style="margin-left:10px;">派工</a></td>';这里
            //if (obj.account == 'admin') {
            //    content += '    <td></td>';
            //} else {
            //    content += '    <td>';
            //    //admin_paigong.html?Bid=' + obj.wordercode + '
            //    content += '    <a class="paigong" href="#" style="margin-left:10px;">派工</a>';
            //    content += '    </td>';
                //content += '</tr>';
            //}
                                //这里开始展示微信模式网页    
                content1 += '<div class="weui-cells" id="wei">';  
                content1 += '<div class="weui-cell">'; //工单编号
                content1 += '<div class="weui-cell__bd">'; //创建时间
                content1 += '<p id="type" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">部门：' + obj.wordtypecode + '</p>';//工单类型
                content1 += '</div>';
                content1 += '<p class="weui-cell__ft paigong" style="color: red;"><span class="weui-badge weui-badge_dot"></span>派工</p>';
                content1 += '</div>';
                content1 += '<div class="weui-cell">';
                content1 += '<div class="weui-cell__hd"><img src=""></div>';
                content1 += '<div class="weui-cell__bd idx" id="' + idx + '">';
                content1 += '<p id="content" class="weui-cells__title weui-cell__hd" style="font-size: 16px;"></p>';
                content1 += '<p id="" class="weui-cell__hd weui-cells__title"></p>';
                content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单号：<span class="wordercode">' + obj.wordercode + '</span></p>';
                content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单标题：' + obj.apptittle + '</p>';//工单标题
                content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单内容：' + obj.content + '</p>';
                content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">联系人：' + obj.name + '</p>';
                content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">联系方式：' + obj.phone + '</p>';
                content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单创建时间：' + obj.createtime + '</p>';
                content1 += '</div>';
                content1 += '</div>';  //这里开始展示微信模式网页结束
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
                clickbackpage = '<input type="button" value="＜上一页" id="back"  onclick="backPage2(' + nowpage + ')" />';
            }
            if ((nowpage >= totalpage)) {
                $(".nextpage").hide();
            } else {
                $(".nextpage").show();
                clicknextpage = '<input type="button" value="下一页＞" id="next" onclick="nextPage2(' + nowpage + ')" />';

            }

        }
        $("#now").text(nowpage);
        //$('#form_tb').empty(); 
        //$('#form_tb').append(content);
        $('.content_WX').empty();
        $('.content_WX').append(content1);

        $(".backpage").empty();
        $(".backpage").append(clickbackpage)

        $(".nextpage").empty();
        $(".nextpage").append(clicknextpage)
    }
}


//****************下一页********************/
function nextPage2(rn) {
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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetList",
        dataType: "json",
        async: true,
        data: {
            "page": nowpage
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                pageControl2(data, nowpage);
            } else//提取失败
            {
                alert(data.errmsg);
            }

        }
    });
}



//****************上一页********************/
function backPage2(rn) {
    var token = $(".s").val();
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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetList",
        dataType: "json",
        async: true,
        data: {
            "page": nowpage
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                pageControl2(data, nowpage);
            } else//提取失败
            {
                alert(data.errmsg);
            }

        },
    });

}



//处理派工接口开始

$(function () {
    var Bid = GetQueryString("Bid");
    user_paigong(Bid);
})
function user_paigong(wordcode) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetUser",
        //data: {
        //    "urltype": urltype,
        //    "pageurl": pageurl,
        //    "data": JSON.stringify(data)
        //},
        async: true,
        error: function (request) {
        },
        success: function (data) {

            if (data.errcode == 0) {
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr id="' + idx + '">';   //获取id值
                    content += '    <td class="account"></td>';
                    content += '    <td class="usercode">' + obj.usercode + '</td>';
                    content += '    <td class="username"><input type="checkbox" name="name" value="' + obj.username + '" >' + obj.username + '</input></td>';
                    content += '    <td class="name">' + obj.name + '</td>';
                    content += '</tr>';

                });
                $('.tt').empty();
                $('.tt').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

var wordercode = ""; //全局变量
$(document).on('click', '.paigong', function () {
    $('#AddUserModal5').modal('show');
    $(".modal-content").draggable();
    var id = $(this).parent().next().find(".idx").attr('id');
    wordercode = $('#' + id).find('.wordercode').text();  //拿到原有数据库的每一个wordercode   
    user_paigong();
})


$(document).on('click', '#add_sure5', function () {
    var lis = $(this).parents().find(".tt > tr").find('input:checkbox:checked');  //拿到每一个username 工号
    $.each(lis, function () {
        var username = $(this).val();//循环拿到所有的工号值
        $.ajax({
            cache: true,
            type: "POST",
            dataType: "json",
            url: "http://o24034e466.qicp.vip/UserManage.aspx?action=addDispatching",
            data: {
                "wordcode": wordercode,
                "username": username
            },
            async: true,
            error: function (request) {
            },
            success: function (data) {
                if (data.errcode == 0) {

                    wei_paigong();
                }
                else {
                    alert(data.errmsg)
                }
            }
        });
    });
    weui.alert("派工成功！");
});
//处理派工接口结束






$(document).on('click', '.wei', function () {
    $("#wei").show();
    $(".paigong_page").show();
    $("#yi").hide();  //点击未派工 隐藏已派工
    wei_paigong(); //调用未派工接口
});
$(document).on('click', '.yi', function () {
    $("#wei").hide();  //点击已派工 隐藏未派工
    $(".paigong_page").show();
    $("#form_table2").show();
    yi_paigong();//调用已派工接口
});

//****************页面控制********************/
function pageControl3(data, nowpage) {
    var rnnum = '';
    var divvv = '';
    var huifu = '';
    var clickbackpage = '';
    var clicknextpage = '';
    

    if (data.data.length > 0) {

        var content = '';
        var content1 = '';
        $.each(data.data, function (idx, obj) {
            //content += '<tr id="' + idx + '">';   //获取id值
            //content += '    <td class="account">' + obj.wordercode + '</td>';
            //content += '    <td class="username">' + obj.usercode + '</td>';
            //content += '    <td class="password">' + obj.wordtypecode + '</td>';
            //content += '    <td class="password">' + obj.pcname + '</td>';
            //content += '    <td class="position">' + obj.apptittle + '</td>';
            //content += '    <td class="position">' + obj.content + '</td>';
            //content += '    <td class="position">' + obj.name + '</td>';
            //content += '    <td class="position">' + obj.phone + '</td>';
            //if (obj.gdstate = 1) {
            //    content += '    <td class="position" style="color:red;">待处理中</td>';
            //} else {
            //    content += '    <td class="position">已完成</td>';
            //}
            //content += '    <td class="position">' + obj.createtime + '</td>';
            ////if (obj.nickname != null && obj.nickname != '') {
            ////    content += '<td>'
            ////    content += '    <img src="' + obj.headimgurl + '" />';
            ////    content += '    <span>' + obj.nickname + '</span>';
            ////    content += '</td>';
            ////}
            //if (obj.account == 'admin') {
            //    content += '    <td></td>';
            //} else {
            //    //  content += '    <td>';
            //    //  content += '        <a class="shezhi" href="#" style="margin-left:10px;">详情</a>';
            //    //  content += '    </td>';
            //    content += '</tr>';
            //}

            content1 += '<div class="weui-cells" id="yi">';      //已派工页
            content1 += '<div class="weui-cell">'; //工单编号
            content1 += '<div class="weui-cell__bd">'; //创建时间
            content1 += '<p id="type" class="weui-cells__title weui-cell__hd" style="font-size: 16px;">部门：' + obj.wordtypecode + '</p>';//工单类型
            content1 += '</div>';
            if (obj.gdstate = 1) {
                content1 += '<p id="status" class="weui-cell__ft" style="color: red;"><span class="weui-badge weui-badge_dot"></span>待处理中</p>';

            } else {
                content1 += '<p id="status" class="weui-cell__ft" style="color: red;"><span class="weui-badge weui-badge_dot"></span>已完成</p>';

            }
            content1 += '</div>';
            content1 += '<div class="weui-cell">';
            content1 += '<div class="weui-cell__hd"><img src=""></div>';
            content1 += '<div class="weui-cell__bd" id="' + idx + '">';
            content1 += '<p id="content" class="weui-cells__title weui-cell__hd" style="font-size: 16px;"></p>';
            content1 += '<p id="" class="weui-cell__hd weui-cells__title"></p>';
            content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单号：' + obj.wordercode + '</p>';
            content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单标题：' + obj.apptittle + '</p>';//工单标题
            content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单内容：' + obj.content + '</p>';
            content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">联系人：' + obj.name + '</p>';
            content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">联系方式：' + obj.phone + '</p>';
            content1 += '<p id="create_time" class="weui-cell__hd weui-cells__title">工单创建时间：' + obj.createtime + '</p>';
            content1 += '</div>';
            content1 += '</div>';

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
                clickbackpage = '<input type="button" value="＜上一页" id="back"  onclick="backPage3(' + nowpage + ')" />';
            }
            if ((nowpage >= totalpage)) {
                $(".nextpage").hide();
            } else {
                $(".nextpage").show();
                //clicknextpage = '<div class="button-sp-area">';    
                //clicknextpage = '<a href="javascript:;" id="next" onclick="nextPage3(' + nowpage + ')" class="weui-btn weui-btn_mini weui-btn_primary">按钮下一页</a>';
                //clicknextpage = '</div>';
                clicknextpage = '<input type="button" value="下一页＞" id="next" onclick="nextPage3(' + nowpage + ')" />';

            }

        }
        $("#now").text(nowpage);
        $('#form_tb2').empty();
        $('#form_tb2').append(content);

        $('.content_WX_yi').empty();
        $('.content_WX_yi').append(content1);

        $(".backpage").empty();
        $(".backpage").append(clickbackpage)

        $(".nextpage").empty();
        $(".nextpage").append(clicknextpage)
    }
}

//****************下一页********************/
function nextPage3(rn) {
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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetListYes",
        dataType: "json",
        async: true,
        data: {
            "page": nowpage
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                pageControl3(data, nowpage);
            } else//提取失败
            {
                alert(data.errmsg);
            }

        }
    });
}



//****************上一页********************/
function backPage3(rn) {
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
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetListYes",
        dataType: "json",
        async: true,
        data: {
            "page": nowpage
        },
        success: function data(data) {
            if (data.errcode == 0)//提取成功
            {
                pageControl3(data, nowpage);
            } else//提取失败
            {
                alert(data.errmsg);
            }

        },
    });

}

function yi_paigong() {   //已派工接口
    $(".nextpage").empty();
    $(".backpage").empty();
    nextPage3(1);
}
//function deleteItem(item) {                          
//    if (confirm("确定要删除吗？")) {
//        var id = $(item).closest("tr").data("id");
//        var data = "";
//        data += "id=" + id;
//        $.ajax({
//            url: 'http://192.168.2.195:1680/api/property/delete',        //json接口获取
//            type: "get",
//            dataType: "json",
//            cache: false,
//            xhrFields: {
//                withCredentials: true
//            },
//            beforeSend: function () { },
//            complete: function () { },
//            data: data,
//            success: function (result) {
//                if (result.code == 200) {
//                    alert(result.msg);
//                    var tr = $(item).closest("tr");
//                    tr.remove();
//                }
//            }
//        });
//    }
//}

/*
获取用户列表
*/
//function AddUserInfo(urltype, pageurl, data) {
//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Api/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": JSON.stringify(data)
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            hideLoading();
//            if (data.errcode == 0) {
//                GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
//                    "search": 全局搜索,
//                    "page": 全局页码
//                });
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}



///*
//获取部门列表
//*/
//function GetDepartmentList(urltype, pageurl, data) {
//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Api/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": JSON.stringify(data)
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            hideLoading();
//            if (data.errcode == 0) {
//                var option = '';
//                $.each(data.data, function (idx, obj) {
//                    option += '<option data-departmentname="' + obj.departmentname + '" data-departmentcode="' + obj.departmentcode + '" value="' + obj.departmentcode + '">' + obj.departmentname + ' （' + obj.departmentcode + '）' + '</option>';
//                });
//                $('#add_department').empty();               
//                $('#add_department').append(option);
//                $('#add_department2').append(option);
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}

/************************************* Ajax End *******************************************/
