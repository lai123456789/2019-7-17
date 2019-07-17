var 全局搜索 = '';
var 全局页码 = 1;
$(function () {
    //var rolecode = "";
    //GetPageList("IIS", "AuthorityManage.aspx?action=getrolepagelist", {
    //    "rolecode": rolecode
    //});

    var search = $('#search_content').val();
    全局搜索 = search;
    全局页码 = 1;
    GetList("IIS", "AuthorityManage.aspx?action=getrolelist", {
        "page": 1,
        "search": search
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
    GetList("IIS", "AuthorityManage.aspx?action=getrolelist", {
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
            GetList("IIS", "AuthorityManage.aspx?action=getallpcpage", {
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
    var rolename = $('#add_rolename').val();
    var remark = $('#add_remark').val();
    if (rolename == null || rolename == '') {
        alert('角色名称不能为空');
        return;
    }
    AddInfo("IIS", "AuthorityManage.aspx?action=addroleinfo", {
        "rolename": rolename,
        "remark": remark,
        "usercode": ""
    });
});


$(document).on('click', '#form_tb > tr > td > a.edit', function () {
    var obj_tr = $(this).parents('tr');

    var rolecode = $(obj_tr).find('.td_rolecode').text();
    var rolename = $(obj_tr).find('.td_rolename').text();
    var remark = $(obj_tr).find('.td_remark').text();

    $('#set_rolecode').text(rolecode);
    $('#set_rolename').val(rolename);
    $('#set_remark').val(remark);

    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');

});


$(document).on('click', '#set_sure', function () {
    var rolecode = $('#set_rolecode').text();
    var rolename = $('#set_rolename').val();
    if (rolename == null || rolename == '') {
        alert('页面名称不能为空');
        return;
    }
    var remark = $('#set_remark').val();
    SetInfo("IIS", "AuthorityManage.aspx?action=setroleinfo", {
        "rolecode": rolecode,
        "rolename": rolename,
        "remark": remark
    });
});

//$(document).on('click', '#form_tb > tr > td > a.del', function () {
//    var usercode = $(this).attr('data-usercode');
//    var username = $(this).attr('data-username');
//    if (confirm("确定要删除用户“" + username + "”的信息吗？")) {
//        DelUserInfo("IIS", "PageManage.aspx?action=deluserinfo", {
//            "usercode": usercode
//        });
//    }
//});



$(document).on('click', '#datalist2 > .panel-heading > .edit.contor', function () {
    if (!$(this).hasClass('disabled')) {
        $('#datalist2 > .panel-heading > .sava').addClass('contor');
        $(this).removeClass('contor');
        $('#datalist2 > .panel-heading > .addtable.contor').removeClass('contor');
    }
});


$(document).on('click', '#datalist3 > .panel-heading > .edit.contor', function () {
    if (!$(this).hasClass('disabled')) {
        $('#datalist3 > .panel-heading > .sava').addClass('contor');
        $(this).removeClass('contor');
    }
});


$(document).on('click', '#datalist2 > .panel-heading > .sava.contor', function () {
    var obj = $('#department_list .right_content i.choice.contor');
    var rolecode = $('#form_tb > tr.contor > .td_rolecode').text();

    if (rolecode == null || rolecode == '') {
        alert('未选中角色');
        return;
    }

    var 列表 = new Array();
    for (var i = 0; i < obj.length; i++) {
        var tbcode = $(obj[i]).attr('data-tbcode');
        var data = { "tbcode": tbcode };
        列表.push(data);
    }


    //对接接口，这里保存角色的Excel权限
    SavaRoleExcel();


    //SavaRoleInfo("IIS", "AuthorityManage.aspx?action=roleauthority", {
    //    "rolecode": rolecode,
    //    "rolepage": rolepage,
    //    "usercode": ""
    //});
});


$(document).on('click', '#datalist3 > .panel-heading > .sava.contor', function () {
    var obj = $('#department_list .right_content i.choice.contor');
    var rolecode = $('#form_tb > tr.contor > .td_rolecode').text();

    if (rolecode == null || rolecode == '') {
        alert('未选中角色');
        return;
    }

    var 列表 = new Array();
    for (var i = 0; i < obj.length; i++) {
        var tbcode = $(obj[i]).attr('data-tbcode');
        var data = { "tbcode": tbcode };
        列表.push(data);
    }


    //对接接口，这里保存角色的Excel权限
    SavaRoleAuthority();
});


$(document).on('click', '#form_tb > tr', function () {

    $(this).addClass('contor').siblings().removeClass('contor');
    $('#datalist2 > .panel-heading > .edit').removeClass('disabled');
    $('#datalist2 > .panel-heading > .addtable').removeClass('disabled');
    var rolecode = $('#form_tb > tr.contor > .td_rolecode').text();

    GetRoleExcelList();//调用获取角色下的所有Excel表，还未对接接口程序

    //GetRolePageList("IIS", "AuthorityManage.aspx?action=getrolepagelist", {
    //    "rolecode": rolecode
    //});

});


$(document).on('click', '#datalist2 > .panel-heading > .addtable.contor', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddTableModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddTableModal').modal('show');
});



$(document).on('click', '#add_tbsure', function () {
    //添加Excel表列表，未对接接口
    var 名称 = $('#add_excelname').val();
    AddExcelTable();
});



$(document).on('click', '#department_list .right_content i.choice', function () {
    if ($('#datalist2 > .panel-heading > .sava').hasClass('contor')) {
        if ($(this).hasClass('contor')) {
            $(this).removeClass('contor');
            var obj = $(this).parents('li.dd-item.dd3-item');
            var pagecode = $(obj).attr('data-pagecode');
            var superiorcode = $(obj).next('ol.dd-list').attr('data-superiorcode');
            if (pagecode == superiorcode) {
                $(obj).next('ol.dd-list').find('i.choice').removeClass('contor');
            }

            var sib_obj = $(obj).siblings();//所有兄弟级
            var isshow = true;
            for (var i = 0; i < sib_obj.length; i++) {
                if ($(sib_obj[i]).find('i.choice').hasClass('contor')) {
                    isshow = false;
                }
            }
            if (isshow) {
                var superiorcode = $(obj).parents('ol.dd-list').attr('data-superiorcode');
                var pagecode = $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').attr('data-pagecode');
                if (superiorcode == pagecode) {
                    $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').find('i.choice').removeClass('contor');
                }
            }

        }
        else {
            $(this).addClass('contor');
            var obj = $(this).parents('li.dd-item.dd3-item');
            var pagecode = $(obj).attr('data-pagecode');
            var superiorcode = $(obj).next('ol.dd-list').attr('data-superiorcode');
            if (pagecode == superiorcode) {
                $(obj).next('ol.dd-list').find('i.choice').addClass('contor');
            }

            var superiorcode = $(obj).parents('ol.dd-list').attr('data-superiorcode');
            var pagecode = $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').attr('data-pagecode');
            if (superiorcode == pagecode) {
                $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').find('i.choice').addClass('contor');
            }
        }
    }
});



$(document).on('click', '#department_list2 .right_content i.choice', function () {
    if ($('#datalist3 > .panel-heading > .sava').hasClass('contor')) {
        if ($(this).hasClass('contor')) {
            $(this).removeClass('contor');
            var obj = $(this).parents('li.dd-item.dd3-item');
            var pagecode = $(obj).attr('data-pagecode');
            var superiorcode = $(obj).next('ol.dd-list').attr('data-superiorcode');
            if (pagecode == superiorcode) {
                $(obj).next('ol.dd-list').find('i.choice').removeClass('contor');
            }

            var sib_obj = $(obj).siblings();//所有兄弟级
            var isshow = true;
            for (var i = 0; i < sib_obj.length; i++) {
                if ($(sib_obj[i]).find('i.choice').hasClass('contor')) {
                    isshow = false;
                }
            }
            if (isshow) {
                var superiorcode = $(obj).parents('ol.dd-list').attr('data-superiorcode');
                var pagecode = $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').attr('data-pagecode');
                if (superiorcode == pagecode) {
                    $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').find('i.choice').removeClass('contor');
                }
            }

        }
        else {
            $(this).addClass('contor');
            var obj = $(this).parents('li.dd-item.dd3-item');
            var pagecode = $(obj).attr('data-pagecode');
            var superiorcode = $(obj).next('ol.dd-list').attr('data-superiorcode');
            if (pagecode == superiorcode) {
                $(obj).next('ol.dd-list').find('i.choice').addClass('contor');
            }

            var superiorcode = $(obj).parents('ol.dd-list').attr('data-superiorcode');
            var pagecode = $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').attr('data-pagecode');
            if (superiorcode == pagecode) {
                $(obj).parents('ol.dd-list').prev('li.dd-item.dd3-item').find('i.choice').addClass('contor');
            }
        }
    }
});

/*
递归输出菜单
*/
function RecursionMenu(recursion, 上级代码) {
    var content = '';
    content += '<ol class="dd-list" data-superiorcode="' + 上级代码 + '">';
    for (var i = 0; i < recursion.length; i++) {
        content += '<li class="dd-item dd3-item" data-pagecode="' + recursion[i].页面代码 + '">';
        if (recursion[i].nodes.length > 0) {
            content += '    <div class="dd-handle dd3-handle"><i class="fa fa-minus"></i></div>';
        } else {
            content += '    <div class="dd-handle dd3-handle"></div>';
        }
        content += '    <div class="dd3-content">';
        content += '        <div class="left_content">' + recursion[i].页面名称 + '</div>';
        content += '        <div class="right_content">';
        if (recursion[i].角色代码 != null && recursion[i].角色代码 != '') {
            content += '            <i data-pagecode="' + recursion[i].页面代码 + '" data-superiorcode="' + recursion[i].上级页面代码 + '" class="iconfont choice contor">&#xe639;</i>'
        } else {
            content += '            <i data-pagecode="' + recursion[i].页面代码 + '" data-superiorcode="' + recursion[i].上级页面代码 + '" class="iconfont choice">&#xe639;</i>'
        }
        content += '        </div>';
        content += '    </div>';
        content += '</li>';
        if (recursion[i].nodes.length > 0) {
            content += RecursionMenu(recursion[i].nodes, recursion[i].页面代码)
        }
    }
    content += '</ol>';
    return content;
}

var getJsonTree = function (json_obj, superiorcode) {
    var itemArr = [];
    for (var i = 0; i < json_obj.length; i++) {
        var node = json_obj[i];
        //data.splice(i, 1)
        if (node.上级页面代码 == superiorcode) {
            var newNode = {
                "页面代码": node.页面代码,
                "页面名称": node.页面名称,
                "图标": node.图标,
                "链接地址": node.链接地址,
                "上级页面代码": node.上级页面代码,
                "导航显示": node.导航显示,
                "排序": node.排序,
                "角色代码": node.角色代码,
                "nodes": getJsonTree(json_obj, node.页面代码)
            };
            itemArr.push(newNode);
        }
    }
    return itemArr;
}


$(document).on('click', '#department_list .fa.fa-minus', function () {
    $(this).parent('.dd-handle.dd3-handle').parent('li.dd-item.dd3-item').next('ol.dd-list').hide();
    $(this).addClass('fa-plus').removeClass('fa-minus');
});


$(document).on('click', '#department_list .fa.fa-plus', function () {
    $(this).parent('.dd-handle.dd3-handle').parent('li.dd-item.dd3-item').next('ol.dd-list').show();
    $(this).addClass('fa-minus').removeClass('fa-plus');
});



$(document).on('click', '#department_list > ol.dd-list > li.dd-item.dd3-item', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
    var 表代码 = $(this).attr('data-tbcode');
    GetRoleExcelAuthority();//调用获取角色下的Excel表的所有功能权限，还未对接接口程序
});

/************************************* Ajax *******************************************/


/*
请求页面列表
*/
function GetPageList(urltype, pageurl, data) {
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
                var json_obj = new Array();
                var content = '';
                $.each(data.data, function (idx, obj) {
                    var data1 = {
                        "页面代码": obj.页面代码,
                        "页面名称": obj.页面名称,
                        "图标": obj.图标,
                        "链接地址": obj.链接地址,
                        "上级页面代码": obj.上级页面代码,
                        "导航显示": obj.导航显示,
                        "排序": obj.排序,
                        "角色代码": obj.角色代码
                    }
                    json_obj.push(data1);
                });


                var recursion = getJsonTree(json_obj, '');
                content = RecursionMenu(recursion, '');
                $('#department_list').empty();
                $('#department_list').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}






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
                    content += '<tr id="tr_' + idx + '">';
                    content += '    <td class="td_rolecode">' + obj.角色代码 + '</td>';
                    content += '    <td class="td_rolename">' + obj.角色名称 + '</td>';
                    content += '    <td class="td_remark">' + obj.备注 + '</td>';
                    content += '    <td class="td_updatetime">' + obj.更新时间 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="edit" data-rolecode="' + obj.角色代码 + '">编辑</a>';
                    //content += '        <a href="JavaScript:;" class="del"  data-rolecode="' + obj.角色代码 + '">删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                $('#datalist2 > .panel-heading > .edit').addClass('disabled');
                $('#datalist2 > .panel-heading > .edit').addClass('contor');
                $('#datalist2 > .panel-heading > .addtable').addClass('disabled');
                $('#datalist2 > .panel-heading > .addtable').addClass('contor');
                $('#datalist2 > .panel-heading > .sava').removeClass('contor');;
                $('#department_list .right_content i.choice').removeClass('contor');

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
                GetList("IIS", "AuthorityManage.aspx?action=getrolelist", {
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
                GetList("IIS", "AuthorityManage.aspx?action=getrolelist", {
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





/*
保存角色信息
*/
function SavaRoleInfo(urltype, pageurl, data) {
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
                alert('保存成功');
                $('#datalist2 > .panel-heading > .edit').addClass('contor');
                $('#datalist2 > .panel-heading > .addtable').addClass('contor');
                $('#datalist2 > .panel-heading > .sava.contor').removeClass('contor');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
获取角色Excel列表
*/
function GetRoleExcelList(urltype, pageurl, data) {
    //这里获取角色有权限的所有Excel列表
    //因为没有后台接口，这里虚拟一下

    var 列表 = new Array();
    var data1 = { "代码": "TB001", "名称": "采购表" };
    var data2 = { "代码": "TB002", "名称": "进度表" };
    列表.push(data1);
    列表.push(data2);
    var content = '';
    content += '<ol class="dd-list">';
    for (var i = 0; i < 列表.length; i++) {
        content += '<li class="dd-item dd3-item" data-tbcode="' + 列表[i].代码 + '">';
        content += '    <div class="dd-handle dd3-handle"></div>';
        content += '    <div class="dd3-content">';
        content += '        <div class="left_content">' + 列表[i].名称 + '</div>';
        content += '        <div class="right_content">';
        content += '            <i data-tbcode="' + 列表[i].代码 + '" class="iconfont choice contor">&#xe639;</i>';
        content += '        </div>';
        content += '    </div>';
        content += '</li>';
    }
    content += '</ol>';

    $('#department_list').empty();
    $('#department_list').append(content);
}


/*
获取角色Excel功能权限
*/
function GetRoleExcelAuthority(urltype, pageurl, data) {
    //这里获取选中的Excel表的功能权限
    //因为没有后台接口，这里虚拟一下
    var 列表 = new Array();
    var data1 = { "代码": "TA001", "名称": "管理权", "是否选中": "否" };//是否可以编辑或删除别人的行数据
    var data2 = { "代码": "TA002", "名称": "编辑表头", "是否选中": "是" };//是否可以编辑表头
    var data3 = { "代码": "TA003", "名称": "删除", "是否选中": "是" };//是否可以删除自己的行数据
    var data4 = { "代码": "TA004", "名称": "添加", "是否选中": "是" };//是否可以添加及编辑自己的行数据
    列表.push(data1);
    列表.push(data2);
    列表.push(data3);
    列表.push(data4);
    var content = '';
    content += '<ol class="dd-list">';
    for (var i = 0; i < 列表.length; i++) {
        content += '<li class="dd-item dd3-item" data-tbcode="' + 列表[i].代码 + '">';
        content += '    <div class="dd-handle dd3-handle"></div>';
        content += '    <div class="dd3-content">';
        content += '        <div class="left_content">' + 列表[i].名称 + '</div>';
        content += '        <div class="right_content">';
        if (列表[i].是否选中 == '是') {
            content += '            <i data-tbcode="' + 列表[i].代码 + '" class="iconfont choice contor">&#xe639;</i>';
        }
        else {
            content += '            <i data-tbcode="' + 列表[i].代码 + '" class="iconfont choice">&#xe639;</i>';
        }
        content += '        </div>';
        content += '    </div>';
        content += '</li>';
    }
    content += '</ol>';

    $('#department_list2').empty();
    $('#department_list2').append(content);
    $('#datalist3 > .panel-heading > .edit.disabled').removeClass('disabled');
}


/*
保存角色的表格权限
*/
function SavaRoleExcel(urltype, pageurl, data)
{
    //这里保存角色下的Excel表权限
    //因为没有后台接口，这里虚拟一下
    alert('保存成功')
    $('#datalist2 > .panel-heading > .edit').addClass('contor');
    $('#datalist2 > .panel-heading > .addtable').addClass('contor');
    $('#datalist2 > .panel-heading > .sava.contor').removeClass('contor');
}



/*
保存角色的功能权限
*/
function SavaRoleAuthority(urltype, pageurl, data) {
    //这里保存角色下的Excel表权限
    //因为没有后台接口，这里虚拟一下
    alert('保存成功')
    $('#datalist3 > .panel-heading > .edit').addClass('contor');
    $('#datalist3 > .panel-heading > .sava.contor').removeClass('contor');
}


function AddExcelTable(urltype, pageurl, data) {
    //这里添加Excel表格信息
    //因为没有后台接口，这里虚拟一下
    var 名称 = $('#add_excelname').val();
    var content = '';
    content += '<li class="dd-item dd3-item" data-tbcode="后台读取代码">';
    content += '    <div class="dd-handle dd3-handle"></div>';
    content += '    <div class="dd3-content">';
    content += '        <div class="left_content">' + 名称 + '</div>';
    content += '        <div class="right_content">';
    content += '            <i data-tbcode="后台读取代码" class="iconfont choice contor">&#xe639;</i>';
    content += '        </div>';
    content += '    </div>';
    content += '</li>';

    
    $('#department_list > ol.dd-list').append(content);
    $('#AddTableModal').modal('hide');
}


/*
获取角色权限列表
*/
function GetRolePageList(urltype, pageurl, data) {
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
                /*
                上级页面代码: ""
                图标: "fa fa-home"
                导航显示: "1"
                排序: "1"
                角色代码: "rc000001"
                链接地址: "/Page/index.html"
                页面代码: "pc0001"
                页面名称: "首页"
                */
                var json_obj = new Array();
                var content = '';
                $.each(data.data, function (idx, obj) {
                    var data1 = {
                        "页面代码": obj.页面代码,
                        "页面名称": obj.页面名称,
                        "图标": obj.图标,
                        "链接地址": obj.链接地址,
                        "上级页面代码": obj.上级页面代码,
                        "导航显示": obj.导航显示,
                        "排序": obj.排序,
                        "角色代码": obj.角色代码
                    }
                    json_obj.push(data1);
                });


                var recursion = getJsonTree(json_obj, '');
                content = RecursionMenu(recursion, '');
                $('#department_list').empty();
                $('#department_list').append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/************************************* Ajax End *******************************************/