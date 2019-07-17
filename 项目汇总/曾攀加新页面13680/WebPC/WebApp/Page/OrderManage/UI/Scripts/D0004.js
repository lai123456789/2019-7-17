
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '', sortfield = '', sort = '', pickingcode = '';
var PORT = "IIS3380";
var URL = "AdvanceOrder.aspx?action=";
var 物料 = new Array();
var 是否为审核人 = false;
$(function () {

    查看是否为备料审核人('IIS3380', '/AdvanceOrder.aspx?action=selectReviewer', {
        "usercode": ""
    });

    $("#pagination_P0011").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            //numbertype = $('#numbertype').val();
            //datetype = $('#datetype').val();
            //startdate = $('#startdate').val();
            //enddate = $('#enddate').val();
            page = currPage;
            GetDrawingsList(PORT, URL + "GetYESMaterialsDrawing", {
                "onetype": onetype,
                "oneval": oneval
            }, page);
        }
    });

   
});

/*
导出Excel(左边)
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    var fileName = $('#datalist .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "excelgetpickingDocumentPCList");
    $('#data').val(JSON.stringify(Getseach()));
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
    $('#pageurl').val(URL + "excelgetpickingDocumentDetailPCList");
    $('#data').val(JSON.stringify(Getseach()));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});


//$(document).on('click', '#top_main > .infolist', function () {
//    $(this).addClass('contor').siblings().removeClass('contor');

//    if ($('#top_main > .infolist.contor').text() == "全部") {
//        GetDrawingsList(PORT, URL + "getDrawing", Getseach());
//    } else if ($('#top_main > .infolist.contor').text() == "未处理") {
//        GetDrawingsList(PORT, URL + "GetUntreatedDrawing", Getseach());
//    } else if ($('#top_main > .infolist.contor').text() == "备料") {
//        GetDrawingsList(PORT, URL + "GetYESMaterialsDrawing", Getseach());
//    } else if ($('#top_main > .infolist.contor').text() == "不备料") {
//        GetDrawingsList(PORT, URL + "GetNOMaterialsDrawing", Getseach());
//    }

//});


//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    $('#datalist2 #form_tb').empty();

    GetDrawingsList(PORT, URL + "GetYESMaterialsDrawing", {
        "onetype": onetype,
        "oneval": oneval
    }, page);

    //查看是否为备料审核人('IIS3380', '/AdvanceOrder.aspx?action=selectReviewer', {
    //    "usercode": ""
    //});
});


//左边领料排序
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
    //GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach(), page);
});


////右边领料明细排序
//$(document).on('click', '#datalist2 #form_th > tr > th', function () {
//    $(this).toggleClass('contor');
//    sortfield = $(this).attr('data-val');
//    sort = '';
//    if ($(this).hasClass('contor')) {
//        sort = 'desc';
//    }
//    else {
//        sort = 'asc';
//    }
//    page = 1;
//    var currPage = $('.whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
//    //GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
//});


////领料列表分页(左边)
//$(function () {
//    $("#pagination_P0010").pagination({
//        totalPage: 0,
//        showPageNum: 5,
//        isResetPage: true,
//        isShowPageSizeOpt: false,
//        isShowRefresh: false,
//        callBack: function (currPage, pageSize) {
//            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
//            //onetype = $('#onetype').val();
//            //oneval = $('#oneval').val();
//            //numbertype = $('#numbertype').val();
//            //datetype = $('#datetype').val();
//            //startdate = $('#startdate').val();
//            //enddate = $('#enddate').val();

//            GetDrawingsList(PORT, URL + "GetYESMaterialsDrawing", Getseach(),currPage);
//        }
//    });

   
//});

////领料明细分页(右边)
//$(function () {
//    $("#pagination_P0012").pagination({
//        totalPage: 0,
//        showPageNum: 5,
//        isResetPage: true,
//        isShowPageSizeOpt: false,
//        isShowRefresh: false,
//        callBack: function (currPage, pageSize) {
//            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
//            page = currPage;
//            //GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
//        }
//    });
//});



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
            //GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach(), page);
        }
    }
})

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

$(document).on('click', '#datalist2 > .panel-heading > .binduser', function () {
    if (!$(this).hasClass('disabled')) {
        备料(PORT, URL + "AddYESMaterials", {
            "usercode": "",
            "materials": 物料
        });
    }
});

$(document).on('click', '#datalist2 > .panel-heading > .binduser2', function () {
    if (!$(this).hasClass('disabled')) {
        //$(this).addClass('disabled');
        $("#AddUserModal2 > .modal-dialog").draggable();//为模态对话框添加拖拽
        $("#AddUserModal2").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
        $('#AddUserModal2').modal('show')
    }
});

$(document).on('click', '#datalist2 > .panel-heading > .binduser1', function () {
    if (!$(this).hasClass('disabled')) {
        var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
        window.location.href = "/Page/OrderManage/D0006.html?dcode=" + drawingcode;
    }
});

//获取明细(右边)
$(document).on('click', '#datalist #form_tb > tr', function () {
    $(this).addClass('contor').siblings().removeClass('contor');
    pickingcode = $(this).attr('data-val');
    //GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach());
    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
    $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
    物料 = new Array();
    $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
    selectMaterials(PORT, URL + "selectMaterials", {
        "drawingcode": drawingcode
    });
});

//物料选择
$(document).on('click', '#datalist2 #form_tb > tr > td i.choice', function () {
    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');

        for (var i = 0; i < 物料.length; i++) {

            if (物料[i].mcode == $(this).attr('data-mcode')) {
                物料.splice(i, 1);
            }
        }

        if (物料.length > 0) {
            $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').removeClass('disabled');
        } else {
            $('#form_th > tr > th > i.choice').removeClass('contor');
            $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
        }
    } else {
        $(this).addClass('contor');
        var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
        var data = { "mcode": $(this).attr('data-mcode'), "drawingcode": drawingcode };
        物料.push(data);

       
        $('#form_th > tr > th > i.choice').addClass('contor');
        

        if (物料.length > 0) {
            $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').removeClass('disabled');
        } else {
            $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
        }


    }
});

//选择
$(document).on('click', '#form_th > tr > th > i.choice', function () {
    if ($(this).hasClass('contor')) {
        $(this).removeClass('contor');
        $('#datalist2 #form_tb > tr > td i.choice').removeClass('contor');

        物料 = new Array();

        if (物料.length > 0) {
            $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').removeClass('disabled');
        } else {
            $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
        }
    } else {
        $(this).addClass('contor');
        $('#datalist2 #form_tb > tr > td i.choice').addClass('contor');

        var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();


        var obr = $('#datalist2 #form_tb > tr');

        for (var i = 0; i < obr.length; i++) {
            if ($(obr[i]).find('td i.choice').hasClass('contor')) {
                var mcode = $(obr[i]).find('td i.choice').attr('data-mcode');
                var data = { "mcode": mcode, "drawingcode": drawingcode };
                物料.push(data);
            }
        }
       
        if (物料.length > 0) {
            $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').removeClass('disabled');
        } else {
            $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
            $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
        }
    }
});

//$(document).on('click', '#choose', function () {

//    for(int)

//    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
//    var data = { "mcode": $(this).attr('data-mcode'), "drawingcode": drawingcode };
//    物料.push(data);
//    if (物料.length > 0) {
//        $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
//        $('#datalist2 > .panel-heading > .binduser2').removeClass('disabled');
//    } else {
//        $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
//        $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
//    }

//    $('#datalist2 #form_tb > tr > td i.choice').addClass('contor');

//});



$(document).on('click', '#datalist #form_tb > tr > td > a.Info', function () {

    var drawingcode = $(this).attr("data-drawingcode");

    GetDrawingsInfoList(PORT, URL + "getADDDrawing", drawingcode);

});

$(document).on('click', '#datalist2  #form_tb > tr > td > a.edit', function () {

    var mcode = $(this).attr("data-mcode");
    var materialscode = $(this).attr("data-materialscode");
    var materialsname = $(this).attr("data-materialsname");
    var materialsnumber = $(this).attr("data-materialsnumber");
    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();

    $('#set_code').val(mcode);
    $('#set_mcode').val(materialscode);
    $('#set_materialsname').val(materialsname);
    $('#set_materialsnumber').val(materialsnumber);

    $("#AddUserModal3 > .modal-dialog").draggable();//为模态对话框添加拖拽
    $("#AddUserModal3").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal3').modal('show')
    //editMaterials(PORT, URL + "editMaterials", {
    //    "mmcode": mcode,
    //    "mcode": materialscode,
    //    "materialsname": materialsname,
    //    "materialsnumber": materialsnumber,
    //    "drawingcode": drawingcode,
    //    "usercode": ""
    //});

});

$(document).on('click', '#set_sure1', function () {

    var mcode = $('#set_code').val();
    var materialscode = $('#set_mcode').val();
    var materialsname = $('#set_materialsname').val();
    var materialsnumber = $('#set_materialsnumber').val();
    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();

    editMaterials(PORT, URL + "editMaterials", {
        "mmcode": mcode,
        "mcode": materialscode,
        "materialsname": materialsname,
        "materialsnumber": materialsnumber,
        "drawingcode": drawingcode,
        "usercode": ""
    });

});




$(document).on('click', '#datalist2  #form_tb > tr > td > a.del', function () {

    var mcode = $(this).attr("data-mcode");
    var materialscode = $(this).attr("data-materialscode");
    var materialsname = $(this).attr("data-materialsname");
    var materialsnumber = $(this).attr("data-materialsnumber");

    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
    if (confirm("确定删除这行数据吗？")) {
        deleteMaterials(PORT, URL + "deleteMaterials", {
            "mmcode": mcode,
            "mcode": materialscode,
            "materialsname": materialsname,
            "materialsnumber": materialsnumber,
            "drawingcode": drawingcode,
            "usercode": ""
        });
    }

});

$(document).on('click', '#add_sure1', function () {

    添加物料(PORT, URL + "AddMaterials", {
        "usercode": "",
        "materialsname": $('#materialsname').val(),
        "materialsnumber": $('#materialsnumber').val(),
        "mcode": $('#mcode').val(),
        "drawingcode": drawingcode
    });

});

$(document).on('click', '#cause_sure2', function () {

    不备料(PORT, URL + "AddNOMaterials", {
        "usercode": "",
        "materials": 物料,
        "cause": $('#cause').val()
    });
});

//****************************************************************************Ajax Start****************************************************************************//


