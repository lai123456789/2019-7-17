
$(function () {

    查询车牌('IIS3382', '/Proposer.aspx?action=GetGarage', {

    });
})

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



$(document).on('tap', '#selectcar', function () {

    $("#carnum").hide();
    var a = $(".dw-bf div:eq(0)").attr("data-val");
    if (a == "请选择车牌") {
        $(".dw-bf div:eq(0)").remove();
    }
})
function 查询车牌(urltype, pageurl) {
    $.ajax({
        cache: true,
        type: "POST",
        dataType: "json",
        url: "/Web/WebApi.aspx?action=requestdata",
        data: {
            "urltype": urltype,
            "pageurl": pageurl,
            //"data": JSON.stringify(data)
        },
        async: true,
        error: function (request) {
            hideLoading();
        },
        success: function (data) {
            if (data.errcode == 0) {
                var content = '';
                if (data.data != null) {
                    $.each(data.data, function (idx, obj) {
                        content += '<option value="' + obj.platenumber + '">' + obj.platenumber + '</option>';
                    });
                }
                $('#selectcar').append(content);
            }
            else {
                caution(data.errmsg);
            }
        }
    });
}


