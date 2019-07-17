
var 全局搜索 = '';
var 全局页码 = 1;

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

//添加用户模态框  同  注册接口
$(document).on('click', '#adduserinfo', function () {  
    $("#AddUserModal_add").draggable();//为模态对话框添加拖拽
    $("#AddUserModal_add").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal_add').modal('show')
});
$(document).on('click', '#add_sure9', function () {
    var username = $('#username').val();
    var pwd = $('#pwd').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    if (username == null || username == "") {
        alert("账号不能为空");
        return;
    };
    if (pwd == null || pwd == "") {
        alert("密码不能为空");
        return;
    };
    if (name == null || name == "") {
        alert("用户名不能为空");
        return;
    };
    if (phone == null || phone == "") {
        alert("电话号码不能为空");
        return;
    };
    add1()
});
function add1() {
    var username = $('#username').val();
    var pwd = $('#pwd').val();
    var name = $('#name').val();
    var phone = $('#phone').val();
    $.ajax({
        cache: false,
        type: "post",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=UpdateUser",
        async: true,
        data: {
            "username": username,
            "pwd": pwd,
            "name": name,
            "phone": phone
        },
        error: function (request) {
        },
        success: function (data) {
            if (data.errcode == 0) {
                alert("添加新用户成功！");
                window.location.href = "admin_user.html";                
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}
/************************************* Ajax *******************************************/

/*
获取用户列表
*/
$(document).ready(function () {   //拿到token的缓存   
    var token = localStorage.getItem("token");
    console.log("token " + token);
    $("#result4").append('<p>' + "token：" + "<input type='text'  name='token' class='s' value='" + token + "'>" + '</p>');
});
$(document).on('click', '.query_btn', function () {
    var token = $(".s").val();
    GetUserList(token);
});

$(function () {
    var token = $(".s").val();
    GetUserList(token);
});
function GetUserList(token) {
    //showLoading();
    var search = $('#search_content1').val();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://o24034e466.qicp.vip/UserManage.aspx?action=GetB",
        data: {
            "token": token,
            "search":search
        },
        async: true,
        error: function (request) {
            //hideLoading();
        },
        success: function (data) {
            //hideLoading();
            if (data.errcode == 0) {
                nextPage(1);
            }
            else {
               // alert(data.errmsg)  //token验证失败
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
                clickbackpage = '<input type="button"  class="btn btn-primary"  value="＜上一页" id="back"  onclick="backPage(' + nowpage + ')" />';
            }
            if ((nowpage >= totalpage)) {
                $(".nextpage").hide();
            } else {
                $(".nextpage").show();
                clicknextpage = '<input type="button" class="btn btn-primary"  value="下一页＞" id="next" onclick="nextPage(' + nowpage + ')" />';

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
    var search = $('#search_content1').val();
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
            "page": nowpage,
            "search":search
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
    var search = $('#search_content1').val();
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
            "page": nowpage,
            "search":search
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

/* 模糊查询开始 */
//$(document).on('click', '.query_btn', function () {
//    var search = $("#search_content1").val();
//    var token = $(".s").val();
//    mohu_select();
//})
//function mohu_select(data, nowpage) {
//    $.ajax({
//        cache: true,
//        type: "POST",
//        url: "http://192.168.2.195:1680/UserManage.aspx?action=GetB",
//        data: {
//            "token": token,
//            "page": nowpage,
//            "search": search
//        },
//        dataType: "json",
//        async: true,
//        error: function (request) {
//            alert("查询失败，请稍候再试");
//        },
//        success: function (data) {
//            console.log(data);
//        }
//    })
//}
/* 模糊查询结束 */



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
                location.href = "admin_user.html";
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
                alert("设置管理员成功！");
                location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





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
    console.log(data);
    console.log(nowpage);

    if (data.data.length > 0) {

        var content = '';
        $.each(data.data, function (idx, obj) {
            content += '<tr id="' + idx + '">';   //获取id值                
            content += '    <td class="wordercode">' + obj.wordercode + '</td>';
            content += '    <td class="usercode">' + obj.usercode + '</td>';
            content += '    <td class="wordtypecode">' + obj.wordtypecode + '</td>';
            content += '    <td class="pcname">' + obj.pcname + '</td>';
            content += '    <td class="apptittle">' + obj.apptittle + '</td>';
            content += '    <td class="content">' + obj.content + '</td>';
            content += '    <td class="name">' + obj.name + '</td>';
            content += '    <td class="phone">' + obj.phone + '</td>';
            content += '    <td class="gdstate">' + obj.gdstate + '</td>';
            content += '    <td class="createtime">' + obj.createtime + '</td>';

            if (obj.account == 'admin') {
                content += '    <td></td>';
            } else {
                content += '    <td>';
                //admin_paigong.html?Bid=' + obj.wordercode + '
                content += '    <a class="paigong" href="#" style="margin-left:10px;">派工</a>';
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
        $('#form_tb').empty();
        $('#form_tb').append(content);

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
    var id = $(this).parents("tr").attr('id');
    wordercode = $('#' + id).find('td.wordercode').text();  //拿到原有数据库的每一个wordercode   
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
    alert("推送成功！！！！");
});
//处理派工接口结束






$(document).on('click', '.wei', function () {
    $("#form_table2").hide();
    $("#form_table1").show();
    wei_paigong(); //调用未派工接口
});
$(document).on('click', '.yi', function () {
    $("#form_table1").hide();
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
    console.log(data);
    console.log(nowpage);

    if (data.data.length > 0) {

        var content = '';
        $.each(data.data, function (idx, obj) {
            content += '<tr id="' + idx + '">';   //获取id值
            content += '    <td class="account">' + obj.wordercode + '</td>';
            content += '    <td class="username">' + obj.usercode + '</td>';
            content += '    <td class="password">' + obj.wordtypecode + '</td>';
            content += '    <td class="password">' + obj.pcname + '</td>';
            content += '    <td class="position">' + obj.apptittle + '</td>';
            content += '    <td class="position">' + obj.content + '</td>';
            content += '    <td class="position">' + obj.name + '</td>';
            content += '    <td class="position">' + obj.phone + '</td>';
            content += '    <td class="position">' + obj.gdstate + '</td>';
            content += '    <td class="position">' + obj.createtime + '</td>';
            //if (obj.nickname != null && obj.nickname != '') {
            //    content += '<td>'
            //    content += '    <img src="' + obj.headimgurl + '" />';
            //    content += '    <span>' + obj.nickname + '</span>';
            //    content += '</td>';
            //}
            if (obj.account == 'admin') {
                content += '    <td></td>';
            } else {
                content += '    <td>';

                content += '        <a class="shezhi" href="#" style="margin-left:10px;">详情</a>';
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
                clickbackpage = '<input type="button" value="＜上一页" id="back"  onclick="backPage3(' + nowpage + ')" />';
            }
            if ((nowpage >= totalpage)) {
                $(".nextpage").hide();
            } else {
                $(".nextpage").show();
                clicknextpage = '<input type="button" value="下一页＞" id="next" onclick="nextPage3(' + nowpage + ')" />';

            }

        }
        $("#now").text(nowpage);
        $('#form_tb2').empty();
        $('#form_tb2').append(content);

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