/**
*获取
//领料主列表
*/
function GetMainList(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<tr data-val="' + obj.pickingcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.pickinglocation + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.pickingdate + '</td>';
                    //content += '<td ><a  href="/Page/ProjectManage/P0012.html?pickingcode=' + obj.pickingcode + '"">详情</a></td>';
                    content += '</tr>';

                });
                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                //$("#pagination_P0010").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}



/**
*获取领料明细主列表
*/
function GetMainDetailList(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.pickinggmtqty + '</td>';
                    content += '<td>' + obj.pickingdate + '</td>';
                    content += '</tr>';

                });
                $('#datalist2 #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0012").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });
}

/**
*查看备料
*/
function selectMaterials(urltype, pageurl, data) {
    if (page == null) {
        page = 1;
    }
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
                    //'<i data-tbcode="' + obj.mcode + '" class="iconfont choice contor">&#xe639;</i>'
                    content += '<tr>';
                    
                    
                    if (是否为审核人) {
                        if (obj.state == "1") {
                            content += '<td>'
                            content += '    <div class="column11" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '' + '</div>';
                            content += '</td>';
                        } else if (obj.state == "0") {
                            content += '<td>'
                            content += '    <div class="column11" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '' + '</div>';
                            content += '</td>';
                        } else {
                            content += '<td>'
                            content += '<i data-mcode="' + obj.mcode + '" class="iconfont choice">&#xe639;</i>';
                            content += '</td>';
                        }
                    } else {
                        //content += '    <div class="column11" data-mcode="' + obj.mcode + '" data-drawingcode="' + obj.drawingcode + '">' + '' + '</div>';
                        $('#datalist2 #form_th > tr > th.hh').addClass('contor');
                    }

                    
                    

                    
                    content += '<td class="td_bcode" style="display: none;">' + obj.mcode + '</td>';
                    content += '<td>' + obj.materialscode + '</td>';
                    content += '<td>' + obj.materialsname + '</td>';
                    content += '<td>' + obj.materialsnumber + '</td>';
                    content += '    <td>';
                    if (obj.state == "1") {
                        content += '    <div  style="cursor: pointer;" class="column3" title="' + "原因：" + obj.cause + '">' + "不备料" + '</div>';
                    } else if (obj.state == "0") {
                        content += '    <div class="column3">' + "备料" + '</div>';
                    } else {
                        content += '    <div class="column3">' + "待审核" + '</div>';
                    }
                    content += '    </td>';
                    content += '</tr>';

                });


                $('#datalist2 #form_tb').empty().append(content);
                //var pagecount = data.pagecount;
                //var totalnum = data.totalnum;
                //$("#pagination_P0010").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*获取图纸明细主列表
