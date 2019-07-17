var 全局搜索 = '';
var 全局页码 = 1;
var 全局异常分组 = '全部';
var 全局是否启用 = '全部';
$(function () {
    GetDepartmentList("IIS", "BasicData.aspx?action=getdepartmentlist", {});
    var errortype = $('#add_errortype').val();
    GetErrorTypeList('IIS', "BasicData.aspx?action=geterrortypeinfo", {
        "errortype": "",
        "search": ""
    });
})


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



$(document).on('click', '#query_title > .query_content .query_btn', function () {
    var search = $('#search_content').val();
    var errortype = $('#errortype').val();
    var isenable = $('#isenable').val();
    全局搜索 = search;
    全局页码 = 1;
    全局是否启用 = isenable;
    全局异常分组 = errortype;
    GetUserList("IIS", "UserManage.aspx?action=geterrorhandlinguser", {
        "page": 1,
        "search": search,
        "errortype": errortype,
        "isenable": isenable
    });
});


$(document).on('click', '#adduserinfo', function () {
    $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show')
});


//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            var search = $('#search_content').val();
            var errortype = $('#errortype').val();
            var isenable = $('#isenable').val();
            全局搜索 = search;
            全局页码 = 1;
            全局是否启用 = isenable;
            全局异常分组 = errortype;
            GetUserList("IIS", "UserManage.aspx?action=geterrorhandlinguser", {
                "search": search,
                "page": 1,
                "errortype": errortype,
                "isenable": isenable
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {
    var errortypecode = $('#add_errorcategory').val();
    var account = $('#add_account').val();
    var remark = $('#add_remark').val();
    AddErrorHandlingUser("IIS", "UserManage.aspx?action=adderrorhandlinguser", {
        "errortypecode": errortypecode,
        "account": account,
        "remark": remark,
        "operation_usercode":""
    });
});



$(document).on('change', '#add_errortype', function () {
    var errortype = $('#add_errortype').val();
    GetErrorTypeList('IIS', "BasicData.aspx?action=geterrortypeinfo", {
        "errortype": errortype,
        "search": ""
    });
});


/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetUserList(urltype, pageurl, data) {
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
                    content += '<tr id="tr_' + idx + '" data-id="' + obj.id + '">';
                    content += '    <td>' + obj.异常分组 + '</td>';
                    content += '    <td>' + obj.异常类别 + '</td>';
                    content += '    <td>' + obj.用户工号 + '</td>';
                    content += '    <td>' + obj.用户名称 + '</td>';
                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '    <td>' + (obj.是否启用 == "1" ? "启用" : "禁用") + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;">禁用</a>';
                    content += '        <a href="JavaScript:;">删除</a>';
                    content += '    </td>';
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
添加异常处理的用户
*/
function AddErrorHandlingUser(urltype, pageurl, data) {
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
                GetUserList("IIS", "UserManage.aspx?action=geterrorhandlinguser", {
                    "search": 全局搜索,
                    "page": 1,
                    "errortype": 全局异常分组,
                    "isenable": 全局是否启用
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
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
获取异常分类列表
*/
function GetErrorTypeList(urltype, pageurl, data) {
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
                    option += '<option value="' + obj.异常代码 + '">' + obj.异常类别 + '</option>';
                });
                $('#add_errorcategory').empty();
                $('#add_errorcategory').append(option);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/************************************* Ajax End *******************************************/