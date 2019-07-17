//var page = 1;
//var onetype = "";
//var oneval = "";
//$(document).on('tap', '#conditions > .dropdown', function () {
//    $('#conditions').toggleClass('contor');
//});

//$(document).on('tap', '#conditions > .left > .query', function () {
//    oneval = $('#oneval').val();
//    onetype = $('#onetype_dummy').val();
//    page = 1;
//    GetPageList();
//});

//$(document).on('tap', '#form_tb > tr > td', function () {
//    $(this).parents('tr').addClass('contor').siblings().removeClass('contor');
//    var len = $('#form_tb > tr.contor').length;
//    if (len > 0) {
//        $('#bottom_footer > .right > .box1').addClass('contor');
//    }
//});

//$(document).on('tap', '#bottom_footer > .right > .box1.contor', function () {
//    var len = $('#form_tb > tr.contor').length;
//    if (len > 0) {
      
//        var 售后保修代码 = $('#form_tb > tr.contor > td.salescode').text();
       
//        $('#salescode').val(售后保修代码);
//        $('#form_design').submit();
//    } else {
//        alert('未选中行');
//        return;
//    }
//});

//$(function () {
//    GetPageList();
//})


//function AjaxFunc(总页数) {
//    var 当前加载页数 = $('#form_tb > tr').length;
//    $('#bottom_footer > .left > .box1').text(当前加载页数 + '/' + 总页数);

//}

//function GetPageList() {
//    if (page == 1) {
//        $('#form_tb').empty();
//    }

//    onetype = $("#onetype_dummy").val();
//    oneval = $("#oneval").val();

//    var dataarr = { "onetype": onetype, "oneval": oneval, "page": page };

//    订单信息('IIS3380', '/SalesManage.aspx?action=GetSalesService', dataarr, function () {

//    });
//}

////---滑动到底部事件
//$(document).on("pageshow", "#maindiv", function () {
//    var start, end;
//    $('#maindiv').on("scrollstart", function (event) {
//        start = $('#maindiv').scrollTop();
//    })
//    $('#maindiv').on("scrollstop", function (event) {
//        end = $('#maindiv').scrollTop();

//        if ((end - start) >= 0) {
//            if (end >= $('#form_tb').height() - $('#maindiv').height() - 100) {
//                page++;
//                GetPageList()
//            }
//        }
//    })
//});

////屏幕旋转
//window.addEventListener('resize', function () {
//    setTimeout(function () {
//    }, 300)
//});

///*
//    获取订单信息
//*/
//function 订单信息(urltype, pageurl, data, func) {
//    showLoading();
//    $.ajax({
//        cache: true,
//        type: "POST",
//        dataType: "json",
//        url: "/Web/WebApi.aspx?action=requestdata",
//        data: {
//            "urltype": urltype,
//            "pageurl": pageurl,
//            "data": JSON.stringify(data)
//        },
//        async: true,
//        error: function (request) {
//            hideLoading();
//        },
//        success: function (data) {
//            hideLoading();
//            if (data.errcode == 0) {
//                var pagecount = data.pagecount;
//                var 总页数 = data.totalnum
               
//                if (page <= pagecount) {
//                    var content = '';
//                    if (data.data != null) {
//                        $.each(data.data, function (idx, obj) {
//                            hide_bottom();
//                            content += '<tr>';
//                            content += '<td class="salescode" style="display:none;">' + obj.salescode + '</td>';
//                            content += '<td>' + obj.equipment + '</td>';
//                            content += '<td>' + obj.devicename + '</td>';
//                            content += '<td>' + obj.dealing + '</td>';
//                            content += '</tr>';
//                        });
//                    }
//                    else {
//                        A = $('#div_form_table');
//                        B = ' — 没有更多的订单啦 —';
//                        show_bottom(A, B);
//                    }
//                }
//                else {
//                    A = $('#div_form_table');
//                    B = ' — 没有更多的订单啦 —';
//                    show_bottom(A, B);
//                }
//                $('#form_tb').append(content);
//                AjaxFunc(总页数);
//            }
//            else {
//                alert(data.errmsg)
//            }
//        }
//    });
//}



var page = 1;
var onetype = '';
var oneval;
var numbertype;
var datetype = '';
var pagesize = 10;
var data;
var startdate = '';
var enddate = '';
var pagecount;

//$(document).on('tap', '#div_form_table > .infolist', function (e) {
//    stopDefault(e);
//    $(this).addClass('select').siblings().removeClass('select');
//    var len = $('#div_form_table > .infolist.select').length;
//    if (len > 0) {
//        $('#bottom_footer > .right > .box1').addClass('contor');
//    }
//});

//---滑动到底部事件
$(document).on("pageshow", "#maindiv", function () {
    var start, end;
    $('#maindiv').on("scrollstart", function (event) {
        start = $('#maindiv').scrollTop();
    })
    $('#maindiv').on("scrollstop", function (event) {
        if (page > pagecount) {
            return;
        }
        end = $('#maindiv').scrollTop();

        if ((end - start) >= 0) {
            if (end >= $('#div_form_table').height() - $('#maindiv').height() - 100) {
                page++;
                GetPageList();
            }
        }
    })
});

