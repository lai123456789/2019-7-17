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
var fivetype = '';
/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {

    document.getElementById("datalist").webkitRequestFullscreen();
    //setTimeout(function () {
    //    var h = document.documentElement.clientHeight || document.body.clientHeight;
    //    var new_h = h - 300;
    //    $('#div_form_table').css('max-height', new_h);
    //    $('#div_form_table').css('height', new_h);
    //}, 2000);
});

$(function () {
    $('.query_btn').click();
});

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
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "fourtype": fourtype,
        "fourval": fourval,
        "page": 1,
        "sortfield": 全局字段,
        "sort": 全局排序
    };
    $('#urltype').val('IIS');
    $('#pageurl').val('ReportTable/OrderManage.aspx?action=excelgetorderlist');
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#form_tb > tr > td', function () {
    var index = $(this).index();
    if (index != 1 && index != 2) {
        $(this).parents('tr').toggleClass('select');
    }
});


//$(function () {
//    var h = document.documentElement.clientHeight || document.body.clientHeight;
//    var new_h = h - 160;
//    $('#datalist').height(new_h);
//});

//$(function () {
//    var h = document.documentElement.clientHeight || document.body.clientHeight;
//    var new_h = h - 300;
//    $('#div_form_table').css('max-height', new_h);
//    $('#div_form_table').css('height', new_h);
//    GetUserInfo();
//});



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
    twoval = $('#twoval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    fourtype = $('#fourtype').val();
    fourval = $('#fourval').val();
    fivetype = $('#fivetype').val();
    RequestData("IIS", "ReportTable/OrderManage.aspx?action=getorderlist", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "fourtype": fourtype,
        "fourval": fourval,
        "numbertype": numbertype,
        "fivetype": fivetype,
        "page": currPage,
        "sortfield": 全局字段,
        "sort": 全局排序
    }, currPage);
});



$(document).on('change', '#numbertype', function () {
    var val = $(this).val();
    if (val != '未入库') {
        $('#allselect').addClass('close');
        $('#allnoselect').addClass('close');
        $('#selectclose').addClass('close');
    } else {
        $('#allselect').removeClass('close');
        $('#allnoselect').removeClass('close');
        $('#selectclose').removeClass('close');
    }
});


//$(window).resize(function () {
//    var h = document.documentElement.clientHeight || document.body.clientHeight;
//    if (!f_IsFullScreen()) {
//        var new_h = h - 300;
//        $('#div_form_table').css('max-height', new_h);
//        $('#div_form_table').css('height', new_h);
//    }
//});

/*
table数据转json
*/
function TableToJson(tableid) {
    var txt = "[";
    var table = document.getElementById(tableid);
    var row = table.getElementsByTagName("tr");
    var col = row[0].getElementsByTagName("th");
    for (var j = 1; j < row.length; j++) {
        var r = "{";
        for (var i = 0; i < col.length; i++) {
            if (col[i].innerHTML != '选择' && col[i].innerHTML != '操作') {
                var tds = row[j].getElementsByTagName("td");
                var reg = new RegExp('"', "g")
                var newstr = tds[i].innerHTML.replace(reg, '“');
                r += "\"" + col[i].innerHTML + "\"\:\"" + newstr + "\",";
            }
        }
        r = r.substring(0, r.length - 1)
        r += "},";
        txt += r;
    }
    txt = txt.substring(0, txt.length - 1);
    txt += "]";
    return txt;
}


//判断浏览器是否全屏
function f_IsFullScreen() {
    return (document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width);
}

/************************************* 排序 *******************************************/

function sort(str, flag, n, td, tbody) {

    var arr = [];
    for (var i = 0; i < td.length; i++) {
        arr.push(td[i]);
    };
    arr.sort(function (a, b) {
        return method(str, a.cells[n].innerHTML, b.cells[n].innerHTML) * flag;
    });
    for (var i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
    };
    setTimeout(function () {
        hideLoading();
    }, 1000);

};
function method(str, a, b) {
    switch (str) {
        case 'num':
            return a - b;
            break;
        case 'string':
            return a.localeCompare(b);
            break;
        default:
            return new Date(a.split('-').join('/')).getTime() - new Date(b.split('-').join('/')).getTime();
    };
};

/************************************* 排序End *******************************************/

$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    twoval = $('#twoval').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    fourtype = $('#fourtype').val();
    fourval = $('#fourval').val();
    fivetype = $('#fivetype').val();

    全局页码 = 1;
    RequestData("IIS", "ReportTable/OrderManage.aspx?action=getorderlist", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "fourtype": fourtype,
        "fourval": fourval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
        "fivetype": fivetype
    });
});



