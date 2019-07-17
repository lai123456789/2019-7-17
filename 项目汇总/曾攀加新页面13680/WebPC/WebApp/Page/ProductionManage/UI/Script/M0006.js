var onetype = '';
var oneval = '';
var 全局页码 = 1;
var sort = '';
var sortfield = '';



$(function () {
    全局页码 = 1;
    GetFlowList("IIS", "Machining/MachiningManage.aspx?action=getcncflow", {
        "onetype": onetype,
        "oneval": oneval,
        "全局页码": 全局页码,
        "sort": sort,
        "sortfield": sortfield
    });

    GetUserList("IIS", "/NotifySetting/BusinessNotifySetting.aspx?action=getuserlist", {});
});


$(document).on('click', '#add_upcnc', function () {
    $(this).toggleClass('contor');
});


$(document).on('click', '#edit_upcnc', function () {
    $(this).toggleClass('contor');
});


/*
绑定用户到机加工序上
*/
$(document).on('click', '#set_bindusersure', function () {
    var 用户代码 = $('#binduserlist').attr('data-val');
    var 工序代码 = $('#form_tb > tr.contor > td:eq(0)').text();
    BindCNCUser("IIS", "Machining/MachiningManage.aspx?action=bindcncuser", {
        "usercode": 用户代码,
        "flowcode": 工序代码,
        "operation_usercode": ""
    });
});


$(document).on('click', '#datalist1 > .panel-heading > .binduser', function () {
    if (!$(this).hasClass('disabled')) {
        $('#BindUserModule').modal('show');
    }
});


/*
删除工序-确定
*/
$(document).on('click', '#delflow_sure', function () {
    var 工序代码 = $(this).attr('data-flowcode');
    DelFlowInfo("IIS", "Machining/MachiningManage.aspx?action=delcncflow", {
        "flowcode": 工序代码,
        "usercode":""
    });
});

