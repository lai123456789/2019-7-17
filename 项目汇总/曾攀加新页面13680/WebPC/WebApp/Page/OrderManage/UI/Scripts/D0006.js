
var PORT = "IIS3380";
var URL = "AdvanceOrder.aspx?action=";
var onetype = '';
var oneval = '';
var page = 1;
var pj = '';

$(function () {

    pj = getQueryString("dcode");

    $("#pagination_P0010").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            onetype = $('#onetype').val();
            oneval = $('#oneval').val();
            GetLog(PORT, URL + "selectMaterialsLog", {
                "drawingcode": pj,
                "onetype": onetype,
                "oneval": oneval,
                "page": page
            }, currPage);
        }
    });

})

//查询按钮
$(document).on('click', '#query_title > .query_content .query_btn', function () {
    page = 1;
    $('#form_tb').empty();
    onetype = $('#onetype').val();
    oneval = $('#oneval').val();
    GetLog(PORT, URL + "selectMaterialsLog", {
        "drawingcode": pj,
        "onetype": onetype,
        "oneval": oneval,
        "page": page
    });
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

$(document).on('change', '#onetype', function () {
    if ($(this).val() == '全部') {
        $('#oneval').empty().hide();
        return;
    }
    $('#oneval').show().attr('placeholder', '请输入' + $(this).val());
});


/**
*获取日志主列表
*/
function GetLog(urltype, pageurl, data, page) {
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
                    content += '<td>' + obj.materialscode + '</td>';
                    content += '<td>' + obj.materialsname + '</td>';
                    content += '<td>' + obj.materialsnumber + '</td>';
                    content += '<td>' + obj.createusercode + '</td>';
                    content += '<td>' + obj.createdate + '</td>';
                    content += '<td>' + obj.operation + '</td>';
                    content += '</tr>';

                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_P0010").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            } else {
                alert(data.errmsg);
            }
        }
    });
}
