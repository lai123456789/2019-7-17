
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '', sortfield = '', sort = '', pickingcode = '';
var PORT = "IIS3380";
var URL = "AdvanceOrder.aspx?action=";
$(function () {
    $("#pagination_P0010").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            numbertype = $('#numbertype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            page = currPage;
            GetDrawingsList(PORT, URL + "getDrawing", {
                "onetype": onetype,
                "oneval": oneval,
                "page": page
            },page);
        }
    });

    $("#pagination_P0011").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            numbertype = $('#numbertype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            page = currPage;
            GetDrawingsList1(PORT, URL + "GetUntreatedDrawing", {
                "onetype": onetype,
                "oneval": oneval,
                "page": page
            },page);
           
        }
    });

    $("#pagination_P0012").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            numbertype = $('#numbertype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            page = currPage;
            GetDrawingsList2(PORT, URL + "GetYESMaterialsDrawing", {
                "onetype": onetype,
                "oneval": oneval,
                "page": page
            },page);
        }
    });

    $("#pagination_P0013").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            numbertype = $('#numbertype').val();
            datetype = $('#datetype').val();
            startdate = $('#startdate').val();
            enddate = $('#enddate').val();
            page = currPage;
            GetDrawingsList3(PORT, URL + "GetNOMaterialsDrawing", {
                "onetype": onetype,
                "oneval": oneval,
                "page": page
            },page);
        }
    });
});

//物料名称不为空调用
function codeStatic(input) {
    if ($("#mcode").val().length != 0) {
        $('#getname').addClass('contor');
    }
    else {
        $('#getname').removeClass('contor');
    }
}

//物料名称不为空调用
function nameStatic(input) {
    if ($("#materialsname").val().length != 0) {
        $('#getcode').addClass('contor');
    }
    else {
        $('#getcode').removeClass('contor');
    }
}



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


$(document).on('click', '#top_main > .infolist', function () {
    $(this).addClass('contor').siblings().removeClass('contor');

    if ($('#top_main > .infolist.contor').text() == "全部") {
       
       
        
        if ($('#form_tb3 > tr').length > 0) {
            $('#panel_table').addClass('contor');
            $('#panel_table1').removeClass('contor');
            $('#panel_table2').removeClass('contor');
            $('#panel_table3').removeClass('contor');
        } else {
            GetDrawingsList(PORT, URL + "getDrawing", Getseach());
        }
    } else if ($('#top_main > .infolist.contor').text() == "未处理") {
        
        
        if ($('#form_tb3 > tr').length > 0) {

            $('#panel_table').removeClass('contor');
            $('#panel_table1').addClass('contor');
            $('#panel_table2').removeClass('contor');
            $('#panel_table3').removeClass('contor');
        } else {
            GetDrawingsList1(PORT, URL + "GetUntreatedDrawing", Getseach());
        }
    } else if ($('#top_main > .infolist.contor').text() == "备料") {
        
        
        if ($('#form_tb3 > tr').length > 0) {
            $('#panel_table').removeClass('contor');
            $('#panel_table1').removeClass('contor');
            $('#panel_table2').addClass('contor');
            $('#panel_table3').removeClass('contor');

        } else {
            GetDrawingsList2(PORT, URL + "GetYESMaterialsDrawing", Getseach());
        }
    } else if ($('#top_main > .infolist.contor').text() == "不备料") {

        if ($('#form_tb3 > tr').length > 0) {

            $('#panel_table').removeClass('contor');
            $('#panel_table1').removeClass('contor');
            $('#panel_table2').removeClass('contor');
            $('#panel_table3').addClass('contor');
        } else {
            GetDrawingsList3(PORT, URL + "GetNOMaterialsDrawing", Getseach());
        }
 
    }

});


//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    

    //GetDrawingsList(PORT, URL + "getDrawing", Getseach());

    if ($('#top_main > .infolist.contor').text() == "全部") {

        //$('#datalist #form_tb').empty();

        GetDrawingsList(PORT, URL + "getDrawing", Getseach());

    } else if ($('#top_main > .infolist.contor').text() == "未处理") {
        //$('#datalist #form_tb1').empty();
        GetDrawingsList1(PORT, URL + "GetUntreatedDrawing", Getseach());
        
    } else if ($('#top_main > .infolist.contor').text() == "备料") {
        //$('#datalist #form_tb2').empty();
        GetDrawingsList2(PORT, URL + "GetYESMaterialsDrawing", Getseach());
        
    } else if ($('#top_main > .infolist.contor').text() == "不备料") {
        //$('#datalist #form_tb3').empty();
        
        GetDrawingsList3(PORT, URL + "GetNOMaterialsDrawing", Getseach());
    

   }
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


//右边领料明细排序
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
    //GetMainDetailList(PORT, URL + "getpickingDocumentDetailPCList", Getseach(), page);
});



$(document).on('click', '#getname', function () {
    var mcode = $('#mcode').val();
    
    GetMaterialName(PORT, URL + "GetMaterialName", {
        "mcode":mcode
        
    });
});