//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_pj').is(':focus')) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#twoval').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            fourtype = $('#fourtype').val();
            fourval = $('#fourval').val();
            fivetype = $('#fivetype').val();
            全局页码 = 1;
            RequestData("IIS", "ReportTable/OrderManage.aspx?action=getorderlist", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "twoval": twoval,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "fourtype": fourtype,
                "fourval": fourval,
                "numbertype": numbertype,
                "fivetype": fivetype,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序
            });
        }
    }
})


$(document).on('change', '#datetype', function () {
    var 时间类型 = $(this).val();
    if (时间类型 == '全部') {
        $('#datetype_date').hide();
    }
    else {
        $('#datetype_date').show();
    }
});

$(document).on('change', '#onetype', function () {
    var 类型一 = $(this).val();
    if (类型一 == '全部') {
        $('#oneval').hide();
    }
    else {
        $('#oneval').attr('placeholder', '请输入' + 类型一);
        $('#oneval').show();
    }
});

$(document).on('change', '#twotype', function () {
    var 类型二 = $(this).val();
    if (类型二 == '全部') {
        $('#twoval').hide();
    }
    else {
        $('#twoval').attr('placeholder', '请输入' + 类型二);
        $('#twoval').show();
    }
});


$(document).on('change', '#fourtype', function () {
    var 类型四 = $(this).val();
    if (类型四 == '全部') {
        $('#fourval').hide();
    }
    else {
        $('#fourval').attr('placeholder', '请输入' + 类型四);
        $('#fourval').show();
    }
});


//$(document).on('click', '#form_tb > tr > td > a.closeorder', function () {
//    var obj = $(this).parents('tr');
//    var materialcode = $(this).parents('tr').attr('data-materialcode');
//    var pj = $(this).parents('tr').attr('data-id');
//    CloseMaterialQS("IIS", "ReportTable/OrderManage.aspx?action=closeoraclematerialqs", {
//        "pj": pj,
//        "materialcode": materialcode
//    }, function () {
//        $(obj).remove();
//    });
//});


//$(document).on('click', '#form_tb > tr > td > a.restore', function () {
//    var obj = $(this).parents('tr');
//    var materialcode = $(this).parents('tr').attr('data-materialcode');
//    var pj = $(this).parents('tr').attr('data-id');
//    RecoverMaterialQS("IIS", "ReportTable/OrderManage.aspx?action=cancelclosematerialos", {
//        "pj": pj,
//        "materialcode": materialcode
//    }, function () {
//        $(obj).remove();
//    });
//});


$(document).on('click', '#form_tb > tr > td > i.select', function () {
    $(this).toggleClass('contor');
});

$(document).on('click', '#allselect', function () {
    var obj = $('#form_tb > tr > td > i.select');
    for (var i = 0; i < obj.length; i++) {
        $(obj).addClass('contor');
    }
});

$(document).on('click', '#allnoselect', function () {
    var obj = $('#form_tb > tr > td > i.select');
    for (var i = 0; i < obj.length; i++) {
        $(obj).removeClass('contor');
    }
});


$(document).on('click', '#editcontent', function () {
    var obj_deliveraddress = $('.deliveraddress');
    var obj_commitmentdate = $('.commitmentdate');
    for (var i = 0; i < obj_deliveraddress.length; i++) {
        var 交货地址 = $(obj_deliveraddress[i]).text();
        var 输入框 = '<input type="text" value="' + 交货地址 + '" />';
        $(obj_deliveraddress[i]).empty();
        $(obj_deliveraddress[i]).append(输入框);
    }
    for (var i = 0; i < obj_commitmentdate.length; i++) {
        var 承诺客户日期 = $(obj_commitmentdate[i]).text();
        var 输入框 = '<input type="text" value="' + 承诺客户日期 + '" />';
        $(obj_commitmentdate[i]).empty();
        $(obj_commitmentdate[i]).append(输入框)
    }
    $('#editcontent').removeClass('contor');
    $('#closeeditcontent').addClass('contor');
    if (obj_deliveraddress.length > 0) {
        $(obj_deliveraddress[0]).find('input').focus();
    }
});


$(document).on('click', '#closeeditcontent', function () {
    
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    RequestData("IIS", "ReportTable/OrderManage.aspx?action=getorderlist", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "twoval": twoval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "fourtype": fourtype,
        "fourval": fourval,
        "numbertype": numbertype,
        "fivetype": fivetype,
        "page": currPage,
        "sortfield": 全局字段,
        "sort": 全局排序
    }, currPage);
    $('#editcontent').addClass('contor');
    $('#closeeditcontent').removeClass('contor');
});


