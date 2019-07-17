var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportwf", {
        "page": 1,
        "search": 全局搜索
    });
})


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {

    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});



$(document).on('click', '#query_title > .query_content .query_btn', function () {
    var search = $('#search_content').val();
    全局搜索 = search;
    全局页码 = 1;
    GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportwf", {
        "page": 1,
        "search": search
    });
});


$(document).on('click', '#adduserinfo', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show')
});


//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            var search = $('#search_content').val();
            全局搜索 = search;
            全局页码 = 1;
            GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportwf", {
                "search": search,
                "page": 1
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {

    var ordernum = $('#add_ordernum').val();
    var materialnum = $('#add_materialnum').val();
    var condition = $('#add_condition').val();
    var expected = $('#add_expected').val();
    var slaimpact = $('#add_slaimpact').val();
    var erroritem = $('#add_erroritem').val();
    var coordinateitem = $('#add_coordinateitem').val();
    var todayemphasis = $('#add_todayemphasis').val();
    var reportdate = $('#add_reportdate').val();
    AddInfo("IIS", "ReportTable/SlamaterialAreport.aspx?action=addslamaterialareportwf", {
        "reportdate": reportdate,
        "ordernum": ordernum,
        "materialnum": materialnum,
        "condition": condition,
        "expected": expected,
        "slaimpact": slaimpact,
        "erroritem": erroritem,
        "coordinateitem": coordinateitem,
        "todayemphasis": todayemphasis,
        "usercode": ""
    });
});


$(document).on('click', '#form_tb > tr > td > a.edit', function () {
    var usercode = $(this).attr('data-usercode');
    $('#set_sure').attr('data-usercode', usercode);
    var obj_tr = $(this).parents('tr');
    var reportdate = $(obj_tr).find('.td_reportdate').text();
    var ordernum = $(obj_tr).find('.td_ordernum').text();
    var materialnum = $(obj_tr).find('.td_materialnum').text();
    var condition = $(obj_tr).find('.td_condition').text();
    var expected = $(obj_tr).find('.td_expected').text();
    var slaimpact = $(obj_tr).find('.td_slaimpact').text();
    var erroritem = $(obj_tr).find('.td_erroritem').text();
    var coordinateitem = $(obj_tr).find('.td_coordinateitem').text();
    var todayemphasis = $(obj_tr).find('.td_todayemphasis').text();
    var code = $(this).attr('data-code');

    $('#set_reportdate').val(reportdate);
    $('#set_ordernum').val(ordernum);
    $('#set_materialnum').val(materialnum);
    $('#set_condition').val(condition);
    $('#set_expected').val(expected);
    $('#set_slaimpact').val(slaimpact);
    $('#set_erroritem').val(erroritem);
    $('#set_coordinateitem').val(coordinateitem);
    $('#set_todayemphasis').val(todayemphasis);
    $('#set_sure').attr('data-code', code);

    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');

});


$(document).on('click', '#set_sure', function () {
    var reportdate = $('#set_reportdate').val();
    var ordernum = $('#set_ordernum').val();
    var materialnum = $('#set_materialnum').val();
    var condition = $('#set_condition').val();
    var expected = $('#set_expected').val();
    var slaimpact = $('#set_slaimpact').val();
    var erroritem = $('#set_erroritem').val();
    var coordinateitem = $('#set_coordinateitem').val();
    var todayemphasis = $('#set_todayemphasis').val();
    var code = $(this).attr('data-code');

    $('#set_materialnum').val(materialnum);
    $('#set_condition').val(condition);
    $('#set_expected').val(expected);
    $('#set_slaimpact').val(slaimpact);
    $('#set_erroritem').val(erroritem);
    $('#set_coordinateitem').val(coordinateitem);
    $('#set_todayemphasis').val(todayemphasis);

    SetInfo("IIS", "ReportTable/SlamaterialAreport.aspx?action=setslamaterialareportwf", {
        "reportdate": reportdate,
        "ordernum": ordernum,
        "materialnum": materialnum,
        "condition": condition,
        "expected": expected,
        "slaimpact": slaimpact,
        "erroritem": erroritem,
        "coordinateitem": coordinateitem,
        "todayemphasis": todayemphasis,
        "code": code,
        "usercode": ""
    });
});



/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetList(urltype, pageurl, data) {
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
                    content += '<tr id="tr_' + idx + '">';
                    content += '    <td class="td_reportdate">' + GetDateFormat(obj.报告日期, 'yyyy-MM-dd') + '</td>';
                    content += '    <td class="td_ordernum">' + obj.订单数 + '</td>';
                    content += '    <td class="td_materialnum">' + obj.材料款数 + '</td>';
                    content += '    <td class="td_condition">' + obj.当前状况.replace(/\n/g, "<br />") + '</td>';
                    content += '    <td class="td_expected">' + obj.预计交付日期.replace(/\n/g, "<br />") + '</td>';
                    content += '    <td class="td_slaimpact">' + obj.sla交付影响.replace(/\n/g, "<br />") + '</td>';
                    content += '    <td class="td_erroritem">' + obj.异常事项.replace(/\n/g, "<br />") + '</td>';
                    content += '    <td class="td_coordinateitem">' + obj.协调事项.replace(/\n/g, "<br />") + '</td>';
                    content += '    <td class="td_todayemphasis">' + obj.今日重点事项.replace(/\n/g, "<br />") + '</td>';
                    content += '    <td class="td_updatetime">' + GetDateFormat(obj.更新时间, 'yyyy-MM-dd') + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="edit" data-code="' + obj.代码 + '">编辑</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
获取用户列表
*/
function AddInfo(urltype, pageurl, data) {
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
                alert('添加成功');
                GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportwf", {
                    "search": 全局搜索,
                    "page": 全局页码
                });
                $('#AddUserModal').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
设置用户列表
*/
function SetInfo(urltype, pageurl, data) {
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
                $('#SetUserModal').modal('hide');
                GetList("IIS", "ReportTable/SlamaterialAreport.aspx?action=getslamaterialareportwf", {
                    "search": 全局搜索,
                    "page": 全局页码
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/************************************* Ajax End *******************************************/