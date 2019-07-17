
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '',
    enddate = '', sortfield = '', sort = '', storagecode = '';
var PORT = "IIS3676";
var URL = "Warehouse/UnmannedWarehouse.aspx?action=";
$(function () {
    GetMainList(PORT, URL + "getstorageDocumentPCList", Getseach());
});

/*
导出Excel(左边)
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    var fileName = $('#datalist .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "excelgetstorageDocumentPCList");
    $('#data').val(JSON.stringify(Getseach()));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});

/*
导出Excel(右边)
*/
$(document).on('click', '#datalist2 .download', function () {
    showLoading();
    page = 1;
    var fileName = $('#datalist2 .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "excelgetstorageDocumentDetailPCList");
    $('#data').val(JSON.stringify(Getseach()));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});

//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    $('#datalist2 #form_tb').empty();
    GetMainList(PORT, URL + "getstorageDocumentPCList", Getseach());
});
//左边排序
$(document).on('click', '#datalist #form_th > tr > th', function () {
    $(this).toggleClass('contor');
    sortfield = $(this).attr('data-val');
    $('#datalist2 #form_tb').empty();
    sort = '';
    if ($(this).hasClass('contor')) {
        sort = 'desc';
    }
    else {
        sort = 'asc';
    }
    page = 1;
    //var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    GetMainList(PORT, URL + "getstorageDocumentPCList", Getseach(), page);
});

//右边排序
$(document).on('click', '#datalist2 #form_th > tr > th', function () {
    $(this).toggleClass('contor');
    sortfield = $(this).attr('data-val');
    sort = '';
    if ($(this).hasClass('contor')) {
        sort = 'desc';
    }
    else {
        sort = 'asc';
    }
    page = 1;
    //var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    GetMainDetailList(PORT, URL + "getstorageDocumentDetailPCList", Getseach());
});


//获取明细(右边)
$(document).on('click', '#datalist #form_tb > tr', function () {
    $('#datalist #form_tb tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    storagecode = $(this).attr('data-val');
    GetMainDetailList(PORT, URL + "getstorageDocumentDetailPCList", Getseach());
});



/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("main").webkitRequestFullscreen();
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist2 .fullscreen', function () {
    document.getElementById("main").webkitRequestFullscreen();
});
//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            page = 1;
            GetMainList(PORT, URL + "getstorageDocumentPCList", Getseach(), page);
        }
    }
})
//**********************************************************************************查询 Start**********************************************************************//
//类型一
$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').empty().hide();
        return;
    }
    $('#oneval').show().attr('placeholder', '请输入' + $(this).val());
});
//时间类型
$(document).on('change', '#datetype', function () {
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();
});



//****************************************************************************查询 End****************************************************************************//










//****************************************************************************Ajax Start****************************************************************************//


/**
*获取主列表(左边)
*/
function GetMainList(urltype, pageurl, data, page) {
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
                    content += '<tr data-val="' + obj.storagecode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.storagelocation + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.storagedate + '</td>';
                    //content += '<td ><a  href="/Page/ProjectManage/P0011.html?storagecode=' + obj.storagecode + '"">详情</a></td>';
                    content += '</tr>';

                });
                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0009").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            } else {
                alert(data.errmsg);
            }
        }
    });


}
/**
*获取主列表明细(右边)
*/

function GetMainDetailList(urltype, pageurl, data, page) {
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.materialcode + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.storagmtqty + '</td>';
                    content += '<td>' + obj.storagedate + '</td>';
                    //content += '<td ><a  href="#">退单</a></td>';
                    content += '</tr>';

                });
                $('#datalist2 #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0011").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}

//左边分页
$(function () {
    $("#pagination_P0009").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            $('#datalist2 #form_tb').empty();
            GetMainList(PORT, URL + "getstorageDocumentPCList", Getseach(), page);
        }
    });
});


//右边分页
$(function () {
    $("#pagination_P0011").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            GetMainDetailList(PORT, URL + "getstorageDocumentDetailPCList", Getseach(), page);
        }
    });
});




//****************************************************************************Ajax End****************************************************************************//



//****************************************************************************Common Start****************************************************************************//

function Getseach() {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": page,
        "sortfield": sortfield,
        "sort": sort,
        "numbertype": "全部",
        "numbership": "",
        "numberval": "",
        "storagecode": storagecode
    };
    return data;
}

//****************************************************************************Common End****************************************************************************//





