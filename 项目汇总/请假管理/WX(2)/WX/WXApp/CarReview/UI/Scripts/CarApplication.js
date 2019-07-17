$(function () {
    var code = $('#usercode').val();
    用户查询申请('IIS3382', '/Proposer.aspx?action=GetUsercode', {
        "usercode": code
    });
})


function 用户查询申请(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
            alert(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                var 工号 = data.data[0].account;
                var 用户名 = data.data[0].username;
                var 部门 = data.data[0].departmentname;

             //   $('#mt_usercode').attr('data-usercode', 用户代码);
                $('#mt_account').text(工号);
                $('#mt_department').text(部门);
                $('#mt_usercode').text(用户名);
                //$("#application_user").val(data.data[0].username);
                //$("#application_user_num").val(data.data[0].account);
                //$("#application_departmentname").val(data.data[0].departmentname);
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}



/*
点击申请用车按钮时
*/
$(document).on('tap', '#operation_btn > .submit_btn', function () {
    var 用户代码 = $('#usercode').val();
    var 工号 = $('#infodata > .rows1 > .right').text();
    var 名称 = $('#infodata > .rows2 > .right').text();
    var 部门 = $('#infodata > .rows3 > .right').text();
    var 目的地 = $('#now1').val();
    var 用途 = $('#now2').val();
    var 用户时间 = $('#stardate').val();
    var 归还时间 = $('#enddate').val();
    if (目的地 == null || 目的地 == "") {
        alert('请输入目的地');
        return;
    }
    if (用户时间 == null || 用户时间 == "") {
        alert('请选择用车时间');
        return;
    }
    if (归还时间 == null || 归还时间 == "") {
        alert('请选择预计归还时间');
        return;
    }

    //这里调用Ajax方法
    提交('IIS3382', '/Proposer.aspx?action=Apply', {
        "usercode": 用户代码,
        "accent": 工号,
        "applyname": 名称,
        "department": 部门,
        "endsite": 目的地,
        "purpose": 用途,
        "servicetime": 用户时间,
        "returntime": 归还时间

    });

});

function 提交(urltype, pageurl, data) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            "data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
            alert(data.errmsg);
        },
        success: function (data) {
            if (data.errcode == 0) {
                //alert("提交申请成功！");
                //setTimeout(function () {
                //    location.href = "CarAppOrder.aspx";
                //}, 2000)
                success('提交申请成功', 'CarAppOrder.aspx')
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}

