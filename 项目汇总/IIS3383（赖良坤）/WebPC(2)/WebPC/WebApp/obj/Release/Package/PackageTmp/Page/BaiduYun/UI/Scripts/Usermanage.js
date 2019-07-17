
/************************************* Ajax End *******************************************/
//这里开始写的

           
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
                    content += '<tr id='+ idx +'>';
                    content += '    <td class="ip">' + obj.ip + '</td>';
                    content += '    <td class="md5_id" style="display:none;">' + obj.md5_id + '</td>';
                    content += '    <td class="guid">' + obj.guid + '</td>';
                    content += '    <td class="uuid">' + obj.uuid + '</td>';
                    content += '    <td class="user_id">' + obj.user_id + '</td>';
                    content += '    <td class="user_name">' + obj.user_name + '</td>';
                    content += '    <td><a id="xiugai" href="#">编辑</a><a style="padding-left:10px" id="shezhi" href="#">设置为管理员</a></td>';
                   
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
$(document).on('click', '#add_sure_edit', function () {   
    var reportdate = $('#IP_edit').val();
    var ordernum = $('#MD5_ID_edit').val();
    var materialnum = $('#GUID_edit').val();
    var condition = $('#UUID_edit').val();
    var expected = $('#user_id_edit').val();
    var slaimpact = $('#user_name_edit').val();
    var action = { "action": "set user", "param": { "md5_id": "" + ordernum + "", "user_id": "" + expected + "", "user_name": "" + slaimpact + "" } }
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
                alert("编辑成功！");
                GetAllPublishedGoodsInfo(1);
                //location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            }
            else {
                alert(data.errmsg)
            }
        }
    });
    
});

function see_admin() {
    var action = { "action": "all admin" };
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
                    content += '<tr class=' + idx + '>';
                    content += '    <td class="admin_id">' + obj.user_id + '</td>';
                    content += '    <td class="admin_name">' + obj.user_name + '</td>';
                    content += '    <td><a id="quxiao" href="#">取消管理员身份</a></td>';
                    content += '</tr>';
                });
                $('#admin_show').empty();
                $('#admin_show').append(content);
            }
            else {
                alert(data.errmsg)
            }

        }

    });
}
//弹框查看所有管理员表
$(document).on('click', '#guanliyuan', function () {      
    see_admin();
    //$('#admin_show').empty();
    
    $('#AddUserModal_admin').modal('show');
    $("#modalDialog1").draggable();//为模态对话框添加拖拽
    $("#AddUserModal_admin").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
})

//设置为管理员
$(document).on('click', '#shezhi', function () {
    // var tid = $(this).parents("tr").attr('id');    
    var obj_tr = $(this).parents('tr');
    var ip = $(obj_tr).find('.ip').text();    
    var user_id = $(obj_tr).find('.user_id').text();//获取每一行对应的用户工号user_id
    var action = { "action": "add admin", "param": { "user_id": "" + user_id + "" } };
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
            //hideLoading();
            if (data.errcode == 0) {
                alert("设置管理员成功！");
                
               
                //location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
            } else {
                // alert(data.errmsg);
                alert("该用户已是管理员,请不要重复设置！")
            }
                
            
            
        }
    });
});
//取消管理员
$(document).on('click', '#quxiao', function () {
    // var tid = $(this).parents("tr").attr('id');    
    var obj = $(this).parents('tr');
    var user_id = $(obj).find('.admin_id').text();//获取每一行对应的用户工号user_id
    var action = { "action": "delete admin", "param": { "user_id": "" + user_id + "" } };
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
                alert("取消成功！");
                see_admin();
                //location.href = "admin_user.html";  //修改之后  还是跳转回这个页面 刷新一遍
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
                    content += '    <td class="ip">' + obj.ip + '</td>';
                    content += '    <td class="md5_id"  style="display:none">' + obj.md5_id + '</td>';
                    content += '    <td class="guid">' + obj.guid + '</td>';
                    content += '    <td class="uuid">' + obj.uuid + '</td>';
                    content += '    <td class="user_id">' + obj.user_id + '</td>';
                    content += '    <td class="user_name">' + obj.user_name + '</td>';
                    
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



