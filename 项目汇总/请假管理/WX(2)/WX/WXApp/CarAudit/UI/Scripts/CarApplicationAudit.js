/*
点击驳回按钮时
*/
$(document).on('tap', '#operation_btn > .submit_btn1', function (e) {
    stopDefault(e);
    $('#undo_modal').addClass('contor');
    $('#mask300').addClass('contor');
});

/*
点击批准按钮时
*/
$(document).on('tap', '#operation_btn > .submit_btn2', function (e) {
    stopDefault(e);
    $('#approval_modal').addClass('contor');
    $('#mask300').addClass('contor');
});


$(document).on('tap', '#approval_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});



/*
取消撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_cancel', function (e) {
    stopDefault(e);
    $('#undo_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

/*
确定撤回按钮
*/
$(document).on('tap', '#undo_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    /*
    这里处理撤回成功的Ajax
    */
    alert('驳回成功')
    $('#undo_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

$(document).on('tap', '#approval_modal > .bottom > .btn_sure', function (e) {
    stopDefault(e);
    alert('已批准用车')
    $('#approval_modal').removeClass('contor');
    setTimeout(function () {
        $('#mask300').removeClass('contor');
    }, 350);
});

$(function () {
    var 类型 = getQueryString('type');//暂时为了演示，通过URL的type参数来控制，之后的话通过接口直接返回类型
    var code = $('#usercode').val();

    switch (类型) {
        case "1":
            $('#operation_btn2').addClass('contor');

            break;
    }
    var pcode = getQueryString('pcode');
    var code = $('#usercode').val();
    查询单号查询('IIS3382', '/Proposer.aspx?action=GetEndApply', {
        "applycode": pcode
    });

});

function 查询单号查询(urltype, pageurl, data, page) {
    
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
        },
        success: function (data) {
            hideLoading();
            if (data.errcode == 0) {
                var content = '';

                $.each(data.data, function (idx, obj) {
                   
                        content += '    <div class="rows1">';
                        content += '        <div class="left">工号：</div>';
                        content += '        <div class="right" data-usercode="">' + obj.accent + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows2">';
                        content += '        <div class="left">姓名：</div>';
                        content += '        <div class="right">' + obj.applyname + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows3">';
                        content += '        <div class="left">部门：</div>';
                        content += '        <div class="right">' + obj.department + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows4">';
                        content += '        <div class="left">目的地：</div>';
                        content += '        <div class="right">' + obj.endsite + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows5">';
                        content += '        <div class="left">用途：</div>';
                        content += '        <div class="right">' + obj.purpose + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows6">';
                        content += '        <div class="left">用车时间：</div>';
                        content += '        <div class="right">' + obj.servicetime + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows7">';
                        content += '        <div class="left">车辆：</div>';
                        content += '        <div class="right">' + obj.platenumber + '</div>';
                        content += '    </div>';
                        content += '    <div class="rows8">';
                        content += '        <div class="left">审核状态：</div>';
                        content += '        <div class="right status1">未审批</div>';
                        content += '    </div>';
                 

                });

                $('#infodata').empty();

                $('#infodata').append(content);



            }
            else {
                alert(data.errmsg)
            }
        }
    });
}
