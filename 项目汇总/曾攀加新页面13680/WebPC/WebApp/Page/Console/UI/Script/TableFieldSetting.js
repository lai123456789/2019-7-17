var 全局搜索 = '';
var 全局页码 = 1;

var 用户列表 = [];

$(function () {
    //var rolecode = "";
    //GetPageList("IIS", "AuthorityManage.aspx?action=getrolepagelist", {
    //    "rolecode": rolecode
    //});

    var search = $('#search_content').val();
    全局搜索 = search;
    全局页码 = 1;
    GetList("IIS", "/Console/TableSetting.aspx?action=gettableconfiglist", {});

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
    GetList("IIS", "/Console/TableSetting.aspx?action=gettableconfiglist", {});
});


$(document).on('click', '#adduserinfo', function () {
    $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show')
});





$(document).on('click', '#add_isshow > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});

$(document).on('click', '#set_isshow > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#add_sure', function () {
    var urltype = $('#add_urltype').val();
    var pageurl = $('#add_pageurl').val();
    var remark = $('#add_remark').val();
    if (urltype == null || urltype == '') {
        alert('URL类型不能为空');
        return;
    }
    if (pageurl == null || pageurl == '') {
        alert('页面URL不能为空');
        return;
    }
    if (remark == null || remark == '') {
        alert('备注不能为空');
        return;
    }
    AddInfo("IIS", "/Console/TableSetting.aspx?action=addtableconfiglist", {
        "urltype": urltype,
        "pageurl": pageurl,
        "remark": remark
    });

});


$(document).on('click', '#form_tb > tr > td > a.edit', function () {
    var obj_tr = $(this).parents('tr');

    var tbcode = $(obj_tr).find('.td_tbcode').text();
    var urltype = $(obj_tr).find('.td_urltype').text();
    var pageurl = $(obj_tr).find('.td_pageurl').text();
    var remark = $(obj_tr).find('.td_remark').text();

    $('#set_tbcode').text(tbcode);
    $('#set_urltype').val(urltype);
    $('#set_pageurl').val(pageurl);
    $('#set_remark').val(remark);

    $("#SetUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#SetUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#SetUserModal').modal('show');
});


$(document).on('click', '#set_sure', function () {
    var tbcode = $('#set_tbcode').text();
    var urltype = $('#set_urltype').val();
    var pageurl = $('#set_pageurl').val();
    var remark = $('#set_remark').val();
    if (urltype == null || urltype == '') {
        alert('URL类型不能为空');
        return;
    }
    if (pageurl == null || pageurl == '') {
        alert('页面URL不能为空');
        return;
    }
    if (remark == null || remark == '') {
        alert('备注不能为空');
        return;
    }
    var remark = $('#set_remark').val();
    SetInfo("IIS", "/Console/TableSetting.aspx?action=settableconfiglist", {
        "tbcode": tbcode,
        "urltype": urltype,
        "pageurl": pageurl,
        "remark": remark
    });
});

$(document).on('click', '#form_tb2 td a.del', function () {
    var 表代码 = $(this).attr('data-tbcode');
    var 字段名 = $(this).attr('data-fieldname');
    if (confirm("确定要删除用户“" + 字段名 + "”的信息吗？")) {
        DelUserInfo("IIS", "/Console/TableSetting.aspx?action=deltablefieldinfolist", {
            "tbcode": 表代码,
            "fieldname": 字段名
        });
    }
});



$(document).on('click', '#datalist2 > .panel-heading > .binduser', function () {
    if (!$(this).hasClass('disabled')) {
        //$(this).addClass('disabled');
        $('#BindUserModule').modal('show');
    }
});


$(document).on('click', '#datalist2 > .panel-heading > .sava.contor', function () {
    var obj = $('#department_list .right_content i.choice.contor');
    var rolecode = $('#form_tb > tr.contor > .td_rolecode').text();

    if (rolecode == null || rolecode == '') {
        alert('未选中角色');
        return;
    }

    var rolepage = new Array();
    for (var i = 0; i < obj.length; i++) {
        var pagecode = $(obj[i]).attr('data-pagecode');
        var data = { "pagecode": pagecode };
        rolepage.push(data);
    }

    SavaRoleInfo("IIS", "AuthorityManage.aspx?action=roleauthority", {
        "rolecode": rolecode,
        "rolepage": rolepage,
        "usercode": ""
    });


});


$(document).on('click', '#form_tb > tr', function () {

    $(this).addClass('contor').siblings().removeClass('contor');
    $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
    //var rolecode = $('#form_tb > tr.contor > .td_rolecode').text();
    //GetRolePageList("IIS", "AuthorityManage.aspx?action=getrolepagelist", {
    //    "rolecode": rolecode
    //});
    

    var tbcode = $('#form_tb > tr.contor > td.td_tbcode').text().trim();
    $('#addf_tbcode').text(tbcode);
    if (tbcode != null && tbcode != '') {
        GetBindUserList("IIS", "/Console/TableSetting.aspx?action=gettablefieldinfolist", {
            "tbcode": tbcode
        });
    }

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


$(document).on('click', '#set_bindusersure', function () {
    
    var 表代码 = $('#addf_tbcode').text();
    var 字段名 = $('#addf_fieldname').val();
    var 排序 = $('#addf_sort').val();
    var 别名 = $('#addf_alias').val();
    var 是否显示 = $('#addf_isshow').val();
    var 宽度 = $('#addf_widthsize').val();

    if (表代码 != null && 表代码 != '') {
        BindUserList("IIS", "/Console/TableSetting.aspx?action=addtablefieldinfolist", {
            "fieldname": 字段名,
            "sort": 排序,
            "tbcode": 表代码,
            "usercode": "",
            "alias": 别名,
            "isshow": 是否显示,
            "widthsize": 宽度
        });
    }
    else {
        alert('未选中表');
    }
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
function GetUserList(urltype, pageurl, data) {
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
                用户列表 = [];
                $.each(data.data, function (idx, obj) {
                    var arr = { value: obj.用户代码, text: obj.名称, form: obj.工号 };
                    用户列表.push(arr);
                });

                //自定义选择/展示-2
                $('#binduserlist').bigAutocomplete({
                    data: 用户列表,
                    title: 'text|form',
                    formatItem: function (data, i, row) {
                        return row.text + ' (' + row.form + ')';
                    },
                    //默认formatSelected=formatItem,这里formatSelected不同,额外定义
                    formatSelected: function (data, i, row) {
                        return row.text;
                    },
                    callback: function (row) {
                        $('#binduserlist').attr('data-val', row.value);
                        $('#binduserlist').attr('data-account', row.form);
                        $('#binduserlist').attr('data-name', row.text);
                    },
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
绑定用户列表
*/
function BindUserList(urltype, pageurl, data) {
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
                alert('添加成功成功');
                var tbcode = $('#form_tb > tr.contor > td.td_tbcode').text().trim();
                if (tbcode != null && tbcode != '') {
                    GetBindUserList("IIS", "/Console/TableSetting.aspx?action=gettablefieldinfolist", {
                        "tbcode": tbcode
                    });
                }
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
获取绑定用户列表
*/
function GetBindUserList(urltype, pageurl, data) {
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
                    content += '<td>' + obj.字段名 + '</td>';
                    content += '<td>' + obj.别名 + '</td>';
                    content += '<td>' + obj.是否显示 + '</td>';
                    content += '<td>' + obj.宽度大小 + '</td>';
                    content += '<td>' + obj.排序 + '</td>';
                    content += '<td>';
                    content += '<a class="del" data-tbcode="' + obj.表代码 + '" data-fieldname="' + obj.字段名 + '">删除</a>';
                    content += '</td>';
                    content += '</tr>';
                });
                $('#form_tb2').empty();
                $('#form_tb2').append(content);
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
                    content += '    <td class="td_tbcode">' + obj.表格代码 + '</td>';
                    content += '    <td class="td_urltype" >' + obj.url类型 + '</td>';
                    content += '    <td class="td_pageurl">' + obj.页面url + '</td>';
                    content += '    <td class="td_remark">' + obj.备注 + '</td>';
                    content += '    <td style="width:100px;">';
                    content += '        <a href="JavaScript:;" class="edit" data-tbcode="' + obj.表格代码 + '">编辑</a>';
                    //content += '        <a href="JavaScript:;" class="del"  data-rolecode="' + obj.角色代码 + '">删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                $('#datalist2 > .panel-heading > .edit').addClass('disabled');
                $('#datalist2 > .panel-heading > .edit').addClass('contor').siblings().removeClass('contor');;
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
                GetList("IIS", "/Console/TableSetting.aspx?action=gettableconfiglist", {});
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
                GetList("IIS", "/Console/TableSetting.aspx?action=gettableconfiglist", {});
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
                var tbcode = $('#form_tb > tr.contor > td.td_tbcode').text().trim();
                if (tbcode != null && tbcode != '') {
                    GetBindUserList("IIS", "/Console/TableSetting.aspx?action=gettablefieldinfolist", {
                        "tbcode": tbcode
                    });
                }
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
                $('#datalist2 > .panel-heading > .sava.contor').removeClass('contor');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
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