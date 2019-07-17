var page = 1, IsUserCc = false, PORT = "IIS3676", URL = "TaskManage.aspx?action=", status = '', excel = '', taskcode = '',type='',isF="0";
$(function () {
    taskcode = getQueryString("taskcode");
    type = getQueryString("type");
    GetList(PORT, URL + "getmytasklist", getSearch());
    GetUserList("IIS", "/NotifySetting/BusinessNotifySetting.aspx?action=getuserlist", {});
    CheckUserCc(PORT, URL + "getUserCC", {
        "usercode": ""
    });
});


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});


/*
查询
*/
$(document).on('click', '#query_title > .query_content > .query_btn', function () {
    page = 1;
    excel = '';
    taskcode = '';
    GetList(PORT, URL + "getmytasklist", getSearch());
});


/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    excel = 'excel';
    var filelName = $('.panel-title').text();
    excel = "excel"
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "getmytasklist");
    $('#data').val(JSON.stringify(getSearch()));
    $('#filename').val(filelName);
    $('#export_excel').submit();
    hideLoading();
});

$(document).on('click', '#nestable-menu > .btn', function () {
    $(this).addClass('btn-success').removeClass('btn-default').siblings().removeClass('btn-success').addClass('btn-default');
    status = $(this).attr('data-val');
    page = 1;
    excel = '';
    taskcode = '';
    GetList(PORT, URL + "getmytasklist", getSearch());
});


$(document).on('click', '.dispatching', function () {
    var taskcode = $(this).attr('data-taskcode');
    $('#WorkDispatching').modal('show');
    $('#WorkDispatching_sure').attr('data-taskcode', taskcode);
});

$(document).on('click', '.details', function () {
    var code = $(this).attr('data-code');
    location.href = '/Page/Task/QueryAssemblyErrorInfo.html?code=' + code;
});
//派工
$(document).on('click', '#WorkDispatching_sure', function () {
    var account = $('#Work_account').attr('data-account');
    var taskcode = $(this).attr('data-taskcode');
    TaskDispatching(PORT, URL + "taskdispatching", {
        "taskcode": taskcode,
        "usercode": "",
        "account": account
    });
});

$(document).on('click', '.DialogDetails', function () {
    var errorcode = $(this).attr('data-code');
    GetErrorDetailsList(PORT, "BusinessManage/AssemblyManage.aspx?action=geterrorlist", {
        "errorcode": errorcode
    });
    $("#ErrorDetails").draggable();//为模态对话框添加拖拽
    $("#ErrorDetails").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#ErrorDetails').modal('show');

});

//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            excel = '';
            page = 1;
            taskcode = '';
            GetList(PORT, URL + "getmytasklist", getSearch());
        }
    }
});



//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#Work_account').is(':focus')) {
            var account = $('#Work_account').attr('data-account');
            var taskcode = $('#WorkDispatching_sure').attr('data-taskcode');
            TaskDispatching(PORT, URL + "taskdispatching", {
                "taskcode": taskcode,
                "usercode": "",
                "account": account
            });
        }
    }
});

//==================================================================================进度以及解决方案===================================//
//进度
$(document).on('click', '.schedule', function () {
    $('.des').val("");
    $('.modal-title').html("进度");
    $('.des').attr('placeholder', "请描述进度");
    $("#ScheduleAndsolution").draggable();//为模态对话框添加拖拽
    $("#ScheduleAndsolution").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#ScheduleAndsolution').modal('show');
    $('#ScheduleAndsolution_sure').data("errorcode", $(this).attr('data-val'));
    $('#ScheduleAndsolution_sure').data("taskcode", $(this).attr('data-task'));
    isF="0";
   
});
//解决方案
$(document).on('click', '.solution', function () {
    $('.des').val("");
    $('.modal-title').html("解决方案");
    $('.des').attr('placeholder', "请描述解决方案");
    $("#ScheduleAndsolution").draggable();//为模态对话框添加拖拽
    $("#ScheduleAndsolution").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#ScheduleAndsolution').modal('show');
    $('#ScheduleAndsolution_sure').data("errorcode", $(this).attr('data-val'));
    $('#ScheduleAndsolution_sure').data("taskcode", $(this).attr('data-task'));

    
    isF="1";
});
//确认提交解决方案和进度
$(document).on('click', '#ScheduleAndsolution_sure', function () {
    var destxt = $('.des').val();
   // var str = replaceTextarea1(destxt);
  
    InsertscheduleAndsolution(PORT, URL + "insertErrorAndscheduleAndsolution", {
        "errorcode": $(this).data("errorcode"),
        "usercode": "",
        "type": isF,
        "des": destxt
    });
});

