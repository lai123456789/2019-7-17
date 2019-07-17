


var 表格字段列表 = new Array();
/*
表格设置按钮判断，验证是否有权限
*/
function TableSetingBtn(TbCode, TFunc) {
    表格字段列表 = [];
    GetUserTableFieldSetingList("IIS", "/Console/TableSetting.aspx?action=getusertablefieldinfolist", {
        "tbcode": TbCode,
        "usercode": ""
    }, function () {
        TFunc();
    });
}


$(document).on('click', '#tablesetting_btn > .btn_setting', function () {
    var content = '';
    var 表代码
    for (var i = 0; i < 表格字段列表.length; i++) {
        var 字段名 = 表格字段列表[i].字段名;
        var 别名 = 表格字段列表[i].别名;
        var 是否显示 = 表格字段列表[i].是否显示;
        var 宽度大小 = 表格字段列表[i].宽度大小;
        var 排序 = 表格字段列表[i].排序;
        if (表代码 == null || 表代码 == '') {
            表代码 = 表格字段列表[i].表代码;
        }
        content += '<tr>';
        content += '    <td class="fieldname" data-fieldname="' + 字段名 + '">' + 别名 + '</td>';
        content += '    <td>';
        if (是否显示 == "1") {
            content += '        <i class="iconfont choice contor">&#xe639;</i>';
        } else {
            content += '        <i class="iconfont choice">&#xe639;</i>';
        }
        content += '    </td>';
        content += '    <td>';
        content += '        <input class="widthsize" type="number" value="' + 宽度大小 + '" min="1" />';
        content += '    </td>';
        content += '    <td>';
        content += '        <input class="sort" type="number" value="' + 排序 + '" min="1" />';
        content += '    </td>';
        content += '</tr>';
    }
    $('#TableAttributeSetting_tbody').empty();
    $('#TableAttributeSetting_tbody').append(content);

    $('#TableAttributeSetting_sure').attr('data-tbcode', 表代码);
    $('#TableAttributeSetting_reset').attr('data-tbcode', 表代码);
    $('#TableAttributeSetting').modal('show');
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
});


$(document).on('click', '#TableAttributeSetting_sure', function () {
    var 表代码 = $(this).attr('data-tbcode');
    var obj = $('#TableAttributeSetting_tbody > tr');
    var child = new Array();
    for (var i = 0; i < obj.length; i++) {
        var fieldname = $(obj[i]).find('.fieldname').attr('data-fieldname');
        var alias = $(obj[i]).find('.fieldname').text();
        var isshow = "0";
        if ($(obj[i]).find('.iconfont.choice').hasClass('contor')) {
            isshow = "1";
        } else {
            isshow = "0";
        }
        var widthsize = $(obj[i]).find('.widthsize').val();
        var sort = $(obj[i]).find('.sort').val();
        var 数据 = {
            "fieldname": fieldname,
            "isshow": isshow,
            "widthsize": widthsize,
            "sort": sort,
            "alias": alias
        }
        child.push(数据);
    }

    SetUserTableFieldSetingList("IIS", "/Console/TableSetting.aspx?action=setusertablefieldinfolist", {
        "tbcode": 表代码,
        "child": child,
        "usercode": ""
    })
});

$(document).on('click', '#TableAttributeSetting td .iconfont.choice', function () {
    $(this).toggleClass('contor');
});


$(document).on('click', '#TableAttributeSetting_reset', function () {
    var 表代码 = $(this).attr('data-tbcode');
    if (confirm('这是恢复默认设置?')) {
        ResetUserTableFieldSetingList("IIS", "/Console/TableSetting.aspx?action=resetusertablefieldinfolist", {
            "tbcode": 表代码,
            "usercode": ""
        })
    }
});

/*********************************************************************************************/
/***************************************** Ajax **********************************************/
/*********************************************************************************************/

/*
获取用户级表格字段设置列表
*/
function GetUserTableFieldSetingList(urltype, pageurl, data, Tfunc) {
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
                $.each(data.data, function (idx, obj) {
                    var 数据 = {
                        "表代码": obj.表代码,
                        "字段名": obj.字段名,
                        "排序": obj.排序,
                        "是否显示": obj.是否显示,
                        "别名": obj.别名,
                        "宽度大小": obj.宽度大小
                    }
                    表格字段列表.push(数据);
                });

                if (表格字段列表.length > 0) {
                    var content = '<div class="btn_setting">表格设置</div>';
                    $('#tablesetting_btn').append(content);

                    Tfunc();
                }
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
设置用户级表格字段设置列表
*/
function SetUserTableFieldSetingList(urltype, pageurl, data) {
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
                location.reload();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}







/*
重置用户级表格字段设置列表
*/
function ResetUserTableFieldSetingList(urltype, pageurl, data) {
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
                alert('重置成功');
                location.reload();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}