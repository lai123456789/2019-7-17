var id = "http://192.168.1.104:3380";
var page = 1;
var onetype = '全部';
var oneval = '';
var numbertype = '未出图';
var datetype = '全部';
var pagesize = 20;
var data;
var pagecount;
$(document).on('tap', '#conditions > .dropdown', function () {
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#conditions > .left > .query', function () {
    onetype = $('#onetype_dummy').val();
    oneval = $('#oneval').val();
    page = 1;
    getDrawing()
});


$(document).on('tap', '#form_tb > tr > td', function () {
    $(this).parents('tr').addClass('contor').siblings().removeClass('contor');
    var len = $('#form_tb > tr.contor').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
});

$(document).on('tap', '#bottom_footer > .right > .box1.contor', function () {
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        //var 流程单号 = $('#form_tb > tr.contor > td.ProcessNo').text();
        //var 项目经理 = $('#form_tb > tr.contor > td.PM').text();
        //var 试制号 = $('#form_tb > tr.contor > td.TrialNo').text();
        //var 图纸号 = $('#form_tb > tr.contor > td.ImageNo').text();
        //var 名称 = $('#form_tb > tr.contor > td.Name').text();
        //var 需求数量 = $('#form_tb > tr.contor > td.DemandNum').text();
        //var 归类 = $('#form_tb > tr.contor > td.Classified').text();
        //var 提单人 = $('#form_tb > tr.contor > td.Lading').text();
        //var 系统通知日期 = $('#form_tb > tr.contor > td.Sysnotifydate').text();
        //var 需求场景 = $('#form_tb > tr.contor > td.Scenario').text();
        //var 子流程单号 = $('#form_tb > tr.contor > td.SubprocessNo').text();


        var 流程单号 = $('#div_form_table > .infolist.select').attr('data-ProcessNo');
        var 项目经理 = $('#div_form_table > .infolist.select').attr('data-PM');
        var 试制号 = $('#div_form_table > .infolist.select').attr('data-TrialNo');
        var 图纸号 = $('#div_form_table > .infolist.select').attr('data-ImageNo');
        var 名称 = $('#div_form_table > .infolist.select').attr('data-Name');
        var 需求数量 = $('#div_form_table > .infolist.select').attr('data-DemandNum');
        var 归类 = $('#div_form_table > .infolist.select').attr('data-Classified');
        var 提单人 = $('#div_form_table > .infolist.select').attr('data-Lading');
        var 系统通知日期 = $('#div_form_table > .infolist.select').attr('data-Sysnotifydate');
        var 需求场景 = $('#div_form_table > .infolist.select').attr('data-Scenario');
        var 子流程单号 = $('#div_form_table > .infolist.select').attr('data-SubprocessNo');

        $('#ProcessNo').val(流程单号);
        $('#PM').val(项目经理);
        $('#TrialNo').val(试制号);
        $('#ImageNo').val(图纸号);
        $('#Name').val(名称);
        $('#DemandNum').val(需求数量);
        $('#Classified').val(归类);
        $('#Lading').val(提单人);
        $('#Sysnotifydate').val(系统通知日期);
        $('#Scenario').val(需求场景);
        $('#SubprocessNo').val(子流程单号);
        $('#form_design').submit();

    } else {
        alert('未选中行');
        return;
    }
});

function getDrawing() {


    if (page == 1) {
        $('#div_form_table').empty();
    }

    var dataarr = { "page": page, "onetype": onetype, "oneval": oneval, "numbertype": numbertype, "datetype": datetype, "pagesize": pagesize };
    去重('IIS3380', '/AdvanceOrder.aspx?action=getExcel', dataarr, function () {

    });
}

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
            if (end >= $('#div_form_table').height() - $('#maindiv').height()) {
                page++;
                getDrawing();
            }
        }
    })
});

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .box3', function (e) {
    stopDefault(e);
    $(this).parents('.infolist').toggleClass('contor');
});

$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    $(this).addClass('select').siblings().removeClass('select');
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
});

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});

