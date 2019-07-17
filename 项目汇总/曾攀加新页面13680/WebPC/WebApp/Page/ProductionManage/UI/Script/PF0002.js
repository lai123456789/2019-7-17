
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '',
    sortfield = '', sort = '', excel = '', groupCode = '', IsF = false, linecodeUpdate = '', MainData = [], MainDatadetatils = [];
var PORT = "IIS3738";
var URL = "ProductionManage.ashx?action=";
$(function () {
    GetGroup();
    GetUserList("IIS", "/NotifySetting/BusinessNotifySetting.aspx?action=getuserlist", {});
});

/*
导出Excel(左边)
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    excel = 'excel';
    var fileName = $('#datalist .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "GetGroup");
    var data = {
        "page": 1,
        "pageSize": 30000,
        "groupName": oneval,
        "sortField": sortfield,
        "sort": sort
    };
    $('#data').val(JSON.stringify(data));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});


/*
导出Excel(右边)
*/
$(document).on('click', '#datalist2 .download', function () {
    showLoading();
    page = 1;
    var fileName = $('#datalist2 .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "GetStaffDef");
    var data = {
        "groupCode" : groupCode,
        "sortField": sortfield,
        "sort": sort
    }
    $('#data').val(JSON.stringify(data));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});

//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    $('#datalist2 #form_tb').empty();
    oneval = $('#oneval').val();
    GetGroup();
});


//左边生产线排序
$(document).on('click', '#datalist #form_th > tr > th', function () {
    $(this).toggleClass('contor');
    sortfield = $(this).attr('data-val');
    sort = '';
    if ($(this).hasClass('contor')) {
        sort = 'desc';
    }
    else {
        sort = 'asc';
    }
    page = 1;
    $('#datalist2 #form_tb').empty();
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    GetGroup();
});


//右边排序
$(document).on('click', '#datalist2 #form_th > tr > th', function () {
    $(this).toggleClass('contor');
    sortfield = $(this).attr('data-val');
    sort = '';
    if ($(this).hasClass('contor')) {
        sort = 'desc';
    }
    else {
        sort = 'asc';
    }
    page = 1;
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    GetStaffDef();
});





//组别列表
$(function () {
    $("#pagination_PF0001").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            $('#datalist2 #form_tb').empty();
            GetGroup();
        }
    });
});

//生产线设备
$(function () {
    $("#pagination_PF0001_1").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            GetStaffDef();
        }
    });
});



/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("main").webkitRequestFullscreen();
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist2 .fullscreen', function () {
    document.getElementById("main").webkitRequestFullscreen();
});



//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            page = 1;
            GetGroup();
        }
    }
});

//获取明细(右边)
$(document).on('click', '#datalist #form_tb > tr', function () {
    $('#datalist #form_tb tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    groupCode = $(this).attr('data-val');
    $('#BingBtn').css('background-color', '#428bca;');
    clear();
    IsF = true;
    GetStaffDef();
});




//**********************************************************************************查询 Start**********************************************************************//
//类型一
$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').empty().hide();
        return;
    }
    $('#oneval').show().attr('placeholder', '请输入' + $(this).val());
});
//时间类型
$(document).on('change', '#datetype', function () {
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();
});



//****************************************************************************查询 End****************************************************************************//

//===== 组别新增======//
$(document).on('click', '#addPushModuleDef', function () {
    $("#AddpushmoduleDefModal").draggable();//为模态对话框添加拖拽
    $("#modalDialog").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddpushmoduleDefModal').modal('show');
    $('#update_pushname').val("");
    $('#update_Remarks').val("");
});

//组别新增确认
$(document).on('click', '#add_pushmodule', function () {
    var groupName = $('#add_pushname').val();
    var remarks = $('#add_Remarks').val();
    if (!groupName && groupName.length == 0) {
        alert("请输入模组名称");
        return;
    }

    Addandupdate(PORT, URL + "AddGroupDef", {
        "groupname": groupName,
        "remarks": remarks,
        "operation_usercode": ""
    });

});

//=====组别修改======//
$(document).on('click', '.ModuleUpdate', function () {
    $("#UpdatepushmoduleDefModal").draggable();//为模态对话框添加拖拽
    $("#modalDialog").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#UpdatepushmoduleDefModal').modal('show');
    var idx= $(this).attr('data-val');
    var groupcode = MainData[idx]["PGROUPCODE"];
    $('#update_pushmodule').data("groupcode", groupcode);
    $('#update_pushname').val(MainData[idx]["PGROUPNAME"]);
    $('#update_Remarks').val(MainData[idx]["REMARKS"]);

});

//组别修改确认
$(document).on('click', '#update_pushmodule', function () {
    var groupname = $('#update_pushname').val();
    var remarks = $('#update_Remarks').val();
    if (!groupname && groupname.length == 0) {
        alert("请输入模组名称");
        return;
    }
    Addandupdate(PORT, URL + "UpdateGroupDef", {
        "groupCode": $('#update_pushmodule').data("groupcode"),
        "operation_usercode": "",
        "groupName": groupname,
        "remarks": remarks
    });

});
//组别删除
$(document).on('click', '.ModulDel', function () {
    var idx = $(this).attr('data-val');
    var groupCode = MainData[idx]["PGROUPCODE"];
    var groupName = MainData[idx]["PGROUPNAME"];
    dialog.prompt('小提示', '你确认删除组别为:' + groupName + '吗?', 'warning', function (s) {
        if (s) {
            Addandupdate(PORT, URL + "DelGroupDef", {
                "groupCode": groupCode,
            });
        }
    });
});


