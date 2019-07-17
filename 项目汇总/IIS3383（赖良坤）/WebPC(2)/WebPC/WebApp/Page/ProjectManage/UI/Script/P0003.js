var 全局页码 = 1;
var 全局字段 = '';
var 全局排序 = '';
var onetype = '';
var oneval = '';
var twotype = '';
var datetype = '';
var startdate = '';
var enddate = '';
var numbertype = '';
var numberval = '';
var numbership = '';
var 全局搜索 = '';
var pjmodifly = '';
var namemodifly = '';
$(function () {
    var pj = getQueryString("pj");
    if (pj != null && pj != '') {
        oneval = pj;
        onetype = "PJ";
        $('#oneval').show().val(pj);
        $('#onetype').find("option[value='PJ']").attr("selected", true);
    }
    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderentry", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    });
});



/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

/*
导出Excel
*/
//$(document).on('click', '#datalist .download', function () {
//    var title = $(this).parents('.panel-heading').find('.panel-title').text();
//    $('#dlink').attr('data-name', title + '.xls');
//    ExportExcel('form_table');
//});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    全局页码 = 1;
    var 文件名 = $('.panel-title').text();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序
    };
    $('#urltype').val('IIS3676');
    $('#pageurl').val("BusinessManage/AssemblyManage.aspx?action=excelgetassemblyorderentry");
    $('#data').val(JSON.stringify(data));
    $('#filename').val(文件名);
    $('#export_excel').submit();
    hideLoading();
});


$(document).on('click', '#query_title > .query_content .query_btn', function () {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderentry", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    });
});


$(document).on('click', '#adduserinfo', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
});


//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('#search_content').is(':focus')) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            numbership = $('#numselect').val();
            numberval = $('#numqty').val();
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderentry", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "numbership": numbership,
                "numberval": numberval,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序,
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});


$(document).on('click', '#form_tb .dispatching', function () {
    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#WorkDispatching").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#WorkDispatching').modal('show');
    var predicthours = $(this).attr('data-predicthours');
    var account = $(this).attr('data-account');
    var pj = $(this).attr('data-pj');
    var flownum = $(this).attr('data-flownum');
    $('#WorkDispatching_sure').attr('data-pj', pj);
    $('#WorkDispatching_sure').attr('data-flownum', flownum);
    $('#Work_account').val(account);
    $('#Work_predicthours').val(predicthours);
});

$(document).on('click', '#WorkDispatching_sure', function () {
    var pj = $(this).attr('data-pj');
    var flownum = $(this).attr('data-flownum');
    var account = $('#Work_account').val();
    var predicthours = $('#Work_predicthours').val();
    AssemblyDispatching("IIS", "ProjectManage.aspx?action=assemblydispatching", {
        "pj": pj,
        "flownum": flownum,
        "account": account,
        "predicthours": predicthours,
        "operation_usercode": ""
    });
});