//进度列表
$(document).on('click', '.scheduleList', function () {
    GetscheduleList(PORT, URL + "getScheduleList", {
        "page": 1,
        "errorcode":$(this).attr('data-val')
    });
    $("#scheduleUserModal").draggable();//为模态对话框添加拖拽
    $("#scheduleUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#scheduleUserModal').modal('show');
    $('#scheduleUserModal').data("errorcode", $(this).attr('data-val'));
    console.log($('#scheduleUserModal').data('errorcode'));

});



//解决方案列表
$(document).on('click', '.solutionList', function () {
    GetsolutionList(PORT, URL + "getSolutionList", {
        "page": 1,
        "errorcode": $(this).attr('data-val')
    });
    $("#solutionUserModal").draggable();//为模态对话框添加拖拽
    $("#solutionUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#solutionUserModal').modal('show');
    $('#solutionUserModal').data("errorcode", $(this).attr('data-val'));
    console.log($('#solutionUserModal').data('errorcode'));


    
});
//进度列表分页
$(function () {
    $("#pagination_schedule").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            var page1 = currPage;
            GetPrintList(PORT, URL + "getPrintDocument", {
                "page": page1,
                "errorcode": $('#scheduleUserModal').data('errorcode')
            });
        }
    });
});
//解决方案列表分页
$(function () {
    $("#pagination_solution").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
          var  page1 = currPage;
            GetPrintList(PORT, URL + "getPrintDocument", {
                "page": page1,
                "errorcode": $('#solutionUserModal').data('errorcode')
            });
        }
    });
});

//结束任务异常
$(document).on('click', '#Over_sure', function () {
    var errorcode = $('#ScheduleAndsolution_sure').data("errorcode");//异常代码
    var taskcode = $('#ScheduleAndsolution_sure').data("taskcode");//任务代码
    InsertscheduleAndsolution(PORT, URL + "overErrorTask", {
        "errorcode": errorcode,
        "taskcode": taskcode,
        "usercode":""
    });
  

});
//==================================================================================进度以及解决方案===================================//


/************************************* Ajax *******************************************/


function InsertscheduleAndsolution(urltype, pageurl, data) {
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
            $('#ScheduleAndsolution').modal('hide');
            hideLoading();
            alert(data.errmsg);
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert(data.errmsg);
                $('#ScheduleAndsolution').modal('hide');
                GetList(PORT, URL + "getmytasklist", getSearch());
                }
                else {
                    $('#ScheduleAndsolution').modal('hide');
                    alert(data.errmsg)
                }
        }
    });
}







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
                    content += '    <td>' + obj.任务类型 + '</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '    <td>' + obj.开始时间 + '</td>';
                    content += '    <td>' + obj.完成时间 + '</td>';
                    content += '    <td>' + obj.处理异常人员名称 + '</td>';
                    content += '    <td>' + obj.派工时间 + '</td>';
                    content += '    <td style="text-align: right;">';
                    content += '      <span class="scheduleList"  data-val="' + obj.任务类型唯一码 + '" >' + obj.进度 + '</span>';
                    content += '      <button class="btn btn-info schedule"      data-val="' + obj.任务类型唯一码 + '"   data-task="' + obj.任务代码 + '"  >回复</button>';
                    content += '    </td>';
                    content += '    <td style="text-align: right;">';
                    content += '      <span class="solutionList"  data-val="' + obj.任务类型唯一码 + '" >' + obj.解决方案 + '</span>';
                    content += '      <button class="btn btn-info solution" data-val="' + obj.任务类型唯一码 + '"       data-task="' + obj.任务代码 + '" >回复</button>';
                    content += '    </td>';
                    content += '    <td>' + obj.结束任务用户 + '</td>';
                    content += '    <td>' + obj.备注 + '</td>';
                    content += '    <td>';
                    if (obj.处理异常人员代码 != null && obj.处理异常人员代码 != '') {
                        content += '已派工';
                    } else {
                        content += '        <a href="JavaScript:;" class="dispatching" data-taskcode="' + obj.任务代码 + '">派工</a>';
                    }
                    if (obj.任务类型 == '装配异常') {
                        content += '        <a href="JavaScript:;" class="details" data-code="' + obj.任务类型唯一码 + '" data-taskcode="' + obj.任务代码 + '">查看</a>';
                    }
                    content += '        <a href="JavaScript:;" class="DialogDetails" data-code="' + obj.任务类型唯一码 + '" data-taskcode="' + obj.任务代码 + '">异常详细</a>';
                    content += '    </td>';
                    content += '</tr>';

                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_MyTaskList").pagination('setPage', parseFloat(page), parseFloat(pagecount));
                splitstr();
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


//列表分页
$(function () {
    $("#pagination_MyTaskList").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            excel = '';
            GetList(PORT, URL + "getpcnotify", getSearch());
        }
    });
});



