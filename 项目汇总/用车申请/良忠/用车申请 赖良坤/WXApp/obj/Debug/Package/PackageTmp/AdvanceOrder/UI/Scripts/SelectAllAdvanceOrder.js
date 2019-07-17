var page = 1;
var onetype = '全部';
var oneval;
var numbertype;
var datetype = '全部';
var pagesize = 20;
var data;
var startdate = '';
var enddate = '';
var 流程单号 = '';
var 试制号 = '';
var 图档号 = '';
var pagecount;

$(document).on('tap', '#conditions > .dropdown', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $('#conditions').toggleClass('contor');
});
$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $(this).parents('.infolist').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $(this).addClass('select').siblings().removeClass('select');
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
});

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

    查看图纸全部('IIS3380', '/AdvanceOrder.aspx?action=getAll', {
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

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .left .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    $('#addinfo').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);

    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box1', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text() == "展开") {
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('收起');
    } else {
        $(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box1').text('展开');
    }
});

$(document).on('tap', '#conditions > .left > .query', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();
    page = 1;
    numbertype = $('#threetype_dummy').val();
    datetype = $('#twotype_dummy').val();
    startdate = $('#stardate').val();
    enddate = $('#enddate').val();
    GetPageList();
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box3', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box3').text() == "添加") {
        $('#form_add').submit();
    } else {
        var name = $(this).parents('.infolist').attr('data-specifications');
        var processnum = $(this).parents('.infolist').attr('data-processnum');
        var version = $(this).parents('.infolist').attr('data-imagenum');
        var num = $(this).parents('.infolist').attr('data-demandednumber');
        var ordertype = $(this).parents('.infolist').attr('data-classified');
        var archive = $(this).parents('.infolist').attr('data-notificationdate');
        var testnumber = $(this).parents('.infolist').attr('data-testnumber');
        var PM = $(this).parents('.infolist').attr('data-PM');
        var Lading = $(this).parents('.infolist').attr('data-Lading');
        var Scenario = $(this).parents('.infolist').attr('data-Scenario');
        var SubprocessNo = $(this).parents('.infolist').attr('data-SubprocessNo');

        $('#ProcessNo1').val(processnum);
        $('#TrialNo1').val(testnumber);
        $('#ImageNo1').val(version);
        $('#Name1').val(name);
        $('#DemandNum1').val(num);
        $('#Classified1').val(ordertype);
        $('#Lading1').val(Lading);
        $('#Sysnotifydate1').val(archive);
        $('#Scenario1').val(Scenario);
        $('#SubprocessNo1').val(SubprocessNo);
        $('#PM1').val(PM);
        $('#form_design1').submit();
    }
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .left > .box2', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "添加") {
        $('#form_add').submit();
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "关闭") {
        $('input').blur();

        流程单号 = $(this).parents('.infolist').attr('data-processnum');
        试制号 = $(this).parents('.infolist').attr('data-testnumber');
        图档号 = $(this).parents('.infolist').attr('data-imagenum');

        $('#addinfo').addClass('contor');
        $('#mask300').addClass('contor');
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "恢复") {
        if (confirm("确定恢复改图纸吗？")){
            var usercode = $('#usercode').val();
            var processnum = $(this).parents('.infolist').attr('data-processnum');
            var version = $(this).parents('.infolist').attr('data-imagenum');
            var testnumber = $(this).parents('.infolist').attr('data-testnumber');

            恢复图纸('IIS3380', '/AdvanceOrder.aspx?action=recover', {
                "usercode": usercode,
                "processnum": processnum,
                "imagenum": version,
                "testnumber": testnumber
            });
        }
    } else if ($(this).parents('.infolist').find('.maininfo > .rows3 > .left > .box2').text() == "编辑") {

        var drawingcode = $(this).parents('.infolist').attr('data-drawingcode');
        var name = $(this).parents('.infolist').attr('data-specifications');
        var processnum = $(this).parents('.infolist').attr('data-processnum');
        var version = $(this).parents('.infolist').attr('data-imagenum');
        var num = $(this).parents('.infolist').attr('data-demandednumber');
        var ordertype = $(this).parents('.infolist').attr('data-classified');
        var archive = $(this).parents('.infolist').attr('data-notificationdate');
        var testnumber = $(this).parents('.infolist').attr('data-testnumber');
        $('#ProcessNo').val(processnum);
        $('#TrialNo').val(testnumber);
        $('#ImageNo').val(version);
        $('#Name').val(name);
        $('#DemandNum').val(num);
        $('#Scenario').val(ordertype);
        $('#ArchiveDate').val(archive);
        $('#drawingcode').val(drawingcode);
        $('#form_design').submit();
    }
});

