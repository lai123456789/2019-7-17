var 全局搜索 = '';
var 全局页码 = 1;

$(function () {
    $("#pagination_P0001").pagination({
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
            twoval = $('#selectval').val();
            ship = $('#twovaselect').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            //numbership = $('#numberval').val();
            //numberval = $('#numqty').val();
            全局页码 = currPage;
            GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
                "page": 1,
                "oneval": search
            });
        }
    });
});



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

$(function () {
    //var rolecode = "";
    //GetPageList("IIS", "AuthorityManage.aspx?action=getrolepagelist", {
    //    "rolecode": rolecode
    //});

    var search = '';
    全局搜索 = search;
    全局页码 = 1;
    
    GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
        "page": 1,
        "oneval": search
    });
})


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    var search = $('#search_content').val();
    全局搜索 = search;
    全局页码 = 1;
    GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
        "page": 1,
        "oneval": search
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
            GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
                "page": 1,
                "oneval": search
            });
        }
    }
})


$(document).on('click', '#add_isshow > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});

$(document).on('click', '#set_isshow > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {
    var pagename = $('#add_pagename').val();
    if (pagename == null || pagename == '') {
        alert('长期关键字不能为空');
        return;
    }
    AddInfo("IIS3380", "AdvanceOrder.aspx?action=addKeyword", {
        "kname": pagename,
        "usercode":""
    });
});


$(document).on('click', '#form_tb > tr > td > a.edit', function () {
    var obj_tr = $(this).parents('tr');

    var pagecode = $(obj_tr).find('.td_kcode').text();
    var pagename = $(obj_tr).find('.td_kname').text();

    $('#set_pagecode').text(pagecode);
    $('#set_pagename').val(pagename);
    //if (isshow == "1") {
    //    $('#set_isshow > .label.label-default:eq(0)').addClass('contor').siblings().removeClass('contor');
    //} else {
    //    $('#set_isshow > .label.label-default:eq(1)').addClass('contor').siblings().removeClass('contor');;
    //}
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');

});


$(document).on('click', '#set_sure', function () {
    var pagecode = $('#set_pagecode').text();
    var pagename = $('#set_pagename').val();
    if (pagename == null || pagename == '') {
        alert('关键字名称不能为空');
        return;
    }
    
    SetInfo("IIS3380", "AdvanceOrder.aspx?action=updataKeyword", {
        "kcode": pagecode,
        "kname": pagename,
        
    });
});

$(document).on('click', '#form_tb > tr > td > a.del', function () {
    //var usercode = $(this).attr('data-usercode');
    //var username = $(this).attr('data-username');
    var kcode = $(this).attr('data-kcode');
    if (confirm("确定要删除这行的信息吗？")) {
        DelUserInfo("IIS3380", "AdvanceOrder.aspx?action=deleteKeyword", {
            "kcode": kcode,
        });
    }
});

/************************************* Ajax *******************************************/

/*
获取列表
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
                    var 上级页面代码 = obj.上级页面代码;
                    var 图标 = obj.图标;
                    var 导航显示 = obj.导航显示;
                    var 排序 = obj.排序;
                    var 链接地址 = obj.链接地址;
                    var 页面代码 = obj.页面代码;
                    var 页面名称 = obj.页面名称;
                    content += '<tr id="tr_' + idx + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(全局页码) - 1) * 9)) + '</td>';
                    content += '    <td class="td_kcode" style="display: none;">' + obj.kcode + '</td>';
                    content += '    <td class="td_kname">' + obj.kname + '</td>';
                    content += '    <td class="td_username">' + obj.username + '</td>';
                    content += '    <td class="td_createdate">' + obj.createdate + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="edit" data-kcode="' + obj.kcode + '">编辑</a>';
                    content += '        <a href="JavaScript:;" class="del"  data-kcode="' + obj.kcode + '">删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0001").pagination('setPage', parseFloat(全局页码), parseFloat(pagecount));

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
                GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
                    "page": 全局页码,
                    "oneval": 全局搜索
                });
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
                GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
                    "page": 全局页码,
                    "oneval": 全局搜索
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
删除用户列表
*/
function DelUserInfo(urltype, pageurl, data) {
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
                alert('删除成功');
                GetList("IIS3380", "AdvanceOrder.aspx?action=GetKeyword", {
                    "page": 全局页码,
                    "oneval": 全局搜索
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/************************************* Ajax End *******************************************/