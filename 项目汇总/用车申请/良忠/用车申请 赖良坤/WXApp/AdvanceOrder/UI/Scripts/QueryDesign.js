var id = "http://192.168.1.104:3380";
var page = 1;
var search = '';
var onetype;
var oneval;
var pagecount;
$(document).on('tap', '#conditions > .dropdown', function () {
    $('#conditions').toggleClass('contor');
});

$(document).on('tap', '#conditions > .left > .query', function () {
    oneval = $('#oneval').val();
    onetype = $('#onetype_dummy').val();
    page = 1;
    GetPageList();
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
        var drawingcode = $('#div_form_table > .infolist.select').attr('data-drawingcode');
       
        var name = $('#div_form_table > .infolist.select').attr('data-specifications');
        var processnum = $('#div_form_table > .infolist.select').attr('data-processnum');
        var version = $('#div_form_table > .infolist.select').attr('data-imagenum');
        var num = $('#div_form_table > .infolist.select').attr('data-demandednumber');
        var ordertype = $('#div_form_table > .infolist.select').attr('data-classified');
        var archive = $('#div_form_table > .infolist.select').attr('data-notificationdate');
        var testnumber = $('#div_form_table > .infolist.select').attr('data-testnumber');
        $('#ProcessNo1').val(processnum);
        $('#TrialNo1').val(testnumber);
        $('#ImageNo1').val(version);
        $('#Name1').val(name);
        $('#DemandNum1').val(num);
        $('#Scenario1').val(ordertype);
        $('#ArchiveDate1').val(archive);
        $('#drawingcode1').val(drawingcode);
        $('#form_design1').submit();
       
    } else {
        alert('未选中行');
        return;
    }
});

$(function () {
    GetPageList();
})

$(document).on('tap', '#div_form_table > .infolist > .maininfo > .rows3 > .box3', function (e) {
    stopDefault(e);
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
});


function GetPageList() {
    if (page == 1) {
        $('#div_form_table').empty();
    }

    var dataarr = { "onetype": onetype, "oneval": oneval, "page": page };

    去重('IIS3380', '/AdvanceOrder.aspx?action=getDrawing', dataarr, function () {
        
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
            if (end >= $('#form_tb').height() - $('#maindiv').height() - 100) {
                page++;

                GetPageList()
            }
        }
    })
});

//屏幕旋转
window.addEventListener('resize', function () {
    setTimeout(function () {
    }, 300)
});
$(document).on('tap', '#div_form_table > .infolist', function (e) {
    stopDefault(e);
    $(this).addClass('select').siblings().removeClass('select');
    var len = $('#div_form_table > .infolist.select').length;
    if (len > 0) {
        $('#bottom_footer > .right > .box1').addClass('contor');
    }
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
                pagecount = data.pagecount;
                var 总页数 = data.totalnum
                
                if (page <= pagecount) {
                    var content = '';
                    if (data.data != null) {
                        $.each(data.data, function (idx, obj) {
                            hide_bottom();


                            content += '<div class="infolist" data-drawingcode="' + obj.drawingcode + '" data-specifications="' + obj.specifications + '" data-processnum="' + obj.processnum + '" ';
                            content += 'data-imagenum="' + obj.imagenum + '" data-demandednumber="' + obj.demandednumber + '" data-classified="' + obj.classified + '" data-notificationdate="' + obj.notificationdate + '" data-testnumber="' + obj.testnumber + '" >';
                            content += '    <div class="maininfo">';
                            content += '        <div class="rows1">';
                            content += '            <div class="box1">' + obj.specifications + '</div>';
                            content += '        </div>';
                            content += '        <div class="rows2">';
                            content += '            <div class="left">';
                            content += '                <div class="box1">流程单号：' + obj.processnum + '</div>';
                            content += '                <div class="box2">图档号：' + obj.imagenum + '</div>';
                            content += '            </div>';
                            content += '            <div class="mid">';
                            content += '                <div class="box1">' + obj.demandednumber + '</div>';
                            content += '            </div>';
                            content += '            <div class="right">';
                            content += '                <div class="box1">归类：' + obj.classified + '</div>';
                            content += '            </div>';
                            content += '        </div>';
                            content += '        <div class="rows3">';
                            content += '            <div class="box1">归档日期：' + obj.notificationdate + '</div>';
                            content += '            <div class="box2">试制号：' + obj.testnumber + '</div>';
                            if (obj.createusercode == $('#usercode').val()){
                                content += '            <div class="box3">';
                                content += '                <i class="iconfont">&#xe655;</i>';
                                content += '            </div>';
                            }
                            content += '        </div>';
                            content += '    </div>';
                            content += '</div>';


                            //content += '<tr>';
                            //content += '<td class="drawingcode" style="display:none;">' + obj.drawingcode + '</td>';
                            //content += '<td class="ProcessNo">' + obj.processnum + '</td>';
                            //content += '<td class="TrialNo">' + obj.testnumber + '</td>';
                            //content += '<td class="ImageNo">' + obj.version + '</td>';
                            //content += '<td class="Name">' + obj.name + '</td>';
                            //content += '<td class="DemandNum">' + obj.num + '</td>';
                            //content += '<td class="Scenario">' + obj.ordertype + '</td>';
                            //content += '<td class="ArchiveDate">' + obj.archive + '</td>';
                            //content += '</tr>';
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