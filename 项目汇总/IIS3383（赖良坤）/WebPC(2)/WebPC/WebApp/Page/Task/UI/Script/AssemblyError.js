var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    var errorcode = getQueryString("errorcode");
    if (errorcode != null && errorcode != '') {
        GetList("IIS", "TaskManage.aspx?action=getassemblyerrortask", {
            "errorcode": errorcode
        });
        LookAssemblyErrorTask("IIS", "TaskManage.aspx?action=lookassemblyerrortask", {
            "errorcode": errorcode,
            "usercode":""
        });
    }
    
})


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});


$(document).on('click', '.taskaccept', function () {
    var taskcode = $(this).attr('data-taskcode');
    var errorcode = $(this).attr('data-errorcode');
    AcceptAssemblyErrorTask("IIS", "TaskManage.aspx?action=acceptassemblyerrortask", {
        "errorcode": errorcode,
        "usercode": ""
    },taskcode);
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
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
                    content += '    <td>' + obj.pj号 + '</td>';
                    content += '    <td>' + obj.项目名称 + '</td>';
                    content += '    <td>' + obj.异常分组 + '</td>';
                    content += '    <td>' + obj.异常类别 + '</td>';
                    content += '    <td>' + obj.异常开始时间 + '</td>';
                    content += '    <td>' + obj.异常原因 + '</td>';
                    content += '    <td>';
                    if (obj.负责人用户代码 != null && obj.负责人用户代码 != '') {
                        content += obj.负责人用户名称 + '已接受';
                    } else {
                        content += '        <a class="taskaccept" href="JavaScript:;" data-taskcode="' + obj.任务代码 + '" data-errorcode="' + obj.异常代码 + '">接受</a>';
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





function LookAssemblyErrorTask(urltype, pageurl, data) {
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
            
        }
    });
}

/*
接受装配异常任务
*/
function AcceptAssemblyErrorTask(urltype, pageurl, data,taskcode) {
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
            if (data.errcode == 0) {
                location.href = '/Page/Task/MyTastList.html?status=2&&taskcode=' + taskcode;
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/************************************* Ajax End *******************************************/