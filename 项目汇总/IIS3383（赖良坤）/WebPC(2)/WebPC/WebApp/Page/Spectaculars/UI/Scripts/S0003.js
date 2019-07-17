/// <reference path="../../S0004.html" />
/// <reference path="../../S0004.html" />
/// <reference path="../../S0004.html" />
var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportrecord", {});
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

/************************************* Ajax *******************************************/

/*
获取列表
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
                    var 归档流水 = obj.recordcode;
                    var 名称 = obj.recordname;
                    var 创建时间 = obj.createdate;
                    content += '<tr id="tr_' + idx + '">';
                    content += '    <td>' + 归档流水 + '</td>';
                    content += '    <td>' + 创建时间 + '</td>';
                    content += '    <td>';
                    content += '        <a href="S0004.html?recordcode=' + 归档流水 + '" class="edit">查看</a>';
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



/************************************* Ajax End *******************************************/