///------------------------------------------------------------------------//
///------------------------------------------------------------------------//
///-------------------------------人员-----------------------------------------//
///------------------------------------------------------------------------//
///------------------------------------------------------------------------//
///------------------------------------------------------------------------//
///------------------------------------------------------------------------//
//组别人员绑定
$(document).on('click', '#BingBtn', function () {
    if(!IsF){
        dialog.promptNoCancle('小提示', "清先选择左边在绑定", 'error');
        return;
    }
    $("#AddmoduleStatusDefModal").draggable();//为模态对话框添加拖拽
    $("#modalDialog").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddmoduleStatusDefModal').modal('show');
    linecodeUpdate = $(this).attr('data-val');
    $('#binduserlist').val("");
   
});


//人员定义新增确认
$(document).on('click', '#add_statuspushmodule', function () {
    var userCode = $('#binduserlist').attr('data-val');
    Addandupdate(PORT, URL + "AddStaffDef", {
        "groupCode": groupCode,
        "userCode" : userCode,
        "operation_usercode" : ""
    });

});

//人员定义删除
$(document).on('click', '.TimeDefDel', function () {
    var idx = $(this).attr('data-val');
    var gsCode = MainDatadetatils[idx]["USERDEFCODE"];
    var userName = MainDatadetatils[idx]["姓名"];
    dialog.prompt('小提示', '你确认删除人员:' + userName + ' 吗?', 'warning', function (s) {
        if (s) {
            Addandupdate(PORT, URL + "DelStaffDef", {
                "GSCode": gsCode,
            });
        }
    });
});



//****************************************************************************Ajax Start****************************************************************************//


/**
*获取
//领料主列表生产线
*/
function GetGroup() {
    var data = {
        "page" : page,
        "pageSize" : 20,
        "groupName" : oneval,
        "sortField": sortfield,
        "sort" : sort
    }
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": PORT,
            "pageurl": URL + "GetGroup",
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                MainData = data.data;
                var content = '';
                $.each(data.data, function (idx, obj) {
                    content += '<tr data-val="' + obj.PGROUPCODE + '">';
                    content += '<td>' + obj.组别名称 + '</td>';
                    content += '<td>' + obj.备注 + '</td>'
                    //content += '<td><a data-val="'+ obj.PGROUPCODE +'" gpname="'+ obj.PGROUPNAME +'" remarks="'+ obj.REMARKS +'" href="JavaScript:;" class="ModuleUpdate">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="JavaScript:;">删除</a></td>'
                    content += '<td><a data-val="'+ idx +'" href="JavaScript:;" class="ModuleUpdate">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a data-val="'+ idx +'" href="JavaScript:;" class="ModulDel">删除</a></td>'
                    content += '</tr>';
                });
                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_PF0001").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });

}



/**
*获取上班时间定义
*/
function GetStaffDef() {
    var data = {
        "groupCode" : groupCode,
        "sortField": sortfield,
        "sort": sort
    };

    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": PORT,
            "pageurl": URL + "GetStaffDef",
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
                MainDatadetatils = data.data;
                $.each(data.data, function (idx, obj) {
                    content += '<tr data-val="' + obj.USERDEFCODE + '">';
                    content += '<td>' + obj.组别 + '</td>';
                    content += '<td>' + obj.工号 + '</td>';
                    content += '<td>' + obj.姓名 + '</td>';
                    content += '<td><a data-val="'+ idx +'" href="JavaScript:;" class="TimeDefDel">删除</a></td>'
                    content += '</tr>';

                });
                $('#datalist2 #form_tb').empty().append(content);
/*                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_PF0001_1").pagination('setPage', parseFloat(page), parseFloat(pagecount));
*/
            } else {
                alert(data.errmsg);
            }
        }
    });


}

function Addandupdate(urltype, pageurl, data) {

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
            $('#AddpushmoduleDefModal').modal('hide');
            $('#UpdatepushmoduleDefModal').modal('hide');
            $('#AddmoduleStatusDefModal').modal('hide');
            $('#UpdatemoduleStatusDefModal').modal('hide');

        },
        success: function (data) {
            hideLoading();
            $('#AddpushmoduleDefModal').modal('hide');
            $('#UpdatepushmoduleDefModal').modal('hide');
            $('#AddmoduleStatusDefModal').modal('hide');
            $('#UpdatemoduleStatusDefModal').modal('hide');
                if (data.errcode == 0) {
                    $('#add_pushname').val("");
                    $('#add_Remarks').val("");
                    dialog.promptNoCancle('小提示', data.errmsg, 'success');
                }
                else {
                    dialog.promptNoCancle('小提示', data.errmsg, 'error');
                }
                GetGroup();
                GetStaffDef();
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



//****************************************************************************Ajax End****************************************************************************//



//****************************************************************************Common Start****************************************************************************//

function clear() {
    onetype = '', oneval = '', datetype = '', startdate = '', enddate = '', page = 1, excel = '', sortfield = '', sort = '';

}

//****************************************************************************Common End****************************************************************************//





