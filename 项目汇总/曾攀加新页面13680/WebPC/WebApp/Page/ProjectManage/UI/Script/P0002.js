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
var page = 1;
var usercode = '';
var pj = '';
$(function () {
   
    var d = sessionStorage.getItem("P0001NAME");
    if (d && d.length > 0) {
        var arr = d.split('|');
        oneval = arr[1];
        onetype = "PJ";
        numbertype = arr[0];
        $('#oneval').show().val(arr[1]);
        $('#onetype').find("option[value='PJ']").attr("selected", true);
        $('#numbertype').find("option[value='" + arr[0] + "']").attr("selected", true);
        sessionStorage.removeItem("P0001NAME");
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
    numbership = numbership;
    numberval = numberval;
    getSeachFloor();
    floortype = $('#floortype').val();

    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorder", {
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
        "floorval": floorval,
        "usercode": ""
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
        "floorval": floorval,
        "usercode": ""
    };
    $('#urltype').val('IIS3676');
    $('#pageurl').val("BusinessManage/AssemblyManage.aspx?action=excelgetassemblyorder");
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
    numbership = numbership;
    numberval = numberval;
    getSeachFloor();
    floortype = $('#floortype').val();
    全局页码 = 1;
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorder", {
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
        "floorval": floorval,
        "usercode": ""
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
            numbership = numbership;
            numberval = numberval;
            getSeachFloor();
            floortype = $('#floortype').val();
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorder", {
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
                "floorval": floorval,
                "usercode": ""
            });
        }
    }
})


$(document).on('click', '#add_sex > .label.label-default', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
});





$(document).on('click', '#form_tb .printqr', function () {
     pj = $(this).attr('data-pj');
     //$("#SurePringPwd").draggable();//为模态对话框添加拖拽
     //$("#SurePringPwd").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
     //$('#SurePringPwd').modal('show');

    if (confirm("确定打印PJ号：" + pj + '的二维码吗？')) {
        PrintAssemblyQrcodeList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=printassemblyqrcode", {
            "pj": pj,
            "usercode": "",
            "printpwd": ""
        });
    }



   
});

//$(document).on('click', '#Print_sure', function () {
//    var pwd = $('#PrintPwd').val();
//    if(!pwd && pwd.length==0){
//        alert("请输入打印密码!");
//        return;
//    }
//    PrintAssemblyQrcodeList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=printassemblyqrcode", {
//        "pj": pj,
//        "usercode": "",
//        "printpwd": pwd
//    });
//});


//点击状态按钮跳转
$(document).on('click', '.Jump', function () {
    sessionStorage.setItem("P0002NAME", $(this).attr('data-val'));
    window.location.href = "/Page/ProjectManage/P0003.html";

});


//打印用户列表弹窗
$(document).on('click', '#SearchPwd', function () {
    page = 1;
    $("#PrintUserModal").draggable();//为模态对话框添加拖拽
    $("#PrintUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#PrintUserModal').modal('show');
    GetPrintUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getPrintUserPwd", {
        "page": page
    });
});



$(document).on('click', '.ModiflyPwd', function () {
    usercode = $(this).attr('data-val');
    $('#updatePrintPwd').val("");
    $("#UpdatePrint").draggable();//为模态对话框添加拖拽
    $("#UpdatePrint").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#UpdatePrint').modal('show');
});


$(document).on('click', '#Prit_Pwdsure', function () {
    var updtePrintPwd = $('#updatePrintPwd').val();
    if (!updtePrintPwd && updtePrintPwd.length == 0) {
        alert("请输入打印密码!");
        return;
    }
    GetPrintUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=updatePrintUserPwd", {
        "printpwd": updtePrintPwd,
        "usercode": usercode
    });
});
//打印搜索
$(document).on('click', '.queryPrint-btn', function () {
    var updtePrintPwd = $('.Print-Txt').val();
    page = 1;
    GetPrintUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getPrintUserPwd", {
        "page": page,
        "account": updtePrintPwd
    });
});

/************************************* Ajax *******************************************/



function UpdatePrintPwd(urltype, pageurl, data) {
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
                $('#UpdatePrint').modal('hide');
                alert(data.errmsg);
                var updtePrintPwd = $('.Print-Txt').val();
                page = 1;
                GetPrintUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getPrintUserPwd", {
                    "page": page,
                    "account": updtePrintPwd
                });
            }
            else {
                $('#UpdatePrint').modal('hide');
                alert(data.errmsg)
            }
        }
    });
}






function GetPrintUserList(urltype, pageurl, data) {
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 15)) + '</td>';
                    content += '<td>' + obj.account + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.printpwd + '</td>';
                    content += '<td>' + obj.depairtement + '</td>';
                    content += '<td>' + obj.createdate + '</td>';
                    content += '<td>' + obj.midiflydate + '</td>';
                    content += '<td>';
                    content += '    <a href="#"  class="ModiflyPwd"    data-val="' + obj.usercode + '" >修改密码</a>';
                    content += '</td>';
                    content += '</tr>';

                });
                $('#form_tb_Print').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                //if (data.usercode == "mt00000491" || data.usercode == "mt00000589" || data.usercode == "mt00000001") {
                //    $('#SearchPwd').show();
                //} else {
                //    $('#SearchPwd').hide();
                //}

                $("#pagination_PringPwd").pagination('setPage', parseFloat(page), parseFloat(pagecount));

              
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




