
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '',
    sortfield = '', sort = '', numbertype = '', numbership = '', numberval = '', pickingcode = '';
var PORT = "IIS3676";
var URL = "Warehouse/UnmannedWarehouse.aspx?action=";
$(function () {
    pickingcode = getQueryString('pickingcode');
    GetMainList(PORT, URL + "getpickingDocumentDetailPCList", Getseach());
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    var fileName = $('.panel-title').text();
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
    GetMainList(PORT, URL + "getpickingDocumentDetailPCList", Getseach());
});
//排序
$(document).on('click', '#form_th > tr > th', function () {
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
    GetMainList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            page = 1;
            GetMainList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
        }
    }
})

//**********************************************************************************查询 Start**********************************************************************//
//类型一
$(document).on('change', '#onetype', function () {
    pickingcode = '';
    if ($(this).val() == '全部') {
        $('#oneval').empty().hide();
        return;
    }
    $('#oneval').show().attr('placeholder', '请输入' + $(this).val());
});
//时间类型
$(document).on('change', '#datetype', function () {
    pickingcode = '';
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();
});

//数量
$(document).on('change', '#numbertype', function () {
    pickingcode = '';
    if ($(this).val() == '全部') {
        $('#numberval').hide();
        return;
    }
    $('#numberval').show();
    $('#numqty').attr('placeholder', '请输入' + $(this).val() + $('#numselect option:selected').text() + "数量");
});

$(document).on('change', '#numberval #numselect', function () {
    pickingcode = '';
    $('#numqty').attr('placeholder', '请输入' + $('#numbertype option:selected').val() + $('#numselect option:selected').text() + "数量");

});



//****************************************************************************查询 End****************************************************************************//










//****************************************************************************Ajax Start****************************************************************************//


/**
*获取主列表
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
                    content += '<tr>';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.pickinggmtqty + '</td>';
                    content += '<td>' + obj.pickingdate + '</td>';
                    content += '</tr>';
                  
                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0012").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}



//分页
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
            GetMainList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
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
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
  
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": page,
        "sortfield": sortfield,
        "sort": sort,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "pickingcode": pickingcode
    };
    return data;
}
//****************************************************************************Common End****************************************************************************//





