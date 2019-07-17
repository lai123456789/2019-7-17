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


function OnIntFunc(){
    var usercode = $('#userinfo').attr('data-usercode');
    if (usercode == "mt00000002") {
        $('#form_th > tr > th:eq(1)').before('<th>选择</th><th>操作</th>');
        $('#allselect').show();
        $('#allnoselect').show();
        $('#selectclose').show();
    } else {
        $('#allselect').hide();
        $('#allnoselect').hide();
        $('#selectclose').hide();
    }
};


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
    $('#pageurl').val('MaterialQSApi.aspx?action=exportgetmaterialdetail');
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
    else
    {
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
    RequestData("IIS", "MaterialQSApi.aspx?action=getmaterialdetail", {
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
        "page": currPage,
        "sortfield": 全局字段,
        "sort": 全局排序
    }, currPage);
});



$(document).on('change', '#numbertype', function () {
    var val = $(this).val();
    if (val != '未入库' && val != '未领料' && val != '未下计划') {
        $('#allselect').addClass('hide');
        $('#allnoselect').addClass('hide');
        $('#selectclose').addClass('hide');
    } else {
        $('#allselect').removeClass('hide');
        $('#allnoselect').removeClass('hide');
        $('#selectclose').removeClass('hide');
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
    全局页码 = 1;
    RequestData("IIS", "MaterialQSApi.aspx?action=getmaterialdetail", {
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
        "sort": 全局排序
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
            全局页码 = 1;
            RequestData("IIS", "MaterialQSApi.aspx?action=getmaterialdetail", {
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
    else
    {
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


$(document).on('click', '#form_tb > tr > td > a.closeorder', function () {
    var obj = $(this).parents('tr');
    var materialcode = $(this).parents('tr').attr('data-materialcode');
    var pj = $(this).parents('tr').attr('data-id');
    CloseMaterialQS("IIS", "MaterialQSApi.aspx?action=closeoraclematerialqs", {
        "pj": pj,
        "materialcode": materialcode
    }, function () {
        $(obj).remove();
    });
});


$(document).on('click', '#form_tb > tr > td > a.restore', function () {
    var obj = $(this).parents('tr');
    var materialcode = $(this).parents('tr').attr('data-materialcode');
    var pj = $(this).parents('tr').attr('data-id');
    RecoverMaterialQS("IIS", "MaterialQSApi.aspx?action=cancelclosematerialos", {
        "pj": pj,
        "materialcode": materialcode
    }, function () {
        $(obj).remove();
    });
});


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

$(document).on('click', '#selectclose', function () {
    var obj = $('#form_tb > tr > td > i.select.contor');
    if (obj.length == 0) {
        alert('未选中任何项');
        return;
    }
    var arrmaterialcode = '';
    var arrpj = '';
    for (var i = 0; i < obj.length; i++) {
        if (i == 0) {
            arrmaterialcode += $(obj[i]).parents('tr').attr('data-materialcode');
            arrpj += $(obj[i]).parents('tr').attr('data-id');
        }
        else
        {
            arrmaterialcode += '/' + $(obj[i]).parents('tr').attr('data-materialcode');
            arrpj += '/' + $(obj[i]).parents('tr').attr('data-id');
        }
        
    }
    

    CloseMaterialQS("IIS", "MaterialQSApi.aspx?action=closeoraclematerialqs", {
        "pj": arrpj,
        "materialcode": arrmaterialcode
    }, function () {
        for (var i = 0; i < obj.length; i++) {
            $(obj[i]).parents('tr').remove();
        }
    });
});


$(function () {
    $("#pagination_9").pagination({
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
            twoval = $('#twoval').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            fourtype = $('#fourtype').val();
            fourval = $('#fourval').val();
            RequestData("IIS", "MaterialQSApi.aspx?action=getmaterialdetail", {
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
                "page": currPage,
                "sortfield": 全局字段,
                "sort": 全局排序
            },currPage);
        }
    });
});

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
                $.each(data.data, function (idx, obj) {
                    content += '<tr data-id="' + obj.PJ号 + '" data-materialcode="' + obj.物料代码 + '">';
                    content += '    <td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 25)) + '</td>';
                    if ($('#userinfo').attr('data-usercode') == 'mt00000002') {
                        
                        if (obj.是否关闭 == "1") {
                            content += '    <td class="noexport"></td>';
                            content += '    <td class="noexport"><a class="restore" href="JavaScript:;">还原</a></td>';
                        }
                        else {
                            content += '    <td class="noexport"><i class="select fa fa-check-square"></i></td>';
                            content += '    <td class="noexport"><a class="closeorder" href="JavaScript:;">关闭</a></td>';
                        }
                    }
                    content += '    <td>' + obj.状态 + '</td>';
                    content += '    <td>' + obj.下图日期 + '</td>';
                    //if (obj.下图日期 == null || obj.下图日期 == '') {
                    //    content += '    <td>' + obj.建立日期 + '</td>';
                    //}
                    //else
                    //{
                    //    content += '    <td>' + obj.下图日期 + '</td>';
                    //}
                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>' + obj.旧备注 + '</td>';
                    content += '    <td>' + obj.销售订单号 + '</td>';
                    content += '    <td>' + obj.PJ号 + '</td>';
                    content += '    <td>' + obj.物料代码 + '</td>';
                    content += '    <td>' + obj.物料名称 + '</td>';
                    content += '    <td>' + obj.物料属性 + '</td>';
                    content += '    <td>' + obj.规格 + '</td>';
                    content += '    <td>' + obj.单套用量 + '</td>';
                    content += '    <td>' + obj.需求总量 + '</td>';
                    content += '    <td>' + obj.要求配件到货日期 + '</td>';
                    if (parseFloat(obj.调拨数量条数) > 1) {
                        content += '    <td class="blue">' + obj.调拨数量 + '</td>';
                    }
                    else {
                        content += '    <td>' + obj.调拨数量 + '</td>';
                    }
                    content += '    <td>' + obj.欠入库数 + '</td>';
                    content += '    <td>' + obj.欠领料数 + '</td>';
                    content += '    <td>' + obj.齐套数量 + '</td>';
                    content += '    <td>' + obj.业务类型 + '</td>';
                    content += '    <td>' + obj.操作员部门 + '</td>';
                    content += '    <td>' + obj.操作员 + '</td>';
                    content += '    <td>' + obj.申购日期 + '</td>';
                    if (parseFloat(obj.申购数量条数) > 1) {
                        content += '    <td class="blue">' + obj.申购数量 + '</td>';
                    }
                    else
                    {
                        content += '    <td>' + obj.申购数量 + '</td>';
                    }
                    content += '    <td>' + obj.需求到货日期 + '</td>';
                    content += '    <td>' + obj.采购日期 + '</td>';
                    content += '    <td>' + obj.采购数量 + '</td>';
                    content += '    <td>' + obj.采购员 + '</td>';
                    content += '    <td>' + obj.交货日期 + '</td>';
                    content += '    <td>' + obj.供应商 + '</td>';
                    if (parseFloat(obj.收货数量条数) > 1) {
                        content += '    <td class="blue">' + obj.收货数量 + '</td>';
                    }
                    else
                    {
                        content += '    <td>' + obj.收货数量 + '</td>';
                    }
                    content += '    <td>' + obj.收货日期 + '</td>';
                    content += '    <td>' + obj.入库日期 + '</td>';
                    content += '    <td>' + obj.入库总数量 + '</td>';
                    
                    if (parseFloat(obj.外购入库数量条数) > 1) {
                        content += '    <td class="blue">' + obj.外购入库数量 + '</td>';
                    }
                    else {
                        content += '    <td>' + obj.外购入库数量 + '</td>';
                    }
                    if (parseFloat(obj.产品入库数量条数) > 1) {
                        content += '    <td class="blue">' + obj.产品入库数量 + '</td>';
                    }
                    else
                    {
                        content += '    <td>' + obj.产品入库数量 + '</td>';
                    }
                    if (parseFloat(obj.委外入库数量条数) > 1) {
                        content += '    <td class="blue">' + obj.委外入库数量 + '</td>';
                    }
                    else {
                        content += '    <td>' + obj.委外入库数量 + '</td>';
                    }
                    content += '    <td>' + obj.领料出库日期 + '</td>';
                    if (parseFloat(obj.领料数量条数) > 1) {
                        content += '    <td class="blue">' + obj.领料数量 + '</td>';
                    } else {
                        content += '    <td>' + obj.领料数量 + '</td>';
                    }
                    content += '    <td>' + obj.客户订单号 + '</td>';
                    content += '    <td>' + obj.试制单号 + '</td>';
                    content += '    <td>' + obj.制表人 + '</td>';
                    content += '    <td>' + obj.制表日期 + '</td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

                var pagecount = data.pagecount;
                var totalnum = data.totalnum;

                $("#pagination_9").pagination('setPage', parseFloat(page), parseFloat(pagecount));

                //var tbody = document.querySelector('#form_table').tBodies[0];
                //var th = document.querySelector('#form_table').tHead.rows[0].cells;
                //var td = tbody.rows;
                //for (var i = 0; i < th.length; i++) {
                //    th[i].flag = 1;
                //    th[i].onclick = function () {
                //        showLoading();
                //        if (this.flag == 1) {
                //            $(this).addClass('contor');
                //        } else {
                //            $(this).removeClass('contor');
                //        }
                //        sort(this.getAttribute('data-type'), this.flag, this.cellIndex, td, tbody);
                //        this.flag = -this.flag;
                //    };
                //};
                //if (!$('#form_table').hasClass('sDefault')) {
                //    new superTable("form_table", {
                //        cssSkin: "sDefault", //颜色方案
                //        fixedCols: 0, //固定几列
                //        headerRows: 1
                //    });
                //}
                

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


///*
//获取用户信息
//*/
//function GetUserInfo() {
//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Api/WebApi.aspx?action=getuserinfo",
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            hideLoading();
//            $('#account').val(data.account);
//            if (data.account == "414")
//            {
//                $('#form_th > tr > th:eq(1)').before('<th>选择</th><th>操作</th>');
//                $('#allselect').show();
//                $('#allnoselect').show();
//                $('#selectclose').show();
//            }
//        }
//    });
//}



/*
关闭物料齐套数据
*/
function CloseMaterialQS(urltype, pageurl, data, func) {
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



function TableExportExcel(urltype, pageurl, data, filename)
{
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