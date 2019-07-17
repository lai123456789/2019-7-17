var 全局页码 = 1;
var 全局字段 = '';
var 全局排序 = '';
var onetype = '';
var oneval = '';
var twotype = '';
var twoval = '';
var fourtype = '';
var fourval = '';
var datetype = '';
var startdate = '';
var enddate = '';
var numbertype = '';
$(function () {
    GetDepartmentList("IIS", "BasicData.aspx?action=getdepartmentlist", {});

    GetRoleList("IIS", "AuthorityManage.aspx?action=getrolelist", {
        "page": 1
    });


    TableSetingBtn("itb000003", function () {
        var th_content = '';
        th_content += '<tr>';
        th_content += '<th style="width:45px;">序号</th>';
        for (var i = 0; i < 表格字段列表.length; i++) {
            if (表格字段列表[i].是否显示 == '1') {
                th_content += '<th data-val="' + 表格字段列表[i].字段名 + '" style="width:' + (表格字段列表[i].宽度大小 == "0" ? "-1" : 表格字段列表[i].宽度大小) + 'px;">' + 表格字段列表[i].别名 + '<i class="iconfont">&#xe733;</i></th>';
            }
        }
        th_content += '</tr>';
        $('#form_th').empty();
        $('#form_th').append(th_content)
        $('.query_btn').click();
    });
});


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {

    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();

    全局页码 = 1;
    var 文件名 = $('.panel-title').text();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "fourtype": fourtype,
        "fourval": fourval,
        "page": 1,
        "sortfield": 全局字段,
        "sort": 全局排序
    };
    $('#urltype').val('IIS');
    $('#pageurl').val('UserManage.aspx?action=excelgetuserlist');
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});



$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    twoval = $('#twoval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    全局页码 = 1;
    GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序
    });
});


$(document).on('click', '#adduserinfo', function () {
    $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show')
});






$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});

$(document).on('click', '#set_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {
    var account = $('#add_account').val();
    var username = $('#add_username').val();
    var password = $('#add_password').val();
    var department = $('#add_department').val();
    var position = $('#add_position').val();
    var sex = $('#add_sex > .label.label-default.contor').text();
    var birthday = $('#add_birthday').val();
    var address = $('#add_address').val();
    var phonenumber = $('#add_phonenumber').val();
    var hiredate = $('#add_hiredate').val();
    var idnumber = $('#add_idnumber').val();
    var idkey = $('#add_idkey').val();
    if (account == null || account == '') {
        alert('账号不能为空');
        return;
    }
    AddUserInfo("IIS", "UserManage.aspx?action=adduserinfo", {
        "account": account,
        "username": username,
        "password": password,
        "department": department,
        "position": position,
        "sex": sex,
        "birthday": birthday,
        "address": address,
        "phonenumber": phonenumber,
        "hiredate": hiredate,
        "idnumber": idnumber,
        "idkey": idkey
    });
});


