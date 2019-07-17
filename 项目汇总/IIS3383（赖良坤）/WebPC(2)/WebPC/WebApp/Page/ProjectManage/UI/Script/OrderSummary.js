var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {
        var search = pj;
        全局搜索 = search;
        全局页码 = 1;
        GetUserList("IIS", "ProjectManage.aspx?action=getassemblysummaryinfo", {
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
    GetUserList("IIS", "ProjectManage.aspx?action=getassemblysummaryinfo", {
        "page": 1,
        "search": search
    });
});


$(document).on('click', '#adduserinfo', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
});


//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            var search = $('#search_content').val();
            全局搜索 = search;
            全局页码 = 1;
            GetUserList("IIS", "ProjectManage.aspx?action=getassemblysummaryinfo", {
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
    var pj = $('#add_pj').val();
    var name = $('#add_name').val();
    var flow = $('#add_flow').val();
    var ordernum = $('#add_ordernum').val();

    if (pj == null || pj == '') {
        alert('PJ号不能为空');
        return;
    }
    if (ordernum == null || ordernum == '') {
        alert('订单数量不能为空');
        return;
    }
    if (flow == null || flow == '') {
        alert('流程名称不能为空');
        return;
    }

    AddAssemblyOrderInfo("IIS", "ProjectManage.aspx?action=addassemblysummary", {
        "pj": pj,
        "name": name,
        "flow": flow,
        "ordernum": ordernum,
        "usercode": ""
    });
});


$(document).on('click', '#form_tb .printqr', function () {
    var pj = $(this).attr('data-pj');
    if (confirm("确定打印PJ号：" + pj + '的二维码吗？')) {
        PrintAssemblyQrcodeList('IIS', 'ProjectManage.aspx?action=printassemblyqrcodelist', {
            "pj": pj,
            "usercode": ""
        });
    }
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
                    content += '<td>' + obj.PJ号 + '</td>';
                    content += '<td>' + obj.名称 + '</td>';
                    content += '<td>' + obj.订单数量 + '</td>';
                    content += '<td>';
                    content += '<div style="float: left;margin-right: 3px;">';
                    content += '<div class="progress_white" title="' + obj.未组装明细.replace(/,/g, "") + '">' + obj.未组装 + '</div>';
                    content += '<div class="progress_red" title="' + obj.异常明细.replace(/,/g, "") + '">' + obj.异常 + '</div>';
                    content += '</div>';
                    content += '<div style="float: left;">';
                    content += '<div class="progress_yellow" title="' + obj.进行中明细.replace(/,/g, "") + '">' + obj.进行中 + '</div>';
                    content += '<div class="progress_green"  title="' + obj.完成明细.replace(/,/g, "") + '">' + obj.完成 + '</div>';
                    content += '</div>';
                    content += '</td>';
                    content += '<td>' + obj.下单人 + '</td>';
                    content += '<td>' + obj.下单时间 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="printqr" data-pj="' + obj.PJ号 + '">打印</a>';
                    content += '        <a href="/Page/ProjectManage/OrderHead.html?pj=' + obj.PJ号 + '">详情</a>';
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
获取用户列表
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
                GetUserList("IIS", "ProjectManage.aspx?action=getassemblysummaryinfo", {
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