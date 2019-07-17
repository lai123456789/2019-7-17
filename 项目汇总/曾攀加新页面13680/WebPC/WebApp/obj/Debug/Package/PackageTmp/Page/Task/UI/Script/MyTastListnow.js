var PORT = "IIS3676"
    , URL = "AbnormalMessage.aspx?action="
    , page = 1
    , errosrycode = ''='';
$(function () {
    $("#form_table").colResizable();
    $("#form_table2").colResizable();
    GetList(PORT, URL + "getDealAbnormalMoudel", {
        "page": page,
        "usercode": ""
    });
})


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});


$(document).on('click', '#form_tb tr', function () {
    $('#form_tb tr').css("background", "#fff");
    $(this).css("background", "rgb(218, 250, 223)");
    errosrycode = $(this).attr('data-val');
    page = 1;
    GetAssemblyDetails(PORT, URL + "getAbnormalMoudelDetails", {
        "page": page,
        "errosrycode": errosrycode
    });
});






/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
});


/************************************* Ajax *******************************************/

/*
获取用户列表
*/
function GetList(urltype, pageurl, data) {
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
                    content += '<tr data-val="' + obj.errosrycode + '">';
                    content += '    <td>' + getKG() + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '    <td>' + getKG() + obj.errormodule + '</td>';
                    content += '    <td>' + getKG() + obj.dealwith + '</td>';
                    content += '</tr>';
                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_AssemblyGroup").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



function GetAssemblyDetails(urltype, pageurl, data) {
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
                    var objdata = {
                        "errordetailcode": obj.errordetailcode,
                        "taskcode": obj.taskcode
                    };

                    content += '<tr data-val="' + obj.errordetailcode + '">';
                    content += '    <td>' + getKG() + parseFloat(parseInt(idx + 1) + parseFloat(parseFloat(parseFloat(page) - 1) * 20)) + '</td>';
                    content += '    <td>' + getKG() + obj.pj + '</td>';
                    content += '    <td>' + getKG() + obj.type + '</td>';
                    content += '    <td>' + getKG() + obj.remark + '</td>';
                    content += '    <td>' + getKG() + obj.createdate + '</td>';
                    content += '<td >';
                    content += '<a class="JumpPage btn3"   data-val="' + obj.errordetailcode + '">查看</a>';
                    if (obj.isaccept == 0) {
                        content += '<a class="JumpPage btn1"  data-val="' + obj.errordetailcode + '">接受</a>';
                    }
                    content += "<a class='JumpPage btn2'  data-val='" + JSON.stringify(objdata) + "'>派工</a>";
                    content += '</td>';
                    content += '</tr>';
                });
                $('#form_tb2').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_AlyGroupDetail").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}











$(function () {
    $("#pagination_AssemblyGroup").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            GetList(PORT, URL + "getDealAbnormalMoudel", {
                "page": page,
                "usercode": ""
            });
        }
    });
});



function getKG() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;';
}

/************************************* Ajax End *******************************************/