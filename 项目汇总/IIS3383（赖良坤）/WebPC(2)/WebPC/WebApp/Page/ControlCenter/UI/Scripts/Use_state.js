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
    var action = { "action": "download computer", "param": { "key": "" + ip + "", "value": "" + paixu + "" } }
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
                    content += '    <td class="user_id">' + obj.user_id + '</td>';
                    content += '    <td class="user_name">' + obj.user_name + '</td>';
                    content += '    <td class="ip">' + obj.ip + '</td>';
                    content += '    <td class="md5_id"  style="display:none">' + obj.md5_id + '</td>';
                    content += '    <td class="guid">' + obj.guid + '</td>';
                    content += '    <td class="uuid">' + obj.uuid + '</td>';
                    switch (obj.status) {
                        case "0":
                            state = '离线';
                            break;
                        case "1":
                            state = '在线';

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
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    var gonghao_select = $("#gonghao").val();
    GetAllPublishedGoodsInfo(1);

});

$(function () {
    GetAllPublishedGoodsInfo(1);
});

var paixu = 'desc';
var ip = 'user_id';
function GetAllPublishedGoodsInfo(page) {
    var gonghao_select = $("#gonghao").val();
    //var gong_name = $("#gonghao").val();
    var action = { "action": "select computer", "param": { "page": "" + page + "", "val": "" + ip + "", "paixu": "" + paixu + "", "search": "" + gonghao_select + "" } }; //,"param":{"pageurl": "pageurl"}
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
                    content += '    <td class="user_id">' + obj.user_id + '</td>';
                    content += '    <td class="user_name">' + obj.user_name + '</td>';
                    content += '    <td class="ip">' + obj.ip + '</td>';
                    content += '    <td class="md5_id"  style="display:none">' + obj.md5_id + '</td>';
                    content += '    <td class="guid">' + obj.guid + '</td>';
                    content += '    <td class="uuid">' + obj.uuid + '</td>';
                    switch (obj.status) {
                        case "0":
                            state = '离线';
                            break;
                        case "1":
                            state = '在线';

                            break;

                    }
                    content += '    <td class="status">' + state + '</td>';
                    content += '    <td><a id="fabu" href="#">推送消息</a></td>';
                    content += '</tr>';
                });
                $('#form_tb1').empty();
                $('#form_tb1').append(content);

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
var md5_id = '';
var uname = '';
$(document).on('click', '#fabu', function () {
    // var tid = $(this).parents("tr").attr('id');    
    var obj_tr = $(this).parents('tr');
   
    md5_id = $(obj_tr).find('.md5_id').text();
    uname = $(obj_tr).find('.user_id').text();//工号
    
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
    //$('#IP_edit').val(ip);
    $('#MD5_ID_edit').text(md5_id);
    $('#uname').text(uname);
    //$('#GUID_edit').val(guid);
    //$('#UUID_edit').val(uuid);
    //$('#user_id_edit').val(user_id);
    //$('#user_name_edit').val(user_name);

});
function displayResult() {  //限制标题的输入长度为10
    var x = document.getElementById("biaoti");
    if (x.value.length > 10) {
        $("#error").show();
        return;
        //setTimeout(function () {
        //    $("#error").hide();
        //}, 2000);
    } else {
        $("#error").hide();
    }
}
$(document).on('click', '#upload_info', function () {
    var md5_id = $('#MD5_ID_edit').text();
    var uname = $('#uname').text();
    var base64_img = '';   
    var length = $('.weui_uploader_files .weui_uploader_file').length;    
    if (length == 1) {
    var obj = $('.weui_uploader_files li:eq(0)');
    var topimg = $(obj).css("backgroundImage");    //拿到base64地址
    topimg1 = topimg.split('("')[1].split('")')[0];//截取base64地址 
    }
   // var base64_img = topimg1; //图片的base64
    switch (length) {
            case 0:
                base64_img = '';
                break;
            case 1:
                base64_img = topimg1;
                break;            
    }
    var title = $("#biaoti").val();
    var wenzi = $("#descrip_content").val(); //文字
    //var md5_id = 
    var url = $("#url1").val();  //url地址
    var action = { "action": "popups image", "param": { "md5_id": "" + md5_id + "", "image": "" + base64_img + "", "title": "" + title + "" ,"content": "" + wenzi + "", "source": "控制中心", "terminal": "" + uname + "", "url": "" + url + "" } }
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "http://192.168.2.196:8557/ZPXM/Zpxm.ashx",
        data: {
            "data": JSON.stringify(action)
        },
        async: false,
        error: function (request) {
            //hideLoading();
            //alert("推送失败！")
        },
        success: function (data) {            
            //hideLoading();   
            //alert("成功！")
                if (data.errcode == 0) {
                    alert(data.errmsg);
                //GetAllPublishedGoodsInfo(1);
                //location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            }
        }

    });
    //alert("推送成功！");
});


