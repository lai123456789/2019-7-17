var 全局搜索 = '';
var 全局页码 = 1;
$(function () {

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
    GetList("IIS", "PageManage.aspx?action=getallpcpage", {
        "page": 1,
        "search": search
    });
});


$(document).on('click', '#adduserinfo', function () {
    $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
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
            GetList("IIS", "PageManage.aspx?action=getallpcpage", {
                "search": search,
                "page": 1
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
    var ico = $('#add_ico').val();
    var pageurl = $('#add_pageurl').val();
    var pagesort = $('#add_pagesort').val();
    var isshow = $('#add_isshow > .label.label-default.contor').text();
    var superior = $('#add_superior').val();
    if (pagename == null || pagename == '') {
        alert('页面名称不能为空');
        return;
    }
    AddInfo("IIS", "PageManage.aspx?action=addpcpageinfo", {
        "pagename": pagename,
        "ico": ico,
        "pageurl": pageurl,
        "pagesort": pagesort,
        "isshow": isshow,
        "superior": superior
    });
});


$(document).on('click', '#form_tb > tr > td > a.edit', function () {
    var obj_tr = $(this).parents('tr');

    var pagecode = $(obj_tr).find('.td_pagecode').text();
    var pagename = $(obj_tr).find('.td_pagename').text();
    var ico = $(obj_tr).find('.td_ico').text();
    var pageurl = $(obj_tr).find('.td_pageurl').text();
    var pagesort = $(obj_tr).find('.td_sort').text();
    var isshow = $(this).attr('data-isshow');
    var superior = $(obj_tr).find('.td_superior').text();

    $('#set_pagecode').text(pagecode);
    $('#set_pagename').val(pagename);
    $('#set_ico').val(ico);
    $('#set_pageurl').val(pageurl);
    $('#set_pagesort').val(pagesort);
    $('#set_superior').val(superior);
    if (isshow == "1") {
        $('#set_isshow > .label.label-default:eq(0)').addClass('contor').siblings().removeClass('contor');
    } else {
        $('#set_isshow > .label.label-default:eq(1)').addClass('contor').siblings().removeClass('contor');;
    }
    $("#SetUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');

});


$(document).on('click', '#set_sure', function () {
    var pagecode = $('#set_pagecode').text();
    var pagename = $('#set_pagename').val();
    if (pagename == null || pagename == '') {
        alert('页面名称不能为空');
        return;
    }
    var ico = $('#set_ico').val();
    var pageurl = $('#set_pageurl').val();
    var pagesort = $('#set_pagesort').val();
    var superior = $('#set_superior').val();
    var isshow = $('#set_isshow > .label.label-default.contor').text();
    SetInfo("IIS", "PageManage.aspx?action=setpcpageinfo", {
        "pagecode": pagecode,
        "pagename": pagename,
        "ico": ico,
        "pageurl": pageurl,
        "pagesort": pagesort,
        "superior": superior,
        "isshow": isshow
    });
});

$(document).on('click', '#form_tb > tr > td > a.del', function () {
    var usercode = $(this).attr('data-usercode');
    var username = $(this).attr('data-username');
    if (confirm("确定要删除用户“" + username + "”的信息吗？")) {
        DelUserInfo("IIS", "PageManage.aspx?action=deluserinfo", {
            "usercode": usercode
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
                    content += '    <td class="td_pagecode">' + obj.页面代码 + '</td>';
                    content += '    <td class="td_pagename">' + obj.页面名称 + '</td>';
                    content += '    <td class="td_pageurl">' + obj.链接地址 + '</td>';
                    content += '    <td class="td_ico">' + obj.图标 + '</td>';
                    content += '    <td class="td_sort">' + obj.排序 + '</td>';
                    content += '    <td class="td_superior">' + obj.上级页面代码 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="edit" data-pagecode="' + obj.页面代码 + '" data-isshow="' + 导航显示 + '">编辑</a>';
                    content += '        <a href="JavaScript:;" class="del"  data-pagecode="' + obj.页面代码 + '">删除</a>';
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
                GetList("IIS", "PageManage.aspx?action=getallpcpage", {
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
                GetList("IIS", "PageManage.aspx?action=getallpcpage", {
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
                GetList("IIS", "PageManage.aspx?action=getallpcpage", {
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