*/
function GetDrawingsList(urltype, pageurl, data, page) {
    if (page == null) {
        page = 1;
    }
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td class="td_bcode" style="display: none;">' + obj.drawingcode + '</td>';
                    content += '<td>' + obj.specifications + '</td>';
                    content += '<td>' + obj.imagenum + '</td>';
                    content += '<td>' + obj.classified + '</td>';
                    content += '<td>' + obj.demandednumber + '</td>';
                    content += '<td>' + obj.notificationdate + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="Info" data-drawingcode="' + obj.drawingcode + '">参考信息</a>';
                    //content += '        <a href="JavaScript:;" class="del"  data-kcode="' + obj.kcode + '">删除</a>';
                    content += '    </td>';
                    content += '</tr>';

                });

                
                
                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');
                $("#pagination_P0011").pagination('setPage', parseFloat(page), parseFloat(pagecount));
                

            } else {
                alert(data.errmsg);
            }
        }
    });
}



/**
*获取图纸明细表身
*/
function GetDrawingsInfoList(urltype, pageurl, data) {
    if (page == null) {
        page = 1;
    }
    showLoading();
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Api/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": data
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.describe + '</td>';
                    content += '<td>' + obj.num + '</td>';
                    content += '<td>' + obj.type + '</td>';
                    content += '</tr>';

                });
                $('#form_tb22').empty().append(content);
                $("#AddUserModal1 > .modal-dialog").draggable();//为模态对话框添加拖拽
                $("#AddUserModal1").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
                $('#AddUserModal1').modal('show');

            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*删除物料
