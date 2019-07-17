var 全局页码 = 1;
var 全局字段 = '';
var 全局排序 = '';
var onetype = '';
var oneval = '';
var twotype = '';
var datetype = '';
var startdate = '';
var enddate = '';
var numbertype = '';
var numberval = '';
var numbership = '';
var 全局搜索 = '';
var pjmodifly = '';
var namemodifly = '';
var URL = "ActiveFruit.aspx?action=getactiveFruitData";
$(function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    GetUserList("IIS3676", URL, {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    });
}
);



/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
//$(document).on('click', '#datalist .download', function () {
//    var title = $(this).parents('.panel-heading').find('.panel-title').text();
//    $('#dlink').attr('data-name', title + '.xls');
//    ExportExcel('form_table');
//});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    全局页码 = 1;
    var 文件名 = $('.panel-title').text();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    };
    $('#urltype').val('IIS3676');
    $('#pageurl').val("ActiveFruit.aspx?action=excelgetactiveFruitData");
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    GetUserList("IIS3676", URL, {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    });
});




//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            GetUserList("IIS3676", URL, {
                "onetype": onetype,
                "oneval": oneval,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序,
            });
        }
    }
})


$(document).on('click', '#form_tb .dispatching', function () {
    $("#WorkDispatching > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#WorkDispatching").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#WorkDispatching').modal('show');
    var predicthours = $(this).attr('data-predicthours');
    var account = $(this).attr('data-account');
    var pj = $(this).attr('data-pj');
    var flownum = $(this).attr('data-flownum');
    $('#WorkDispatching_sure').attr('data-pj', pj);
    $('#WorkDispatching_sure').attr('data-flownum', flownum);
    $('#Work_account').val(account);
    $('#Work_predicthours').val(predicthours);
});



/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetUserList(urltype, pageurl, data, page) {
    showLoading();
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + obj.jobnum + '</td>';
                    content += '<td>' + obj.name + '</td>';
                    content += '<td>' + obj.departmentname + '</td>';
                    content += '<td>' + obj.ic + '</td>';
                    content += '<td>' + obj.leadfruitdate + '</td>';
                    content += '<td>' + obj.createdate + '</td>';
                    //content += '<td><a style="margin-left:8px;" href="/Page/ActivityBenefit/AB0002.html?ic=' + obj.ic + '">详情</a></td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $('#totalnum').text("(总数量为:" + totalnum + "条)");
                $("#pagination_AB0001").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            }
            else {
                alert(data.errmsg);
            }
        }
    });
}





/************************************* Ajax End *******************************************/




/************************************* Search Start *******************************************/

//類型一
$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').hide();
        return;
    }
    $('#oneval').val("").attr('placeholder', '请输入' + $(this).val()).show();

});
//時間

$(document).on('change', '#datetype', function () {
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();

});


/************************************* Search End *******************************************/


//分页
$(function () {
    $("#pagination_AB0001").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            全局页码 = currPage;
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            GetUserList("IIS3676", URL, {
                "onetype": onetype,
                "oneval": oneval,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序,
            }, 全局页码);
        }
    });
});


$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    全局字段 = $(this).attr('data-val');
    全局排序 = '';
    if ($(this).hasClass('contor')) {
        全局排序 = 'desc';
    }
    else {
        全局排序 = 'asc';
    }
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    全局页码 = currPage;
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    GetUserList("IIS3676", URL, {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    }, 全局页码);
});


