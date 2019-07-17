var search = '', page =1, IsUserCc = false , PORT = "IIS3676", URL = "TaskManage.aspx?action=" , excel = '', status='';
$(function () {
    GetList(PORT, URL + "getpcnotify", getSearch());
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            excel = '';
            GetList(PORT, URL + "getpcnotify", getSearch());
        }
    }
});

/*
查询
*/
$(document).on('click', '#query_title > .query_content > .query_btn', function () {
    excel = '';
    GetList(PORT, URL + "getpcnotify", getSearch());
});


/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    var filelName = $('.panel-title').text();
    excel = "excel"
    $('#urltype').val(PORT);
    $('#pageurl').val(URL + "getpcnotify");
    $('#data').val(JSON.stringify(getSearch()));
    $('#filename').val(filelName);
    $('#export_excel').submit();
    hideLoading();
});

//状态切换
$(document).on('click', '#nestable-menu > .btn', function () {
    $(this).addClass('btn-success').removeClass('btn-default').siblings().removeClass('btn-success').addClass('btn-default');
      status = $(this).attr('data-val');
      GetList(PORT, URL + "getpcnotify", getSearch());

    
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
                    content += '<tr id="tr_' + idx + '">';
                    content += '    <td>' + obj.消息标题 + '</td>';
                    content += '    <td>' + obj.消息内容 + '</td>';
                    content += '    <td>' + obj.消息地址 + '</td>';
                    content += '    <td>' + obj.是否已读 + '</td>';
                    content += '    <td>' + obj.消息时间 + '</td>';
                    content += '    <td>';
                    content += '     <a href="' + obj.消息地址 + '">异常详细</a>';
                    content += '    </td>';
                    content += '</tr>';

                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_MyRemind").pagination('setPage', parseFloat(page), parseFloat(pagecount));
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}




//列表分页
$(function () {
    $("#pagination_MyRemind").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            excel = '';
            GetList(PORT, URL + "getpcnotify", getSearch());
        }
    });
});

//查询参数
function getSearch() {
    var data = {
        "search": $('#search_content').val(),
        "usercode": "",
        "status": status,
        "excel": excel,
        "page":page
    }
    return data;

}


/************************************* Ajax End *******************************************/