*/
function deleteMaterials(urltype, pageurl, data) {
    if (page == null) {
        page = 1;
    }
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

                var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
                selectMaterials(PORT, URL + "selectMaterials", {
                    "drawingcode": drawingcode
                });

            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*修改物料
*/
function editMaterials(urltype, pageurl, data) {
    if (page == null) {
        page = 1;
    }
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
                $('#AddUserModal3').modal('hide');
                var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
                selectMaterials(PORT, URL + "selectMaterials", {
                    "drawingcode": drawingcode
                });

            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*添加物料
*/
function 添加物料(urltype, pageurl, data) {
    if (page == null) {
        page = 1;
    }
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
                $('#AddUserModal').modal('hide');
                var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
                selectMaterials(PORT, URL + "selectMaterials", {
                    "drawingcode": drawingcode
                });

            } else {
                alert(data.errmsg);
            }
        }
    });
}

/**
*不添加物料
*/
function 不添加物料(urltype, pageurl, data) {
    if (page == null) {
        page = 1;
    }
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
                $('#AddUserModal').modal('hide');
                var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
                selectMaterials(PORT, URL + "selectMaterials", {
                    "drawingcode": drawingcode
                });

            } else {
                alert(data.errmsg);
            }
        }
    });
}



//****************************************************************************Ajax End****************************************************************************//



//****************************************************************************Common Start****************************************************************************//

function Getseach() {
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
  
    var data = {
        "onetype": onetype,
        "oneval": oneval
    };
    return data;
}



/*
 备料
*/
function 备料(urltype, pageurl, data) {
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
                物料 = new Array();
                $('#shenpi > .materialinfo > .column4 > .right .values').removeClass('contor');
                $('#shenpi > .materialinfo > .column4 > .left .values').removeClass('contor');
                var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
                selectMaterials(PORT, URL + "selectMaterials", {
                    "drawingcode": drawingcode
                });
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}

/*
 不备料
*/
function 不备料(urltype, pageurl, data) {
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
            $('#AddUserModal2').modal('hide');
            if (data.errcode == 0) {
                物料 = new Array();
                $('#shenpi > .materialinfo > .column4 > .right .values').removeClass('contor');
                $('#shenpi > .materialinfo > .column4 > .left .values').removeClass('contor');
                var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();
                selectMaterials(PORT, URL + "selectMaterials", {
                    "drawingcode": drawingcode
                });
            }
            else {
                alert(data.errmsg);
            }
        }
    });
}


/*
查看是否为备料审核人
*/
function 查看是否为备料审核人(urltype, pageurl, data, func) {
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
                是否为审核人 = true;



            } else if (data.errcode == 2) {
                $('#datalist2 > .panel-heading > .binduser2.disabled').css('display', 'none');
                $('#datalist2 > .panel-heading > .binduser.disabled').css('display', 'none');

                $('#datalist2 #form_th > tr > th.hh').addClass('contor');

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
//****************************************************************************Common End****************************************************************************//





