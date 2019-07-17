$(function () {
    var height = $('#main').height();
    $('#businesstype').css('min-height', height - 19);
    $('#businesstype').css('max-height', height - 19);
    $('#datalist').css('min-height', height - 19);
    $('#datalist').css('max-height', height - 19);
});


$(document).on('click', '#department_list li.libtn', function () {
    $('#department_list li.libtn').removeClass('
        
        ');
    $(this).addClass('contor');
    var 业务类型 = $(this).attr('data-businesstype');
    var 工序名称 = $(this).attr('data-processname');
    GetList("IIS", "BusinessNotify.aspx?action=getbusinessnotifyuser", {
        "businesstype": 业务类型,
        "processname": 工序名称
    });
});

$(document).on('click', '#department_list .fa.fa-minus', function () {
    $(this).parent('.dd-handle.dd3-handle').parent('li.dd-item.dd3-item').children('ol.dd-list').hide();
    $(this).addClass('fa-plus').removeClass('fa-minus');
});


$(document).on('click', '#department_list .fa.fa-plus', function () {
    $(this).parent('.dd-handle.dd3-handle').parent('li.dd-item.dd3-item').children('ol.dd-list').show();
    $(this).addClass('fa-minus').removeClass('fa-plus');
});




$(document).on('click', '#adduserinfo', function () {
    var len = $('#department_list li.libtn.contor').length;
    if (len > 0) {
        $("#modalDialog").draggable();//为模态对话框添加拖拽
        $("#AddUserModal").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
        $('#AddUserModal').modal('show');
        var 业务类型 = '';
        var 工序名称 = '';
        业务类型 = $('#department_list li.libtn.contor').attr('data-businesstype');
        工序名称 = $('#department_list li.libtn.contor').attr('data-processname');
        $('#add_businesstype').text(业务类型);
        $('#add_processname').text(工序名称);
    }
    else
    {
        alert('未选中左侧的业务类型');
        return;
    }
});


$(document).on('click', '#add_sure', function () {
    var 业务类型 = $('#add_businesstype').text();
    var 工序名称 = $('#add_processname').text();
    var 工号 = $('#add_account').val();
    AddUserInfo("IIS", "BusinessNotify.aspx?action=setbusinessnotifyuser", {
        "businesstype": 业务类型,
        "processname": 工序名称,
        "account": 工号,
        "operation_usercode": ""
    }, 业务类型, 工序名称);
});


$(document).on('click','')







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
                    content += '    <td>' + obj.业务类型 + '</td>';
                    content += '    <td>' + obj.工序名称 + '</td>';
                    content += '    <td>' + obj.工号 + '</td>';
                    content += '    <td>' + obj.用户名称 + '</td>';
                    content += '    <td>' + obj.创建时间 + '</td>';
                    content += '    <td>';
                    content += '        <a href="JavaScript:;">删除</a>';
                    content += '    </td>';
                    content += '</tr>';

                });
                $('#form_tb').empty();
                $('#form_tb').append(content);

            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



function AddUserInfo(urltype, pageurl, data, 业务类型, 工序名称) {
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
                GetList("IIS", "BusinessNotify.aspx?action=getbusinessnotifyuser", {
                    "businesstype": 业务类型,
                    "processname": 工序名称
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}



function DelUserInfo(urltype, pageurl, data, 业务类型, 工序名称) {
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
                GetList("IIS", "BusinessNotify.aspx?action=getbusinessnotifyuser", {
                    "businesstype": 业务类型,
                    "processname": 工序名称
                });
            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
