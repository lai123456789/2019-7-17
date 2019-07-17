
/************************************* Ajax End *******************************************/
//这里开始写的


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    var gonghao_select = $("#gonghao").val();
    var select_input = $('#select_input option:selected').val();

    GetAllPublishedGoodsInfo(1);
    
});

$(function () {
    GetAllPublishedGoodsInfo(1,ip,paixu);
});


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

$(document).on('change', '#rn_time', function () {
    var a = $(this).val();
    
    if (a == '全部') {
        $('#rn_time_val').hide();
    }
    else {
        $('#rn_time_val').show();
    }
});


$(document).on('change', '#select_input', function () {
    var 类型二 = $('#select_input option:selected').val();
    if (类型二 == 'time') {
        $('#gonghao').hide();
        $('#datetype_date').show();
    }
    else {
        $('#gonghao').show();
        $('#datetype_date').hide();
    }
});


var paixu = 'desc';
var ip = 'name';
//var ip = '';
function GetAllPublishedGoodsInfo(page) {
    var select_input = $('#select_input option:selected').val();
    var gonghao_select = $("#gonghao").val();

    var twotype = $('#twotype').val(); //全部1
    var twoval = $('#twoval').val();
    var onetype = $('#onetype').val(); //全部2
    var oneval = $('#oneval').val();
    var datetype = $('#datetype').val(); //全部3
    var startdate = $('#startdate').val();
    var enddate = $('#enddate').val();
    var runtime = $('#rn_time').val(); //全部运行时长
    var run_startime = $('#startdate1').val();
    var run_endtime = $('#enddate1').val();
                                                       // { "action": "tabulate data", "param": { "page": "1", "fieldName": "user_id", "rank": "desc", "field_type": "全部","search":"7","field_type2":"全部","search2":"360","field_time":"全部",                                                      "start_time_interval":"2019-5-8 8:01:02","end_time_interval":"2019-5-8 8:30:05",            "field_time2":"全部","start_run_time":"3.3","end_run_time":"3.5"} }
    var action = { "action": "tabulate data", "param": { "page": "" + page + "", "fieldName": "" + ip + "", "rank": "" + paixu + "", "field_type": "" + twotype + "", "search": "" + twoval + "", "field_type2": "" + onetype + "", "search2": "" + oneval + "", "field_time": "" + datetype + "", "start_time_interval": "" + startdate + "", "end_time_interval": "" + enddate + "", "field_time2": "" + runtime + "", "start_run_time": "" + run_startime + "", "end_run_time": "" + run_endtime + "" } };
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
                    content += '    <td class="md5_id" style="display:none">' + obj.md5_id + '</td>';
                    //content += '    <td class="guid">' + obj.guid + '</td>';
                    content += '    <td class="uuid">' + obj.uuid + '</td>';
                    content += '    <td class="name">' + obj.name + '</td>';//程序名
                    content += '    <td class="alias"><input id="bieming" value="' + obj.alias + '" type="text" style="border:0; width:100%;height:18px;" class="form-control"/></td>';//别名
                    content += '    <td class="class"><input id="fenlei" value="' + obj.class + '" type="text" style="border:0; width:100%;height:18px;" class="form-control"/></td>';//分类
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
                    content += '    <td><a id="chakan" href="rizhi_select_info.html?Wid=' + obj.md5_id + '&name=' + obj.name + '">查看</a></td>';
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

$(document).on('blur', '#bieming', function () {
    var tr = $(this).parents("tr").attr("id");   
    var name = $("#" + tr + "").find(".name").text();//程序名
    var alias = $("#" + tr + "").find("#bieming").val();//别名
    var action = { "action": "update process", "param": { "name": "" + name + "", "alias": "" + alias + ""} };
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
            return;
            location.href = "rizhi_select.html";            
        }
    });
});
$(document).on('blur', '#fenlei', function () {
    var tr = $(this).parents("tr").attr("id");
    var name = $("#" + tr + "").find(".name").text();//程序名
    var fenlei = $("#" + tr + "").find("#fenlei").val();//分类
    var action = { "action": "update process", "param": { "name": "" + name + "", "classify": "" + fenlei + "" } };
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
         
        },
        success: function (data) {           
            return;
            location.href = "rizhi_select.html";
            
        }
    });

});

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
    
    var name = $(obj_tr).find('.name').text();
    
    //var action = { "action": "get partiCulars", "param": { "md5_id": "" + md5_id + "", "name": "" + name + "" } }
    var action = { "action": "get partiCulars", "param": { "page": "" + page + "", "md5_id": "" + md5_id + "", "name": "" + name + "", "key": "" + ip + "", "value": "" + paixu + "" } }

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
var paixu = 'desc';
var ip = 'user_id';
/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var action = { "action": "download data", "param": { "key": "" + ip + "", "value": "" + paixu + "" } }
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
                    content += '    <td class="md5_id" style="display:none">' + obj.md5_id + '</td>';
                    content += '    <td class="guid">' + obj.guid + '</td>';
                    content += '    <td class="uuid">' + obj.uuid + '</td>';
                    content += '    <td class="name">' + obj.name + '</td>';//程序名
                    content += '    <td class="alias"><input id="bieming" value="' + obj.alias + '" type="text" style="border:0; width:100%;" class="form-control"/></td>';//别名
                    content += '    <td class="class"><input id="fenlei" value="' + obj.class + '" type="text" style="border:0; width:100%;" class="form-control"/></td>';//分类
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