$(document).on('click', '#form_tb > tr > td > a.edit', function () {
    var usercode = $(this).attr('data-usercode');
    $('#set_sure').attr('data-usercode', usercode);
    var obj_tr = $(this).parents('tr');

    var account = $(obj_tr).find('.td_account').text();
    var username = $(obj_tr).find('.td_username').text();
    var password = $(obj_tr).find('.td_password').text();
    var department = $(obj_tr).find('.td_department').attr('data-departmentcode');
    var position = $(obj_tr).find('.td_position').text();
    var sex = $(obj_tr).find('.td_sex').text();
    var birthday = $(obj_tr).find('.td_birthday').text();
    var address = $(obj_tr).find('.td_address').text();
    var phonenumber = $(obj_tr).find('.td_phonenumber').text();
    var hiredate = $(obj_tr).find('.td_hiredate').text();
    var idnumber = $(obj_tr).find('.td_idnumber').text();
    var idkey = $(obj_tr).find('.td_idkey').text();

    $('#set_account').val(account);
    $('#set_username').val(username);
    $('#set_password').val(password);
    $('#set_department').val(department);
    $('#set_position').val(position);
    if (sex == "男") {
        $('#set_sex > .label.label-default:eq(0)').addClass('contor').siblings().removeClass('contor');
    } else {
        $('#set_sex > .label.label-default:eq(1)').addClass('contor').siblings().removeClass('contor');;
    }
    $('#set_birthday').val(birthday);
    $('#set_address').val(address);
    $('#set_phonenumber').val(phonenumber);
    $('#set_hiredate').val(hiredate);
    $('#set_idnumber').val(idnumber);
    $('#set_idkey').val(idkey);

    $("#SetUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');

});


$(document).on('click', '#form_tb > tr > td > a.binduser', function () {
    var usercode = $(this).attr('data-usercode');
    GetBindQRCode("IIS3380", "WXQRManage.aspx?action=createtmpqrcode", {
        "usercode": usercode
    });
});



$(document).on('click', '#BindUserinfo_sure', function () {
    $('BindUserinfo').modal('hide');
});

$(document).on('click', '#set_sure', function () {
    var usercode = $(this).attr('data-usercode');
    if (usercode == null || usercode == '') {
        alert('未选中用户');
        return;
    }
    var account = $('#set_account').val();
    var username = $('#set_username').val();
    var password = $('#set_password').val();
    var department = $('#set_department').val();
    var position = $('#set_position').val();
    var sex = $('#set_sex > .label.label-default.contor').text();
    var birthday = $('#set_birthday').val();
    var address = $('#set_address').val();
    var phonenumber = $('#set_phonenumber').val();
    var hiredate = $('#set_hiredate').val();
    var idnumber = $('#set_idnumber').val();
    var idkey = $('#set_idkey').val();
    if (account == null || account == '') {
        alert('账号不能为空');
        return;
    }
    SetUserInfo("IIS", "UserManage.aspx?action=setuserinfo", {
        "account": account,
        "username": username,
        "password": password,
        "department": department,
        "position": position,
        "sex": sex,
        "birthday": birthday,
        "address": address,
        "phonenumber": phonenumber,
        "hiredate": hiredate,
        "idnumber": idnumber,
        "idkey": idkey,
        "usercode": usercode
    });
});

$(document).on('click', '#form_tb > tr > td > a.del', function () {
    var usercode = $(this).attr('data-usercode');
    var username = $(this).attr('data-username');
    if (confirm("确定要删除用户“" + username + "”的信息吗？")) {
        DelUserInfo("IIS", "UserManage.aspx?action=deluserinfo", {
            "usercode": usercode
        });
    }
});



$(document).on('click', '#form_tb > tr > .td_rolename', function () {
    var usercode = $(this).attr('data-usercode');
    var rolecode = $(this).attr('data-rolecode');
    $('#JoinRole').modal('show');

    $('#JoinRole_sure').attr('data-usercode', usercode);
    $('#JoinRole_sure').attr('data-rolecode', rolecode);
    
});


$(document).on('click', '#JoinRole_sure', function () {
    var usercode = $(this).attr('data-usercode');
    var rolecode = $('#rolelist').val(); 
    JoinRole("IIS", "UserManage.aspx?action=joinrole", {
        "usercode": usercode,
        "rolecode": rolecode
    });
});



$(document).on('change', '#datetype', function () {
    var 时间类型 = $(this).val();
    if (时间类型 == '全部') {
        $('#datetype_date').hide();
    }
    else {
        $('#datetype_date').show();
    }
});

$(document).on('change', '#onetype', function () {
    var 类型一 = $(this).val();
    if (类型一 == '全部') {
        $('#oneval').hide();
    }
    else {
        $('#oneval').attr('placeholder', '请输入' + 类型一);
        $('#oneval').show();
    }
});

$(document).on('change', '#twotype', function () {
    var 类型二 = $(this).val();
    if (类型二 == '全部') {
        $('#twoval').hide();
    }
    else {
        $('#twoval').attr('placeholder', '请输入' + 类型二);
        $('#twoval').show();
    }
});


$(document).on('change', '#fourtype', function () {
    var 类型四 = $(this).val();
    if (类型四 == '全部') {
        $('#fourval').hide();
    }
    else {
        $('#fourval').attr('placeholder', '请输入' + 类型四);
        $('#fourval').show();
    }
});


$(function () {
    $("#pagination_9").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#twoval').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            fourtype = $('#fourtype').val();
            fourval = $('#fourval').val();
            全局页码 = currPage;
            GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "twoval": twoval,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序
            }, 全局页码);
        }
    });
});




$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    全局字段 = $(this).attr('data-val');
    全局排序 = '';
    if ($(this).hasClass('contor')) {
        全局排序 = 'desc';
    }
    else {
        全局排序 = 'asc';
    }
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    twoval = $('#twoval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序
    }, 全局页码);
});



$(document).on('click', '#import_btn', function () {
    $('#fileval').click();
});


$(document).on('change', '#fileval', function () {
    TableImport("IIS", "UserManage.aspx?action=importdata");
});

