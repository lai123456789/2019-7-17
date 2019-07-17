
var errorcode = "";
$(function () {
    var seach = $('#search_content').val();
    GetList("IIS3676", "AssemblyOrder.aspx?action=getErrorTypeInfo", {
        "errorcategory": seach,
        "type": ""
    });
    GetUserList("IIS", "/NotifySetting/BusinessNotifySetting.aspx?action=getuserlist", {});

});

//*************************************************************************Eevent Start*********************************************************//



/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});
//异常定义查询

$(document).on('click', '.searchBtn', function () {
    var seach = $('#search_content').val();
    //if(!seach && seach.length==0){
    //    alert("请输入异常类型");
    //    return;
    //}
    GetList("IIS3676", "AssemblyOrder.aspx?action=getErrorTypeInfo", {
        "errorcategory": seach,
        "type": ""
    });



});
/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    全局页码 = 1;
    var seach = $('#search_content').val();
    var 文件名 = $('.panel-title').text();
    var data = {
        "errorcategory": seach,
        "type" :"excel"
    };
    $('#urltype').val('IIS3676');
    $('#pageurl').val("AssemblyOrder.aspx?action=getErrorTypeInfo");
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            var seach = $('#search_content').val();
            GetList("IIS3676", "AssemblyOrder.aspx?action=getErrorTypeInfo", {
                "errorcategory": seach,
                "type": ""
            });
        }
    }
});

//-------------------------------------------------------------------异常定义部分Start-----------------------------------------------------------------------------------//
/**
点击左边表格事件
*/
$(document).on('click', '#form_tb tr', function () {
    $(this).css('background', '#dafadf').siblings().css('background', '#ffffff');
    // alert(data);
    $('#BingUserBtn').css('background-color', '#428bca;');
    errorcode = $(this).attr('data-val');
    GeterroEmpList("IIS3676", "AssemblyOrder.aspx?action=geterrorhandlinguser", {
        "errcode": errorcode
    })

});

//编辑异常按钮
$(document).on('click', '.editError', function () {
    $('#set_bcode').html($(this).parent().parent().children().eq(0).html());
    $('#set_bname').val($(this).parent().parent().children().eq(1).html());
    $('#set_remark').val($(this).parent().parent().children().eq(2).html());
    $('#EditErrorModal').modal('show');
    $('#set_bname').trigger("focus");  //获取焦点

    //$('#inputbox01').trigger("blur");　 //失去焦点

});

//异常定义编辑确认
$(document).on('click', '#EditError_sure', function () {
    if (!$('#set_bname').val() && ($('#set_bname').val().length == 0)) {
        alert("异常类型不能为空");
        return;
    }
    EditErrorAndDelAndAdd("IIS3676", "AssemblyOrder.aspx?action=editErrorDefinition", {
        "errorcode": $('#set_bcode').html(),
        "errorname": $('#set_bname').val(),
        "remark": $('#set_remark').val()
    });

});


//删除异常按钮
$(document).on('click', '.ErrorDel', function () {
    var errorcode = $(this).attr('data-val');
    //if (confirm("你确认删除" + $(this).parent().parent().children().eq(1).html() + "吗？")) {
    //    alert(1);
    //}
    EditErrorAndDelAndAdd("IIS3676", "AssemblyOrder.aspx?action=errorDelete", {
        "errorcode": $(this).attr('data-val')
    });

});

//新增异常定义

$(document).on('click', '#adderrorinfo', function (){ 
    $('#set_Addbname').val("");
    $('#set_Addremark').val("");
    $('#AddErrorModal').modal('show');
});

//异常定义新增确认
$(document).on('click', '#AddError_sure', function () {
    if (!($('#set_Addbname').val()) && $('#set_Addbname').val().length == 0) {
        alert("请输入异常类型");
        return;
    }

    EditErrorAndDelAndAdd("IIS3676", "AssemblyOrder.aspx?action=addError", {
        "errorname": $('#set_Addbname').val(),
        "remark": $('#set_Addremark').val()
    });


});
//-------------------------------------------------------------------异常定义部分End -----------------------------------------------------------------------------------//



