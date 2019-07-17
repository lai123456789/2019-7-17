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


function OnIntFunc() {
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


///*
//导出Excel
//*/
//$(document).on('click', '#datalist .download', function () {
//    showLoading();

//    全局页码 = 1;
//    var 文件名 = $('.panel-title').text();
//    var data = {
//        "onetype": onetype,
//        "oneval": oneval,
//        "twotype": twotype,
//        "twoval": twoval,
//        "datetype": datetype,
//        "startdate": startdate,
//        "enddate": enddate,
//        "numbertype": numbertype,
//        "fourtype": fourtype,
//        "fourval": fourval,
//        "page": 1,
//        "sortfield": 全局字段,
//        "sort": 全局排序
//    };
//    $('#urltype').val('IIS');
//    $('#pageurl').val('MaterialQSApi.aspx?action=exportgetmaterialdetail');
//    $('#data').val(JSON.stringify(data));
//    $('#filename').val(文件名);
//    $('#export_excel').submit();
//    hideLoading();
//});


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
        else {
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
            }, currPage);
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
                    content += '<tr>';

                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>' + obj.旧备注 + '</td>';
                    content += '    <td>' + obj.销售订单号 + '</td>';

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
//这里开始写的
var md5_id = '';//全局变量
var name = '';
(function () { //获取url的每一个参数名
    //返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var urlParameters = location.search;
    //声明并初始化接收请求参数的对象
    var requestParameters = new Object();
    //如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
    if (urlParameters.indexOf('?') != -1) {
        //获取请求参数的字符串
        var parameters = decodeURI(urlParameters.substr(1));
        //将请求的参数以&分割中字符串数组
        parameterArray = parameters.split('&');
        //循环遍历，将请求的参数封装到请求参数的对象之中
        for (var i = 0; i < parameterArray.length; i++) {
            requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1]);
        }
        console.info(requestParameters);//这里拿到每一个参数 在后面加.参数名  就可以
        md5_id = requestParameters.Wid;
        name = requestParameters.name;
    }
    else {
        console.info('There is no request parameters');
    }
    return requestParameters;
})();


$(function () {
    GetAllPublishedGoodsInfo(1,ip,paixu);
});

var paixu = 'desc';
var ip = 'PID';
//var ip = '';
function GetAllPublishedGoodsInfo(page) {
   
    var action = { "action": "get partiCulars", "param": { "page": "" + page + "", "md5_id": "" + md5_id + "", "name": "" + name + "", "key": "" + ip + "", "value": "" + paixu + "" } }
    $.ajax({
        cache: true,
        type: "GET",
        dataType: "json",
        url: "http://192.168.2.196:8557/ZPXM/Zpxm.ashx",
        data: {
            "data": JSON.stringify(action)
        },
        async: true,
        error: function (request) {
            alert("连接失败！");
        },
        success: function (data) {            
            if (data.errcode == 0) {                
                var content = '';
                $.each(data.data, function (idx, obj) {
                    //var ip = obj.sort();
                    content += '<tr id=' + idx + '>';
                    content += '    <td class="ip">' + obj.ip + '</td>';
                    content += '    <td class="user_id">' + obj.user_id + '</td>';
                    content += '    <td class="user_name">' + obj.user_name + '</td>';
                    content += '    <td class="md5_id" style="display:none">' + obj.md5_id + '</td>';
                    content += '    <td class="pid">' + obj.pid + '</td>';
                    content += '    <td class="name">' + obj.name + '</td>';//程序名
                    content += '    <td class="alias">' + obj.alias + '</td>';//别名
                    content += '    <td class="class">' + obj.class + '</td>';//分类
                    content += '    <td class="start_time">' + obj.start_time + '</td>';
                    content += '    <td class="exit_time">' + obj.exit_time + '</td>';
                    content += '    <td class="run_time">' + obj.run_time + '</td>';
                    switch (obj.status) {
                        case "0":
                            state = '已结束';
                            break;
                        case "1":
                            state = '正在进行';
                           
                            break;
                       
                    }
                    content += '    <td class="status">' + state + '</td>';
                    
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

                var pagecount = data.pageCount;
                page_num($('#yy_pagegps01'), page, pagecount);

            }
            else {
                alert(data.errmsg)
            }

        }

    });
}


//排序开始

$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    ip = $(this).attr('data-val');  //ip表示获取每一个的表头不同th的值
    //paixu = '';
    if ($(this).hasClass('contor')) {
        paixu = 'desc';
    }
    else {
        paixu = 'asc';
    }
    GetAllPublishedGoodsInfo(1);

});
//这里结束

