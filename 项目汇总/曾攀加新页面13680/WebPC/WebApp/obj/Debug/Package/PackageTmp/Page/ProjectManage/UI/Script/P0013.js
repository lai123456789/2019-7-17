
var page = 1, onetype = '', oneval = '', datetype = '', startdate = '', enddate = '',
    sortfield = '', sort = '', numbertype = '', numbership = '', numberval = '', whcode = '', spage = 1, ppage = 1,spj="",ppj="";
var PORT = "IIS3676";
var modelId = '#div1';
var modelId2 = '#div2';
var URL = "Warehouse/UnmannedWarehouse.aspx?action=";
$(function () {
    //获取物料列表
    Div1GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId));
});


//=======================================================================================================================================================//
//=======================================================================================================================================================//
//============================================================================物料Start==================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//


/*
导出Excel
*/
$(document).on('click', modelId + ' #query_title .download', function () {
    showLoading();
    page = 1;
    var fileName = $(modelId + ' #datalist .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "excelAssemblySummaryMaterial");
    $('#data').val(JSON.stringify(Getseach(modelId)));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});

//查询按钮
$(document).on('click', modelId + ' #query_title > .query_content .query_btn', function () {
    page = 1;
    whcode = '';
    $(modelId + '>#datalist2 #form_tb').empty();
    Div1GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId));
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', modelId + ' #query_title > .query_content .fullscreen', function () {
    document.getElementById("main").webkitRequestFullscreen();
});

//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($(modelId + ' .query_content input').is(':focus')) {
            page = 1;
            Div1GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId));
        }
    }
});


//物料区块
$(document).on('click', '#materials', function () {
    $(modelId2).hide();
    $(modelId).show();
    $(modelId + '>#datalist2 #form_tb').empty();
    clear();
    Div1GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId));
});

////跳转到仓库
//$(document).on('click', '.JumpPage', function () {
//    clear();
//    whcode = $(this).attr('data-val');
//    console.log(whcode);
//    $(modelId).hide();
//    $(modelId2).show();
//    $('#nav-tab #warehouse').addClass('active');
//    $('#nav-tab #jump2').addClass('active');
//    $('#nav-tab #materials').removeClass('active');
//    $('#nav-tab #jump').removeClass('active');
//    GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId2));
//});

//仓库物料排序
$(document).on('click', modelId + ' #datalist #form_th > tr > th', function () {
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
    var currPage = $(modelId + ' .whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    $(modelId + '>#datalist2 #form_tb').empty();
    whcode = '';
    Div1GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId));
});

//仓库排序
$(document).on('click', modelId + ' #datalist2 #form_th > tr > th', function () {
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
    var currPage = $(modelId + ' .whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    if (!whcode && whcode.length == 0) {
        return;
    }
    Div1GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId));
});



//类型一
$(document).on('change', modelId + ' #onetype', function () {
    whcode = '';
    if ($(this).val() == '全部') {
        $(modelId + ' #oneval').empty().hide();
        return;
    }
    $(modelId + ' #oneval').show().attr('placeholder', '请输入' + $(this).val());
});
//时间类型
//$(document).on('change', modelId + ' #datetype', function () {
//    whcode = '';
//    if ($(this).val() == '全部') {
//        $(modelId + ' #datetype_date').hide();
//        return;
//    }
//    $(modelId + ' #datetype_date').show();
//});

//数量
$(document).on('change', modelId + ' #numbertype', function () {
    whcode = '';
    if ($(this).val() == '全部') {
        $(modelId + ' #numberval').hide();
        return;
    }
    $(modelId + ' #numberval').show();
    $(modelId + ' #numqty').attr('placeholder', '请输入' + $(this).val() + $(modelId + ' #numselect option:selected').text() + "数量");
});

$(document).on('change', modelId + ' #numberval #numselect', function () {
    whcode = '';
    $(modelId + ' #numqty').attr('placeholder', '请输入' + $(modelId + ' #numbertype option:selected').val() + $(modelId + ' #numselect option:selected').text() + "数量");

});



//右边仓库列表
$(document).on('click', modelId + '> #datalist #form_tb > tr', function () {
    clear();
    whcode = $(this).attr('data-val');
    $(modelId + '> #datalist #form_tb > tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    Div1GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId));

});


//物料分页(左边)
$(function () {
    $(modelId + " #pagination_Div1materialP0013").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            whcode = '';
            Div1GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId), page);
            $(modelId + '>#datalist2 #form_tb').empty();
        }
    });
});

//仓库分页(右边)
$(function () {
    $(modelId + " #pagination_Div1warehouseP0013").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            Div1GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId), page);
        }
    });
});