/*
删除工序-弹出窗
*/
$(document).on('click', '#form_tb a.del', function () {
    var 工序代码 = $(this).attr('data-flowcode');
    var 工序名称 = $(this).attr('data-flowname');
    $('#del_flowname').text(工序名称);
    $('#delflow_sure').attr('data-flowcode', 工序代码);
    $('#DelFlowModal').modal('show');
    $("#DelFlowModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#DelFlowModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
});


$(document).on('click', '#form_tb a.edit', function () {
    var 工序代码 = $(this).parents('tr').find('td:eq(0)').text();
    var 工序名称 = $(this).parents('tr').find('td:eq(1)').text();
    var 上机 = $(this).parents('tr').find('td:eq(2)').text();
    var 备注 = $(this).parents('tr').find('td:eq(3)').text();
    $('#edit_flowcode').text(工序代码);
    $('#edit_flowname').val(工序名称);
    if (上机 == '是') {
        $('#edit_upcnc').addClass('contor');
    }
    else {
        $('#edit_upcnc').removeClass('contor');
    }
    $('#edit_remark').val(备注);
    $('#EditFlowModal').modal('show');
    $("#EditFlowModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#EditFlowModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
});


/*
编辑工序-确定
*/
$(document).on('click', '#editflow_sure', function () {
    var 工序代码 = $('#edit_flowcode').text();
    var 工序名称 = $('#edit_flowname').val();
    var 上机 = 0;
    if ($('#edit_upcnc').hasClass('contor')) {
        上机 = 1;
    }
    var 备注 = $('#edit_remark').val();
    EditFlowInfo("IIS", "Machining/MachiningManage.aspx?action=editcncflow", {
        "flowcode": 工序代码,
        "flowname": 工序名称,
        "remark": 备注,
        "upcnc": 上机,
        "usercode": ""
    })
});


/*
确定提交工序
*/
$(document).on('click', '#addflow_sure', function () {
    var 工序名称 = $('#add_flowname').val();
    var 上机 = 0;
    if ($('#add_upcnc').hasClass('contor')) {
        上机 = 1;
    }
    var 备注 = $('#add_remark').val();
    AddFlowInfo("IIS", "Machining/MachiningManage.aspx?action=addcncflow", {
        "flowname": 工序名称,
        "remark": 备注,
        "upcnc": 上机,
        "usercode":""
    });
})


/*
点击添加工序按钮
*/
$(document).on('click', '#add_cncflow', function () {
    $('#AddFlowModal').modal('show');
    $("#AddFlowModal > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddFlowModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
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


/*
选中
*/
$(document).on('click', '#form_tb > tr > td', function () {
    $(this).parents('tr').addClass('contor').siblings().removeClass('contor');
    $('#datalist1 > .panel-heading > .binduser').removeClass('disabled');
    var 工序代码 = $(this).parents('tr').find('td:eq(0)').text();
    GetFlowBindUser("IIS", "Machining/MachiningManage.aspx?action=getflowbinduser", {
        "flowcode": 工序代码
    });
});



//回车键 enter
$(document).on("keydown", document, function (e) {
    //var ev = document.all ? window.event : e;
    //if (ev.keyCode == 13) {
    //    if ($('#search_content').is(':focus')) {
    //        var search = $('#search_content').val();
    //        全局搜索 = search;
    //        全局页码 = 1;
    //        GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getuserskills", {
    //            "search": search,
    //            "page": 1
    //        });
    //    }
    //}
})

/************************************* Ajax *******************************************/

/*
获取工序列表
*/
function GetFlowList(urltype, pageurl, data) {
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
                    content += '    <td>' + obj.工序代码 + '</td>';
                    content += '    <td>' + obj.工序名称 + '</td>';
                    if (obj.上机 == "1")
                    {
                        content += '    <td>是</td>';
                    }
                    else
                    {
                        content += '    <td>否</td>';
                    }
                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaSricpt:;" class="edit">编辑</a>';
                    content += '        <a href="JavaSricpt:;" class="del" data-flowcode="' + obj.工序代码 + '" data-flowname="' + obj.工序名称 + '">删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                $('#datalist1 > .panel-heading > .binduser').addClass('disabled');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


/*
添加工序信息
*/
function AddFlowInfo(urltype, pageurl, data) {
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
                $('#AddFlowModal').modal('hide');
                GetFlowList("IIS", "Machining/MachiningManage.aspx?action=getcncflow", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "全局页码": 全局页码,
                    "sort": sort,
                    "sortfield": sortfield
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
编辑工序信息
*/
function EditFlowInfo(urltype, pageurl, data) {
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
                alert('修改成功');
                $('#EditFlowModal').modal('hide');
                GetFlowList("IIS", "Machining/MachiningManage.aspx?action=getcncflow", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "全局页码": 全局页码,
                    "sort": sort,
                    "sortfield": sortfield
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
删除工序信息
*/
function DelFlowInfo(urltype, pageurl, data) {
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
                $('#DelFlowModal').modal('hide');
                GetFlowList("IIS", "Machining/MachiningManage.aspx?action=getcncflow", {
                    "onetype": onetype,
                    "oneval": oneval,
                    "全局页码": 全局页码,
                    "sort": sort,
                    "sortfield": sortfield
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}








/*
机加工序绑定用户
*/
function BindCNCUser(urltype, pageurl, data) {
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
                alert('绑定成功');
                $('#BindUserModule').modal('hide');
                var 工序代码 = $('#form_tb > tr.contor > td:eq(0)').text();
                GetFlowBindUser("IIS", "Machining/MachiningManage.aspx?action=getflowbinduser", {
                    "flowcode": 工序代码
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
获取工序绑定的用户列表
*/
function GetFlowBindUser(urltype, pageurl, data) {
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
                    content += '    <td>' + obj.工号 + '</td>';
                    content += '    <td>' + obj.用户名称 + '</td>';
                    content += '    <td>' + obj.部门 + '</td>';
                    content += '    <td>' + obj.职务 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;">删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb1').empty();
                $('#form_tb1').append(content);
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





/************************************* Ajax End *******************************************/