/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetUserList(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr id="tr_' + idx + '">';
                    content += '    <td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 25)) + '</td>';

                    for (var z = 0; z < 表格字段列表.length; z++) {
                        if (表格字段列表[z].是否显示=="1") {
                            switch (表格字段列表[z].字段名) {
                                case "操作":
                                    if (obj.account == 'admin') {
                                        content += '    <td></td>';
                                    } else {
                                        content += '    <td>';
                                        content += '        <a href="JavaScript:;" class="edit" data-usercode="' + obj.用户代码 + '">编辑</a>';
                                        content += '        <a href="JavaScript:;" class="del"  data-usercode="' + obj.用户代码 + '" data-username="' + obj.姓名 + '">删除</a>';
                                        content += '    </td>';
                                    }
                                    break;
                                case "工号":
                                    content += '    <td class="td_account">' + obj.工号 + '</td>';
                                    break;
                                case "姓名":
                                    content += '    <td class="td_username">' + obj.姓名 + '</td>';
                                    break;
                                case "部门":
                                    content += '    <td class="td_department" data-departmentcode="' + obj.部门代码 + '">' + obj.部门名称 + '</td>';
                                    break;
                                case "职务":
                                    content += '    <td class="td_position">' + obj.职务 + '</td>';
                                    break;
                                case "IC高频卡号":
                                    content += '    <td class="td_idnumber">' + obj.ic高频卡号 + '</td>';
                                    break;
                                case "IC超高频卡号":
                                    content += '    <td class="td_idkey">' + obj.ic超高频卡号 + '</td>';
                                    break;
                                case "密码":
                                    content += '    <td class="td_password">' + obj.密码 + '</td>';
                                    break;
                                case "性别":
                                    content += '    <td class="td_sex">' + obj.性别 + '</td>';
                                    break;
                                case "生日":
                                    content += '    <td class="td_birthday">' + obj.生日 + '</td>';
                                    break;
                                case "地址":
                                    content += '    <td class="td_address">' + obj.地址 + '</td>';
                                    break;
                                case "手机号码":
                                    content += '    <td class="td_phonenumber">' + obj.手机号码 + '</td>';
                                    break;
                                case "角色权限":
                                    if (obj.角色代码 == null || obj.角色代码 == '') {
                                        content += '    <td class="td_rolename" data-usercode="' + obj.用户代码 + '" data-rolecode="' + obj.角色代码 + '">';
                                        content += '        <a href="JavaScript:;" class="joinrole">加入角色</a>';
                                        content += '    </td>';
                                    }
                                    else {
                                        content += '    <td class="td_rolename" data-usercode="' + obj.用户代码 + '" data-rolecode="' + obj.角色代码 + '">' + obj.角色名称 + '</td>';
                                    }
                                    break;
                                case "绑定微信":
                                    if (obj.绑定微信 != null && obj.绑定微信 != '') {
                                        content += '<td class=td_wx>'
                                        content += '    <img src="' + obj.微信头像 + '" />';
                                        content += '    <span>' + obj.绑定微信 + '</span>';;
                                        content += '</td>';
                                    } else {
                                        content += '<td>';
                                        content += '    <a href="JavaScript:;" class="binduser" data-usercode="' + obj.用户代码 + '">未绑定</a>';
                                        content += '</td>';
                                    }
                                    break;
                                case "门禁卡号":
                                    content += '    <td class="td_entranceno">' + obj.门禁卡号 + '</td>';
                                    break;
                                case "入职日期":
                                    content += '    <td class="td_hiredate">' + obj.入职日期 + '</td>';
                                    break;
                            }
                        }
                    }
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;

                $("#pagination_9").pagination('setPage', parseFloat(page), parseFloat(pagecount));

                
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取绑定二维码
*/
function GetBindQRCode(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                $('#binduserqrcode img').attr('src', data.url);
                $('#BindUserinfo').modal('show');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
获取用户列表
*/
function AddUserInfo(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                alert('添加成功');
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                twoval = $('#twoval').val();
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                全局页码 = 1;
                GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
设置用户列表
*/
function SetUserInfo(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                $('#SetUserModal').modal('hide');
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                twoval = $('#twoval').val();
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                全局页码 = 1;
                GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
删除用户列表
*/
function DelUserInfo(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                alert('删除成功');
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                twoval = $('#twoval').val();
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                全局页码 = 1;
                GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取部门列表
*/
function GetDepartmentList(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
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
                var option = '';
                $.each(data.data, function (idx, obj) {
                    option += '<option value="' + obj.departmentcode + '">' + obj.departmentname + ' （' + obj.departmentcode + '）' + '</option>';
                });
                $('#add_department').empty();
                $('#add_department').append(option);

                $('#set_department').empty();
                $('#set_department').append(option);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}








/*
获取角色列表
*/
function GetRoleList(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
        },
        success: function (data) {
            var content = '';
            if (data.errcode == 0) {
                $.each(data.data, function (idx, obj) {
                    content += '<option value="' + obj.角色代码 + '">' + obj.角色名称 + '</option>';
                });
                $('#rolelist').empty();
                $('#rolelist').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取角色列表
*/
function JoinRole(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
        },
        success: function (data) {
            var content = '';
            if (data.errcode == 0) {
                $('#JoinRole').modal('hide');
                onetype = $('#onetype').val();
                oneval = $('#oneval').val();
                twotype = $('#twotype').val();
                twoval = $('#twoval').val();
                datetype = $('#datetype').val();
                startdate = $('#startdate').val();
                enddate = $('#enddate').val();
                numbertype = $('#numbertype').val();
                全局页码 = 1;
                GetUserList("IIS", "UserManage.aspx?action=getuserlist", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "twotype": twotype,
                    "twoval": twoval,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "numbertype": numbertype,
                    "page": 全局页码,
                    "sortfield": 全局字段,
                    "sort": 全局排序
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
请求数据
*/
function TableImport(urltype, pageurl) {
    var formdata = new FormData();
    var fileObj = document.getElementById("fileval").files;
    formdata.append("file1", fileObj[0]);
    formdata.append("urltype", urltype);
    formdata.append("pageurl", pageurl);
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=tableimport",
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        data: formdata,
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert('导入成功：' + data.success + '条,失败：' + data.failure + '条');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/************************************* Ajax End *******************************************/