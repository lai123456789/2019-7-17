var PORT = "IIS3676"
    , URL = "AbnormalMessage.aspx?action="
    , page = 1
    , errosrycode = ''
    , errordetailcode = ''
    , taskcode='';
$(function () {
    $("#form_table").colResizable();
    $("#form_table2").colResizable();
    GetList(PORT, URL + "getAbnormalMoudel", {
        "page": page,
        "usercode": ""
    });
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});

/*开启表格【全屏放大】模态窗口*/
$(document).on('click', '#datalist2 .fullscreen', function () {
    document.getElementById("datalist").webkitRequestFullscreen();
});
/*
导出Excel
*/
$(document).on('click', '#datalist .download', function () {
    var title = $(this).parents('.panel-heading').find('.panel-title').text();
    $('#dlink').attr('data-name', title + '.xls');
    ExportExcel('form_table');
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

//派工
$(document).on('click', '#form_tb2 tr .btn2', function () {
    $("#AddUserModal").draggable();//为模态对话框添加拖拽
    $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
    $('#AddUserModal').modal('show');
    $('#user_account').val("");
    var json = $.parseJSON($(this).attr('data-val'));
    errordetailcode = json.errordetailcode;
    taskcode = json.taskcode;

});

//派工确认
$(document).on('click', '#addAssembly_sure', function () {
    var account = $('#user_account').val();
    if (!account && account.length == 0) {
        alert("请输入要派工人的工号");
        return;
    }

    DispatchAbnormality(PORT, URL + "dispatchAbnormality", {
        "errordetailcode": errordetailcode,
        "errosrycode": errosrycode,
        "usercode": "",
        "account": account,
        "taskcode":taskcode
        });

});

//接受
$(document).on('click', '#form_tb2 tr .btn1', function () {
    errordetailcode = $(this).attr('data-val');
    AcceptException(PORT, URL + "acceptException", {
        "errordetailcode": errordetailcode
    });

});





/************************************* Ajax *******************************************/

/*
获取异常模组
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
                    content += '    <td>' + getKG() + obj.nodealwith + '</td>';
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
            GetList(PORT, URL + "getAbnormalMoudel", {
                "page": page,
                "usercode": ""
            });
        }
    });
});


//获取异常模组明细
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




//异常明细分页
$(function () {
    $("#pagination_AlyGroupDetail").pagination({
        totalPage: 0,
        showPageNum: 5,
        isResetPage: true,
        isShowPageSizeOpt: false,
        isShowRefresh: false,
        callBack: function (currPage, pageSize) {
            //console.log('currPage:' + currPage + '     pageSize:' + pageSize);
            page = currPage;
            GetAssemblyDetails(PORT, URL + "getAbnormalMoudelDetails", {
                "page": page,
                "errosrycode": errosrycode
            });
        }
    });
});



function getKG() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;';
}


//接受异常
function AcceptException(urltype, pageurl, data) {
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
                alert(data.errmsg);
                GetAssemblyDetails(PORT, URL + "getAbnormalMoudelDetails", {
                    "page": page,
                    "errosrycode": errosrycode
                });
            }
            else {
                alert(data.errmsg);
               
            }
        }
    });
}




//派工异常用户
function DispatchAbnormality(urltype, pageurl, data) {
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
                alert(data.errmsg);
                $('#AddUserModal').modal('hide');
                //右边
                GetAssemblyDetails(PORT, URL + "getAbnormalMoudelDetails", {
                    "page": page,
                    "errosrycode": errosrycode
                });
                GsetAbnormalMoudel();//头部
                //左边
                GetList(PORT, URL + "getAbnormalMoudel", {
                    "page": page,
                    "usercode": ""
                });
            }
            else {
                alert(data.errmsg);
                $('#AddUserModal').modal('hide');


            }
        }
    });
}




/************************************* Ajax End *******************************************/