//-------------------------------------------------------------------异常负责人部分Start-----------------------------------------------------------------------------------//

//添加异常负责人按钮
$(document).on('click', '#BingUserBtn', function () {
    if ($(this).css('background-color') == "rgb(153, 153, 153)") {
        return;
    }
    $('#set_AddUserJobNum').val("");
    $('#BindUserModal').modal('show');

   // alert(errorcode);

});
//添加异常负责人确认按钮
$(document).on('click', '#AddErrorUser_sure', function () {
    var jobnum = $('#set_AddUserJobNum').attr('data-account');
    if (!jobnum && jobnum.length == 0) {
        alert("工号获取姓名不能为空");
        return;
    }
    ErrorUserAndDelAndAdd("IIS3676", "AssemblyOrder.aspx?action=addUserError", {
        "account": jobnum,
        "errorcode": errorcode,
        "remark":"",
        "usercode": ""
    });

});

$(document).on('click', '.DeleteUserError', function () {
    //alert($(this).attr('data-val'));

    ErrorUserAndDelAndAdd("IIS3676", "AssemblyOrder.aspx?action=addUserErrorDel", {
        "code": $(this).attr('data-val')
    });
});



//-------------------------------------------------------------------异常负责人部分End-----------------------------------------------------------------------------------//










//*************************************************************************Eevent End*********************************************************//




//*************************************************************************Aajax Start*********************************************************//
/*
获取异常定义
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
                    content += '<tr data-val="' + obj.code + '">';
                    content += '    <td style="display:none;">' + obj.code + '</td>';
                    content += '    <td>' + obj.errorcategory + '</td>';
                    content += '    <td>' + obj.remark + '</td>';
                    content += '    <td>';

                    content += '        <a href="JavaScript:;" class="editError" data-val="' + obj.code + '">编辑</a>';
                    if (obj.isdel==0) {
                        content += '        <a href="JavaScript:;" class="ErrorDel"  data-val="' + obj.code + '">删除</a>';
                    }
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb').empty().append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
获取异常分组负责人
*/
function GeterroEmpList(urltype, pageurl, data) {
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
                    content += '<tr data-val="' + obj.id + '">';
                    content += '    <td>' + (idx+1) + '</td>';
                    content += '    <td>' + obj.account + '</td>';
                    content += '    <td>' + obj.username + '</td>';
                    content += '    <td>' + obj.remark + '</td>';
                    content += '    <td>' + obj.createdate + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="DeleteUserError" data-val="' + obj.id + '" >删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                });
                $('#form_tb2').empty().append(content);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
  异常定义编辑和删除新增
*/
function EditErrorAndDelAndAdd(urltype, pageurl, data) {
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
                alert(data.errmsg);
                $('#EditErrorModal').modal('hide');
                var seach = $('#search_content').val();
                GetList("IIS3676", "AssemblyOrder.aspx?action=getErrorTypeInfo", {
                    "errorcategory": seach,
                    "type": ""
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/*
  异常定义负责人编辑和删除新增
*/
function ErrorUserAndDelAndAdd(urltype, pageurl, data) {
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
                alert(data.errmsg);
                $('#EditErrorModal').modal('hide');
                GeterroEmpList("IIS3676", "AssemblyOrder.aspx?action=geterrorhandlinguser", {
                    "errcode": errorcode
                })
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
                $('#set_AddUserJobNum').bigAutocomplete({
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
                        $('#set_AddUserJobNum').attr('data-val', row.value);
                        $('#set_AddUserJobNum').attr('data-account', row.form);
                        $('#set_AddUserJobNum').attr('data-name', row.text);
                    },
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}






//*************************************************************************Aajax End*********************************************************//