/*
接受装配异常任务
*/
function TaskDispatching(urltype, pageurl, data) {
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
                location.reload();
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
                $('#Work_account').bigAutocomplete({
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
                        $('#Work_account').attr('data-val', row.value);
                        $('#Work_account').attr('data-account', row.form);
                        $('#Work_account').attr('data-name', row.text);
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
获取用户列表
*/
function CheckUserCc(urltype, pageurl, data) {
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
                if (data.data.length > 0) {
                    IsUserCc = true;
                }
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




/*
获取异常信息
*/
function GetErrorDetailsList(urltype, pageurl, data) {
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
                    if (obj.异常负责人用户代码 == null || obj.异常负责人用户代码 == '') {
                        $('#ErrorDetails  .panel-heading  .panel-title').empty();
                        $('#ErrorDetails  .panel-heading  .panel-title').append('异常信息 <span>【未处理】</span>');
                    }
                    else {
                        switch (obj.问题处理类型) {
                            case "0":
                                $('#ErrorDetails  .panel-heading  .panel-title').empty();
                                $('#ErrorDetails  .panel-heading  .panel-title').append('异常信息 <span style="color: #c89309">【处理中】</span>');
                                break;
                            case "1":
                                $('#ErrorDetails  .panel-heading  .panel-title').empty();
                                $('#ErrorDetails  .panel-heading  .panel-title').append('异常信息 <span style="color: #1b9f4e;">【已完结】</span>');
                                //$('#replyoperation').remove();
                                break;
                            case "-1":
                                $('#ErrorDetails  .panel-heading  .panel-title').empty();
                                $('#ErrorDetails  .panel-heading  .panel-title').append('异常信息 <span style="color: #0056d0" title="' + obj.关闭原因 + '">【已关闭】</span>');
                                //$('#replyoperation').remove();
                                break;
                        }
                    }
                    content += '<tr>';
                    content += '    <td>PJ</td>';
                    content += '    <td>' + obj.pj号 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>名称</td>';
                    content += '    <td>' + obj.项目名称 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常提交时间</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常提交人</td>';
                    content += '    <td>' + obj.创建订单用户名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常分类</td>';
                    content += '    <td>' + obj.异常分类 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常原因</td>';
                    content += '    <td>' + obj.异常备注 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常工序</td>';
                    content += '    <td>' + obj.工序名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>工序负责人</td>';
                    content += '    <td>' + obj.工序负责人 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常负责人</td>';
                    content += '    <td>' + obj.异常负责人用户名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常处理人</td>';
                    content += '    <td>' + obj.操作员用户名 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '    <td>异常结束时间</td>';
                    content += '    <td>' + obj.完成时间 + '</td>';
                    content += '</tr>';
                });
                $('#form_TaskListtb').empty().append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




//查询参数
function getSearch() {
    var data = {
        "search": $('#search_content').val(),
        "usercode": "",
        "status": status,
        "excel": excel,
        "taskcode": taskcode,
        "type": type
    }
    return data;

}








/*
进度列表
*/
function GetscheduleList(urltype, pageurl, data) {
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
                    content += '    <td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 18)) + '</td>';
                    content += '    <td>' + obj.pj + '</td>';
                    content += '    <td>' + replaceTextarea1(obj.scheduledes) + '</td>';
                    content += '    <td>' + obj.username + '</td>';
                    content += '    <td>' + obj.createdate + '</td>';
                    content += '</tr>';

                });
                $('#form_tb_schedule').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_schedule").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}





/*
获取解决方案列表
*/
function GetsolutionList(urltype, pageurl, data) {
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
                    content += '    <td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 18)) + '</td>';
                    content += '    <td>' + obj.pj + '</td>';
                    content += '    <td>' + replaceTextarea1(obj.solutiondes) + '</td>';
                    content += '    <td>' + obj.username + '</td>';
                    content += '    <td>' + obj.cratedate + '</td>';
                    content += '</tr>';

                });
                $('#form_tb_solution').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_solution").pagination('setPage', parseFloat(page), parseFloat(pagecount));
          
              
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


function splitstr() {

    $('#datalist #form_table span').each(function () {
        var words = $(this).text().length;
        if (words > 8) {
            $(this).text($(this).text().slice(0, 8) + "...");
        }
    });
}

function replaceTextarea1(str) {
   
    str = str.replace(/\n|\r\n/g, "<br>");
   

    return str;
}


function replaceTextarea2(str) {
    var reg = new RegExp("<br>", "g");
    var reg1 = new RegExp("<p>", "g");

    str = str.replace(reg, "\n");
    str = str.replace(reg1, " ");

    return str;
}

/************************************* Ajax End *******************************************/