//编辑修改开始
$(document).on('click', '#xiugai', function () {
    // var tid = $(this).parents("tr").attr('id');    
    var obj_tr = $(this).parents('tr');
    var ip = $(obj_tr).find('.ip').text();
    var md5_id = $(obj_tr).find('.md5_id').text();
    var guid = $(obj_tr).find('.guid').text();
    var uuid = $(obj_tr).find('.uuid').text();
    var user_id = $(obj_tr).find('.user_id').text();
    var user_name = $(obj_tr).find('.user_name').text();

    $('#IP_edit').val(ip);
    $('#MD5_ID_edit').val(md5_id);
    $('#GUID_edit').val(guid);
    $('#UUID_edit').val(uuid);
    $('#user_id_edit').val(user_id);
    $('#user_name_edit').val(user_name);
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');

});
$(document).on('click', '#chakan', function () {
    var obj_tr = $(this).parents('tr');
    var md5_id = $(obj_tr).find('.md5_id').text();
    alert(md5_id)
    var name = $(obj_tr).find('.name').text();
    alert(name)
    var action = { "action": "get partiCulars", "param": { "md5_id": "" + md5_id + "", "name": "" + name + "" } }
    $.ajax({
        cache: true,
        type: "GET",
        dataType: "json",
        url: "http://192.168.2.196:8557/ZPXM/Zpxm.ashx",
        data: {
            "data": JSON.stringify(action)
        },

        async: false,
        error: function (request) {
            //hideLoading();
        },
        success: function (data) {
            //hideLoading();
            if (data.errcode == 0) {
                alert("发送成功！");
                console.log(data.data);
                alert()
                GetAllPublishedGoodsInfo(1);
                //location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            }
            else {
                alert(data.errmsg)
            }
        }
    });

});




//********************************************************************************导出excel开始
var nnn = "";
function submt() {
    document.getElementById('submit').value = '';
}
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById("tableExcel")
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = $(".panel-title").text() + '.xls';//表名称
        document.getElementById("dlink").click();
    }
})()
//var paixu = 'desc';
//var ip = 'user_id';
/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var action = { "action": "download partiCulars", "param": { "md5_id": "" + md5_id + "", "name": "" + name + "" } }
    $.ajax({
        cache: true,
        type: "GET",
        dataType: "json",
        url: "http://192.168.2.196:8557/ZPXM/Zpxm.ashx",
        data: {
            "data": JSON.stringify(action)
        },
        async: true,
        error: function (request) {
            alert("连接失败！");
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                var content = '';
                $.each(data.data, function (idx, obj) {
                    //var ip = obj.sort();

                    content += '<tr id=' + idx + '>';
                    content += '    <td class="ip">' + obj.ip + '</td>';
                    content += '    <td class="user_id">' + obj.user_id + '</td>';
                    content += '    <td class="user_name">' + obj.user_name + '</td>';                    
                    content += '    <td class="pid">' + obj.pid + '</td>';
                    content += '    <td class="name">' + obj.name + '</td>';//程序名
                    content += '    <td class="alias">' + obj.alias + '</td>';//别名
                    content += '    <td class="class">' + obj.class + '</td>';//分类
                    content += '    <td class="start_time">' + obj.start_time + '</td>';
                    content += '    <td class="exit_time">' + obj.exit_time + '</td>';
                    content += '    <td class="run_time">' + obj.run_time + '</td>';
                    switch (obj.status) {
                        case "0":
                            state = '已结束';
                            break;
                        case "1":
                            state = '正在进行';

                            break;

                    }
                    content += '    <td class="status">' + state + '</td>';
                    content += '</tr>';
                });
                $("#excel").empty();
                $("#excel").append(content);
                tableToExcel('tablename', 'name', 'zhangsan.xls'); //调用导出函数
            }
            else {
                alert(data.errmsg)
            }

        }

    });


});
//********************************************************************************导出excel结束


