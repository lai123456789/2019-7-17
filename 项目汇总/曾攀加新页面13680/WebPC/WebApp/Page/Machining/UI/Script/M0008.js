var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {
        var search = pj;
        全局搜索 = search;
        全局页码 = 1;
        GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getuserskills", {
            "page": 1,
            "search": search
        });
    }
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
    全局搜索 = search;
    全局页码 = 1;
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getuserskills", {
        "page": 1,
        "search": search
    });
});




//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            var search = $('#search_content').val();
            全局搜索 = search;
            全局页码 = 1;
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getuserskills", {
                "search": search,
                "page": 1
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {

    var 用户代码 = $(this).attr('data-usercode');
    var 职能列表 = new Array();
    var obj = $('#flowinfo > tr > td select');
    if (obj != null && obj != '' && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var 职能代码 = $(obj[i]).val();
            var data = { "skillscode": 职能代码 };
            职能列表.push(data);
        }
    }

    AddAssemblyOrderInfo("IIS3676", "BusinessManage/AssemblyManage.aspx?action=setuserskills", {
        "usercode": 用户代码,
        "skills": 职能列表
    });
});


$(document).on('click', '#form_tb .printqr', function () {
    var pj = $(this).attr('data-pj');
    if (confirm("确定打印PJ号：" + pj + '的二维码吗？')) {
        PrintAssemblyQrcodeList('IIS3676', 'ProjectManage.aspx?action=printassemblyqrcodelist', {
            "pj": pj,
            "usercode": ""
        });
    }
});

$(document).on('click', '#flowinfo a.del', function () {
    $(this).parents('tr').remove();
});


$(document).on('click', '#addnewflow', function () {
    var content = '';
    content += '<tr>';
    content += '    <td>';
    content += '        <select>';
    content += '            <option value="F001">组装</option>';
    content += '            <option value="F002">接线</option>';
    content += '            <option value="F003">绒布</option>';
    content += '            <option value="F004">调试</option>';
    content += '            <option value="F005">QA</option>';
    content += '            <option value="F006">打包</option>';
    content += '            <option value="F008">装配仓库入库</option>';
    content += '            <option value="F009">装配仓库领料</option>';
    content += '            <option value="F010">关闭订单</option>';
    content += '        </select>';
    content += '    </td>';
    content += '    <td>';
    content += '        <a href="JavaScript:;" class="del">删除</a>';
    content += '    </td>';
    content += '</tr>';
    $('#flowinfo').append(content)
});


$(document).on('click', '#form_tb > tr > td a.edit', function () {
    var 工号 = $(this).attr('data-account');
    var 用户名 = $(this).attr('data-username');
    var 用户代码 = $(this).attr('data-usercode');
    $('#account').text(工号);
    $('#username').text(用户名);
    var 职能代码 = $(this).attr('data-skillscode');//职能代码
    var 职能代码组 = 职能代码.split(',');
    $('#flowinfo').empty();
    if (职能代码组 != null && 职能代码组 != '' && 职能代码组.length > 0) {

        for (var i = 0; i < 职能代码组.length; i++) {
            var 职能代码 = 职能代码组[i];
            var content = '';
            content += '<tr>';
            content += '    <td>';
            content += '        <select id="skillscode_' + i + '">';
            content += '            <option value="F001">组装</option>';
            content += '            <option value="F002">接线</option>';
            content += '            <option value="F003">绒布</option>';
            content += '            <option value="F004">调试</option>';
            content += '            <option value="F005">QA</option>';
            content += '            <option value="F006">打包</option>';
            content += '            <option value="F008">装配仓库入库</option>';
            content += '            <option value="F009">装配仓库领料</option>';
            content += '            <option value="F010">关闭订单</option>';
            content += '        </select>';
            content += '    </td>';
            content += '    <td>';
            content += '        <a href="JavaScript:;" class="del">删除</a>';
            content += '    </td>';
            content += '</tr>';
            $('#flowinfo').append(content);
            $('#skillscode_' + i).val(职能代码);
        }
    }

    $('#add_sure').attr('data-usercode', 用户代码);
    $("#SetUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');
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
                    content += '<tr>';
                    content += '<td>' + obj.工号 + '</td>';
                    content += '<td>' + obj.用户名 + '</td>';
                    content += '<td>' + obj.部门 + '</td>';
                    content += '<td>' + obj.职务 + '</td>';
                    content += '<td>' + obj.职能 + '</td>';
                    content += '    <td>';
                    content += '        <a class="edit" href="JavaScript:;" data-account="' + obj.工号 + '" data-username="' + obj.用户名 + '" data-usercode="' + obj.用户代码 + '" data-skillscode="' + obj.职能代码 + '">编辑</a>';
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
添加装配信息
*/
function AddAssemblyOrderInfo(urltype, pageurl, data) {
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
                GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getuserskills", {
                    "search": 全局搜索,
                    "page": 全局页码
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
打印二维码
*/
function PrintAssemblyQrcodeList(urltype, pageurl, data) {
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
                alert('提交打印指令发送成功');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/************************************* Ajax End *******************************************/