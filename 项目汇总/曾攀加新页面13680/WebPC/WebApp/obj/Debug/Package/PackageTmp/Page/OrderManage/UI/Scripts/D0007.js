var 全局搜索 = '';
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
var PORT = "IIS3380";
var drawingcode = '';
var URL = "AdvanceOrder.aspx?action=";
var currPage = "";
$(function () {
    currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    RequestData('IIS3380', '/AdvanceOrder.aspx?action=GetMaterialsDrawingPJ', {
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "page": currPage,
        "pagesize": 25,
        "sortfield": 全局字段,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "sort": 全局排序
    }, currPage);

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
    }, taskcode);
});

$(document).on('click', '#form_tb > tr > td > a.del', function () {
    drawingcode = $(this).attr('data-drawingcode');
    
    $("#AddUserModal2 > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal2").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal2').modal('show')
});

$(document).on('click', '#cause_sure2', function () {
    添加PJ号(PORT, URL + "DrawingAddPJ", {
        "usercode": "",
        "pj": $('#cause').val(),
        "drawingcode": drawingcode
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
function AcceptAssemblyErrorTask(urltype, pageurl, data, taskcode) {
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



/*
请求数据
*/
function RequestData(urltype, pageurl, data, page) {
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
                //var 总订单数 = data.totalnum;
                //var 订单未完成数 = data.figurenumber;
                //var 欠发货数 = data.owedelivery;
                //var 需发货总数 = data.sumdelivery;
                //var 进度1 = parseFloat(parseFloat(parseFloat(订单未完成数) / parseFloat(总订单数)) * 100).toFixed(2);
                //$('#progress1').empty();
                //var 进度条1 = '';
                //进度条1 += '<div class="progress progress-striped active">';
                //进度条1 += '    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="' + 进度1 + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + 进度1 + '%">';
                //进度条1 += '        <span class="sr-only">' + 订单未完成数 + ' / ' + 总订单数 + '</span>';
                //进度条1 += '    </div>';
                //进度条1 += '</div>';
                //$('#progress1').append(进度条1);
                //$('#progress1').attr('title', '待完成订单：' + 进度1 + '%');


                ////var 进度2 = parseFloat(parseFloat(parseFloat(欠发货数) / parseFloat(需发货总数)) * 100).toFixed(2);
                //$('#progress2').empty();
                //var 进度条2 = '';
                //进度条2 += '<div class="progress progress-striped active">';
                //进度条2 += '    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + 进度2 + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + 进度2 + '%">';
                //进度条2 += '        <span class="sr-only">' + 欠发货数 + ' / ' + 需发货总数 + '</span>';
                //进度条2 += '    </div>';
                //进度条2 += '</div>';
                //$('#progress2').append(进度条2);
                //$('#progress2').attr('title', '待发货数：' + 进度2 + '%');

                $.each(data.data, function (idx, obj) {
                    content += '<tr data-id="' + obj.PJ号 + '" data-materialcode="' + obj.物料代码 + '">';
                    content += '    <td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 25)) + '</td>';
                    content += '    <td>' + obj.processnum + '</td>';
                    content += '    <td>' + obj.manager + '</td>';
                    content += '    <td>' + obj.testnumber + '</td>';
                    content += '    <td>' + obj.imagenum + '</td>';
                    content += '    <td>' + obj.specifications + '</td>';
                    content += '    <td>' + obj.demandednumber + '</td>';
                    content += '    <td>' + obj.classified + '</td>';
                    content += '    <td>' + obj.bill + '</td>';
                    content += '    <td>' + obj.notificationdate + '</td>';
                    content += '    <td>' + obj.scenarios + '</td>';
                    content += '    <td>' + obj.subprocess + '</td>';
                    content += '    <td>' + obj.createdate + '</td>';
                    content += '    <td>' + obj.createusercode + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="del"  data-drawingcode="' + obj.drawingcode + '">添加PJ号</a>';
                    content += '    </td>';
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



/**
* 添加PJ号
*/
function 添加PJ号(urltype, pageurl, data) {
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
                $('#AddUserModal2').modal('hide');
                RequestData('IIS3380', '/AdvanceOrder.aspx?action=GetMaterialsDrawingPJ', {
                    "onetype": onetype,
                    "oneval": oneval,
                    "numbertype": numbertype,
                    "page": currPage,
                    "pagesize": 25,
                    "sortfield": 全局字段,
                    "datetype": datetype,
                    "startdate": startdate,
                    "enddate": enddate,
                    "sort": 全局排序
                }, currPage);

            } else {
                alert(data.errmsg);
            }
        }
    });
}





/************************************* Ajax End *******************************************/