var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {
        var search = pj;
        全局搜索 = search;
        全局页码 = 1;
        GetUserList("IIS", "ProjectManage.aspx?action=getassemblyorderinfo", {
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
    GetUserList("IIS", "ProjectManage.aspx?action=getassemblyorderinfo", {
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
            GetUserList("IIS", "ProjectManage.aspx?action=getassemblyorderinfo", {
                "search": search,
                "page": 1
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#form_tb .dispatching', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#WorkDispatching").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#WorkDispatching').modal('show');
    var predicthours = $(this).attr('data-predicthours');
    var account = $(this).attr('data-account');
    var pj = $(this).attr('data-pj');
    var flownum = $(this).attr('data-flownum');
    $('#WorkDispatching_sure').attr('data-pj', pj);
    $('#WorkDispatching_sure').attr('data-flownum', flownum);
    $('#Work_account').val(account);
    $('#Work_predicthours').val(predicthours);
});

$(document).on('click', '#WorkDispatching_sure', function () {
    var pj = $(this).attr('data-pj');
    var flownum = $(this).attr('data-flownum');
    var account = $('#Work_account').val();
    var predicthours = $('#Work_predicthours').val();
    AssemblyDispatching("IIS", "ProjectManage.aspx?action=assemblydispatching", {
        "pj": pj,
        "flownum": flownum,
        "account": account,
        "predicthours": predicthours,
        "operation_usercode": ""
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
                    content += '<tr>';
                    content += '<td>' + obj.PJ号 + '</td>';
                    if (obj.是否异常 == "0") {
                        content += '<td>';
                        content += '<div class="progress_green" title="">正常</div>';
                        content += '</td>';
                    }
                    else {
                        content += '<td>';
                        content += '<div class="progress_red" title="' + obj.异常内容 + '">异常</div>';
                        content += '</td>';
                    }
                    content += '<td>' + obj.名称 + '</td>';
                    content += '<td>' + obj.流程名称 + '</td>';
                    content += '<td>' + obj.负责人名称 + '</td>';
                    content += '<td>' + obj.预计工时 + '</td>';
                    content += '<td>' + obj.工作开始时间 + '</td>';
                    content += '<td>' + obj.工作结束时间 + '</td>';
                    content += '<td>' + obj.工作暂停工时 + '</td>';
                    content += '<td>' + obj.总计工时 + '</td>';
                    content += '<td>' + obj.实际工作工时 + '</td>';
                    content += '<td>' + obj.异常开始时间 + '</td>';
                    content += '<td>' + obj.异常处理人名称 + '</td>';
                    //content += '<td></td>';
                    content += '<td>' + obj.异常处理开始时间 + '</td>';
                    //content += '<td>' + obj.异常处理结束时间 + '</td>';
                    //content += '<td>' + obj.异常处理工时 + '</td>';
                    content += '    <td>';
                    if (!(obj.工作结束时间 != null && obj.工作结束时间 != '')) {
                        if (obj.负责人名称 != null && obj.负责人名称 != '') {
                            content += '        <a href="JavaScript:;" class="dispatching" data-predicthours="' + obj.预计工时 + '" data-account="' + obj.负责人工号 + '" data-pj="' + obj.PJ号 + '" data-flownum="' + obj.流程序号 + '">更换负责人</a>';
                        }
                        else {
                            content += '        <a href="JavaScript:;" class="dispatching" data-predicthours="' + obj.预计工时 + '" data-account="' + obj.负责人工号 + '" data-pj="' + obj.PJ号 + '" data-flownum="' + obj.流程序号 + '">派工</a>';
                        }
                    }
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
工作调度
*/
function AssemblyDispatching(urltype, pageurl, data) {
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
                GetUserList("IIS", "ProjectManage.aspx?action=getassemblyorderinfo", {
                    "search": 全局搜索,
                    "page": 全局页码
                });
                $('#WorkDispatching').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/************************************* Ajax End *******************************************/