function GetPageList() {
    if (page == 1) {
        $('#div_form_table').empty();
    }

    查看售后全部数据('IIS3380', '/SalesManage.aspx?action=getAllSales', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize,
        "enddate": enddate,
        "startdate": startdate
    });
}



$(document).on('tap', '#conditions > .dropdown', function (e) {
    stopDefault(e);
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box3', function (e) {
    stopDefault(e);
    var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
    $("#salescode1").val(订单代码);
    $('#form_design1').submit();
});



$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    $(this).parents('.infolist').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text() == "展开") {
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('收起');
    } else {
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('展开');
    }
});

$(document).on('tap', '#conditions > .left > .query', function (e) {
    stopDefault(e);
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();
    page = 1;
    numbertype = $('#threetype_dummy').val();
    datetype = $('#twotype_dummy').val();
    startdate = $('#stardate').val();
    enddate = $('#enddate').val();
    GetPageList();
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box2', function (e) {
    stopDefault(e);
    var 订单代码 = $(this).parents('.infolist').attr('data-salescode');
    $("#salescode").val(订单代码);
    $('#form_design').submit();
});


$(function () {
    查看售后全部数据('IIS3380', '/SalesManage.aspx?action=getAllSales', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize,
        "enddate": enddate,
        "startdate": startdate
    });
});

/*
 查看售后全部数据
*/
function 查看售后全部数据(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
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
            var content = '';
           
            if (data.errcode == 0) {

                pagecount = data.pagecount;

                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {

                            content += '<div class="infolist" data-salescode="' + obj.订单代码 + '" data-dealingcode="' + obj.处理人代码 + '">';
                            content += '    <div class="maininfo">';

                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + obj.订单名称 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '           <div class="left">';
                            content += '               <div class="box1">' + obj.订单编号 + '</div>';
                            content += '               <div class="box2">提单人：' + obj.提单人 + '</div>';
                            content += '           </div>';
                            content += '           <div class="mid">';
                            content += '                <div class="box1">' + obj.问题分类 + '</div>';
                            content += '            </div>';
                            content += '               <div class="right">';
                            content += '                   <div class="box1">';
                            if (obj.关闭状态 == "1") {
                                content += '<div class="column5">' + "已完成" + '</div>';
                            } else if (obj.故障解除时间.length != 0) {
                                content += '<div class="column3">' + "已处理" + '</div>';
                            } else if (obj.状态 == '未处理') {
                                content += '<div class="column4">' + "未处理" + '</div>';
                            } else {
                                content += '<div class="column2">' + "处理中" + '</div>';
                            }

                            content += '                    </div>';
                            content += '                   <div class="box2">';
                            content += '                        <div class="column2">厂区：' + obj.厂区 + '</div>';
                            content += '                     </div>';
                            content += '                </div>';
                            content += '           </div>';

                            content += '           <div class="detialinfo">';
                            content += '              <div class="row1">';
                            content += '                   <div class="right">配件需求：' + obj.配件需求 + '</div>';
                            content += '                   <div class="left">故障描述：' + obj.故障描述 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row2">';
                            content += '                    <div class="right">处理措施：' + obj.处理措施 + '</div>';
                            content += '                    <div class="left">处理日期：' + obj.处理日期 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row3">';
                            content += '                    <div class="right">处理人：' + obj.处理人 + '</div>';
                            content += '                    <div class="left">解除时间：' + obj.故障解除时间 + '</div>';
                            content += '               </div>';
                            content += '           </div>';

                            content += '           <div class="rows3">';
                            content += '               <div class="left">';
                            content += '                    <div class="box1">展开</div>';

                            content += '<div class="box2">明细</div>';

                            content += '<div class="box3">回复</div>';

                            content += '               </div>';
                            content += '               <div class="right">';
                            content += '                    <div class="box1">' + obj.创建时间 + '</div>';
                            content += '               </div>';
                            content += '           </div>';
                            content += '    </div>';
                            content += '</div>';
                        });
                    }
                    else {
                        A = $('#div_form_table');
                        B = ' — 没有更多的订单啦 —';
                        show_bottom(A, B);
                    }
                } else {
                    A = $('#div_form_table');
                    B = ' — 没有更多的订单啦 —';
                    show_bottom(A, B);
                }
                $('#div_form_table').append(content);
            }

            else {
                if (data.errcode == -2) {

                } else {
                    alert(data.errmsg);
                }
            }
        }
    });
}

/*
 关闭图纸
*/
function 关闭图纸(urltype, pageurl, data) {
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
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
            var content = '';
            if (data.errcode == 0) {
                alert("关闭成功");
                $('#addinfo').removeClass('contor');
                setTimeout(function () {
                    $('#mask300').removeClass('contor');
                }, 350);
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}