//分页
$(function () {
    $("#pagination_PringPwd").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            excel = "";
            GetPrintUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getPrintUserPwd", {
                "page": page
            });
        }
    });
});











/*
获取用户列表
*/

function GetUserList(urltype, pageurl, data, page) {
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
                    content += '<td>' + obj.楼层 + '</td>';
                    content += '<td>';
                    if (obj.开始时间 == null || obj.开始时间 == '') {
                        content += '<div class="progress_white Jump"   data-val="未开始|' + obj.pj + '" >未开始</div>';
                    }
                    else if (obj.开始时间 != null && obj.开始时间 != '' && (obj.完成时间 == null || obj.完成时间 == '')) {
                        if (parseInt(obj.是否异常) > 0) {
                            content += '<div class="progress_red Jump"        data-val="异常|' + obj.pj + '"         title="Pj： ' + obj.pj + "    " + obj.是否异常 + "个异常" + '">异常</div>';
                        }
                        else {
                            content += '<div class="progress_yellow Jump" data-val="进行中|' + obj.pj + '" >进行中</div>';
                        }
                    }
                    else if (obj.完成时间 != null && obj.完成时间 != '') {
                        content += '<div class="progress_green Jump"    data-val="已完成|' + obj.pj + '"     title="">完成</div>';
                    }
                    content += '</td>';
                    content += '<td>' + obj.当前工序 + '</td>';
                    content += '<td>' + obj.开始时间 + '</td>';
                    content += '<td>' + obj.完成时间 + '</td>';
                    content += '<td>' + obj.总工时 + '</td>';
                    content += '<td>' + obj.实际工时 + '</td>';
                    content += '<td>' + obj.暂停工时 + '</td>';
                    content += '<td>' + obj.打印次数 + '<a style="margin-left:8px;" href="/Page/ProjectManage/P0014.html?pj=' + obj.pj + '">详情</a></td>';
                    content += '<td>' + obj.是否关闭订单 + '</td>';
                    content += '<td>' + obj.关闭原因 + '</td>';
                    content += '<td>';
                    content += '    <a href="JavaScript:;" data-pj="' + obj.pj + '" class="printqr">打印</a>';
                    content += '    <a href="/Page/ProjectManage/P0003.html?pj=' + obj.pj + '">明细</a>';
                    content += '</td>';
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                
                $("#div_mainform_table").freezeTable({
                    'columnNum': 2,
                     shadow:true
                });

                //$("#div_mainform_table").freezeTable({
                //    'headWrapStyles': { 'box-shadow': '0px 9px 10px -5px rgba(159, 159, 160, 0.8)' },
                //    'columnNum': 2
                //});


                if (data.usercode == "mt00000491" || data.usercode == "mt00000589" || data.usercode == "mt00000001") {
                    $('#resetOrderPJ').show();
                    $('#SearchPwd').show();
                } else {
                    $('#resetOrderPJ').hide();
                    $('#SearchPwd').hide();
                }

                $("#pagination_P0002").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


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
打印二维码
*/
function PrintAssemblyQrcodeList(urltype, pageurl, data) {
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
                alert('提交打印指令发送成功');
              //  $('#SurePringPwd').modal('hide');
            }
            else {
                alert(data.errmsg);
                //$('#SurePringPwd').modal('hide');
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


/************************************* Search End *******************************************/


//分页
$(function () {
    $("#pagination_P0002").pagination({
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
            numbership = numbership;
            numberval = numberval;
            getSeachFloor();
            floortype = $('#floortype').val();

            全局页码 = currPage;
            GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorder", {
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
                "floorval": floorval,
                "usercode": ""
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
    numbership = numbership;
    numberval = numberval;
    getSeachFloor();
    floortype = $('#floortype').val();
    GetUserList("IIS3676", "BusinessManage/AssemblyManage.aspx?action=getassemblyorder", {
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
        "floorval": floorval,
        "usercode": ""
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

//恢复关闭订单
$(document).on('click', '#resetOrderPJ', function () {
    $("#ResetOrderDialog").draggable();//为模态对话框添加拖拽
    $("#ResetOrderDialog").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#ResetOrderDialog').modal('show');

});
//恢复关闭订单确认

$(document).on('click', '#Reset_Ordersure', function () {
    var pj = $('#resetOrderVal').val();
    if (!pj && pj.length == 0) {
        alert("请先输入pj号");
        return;
    }
    ResetOrdersure("IIS3676", "BusinessManage/AssemblyManage.aspx?action=resumeClosingOrder", {
        "pj": pj,
        "usercode": ""
    });

});





function ResetOrdersure(urltype, pageurl, data) {
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
            $('#ResetOrderDialog').modal('hide');
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                alert(data.errmsg);
                $('#ResetOrderDialog').modal('hide');
            }
            else {
                alert(data.errmsg);
                $('#ResetOrderDialog').modal('hide');
            }
        }
    });
}