//查看入库单
$(document).on('click','.storage',function(){
    spj = $(this).attr("data-pj");
    $("#StorageModal").draggable();//为模态对话框添加拖拽
    $("#StorageModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#StorageModal').modal('show');
    spage = ppage = 1;
    GetStorage(PORT, URL + "getstoragePCListAll", { "pj": spj, "page": spage });
});


//查看领料单
$(document).on('click','.picking',function(){
    ppj = $(this).attr("data-pj");
    $("#PickingModal").draggable();//为模态对话框添加拖拽
    $("#PickingModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#PickingModal').modal('show');
    spage =ppage = 1;
    GetPicking(PORT, URL + "getpickingPCListAll", { "pj": ppj, "page": ppage });
});
//入库单分页
(function () {
    $('#pagination_storage_page').pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            spage = currPage;
            GetStorage(PORT, URL + "getstoragePCListAll", { "pj": spj,"page":spage });
        }
    });
});

//领料单分页
$(function () {
    $("#pagination_Picking").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            ppage = currPage;
            GetPicking(PORT, URL + "getpickingPCListAll", { "pj": ppj, "page": ppage });

        }
    });
});

/**
*获取入库单据
*/
function GetStorage(urltype, pageurl, data) {
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
                    content += '<tr data-val="' + obj.whcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(spage) - 1) * 12)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.storagelocation + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.storagedate + '</td>';
                    content += '<td>' + obj.materialcode + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.storagmtqty + '</td>';
                    content += '</tr>';

                });
                $('#form_tb_Storage').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_storage_page").pagination('setPage', parseFloat(spage), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}



/**
*获取领料库单据
*/
function GetPicking(urltype, pageurl, data) {

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
                    content += '<tr data-val="' + obj.whcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(ppage) - 1) * 12)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.pickinglocation + '</td>';
                    content += '<td>' + obj.username + '</td>';
                    content += '<td>' + obj.pickingdate + '</td>';
                    content += '<td>' + obj.materialcode + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.pickinggmtqty + '</td>';
                    content += '</tr>';

                });
                $('#form_tb_Picking').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_Picking").pagination('setPage', parseFloat(ppage), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}




/**
*获取物料主列表(左边)
*/
function Div1GetmaterialsList(urltype, pageurl, data, page) {
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
                    content += '<tr data-val="' + obj.whcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 18)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialcode + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.materialqty + '</td>';
                    content += '<td>';
                    content += '<a class="storage" data-pj="' + obj.pj + '" style="margin-right: 5px;">入库单</a>';
                    content += '<a class="picking" data-pj="' + obj.pj + '">领料单</a>';
                    content += '</td>';
                    content += '</tr>';

                });
                $(modelId + '> #datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_Div1materialP0013").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}




/**
*获取仓库主列表(右边)
*/
function Div1GetwarehouseList(urltype, pageurl, data, page) {
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
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 18)) + '</td>';
                    content += '<td>' + obj.whlocation + '</td>';
                    content += '<td>' + obj.laststoragedate + '</td>';
                    content += '<td>' + obj.lastpickingdate + '</td>';
                    content += '<td>' + obj.materialallqty + '</td>';
                    content += '</tr>';
                });
                $(modelId + '>#datalist2 #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_Div1warehouseP0013").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}



//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================物料End=========================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//







//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================仓库start=======================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//


//仓库区块
$(document).on('click', '#warehouse', function () {
    $(modelId).hide();
    $(modelId2).show();
    clear();
    $(modelId2 + '> #datalist #form_tb').empty();
    Div2GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId2));

});

/*
导出Excel
*/
$(document).on('click', modelId2 + ' #query_title .download', function () {
    showLoading();
    page = 1;
    var fileName = $(modelId2 + ' #datalist2 .panel-title').text();
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "excelAssemblySummaryWarehouse");
    $('#data').val(JSON.stringify(Getseach(modelId2)));
    $('#filename').val(fileName);
    $('#export_excel').submit();
    hideLoading();
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#main .fullscreen', function () {
    document.getElementById("main").webkitRequestFullscreen();
});

//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($(modelId2 + ' .query_content input').is(':focus')) {
            page = 1;
            GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId2));
        }
    }
})
//跳转到物料
//$(document).on('click', '.JumpPage2', function () {
//    clear();
//    whcode = $(this).attr('data-val');
//    console.log(whcode);
//    $(modelId).show();
//    $(modelId2).hide();
//    $('#nav-tab #materials').addClass('active');
//    $('#nav-tab #jump').addClass('active');
//    $('#nav-tab #warehouse').removeClass('active');
//    $('#nav-tab #jump2').removeClass('active');
//    GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId));



//});

//右边物料列表
$(document).on('click', modelId2 + '> #datalist2 #form_tb > tr', function () {
    clear();
    whcode = $(this).attr('data-val');
    $(modelId2 + '> #datalist2 #form_tb > tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    Div2GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId2));
});


//查询按钮
$(document).on('click', modelId2 + ' #query_title > .query_content .query_btn', function () {
    page = 1;
    whcode = '';
    $(modelId2 + '> #datalist #form_tb').empty();
    Div2GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId2));
});

//仓库物料排序(右边)
$(document).on('click', modelId2 + ' #datalist #form_th > tr > th', function () {
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
    var currPage = $(modelId2 + ' .whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    if (!whcode && whcode.length == 0) {
        return;
    }
    Div2GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId2));
});