$(function () {
    getDrawing();
});

/*
恢复物料齐套数据
*/
function 去重(urltype, pageurl, data, func) {
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
                var 总页数 = data.totalnum;

                pagecount = data.pagecount;
                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {
                            //content += '<tr>';
                            //content += '<td class="ProcessNo">' + obj.流程单号 + '</td>';
                            //content += '<td class="PM">' + obj.项目经理 + '</td>';
                            //content += '<td class="TrialNo">' + obj.试制号 + '</td>';
                            //content += '<td class="ImageNo">' + obj.图档号 + '</td>';
                            //content += '<td class="Name">' + obj.规格型号及夹具名称 + '</td>';
                            //content += '<td class="DemandNum">' + obj.需求数量 + '</td>';
                            //content += '<td class="Classified">' + obj.归类 + '</td>';
                            //content += '<td class="Lading">' + obj.提单人 + '</td>';
                            //content += '<td class="Sysnotifydate">' + obj.系统通知日期 + '</td>';
                            //content += '<td class="Scenario">' + obj.需求场景 + '</td>';
                            //content += '<td class="SubprocessNo">' + obj.子流程单号 + '</td>';
                            //content += '</tr>';


                            content += '<div class="infolist" data-ProcessNo="' + obj.流程单号 + '" data-PM="' + obj.项目经理 + '" data-TrialNo="' + obj.试制号 + '" ';
                            content += 'data-ImageNo="' + obj.图档号 + '" data-Name="' + obj.规格型号及夹具名称 + '" data-DemandNum="' + obj.需求数量 + '" ';
                            content += 'data-Classified="' + obj.归类 + '" data-Lading="' + obj.提单人 + '" data-Sysnotifydate="' + obj.系统通知日期 + '" ';
                            content += 'data-Scenario="' + obj.需求场景 + '" data-SubprocessNo="' + obj.子流程单号 + '" >';
                            content += '    <div class="maininfo">';
                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + obj.规格型号及夹具名称 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '            <div class="left">';
                            content += '                <div class="box1">流程单号：' + obj.流程单号 + '</div>';
                            content += '                <div class="box2">图档号：' + obj.图档号 + '</div>';
                            content += '            </div>';
                            content += '            <div class="mid">';
                            content += '                <div class="box1">' + obj.需求数量 + '</div>';
                            content += '            </div>';
                            content += '            <div class="right">';
                            content += '                <div class="box1">' + obj.需求场景 + '</div>';
                            content += '            </div>';
                            content += '        </div>';
                            content += '        <div class="rows3">';
                            content += '            <div class="box1">系统通知日期：' + obj.系统通知日期 + '</div>';
                            content += '            <div class="box2">归类：' + obj.归类 + '</div>';
                            content += '            <div class="box3">';
                            content += '                <i class="iconfont">&#xe784;</i>';
                            content += '            </div>';
                            content += '        </div>';
                            content += '    </div>';
                            content += '    <div class="detialinfo">';
                            content += '        <div class="rows1">';
                            content += '            <div class="box1">试制号：' + obj.试制号 + '</div>';
                            content += '            <div class="box2">子流程单号：' + obj.子流程单号 + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '            <div class="box1">项目经理：' + obj.项目经理 + '</div>';
                            content += '            <div class="box2">提单人：' + obj.提单人 + '</div>';
                            content += '        </div>';
                            content += '    </div>';
                            content += '</div>';
                        });

                    }
                    else {
                        A = $('#div_form_table');
                        B = ' — 没有更多的订单啦 —';
                        show_bottom(A, B);
                    }
                }
                else {
                    A = $('#div_form_table');
                    B = ' — 没有更多的订单啦 —';
                    show_bottom(A, B);
                }
                $('#div_form_table').append(content);
                var 当前加载页数 = $('#div_form_table > .infolist').length;
                $('#bottom_footer > .left > .box1').text(当前加载页数 + '/' + 总页数);
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}