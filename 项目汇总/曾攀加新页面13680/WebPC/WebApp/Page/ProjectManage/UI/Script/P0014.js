
var onetype = '', oneval = '', twotype = '', datetype = '', startdate = '', enddate = ''
   , numbertype = '', pj = '', excel = '', page = 1, sortfield = '', sort = '';

var PORT = "IIS3676";
var URL = "BusinessManage/AssemblyManage.aspx?action=";

$(function () {
    pj = getQueryString("pj");
    if(pj&&  pj.length>0){
        $('#oneval').show().val(pj);
        $('#onetype').find("option[value='PJ号']").attr("selected", true);
    }
    GetPrintList(PORT, URL + "getPrintDocument", Getseach());
});



/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});


/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    var 文件名 = $('.panel-title').text();
    page = 1;
    excel = "excel";
    $('#urltype').val('IIS3676');
    $('#pageurl').val(URL + "getPrintDocument");
    $('#data').val(JSON.stringify(Getseach()));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    excel = "";
    page = 1;
    GetPrintList(PORT, URL + "getPrintDocument", Getseach());
});



//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#query_title input').is(':focus')) {
            excel = "";
            page = 1;
            GetPrintList(PORT, URL + "getPrintDocument", Getseach());
        }
    }
})


/************************************* Ajax *******************************************/

/*
获取用户列表
*/

function GetPrintList(urltype, pageurl, data) {
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 15)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.名称 + '</td>';
                    content += '<td>' + obj.打印人 + '</td>';
                    content += '<td>' + obj.部门 + '</td>';
                    content += '<td>' + obj.打印时间 + '</td>';
                    content += '<td>' + obj.是否打印成功 + '</td>';
                    content += '</tr>';
                });

                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;

                $("#pagination_P0014").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/************************************* Ajax End *******************************************/




/************************************* Search Start *******************************************/

//類型一
$(document).on('change', '#onetype', function () {
    pj = '';
    if ($(this).val() == '全部') {
        $('#oneval').hide();
        return;
    }
    $('#oneval').attr('placeholder', '请输入' + $(this).val()).show();

});
//時間

$(document).on('change', '#datetype', function () {
    pj = '';
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();

});


/************************************* Search End *******************************************/


//分页
$(function () {
    $("#pagination_P0014").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            excel = "";
            GetPrintList(PORT, URL + "getPrintDocument", Getseach());
        }
    });
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
    excel = "";
    GetPrintList(PORT, URL + "getPrintDocument", Getseach());
});




//获取参数
function Getseach() {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    datetype = $('#datetype').val();
    numbertype = $(' #numbertype').val();
    numberval = $('#numqty').val();
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
        "numbertype": numbertype,
        "pj": pj,
        "excel": excel,
        "ip":""
    };
    return data;
}