/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetUserList(urltype, pageurl, data,page) {
    showLoading();
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + obj.pj + '</td>';
                    
                        if (obj.开始时间 == null || obj.开始时间 == '') {
                            content += '<td>';
                            content += '    <div class="progress_white" title="">未开始</div>';
                            content += '</td>';
                        }
                        else if (obj.完成时间 != null && obj.完成时间 != '') {
                            content += '<td>';
                            content += '    <div class="progress_green" title="">已完成</div>';
                            content += '</td>';
                        }
                        else if (obj.开始时间 != null && obj.开始时间 != '') {
                            if (obj.异常代码 == null || obj.异常代码 == '') {
                                content += '<td>';
                                content += '    <div class="progress_yellow" title="">进行中</div>';
                                content += '</td>';
                            }
                            else {
                                content += '<td>';
                                content += '<div class="progress_red" title="异常负责：' + obj.异常负责人 + '&#10;异常处理：' + obj.异常处理人 + '&#10;异常分类：' + obj.异常分类 + '&#10;异常原因：' + obj.异常原因 + '">异常</div>';
                                content += '</td>';
                            }
                            
                        }
                    content += '<td>' + obj.项目名称 + '</td>';
                    content += '<td>' + obj.工序名 + '</td>';

                    //content += '<td title="' + obj.作业明细.replace(/,/g, "") + '">' + obj.作业次数 + '</td>';
                    //content += '<td title="' + obj.异常明细.replace(/,/g, "") + '">' + obj.异常次数 + '</td>';

                    content += '<td>' + obj.作业次数 + '<a class="operation" data-val="' + obj.pj + "|" + obj.工序名 + '" style="margin-left:8px;" href="/Page/ProjectManage/P0006.html?pj='+obj.pj+'">详情</a></td>';
                    content += '<td>' + obj.异常次数 + '<a class="Exception" data-val="' + obj.pj + "|" + obj.工序名 + '"  style="margin-left:8px;" href="/Page/ProjectManage/P0007.html?pj=' + obj.pj + '">详情</a></td>';

                    content += '<td>' + obj.开始时间 + '</td>';
                    content += '<td>' + obj.完成时间 + '</td>';
                    content += '<td>' + obj.负责人 + '</td>';
                    content += '<td>' + obj.总工时 + '</td>';
                    content += '<td>' + obj.实际工时 + '</td>';
                    content += '<td>' + obj.暂停工时 + '</td>';
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0003").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
//作业次数明细
$(document).on('click', '#form_tb .operation', function () {
    var data = $(this).attr('data-val');
    sessionStorage.setItem("operation", data);
    console.log(data);
});
//异常次数明细
$(document).on('click', '#form_tb .Exception', function () {
    var data = $(this).attr('data-val');
    sessionStorage.setItem("Exception", data);
    console.log(data);
});



/*
获取部门列表
*/
function GetDepartmentList(urltype, pageurl, data) {
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
                var option = '';
                $.each(data.data, function (idx, obj) {
                    option += '<option value="' + obj.departmentcode + '">' + obj.departmentname + ' （' + obj.departmentcode + '）' + '</option>';
                });
                $('#add_department').empty();
                $('#add_department').append(option);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



/*
工作调度
*/
function AssemblyDispatching(urltype, pageurl, data) {
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
                GetUserList("IIS", "ProjectManage.aspx?action=getassemblyorderinfo", {
                    "search": 全局搜索,
                    "page": 全局页码
                });
                $('#WorkDispatching').modal('hide');
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

/************************************* Ajax End *******************************************/




/************************************* Search Start *******************************************/

//類型一
$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').hide();
        return;
    }
    $('#oneval').attr('placeholder', '请输入' + $(this).val()).show();

});
//時間

$(document).on('change', '#datetype', function () {
    if ($(this).val() == '全部') {
        $('#datetype_date').hide();
        return;
    }
    $('#datetype_date').show();

});

//數字類型
$(document).on('change', '#numbertype', function () {
    if ($(this).val() == '全部') {
        $('#numberval').hide();
        return;
    }
    $('#numberval').show();
    $('#numqty').attr('placeholder', '请输入' + $(this).val() + $('#numselect option:selected').text() + "数量")
});
$(document).on('change', '#numberval #numselect', function () {

    $('#numqty').attr('placeholder', '请输入' + $('#numbertype option:selected').val() + $('#numselect option:selected').text() + "数量");

});

/************************************* Search End *******************************************/


//分页
$(function () {
    $("#pagination_P0003").pagination({
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
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            numbership = $('#numselect').val();
            numberval = $('#numqty').val();
            全局页码 = currPage;
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderentry", {
                "onetype": onetype,
                "oneval": oneval,
                "twotype": twotype,
                "datetype": datetype,
                "startdate": startdate,
                "enddate": enddate,
                "numbertype": numbertype,
                "numbership": numbership,
                "numberval": numberval,
                "page": 全局页码,
                "sortfield": 全局字段,
                "sort": 全局排序,
            }, 全局页码);
        }
    });
});


$(document).on('click', '#form_th > tr > th', function () {
    $(this).toggleClass('contor');
    全局字段 = $(this).attr('data-val');
    全局排序 = '';
    if ($(this).hasClass('contor')) {
        全局排序 = 'desc';
    }
    else {
        全局排序 = 'asc';
    }
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    numbership = $('#numselect').val();
    numberval = $('#numqty').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorderentry", {
        "onetype": onetype,
        "oneval": oneval,
        "twotype": twotype,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "page": 全局页码,
        "sortfield": 全局字段,
        "sort": 全局排序,
    }, 全局页码);
});

