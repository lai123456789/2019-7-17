var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    var taskcode = getQueryString("taskcode");
    var status = getQueryString("status");
    if ((taskcode != null && taskcode != '') || status != null && status != '') {
        GetList("IIS", "TaskManage.aspx?action=getmytasklist", {
            "search": taskcode,
            "usercode": "",
            "status": status
        });
    }
})


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});


/*
查询
*/
$(document).on('click', '#query_title > .query_content > .query_btn', function () {
    var search = $('#search_content').val();
    var statusname = $('#nestable-menu').find('.btn.btn-success').text();
    var status = 2;
    全局搜索 = search;
    switch (statusname) {
        case "进行中":
            status = 0;
            break;
        case "已完成":
            status = 1;
            break;
        default:
            status = 2;
            break;
    }
    GetList("IIS", "TaskManage.aspx?action=getmytasklist", {
        "search": 全局搜索,
        "usercode": "",
        "status": status
    });
});


/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});

$(document).on('click', '#nestable-menu > .btn', function () {
    $(this).addClass('btn-success').removeClass('btn-default').siblings().removeClass('btn-success').addClass('btn-default');
    var statusname = $(this).text();
    switch (statusname) {
        case "进行中":
            status = 0;
            break;
        case "已完成":
            status = 1;
            break;
        default:
            status = 2;
            break;
    }
    GetList("IIS", "TaskManage.aspx?action=getmytasklist", {
        "search": 全局搜索,
        "usercode": "",
        "status": status
    });
});


$(document).on('click', '.dispatching', function () {
    var taskcode = $(this).attr('data-taskcode');
    $('#WorkDispatching').modal('show');
    $('#WorkDispatching_sure').attr('data-taskcode', taskcode);
});

$(document).on('click', '.details', function () {
    var code = $(this).attr('data-code');
    location.href = '/Page/Task/QueryAssemblyErrorInfo.html?code=' + code;
});

$(document).on('click', '#WorkDispatching_sure', function () {
    var account = $('#Work_account').val();
    var taskcode = $(this).attr('data-taskcode');
    TaskDispatching("IIS", "TaskManage.aspx?action=taskdispatching", {
        "taskcode": taskcode,
        "usercode": "",
        "account": account
    });
});


/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetList(urltype, pageurl, data) {
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
                    content += '    <td>' + obj.任务类型 + '</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '    <td>' + obj.开始时间 + '</td>';
                    content += '    <td>' + obj.完成时间 + '</td>';
                    content += '    <td>' + obj.处理异常人员名称 + '</td>';
                    content += '    <td>' + obj.派工时间 + '</td>';
                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>';
                    if (obj.处理异常人员代码 != null && obj.处理异常人员代码 != '') {
                        content += '已派工';
                    } else {
                        content += '        <a href="JavaScript:;" class="dispatching" data-taskcode="' + obj.任务代码 + '">派工</a>';
                    }
                    if (obj.任务类型 == '装配异常') {
                        content += '        <a href="JavaScript:;" class="details" data-code="' + obj.任务类型唯一码 + '" data-taskcode="' + obj.任务代码 + '">查看</a>';
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
接受装配异常任务
*/
function TaskDispatching(urltype, pageurl, data) {
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
                location.reload();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/************************************* Ajax End *******************************************/