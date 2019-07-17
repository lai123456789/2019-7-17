
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '',
    sortfield = '', sort = '', excel = '', linecode = '', IsF = true, linecodeUpdate='';
var PORT = "IIS3676";
var URL = "ProductionPlan/MyProductionPlan.aspx?action=";
$(function () {
    GetMainList(PORT, URL + "getMachineProductionLine", Getseach());
});

/*
导出Excel(左边)
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    excel = 'excel';
    var fileName = $('#datalist .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "getMachineProductionLine");
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

//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    $('#datalist2 #form_tb').empty();
    GetMainList(PORT, URL + "getMachineProductionLine", Getseach());
});


//左边生产线排序
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
    GetMainList(PORT, URL + "getMachineProductionLine", Getseach(), page);
});


//右边排序
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
    GetMainDetailList(PORT, URL + "getMachineProductionLineDetail", Getseach(), page);
});





//生产线列表
$(function () {
    $("#pagination_P0017Line").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            $('#datalist2 #form_tb').empty();
            GetMainList(PORT, URL + "getMachineProductionLine", Getseach());
        }
    });
});

//生产线设备
$(function () {
    $("#pagination_P0017mcdef").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            GetMainDetailList(PORT, URL + "getMachineProductionLineDetail", Getseach());
        }
    });
});



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
            GetMainList(PORT, URL + "getMachineProductionLine", Getseach(), page);
        }
    }
});



//获取明细(右边)
$(document).on('click', '#datalist #form_tb > tr', function () {
    $('#datalist #form_tb tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    linecode = $(this).attr('data-val');
    $('#BingBtn').css('background-color', '#428bca;');
    clear();
    GetMainDetailList(PORT, URL + "getMachineProductionLineDetail", Getseach());
});




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

//=====生产线新增======//
$(document).on('click', '#addline', function () {
    $("#AddProductionLineModal").draggable();//为模态对话框添加拖拽
    $("#AddProductionLineModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddProductionLineModal').modal('show');
    IsF = true;
});

//=====生产线更新======//
$(document).on('click', '.UpdateLine', function () {
    $("#AddProductionLineModal").draggable();//为模态对话框添加拖拽
    $("#AddProductionLineModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddProductionLineModal').modal('show');
    linecodeUpdate = $(this).attr('data-val');
    IsF = false;
});

$(document).on('click', '#add_ProductionLinesure', function () {
    var linename = $('#add_linename').val();
    var Remarks = $('#add_Remarks').val();
    if (!linename && linename.length==0) {
        alert("请输入生产名称");
         return;
    }
    if (IsF) {
        Addandupdate(PORT, URL + "addMachineProductionLine", {
            "linename": linename,
            "usercode": "",
            "remarks": Remarks
        });
    } else {

        Addandupdate(PORT, URL + "updateMachineProductionLine", {
            "linename": linename,
            "usercode": "",
            "remarks": Remarks,
            "linecode": linecodeUpdate
        });
    }
  
});


//绑定
$(document).on('click', '#BingBtn', function () {
    $("#AddProductionLineModal").draggable();//为模态对话框添加拖拽
    $("#AddProductionLineModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddProductionLineModal').modal('show');
    linecodeUpdate = $(this).attr('data-val');
    IsF = false;
});


//****************************************************************************Ajax Start****************************************************************************//


/**
*获取
//领料主列表生产线
*/
function GetMainList(urltype, pageurl, data) {
   
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
                    content += '<tr data-val="' + obj.linecode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '<td>' + obj.生产线名称 + '</td>';
                    content += '<td>' + obj.备注 + '</td>';
                    content += '<td>' + obj.创建人 + '</td>';
                    content += '<td>' + obj.创建时间.replace(/T/g, " ") + '</td>';
                    content += '<td>' + obj.修改时间.replace(/T/g, " ") + '</td>';
                    content += '<td>' + obj.修改人 + '</td>';
                    content += '<td >';
                    content += '<a  href="#"  class="UpdateLine"   data-val="' + obj.linecode + '" style="margin-right: 5px;">修改</a>';
                    content += '<a  href="#"  class="DelLine"      data-val="' + obj.linecode + '">删除</a>';
                    content += '</td >';
                    content += '</tr>';
                });
                $('#datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0017Line").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}



/**
*获取生产线设备
*/
function GetMainDetailList(urltype, pageurl, data) {
   
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
                    content += '<td>' + obj.机台号 + '</td>';
                    content += '<td>' + obj.创建人 + '</td>';
                    content += '<td>' + obj.工序代号 + '</td>';
                    content += '<td>' + obj.工序名称 + '</td>';
                    content += '<td>' + obj.创建时间 + '</td>';
                    content += '<td >';
                    content += '<a  href="#">删除</a>';
                    content += '</td>';
                    content += '</tr>';

                });
                $('#datalist2 #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0017mcdef").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}

function Addandupdate(urltype, pageurl, data) {

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
            $('#AddProductionLineModal').modal('hide');
           
      
        },
        success: function (data) {
            hideLoading();
            $('#AddProductionLineModal').modal('hide');
            if (data.errcode == 0) {
                alert(data.errmsg);
                GetMainList(PORT, URL + "getMachineProductionLine", Getseach());

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
    datetype = $('#datetype').val();
    startdate = $('#startdate').val();
    enddate = $('#enddate').val();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": page,
        "sortfield": sortfield,
        "sort": sort,
        "excel": excel,
        "linecode": linecode
      
    };
    return data;
}

function clear() {
    onetype = '', oneval = '', datetype = '', startdate = '', enddate = '', page = 1, excel = '', sortfield='',sort='';
  
}

//****************************************************************************Common End****************************************************************************//





