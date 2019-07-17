var 全局搜索 = '';
var 全局页码 = 1;
var 全局字段 = '';
var 全局排序 = '';
var page = 1;
var paixu = '';
var ip = ''; 
var select_input = '';//查询字段
var queryVal = ''; //查询值字段
var pageSize = 20;//每页显示条数
//分页
$(function () {
    $("#pagination_PringPwd").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage) {
            page = currPage;
            console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetAttLogs", {                
                "pageSize": pageSize, //每页显示条数
                "page": page, //页码
                "queryField": select_input,//查询字段
                "queryVal": queryVal, //查询值
                "sortBy": ip, //排序字段
                "orderBy": paixu //排序顺序
            });
        }
    });
});

$(document).on('click', '#form_th_Print > tr > th', function () {
    $(this).toggleClass('contor');
    ip = $(this).attr("data-type");  //ip表示获取每一个的表头不同th的值    
    if ($(this).hasClass('contor')) {
        paixu = 'asc';
    }
    else {
        paixu = 'desc';
    }
    GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetAttLogs", {
        "pageSize": pageSize, //页面尺寸
        "page": page, //页码
        "queryField": select_input,//查询字段
        "queryVal": queryVal, //查询值
        "sortBy": ip, //排序字段
        "orderBy": paixu //排序顺序
    });
});
$(function () {
    GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetAttLogs", {
        "pageSize": pageSize, //每页显示条数
        "page": page, //页码
        "queryField": select_input,//查询字段
        "queryVal": queryVal, //查询值
        "sortBy": ip, //排序字段
        "orderBy": paixu //排序顺序
    });
})
//点击查询
$(document).on('click', '.query_content > .query_btn', function () {
    if ($("#select_name").val() == "全部") {  //判断查询字段是否为全部如果为全部传""值，否则传对应的值
        select_input = "";
        queryVal = "";
    } else {
        select_input = $('#select_name option:selected').val();
        queryVal = $('#select_val').val();
    }
    page = 1;
    GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetAttLogs", {       
        "pageSize": pageSize, 
        "page": page,
        "queryField": select_input,
        "queryVal": queryVal,
        "sortBy": ip, 
        "orderBy": paixu 
    });
});
/*
导出Excel
*/
$(document).on('click', '.panel-options .download', function () {
    showLoading();
    全局页码 = 1;
    var 文件名 = $('.panel-title').text();
    var data = {
        "pageSize": pageSize,
        "page": page,
        "queryField": select_input,
        "queryVal": queryVal,
        "sortBy": ip,
        "orderBy": paixu
    };
    $('#urltype').val('IIS3738');
    $('#pageurl').val('AttManage/AttLogs.ashx?action=GetAttLogs');
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});
/*开启表格【全屏放大】模态窗口  只支持谷歌浏览器*/
$(document).on('click', '.panel-options .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});
function GetPrintUserList(urltype, pageurl, data) {   
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
                    content += '<tr>';
                    //content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 10)) + '</td>';
                    content += '    <td class="data-name5">' + obj.序号 + '</td>';
                    content += '    <td class="td_ratename" >' + obj.工号 + '</td>';
                    content += '    <td class="data-name1">' + obj.姓名 + '</td>';
                    content += '    <td class="data-name2">' + obj.部门 + '</td>';
                    content += '    <td class="data-name3">' + obj.职位 + '</td>';
                    content += '    <td class="data-name4">' + obj.时间 + '</td>';                   
                    content += '</tr>';

                });
                $('#form_tb_Print').empty().append(content);
                var pagecount = data.pagecount;  //总页码
                var totalnum = data.totalnum;    //总数据 多少条            
                $("#pagination_PringPwd").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




//查询框开始
$(document).on('change', '#select_name', function () {
    var 类型二 = $(this).val();
    if (类型二 == '全部') {
        $('#select_val').hide();
    } else {
        if (类型二 == "C.Account") {
            $('#select_val').attr('placeholder', '请输入工号');
            $('#select_val').val("");
        } else if (类型二 == "C.username") {
            $('#select_val').attr('placeholder', '请输入姓名');
            $('#select_val').val("");

        }
        
        $('#select_val').show();
    }
});

//查询框结束


