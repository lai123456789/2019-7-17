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
        "numbertype": numbertype,
        "page": 1,
        "pagesize": 30000,
        "sortfield": 全局字段,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "sort": 全局排序
    };
    $('#urltype').val('IIS3380');
    $('#pageurl').val('AdvanceOrder.aspx?action=getExcel');
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
    numbertype = $('#numbertype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    RequestData("IIS3380", "AdvanceOrder.aspx?action=getExcel", {
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
    numbertype = $('#numbertype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    全局页码 = 1;
    RequestData("IIS3380", "AdvanceOrder.aspx?action=getExcel", {
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "page": 全局页码,
        "pagesize": 25,
        "sortfield": 全局字段,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
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
            numbertype = $('#numbertype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            全局页码 = 1;
            RequestData("IIS3380", "AdvanceOrder.aspx?action=getExcel", {
                "onetype": onetype,
                "oneval": oneval,
                "numbertype": numbertype,
                "page": 全局页码,
                "pagesize": 25,
                "sortfield": 全局字段,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
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

//$(document).on('click', '#selectclose', function () {
//    var obj = $('#form_tb > tr > td > i.select.contor');
//    if (obj.length == 0) {
//        alert('未选中任何项');
//        return;
//    }
//    var arrmaterialcode = '';
//    var arrpj = '';
//    for (var i = 0; i < obj.length; i++) {
//        if (i == 0) {
//            arrmaterialcode += $(obj[i]).parents('tr').attr('data-materialcode');
//            arrpj += $(obj[i]).parents('tr').attr('data-id');
//        }
//        else {
//            arrmaterialcode += '/' + $(obj[i]).parents('tr').attr('data-materialcode');
//            arrpj += '/' + $(obj[i]).parents('tr').attr('data-id');
//        }

//    }


//    CloseMaterialQS("IIS", "ReportTable/OrderManage.aspx?action=closeoraclematerialqs", {
//        "pj": arrpj,
//        "materialcode": arrmaterialcode
//    }, function () {
//        for (var i = 0; i < obj.length; i++) {
//            $(obj[i]).parents('tr').remove();
//        }
//    });
//});


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
            numbertype = $('#numbertype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            RequestData("IIS3380", "AdvanceOrder.aspx?action=getExcel", {
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
        }
    });
});


$(document).on('click', '#import_btn', function () {
    $('#fileval').click();
});


$(document).on('change', '#fileval', function () {
    TableImport("IIS3380", "AdvanceOrder.aspx?action=addExcel");
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
                var 总订单数 = data.totalnum;
                var 订单未完成数 = data.figurenumber;
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


                //var 进度2 = parseFloat(parseFloat(parseFloat(欠发货数) / parseFloat(需发货总数)) * 100).toFixed(2);
                $('#progress2').empty();
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
                    content += '    <td>' + obj.流程单号 + '</td>';
                    content += '    <td>' + obj.项目经理 + '</td>';
                    content += '    <td>' + obj.试制号 + '</td>';
                    content += '    <td>' + obj.图档号 + '</td>';
                    content += '    <td>' + obj.规格型号及夹具名称 + '</td>';
                    content += '    <td>' + obj.需求数量 + '</td>';
                    content += '    <td>' + obj.归类 + '</td>';
                    content += '    <td>' + obj.提单人 + '</td>';
                    content += '    <td>' + obj.系统通知日期 + '</td>';
                    content += '    <td>' + obj.需求场景 + '</td>';
                    content += '    <td>' + obj.子流程单号 + '</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
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


/*
请求数据
*/
function TableImport(urltype, pageurl) {
    var formdata = new FormData();
    var fileObj = document.getElementById("fileval").files;
    formdata.append("file1", fileObj[0]);
    formdata.append("urltype", urltype);
    formdata.append("pageurl", pageurl);
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=tableimport",
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        data: formdata,
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert('导入成功')
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/************************************* Ajax End *******************************************/