//仓库排序(左边)
$(document).on('click', modelId2 + ' #datalist2 #form_th > tr > th', function () {
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
    $(modelId + '>#datalist #form_tb').empty();
    whcode = '';
    var currPage = $(modelId + ' .whj_jqueryPaginationCss-1 .whj_checked').attr('data-page');
    Div2GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId2));
});

//类型一
$(document).on('change', modelId2 + ' #onetype', function () {
    whcode = '';
    if ($(this).val() == '全部') {
        $(modelId2 + ' #oneval').empty().hide();
        return;
    }
    $(modelId2 + ' #oneval').show().attr('placeholder', '请输入' + $(this).val());
});
//时间类型
$(document).on('change', modelId2 + ' #datetype', function () {
    whcode = '';
    if ($(this).val() == '全部') {
        $(modelId2 + ' #datetype_date').hide();
        return;
    }
    $(modelId2 + ' #datetype_date').show();
});

//数量
$(document).on('change', modelId2 + ' #numbertype', function () {
    whcode = '';
    if ($(this).val() == '全部') {
        $(modelId2 + ' #numberval').hide();
        return;
    }
    $(modelId2 + ' #numberval').show();
    $(modelId2 + ' #numqty').attr('placeholder', '请输入' + $(this).val() + $(modelId2 + ' #numselect option:selected').text() + "数量");
});

$(document).on('change', modelId2 + ' #numberval #numselect', function () {
    whcode = '';
    $(modelId2 + ' #numqty').attr('placeholder', '请输入' + $(modelId2 + ' #numbertype option:selected').val() + $(modelId2 + ' #numselect option:selected').text() + "数量");

});


//物料分页(右边)
$(function () {
    $(modelId2 + " #pagination_Div1materialP0013").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            onetype = oneval = datetype = startdate = enddate = sortfield = sort = numbertype = numbership = numberval = '';
            Div2GetmaterialsList(PORT, URL + "getWarehouseDetailPCList", Getseach(modelId2), page);
        }
    });
});

//仓库分页(右边)
$(function () {
    $(modelId2 + " #pagination_Div1warehouseP0013").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            whcode = '';
            $(modelId2 + '> #datalist #form_tb').empty();
            Div2GetwarehouseList(PORT, URL + "getWarehousePCList", Getseach(modelId), page);

        }
    });
});

/**
*获取物料主列表(右边)
*/
function Div2GetmaterialsList(urltype, pageurl, data, page) {
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
                    content += '<tr data-val="' + obj.whcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 18)) + '</td>';
                    content += '<td>' + obj.pj + '</td>';
                    content += '<td>' + obj.materialname + '</td>';
                    content += '<td>' + obj.materialcode + '</td>';
                    content += '<td>' + obj.materialsgqty + '</td>';
                    content += '<td>' + obj.materialqty + '</td>';
                    content += '<td>';
                    content += '<a class="storage" data-pj="' + obj.pj + '" style="margin-right: 5px;">入库单</a>';
                    content += '<a class="picking" data-pj="' + obj.pj + '">领料单</a>';
                    content += '</td>';
                    content += '</tr>';

                });
                $(modelId2 + '> #datalist #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $(modelId2 + " #pagination_Div1materialP0013").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}




/**
*获取仓库主列表(左边)
*/
function Div2GetwarehouseList(urltype, pageurl, data, page) {
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
                    content += '<tr data-val="' + obj.whcode + '">';
                    content += '<td>' + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 18)) + '</td>';
                    content += '<td>' + obj.whlocation + '</td>';
                    content += '<td>' + obj.laststoragedate + '</td>';
                    content += '<td>' + obj.lastpickingdate + '</td>';
                    content += '<td>' + obj.materialallqty + '</td>';
                    
                    content += '</tr>';
                });
                $(modelId2 + '>#datalist2 #form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $(modelId2 + " #pagination_Div1warehouseP0013").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });


}







//=======================================================================================================================================================//
//=======================================================================================================================================================//
//=======================================================================仓库end=========================================================================//
//=======================================================================================================================================================//
//=======================================================================================================================================================//



//****************************************************************************Common Start****************************************************************************//

//获取参数
function Getseach(id) {
    onetype = $(id + ' #onetype').val();
    oneval = $(id + ' #oneval').val();
    datetype = $(id + ' #datetype').val();
    numbertype = $(id + ' #numbertype').val();
    numbership = $(id + ' #numselect').val();
    numberval = $(id + ' #numqty').val();
    startdate = $(id + ' #startdate').val();
    enddate = $(id + ' #enddate').val();
    var data = {
        "onetype": onetype,
        "oneval": oneval,
        "datetype": datetype,
        "startdate": startdate,
        "enddate": enddate,
        "page": page,
        "sortfield": sortfield,
        "sort": sort,
        "numbertype": numbertype,
        "numbership": numbership,
        "numberval": numberval,
        "whcode": whcode
    };
    return data;
}


//重置参数
function clear() {
    page = 1;
    onetype = oneval = datetype = startdate = enddate = sortfield = sort = numbertype = numbership = numberval = whcode = '';
}

//****************************************************************************Common End****************************************************************************//