$(document).on('keydown', '#form_tb > tr > td.deliveraddress input', function (e) {
    if (e.keyCode == 13) {
        var finterid = $(this).parents('td.deliveraddress').attr('data-finterid');
        var fentryid = $(this).parents('td.deliveraddress').attr('data-fentryid');
        var 交货地址 = $(this).val();
        var index = $(this).parents('td.deliveraddress').attr('data-index');
        var obj = $('#form_tb > tr > td.deliveraddress:eq(' + parseFloat(parseFloat(index) + 1) + ') input');
        SetDeliverAddress("IIS", "ReportTable/OrderManage.aspx?action=setdeliveraddress", {
            "finterid": finterid,
            "fentryid": fentryid,
            "deliveraddress": 交货地址,
            "usercode":""
        }, function () {
            if (obj != null) {
                $(obj).focus();
            }
        });
    }
});


$(document).on('keydown', '#form_tb > tr > td.commitmentdate input', function (e) {
    if (e.keyCode == 13) {
        var 日期;
        var finterid = $(this).parents('td.commitmentdate').attr('data-finterid');
        var fentryid = $(this).parents('td.commitmentdate').attr('data-fentryid');
        var 当前年份 = GetDateFormat(new Date(), 'yyyy');
        var 承诺日期 = $(this).val();
        if (承诺日期.trim().length > 0) {
            if (承诺日期.length < 4) {
                alert('日期格式不正确');
                return;
            }
            else if (承诺日期.length > 4 && 承诺日期.length < 8) {
                alert('日期格式不正确');
                return;
            }
            else if (承诺日期.length == 4) {

                日期 = GetDateFormat(当前年份 + '/' + 承诺日期.substring(0, 2) + '/' + 承诺日期.substring(2, 4), 'yyyy-MM-dd HH:mm:ss');
                if (日期 == null || 日期 == '') {
                    alert('日期格式不正确');
                    return;
                }
            } else {
                日期 = GetDateFormat(承诺日期, 'yyyy-MM-dd HH:mm:ss');
            }
            var index = $(this).parents('td.commitmentdate').attr('data-index');
            $('#form_tb > tr > td.commitmentdate:eq(' + parseFloat(index) + ') input').val(日期);
            var obj = $('#form_tb > tr > td.commitmentdate:eq(' + parseFloat(parseFloat(index) + 1) + ') input');
            if (日期 != null && 日期 != '') {
                SetCommitmentDate("IIS", "ReportTable/OrderManage.aspx?action=setcommitmentdate", {
                    "finterid": finterid,
                    "fentryid": fentryid,
                    "commitmentdate": 日期,
                    "usercode": ""
                }, function () {
                    if (obj != null) {
                        $(obj).focus();
                    }
                });
            } else {
                $(obj).focus();
            }
        }
        else
        {
            var 日期 = $(this).parents('td.commitmentdate').attr('data-val');
            var index = $(this).parents('td.commitmentdate').attr('data-index');
            $('#form_tb > tr > td.commitmentdate:eq(' + parseFloat(index) + ') input').val(日期);
            var obj = $('#form_tb > tr > td.commitmentdate:eq(' + parseFloat(parseFloat(index) + 1) + ') input');
            $(obj).focus();
        }
    }
});


$(function () {
    $("#pagination_9").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            全局页码 = currPage;
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            twoval = $('#twoval').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            fourtype = $('#fourtype').val();
            fourval = $('#fourval').val();
            fivetype = $('#fivetype').val();
            RequestData("IIS", "ReportTable/OrderManage.aspx?action=getorderlist", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "twoval": twoval,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "fourtype": fourtype,
                "fourval": fourval,
                "fivetype": fivetype,
                "page": currPage,
                "sortfield": 全局字段,
                "sort": 全局排序
            }, currPage);
        }
    });
});


function OnIntFunc() {
    if ('mt00000892' == $('#userinfo').attr('data-usercode')) {
        $('#editcontent').hide();
    }
}

