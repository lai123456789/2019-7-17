var page = 1, status = "", errorcode = '', excel = '', PORT = "IIS3676", URL = 'TaskManage.aspx?action=';
$(function () {
     errorcode = getQueryString("errorcode");
    GetList(PORT, URL+"getassemblyerrortask", getSearch());
    //LookAssemblyErrorTask(PORT, URL+"lookassemblyerrortask", {
    //    "errorcode": errorcode,
    //    "usercode":""
    //});   
});


/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

//接受操作
$(document).on('click', '.taskaccept', function () {
    var taskcode = $(this).attr('data-taskcode');
    var errorcode = $(this).attr('data-errorcode');
    AcceptAssemblyErrorTask(PORT, URL+"acceptassemblyerrortask", {
        "errorcode": errorcode,
        "usercode": ""
    },taskcode);
});

/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    showLoading();
    page = 1;
    var seach = $('#search_content').val();
    var filelName= $('.panel-title').text();
    excel="excel"
    $('#urltype').val('IIS3676');
    $('#pageurl').val(URL + "getassemblyerrortask");
    $('#data').val(JSON.stringify(getSearch()));
    $('#filename').val(filelName);
    $('#export_excel').submit();
    hideLoading();
});

//查询
$(document).on('click', '#query_title .query_btn', function () {
    errorcode = '';
    excel = '';
    GetList(PORT, URL+"getassemblyerrortask", getSearch());
});



//回车键 enter
$(document).on("keydown", document, function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        if ($('.query_content input').is(':focus')) {
            excel = '';
            page = 1;
            GetList(PORT, URL + "getassemblyerrortask", getSearch());
        }
    }
});

//切换状态查询
$(document).on('click', '#nestable-menu > .btn', function () {
    $(this).addClass('btn-success').removeClass('btn-default').siblings().removeClass('btn-success').addClass('btn-default');
    status = $(this).attr('data-val');
    excel = '';
    page = 1;
    GetList(PORT, URL+"getassemblyerrortask", getSearch());
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
                    content += '    <td>' + obj.pj号 + '</td>';
                    content += '    <td>' + obj.项目名称 + '</td>';
                    content += '    <td>' + obj.异常是否关闭 + '</td>';
                    content += '    <td>' + obj.异常分组 + '</td>';
                    content += '    <td>' + obj.异常类别 + '</td>';
                    content += '    <td>' + obj.异常开始时间 + '</td>';
                    content += '    <td>' + obj.异常原因 + '</td>';
                    content += '    <td>';
                    if (obj.isedite==0) {
                        if (obj.负责人用户代码 != null && obj.负责人用户代码 != '') {
                            content += obj.负责人用户名称 + '已接受';
                        } else {
                            content += '<a class="taskaccept" href="JavaScript:;" data-taskcode="' + obj.任务代码 + '" data-errorcode="' + obj.异常代码 + '">接受</a>';
                            content += '<a  href="/Page/Task/QueryAssemblyErrorInfo.html?code=' + obj.异常代码+'"  style="margin-left:5px;">查看</a>';
                        }
                    }
                    content += '    </td>';
                    content += '</tr>';

                });
                $('#form_tb').empty().append(content);
                var pagecount = data.pagecount;
                var totalnum = data.totalnum;
                $("#pagination_AssemblyError").pagination('setPage', parseFloat(page), parseFloat(pagecount));

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}


//列表分页
$(function () {
    $("#pagination_AssemblyError").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            page = currPage;
            excel = '';
            GetList(PORT, URL+"getassemblyerrortask", {
                "errorcode": errorcode,
                "usercode": "",
                "page": page,
                "status": status,
                "search": getSearch()
            });
        }
    });
});




function LookAssemblyErrorTask(urltype, pageurl, data) {
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
            
        },
        success: function (data) {
            
        }
    });
}

/*
接受装配异常任务
*/
function AcceptAssemblyErrorTask(urltype, pageurl, data,taskcode) {
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

        },
        success: function (data) {
            if (data.errcode == 0) {
                location.href = '/Page/Task/MyTastList.html?status=2&&taskcode=' + taskcode;
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}

//查询参数
function getSearch() {
    var data={
        "errorcode": errorcode,
        "usercode": "",
        "page": page,
        "status": status,
        "search": $('#search_content').val(),
        "excel":excel
    }
    return data;
    
}



/************************************* Ajax End *******************************************/