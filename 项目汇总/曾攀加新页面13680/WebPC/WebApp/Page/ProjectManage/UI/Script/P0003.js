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
var floortype = '';
var floorval = '';
$(function () {
    //var pj = getQueryString("pj");
    //if (pj != null && pj != '') {
    //    oneval = pj;
    //    onetype = "PJ";
    //    $('#oneval').show().val(pj);
    //    $('#onetype').find("option[value='PJ']").attr("selected", true);
    //}

    var d = sessionStorage.getItem("P0002NAME");
    if (d && d.length > 0) {
        var arr = d.split('|');
        oneval = arr[1];
        onetype = "PJ";
        numbertype = arr[0];
        $('#oneval').show().val(arr[1]);
        $('#onetype').find("option[value='PJ']").attr("selected", true);
        $('#numbertype').find("option[value='" + arr[0] + "']").attr("selected", true);
        sessionStorage.removeItem("P0002NAME");
    } else {
        var pj = getQueryString("pj");
        if (pj != null && pj != '' && !d) {
            oneval = pj;
            onetype = "PJ";
            $('#oneval').show().val(pj);
            $('#onetype').find("option[value='PJ']").attr("selected", true);
        }
    }


    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    //numbership = $('#numselect').val();
    //numberval = $('#numqty').val();
    getSeachFloor();
    floortype = $('#floortype').val();
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
        "floortype": floortype,
        "floorval": floorval
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
    getSeachFloor();
    floortype = $('#floortype').val();
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
        "sort": 全局排序,
        "floortype": floortype,
        "floorval": floorval
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
    getSeachFloor();
    floortype = $('#floortype').val();
    //numbership = $('#numselect').val();
    //numberval = $('#numqty').val();
    全局页码 = 1;
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
        "floortype": floortype,
        "floorval": floorval
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
        if ($('#query_title input').is(':focus')) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            twotype = $('#twotype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            numbertype = $('#numbertype').val();
            getSeachFloor();
            floortype = $('#floortype').val();
            //numbership = $('#numselect').val();
            //numberval = $('#numqty').val();
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
                "floortype": floortype,
                "floorval": floorval
            });
        }
    }
});


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

//点击状态按钮跳转
$(document).on('click', '.Jump', function () {
    var status=$(this).attr('data-val');
    sessionStorage.setItem("P0003NAME", status);
    if (status.search('异常') != -1) {
        window.location.href = "/Page/ProjectManage/P0007.html";
    } else {
        window.location.href = "/Page/ProjectManage/P0006.html";
    }

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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 15)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.项目名称 + '</td>';
                   
                    if (obj.开始时间 == null || obj.开始时间 == '' ) {
                            content += '<td>';
                            content += '    <div class="progress_white Jump" data-val="未开始|' + obj.pj + '"  title="">未开始</div>';
                            content += '</td>';
                        }
                        else if (obj.完成时间 != null && obj.完成时间 != '' && obj.异常状态 <= 0) {
                            content += '<td>';
                            content += '    <div class="progress_green Jump"  data-val="已完成|' + obj.pj + '"   title="">已完成</div>';
                            content += '</td>';
                        }
                        else if (obj.开始时间 != null && obj.开始时间 != '') {
                            if (obj.异常状态 <= 0 ) {
                                content += '<td>';
                                content += '    <div class="progress_yellow Jump"  data-val="进行中|' + obj.pj + '"   title="">进行中</div>';
                                content += '</td>';
                            }
                            else {
                                content += '<td>';
                                content += '<div class="progress_red Jump"     data-val="异常|' + obj.pj + '"        title="pj：' + obj.pj + '  ' + obj.异常状态 + '个异常' + '">异常</div>';
                                content += '</td>';
                            }
                            
                        }
                    content += '<td>' + obj.楼层 + '</td>';
                    content += '<td>' + obj.工序名 + '</td>';

                    //content += '<td title="' + obj.作业明细.replace(/,/g, "") + '">' + obj.作业次数 + '</td>';
                    //content += '<td title="' + obj.异常明细.replace(/,/g, "") + '">' + obj.异常次数 + '</td>';

                    content += '<td title="' + obj.作业明细.replace(/,/g, "\n") + '">' + obj.作业次数 + '<a class="operation" data-val="' + obj.pj + "|" + obj.工序名 + '" style="margin-left:8px;" href="/Page/ProjectManage/P0006.html?pj=' + obj.pj + '">详情</a></td>';
                    content += '<td title="' + obj.异常明细.replace(/,/g, "\n") + '" >' + obj.异常次数 + '<a class="Exception" data-val="' + obj.pj + "|" + obj.工序名 + '"  style="margin-left:8px;" href="/Page/ProjectManage/P0007.html?pj=' + obj.pj + '">详情</a></td>';

                    content += '<td>' + obj.开始时间 + '</td>';
                    content += '<td>' + obj.完成时间 + '</td>';
                    content += '<td>' + obj.负责人 + '</td>';
                    content += '<td>' + obj.总工时 + '</td>';
                    content += '<td>' + obj.实际工时 + '</td>';
                    content += '<td>' + obj.暂停工时 + '</td>';
                    content += '</tr>';

                    //$('#ZY' + idx).css('title', obj.作业明细);
                    //$('#YC' + idx).css('title', obj.异常明细);


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



//单选
$(document).on('click', '#CheckFloor i.choice', function () {
    $(this).toggleClass('contor');
});

//楼层选择
$(document).on('change', '#floortype', function () {
    if ($(this).val() == '全部') {
        $('#CheckFloor').hide();
        return;
    }
    $('#CheckFloor').show();
});

////數字類型
//$(document).on('change', '#numbertype', function () {
//    if ($(this).val() == '全部') {
//        $('#numberval').hide();
//        return;
//    }
//    $('#numberval').show();
//    $('#numqty').attr('placeholder', '请输入' + $(this).val() + $('#numselect option:selected').text() + "数量")
//});
//$(document).on('change', '#numberval #numselect', function () {

//    $('#numqty').attr('placeholder', '请输入' + $('#numbertype option:selected').val() + $('#numselect option:selected').text() + "数量");

//});

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
            getSeachFloor();
            floortype = $('#floortype').val();
            //numbership = $('#numselect').val();
            //numberval = $('#numqty').val();
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
                "floortype": floortype,
                "floorval": floorval

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
    全局页码 = 1;
    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    twotype = $('#twotype').val();
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    numbertype = $('#numbertype').val();
    getSeachFloor();
    floortype = $('#floortype').val();
    //numbership = $('#numselect').val();
    //numberval = $('#numqty').val();
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
        "floortype": floortype,
        "floorval": floorval
    }, 全局页码);
});

//获取楼层
function getSeachFloor() {
    var fls = $('#CheckFloor').find('i.choice.contor');
    if (fls.length > 0) {
        floorval = '';
        $.each(fls, function (idx, obj) {
            floorval += $(this).attr('data-val') + ',';
        });
        floorval = floorval.substring(0, floorval.lastIndexOf(','));
    } else {
        floorval = '';
    }

}