$(document).on('click', '#getcode', function () {
    var materialsname = $('#materialsname').val();
    GetMaterialCode(PORT, URL + "GetMaterialCode", {
        "materialsname": materialsname
    });
});


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
//            page = currPage;
//            $('#datalist2 #form_tb').empty();
//            //GetMainList(PORT, URL + "getpickingDocumentPCList", Getseach(), page);
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
        //$(this).addClass('disabled');
        $("#AddUserModal > .modal-dialog").draggable();//为模态对话框添加拖拽
        $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
        $('#AddUserModal').modal('show')
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
    $('#datalist2 > .panel-heading > .binduser').removeClass('disabled');
    $('#datalist2 > .panel-heading > .binduser1').removeClass('disabled');
    $('#datalist2 > .panel-heading > .binduser2').removeClass('disabled');
    selectMaterials(PORT, URL + "selectMaterials", {
        "drawingcode": drawingcode
    });
});


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

    //var drawingcode = $(this).attr("data-drawingcode");
    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();

    添加物料(PORT, URL + "AddMaterials", {
        "usercode": "",
        "materialsname": $('#materialsname').val(),
        "materialsnumber": $('#materialsnumber').val(),
        "mcode": $('#mcode').val(),
        "drawingcode": drawingcode
    });

});

$(document).on('click', '#cause_sure2', function () {

    //var drawingcode = $(this).attr("data-drawingcode");
    var drawingcode = $('#datalist #form_tb > tr.contor > td.td_bcode').text().trim();

    不添加物料(PORT, URL + "NOAddMaterials", {
        "usercode": "",
        "materialsname": $('#cause').val(),
        "materialsnumber": "0",
        "mcode": "0",
        "drawingcode": drawingcode
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
                $("#pagination_P0010").pagination('setPage', parseFloat(page), parseFloat(pagecount));

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
                    content += '<tr>';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td class="td_bcode" style="display: none;">' + obj.mcode + '</td>';
                    content += '<td>' + obj.materialscode + '</td>';
                    content += '<td>' + obj.materialsname + '</td>';
                    content += '<td>' + obj.materialsnumber + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;" class="edit" data-mcode="' + obj.mcode + '" data-materialscode="' + obj.materialscode + '" data-materialsname="' + obj.materialsname + '" data-materialsnumber="' + obj.materialsnumber + '">编辑</a>';
                    content += '        <a href="JavaScript:;" class="del" data-mcode="' + obj.mcode + '" data-materialscode="' + obj.materialscode + '" data-materialsname="' + obj.materialsname + '" data-materialsnumber="' + obj.materialsnumber + '">删除</a>';
                    content += '    </td>';
                    content += '</tr>';

                });



                $('#datalist2 #form_tb').empty().append(content);
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
*获取图纸明细主列表（全部）
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

                $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser1').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');

                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0010").pagination('setPage', parseFloat(page), parseFloat(pagecount));
                $('#panel_table').addClass('contor');
                $('#panel_table1').removeClass('contor');
                $('#panel_table2').removeClass('contor');
                $('#panel_table3').removeClass('contor');
            } else {
                alert(data.errmsg);
            }
        }
    });
}

/**
*获取图纸明细主列表（未处理）
*/
function GetDrawingsList1(urltype, pageurl, data, page) {
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

                $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser1').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');

                $('#datalist #form_tb1').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0011").pagination('setPage', parseFloat(page), parseFloat(pagecount));

                $('#panel_table').removeClass('contor');
                $('#panel_table1').addClass('contor');
                $('#panel_table2').removeClass('contor');
                $('#panel_table3').removeClass('contor');
            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*获取图纸明细主列表（备料）
*/
function GetDrawingsList2(urltype, pageurl, data, page) {
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

                $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser1').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');

                $('#datalist #form_tb2').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0012").pagination('setPage', parseFloat(page), parseFloat(pagecount));
                $('#panel_table').removeClass('contor');
                $('#panel_table1').removeClass('contor');
                $('#panel_table2').addClass('contor');
                $('#panel_table3').removeClass('contor');
            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*获取图纸明细主列表（不备料）
*/
function GetDrawingsList3(urltype, pageurl, data, page) {
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

                $('#datalist2 > .panel-heading > .binduser').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser1').addClass('disabled');
                $('#datalist2 > .panel-heading > .binduser2').addClass('disabled');

                $('#datalist #form_tb3').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0013").pagination('setPage', parseFloat(page), parseFloat(pagecount));
                $('#panel_table').removeClass('contor');
                $('#panel_table1').removeClass('contor');
                $('#panel_table2').removeClass('contor');
                $('#panel_table3').addClass('contor');
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


/**
*根据物料代码查物料代码
*/
function GetMaterialCode(urltype, pageurl, data) {
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
                $.each(data.data, function (idx, obj) {
                    $('#mcode').empty();

                    $('#mcode').val(obj.materialcode);
                });

                if ($("#mcode").val().length != 0) {
                    $('#getname').addClass('contor');
                }
                else {
                    $('#getname').removeClass('contor');
                }
                if ($("#materialsname").val().length != 0) {
                    $('#getcode').addClass('contor');
                }
                else {
                    $('#getcode').removeClass('contor');
                }

            } else {
                alert(data.errmsg);
            }
        }
    });
}


/**
*根据物料代码查物料名称
*/
function GetMaterialName(urltype, pageurl, data) {

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
                $.each(data.data, function (idx, obj) {
                    $('#materialsname').empty();
                    $('#materialsname').val(obj.materialname);
                });
                if ($("#mcode").val().length != 0) {
                    $('#getname').addClass('contor');
                }
                else {
                    $('#getname').removeClass('contor');
                }
                if ($("#materialsname").val().length != 0) {
                    $('#getcode').addClass('contor');
                }
                else {
                    $('#getcode').removeClass('contor');
                }

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
        "oneval": oneval,
        "page": page
      

    };
    return data;
}
//****************************************************************************Common End****************************************************************************//





