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
//$(function () {
//    $("#pagination_PringPwd").pagination({
//        totalPage: 0,
//        showPageNum: 5,
//        isResetPage: true,
//        isShowPageSizeOpt: false,
//        isShowRefresh: false,
//        callBack: function (currPage) {
//            page = currPage;
//            console.log('currPage:' + currPage + '     pageSize:' + pageSize);
//            GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetAttLogs", {
//                "pageSize": pageSize, //每页显示条数
//                "page": page, //页码
//                "queryField": select_input,//查询字段
//                "queryVal": queryVal, //查询值
//                "sortBy": ip, //排序字段
//                "orderBy": paixu //排序顺序
//            });
//        }
//    });
//});

$(document).on('click', '#form_th_Print > tr > th', function () {
    $(this).toggleClass('contor');
    ip = $(this).attr("data-type");  //ip表示获取每一个的表头不同th的值    
    if ($(this).hasClass('contor')) {
        paixu = 'asc';
    }
    else {
        paixu = 'desc';
    }
    //GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetDeviceConnection", {
       
    //});
});
$(function () {
    GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetDeviceConnection", {
        "flag": "null"
    });
})
//查询信息
$(document).on('click', '.query_content > .query_btn', function () {
    if ($("#select_name").val() == "全部") {  //判断查询字段是否为全部如果为全部传""值，否则传对应的值
        select_input = "";
        queryVal = "";
    } else {
        select_input = $('#select_name option:selected').val();
        queryVal = $('#select_val').val();
    }
    page = 1;
    //GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetDeviceConnection", {
        
    //});
});
/*
导出Excel
*/
$(document).on('click', '.panel-options .download', function () {
    //showLoading();
    //全局页码 = 1;
    //var 文件名 = $('.panel-title').text();
    //var data = {
    //    "pageSize": pageSize,
    //    "page": page,
    //    "queryField": select_input,
    //    "queryVal": queryVal,
    //    "sortBy": ip,
    //    "orderBy": paixu
    //};
    //$('#urltype').val('IIS3738');
    //$('#pageurl').val('AttManage/AttLogs.ashx?action=GetDeviceConnection');
    //$('#data').val(JSON.stringify(data));
    //$('#filename').val(文件名);
    //$('#export_excel').submit();
    //hideLoading();
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
                //console.log(data);
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr>';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 10)) + '</td>';
                    content += '    <td class="data-name5">' + obj.IP + '</td>';
                    content += '    <td class="data-name1">' + obj.端口 + '</td>';
                    if (obj.状态 == 0) {
                        content += '    <td class="td_ratename" >离线</td>';
                    } else {
                        content += '    <td class="td_ratename" >在线</td>';
                    }
                    content += '    <td class="data-name1"><a data-ip=' + obj.IP + ' data-port=' + obj.端口 + ' class="update">修改</a>&nbsp;<a class="del" data-delIP=' + obj.IP + '>删除</a></td>';
                    content += '</tr>';

                });
                $('#form_tb_Print').empty().append(content);
                
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

//添加信息
$(document).on('click', '#adduserinfo', function () {
    $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
    $("#add_IP").val("");
});
$(document).on('click', '#add_sure', function () {
    var IP号 = $("#add_IP").val();
    var 端口号 = $("#add_port").val();
    AddLink("IIS3738", "/AttManage/AttLogs.ashx?action=AddDeviceConnection", {
        ip: IP号,        //ip
        port: 端口号   //端口
    });
});
function AddLink(urltype, pageurl, data) {    
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
                alert("添加成功！");
                GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetDeviceConnection", {
                    "flag": "null"
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


//修改信息
$(document).on('click', '.update', function () {
    $("#UpdateUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#UpdateUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#UpdateUserModal').modal('show');
    var dataip = $(this).attr("data-ip");
    var dataport = $(this).attr("data-port");
    $("#update_OldIp").val(dataip);
    $("#update_IP").val(dataip);
    //$("#Oldupdate_IP").val(dataip);
    $("#update_port").val(dataport);
});
$(document).on('click', '#update_sure', function () {

    var updateIPOld = $("#update_OldIp").val();
    var updateIPnew = $("#update_IP").val();
    var updatePortnew = $("#update_port").val();
    UpdateLink("IIS3738", "/AttManage/AttLogs.ashx?action=AltDeviceConnection", {
        ip: updateIPOld,        //原ip
        newIp: updateIPnew,    //新ip
        port: updatePortnew    //新端口
    });
});
function UpdateLink(urltype, pageurl, data) {
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
                alert("修改成功！");
                GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetDeviceConnection", {
                    "flag": "null"
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

//删除信息
$(document).on('click', '.del', function () {
    $("#DelUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#DelUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#DelUserModal').modal('show'); 
    var delip = $(this).attr("data-delIP");
    $("#del_sure").attr("ip", delip);
});
$(document).on('click', '#del_sure', function () {
    var delIP = $(this).attr("ip");    
    DelLink("IIS3738", "/AttManage/AttLogs.ashx?action=DelDeviceConnection", {
        ip: delIP,        //新ip       
    });
});
function DelLink(urltype, pageurl, data) {
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
                alert("删除成功！");
                GetPrintUserList("IIS3738", "AttManage/AttLogs.ashx?action=GetDeviceConnection", {
                    "flag": "null"
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