/************************************* Ajax *******************************************/

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
                var 总订单数 = data.sumordernum;
                var 订单未完成数 = data.sumowenum;
                var 欠发货数 = data.owedelivery;
                var 需发货总数 = data.sumdelivery;
                var 进度1 = parseFloat(parseFloat(parseFloat(订单未完成数) / parseFloat(总订单数)) * 100).toFixed(2);
                $('#progress1').empty();
                var 进度条1 = '';
                进度条1 += '<div class="progress progress-striped active">';
                进度条1 += '    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="' + 进度1 + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + 进度1 + '%">';
                进度条1 += '        <span class="sr-only">' + 订单未完成数 + ' / ' + 总订单数 + '</span>';
                进度条1 += '    </div>';
                进度条1 += '</div>';
                $('#progress1').append(进度条1);
                $('#progress1').attr('title', '待完成订单：' + 进度1 + '%');


                var 进度2 = parseFloat(parseFloat(parseFloat(欠发货数) / parseFloat(需发货总数)) * 100).toFixed(2);
                $('#progress2').empty();
                var 进度条2 = '';
                进度条2 += '<div class="progress progress-striped active">';
                进度条2 += '    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + 进度2 + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + 进度2 + '%">';
                进度条2 += '        <span class="sr-only">' + 欠发货数 + ' / ' + 需发货总数 + '</span>';
                进度条2 += '    </div>';
                进度条2 += '</div>';
                $('#progress2').append(进度条2);
                $('#progress2').attr('title', '待发货数：' + 进度2 + '%');

                $.each(data.data, function (idx, obj) {
                    content += '<tr id="tr_' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 25)) + '" data-id="' + obj.PJ号 + '" data-materialcode="' + obj.物料代码 + '">';
                    content += '    <td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 25)) + '</td>';
                    content += '    <td>' + obj.购货单位 + '</td>';
                    content += '    <td>' + obj.业务员 + '</td>';
                    content += '    <td>' + obj.pj + '</td>';
                    content += '    <td>' + obj.项目名称 + '</td>';
                    content += '    <td>' + obj.类别一 + '</td>';
                    content += '    <td>' + obj.类别二 + '</td>';
                    content += '    <td>' + obj.申购单号 + '</td>';
                    content += '    <td>' + obj.研发量产 + '</td>';
                    content += '    <td data-val="' + obj.承诺客户日期 + '" title="' + obj.承诺客户日期历史.replace(/,/g, "") + '" class="commitmentdate" data-index="' + idx + '" data-finterid="' + obj.finterid + '" data-fentryid="' + obj.fentryid + '">' + obj.承诺客户日期 + '</td>';
                    content += '    <td data-val="' + obj.交货地址 + '" title="' + obj.交货地址历史.replace(/,/g, "") + '" class="deliveraddress" data-index="' + idx + '" data-finterid="' + obj.finterid + '" data-fentryid="' + obj.fentryid + '">' + obj.交货地址 + '</td>';
                    content += '    <td>' + obj.收货人 + '</td>';
                    content += '    <td>' + obj.夹具分类 + '</td>';
                    content += '    <td>' + obj.产品料号 + '</td>';
                    content += '    <td>' + obj.产品名称 + '</td>';
                    content += '    <td>' + obj.part编码 + '</td>';
                    content += '    <td>' + obj.版本 + '</td>';
                    content += '    <td>' + obj.订单数量 + '</td>';
                    content += '    <td>' + obj.发货数量 + '</td>';
                    content += '    <td>' + obj.欠数 + '</td>';
                    content += '    <td>' + obj.总入库数 + '</td>';
                    if (parseFloat(parseFloat(obj.总入库数) - parseFloat(obj.发货数量)) < 0) {
                        content += '    <td class="blue">' + obj.已入库未出货 + '</td>';
                    } else {
                        content += '    <td>' + obj.已入库未出货 + '</td>';
                    }
                    content += '    <td>' + obj.文控下图日期 + '</td>';
                    content += '    <td>' + obj.接单日期 + '</td>';
                    content += '    <td>' + obj.po + '</td>';
                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>' + obj.要求配件到货日期 + '</td>';
                    if (parseFloat(obj.物料齐套数) > 0) {
                        content += '    <td>' + obj.最大齐套时间 + '</td>';
                    }
                    else {
                        content += '    <td></td>';
                    }
                    content += '    <td>' + obj.物料齐套数 + '</td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

                var pagecount = data.pagecount;
                var totalnum = data.totalnum;

                $("#pagination_9").pagination('setPage', parseFloat(page), parseFloat(pagecount));
                $('#editcontent').addClass('contor');
                $('#closeeditcontent').removeClass('contor');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
获取用户信息
*/
function GetUserInfo() {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=getuserinfo",
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            $('#account').val(data.account);
            if (data.account == "414") {
                $('#form_th > tr > th:eq(1)').before('<th>选择</th><th>操作</th>');
                $('#allselect').show();
                $('#allnoselect').show();
                $('#selectclose').show();
            }
        }
    });
}



/*
修改交货地址
*/
function SetDeliverAddress(urltype, pageurl, data, func) {
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
                func();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
修改承诺客户交期
*/
function SetCommitmentDate(urltype, pageurl, data, func) {
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
                func();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
恢复物料齐套数据
*/
function RecoverMaterialQS(urltype, pageurl, data, func) {
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
                func();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



function TableExportExcel(urltype, pageurl, data, filename) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=tableexport",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data),
            "filename": filename
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert('导出成功');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
/************************************* Ajax End *******************************************/