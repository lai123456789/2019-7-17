
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '', sortfield = '', sort = '', pickingcode='';
var PORT = "IIS3676";
var URL = "Warehouse/UnmannedWarehouse.aspx?action=";
$(function () {
    GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach());
});

/*
导出Excel(左边)
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    var fileName = $('#datalist .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "excelgetpickingDocumentPCList");
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
    $('#pageurl').val(URL + "excelgetpickingDocumentDetailPCList");
    $('#data').val(JSON.stringify(Getseach()));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});

//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    $('#datalist2 #form_tb').empty();
    GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach());
});


//左边领料排序
$(document).on('click', '#datalist #form_th > tr > th', function () {
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
    $('#datalist2 #form_tb').empty();
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach(), page);
});


//右边领料明细排序
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
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
});





//领料列表分页(左边)
$(function () {
    $("#pagination_P0010").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            $('#datalist2 #form_tb').empty();
            GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach(), page);
        }
    });
});

//领料明细分页(右边)
$(function () {
    $("#pagination_P0012").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
        }
    });
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
            GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach(), page);
        }
    }
})



//获取明细(右边)
$(document).on('click', '#datalist #form_tb > tr', function () {
    $('#datalist #form_tb tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    pickingcode = $(this).attr('data-val');
    GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach());
});




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
*获取
//领料主列表
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
                    content += '<tr data-val="' + obj.pickingcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.pickinglocation + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.pickingdate + '</td>';
                    //content += '<td ><a  href="/Page/ProjectManage/P0012.html?pickingcode=' + obj.pickingcode + '"">详情</a></td>';
                    content += '</tr>';
                   
                });
                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0010").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}












/**
*获取领料明细主列表
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
                    content += '<td>' + obj.pickinggmtqty + '</td>';
                    content += '<td>' + obj.pickingdate + '</td>';
                    content += '</tr>';

                });
                $('#datalist2 #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0012").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}





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
        "pickingcode": pickingcode
      
    };
    return data;
}
//****************************************************************************Common End****************************************************************************//





