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
var d ='';
var URL = "BusinessManage/AssemblyManage.aspx?action=exceptiondetail";
var floortype = '';
var floorval = '';
$(function () {
    GetFlowNamees('twotype');
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {
        $('#onetype').find("option[value='PJ']").attr("selected", true);
        $('#oneval').show().val(pj);
    }


    if (pj != null && pj != '') {
        var data = sessionStorage.getItem("Exception");
        if (data && data.length > 0) {
            d = data.split('|');
            onetype = "PJ";
            oneval = d[0];
            twotype = d[1];
            $('#onetype').find("option[value='PJ']").attr("selected", true);
            $('#oneval').show().val(d[0]);
            sessionStorage.removeItem("Exception");
        }
    }
    var d = sessionStorage.getItem("P0003NAME");
    if (d && d.length > 0) {
        var arr = d.split('|');
        oneval = arr[1];
        onetype = "PJ";
        numbertype = arr[0];
        $('#oneval').show().val(arr[1]);
        $('#onetype').find("option[value='PJ']").attr("selected", true);
        //$('#numbertype').find("option[value='" + arr[0] + "']").attr("selected", true);
        sessionStorage.removeItem("P0003NAME");
    }

        onetype = onetype;
        oneval = oneval;
        twotype = twotype;
        datetype = $('#datetype').val();
        startdate = $('#startdate').val();
        enddate = $('#enddate').val();
        numbertype = $('#numbertype').val();
        numbership = $('#numselect').val();
        numberval = $('#numqty').val();
        getSeachFloor();
        floortype = $('#floortype').val();
        GetUserList("IIS3676", URL, {
            "onetype":onetype,
            "oneval": oneval,
            "twotype": twotype,
            "datetype": datetype,
            "startdate": startdate,
            "enddate": enddate,
            "numbertype": numbertype,
            "numbership": numbership,
            "numberval": numberval,
            "page": 全局页码,
            "sortfield": 全局字段,
            "sort": 全局排序,
            "floortype": floortype,
            "floorval": floorval
        });
    });



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
    getSeachFloor();
    floortype = $('#floortype').val();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
        "floortype": floortype,
        "floorval": floorval
    };
    $('#urltype').val('IIS3676');
    $('#pageurl').val("BusinessManage/AssemblyManage.aspx?action=excelexceptiondetail");
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    全局页码 = 1;
    getSeachFloor();
    floortype = $('#floortype').val();
    GetUserList("IIS3676", URL, {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
        "floortype": floortype,
        "floorval": floorval
    });
});




//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            numbership = $('#numselect').val();
            numberval = $('#numqty').val();
            全局页码 = 1;
            getSeachFloor();
            floortype = $('#floortype').val();
            GetUserList("IIS3676", URL, {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "numbership": numbership,
                "numberval": numberval,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序,
                "floortype": floortype,
                "floorval": floorval
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#form_tb .dispatching', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
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
function GetUserList(urltype, pageurl, data,page) {
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
                var exceptionSum = data.totalnum;
                var noexcepnum = data.excepnum;
                var proces = parseFloat(parseFloat(parseFloat(noexcepnum) / parseFloat(exceptionSum)) * 100).toFixed(2);
               
                var html = '';
                html += '<div class="progress progress-striped active">';
                html += '    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="' + proces + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + proces + '%">';
                html += '        <span class="sr-only">' + noexcepnum + ' / ' + exceptionSum + '</span>';
                html += '    </div>';
                html += '</div>';
                $('#progress1').empty().append(html);
                $('#progress1').attr('title', '待关闭异常：' + proces + '%');

                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr>';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.name + '</td>';
                    content += '<td>' + obj.handlingtype + '</td>';
                    content += '<td>' + obj.floor + '</td>';
                    content += '<td>' + obj.flowname + '</td>';
                    content += '<td>' + obj.createdate + '</td>';
                    content += '<td>' + obj.predictendtime+ '</td>';
                    content += '<td>' + obj.dispatchingtime + '</td>';
                    content += '<td>' + obj.remark + '</td>';
                    content += '<td>' + obj.reason + '</td>';
                    content += '<td>' + obj.createusername + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.operatorusername + '</td>';
                    content += '<td>' + obj.errtype + '</td>';
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0007").pagination('setPage', parseFloat(page), parseFloat(pagecount));

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

//數字類型
$(document).on('change', '#numbertype', function () {
    if ($(this).val() == '全部') {
        $('#numberval').hide();
        return;
    }
    $('#numberval').show();
    $('#numqty').attr('placeholder', '请输入' + $(this).val() + $('#numselect option:selected').text() + "数量")
});
$(document).on('change', '#numberval #numselect', function () {

    $('#numqty').attr('placeholder', '请输入' + $('#numbertype option:selected').val() + $('#numselect option:selected').text() + "数量");

});

//楼层选择
$(document).on('change', '#floortype', function () {
    if ($(this).val() == '全部') {
        $('#CheckFloor').hide();
        return;
    }
    $('#CheckFloor').show();
});
//单选
$(document).on('click', '#CheckFloor i.choice', function () {
    $(this).toggleClass('contor');
});
/************************************* Search End *******************************************/


//分页
$(function () {
    $("#pagination_P0007").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            numbership = $('#numselect').val();
            numberval = $('#numqty').val();
            getSeachFloor();
            floortype = $('#floortype').val();
            全局页码 = currPage;
            GetUserList("IIS3676", URL, {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "numbership": numbership,
                "numberval": numberval,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序,
                "floortype": floortype,
                "floorval": floorval
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
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    getSeachFloor();
    floortype = $('#floortype').val();
    全局页码 = 1;
    GetUserList("IIS3676", URL, {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
        "floortype": floortype,
        "floorval": floorval
    }, 全局页码);
});




//获取所有工序
function GetFlowNamees(id) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": 'IIS3676',
            "pageurl": 'BusinessManage/AssemblyManage.aspx?action=getallflowprocess',
            "data": JSON.stringify({ "search": "", "page": 1 })
        },

        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                var content = '<option  value="全部">全部</option>';
                $.each(data.data, function (idx, obj) {
                    content += '<option  value="' + obj.工序名称 + '">' + obj.工序名称 + '</option>';
                });
                $('#' + id).empty();
                $('#' + id).append(content);
                if (d && d.length > 0) {
                    $('#twotype').find('option[value="' + twotype + '"]').attr("selected", true);
                }
            }
            else {
                alert(data.errmsg)
            }
        }
    });

}




function getSeachFloor() {
    var fls = $('#CheckFloor').find('i.choice.contor');
    if (fls.length > 0) {
        floorval = '';
        $.each(fls, function (idx, obj) {
            floorval += $(this).attr('data-val') + ',';
        });
        floorval = floorval.substring(0, floorval.lastIndexOf(','));
    } else {
        floorval = '';
    }

}