$(document).on('tap', '#addinfo > .materialinfo > .column4 > .right .values', function (e) {
    stopDefault(e);
    $("textarea ").blur();
    var usercode = $('#usercode').val();
    var 关闭原因 = $('#addinfo > .materialinfo > .column1 > .right textarea').val();


    关闭图纸('IIS3380', '/AdvanceOrder.aspx?action=close', {
        "usercode": usercode,
        "processnum": 流程单号,
        "imagenum": 图档号,
        "testnumber": 试制号,
        "cause": 关闭原因
    });

    $('#addinfo > .materialinfo > .column1 > .right textarea').val('');
});

$(function (){
    查看图纸全部('IIS3380', '/AdvanceOrder.aspx?action=getAll', {
        "page": page,
        "onetype": onetype,
        "oneval": oneval,
        "numbertype": numbertype,
        "datetype": datetype,
        "pagesize": pagesize
    });
});


/*
 查看图纸全部
*/
function 查看图纸全部(urltype, pageurl, data) {
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
            
            if (data.errcode == 0) {

                pagecount = data.pagecount;

                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {
                            hide_bottom();

                            content += '<div class="infolist" data-processnum="' + obj.流程单号 + '" data-testnumber=" ' + obj.试制号 + '" data-imagenum="' + obj.图档号 + '" data-drawingcode="' + obj.已出图代码 + '" data-demandednumber="' + obj.需求数量 + '" data-classified="' + obj.归类 + '" data-notificationdate="' + obj.系统通知时间 + '" data-specifications="' + obj.规格型号 + '" data-PM="' + obj.项目经理 + '" data-Lading="' + obj.提单人 + '" data-Scenario="' + obj.需求场景 + '" data-SubprocessNo="' + obj.子流程单号 + '">';
                            content += '    <div class="maininfo">';

                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + obj.规格型号 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '           <div class="left">';
                            content += '               <div class="box1">流程单号：' + obj.流程单号 + '</div>';
                            content += '               <div class="box2">创建人：' + obj.创建人名字 + '</div>';
                            content += '           </div>';
                            content += '           <div class="mid">';
                            content += '                <div class="box1">' + obj.需求数量 + '</div>';
                            content += '            </div>';
                            content += '               <div class="right">';
                            content += '                   <div class="box1">';
                            if (obj.状态 == 0) {
                                content += '<div class="column2">' + '未出图' + '</div>';
                            } else if (obj.状态 == 1) {
                                content += '<div class="column3">' + '已出图' + '</div>';
                            } else {
                                content += '<div class="column4">' + '已关闭' + '</div>';
                            }
                            content += '                    </div>';
                            content += '                   <div class="box2">';
                            content += '                        <div class="column2">归类：' + obj.归类 + '</div>';
                            content += '                     </div>';
                            content += '                </div>';
                            content += '           </div>';

                            content += '           <div class="detialinfo">';
                            content += '              <div class="row1">';
                            content += '                   <div class="right">图档号：' + obj.图档号 + '</div>';
                            content += '                   <div class="left">需求场景：' + obj.需求场景 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row2">';
                            content += '                    <div class="right">子流程单号：' + obj.子流程单号 + '</div>';
                            content += '                    <div class="left">项目经理：' + obj.项目经理 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row3">';
                            content += '                    <div class="right">提单人：' + obj.提单人 + '</div>';
                            content += '                    <div class="left">试制号：' + obj.试制号 + '</div>';
                            content += '               </div>';
                            content += '               <div class="row4">';
                            content += '                    <div class="right">关闭人：' + obj.关闭人姓名 + '</div>';
                            content += '                    <div class="left">通知时间：' + obj.系统通知时间 + '</div>';
                            content += '               </div>';
                            content += '           </div>';

                            content += '           <div class="rows3">';
                            content += '               <div class="left">';


                            content += '                    <div class="box1">展开</div>';
                            if (obj.状态 == 0) {
                                content += '<div class="box2">关闭</div>';
                            } else if (obj.状态 == 2) {
                                content += '<div class="box2">恢复</div>';
                            } else {
                                if (obj.创建人代码 == $('#usercode').val()) {
                                    content += '<div class="box2">编辑</div>';
                                } else {
                                    content += '<div class="box2">添加</div>';
                                }
                            }

                            if (obj.状态 == 0) {
                                content += '<div class="box3">设计</div>';
                            } else if (obj.状态 == 1 && obj.创建人代码 == $('#usercode').val()) {
                                content += '<div class="box3">添加</div>';
                            }
                            
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
                alert(data.errmsg)
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
                location.reload();
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

/*
 恢复图纸
*/
function 恢复图纸(urltype, pageurl, data) {
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
                alert("恢复图纸成功");
                location.reload();
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}